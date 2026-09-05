/* Browser rehearsal rules. No networking or client-side secrecy guarantee. */
(function (root) {
  'use strict';
  const CAST = ['Maya', 'Leo', 'Nia', 'Omar', 'Tess', 'Hugo', 'Iris', 'Ben'];
  const role = id => id === 1 || id === 2 ? 'Snake' : 'Loyal';
  function tally(active, ballots, candidates = active) {
    const totals = Object.fromEntries(candidates.map(id => [id, 0]));
    const accepted = [];
    for (const voter of active) {
      const target = ballots[voter];
      if (target !== voter && candidates.includes(target)) { totals[target]++; accepted.push({ voter, target }); }
    }
    const max = Math.max(0, ...Object.values(totals));
    const tied = candidates.filter(id => totals[id] === max);
    // With no valid ballots, everyone is tied at zero; a runoff still applies.
    return { totals, tied, removed: tied.length === 1 ? tied[0] : null, abstentions: active.length - accepted.length, accepted };
  }
  function winner(active, heists, completedActs) {
    if (!active.some(id => role(id) === 'Snake')) return { team: 'Loyals', reason: 'Both Snakes were removed.' };
    if (heists + (3 - completedActs) < 2) return { team: 'Loyals', reason: 'Two heists are now impossible.' };
    if (completedActs >= 3) return { team: heists >= 2 ? 'Snakes' : 'Loyals', reason: heists >= 2 ? 'At least two heists, with a Snake still onstage after the final vote.' : 'Fewer than two heists.' };
    return null;
  }
  function groups(active, act) {
    const order = [...active];
    // Rotate, then alternate the ends of the order to change partnerships.
    for (let i = 1; i < act; i++) order.push(order.shift());
    if (act % 2 === 0) order.reverse();
    const result = [];
    while (order.length) result.push(order.splice(0, order.length === 3 ? 3 : 2));
    return result;
  }
  function makeAct(active, act, allowHeist = true) {
    const stations = groups(active, act);
    const snakeStation = stations.findIndex(ids => ids.some(id => role(id) === 'Snake'));
    const heist = allowHeist && snakeStation >= 0;
    const locations = ['East lift', 'Pool lift', 'West lift', 'Garden lift'];
    const publicCards = [], full = [];
    let pot = 0;
    stations.forEach((ids, i) => {
      const armed = heist && i === snakeStation;
      const failed = armed || i === (snakeStation + 1) % stations.length;
      const operator = armed ? ids.find(id => role(id) === 'Snake') : ids[0];
      const catcher = ids.find(id => id !== operator);
      const place = locations[i], names = ids.map(id => CAST[id]).join(' + ');
      const add = (time, text, kind) => { const card = { act, place, ids, time, text, kind }; publicCards.push(card); full.push({ ...card, private: false }); };
      if (armed) full.push({ act, place, time: 14, text: `${CAST[operator]} completed Rig. The act attempt was consumed and this capsule's diverter armed.`, private: true });
      add(18, `${CAST[operator]} ${failed ? 'held Pull for 2.0 s while their end was high' : 'released Pull while their end was high'}.`, 'handling');
      if (failed) add(23, `${CAST[catcher]} tapped Catch outside the zone. No eligible contestant saved the capsule.`, 'catch');
      else add(25, `${names} kept the capsule aboard.`, 'catch');
      add(26, `${names} operated this station. ${failed ? 'The capsule was lost.' : 'One prize was delivered.'}`, 'outcome');
      if (armed) full.push({ act, place, time: 26, text: 'The armed capsule entered the concealed Snake channel. One heist succeeded.', private: true });
      if (!failed) pot++;
    });
    // Fixed coverage: outcome, handling, response for EVERY station in location order.
    publicCards.sort((a, b) => locations.indexOf(a.place) - locations.indexOf(b.place) || ['outcome','handling','catch'].indexOf(a.kind) - ['outcome','handling','catch'].indexOf(b.kind));
    full.sort((a,b) => a.time-b.time);
    return { act, stations, heist: Number(heist), pot, publicCards, full };
  }
  class Rescue {
    constructor(settings = {}) {
      this.settings = { hold: 1.5, burst: 5, window: 3, zone: .25, ...settings };
      this.time = 0; this.phase = 'lifting'; this.reserved = null; this.heldSince = 0;
      this.spent = false; this.armed = false; this.burstUntil = 0; this.faultAt = 0;
      this.attempts = new Set(); this.heldCatch = new Set(); this.heists = 0;
      this.publicLog = []; this.privateLog = []; this.result = '';
    }
    log(text, secret = false) { (secret ? this.privateLog : this.publicLog).push({ time: this.time, text }); }
    reserve(id) {
      if (this.phase !== 'lifting' || this.spent || this.reserved !== null || ![1,2].includes(id)) return false;
      this.reserved = id; this.heldSince = this.time; this.log(`${CAST[id]} reserved the team attempt.`, true); return true;
    }
    release(id) {
      if (this.reserved !== id) return;
      this.reserved = null; this.log('Unfinished Rig hold canceled. Team attempt available.', true);
    }
    tick(dt) {
      if (this.phase === 'ended') return;
      this.time += dt;
      if (this.reserved !== null && this.time - this.heldSince >= this.settings.hold) {
        this.log(`${CAST[this.reserved]} armed the capsule. Team attempt consumed.`, true);
        this.spent = true; this.armed = true; this.burstUntil = this.time + this.settings.burst; this.reserved = null;
      }
      if (this.phase === 'catch' && this.time - this.faultAt >= this.settings.window) this.lose();
    }
    fault() {
      if (this.phase !== 'lifting') return false;
      if (this.reserved !== null) this.release(this.reserved);
      this.phase = 'catch'; this.faultAt = this.time; this.attempts.clear();
      this.log('The capsule rolled off. Motors paused. Catch!'); return true;
    }
    needle() { const p = Math.min(2, Math.max(0, (this.time - this.faultAt) / this.settings.window * 2)); return p <= 1 ? p : 2 - p; }
    inZone() { return Math.abs(this.needle() - .5) <= this.settings.zone / this.settings.window; }
    pressCatch(id, eligible = true) {
      if (this.heldCatch.has(id)) return 'held';
      this.heldCatch.add(id);
      if (this.phase !== 'catch' || !eligible || this.attempts.has(id)) return 'ineligible';
      if (this.time - this.faultAt >= this.settings.window) { this.lose(); return 'expired'; }
      this.attempts.add(id);
      if (!this.inZone()) { this.log(`${CAST[id]} missed Catch. Other players still have their tap.`); return 'miss'; }
      this.phase = 'lifting'; this.armed = false; this.burstUntil = 0; this.result = 'caught';
      this.log(`Caught by ${CAST[id]} — keep lifting. Capsule returned to center.`);
      this.log('Any capsule rig was cleared. A consumed attempt stays consumed.', true); return 'saved';
    }
    releaseCatch(id) { this.heldCatch.delete(id); }
    lose() {
      if (this.phase !== 'catch') return;
      this.phase = 'reload'; this.result = 'lost';
      this.log('Nobody caught it. Capsule lost in the opaque collection housing.');
      if (this.armed) { this.heists++; this.log('Heist succeeded. Public count waits until the act ends.', true); }
      this.armed = false; this.burstUntil = 0;
    }
    reload() {
      if (this.phase !== 'reload') return false;
      this.phase = 'lifting'; this.result = ''; this.log('Fresh capsule loaded. No rig carries over.'); return true;
    }
    end(reason = 'timeout') {
      if (this.phase === 'ended') return;
      if (this.reserved !== null) this.release(this.reserved);
      this.armed = false; this.burstUntil = 0; this.phase = 'ended'; this.result = reason;
      this.log(reason === 'water' ? 'Tray touched the water. Automatic drop; no Catch or heist from this drop.' : reason === 'delivered' ? 'Prize delivered safely. One delivery banked.' : 'Act ended. Unresolved attempts award no heist.');
      this.log(`Act result: Heists: ${this.heists}/2.`);
    }
  }
  class RewardLedger {
    constructor() { this.entries = new Map(); }
    award(episode, kind, fame, credits) {
      const key = `${episode}:${kind}`;
      if (this.entries.has(key)) return false;
      this.entries.set(key, { episode, kind, fame, credits }); return true;
    }
    totals() { return [...this.entries.values()].reduce((sum,e) => ({ fame:sum.fame+e.fame, credits:sum.credits+e.credits }),{ fame:0,credits:0 }); }
  }
  const api = { CAST, role, tally, winner, groups, makeAct, Rescue, RewardLedger };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.SnakeRules = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
