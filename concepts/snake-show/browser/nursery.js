/* Local collection study. One saved snapshot contains ownership and receipts.
   This is not a server, a real trade service, or a production AFK policy. */
(function (root) {
  'use strict';
  const KEY = 'midnight-fair-nursery-v1';
  const PALETTE = [
    { id: 'lilac', name: 'Lilac', rarity: 'Common', color: '#ba91db', glow: '#dec3ff', weight: 50 },
    { id: 'peach', name: 'Peach', rarity: 'Common', color: '#edae9a', glow: '#ffdec5', weight: 25 },
    { id: 'mint', name: 'Mint', rarity: 'Uncommon', color: '#8bc7b3', glow: '#bffff0', weight: 15 },
    { id: 'midnight', name: 'Midnight blue', rarity: 'Rare', color: '#717bbe', glow: '#b1bfff', weight: 8 },
    { id: 'pearl', name: 'Pearl', rarity: 'Very rare', color: '#e4ddec', glow: '#d6b2ff', weight: 2 }
  ];
  const BADGES = [
    { id: 'first', name: 'First Friend', requirement: 'Earn a baby through a team victory.' },
    { id: 'both', name: 'Both Sides of the Moon', requirement: 'Earn a round reward as a Keeper and as a Trickster.' },
    { id: 'palette', name: 'Moonmop Devotee', requirement: 'Own Lilac, Peach, Mint, Midnight blue and Pearl Moonmops at the same time.' }
  ];
  const esc = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const shade = baby => PALETTE.find(p => p.id === baby?.variant) || PALETTE[0];
  const makeBaby = (id, variant, origin, nickname = 'Moonmop') => ({ id, species: 'Moonmop', variant, nickname, favorite: false, origin });
  function initial() {
    return { version: 1, babies: [], botBabies: ['peach', 'mint', 'lilac'].map((v, i) => makeBaby('leo-' + i, v, 'Local bot collection study — not a player-earned reward.', ['Apricot', 'Clover', 'Luna'][i])),
      claims: {}, exchanges: [], companion: null, showcase: [null, null, null], badges: [], equippedBadge: null, wins: [], visitorPetting: true, reactions: true };
  }
  function validate(s) {
    if (s?.version !== 1 || !Array.isArray(s.babies) || !Array.isArray(s.botBabies) || !s.claims || Array.isArray(s.claims) || typeof s.claims !== 'object' || !Array.isArray(s.exchanges) || !Array.isArray(s.badges) || !Array.isArray(s.wins) || !Array.isArray(s.showcase) || s.showcase.length !== 3) throw new Error('Invalid nursery snapshot');
    const all = [...s.babies, ...s.botBabies];
    if (new Set(all.map(b => b.id)).size !== all.length || all.some(b => typeof b.id !== 'string' || !PALETTE.some(p => p.id === b.variant) || b.species !== 'Moonmop' || typeof b.nickname !== 'string' || typeof b.origin !== 'string')) throw new Error('Invalid individual');
    const owned = id => id === null || s.babies.some(b => b.id === id);
    if (!owned(s.companion) || !s.showcase.every(owned) || s.badges.some(id => !BADGES.some(b => b.id === id)) || s.equippedBadge !== null && !s.badges.includes(s.equippedBadge)) throw new Error('Invalid equipment');
    return s;
  }
  class Collection {
    constructor(storage) {
      this.storage = storage; this.state = initial(); this.warning = ''; this.revision = 0;
      try { const raw = storage?.getItem(KEY); if (raw) this.state = validate(JSON.parse(raw)); }
      catch { this.storage = null; this.warning = 'Saved nursery could not be read. It has been preserved; this session uses a temporary nursery.'; }
    }
    commit(next) {
      validate(next);
      try { if (!this.storage) throw new Error('No storage'); this.storage.setItem(KEY, JSON.stringify(next)); }
      catch { this.warning ||= 'Browser saving is unavailable. These babies and changes last only in this tab.'; }
      this.state = next; this.revision++;
    }
    unlock(s) {
      if (s.wins.length && !s.badges.includes('first')) s.badges.push('first');
      if (['Keeper', 'Trickster'].every(r => s.wins.includes(r)) && !s.badges.includes('both')) s.badges.push('both');
      if (PALETTE.every(p => s.babies.some(b => b.variant === p.id)) && !s.badges.includes('palette')) s.badges.push('palette');
    }
    award(game, id = 0) {
      if (!game.rewardEligible(id)) return null;
      const key = game.roundId + ':' + id;
      if (Object.hasOwn(this.state.claims, key)) return this.state.babies.find(b => b.id === this.state.claims[key]) || null;
      // Independent of the physics stream, role, deliveries, Catch and Rig credit.
      let value = (root.SnakeShow || require('./engine.js')).rng(game.seed ^ 0x7ea519bd ^ id)() * 100;
      const variant = PALETTE.find(p => (value -= p.weight) < 0) || PALETTE.at(-1);
      const role = game.players[id].role;
      const baby = makeBaby('award-' + key, variant.id, `Earned in a Moonmop Lift round — ${role} victory · Round ${String(game.seed % 1000).padStart(3, '0')} · ${new Date().toLocaleDateString('en-GB')}.`);
      const next = structuredClone(this.state); next.babies.push(baby); next.claims[key] = baby.id;
      if (!next.wins.includes(role)) next.wins.push(role);
      this.unlock(next); this.commit(next); return baby;
    }
    edit(id, change) {
      const next = structuredClone(this.state), baby = next.babies.find(b => b.id === id);
      if (!baby) return false;
      if (typeof change.nickname === 'string') baby.nickname = change.nickname.trim().slice(0, 24) || 'Moonmop';
      if (typeof change.favorite === 'boolean') baby.favorite = change.favorite;
      this.commit(next); return true;
    }
    equip(kind, id, slot = 0) {
      if (id !== null && !this.state.babies.some(b => b.id === id)) return false;
      const next = structuredClone(this.state);
      if (kind === 'companion') next.companion = id;
      else if (kind === 'showcase' && Number.isInteger(slot) && slot >= 0 && slot < 3) {
        next.showcase = next.showcase.map(v => v === id ? null : v); next.showcase[slot] = id;
      } else return false;
      this.commit(next); return true;
    }
    setting(key, value) {
      if (!['visitorPetting', 'reactions', 'equippedBadge'].includes(key)) return false;
      if (key === 'equippedBadge' ? value !== null && !this.state.badges.includes(value) : typeof value !== 'boolean') return false;
      this.commit({ ...structuredClone(this.state), [key]: value }); return true;
    }
    exchange(trade) {
      if (this.state.exchanges.includes(trade.id)) return 'already';
      if (!trade.mine || !trade.theirs || !trade.confirmed || !trade.botConfirmed) return 'unconfirmed';
      const next = structuredClone(this.state), mine = next.babies.find(b => b.id === trade.mine), theirs = next.botBabies.find(b => b.id === trade.theirs);
      if (!mine || !theirs || mine.favorite) return 'changed';
      next.babies = next.babies.filter(b => b.id !== mine.id).concat(theirs);
      next.botBabies = next.botBabies.filter(b => b.id !== theirs.id).concat(mine);
      if (next.companion === mine.id) next.companion = null;
      next.showcase = next.showcase.map(id => id === mine.id ? null : id);
      next.exchanges.push(trade.id); this.unlock(next); this.commit(next); return 'complete';
    }
    counts() { return { individuals: this.state.babies.length, species: this.state.babies.length ? 1 : 0, variants: new Set(this.state.babies.map(b => b.variant)).size }; }
  }
  // Original vector study of the selected long-ear anatomy; no external assets.
  function art(baby, pose = '', flip = false) {
    const p = shade(baby), asleep = pose === 'sleep', happy = pose === 'pet' || pose === 'Aww!', wow = pose === 'Wow!';
    if (asleep) return `<svg xmlns="http://www.w3.org/2000/svg" class="moonmop-art sleep" viewBox="0 0 260 205" role="img" aria-label="${esc(p.name)} Moonmop asleep with her head on her paddle tail and her ears as a blanket"><g transform="${flip ? 'translate(260 0) scale(-1 1)' : ''}"><ellipse cx="133" cy="178" rx="114" ry="16" fill="#24213918"/><ellipse cx="158" cy="126" rx="68" ry="53" fill="${p.color}"/><path d="M178 148Q250 116 242 157Q243 190 61 185Q13 185 19 163Q35 137 101 148" fill="${p.glow}" stroke="${p.color}" stroke-width="7"/><g transform="rotate(-12 91 120)"><ellipse cx="90" cy="113" rx="48" ry="43" fill="${p.color}"/><path d="M47 114Q60 98 72 121Q96 137 116 112Q128 103 135 115Q129 152 90 154Q46 150 47 114" fill="#fff0df"/><path d="M62 124q8 10 17 0m27-2q8 10 17 0" fill="none" stroke="#40304f" stroke-width="4" stroke-linecap="round"/><path d="m88 136 6 4 6-4" fill="#8a639e"/><path d="M90 146q5 3 9-1" fill="none" stroke="#8f6372" stroke-width="2"/></g><path d="M125 83Q186 54 212 128Q220 151 240 158Q263 184 211 180Q161 178 157 121Q150 94 125 94M54 89Q20 98 23 146Q18 174 50 177Q81 184 87 174Q98 159 66 159Q43 142 59 118" fill="${p.color}" stroke="#3f2b5015" stroke-width="4"/><ellipse cx="113" cy="157" rx="13" ry="8" fill="${p.color}"/><text x="205" y="54" fill="#9b85af" font-size="17">z z</text></g></svg>`;
    return `<svg xmlns="http://www.w3.org/2000/svg" class="moonmop-art ${esc(pose)}" viewBox="0 0 260 205" role="img" aria-label="${esc(p.name)} Moonmop ${asleep ? 'sleeping with ears as a blanket and tail as a pillow' : 'with long trailing ears and a glowing paddle tail'}"><g transform="${flip ? 'translate(260 0) scale(-1 1)' : ''}"><ellipse cx="130" cy="183" rx="98" ry="13" fill="#24213918"/><path d="M159 146Q227 ${wow ? 40 : 96} 243 ${wow ? 65 : 131}Q251 177 164 169" fill="${p.glow}" stroke="${p.color}" stroke-width="7"/><ellipse cx="131" cy="128" rx="51" ry="53" fill="${p.color}"/><ellipse cx="128" cy="139" rx="28" ry="32" fill="#fff0df"/><path d="M92 63Q51 29 40 125Q38 165 15 171Q-5 193 54 184Q86 180 94 104M165 62Q204 29 219 124Q220 163 243 173Q265 194 206 185Q175 178 167 105" fill="${p.color}" stroke="#3f2b5015" stroke-width="4"/><ellipse cx="128" cy="79" rx="51" ry="49" fill="${p.color}"/><path d="M85 72Q92 62 103 82Q126 101 152 81Q166 58 174 72Q183 123 130 126Q75 122 85 72" fill="#fff0df"/><path d="M112 34q-10-28 10-11q5-28 15-9q19-17 14 16" fill="${p.color}"/>${asleep || happy ? '<path d="M97 89q8 10 17 0m31 0q8 10 17 0" fill="none" stroke="#40304f" stroke-width="4" stroke-linecap="round"/>' : '<g fill="#382841"><ellipse cx="105" cy="85" rx="8" ry="11"/><ellipse cx="154" cy="85" rx="8" ry="11"/></g><g fill="#fff"><circle cx="103" cy="81" r="3"/><circle cx="152" cy="81" r="3"/></g>'}<path d="m123 99 7 5 7-5q-6-5-14 0" fill="#8a639e"/><path d="M130 105q-6 13-12 5m12-5q6 13 12 5" fill="none" stroke="#8f6372" stroke-width="2"/><ellipse cx="102" cy="176" rx="18" ry="11" fill="${p.color}"/><ellipse cx="156" cy="176" rx="18" ry="11" fill="${p.color}"/>${asleep ? `<path d="M62 125Q67 195 189 169Q159 115 83 120" fill="${p.color}"/><ellipse cx="128" cy="131" rx="58" ry="13" fill="${p.glow}"/><path d="M185 107q50 85-51 70" fill="${p.color}"/><text x="204" y="46" fill="#9b85af" font-size="18">z z</text>` : `<ellipse cx="89" cy="133" rx="13" ry="20" transform="rotate(-25 89 133)" fill="${p.color}"/><ellipse cx="171" cy="${pose === 'Hello!' ? 91 : 133}" rx="13" ry="20" transform="rotate(25 171 133)" fill="${p.color}"/>`}${happy ? '<text x="205" y="42" font-size="27" fill="#d37e9c">♥</text>' : ''}</g></svg>`;
  }
  root.MidnightNursery = { Collection, PALETTE, BADGES, KEY, art, shade, esc, makeBaby };
  if (typeof module !== 'undefined' && module.exports) module.exports = root.MidnightNursery;
})(globalThis);
