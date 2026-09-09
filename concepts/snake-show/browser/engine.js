/* Local, fixed-step simulation. Public observations and private events are kept
   separate for the UI; all data is inspectable in this offline browser build. */
(function (root) {
  'use strict';
  const Lift = typeof module !== 'undefined' && module.exports ? require('./lift-settings.js') : root.LiftSettings;
  const { FIXED: F, DEFAULTS, catchGeometry } = Lift;
  const DT = 1 / 120;
  const CAST = [
    { name: 'Maya', color: '#d4794f', hair: '#423927' },
    { name: 'Leo', color: '#78965a', hair: '#5d3926' },
    { name: 'Nia', color: '#b28bb4', hair: '#332c29' },
    { name: 'Omar', color: '#6e9fa2', hair: '#352b26' },
    { name: 'Tess', color: '#d6aa4f', hair: '#a55132' },
    { name: 'Hugo', color: '#718eb3', hair: '#4a382c' },
    { name: 'Iris', color: '#cc8591', hair: '#563629' },
    { name: 'Ben', color: '#99a36f', hair: '#cfb479' }
  ];
  const PLACES = ['East lift', 'Garden lift', 'West lift', 'Terrace lift'];
  const POSITIONS = [{ x: 775, y: 242 }, { x: 765, y: 490 }, { x: 228, y: 480 }, { x: 232, y: 238 }];
  const DURATIONS = { casting: 10, challenge: 45, vote: 35, runoff: 10, result: 5, finale: 20 };
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const mean = xs => xs.reduce((a, b) => a + b, 0) / xs.length;
  function rng(seed) {
    let a = seed >>> 0;
    return () => { a += 0x6D2B79F5; let t = a; t = Math.imul(t ^ t >>> 15, t | 1); t ^= t + Math.imul(t ^ t >>> 7, t | 61); return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  }
  function shuffle(values, random) {
    const a = [...values];
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }
  function assignGroups(active, act) {
    const order = [...active];
    for (let i = 1; i < act; i++) order.push(order.shift());
    if (act % 2 === 0) order.reverse();
    const groups = [];
    while (order.length) groups.push(order.splice(0, order.length === 3 ? 3 : 2));
    return groups;
  }
  function tally(active, ballots, candidates = active) {
    const totals = Object.fromEntries(candidates.map(id => [id, 0]));
    const accepted = [];
    for (const voter of active) {
      const target = ballots[voter];
      if (target !== voter && candidates.includes(target) && active.includes(target)) {
        totals[target]++; accepted.push({ voter, target });
      }
    }
    const max = Math.max(0, ...Object.values(totals));
    const tied = candidates.filter(id => totals[id] === max);
    return { totals, tied, accepted, removed: tied.length === 1 ? tied[0] : null, abstentions: active.length - accepted.length };
  }
  function winner(players, heists, completedActs, afterVote = true) {
    if (!players.some(p => p.active && p.role === 'Snake')) return { team: 'Loyals', reason: 'Both Snakes have been voted out.' };
    if (heists + 3 - completedActs < 2) return { team: 'Loyals', reason: 'Two heists are now impossible. The treasures are safe.' };
    if (completedActs >= 3 && afterVote) return { team: heists >= 2 ? 'Snakes' : 'Loyals', reason: heists >= 2 ? 'Two treasures stolen, and a Snake survived the final vote.' : 'The Snakes failed to steal two treasures.' };
    return null;
  }
  function makeStation(ids, index, random, settings = { ...DEFAULTS }) {
    const n = ids.length;
    const points = n === 3 ? [[-1, -.57735], [1, -.57735], [0, 1.1547]] : [[-1, 0], [1, 0]];
    return {
      ids, index, name: PLACES[index], points, settings, state: 'lifting', h: ids.map(() => 0), v: ids.map(() => 0),
      held: ids.map(() => false), x: (random() < .5 ? -1 : 1) * settings.x0, z: 0, vx: 0, vz: 0,
      armedBy: null, armedAt: 0, burstUntil: 0, rigDirection: true, catchAt: 0, taps: new Set(), catchPlan: {}, duty: [],
      reloadAt: 0, resetUntil: 0, delivered: false, losses: 0, catches: 0, heists: 0,
      events: [], tracks: ids.map(() => ({ highHold: 0, lowIdle: 0, highRelease: 0, maxHigh: 0, maxIdle: 0, maxRelease: 0 })),
      publicCards: [], message: 'Bring the ball to center. Lift to the gold line.'
    };
  }
  function shares(s) {
    if (s.ids.length === 2) return [(1 - s.x) / 2, (1 + s.x) / 2];
    const c = (s.z + .57735) / 1.73205, b = (1 - c + s.x) / 2, a = 1 - c - b;
    return [a, b, c];
  }
  function gradient(s) {
    const half = s.settings.width / 2;
    return { x: (s.h[1] - s.h[0]) / (2 * half), z: s.ids.length === 3 ? (s.h[2] - (s.h[0] + s.h[1]) / 2) / (1.73205 * half) : 0 };
  }
  function centeringTargets(s, ability = 1) {
    const P = s.settings, half = P.width / 2;
    // Tilt returns the ball; velocity feedback brakes it before it crosses
    // the center. Both terms use physical distance at any tray width.
    const damping = .4 + 1.6 * ability;
    let x = .8 * s.x * half + damping * s.vx, z = .8 * s.z * half + damping * s.vz;
    const offset = Math.hypot(s.x, s.z);
    if (Math.hypot(s.vx, s.vz) < .02 && offset > .06) {
      const friction = Math.max(P.mus, P.muk) * P.g;
      x += friction * s.x / offset; z += friction * s.z / offset;
    }
    const targets = s.points.map(([px, pz]) => (x * px + z * pz) * half / (P.roll * P.g));
    const spread = Math.max(...targets) - Math.min(...targets), limit = Math.min(F.dmax / 2, P.width * .4);
    return spread > limit ? targets.map(h => h * limit / spread) : targets;
  }
  function needle(s, time) {
    const p = clamp((time - s.catchAt) / (s.settings.catchWin / 2), 0, 2);
    return p <= 1 ? p : 2 - p;
  }
  function inCatchZone(s, time) {
    const zone = catchGeometry(s.settings), tau = time - s.catchAt, position = needle(s, time);
    return tau >= 0 && tau < s.settings.catchWin && position >= zone.start - 1e-9 && position <= zone.start + zone.width + 1e-9;
  }

  class Episode {
    constructor({ seed = Date.now(), mode = 'play', settings = {} } = {}) {
      this.settings = Lift.normalize(settings);
      this.seed = seed >>> 0; this.random = rng(this.seed); this.mode = mode;
      const snakes = shuffle(CAST.map((_, i) => i), this.random).slice(0, 2);
      this.players = CAST.map((c, id) => ({ ...c, id, role: mode === 'practice' ? 'Loyal' : snakes.includes(id) ? 'Snake' : 'Loyal',
        active: mode !== 'practice' || id < 2, bot: mode === 'watch' || id !== 0, x: 360 + id * 40, y: 548,
        operated: false, pulling: false, rigging: false, pulseUntil: 0, catchHeld: false,
        nextThink: 0, motorChoice: false, mistakeUntil: 0, skill: .50 + this.random() * .32,
        rigAt: 4 + this.random() * 5, suspicion: Array(8).fill(0), station: -1 }));
      this.timers = Object.fromEntries(['phase', 'catch', 'rig', 'reload'].map(name => [name, { paused: false, offset: 0, at: 0 }]));
      this.phase = 'lobby'; this.phaseTime = 0; this.time = 0; this.act = 0;
      this.heists = 0; this.pot = 0; this.stations = []; this.history = []; this.ballots = {};
      this.candidates = []; this.botVoteAt = {}; this.lastVote = null; this.outcome = null;
      this.attempt = { reserved: null, since: 0, spent: false }; this.revision = 0;
      this.locked = new Set(); this.confidences = {}; this.completedActs = 0; this.practiceResult = ''; this.voted = new Set();
    }
    timerClock(name = 'phase') {
      const timer = this.timers[name];
      return timer.paused ? timer.at : this.phaseTime - timer.offset;
    }
    setTimerPaused(name, paused) {
      const timer = this.timers[name];
      if (!timer || typeof paused !== 'boolean') return false;
      if (timer.paused === paused) return true;
      if (paused) timer.at = this.timerClock(name);
      else timer.offset = this.phaseTime - timer.at;
      timer.paused = paused; return true;
    }
    activeIds() { return this.players.filter(p => p.active).map(p => p.id); }
    applySettings(values) {
      const settings = Lift.normalize({ ...this.settings, ...values }, true), oldWindow = this.settings.catchWin;
      const skillChanged = settings.botSkill !== this.settings.botSkill;
      Object.assign(this.settings, settings);
      if (skillChanged) for (const p of this.players.filter(p => p.bot)) { p.nextThink = this.phaseTime; p.mistakeUntil = 0; }
      for (const s of this.stations) {
        s.settings = this.settings;
        if (s.armedBy !== null) s.burstUntil = s.armedAt + settings.rigTime;
        if (s.state === 'catch') for (const id of Object.keys(s.catchPlan)) s.catchPlan[id] *= settings.catchWin / oldWindow;
      }
    }
    stationFinished(s) { return !!s && ['delivered', 'lava', 'timeout'].includes(s.state); }
    reviewSnapshot() {
      return { act: this.act, stations: this.stations.map(s => ({ name: s.name, ids: [...s.ids], ready: this.stationFinished(s), cards: this.stationFinished(s) ? this.makeReceipts(s) : null })) };
    }
    stationOf(id) { return this.stations.find(s => s.ids.includes(id)); }
    publicEvent(s, kind, text, id = null, extra = {}) {
      s.events.push({ time: this.phaseTime, kind, text, id, private: false, ...extra });
    }
    privateEvent(s, kind, text, id = null) {
      s.events.push({ time: this.phaseTime, kind, text, id, private: true });
    }
    setPhase(phase) { this.releaseAll(); this.phase = phase; this.phaseTime = 0; for (const timer of Object.values(this.timers)) { timer.offset = 0; timer.at = 0; } this.revision++; }
    start() { this.mode === 'practice' ? this.beginAct() : this.setPhase('casting'); }
    beginAct() {
      this.act++; this.setPhase('challenge');
      this.attempt = { reserved: null, since: 0, spent: false };
      this.stations = assignGroups(this.activeIds(), this.act).map((ids, i) => makeStation(ids, i, this.random, this.settings));
      for (const s of this.stations) for (const id of s.ids) {
        const p = this.players[id]; p.station = s.index; p.operated = true; p.nextThink = 0; p.mistakeUntil = 0;
        p.rigAt = 4 + this.random() * 5;
        p.x = POSITIONS[s.index].x + (s.ids.indexOf(id) - (s.ids.length - 1) / 2) * 40;
        p.y = POSITIONS[s.index].y + 35;
      }
    }
    releaseAll() {
      for (const p of this.players) { p.pulling = false; p.rigging = false; p.pulseUntil = 0; p.catchHeld = false; }
      if (this.attempt?.reserved !== null && this.attempt) this.attempt.reserved = null;
    }
    operate(id, on) {
      const p = this.players[id], s = this.stationOf(id);
      if (!p?.active || this.phase !== 'challenge' || !s) return false;
      if (on && Math.hypot(p.x - POSITIONS[s.index].x, p.y - POSITIONS[s.index].y) > 110) return false;
      p.operated = on;
      if (!on) { this.releasePull(id); this.releaseRig(id); }
      return true;
    }
    pressPull(id) {
      const p = this.players[id], s = this.stationOf(id);
      if (this.phase !== 'challenge' || !p?.active || !p.operated || s?.state !== 'lifting') return false;
      p.pulling = true; p.pulseUntil = this.phaseTime + this.settings.pulse; return true;
    }
    releasePull(id) { if (this.players[id]) this.players[id].pulling = false; }
    pressRig(id) {
      const p = this.players[id], s = this.stationOf(id);
      if (this.phase !== 'challenge' || !p?.active || p.role !== 'Snake' || !p.operated || s?.state !== 'lifting' || this.attempt.spent || this.attempt.reserved !== null) return false;
      p.rigging = true; this.attempt.reserved = id; this.attempt.since = this.timerClock('rig'); return true;
    }
    releaseRig(id) {
      if (this.players[id]) this.players[id].rigging = false;
      if (this.attempt.reserved === id) this.attempt.reserved = null;
    }
    eligibleCatch(id, s) {
      const p = this.players[id];
      return p?.active && (s.ids.includes(id) && p.operated || !p.operated && Math.hypot(p.x - POSITIONS[s.index].x, p.y - POSITIONS[s.index].y) <= 105);
    }
    pressCatch(id, stationIndex) {
      const p = this.players[id], s = this.stations[stationIndex];
      if (!p || p.catchHeld) return 'held';
      p.catchHeld = true;
      if (this.phase !== 'challenge' || !s || s.state !== 'catch' || !this.eligibleCatch(id, s) || s.taps.has(id)) return 'ineligible';
      if (this.timerClock('catch') - s.catchAt >= this.settings.catchWin) return 'expired';
      s.taps.add(id);
      if (!inCatchZone(s, this.timerClock('catch'))) {
        this.publicEvent(s, 'catch', `${p.name} tapped outside the Catch zone.`, id, { saved: false });
        s.message = `${p.name} missed. Other contestants still have their tap.`;
        return 'miss';
      }
      this.publicEvent(s, 'catch', `${p.name} caught the capsule.`, id, { saved: true });
      if (s.armedBy !== null) this.privateEvent(s, 'cleared', 'The catch cleared the armed diverter and motor burst.');
      s.armedBy = null; s.burstUntil = 0; s.catches++; s.state = 'lifting';
      s.x = 0; s.z = 0; s.vx = 0; s.vz = 0; s.v.fill(0); s.resetUntil = this.timerClock('reload') + .45;
      s.message = `Caught by ${p.name} — keep lifting!`;
      return 'saved';
    }
    releaseCatch(id) { if (this.players[id]) this.players[id].catchHeld = false; }
    fault(s) {
      if (s.state !== 'lifting') return;
      if (s.ids.includes(this.attempt.reserved)) this.releaseRig(this.attempt.reserved);
      s.state = 'catch'; s.catchAt = this.timerClock('catch'); s.taps.clear(); s.catchPlan = {}; s.held.fill(false);
      for (const id of s.ids) { const p = this.players[id]; p.pulling = false; p.pulseUntil = 0; p.rigging = false; }
      this.publicEvent(s, 'spill', 'The capsule rolled off. Motors stopped for Catch.');
      s.message = 'Capsule falling! One tap each. Aim for the gold zone.';
      // A bot plans a real tap time with imperfect timing; it cannot command a save.
      for (const p of this.players.filter(p => p.bot && this.eligibleCatch(p.id, s))) {
        const sabotage = p.role === 'Snake' && this.mode !== 'practice';
        const hit = !sabotage && this.random() < this.botAbility(p);
        const zone = catchGeometry(this.settings), returnPass = this.random() >= .5;
        const position = hit ? zone.center + (this.random() - .5) * zone.width * .75 : .1 + this.random() * .25;
        s.catchPlan[p.id] = (returnPass ? 2 - position : position) * zone.pass;
        p.catchHeld = false;
      }
    }
    lose(s) {
      if (s.state !== 'catch') return;
      s.losses++; this.publicEvent(s, 'loss', 'The capsule was lost in the opaque collection housing.');
      if (s.armedBy !== null) {
        s.heists++;
        this.privateEvent(s, 'heist', `${this.players[s.armedBy].name}’s armed capsule entered the Snake channel. Heist completed.`, s.armedBy);
      }
      s.armedBy = null; s.burstUntil = 0; s.state = 'reload'; s.reloadAt = this.timerClock('reload') + 3;
      s.message = 'Capsule lost. A fresh treasure loads in 3 seconds.';
    }
    endStation(s, result) {
      if (s.ids.includes(this.attempt.reserved)) this.releaseRig(this.attempt.reserved);
      if (s.armedBy !== null) this.privateEvent(s, 'cleared', `${result === 'delivered' ? 'Safe delivery' : result === 'lava' ? 'Lava contact' : 'The deadline'} defeated the unresolved Rig.`);
      s.armedBy = null; s.burstUntil = 0; s.held.fill(false); s.state = result;
      if (result === 'delivered') {
        s.delivered = true; this.pot++;
        s.message = 'Treasure delivered! One prize banked.';
        this.publicEvent(s, 'delivery', 'One golden treasure was delivered safely.');
      } else if (result === 'lava') {
        s.message = 'Tray touched the lava. Lift failed — no Catch.';
        this.publicEvent(s, 'lava', 'The tray touched the lava. Automatic drop; no Catch.');
      } else {
        s.message = 'Time is up. This lift did not deliver.';
        this.publicEvent(s, 'timeout', 'The lift did not deliver before the deadline.');
      }
    }
    botAbility(p) {
      const q = this.settings.botSkill / 100;
      return clamp(q + (p.skill - .66) * q * (1 - q), 0, 1);
    }
    botMotor(p, s, i) {
      if (!p.operated) return false;
      if (this.phaseTime < p.nextThink) return p.motorChoice;
      const ability = this.botAbility(p);
      p.nextThink = this.phaseTime + .06 + (1 - ability) * .48;
      if (p.role === 'Snake' && !this.attempt.spent && this.attempt.reserved === null && this.phaseTime >= p.rigAt && this.heists < 2) this.pressRig(p.id);
      if (p.rigging) return p.motorChoice = true;
      if (s.armedBy === p.id && this.timerClock('rig') < s.burstUntil) return p.motorChoice = s.rigDirection;
      // Skill controls added handling mistakes; it never changes hidden roles.
      if (this.phaseTime >= p.mistakeUntil && this.random() < .05 * (1 - ability) ** 2) p.mistakeUntil = this.phaseTime + .3 + (1 - ability) * (.5 + this.random());
      if (this.phaseTime < p.mistakeUntil) return p.motorChoice = true;
      const targets = centeringTargets(s, ability), target = targets[i] - mean(targets.filter((_, j) => i !== j));
      const predicted = s.h.map((h, j) => h + s.v[j] * .3);
      const difference = predicted[i] - mean(predicted.filter((_, j) => i !== j));
      const tolerance = .008 + (1 - ability) * .025;
      p.motorChoice = s.h[i] < F.lava + .35 || difference < target - tolerance || difference <= target + tolerance && s.v[i] < .5;
      return p.motorChoice;
    }
    physics(s, dt) {
      const n = s.ids.length, weights = shares(s), P = this.settings;
      for (let i = 0; i < n; i++) {
        const p = this.players[s.ids[i]];
        const on = p.bot ? this.botMotor(p, s, i) : p.operated && (p.pulling || p.rigging || this.phaseTime < p.pulseUntil);
        s.held[i] = on;
        const burst = s.armedBy === p.id && this.timerClock('rig') < s.burstUntil;
        const mass = F.mp / n + F.mp * P.ballW * clamp(weights[i], 0, 1), force = P.force * P.g * F.mp * (1 + P.ballW) / n;
        const accel = ((on ? force * (burst ? P.rigForce : 1) : 0) - P.g * mass * (burst ? P.rigDown : 1) - P.cw * s.v[i]) / (mass + F.mw);
        s.v[i] = clamp(s.v[i] + accel * dt, -P.vdown * (burst ? P.rigDown : 1), P.vup * (burst ? P.rigForce : 1));
        s.h[i] += s.v[i] * dt;
        if (s.h[i] > F.top) { s.h[i] = F.top; s.v[i] = Math.min(0, s.v[i]); }
        const high = s.h[i] - mean(s.h.filter((_, j) => j !== i)), tr = s.tracks[i];
        tr.highHold = on && high > .08 ? tr.highHold + dt : 0;
        tr.lowIdle = !on && high < -.08 ? tr.lowIdle + dt : 0;
        tr.highRelease = !on && high > .08 ? tr.highRelease + dt : 0;
        tr.maxHigh = Math.max(tr.maxHigh, tr.highHold); tr.maxIdle = Math.max(tr.maxIdle, tr.lowIdle); tr.maxRelease = Math.max(tr.maxRelease, tr.highRelease);
      }
      s.duty.push({ time: this.phaseTime, held: [...s.held] });
      while (s.duty.length && s.duty[0].time < this.phaseTime - 2) s.duty.shift();
      const span = Math.max(...s.h) - Math.min(...s.h);
      if (span > F.dmax) { const mid = mean(s.h); s.h = s.h.map(h => mid + (h - mid) * F.dmax / span); }
      if (Math.min(...s.h) <= F.lava) { this.endStation(s, 'lava'); return; }
      const slope = gradient(s), drive = { x: -P.roll * P.g * slope.x, z: -P.roll * P.g * slope.z };
      const speed = Math.hypot(s.vx, s.vz), magnitude = Math.hypot(drive.x, drive.z);
      if (speed <= .001 && magnitude <= P.mus * P.g) { s.vx = 0; s.vz = 0; }
      else {
        const dx = speed > .001 ? s.vx / speed : drive.x / (magnitude || 1);
        const dz = speed > .001 ? s.vz / speed : drive.z / (magnitude || 1);
        const vx = s.vx + (drive.x - dx * P.muk * P.g - P.cb * s.vx) * dt;
        const vz = s.vz + (drive.z - dz * P.muk * P.g - P.cb * s.vz) * dt;
        if (speed > .001 && vx * s.vx + vz * s.vz <= 0) { s.vx = 0; s.vz = 0; }
        else { s.vx = vx; s.vz = vz; }
      }
      // Position is a fraction of the tray's half-width; slide velocity is u/s.
      // Live resizing keeps the prize's relative position and current velocity.
      const half = P.width / 2;
      s.x += s.vx * dt / half; s.z += s.vz * dt / half;
      if (shares(s).some(v => v < 0)) this.fault(s);
      else if (Math.min(...s.h) >= F.finish) this.endStation(s, 'delivered');
    }
    stepChallenge(dt) {
      const reserved = this.attempt.reserved;
      if (reserved !== null) {
        const p = this.players[reserved], s = this.stationOf(reserved);
        if (!p.rigging || !p.operated || !p.active || s.state !== 'lifting') this.releaseRig(reserved);
        else if (this.timerClock('rig') - this.attempt.since >= this.settings.rigHold) {
          this.attempt.spent = true; this.attempt.reserved = null;
          s.armedBy = reserved; s.armedAt = this.timerClock('rig'); s.burstUntil = this.timerClock('rig') + this.settings.rigTime;
          s.rigDirection = shares(s)[s.ids.indexOf(reserved)] <= 1 / s.ids.length;
          this.privateEvent(s, 'rig', `${p.name} completed the ${this.settings.rigHold}-second Rig hold. One team attempt consumed; diverter armed, motor force ×${this.settings.rigForce} and pull-down ×${this.settings.rigDown} for ${this.settings.rigTime} seconds.`, reserved);
          // Holding Rig continues the public Pull input until the key is released.
          if (p.bot) p.rigging = false;
        }
      }
      for (const s of this.stations) {
        if (s.state === 'lifting' && this.timerClock('reload') >= s.resetUntil) this.physics(s, dt);
        else if (s.state === 'catch') {
          for (const [id, at] of Object.entries(s.catchPlan)) if (this.timerClock('catch') - s.catchAt >= at && !s.taps.has(Number(id)) && s.state === 'catch') {
            this.releaseCatch(Number(id)); this.pressCatch(Number(id), s.index);
          }
          if (s.state === 'catch' && this.timerClock('catch') - s.catchAt >= this.settings.catchWin) this.lose(s);
        } else if (s.state === 'reload' && this.timerClock('reload') >= s.reloadAt) {
          s.state = 'lifting'; s.h.fill(0); s.v.fill(0); s.x = (this.random() < .5 ? -1 : 1) * this.settings.x0; s.z = 0; s.vx = 0; s.vz = 0;
          s.message = 'Fresh capsule loaded. Bring it to center and keep lifting.';
          this.publicEvent(s, 'reload', 'A fresh capsule loaded at the starting height.');
        }
      }
      if (this.timers.phase.paused) return;
      if (this.mode === 'practice' && this.stations.every(s => ['delivered', 'lava'].includes(s.state))) {
        this.practiceResult = this.stations[0].state; this.setPhase('practice-result');
      } else if (this.timerClock() >= DURATIONS.challenge || this.stations.every(s => this.stationFinished(s))) this.finishChallenge();
    }
    makeReceipts(s) {
      // Same coverage for every station: outcome, longest observed handling
      // interval, and last catch response. No secret event influences selection.
      const latest = [...s.events].reverse();
      const outcome = latest.find(e => ['delivery', 'lava', 'timeout'].includes(e.kind));
      const attempts = s.events.filter(e => e.kind === 'catch');
      const handling = s.tracks.flatMap((tr, i) => [
        { id: s.ids[i], seconds: tr.maxHigh, action: 'held Pull while their corner was high', type: 'high-hold' },
        { id: s.ids[i], seconds: tr.maxIdle, action: 'left their motor idle while their corner was low', type: 'low-idle' },
        { id: s.ids[i], seconds: tr.maxRelease, action: 'released Pull while their corner was high', type: 'high-release' }
      ]).sort((a, b) => b.seconds - a.seconds || a.id - b.id)[0];
      const lastCatch = attempts[attempts.length - 1];
      return [
        { kind: 'outcome', text: `${s.ids.map(id => this.players[id].name).join(' + ')} operated this lift. ${outcome?.text || 'No delivery recorded.'} ${s.losses ? `${s.losses} uncaught spill${s.losses === 1 ? '' : 's'}.` : ''}`, ids: [...s.ids], failed: !s.delivered, losses: s.losses, state: outcome?.kind || 'timeout' },
        { kind: 'handling', text: handling.seconds >= .2 ? `${this.players[handling.id].name} ${handling.action} for ${handling.seconds.toFixed(1)}s.` : 'No sustained high Pull or low idle interval was recorded.', ids: [handling.id], type: handling.type, seconds: handling.seconds },
        { kind: 'response', text: lastCatch ? `${lastCatch.text} ${s.catches} successful save${s.catches === 1 ? '' : 's'} at this lift.` : 'No Catch input was recorded at this lift.', ids: lastCatch ? [lastCatch.id] : [], saved: lastCatch?.saved || false, saves: s.catches }
      ];
    }
    finishChallenge() {
      for (const s of this.stations) if (!['delivered', 'lava'].includes(s.state)) this.endStation(s, 'timeout');
      if (this.mode === 'practice') { this.practiceResult = 'timeout'; this.setPhase('practice-result'); return; }
      this.heists += this.stations.reduce((sum, s) => sum + s.heists, 0); this.completedActs = this.act;
      const record = { act: this.act, heists: this.stations.reduce((sum, s) => sum + s.heists, 0),
        pot: this.stations.filter(s => s.delivered).length, stations: [], votes: [] };
      for (const s of this.stations) { s.publicCards = this.makeReceipts(s); record.stations.push({ name: s.name, ids: [...s.ids], cards: s.publicCards, events: s.events.map(e => ({ ...e })) }); }
      this.history.push(record); this.updateSuspicion(record);
      this.outcome = winner(this.players, this.heists, this.completedActs, false);
      if (this.outcome) this.setPhase('finale');
      else this.beginVote();
    }
    updateSuspicion(record) {
      for (const p of this.players.filter(p => p.bot && p.active)) {
        p.suspicion = p.suspicion.map(score => score * .8);
        for (const s of record.stations) {
          const [outcome, handling, response] = s.cards;
          for (const id of s.ids) p.suspicion[id] += outcome.failed ? .45 : -.12;
          if (handling.seconds >= .5 && ['high-hold', 'low-idle'].includes(handling.type)) p.suspicion[handling.ids[0]] += Math.min(1.8, handling.seconds * .16);
          if (response.saved) for (const id of response.ids) p.suspicion[id] -= .25;
          // Aggregate heist information implicates neither an individual nor a
          // specific station; it only increases attention to uncaught spills.
          if (record.heists && outcome.losses) for (const id of s.ids) p.suspicion[id] += .35;
        }
      }
    }
    beginVote(runoff = false, candidates = this.activeIds()) {
      this.setPhase(runoff ? 'runoff' : 'vote'); this.ballots = {}; this.confidences = {}; this.voted.clear(); this.locked.clear(); this.candidates = [...candidates]; this.botVoteAt = {};
      for (const p of this.players.filter(p => p.bot && p.active)) this.botVoteAt[p.id] = 1 + this.random() * (runoff ? 7 : DURATIONS.vote - 5);
    }
    castVote(id, target) {
      if (!['vote', 'runoff'].includes(this.phase) || !this.players[id]?.active || this.locked.has(id) || this.timerClock() + 1e-8 >= DURATIONS[this.phase]) return false;
      if (target !== null && (target === id || !this.candidates.includes(target) || !this.players[target]?.active)) return false;
      if (this.ballots[id] !== target) this.confidences[id] = 'Hunch';
      this.ballots[id] = target; this.voted.add(id); return true;
    }
    lockVote(id) {
      if (!['vote', 'runoff'].includes(this.phase) || this.timerClock() + 1e-8 >= DURATIONS[this.phase] || !this.players[id]?.active || !this.voted.has(id) || this.locked.has(id)) return false;
      this.locked.add(id);
      if (!this.timers.phase.paused && this.activeIds().every(id => this.locked.has(id))) this.finishVote();
      return true;
    }
    setCertain(id, certain) {
      if (!['vote', 'runoff'].includes(this.phase) || this.timerClock() + 1e-8 >= DURATIONS[this.phase] || !this.players[id]?.active || this.locked.has(id) || !Number.isInteger(this.ballots[id])) return false;
      this.confidences[id] = certain ? 'Certain' : 'Hunch'; return true;
    }
    liveVotes() {
      // Use the same eligibility rules as the closing tally. Public choices
      // reflect each voter's latest choice. Certainty never changes vote weight.
      const result = tally(this.activeIds(), this.ballots, this.candidates);
      return {
        totals: { ...Object.fromEntries(this.players.map(p => [p.id, 0])), ...result.totals },
        choices: Object.fromEntries(result.accepted.map(v => [v.voter, v.target])),
        locked: this.activeIds().filter(id => this.locked.has(id)),
        certain: result.accepted.filter(v => this.confidences[v.voter] === 'Certain').map(v => v.voter),
        leaders: Math.max(0, ...Object.values(result.totals)) > 0 ? [...result.tied] : [],
        skipped: this.activeIds().filter(id => this.voted.has(id) && this.ballots[id] === null)
      };
    }
    botBallot(p) {
      const candidates = this.candidates.filter(id => id !== p.id);
      if (!candidates.length) return null;
      // Loyals consult public receipts only. Snakes know their teammate and try
      // to deflect suspicion; no ballot gets omniscient Loyal targeting.
      const scored = candidates.map(id => ({ id, score: p.suspicion[id] + this.random() * 2.1 - (p.role === 'Snake' && this.players[id].role === 'Snake' ? 10 : 0) }));
      scored.sort((a, b) => b.score - a.score); return scored[0].id;
    }
    finishVote() {
      const wasRunoff = this.phase === 'runoff';
      const result = tally(this.activeIds(), this.ballots, this.candidates);
      this.lastVote = { ...result, runoff: wasRunoff };
      this.history[this.history.length - 1].votes.push({ ...this.lastVote, confidences: { ...this.confidences } });
      if (result.removed === null && !wasRunoff) { this.beginVote(true, result.tied); return; }
      if (result.removed !== null) this.players[result.removed].active = false;
      this.outcome = winner(this.players, this.heists, this.completedActs, true);
      this.setPhase('result');
    }
    nextPhase() {
      if (this.phase === 'casting') this.beginAct();
      else if (['vote', 'runoff'].includes(this.phase)) this.finishVote();
      else if (this.phase === 'result') this.outcome ? this.setPhase('finale') : this.beginAct();
    }
    tick(dt = DT) {
      if (!Number.isFinite(dt) || dt <= 0) return;
      // Substeps make controls, deadlines, and Catch behavior independent of FPS.
      let remaining = dt;
      while (remaining > 1e-8) { const step = Math.min(DT, remaining); this.step(step); remaining -= step; }
    }
    step(dt) {
      if (['lobby', 'practice-result', 'finale'].includes(this.phase)) return;
      this.time += dt; this.phaseTime += dt;
      if (this.phase === 'challenge') { this.stepChallenge(dt); return; }
      if (['vote', 'runoff'].includes(this.phase)) {
        for (const p of this.players.filter(p => p.bot && p.active && !this.voted.has(p.id))) {
          if (this.phaseTime >= this.botVoteAt[p.id]) {
            this.castVote(p.id, this.botBallot(p)); this.lockVote(p.id);
            if (!['vote', 'runoff'].includes(this.phase)) break;
          }
        }
      }
      if (!this.timers.phase.paused && (this.timerClock() + 1e-8 >= DURATIONS[this.phase] || ['vote', 'runoff'].includes(this.phase) && this.activeIds().every(id => this.locked.has(id)))) this.nextPhase();
    }
  }
  const api = { Episode, CAST, PLACES, POSITIONS, DURATIONS, DT, clamp, mean, rng, shuffle, assignGroups, tally, winner, makeStation, shares, gradient, centeringTargets, needle, inCatchZone };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.SnakeShow = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
