/* Illustrated summaries of the same three public observations per lift.
   These are pictograms, not a replay or a reconstruction of hidden actions. */
(function (root) {
  'use strict';
  const esc = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const svg = (body, view = '0 0 240 140', cls = '') => `<svg class="${cls}" viewBox="${view}" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;
  function icon(name) {
    const paths = {
      crown: '<path d="m3 7 5 4 4-7 4 7 5-4-2 13H5Z" fill="currentColor"/><path d="M6 17h12" stroke="#fff" stroke-width="2"/>',
      clock: '<circle cx="12" cy="13" r="8"/><path d="M12 8v5l3 2M9 2h6"/>',
      camera: '<rect x="3" y="6" width="18" height="14" rx="4"/><path d="m7 6 2-3h6l2 3"/><circle cx="12" cy="13" r="4"/>',
      envelope: '<rect x="2" y="5" width="20" height="15" rx="3"/><path d="m3 7 9 7 9-7"/>',
      check: '<path d="m5 12 5 5L20 6"/>',
      hand: '<path d="M7 12V5a2 2 0 0 1 4 0v6-8a2 2 0 0 1 4 0v8-6a2 2 0 0 1 4 0v8-4a2 2 0 0 1 3 0v7c0 6-11 7-14 2l-4-5c-2-3 1-4 3-1Z"/>',
      up: '<path d="M12 21V3M5 10l7-7 7 7"/>',
      down: '<path d="M12 3v18m-7-7 7 7 7-7"/>',
      lock: '<rect x="4" y="10" width="16" height="12" rx="3"/><path d="M7 10V6a5 5 0 0 1 10 0v4M12 15v3"/>',
      snake: '<path d="M4 20h10c8 0 8-9 1-9H9c-5 0-5-7 0-7h8"/><path d="m17 2 4 2-4 2"/>',
      shield: '<path d="M12 2 3 6v6c0 5 9 10 9 10s9-5 9-10V6Z"/><path d="m7 12 3 3 7-7"/>',
      skip: '<path d="m7 5 7 7-7 7M19 5v14"/>',
      close: '<path d="m6 6 12 12M6 18 18 6"/>',
      lava: '<path d="M3 20h18M7 16c-6-6 6-7 5-14 8 8 9 11 5 14M10 16c-2-2 2-5 3-6 2 4 2 5 1 6"/>',
      pause: '<path d="M8 5v14M16 5v14"/>',
      question: '<path d="M8 7c0-6 10-6 10 0 0 4-6 3-6 8M12 20h.01"/>'
    };
    return svg(`<g fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${paths[name] || paths.question}</g>`, '0 0 24 24', 'vote-icon');
  }
  function person(p, x = 0, y = 0, size = 1, revealRole = false) {
    // Role cues are opt-in for private cards and confirmed role reveals.
    const eyes = revealRole && p.role === 'Snake'
      ? '<g class="snake-eyes" fill="#ffe04f" stroke="#665523" stroke-width=".8"><ellipse cx="-7" cy="10" rx="5" ry="4.5"/><ellipse cx="8" cy="10" rx="5" ry="4.5"/><path d="M-7 6.5v7m15-7v7" stroke="#253c32" stroke-width="1.8"/></g>'
      : '<g fill="#243f3c"><ellipse cx="-7" cy="10" rx="2" ry="2.8"/><ellipse cx="8" cy="10" rx="2" ry="2.8"/></g>';
    const pin = revealRole && p.role === 'Loyal' ? '<g class="loyal-prize-pin">' + crown(13,54,.5) + '</g>' : '';
    // Match the onstage cast's shirt, hair, skin, and glasses.
    return `<g transform="translate(${x} ${y}) scale(${size})"><path d="M-25 69v-9q0-24 25-24t25 24v9" fill="${esc(p.color)}" stroke="#243f3c" stroke-width="2"/><path d="M-9 39q9 9 18 0" fill="none" stroke="#fff5df" stroke-width="3"/><rect x="-8" y="24" width="16" height="18" rx="5" fill="#ebbf91"/><ellipse cy="5" rx="24" ry="27" fill="${esc(p.hair)}"/><rect x="-20" y="-8" width="40" height="40" rx="15" fill="#ebbf91"/><path d="M-22 1v-12q1-24 27-15 18 6 17 26L6-8-5 0-11-5Z" fill="${esc(p.hair)}"/>${eyes}<path d="M-4 23q5 3 10-1" fill="none" stroke="#986548" stroke-width="2" stroke-linecap="round"/>${p.id % 3 === 1 ? '<g fill="none" stroke="#344940" stroke-width="2"><rect x="-17" y="3" width="13" height="12" rx="4"/><rect x="3" y="3" width="13" height="12" rx="4"/><path d="M-4 7h7"/></g>' : ''}${pin}</g>`;
  }
  function suspectHood() {
    return '<g class="suspect-hood"><path d="M20 42Q13 4 50 3t30 39L69 28Q50 16 31 28Z" fill="#a0c957" stroke="#486948" stroke-width="2"/><ellipse cx="37" cy="14" rx="5" ry="6" fill="#fff6b8"/><ellipse cx="63" cy="14" rx="5" ry="6" fill="#fff6b8"/><path d="M37 11v6m26-6v6" stroke="#304c3f" stroke-width="2.5"/><path d="M50 4V0m0 0-4-3m4 3 4-3" stroke="#d77c81" stroke-width="2"/></g>';
  }
  function portrait(p) { return svg(person(p, 50, 39, .94), '0 0 100 106', 'portrait'); }
  function rolePortrait(p) { return svg(person(p, 50, 39, .94, true), '0 0 100 106', 'portrait role-portrait'); }
  function votingPortrait(p) {
    const arm = `<path class="pointing-elbow" hidden fill="none" stroke="${esc(p.color)}" stroke-width="13" stroke-linecap="round"/><g class="pointing-arm" hidden><path d="M0 0h17" stroke="#243f3c" stroke-width="16" stroke-linecap="round"/><path d="M0 0h17" stroke="${esc(p.color)}" stroke-width="13" stroke-linecap="round"/><path d="M16-5h9l5-3h13q5 0 5 3t-5 3h-9l6 2q4 2 1 5l-7 3-10-3h-8Z" fill="#ebbf91" stroke="#715b43" stroke-width="1.4" stroke-linejoin="round"/><path d="m31 2 8 1m-9 2 6 2" fill="none" stroke="#b78a62" stroke-width="1"/></g>`;
    return svg(person(p, 50, 39, .94) + suspectHood() + arm, '0 0 100 106', 'portrait voting-portrait');
  }
  function pointingPose(from, to) {
    // SVGs use xMidYMid meet: account for letterboxing, then aim the index
    // finger from a shoulder toward the accused character's face.
    const point = (rect, x, y) => {
      const scale = Math.min(rect.width / 100, rect.height / 106);
      return { x: rect.left + (rect.width - 100 * scale) / 2 + x * scale,
        y: rect.top + (rect.height - 106 * scale) / 2 + y * scale };
    };
    const target = point(to, 50, 52), center = point(from, 50, 78);
    const right = target.x >= center.x, shoulder = right ? 70 : 30;
    const vertical = Math.abs(target.y - center.y) > Math.abs(target.x - center.x);
    const x = vertical ? right ? 84 : 16 : shoulder, origin = point(from, x, 78);
    const angle = Math.atan2(target.y - origin.y, target.x - origin.x);
    // Keep upward fingers beside the face and downward fingers above the name.
    const scale = Math.min(1, 26 / (48 * Math.max(.01, Math.sin(angle))));
    return { x, y: 78, shoulder, scale, angle: angle * 180 / Math.PI };
  }
  function candidateState(game, p, live) {
    const self = p.id === 0 && game.mode !== 'watch';
    const eligible = p.active && game.candidates.includes(p.id);
    const target = live.choices[p.id];
    return {
      disabled: self || !eligible || game.mode === 'watch' || !game.players[0].active || game.locked.has(0) || !['vote', 'runoff'].includes(game.phase),
      tag: !p.active ? 'OUT' : self ? 'YOU' : !eligible ? 'NOT TIED' : '',
      leader: live.leaders.includes(p.id),
      certain: live.certain.includes(p.id),
      count: live.totals[p.id] || 0,
      target: target === undefined ? null : target,
      skipped: live.skipped.includes(p.id)
    };
  }
  const crown = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><circle r="18" fill="#ffe379" stroke="#a57526" stroke-width="2"/><path d="m-11-7 6 5 5-8 5 8 6-5-2 16H-9Z" fill="#dba039"/><path d="M-9 6H9" stroke="#fff4ae" stroke-width="2"/></g>`;
  const clock = (x, y) => `<g transform="translate(${x} ${y})"><circle r="25" fill="#fff9e4" stroke="#7e719e" stroke-width="4"/><path d="M0-14V0l10 6M-6-32H6" fill="none" stroke="#7e719e" stroke-width="4" stroke-linecap="round"/></g>`;
  function outcomeScene(card) {
    const state = card.state || (!card.failed ? 'delivery' : 'timeout');
    const y = state === 'delivery' ? 43 : state === 'lava' ? 113 : 81;
    return svg(`<rect width="240" height="140" rx="14" fill="${state === 'delivery' ? '#dcf3da' : state === 'lava' ? '#ffe4cd' : '#e9e6f7'}"/><path d="M49 115V15h142v100" fill="none" stroke="#536f65" stroke-width="8" stroke-linecap="round"/><path d="M69 18v${y-18}m102 ${18-y}v${y-18}" fill="none" stroke="#536f65" stroke-width="3"/><path d="M68 ${y}h104" stroke="#536f65" stroke-width="8" stroke-linecap="round"/><path d="M24 123q16-14 32 0t32 0 32 0 32 0 32 0 32 0v17H24" fill="#ef9670"/>${state === 'lava' ? '<path d="m86 104-7-12m34 8 1-17m39 21 8-13" stroke="#d4603c" stroke-width="4" stroke-linecap="round"/>' : crown(state === 'delivery' ? 120 : 98, y-22)}${state === 'delivery' ? '<g stroke="#b69a35" stroke-width="3"><path d="m31 43-8-3m8 18-8 3m186-18 8-3m-8 18 8 3"/></g><path d="m164 67 11 11 21-25" fill="none" stroke="#3b7b5e" stroke-width="7" stroke-linecap="round"/>' : state === 'timeout' ? clock(186,64) : ''}`);
  }
  function handlingScene(card, players) {
    if (card.seconds < .2) return svg(`<rect width="240" height="140" rx="14" fill="#edf2ed"/><path d="M55 83h130M65 24v59m110-59v59" fill="none" stroke="#728880" stroke-width="5"/><circle cx="120" cy="51" r="16" fill="#fffaf0"/><path d="M113 51h14" stroke="#728880" stroke-width="3"/>`);
    const p = players[card.ids[0]], low = card.type === 'low-idle', holding = card.type === 'high-hold';
    const y = low ? 101 : 43;
    return svg(`<rect width="240" height="140" rx="14" fill="#e8edf9"/>${person(p,40,45,.78)}<path d="M88 14h123M98 15v${y-15}m103 ${15-y}v${low ? 30 : 83}" fill="none" stroke="#728880" stroke-width="4"/><path d="M98 ${y} 201 ${low ? 45 : 98}" stroke="#425f58" stroke-width="8" stroke-linecap="round"/><circle cx="98" cy="${y}" r="8" fill="${esc(p.color)}" stroke="#fff" stroke-width="3"/>${holding ? '<path d="M78 91V52m-8 9 8-9 8 9" fill="none" stroke="#425e85" stroke-width="5" stroke-linecap="round"/>' : '<g transform="translate(65 71)" stroke="#425e85" stroke-width="3" stroke-linejoin="round" fill="#fff5df"><path d="M0 16V3q2-4 4 0v9-15q2-4 4 0v15-13q2-4 4 0v13-10q2-4 4 0v17q-4 15-14 5l-8-10q-1-5 4-2Z"/></g>'}<path d="M149 124h60" stroke="#c3ced8" stroke-width="4" stroke-linecap="round"/>`);
  }
  function catchScene(card, players) {
    if (!card.ids.length) return svg('<rect width="240" height="140" rx="14" fill="#edf2ed"/><circle cx="120" cy="66" r="34" fill="#dbe5dc"/><path d="M103 66h34" stroke="#7c9485" stroke-width="6" stroke-linecap="round"/>');
    const p = players[card.ids[0]];
    return svg(`<rect width="240" height="140" rx="14" fill="${card.saved ? '#dcf3da' : '#f9e8d5'}"/>${person(p,83,44,.9)}<path d="m102 93 30-22 18 4" fill="none" stroke="${esc(p.color)}" stroke-width="13" stroke-linecap="round"/><path d="m150 75 8-4 8 2" fill="none" stroke="#ebbf91" stroke-width="10" stroke-linecap="round"/>${crown(card.saved ? 160 : 196, card.saved ? 52 : 104)}${card.saved ? '<path d="m174 38 8 8 15-18" fill="none" stroke="#3b7b5e" stroke-width="5" stroke-linecap="round"/>' : '<path d="M192 24q-19 26 4 52m-9-5 9 5 5-10" stroke="#be8151" stroke-width="3" stroke-dasharray="4 5" fill="none"/>'}`);
  }
  function facts(station, players) {
    const [outcome, handling, response] = station.cards;
    return [
      { key: 'outcome', title: 'The finish', label: outcome.state === 'lava' ? 'Into the lava' : !outcome.failed ? 'Delivered!' : 'Time ran out', image: outcomeScene(outcome), text: outcome.text },
      { key: 'handling', title: 'At the controls', label: handling.seconds < .2 ? 'No long hold or pause' : `${players[handling.ids[0]].name} ${({'high-hold':'pulled high','low-idle':'paused low','high-release':'let go high'})[handling.type]}`, image: handlingScene(handling, players), text: handling.text },
      { key: 'response', title: 'The last catch', label: !response.ids.length ? 'No catch tried' : `${players[response.ids[0]].name} ${response.saved ? 'caught it!' : 'missed'}`, image: catchScene(response, players), text: response.text }
    ];
  }
  function memoryCast(station, players) {
    return '<div class="memory-cast">' + station.ids.map(id => '<button class="memory-player" data-vote-shortcut="' + id + '" disabled aria-label="Vote for ' + esc(players[id].name) + '">' + svg(person(players[id],50,39,.94)+suspectHood(), '0 0 100 106', 'portrait') + '<b>' + esc(players[id].name) + '</b><span class="shortcut-count" hidden></span></button>').join('') + '</div>';
  }
  function waitingStation(station, players) {
    return '<article class="lift-memory waiting-lift"><span class="memory-heading"><b>' + esc(station.name.replace(' lift','')) + '</b>' + icon('clock') + '</span>' + memoryCast(station, players) + outcomeScene({state:'lifting'}) + '<b class="waiting-label">Still playing…</b></article>';
  }
  function stationCard(station, players, index) {
    const f = facts(station, players), [outcome] = station.cards;
    return '<article class="lift-memory receipt"><span class="memory-heading"><b>' + esc(station.name.replace(' lift','')) + '</b>' + icon('camera') + '</span>' + memoryCast(station, players) + '<button class="memory-details" data-receipt="' + index + '" aria-label="' + esc(station.name + ': ' + f.map(f=>f.label).join('. ') + '. See what happened.') + '"><span class="memory-pictures">' + f.slice(1).map(fact=>'<span>'+fact.image+'<b>'+esc(fact.label)+'</b></span>').join('') + '</span><span class="memory-outcome ' + (outcome.failed ? '' : 'delivered') + '">' + icon(outcome.state === 'lava' ? 'lava' : outcome.failed ? 'clock' : 'crown') + ' ' + f[0].label + '</span><span class="memory-foot">' + (outcome.losses ? icon('down')+' '+outcome.losses+' lost' : icon('crown')+' 0 lost') + '<span>Look closer +</span></span></button></article>';
  }
  function spotterScene(card, p) {
    // The spotter beside a rescue area: a dashed area, the gantry, and the
    // contestant. Saves and misses are shown as the crown kept or dropped.
    const stood = card.seconds >= .2;
    return svg(`<rect width="240" height="140" rx="14" fill="${card.saves ? '#dcf3da' : card.misses ? '#f9e8d5' : '#eef1e6'}"/><path d="M150 118V22h72v96" fill="none" stroke="#536f65" stroke-width="7" stroke-linecap="round"/><path d="M160 60h52" stroke="#536f65" stroke-width="7" stroke-linecap="round"/><ellipse cx="72" cy="112" rx="58" ry="16" fill="none" stroke="${stood ? '#7c9485' : '#c3ced8'}" stroke-width="3" stroke-dasharray="7 6"/>${person(p, 72, 44, .9)}${card.saves ? crown(186, 40, .8) + '<path d="m196 26 7 7 13-16" fill="none" stroke="#3b7b5e" stroke-width="5" stroke-linecap="round"/>' : card.misses ? crown(186, 104, .8) : ''}`);
  }
  function spotterCard(card, players) {
    const p = players[card.id], taps = card.saves + card.misses;
    const label = card.station ? `Spotted the ${card.station.replace(' lift', '')} lift` : 'Kept moving';
    const foot = !taps ? 'No catch tried' : `${card.saves} caught · ${card.misses} missed`;
    return '<article class="lift-memory receipt spotter-memory"><span class="memory-heading"><b>Spotter</b>' + icon('camera') + '</span>' + memoryCast({ ids: [card.id] }, players) + '<div class="memory-details spotter-details" aria-label="' + esc(p.name + ' spotted this act. ' + card.text) + '"><span class="memory-pictures"><span>' + spotterScene(card, p) + '<b>' + esc(label) + '</b></span></span><span class="memory-outcome">' + icon('shield') + ' No console this act</span><span class="memory-foot">' + icon(card.saves ? 'check' : card.misses ? 'down' : 'question') + ' ' + esc(foot) + '<span>' + (card.station ? Math.round(card.seconds) + 's there' : '') + '</span></span></div></article>';
  }
  function detail(station, players) {
    return `<div class="moment-strip">${facts(station, players).map(f=>`<article class="moment"><h3>${f.title}</h3>${f.image}<b>${esc(f.label)}</b></article>`).join('')}</div><details class="camera-notes"><summary>More detail</summary>${station.cards.map(c=>`<p>${esc(c.text)}</p>`).join('')}</details>`;
  }
  function result(vote, players) {
    const removed = vote.removed === null ? null : players[vote.removed];
    const hero = removed ? `<div class="reveal-spotlight ${removed.role === 'Snake' ? 'snake-reveal' : 'loyal-reveal'}">${rolePortrait(removed)}<div><span class="reveal-kicker">VOTED OUT</span><h2>${esc(removed.name)}</h2><span class="role-stamp">${icon(removed.role === 'Snake' ? 'snake' : 'shield')} ${removed.role}</span></div></div>` : `<div class="deadlock-art">${icon('envelope')}${icon('envelope')}</div><h2>Another tie. Everyone stays!</h2>`;
    const totals = Object.entries(vote.totals).map(([id, count])=>`<div class="vote-total-person ${Number(id) === vote.removed ? 'removed' : ''}">${Number(id) === vote.removed ? rolePortrait(players[id]) : portrait(players[id])}<b>${esc(players[id].name)}</b><span class="vote-token-count" aria-label="${count} votes">${icon('envelope')} ${count}</span></div>`).join('');
    return `${hero}<div class="vote-totals" aria-label="Final vote totals">${totals}</div><p class="result-foot">${vote.abstentions ? `${vote.abstentions} skipped · ` : ''}Next up in <b id="resultCountdown">5</b>s</p>`;
  }
  const api = { icon, portrait, rolePortrait, votingPortrait, pointingPose, candidateState, facts, stationCard, spotterCard, waitingStation, detail, result };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.VoteView = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
