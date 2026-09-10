(function () {
  'use strict';
  const { Episode, POSITIONS, PLACES, DURATIONS, clamp, centeringTargets, needle, shares } = SnakeShow;
  const { FIXED, DEFAULTS, SLIDERS, catchGeometry, neededDuty, speeds } = LiftSettings;
  const $ = id => document.getElementById(id);
  const scene = new SnakeScene($('scene'));
  const timerHome = document.createComment('Development timer bar home');
  $('devTimers').before(timerHome);
  function placeTimerControls(dialog = null) {
    if (dialog) dialog.prepend($('devTimers'));
    else timerHome.after($('devTimers'));
  }
  // The dialog close event is dispatched later; the open attribute changes at once, so watch that instead.
  const dialogWatcher = new MutationObserver(() => placeTimerControls(['cameraDialog', 'helpDialog'].map($).find(dialog => dialog.open)));
  for (const id of ['cameraDialog', 'helpDialog']) dialogWatcher.observe($(id), { attributeFilter: ['open'] });
  const params = new URLSearchParams(location.search);
  const devMode = params.get('dev') === '1';
  let devTools = null;
  const validSeed = params.has('seed') && /^\d+$/.test(params.get('seed'));
  const storageKey = 'snake-show-lift-draft-v1';
  let draft = { ...DEFAULTS }, tuningOpen = false, draftStatus = 'Prototype baseline. Changes are saved in this browser.';
  try { const saved = localStorage.getItem(storageKey); if (saved) { draft = LiftSettings.importDraft(saved); draftStatus = 'Restored your saved local draft.'; } }
  catch { draftStatus = 'Using the prototype baseline. The saved draft could not be read.'; }
  let game, paused = false, lastPhase = '', selected = null, shownAct = 1, roleVisible = true;
  let view = { camera: 'villa', station: 0, destination: null, moving: false };
  let lastTime = 0, accumulated = 0, lastUi = 0, drawTime = 0, sound = false, audioContext;
  let castSignature = '', tabSignature = '', revealSignature = '', voteSignature = '', pointerFrame = 0;
  let earlyReviewOpen = false, earlyReviewSeen = false, earlySignature = '';
  const keys = new Set(), holds = { pull: new Set(), rig: new Set(), catch: new Set() };
  const show = (id, visible) => { $(id).hidden = !visible; };
  const set = (id, text) => { if ($(id).textContent !== text) $(id).textContent = text; };
  function seed() { return validSeed ? Number(params.get('seed')) >>> 0 : crypto.getRandomValues(new Uint32Array(1))[0]; }
  function escape(text) { return String(text).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]); }
  function avatar(p) { return `<span class="avatar" style="--color:${p.color}" aria-hidden="true"></span>`; }
  function announce(text) { set('announcement', text); }
  function tone(freq = 500, length = .12) {
    if (!sound || !audioContext) return;
    const osc = audioContext.createOscillator(), gain = audioContext.createGain();
    osc.frequency.value = freq; osc.type = 'sine'; gain.gain.setValueAtTime(.045, audioContext.currentTime); gain.gain.exponentialRampToValueAtTime(.0001, audioContext.currentTime + length);
    osc.connect(gain); gain.connect(audioContext.destination); osc.start(); osc.stop(audioContext.currentTime + length);
  }
  function reset(mode = 'play', start = false, runSeed = seed()) {
    releaseInputs(); game = new Episode({ seed: runSeed, mode, settings: draft }); paused = false; lastPhase = '';
    earlyReviewOpen = false; earlyReviewSeen = false; earlySignature = '';
    selected = null; shownAct = 1; roleVisible = true; accumulated = 0; castSignature = ''; tabSignature = ''; revealSignature = '';
    view = { camera: 'villa', station: 0, destination: null, moving: false };
    game.players[0].x = 497; game.players[0].y = 522;
    $('speed').value = '1';  show('pauseOverlay', false);
    if (start) { game.start(); tone(620, .2); }
    updateUI(true); window.scrollTo({ top: 0, behavior: 'instant' });
  }
  function refreshTuning() {
    for (const spec of SLIDERS) {
      $(`tune-${spec.key}`).value = String(draft[spec.key]);
      $(`value-${spec.key}`).value = draft[spec.key].toFixed(spec.digits);
      $(`slider-${spec.key}`).classList.toggle('changed', draft[spec.key] !== DEFAULTS[spec.key]);
    }
    const zone = catchGeometry(draft), balanced = speeds(draft), heavy = speeds(draft, 1);
    const duty = share => { const value = neededDuty(draft, share); return value > 1 ? 'cannot lift' : `${Math.round(value * 100)}% hold`; };
    $('tuningDerived').innerHTML = [
      ['Prize at your end', duty(1)], ['Prize centered', duty(.5)], ['Prize at far end', duty(0)],
      ['Centered speed ↑ / ↓', `${balanced.up.toFixed(2)} / ${balanced.down.toFixed(2)} u/s`],
      ['Heavy-end speed ↑ / ↓', `${heavy.up.toFixed(2)} / ${heavy.down.toFixed(2)} u/s`],
      ['Static tilt threshold', `${(Math.atan(draft.mus / draft.roll) * 180 / Math.PI).toFixed(1)}°`],
      ['Best-case climb estimate', balanced.up ? `${(FIXED.finish / balanced.up).toFixed(1)}s` : 'cannot climb'],
      ['Effective Catch zone', `${zone.seconds.toFixed(2)}s per pass${zone.seconds + 1e-6 < draft.catchZone ? ' · clipped by track end' : ''}`]
    ].map(([label, value]) => `<div><span>${label}</span><b>${value}</b></div>`).join('');
    $('tuningJson').value = LiftSettings.exportDraft(draft);
    set('tuningStatus', draftStatus);
  }
  function applyDraft(values, message) {
    // Validate the entire draft before applying any field or writing storage.
    const validated = LiftSettings.normalize(values, true);
    game.applySettings(validated); draft = validated;
    try { localStorage.setItem(storageKey, LiftSettings.exportDraft(draft)); draftStatus = message + ' Saved in this browser.'; }
    catch { draftStatus = message + ' Kept for this tab; browser storage is unavailable.'; }
    refreshTuning(); updateUI();
  }
  function openTuning(on) {
    tuningOpen = on; show('tuningPanel', on); document.body.dataset.tuning = String(on);
    $('tuneToggle').setAttribute('aria-expanded', String(on)); set('tuneToggle', on ? 'Close tuning' : 'Tune lift');
    if (on) { roleVisible = false; $('mechanicsPanel').open = innerWidth > 850; refreshTuning(); }
    updateUI();
    if (on) $('tuningPanel').scrollIntoView({ block: 'nearest', behavior: scene.reduced ? 'instant' : 'smooth' });
  }
  function buildTuning() {
    const groups = [...new Set(SLIDERS.map(spec => spec.group))];
    $('tuningSliders').innerHTML = groups.map(group => `<fieldset><legend>${group}</legend>${SLIDERS.filter(spec => spec.group === group).map(spec => `<div class="tuning-row" id="slider-${spec.key}"><div class="row"><label for="tune-${spec.key}">${spec.label}<small>${spec.unit}</small></label><input id="value-${spec.key}" type="number" min="${spec.min}" max="${spec.max}" step="${spec.step}" aria-label="${spec.label} value"></div><input id="tune-${spec.key}" type="range" min="${spec.min}" max="${spec.max}" step="${spec.step}" aria-describedby="note-${spec.key}"><p id="note-${spec.key}">${spec.note}</p></div>`).join('')}</fieldset>`).join('');
    for (const spec of SLIDERS) {
      $(`tune-${spec.key}`).addEventListener('input', e => applyDraft({ ...draft, [spec.key]: Number(e.target.value) }, `${spec.label} updated live.`));
      $(`value-${spec.key}`).addEventListener('change', e => {
        const value = e.target.value === '' ? NaN : Number(e.target.value);
        try { applyDraft({ ...draft, [spec.key]: value }, `${spec.label} updated live.`); }
        catch (error) { draftStatus = error.message; refreshTuning(); }
      });
    }
    refreshTuning();
  }
  function renderMechanics(s) {
    if (!s || !$('mechanicsPanel').open) return;
    const load = shares(s), duty = s.ids.map((_, i) => s.duty.length ? s.duty.filter(sample => sample.held[i]).length / s.duty.length : 0);
    const estimate = load.map(value => { const need = neededDuty(game.settings, value, s.ids.length); return need > 1 ? 'cannot lift' : `${Math.round(need * 100)}%`; });
    $('motorReadouts').innerHTML = `<table><thead><tr><th></th>${s.ids.map((id, i) => `<th>M${i + 1}<small>${id === 0 && game.mode !== 'watch' ? 'You' : game.players[id].name}</small></th>`).join('')}</tr></thead><tbody><tr><th>Height</th>${s.h.map(h => `<td>${h.toFixed(2)}</td>`).join('')}</tr><tr><th>Prize load</th>${load.map(w => `<td>${Math.round(clamp(w, 0, 1) * 100)}%</td>`).join('')}</tr><tr><th>Holding</th>${duty.map((value, i) => `<td>${Math.round(value * 100)}%<small>needs ~${estimate[i]}</small></td>`).join('')}</tr><tr><th>Motor</th>${s.held.map(on => `<td>${s.state === 'lifting' && on ? 'ON ↑' : 'off ↓'}</td>`).join('')}</tr></tbody></table>`;
  }
  function releaseInputs() {
    keys.clear(); for (const values of Object.values(holds)) values.clear();
    if (game) game.releaseAll();
    for (const id of ['pull', 'rig']) $(id).classList.remove('pressed');
    if (view) { view.destination = null; view.moving = false; }
  }
  function pause(reason = 'The show is paused.') {
    if (game.phase === 'lobby' || paused) return;
    paused = true; releaseInputs(); set('pauseTitle', reason); const inVoteRoom = earlyReviewOpen || ['vote', 'runoff', 'result'].includes(game.phase);
    show('pauseOverlay', !inVoteRoom && !devMode); updateUI(); (devMode ? $('devSimulationPause') : inVoteRoom ? $('voteResume') : $('resume')).focus();
  }
  function resume() { paused = false; accumulated = 0; lastTime = performance.now(); show('pauseOverlay', false); updateUI(); $('pause').focus(); }
  function closestStation() {
    const p = game.players[0];
    return game.stations.reduce((near, s) => Math.hypot(p.x - POSITIONS[s.index].x, p.y - POSITIONS[s.index].y) < 110 ? s : near, null);
  }
  // While you operate your own console, Space is the winch no matter which button has focus.
  function operating() { return !!game && game.phase === 'challenge' && game.players[0].active && game.mode !== 'watch' && view.camera === 'lift' && view.station === game.players[0].station; }
  let spaceHeld = false;
  function movable() { return !earlyReviewOpen && game.mode !== 'watch' && (game.phase === 'lobby' || game.phase === 'challenge' && game.players[0].active && !game.players[0].operated && view.camera === 'villa'); }
  function interact() {
    if (paused) return;
    if (game.phase === 'lobby') {
      const p = game.players[0];
      if (Math.hypot(p.x - POSITIONS[0].x, p.y - POSITIONS[0].y) < 110) reset('practice', true);
      else if (Math.hypot(p.x - 497, p.y - 554) < 115) reset('play', true);
      return;
    }
    const s = closestStation();
    if (!s || game.phase !== 'challenge' || !game.players[0].active) return;
    if (s.ids.includes(0)) game.operate(0, true);
    view.station = s.index; view.camera = 'lift'; view.destination = null; updateUI(true);
  }
  function chooseStation(index) {
    if (!game.stations[index]) return;
    // Watching another camera never grants its console or rescue eligibility.
    view.station = index; view.camera = 'lift'; updateUI(true);
  }
  function actionDown(action, source) {
    if (paused || earlyReviewOpen || game.mode === 'watch' || !game.players[0].active) return;
    if (holds[action].has(source)) return;
    const first = holds[action].size === 0; holds[action].add(source);
    if (!first) return;
    if (action === 'pull' && view.station === game.players[0].station && view.camera === 'lift') game.pressPull(0);
    // An operator rigs from their own camera; the spotter rigs from whichever rescue area they stand in.
    if (action === 'rig' && (game.players[0].spotting || view.station === game.players[0].station && view.camera === 'lift')) game.pressRig(0);
    if (action === 'catch') {
      const s = view.camera === 'lift' ? game.stations[view.station] : closestStation();
      const result = game.pressCatch(0, s?.index);
      if (result === 'saved') { tone(780, .23); announce('Caught! Keep lifting.'); }
      else if (result === 'miss') { tone(180, .13); announce('Missed Catch. Other players can still save.'); }
    }
    updateUI();
  }
  function actionUp(action, source) {
    holds[action].delete(source); if (holds[action].size) return;
    if (action === 'pull') game.releasePull(0);
    if (action === 'rig') game.releaseRig(0);
    if (action === 'catch') game.releaseCatch(0);
    updateUI();
  }
  for (const action of ['pull', 'rig', 'catch']) {
    const button = $(action);
    button.addEventListener('pointerdown', e => {
      if (e.button !== 0 || button.disabled) return;
      e.preventDefault(); button.focus(); button.setPointerCapture(e.pointerId); actionDown(action, `pointer${e.pointerId}`);
    });
    for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) button.addEventListener(type, e => actionUp(action, `pointer${e.pointerId}`));
    button.addEventListener('keydown', e => {
      if (!['Space', 'Enter'].includes(e.code)) return;
      e.preventDefault(); e.stopPropagation(); if (!e.repeat) actionDown(action, e.code);
    });
    button.addEventListener('keyup', e => { if (['Space', 'Enter'].includes(e.code)) { e.preventDefault(); e.stopPropagation(); actionUp(action, e.code); } });
  }
  window.addEventListener('keydown', e => {
    if ($('helpDialog').open || $('cameraDialog').open) return;
    if (e.code === 'Escape') { e.preventDefault(); paused ? resume() : pause(); return; }
    if (/INPUT|SELECT|TEXTAREA/.test(e.target.tagName) || e.altKey || e.ctrlKey || e.metaKey) return;
    if (paused) return;
    const action = { Space: 'pull', KeyR: 'rig', KeyC: 'catch' }[e.code];
    // A focused button or link keeps its native Space activation unless you are at your console.
    if (action && !(e.code === 'Space' && !operating() && /^(BUTTON|A)$/.test(e.target.tagName) && e.target.getClientRects().length)) {
      e.preventDefault(); if (e.code === 'Space') spaceHeld = true; if (!e.repeat) actionDown(action, e.code); return;
    }
    if (['KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code) && movable()) { keys.add(e.code); e.preventDefault(); view.destination = null; }
    if (e.code === 'KeyE' && !e.repeat) { e.preventDefault(); interact(); }
  });
  window.addEventListener('keyup', e => {
    keys.delete(e.code);
    // Cancel the focused button's activation for a Space that drove the winch.
    if (e.code === 'Space' && spaceHeld) { spaceHeld = false; e.preventDefault(); }
    const action = { Space: 'pull', KeyR: 'rig', KeyC: 'catch' }[e.code];
    if (action) actionUp(action, e.code);
  });
  window.addEventListener('blur', () => { releaseInputs(); pause('The show paused while you were away.'); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) { releaseInputs(); pause('The show paused while you were away.'); } });
  for (const button of document.querySelectorAll('[data-move]')) {
    const code = { up: 'ArrowUp', down: 'ArrowDown', left: 'ArrowLeft', right: 'ArrowRight' }[button.dataset.move];
    button.addEventListener('pointerdown', e => { e.preventDefault(); button.setPointerCapture(e.pointerId); keys.add(code); view.destination = null; });
    for (const event of ['pointerup', 'pointercancel', 'lostpointercapture']) button.addEventListener(event, () => keys.delete(code));
  }
  $('scene').addEventListener('pointerdown', e => {
    if (!movable() || paused) return;
    const rect = $('scene').getBoundingClientRect();
    view.destination = { x: clamp((e.clientX - rect.left) / rect.width * 1000, 97, 904), y: clamp((e.clientY - rect.top) / rect.height * 650, 170, 560) };
    // A destination in the pool is moved to the nearest dry side.
    if (view.destination.x > 320 && view.destination.x < 684 && view.destination.y > 198 && view.destination.y < 496) view.destination.x = view.destination.x < 500 ? 314 : 690;
  });
  function move(dt) {
    if (!movable()) { view.moving = false; return; }
    const p = game.players[0]; let dx = 0, dy = 0;
    if (keys.has('KeyA') || keys.has('ArrowLeft')) dx--;
    if (keys.has('KeyD') || keys.has('ArrowRight')) dx++;
    if (keys.has('KeyW') || keys.has('ArrowUp')) dy--;
    if (keys.has('KeyS') || keys.has('ArrowDown')) dy++;
    if (!dx && !dy && view.destination) {
      let target = view.destination;
      // Walk around the pool via the nearest end when crossing the courtyard.
      const across = p.x < 324 && target.x > 680 || p.x > 680 && target.x < 324;
      const central = p.y > 186 && p.y < 508;
      if (across && central) target = { x: p.x, y: p.y < 347 ? 181 : 518 };
      dx = target.x - p.x; dy = target.y - p.y;
      if (Math.hypot(dx, dy) < 5) { if (target === view.destination) view.destination = null; dx = 0; dy = 0; }
    }
    const mag = Math.hypot(dx, dy); view.moving = mag > 0;
    if (!mag) return;
    const step = Math.min(140 * dt, view.destination ? mag : Infinity); dx = dx / mag * step; dy = dy / mag * step;
    const blocked = (x, y) => x > 324 && x < 680 && y > 196 && y < 502;
    const nx = clamp(p.x + dx, 97, 904), ny = clamp(p.y + dy, 170, 560);
    if (!blocked(nx, p.y)) p.x = nx;
    if (!blocked(p.x, ny)) p.y = ny;
  }
  function renderCast(force) {
    const spotting = game.phase === 'challenge' ? game.spotter : null;
    const signature = game.players.map(p => `${p.active}`).join() + game.mode + (game.phase === 'finale') + spotting;
    if (!force && signature === castSignature) return; castSignature = signature;
    $('cast').innerHTML = game.players.map(p => `<div class="cast-member ${p.id === 0 && game.mode !== 'watch' ? 'you' : ''} ${!p.active ? 'out' : ''}">${avatar(p)}<span class="number">${String(p.id + 1).padStart(2, '0')}</span><b>${p.name}</b><small>${!p.active && game.mode !== 'practice' || game.phase === 'finale' ? p.role : p.id === spotting ? (p.id === 0 && game.mode !== 'watch' ? 'YOU · SPOTTER' : 'SPOTTER') : p.id === 0 && game.mode !== 'watch' ? 'YOU' : 'BOT'}</small></div>`).join('');
    set('castSummary', game.mode === 'watch' ? '8 BOTS · SPECTATING' : game.mode === 'practice' ? 'YOU + 1 PRACTICE BOT' : '1 YOU + 7 BOTS');
    set('castNote', game.mode === 'watch' ? 'Autonomous play. Roles stay hidden until revealed.' : !game.players[0].active && game.mode !== 'practice' ? 'You are backstage. Your original team’s result still counts.' : 'Same faces. Secret allegiances.');
  }
  function renderTabs(force) {
    const signature = game.stations.map(s => s.state).join() + view.station + view.camera;
    if (!force && signature === tabSignature) return; tabSignature = signature;
    $('stationTabs').innerHTML = game.stations.map(s => `<button class="station-tab ${view.camera === 'lift' && view.station === s.index ? 'selected' : ''}" data-station="${s.index}" aria-pressed="${view.camera === 'lift' && view.station === s.index}"><b>${s.name}${s.ids.includes(0) && game.mode !== 'watch' ? ' · YOU' : ''}</b><small>${s.ids.map(id => game.players[id].name).join(' + ')}</small><span>${({ lifting: 'Lifting', catch: 'Catch!', delivered: 'Delivered ✓', reload: 'Reloading', lava: 'Lift failed', timeout: 'Time’s up' })[s.state]}</span></button>`).join('');
    $('stationTabs').querySelectorAll('button').forEach(b => b.addEventListener('click', () => chooseStation(Number(b.dataset.station))));
  }
  function receiptRecord() {
    return game.phase === 'challenge' && shownAct === game.act ? game.reviewSnapshot() : game.history.find(h => h.act === shownAct);
  }
  function renderReceipts() {
    const records = game.phase === 'challenge' ? [...game.history, game.reviewSnapshot()] : game.history;
    const options = records.map(h => '<option value="' + h.act + '">' + h.act + '</option>').join('');
    if ($('receiptAct').innerHTML !== options) $('receiptAct').innerHTML = options;
    $('receiptAct').value = String(shownAct);
    const record = receiptRecord(); if (!record) return;
    $('receipts').innerHTML = record.stations.map((s, i) => s.ready === false ? VoteView.waitingStation(s, game.players) : VoteView.stationCard(s, game.players, i)).join('') + (record.spotter ? VoteView.spotterCard(record.spotter, game.players) : '');
    set('memoryHeading', shownAct === game.act ? 'The lifts' : 'Round ' + shownAct + ' · The lifts');
    const latest = game.history.at(-1);
    // Heists are revealed only when the entire act ends.
    $('voteRoundSummary').innerHTML = game.phase === 'challenge' ? '<span class="round-prize">' + VoteView.icon('check') + '<b>' + game.stations.filter(s => game.stationFinished(s)).length + ' / ' + game.stations.length + '</b> lifts finished</span>' : '<span class="round-prize delivered">' + VoteView.icon('crown') + '<b>' + latest.pot + '</b> delivered</span><span class="round-prize stolen">' + VoteView.icon('snake') + '<b>' + latest.heists + '</b> stolen this round</span>';
    voteSignature = '';
    if (['vote', 'runoff'].includes(game.phase) && $('candidates').children.length) refreshPublicVotes();
  }
  function setEarlyReview(open) {
    earlyReviewOpen = open; releaseInputs(); $('cameraDialog').close();
    if (open) { roleVisible = false; shownAct = game.act; renderReceipts(); }
    show('pauseOverlay', paused && !open); updateUI();
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
  function renderCandidates() {
    voteSignature = '';
    // Fixed seats keep the direction of every public accusation understandable.
    $('candidates').innerHTML = game.players.map(p => `<button class="candidate" data-candidate="${p.id}" aria-pressed="false" disabled><span class="candidate-tag" id="voter-tag-${p.id}" hidden></span><span class="live-vote-count" id="vote-count-${p.id}">0</span><span class="candidate-check">${VoteView.icon('check')}</span>${VoteView.votingPortrait(p)}<b>${p.name}</b><span class="voter-choice" id="voter-choice-${p.id}"></span></button>`).join('');
    refreshPublicVotes();
  }
  function scheduleVotePointers() {
    if (pointerFrame) return;
    pointerFrame = requestAnimationFrame(() => { pointerFrame = 0; layoutVotePointers(); });
  }
  function layoutVotePointers() {
    if (!['vote', 'runoff'].includes(game.phase) || !$('candidates').getClientRects().length) return;
    const buttons = [...$('candidates').querySelectorAll('[data-candidate]')];
    const rects = Object.fromEntries(buttons.map(button => [button.dataset.candidate, button.querySelector('.voting-portrait').getBoundingClientRect()]));
    // Read geometry first, then update SVGs; no alternating layout reads/writes.
    for (const button of buttons) {
      if (!button.hasAttribute('data-accused')) continue;
      const pose = VoteView.pointingPose(rects[button.dataset.candidate], rects[button.dataset.accused]);
      button.querySelector('.pointing-arm').setAttribute('transform', `translate(${pose.x} ${pose.y}) rotate(${pose.angle.toFixed(2)}) scale(${pose.scale.toFixed(3)})`);
      button.querySelector('.pointing-elbow').setAttribute('d', `M${pose.shoulder} 78L${pose.x} ${pose.y}`);
    }
  }
  function refreshPublicVotes() {
    const live = game.liveVotes();
    selected = game.mode !== 'watch' && Number.isInteger(game.ballots[0]) ? game.ballots[0] : null;
    const signature = JSON.stringify(live) + game.players.map(p => p.active).join() + game.mode + game.candidates.join() + selected;
    if (signature === voteSignature) return;
    voteSignature = signature;
    for (const p of game.players) {
      const state = VoteView.candidateState(game, p, live), button = $('candidates').querySelector(`[data-candidate="${p.id}"]`);
      button.disabled = state.disabled;
      button.classList.toggle('vote-leader', state.leader);
      button.classList.toggle('certain-voter', state.certain);
      button.classList.toggle('locked-voter', live.locked.includes(p.id));
      button.classList.toggle('selected', selected === p.id);
      button.classList.toggle('outside-vote', !p.active || !game.candidates.includes(p.id));
      button.classList.toggle('your-seat', p.id === 0 && game.mode !== 'watch');
      button.setAttribute('aria-pressed', String(selected === p.id));
      set(`voter-tag-${p.id}`, state.tag); show(`voter-tag-${p.id}`, !!state.tag);
      set(`vote-count-${p.id}`, String(state.count));
      $(`vote-count-${p.id}`).setAttribute('aria-label', `${state.count} vote${state.count === 1 ? '' : 's'}`);
      $(`vote-count-${p.id}`).classList.toggle('has-votes', state.count > 0);
      const target = state.target === null ? null : game.players[state.target];
      const choice = target ? `${state.certain ? '!' : '?'} → ${target.name}` : state.skipped ? 'Skipped' : !p.active ? 'Backstage' : '…';
      set(`voter-choice-${p.id}`, (live.locked.includes(p.id) ? '✓ ' : '') + choice);
      $(`voter-choice-${p.id}`).classList.toggle('has-choice', !!target);
      const arm = button.querySelector('.pointing-arm'), elbow = button.querySelector('.pointing-elbow');
      if (target) { button.dataset.accused = String(target.id); arm.removeAttribute('hidden'); elbow.removeAttribute('hidden'); }
      else { delete button.dataset.accused; arm.setAttribute('hidden', ''); elbow.setAttribute('hidden', ''); }
      const identity = p.id === 0 && game.mode !== 'watch' ? 'You. No self-vote.' : !p.active ? 'Out.' : !game.candidates.includes(p.id) ? 'Not tied.' : '';
      button.setAttribute('aria-label', `${p.name}. ${identity} ${state.count} votes. ${state.leader ? 'Most votes. ' : ''}${state.certain ? 'Certain. ' : ''}${target ? 'Voted for ' + target.name + '.' : state.skipped ? 'Skipped vote.' : p.active ? 'Has not voted.' : ''}`);
    }
    for (const button of $('receipts').querySelectorAll('[data-vote-shortcut]')) {
      const id = Number(button.dataset.voteShortcut), p = game.players[id], state = VoteView.candidateState(game, p, live);
      button.disabled = state.disabled;
      button.classList.toggle('selected', id === selected); button.classList.toggle('vote-leader', state.leader);
      button.setAttribute('aria-pressed', String(id === selected));
      button.setAttribute('aria-label', p.name + (id === 0 ? '. You. No self-vote.' : !p.active ? '. Out.' : !game.candidates.includes(id) ? '. Not tied.' : '. Tap to vote.') + ' ' + state.count + ' votes.' + (state.leader ? ' Most votes.' : ''));
      const count = button.querySelector('.shortcut-count'); count.hidden = false; count.textContent = state.count;
    }
    scheduleVotePointers();
  }
  new ResizeObserver(scheduleVotePointers).observe($('candidates'));
  window.addEventListener('resize', scheduleVotePointers);
  function renderVoteResult() {
    const result = game.lastVote; if (!result) return;
    if (game.phase === 'runoff') {
      $('runoffNotice').innerHTML = `<b>Tied!</b><span class="tied-faces">${result.tied.map(id => `<span>${VoteView.portrait(game.players[id])}<b>${game.players[id].name}</b></span>`).join('')}</span><span>Vote again.</span>`;
    } else $('voteResult').innerHTML = VoteView.result(result, game.players);
  }
  function renderFinale() {
    if (revealSignature === `${game.seed}:${game.act}`) return;
    revealSignature = `${game.seed}:${game.act}`;
    set('winner', `${game.outcome.team} win the show.`); set('winnerReason', game.outcome.reason + (game.mode === 'watch' ? '' : ` You ${game.players[0].role === (game.outcome.team === 'Snakes' ? 'Snake' : 'Loyal') ? 'win with' : 'played for'} the ${game.players[0].role === 'Snake' ? 'Snakes' : 'Loyals'}${game.players[0].active ? '.' : ', even from backstage.'}`));
    $('revealCast').innerHTML = game.players.map(p => `<div class="reveal-person ${p.role === 'Snake' ? 'snake' : ''}">${VoteView.rolePortrait(p)}<b>${p.name}${p.id === 0 && game.mode !== 'watch' ? ' · You' : ''}</b><span>${p.role} · ${p.active ? 'survived' : 'removed'}</span></div>`).join('');
    $('replay').innerHTML = game.history.map(h => `<article class="replay-act"><h3>Act ${h.act} <span class="fine">${h.heists} heist · ${h.pot} delivered</span></h3>${h.stations.flatMap(s => s.events.filter(e => ['rig', 'heist', 'cleared', 'catch', 'lava', 'delivery', 'loss'].includes(e.kind)).map(e => ({ ...e, place: s.name }))).sort((a, b) => a.time - b.time).map(e => `<p class="${e.private ? 'secret' : ''}"><b>${e.time.toFixed(1)}s · ${e.place}</b><br>${escape(e.text)}</p>`).join('') || '<p>No decisive lift events recorded.</p>'}${h.spotter ? `<p><b>Spotter</b><br>${escape(h.spotter.text)}</p>` : ''}${h.votes.map(v => `<p><b>${v.runoff ? 'Runoff' : 'Vote'}</b><br>${v.accepted.map(b => `${game.players[b.voter].name} → ${game.players[b.target].name}`).join(' · ')}${v.accepted.length ? '.' : 'Everyone abstained.'}<br>${v.removed === null ? 'Tie.' : `${game.players[v.removed].name} received the most votes.`}</p>`).join('')}</article>`).join('');
  }
  function phaseChanged() {
    lastPhase = game.phase; earlyReviewOpen = false; earlyReviewSeen = false; earlySignature = ''; selected = null; releaseInputs();
    $('cameraDialog').close();
    if (game.phase === 'vote') { roleVisible = false; if (tuningOpen) openTuning(false); }
    if (game.phase === 'challenge') {
      // The spotter has no console and starts in the courtyard.
      const me = game.players[0];
      view.station = me.active && me.station >= 0 ? me.station : 0; view.camera = me.spotting ? 'villa' : 'lift';
      shownAct = game.act;
      if (innerWidth <= 850) roleVisible = false;
    }
    if (['vote', 'runoff', 'result', 'finale'].includes(game.phase)) {
      if (game.phase === 'vote') shownAct = game.act;
      renderReceipts();
    }
    if (['vote', 'runoff'].includes(game.phase)) renderCandidates();
    if (['runoff', 'result'].includes(game.phase)) renderVoteResult();
    if (game.phase === 'finale') renderFinale();
    const words = { casting: 'Your private role is ready.', challenge: 'Prize Lift begins. Hold Pull to lift your cable.', vote: 'Voting is open. Look at the lifts and pick a face.', runoff: 'The vote tied. A runoff is open.', result: 'The votes are in.', finale: `${game.outcome?.team} win the show.`, 'practice-result': 'Practice complete.' };
    announce(words[game.phase] || 'Welcome to the villa.'); if (game.phase !== 'lobby') tone(game.phase === 'finale' ? 880 : 440, .16);
    renderCast(true); renderTabs(true);
    const destination = { challenge: 'heading', vote: 'voteRoomTitle', runoff: 'voteRoomTitle', result: 'voteRoomTitle', finale: 'finalePanel' }[game.phase];
    if (destination) requestAnimationFrame(() => {
      if (destination === 'voteRoomTitle') { window.scrollTo({ top: 0, behavior: 'instant' }); $(destination).focus({ preventScroll: true }); }
      else $(destination).scrollIntoView({ block: 'start', behavior: scene.reduced ? 'instant' : 'smooth' });
    });
  }
  function updateUI(force = false) {
    if (!game) return;
    if (lastPhase !== game.phase) phaseChanged();
    const phase = game.phase, p = game.players[0], watch = game.mode === 'watch', practice = game.mode === 'practice';
    document.body.dataset.phase = phase;
    const timed = !!DURATIONS[phase] && phase !== 'finale';
    set('devPhaseTime', timed ? Math.ceil(Math.max(0, DURATIONS[phase] - game.timerClock())) + 's' : '—');
    set('devPhaseName', ({casting:'Casting', challenge:'Lift round', vote:'Voting', runoff:'Runoff', result:'Reveal'})[phase] || 'No phase timer');
    for (const button of $('devTimers').querySelectorAll('[data-timer]')) {
      const name = button.dataset.timer, frozen = game.timers[name].paused;
      button.setAttribute('aria-pressed', String(frozen));
      const label = (frozen ? '▶ Resume ' : 'Ⅱ Freeze ') + button.dataset.label;
      if (button.textContent !== label) button.textContent = label;
      button.disabled = name === 'phase' ? !timed : phase !== 'challenge';
    }
    set('devTimerHint', game.timers.phase.paused ? 'Phase held open · gameplay continues' : 'Freeze clocks, keep playing');
    $('devTimers').classList.toggle('has-frozen-timer', Object.values(game.timers).some(timer => timer.paused));
    $('devOtherTimers').classList.toggle('has-frozen-timer', ['catch','rig','reload'].some(name => game.timers[name].paused));
    const earlyEligible = phase === 'challenge' && !practice && !watch && p.active && game.stationFinished(game.stationOf(0));
    if (earlyEligible && !earlyReviewSeen) {
      earlyReviewSeen = true; earlyReviewOpen = true; roleVisible = false; releaseInputs();
      if (tuningOpen) openTuning(false);
      requestAnimationFrame(() => { window.scrollTo({top:0, behavior:'instant'}); $('voteRoomTitle').focus({preventScroll:true}); });
    }
    const early = earlyEligible && earlyReviewOpen;
    if (early) {
      const signature = game.stations.map(s => s.state).join();
      if (signature !== earlySignature) { earlySignature = signature; renderReceipts(); }
    }
    const voteRoom = early || ['vote', 'runoff', 'result'].includes(phase);
    document.body.dataset.earlyReview = String(early);
    show('earlyReviewToggle', earlyEligible && !early);
    show('voteWaiting', early);
    if (early) {
      set('voteWaitingTitle', game.stations.every(s => game.stationFinished(s)) ? 'All lifts finished!' : 'Waiting for the other lifts…');
      set('voteWaitingHint', game.timers.phase.paused ? 'Resume the timer when you’re ready to vote.' : 'Voting opens when everyone finishes.');
    }
    document.body.dataset.voting = String(voteRoom);
    document.body.dataset.camera = ['challenge', 'practice-result'].includes(phase) ? view.camera : 'villa';
    const challenge = phase === 'challenge', voting = ['vote', 'runoff'].includes(phase), lobby = phase === 'lobby';
    const s = view.camera === 'lift' ? game.stations[view.station] : closestStation();
    const own = challenge && p.active && !watch && p.operated && s?.ids.includes(0) && view.camera === 'lift';
    const canCatch = challenge && !watch && s?.state === 'catch' && game.eligibleCatch(0, s);
    const near = closestStation(), spotting = challenge && !watch && p.active && p.spotting;
    const rigStation = own ? s : spotting ? near : null, armedStation = game.stations.find(st => st.armedBy === 0);
    show('lobbyPanel', lobby); show('gamePanel', !lobby); show('pause', !lobby && phase !== 'finale');
    show('stationTabs', challenge && game.stations.length > 1); show('mobileMove', movable());
    show('evidencePanel', voteRoom);
    show('voteRoleToggle', voteRoom && !watch); show('votePrivateRole', voteRoom && !watch && roleVisible);
    $('voteRoleToggle').setAttribute('aria-expanded', String(roleVisible));
    show('pauseOverlay', paused && !voteRoom); show('votePaused', voteRoom && paused); set('pause', paused ? 'Resume' : 'Pause');
    show('votePanel', voting); show('voteResult', phase === 'result'); show('runoffNotice', phase === 'runoff');
    show('roundMemories', phase !== 'result'); show('voteRoundSummary', phase !== 'result');
    show('voteSpeedControls', voteRoom && watch); show('voteNewEpisode', voteRoom && (watch || !p.active));
    if ($('voteSpeed').value !== $('speed').value) $('voteSpeed').value = $('speed').value;
    if (voteRoom) {
      const seconds = Math.ceil(Math.max(0, DURATIONS[phase] - game.timerClock()));
      set('voteRoomStep', `ROUND ${game.act} / 3`);
      set('voteRoomTitle', phase === 'result' ? 'The votes are in!' : phase === 'runoff' ? 'One more vote!' : early ? 'What happened?' : 'Who is the Snake?');
      set('voteRoomHint', phase === 'result' ? '' : early ? 'Your lift is done. Take a look!' : watch ? 'Watch the cast choose.' : !p.active ? 'You’re backstage. Watch the vote.' : 'Look at the lifts. Pick a face.');
      set('voteClockLabel', paused ? 'Game paused' : game.timers.phase.paused ? 'Timer frozen' : phase === 'result' ? 'Next in' : early ? 'Lifts end in' : 'Vote ends in');
      set('voteSeconds', String(seconds));
      $('voteClock').style.setProperty('--remaining', `${Math.max(0, 100 - game.timerClock() / DURATIONS[phase] * 100)}%`);
      $('voteClock').classList.toggle('almost-done', seconds <= 5);
      if ($('resultCountdown')) set('resultCountdown', String(seconds));
    } show('finalePanel', phase === 'finale');
    show('speedControls', watch && phase !== 'finale');
    show('nextEpisode', !lobby && (watch || !p.active || phase === 'finale')); show('roleToggle', !lobby && !watch && !practice && phase !== 'finale');
    show('privateRole', !lobby && !watch && !practice && roleVisible && phase !== 'finale');
    set('roleToggle', roleVisible ? 'Hide role' : 'Show role');
    const teammate = game.players.find(q => q.id !== 0 && q.role === 'Snake');
    const roleText = p.role === 'Snake' ? `<b>You are a Snake.</b><small>Your teammate is ${teammate.name}. Steal two treasures and keep one Snake onstage after the final vote.</small>` : '<b>You are a Loyal.</b><small>Protect the prizes. Stop two heists, or vote out both Snakes. Watch what contestants do.</small>';
    const roleHtml = `<div class="role-intro">${VoteView.rolePortrait(p)}<div class="role-copy">${roleText}</div></div>`;
    if ($('privateRole').innerHTML !== roleHtml) $('privateRole').innerHTML = roleHtml;
    if ($('votePrivateRole').innerHTML !== roleHtml) $('votePrivateRole').innerHTML = roleHtml;
    $('privateRole').className = 'role-card' + (p.role === 'Snake' ? ' snake' : '');
    set('pot', String(game.pot)); set('heists', String(game.heists));
    set('phaseLabel', ({ 'practice-result': 'PRACTICE', challenge: 'ON THE CLOCK', result: 'REVEAL' })[phase] || phase.toUpperCase());
    set('timer', DURATIONS[phase] && phase !== 'finale' ? `${Math.ceil(Math.max(0, DURATIONS[phase] - game.timerClock()))}s` : '—');
    set('castCount', `${game.activeIds().length} ${lobby ? 'CONTESTANTS' : 'ONSTAGE'}`);
    set('eyebrow', lobby ? 'WELCOME TO THE VILLA' : practice ? 'PRACTICE · YOU + ONE LOYAL BOT' : watch ? `SIMULATED EPISODE · 8 BOTS · ACT ${Math.max(1, game.act)} / 3` : `EPISODE ${String(game.seed % 1000).padStart(3, '0')} · ACT ${Math.max(1, game.act)} / 3`);
    const headings = { lobby: 'Trust is part of the game.', casting: 'Every good show has a secret.', challenge: p.active || watch ? 'Keep the treasure. Watch your partner.' : 'The show goes on, backstage.', vote: 'Who do you trust?', runoff: 'A tie. Make your vote count.', result: 'One vote can change the show.', finale: 'The secrets are out.', 'practice-result': 'Ready for the real show?' };
    set('heading', headings[phase]);
    set('cameraLabel', lobby || challenge && view.camera === 'villa' ? 'CAM 01   THE COURTYARD' : challenge || phase === 'practice-result' ? `CAM ${String(view.station + 2).padStart(2, '0')}   ${s?.name.toUpperCase() || 'PRIZE LIFT'}` : 'CAM 06   THE VOTING STAGE');
    show('controls', challenge && !watch && p.active); show('liftHud', challenge && !!s);
    show('mechanicsPanel', ['challenge', 'practice-result'].includes(phase) && !!s && view.camera === 'lift');
    renderMechanics(s);
    show('pull', own && s.state !== 'catch'); $('pull').disabled = !own || s?.state !== 'lifting';
    $('pull').classList.toggle('pressed', p.pulling && own);
    show('catch', canCatch); show('catchPanel', challenge && s?.state === 'catch');
    $('catch').disabled = !canCatch || s?.taps.has(0);
    show('rig', p.role === 'Snake' && !!rigStation && rigStation.state !== 'catch'); show('rigHint', challenge && p.role === 'Snake' && !watch && p.active);
    $('rig').disabled = !rigStation || rigStation.state !== 'lifting' || game.attempt.spent || game.attempt.reserved !== null && game.attempt.reserved !== 0;
    $('rig').classList.toggle('pressed', p.rigging && !!rigStation);
    const rigProgress = game.attempt.reserved === 0 ? clamp((game.timerClock('rig') - game.attempt.since) / game.settings.rigHold, 0, 1) : 0;
    set('rig', game.attempt.spent ? 'Team attempt used' : rigProgress ? `Keep holding… ${Math.ceil(rigProgress * 100)}%` : spotting ? `Hold to rig the ${near ? near.name : 'nearest lift'} · R` : 'Hold to rig · R');
    set('rigHint', game.attempt.spent ? armedStation ? (armedStation.burstUntil ? `Rig armed. ${Math.max(0, armedStation.burstUntil - game.timerClock('rig')).toFixed(1)}s of motor burst. An uncaught spill completes the heist.` : `Rig armed at the ${armedStation.name}. No motor changed. An uncaught spill there completes the heist.`) : 'The team attempt is consumed for this act.' : game.attempt.reserved !== null && game.attempt.reserved !== 0 ? 'Your teammate is holding Rig. The team attempt is reserved.' : spotting ? `Spotter · Stand in a rescue area and hold ${game.settings.rigHold}s to arm that lift. No motor changes. One shared attempt this act.` : `Private · Hold ${game.settings.rigHold}s. One shared attempt this act.`);
    show('interact', challenge && !watch && p.active && !p.operated && !!near);
    set('interact', near?.ids.includes(0) ? 'Join your console · E' : 'Watch nearby lift · E');
    show('leave', challenge && !watch && p.active && (p.operated || view.camera === 'lift'));
    set('leave', p.operated ? 'Leave console · walk to rescue' : 'Back to courtyard');
    if (s) {
      const progress = clamp(Math.min(...s.h) / FIXED.finish * 100, 0, 100);
      set('heightText', `${Math.round(progress)}%`); $('heightFill').style.width = `${progress}%`;
      const i = s.ids.indexOf(0), aims = centeringTargets(s), predicted = s.h.map((h, j) => h + s.v[j] * .3);
      const error = i < 0 ? 0 : predicted[i] - predicted[1 - i] - aims[i] + aims[1 - i];
      set('tiltText', own ? error > .04 ? 'Release → steady the ball' : error < -.04 ? 'Pull → steady the ball' : 'Keep climbing · watch the ball' : `2 cables · ${s.catches} saves`);
      if (s.state === 'catch') {
        set('catchTime', `${Math.max(0, game.settings.catchWin - game.timerClock('catch') + s.catchAt).toFixed(1)}s`);
        set('catchHint', s.taps.has(0) && !watch ? 'Your tap is used. Others can still save.' : !canCatch ? 'Watch for a save. Enter the rescue area to help.' : 'One fresh tap. Aim for the gold zone.');
      }
    }
    const zone = catchGeometry(game.settings);
    document.querySelector('.catch-zone').style.left = `${zone.start * 100}%`;
    document.querySelector('.catch-zone').style.width = `${zone.width * 100}%`;
    const titles = { casting: watch ? 'The bots are being cast.' : 'Your secret starts here.', challenge: watch ? 'The cast is on its own.' : !p.active ? 'Welcome backstage.' : s?.state === 'catch' ? 'Don’t let it fall.' : own ? 'You control one cable.' : spotting ? 'You spot this act.' : 'The courtyard is yours.', vote: watch ? 'The bots are voting.' : p.active ? 'Make your call.' : 'Follow the vote backstage.', runoff: 'The vote needs a runoff.', result: game.lastVote?.removed === null ? 'Deadlock. Everyone stays.' : `${game.players[game.lastVote?.removed]?.name} leaves the show.`, finale: 'The full story is below.', 'practice-result': game.practiceResult === 'delivered' ? 'Treasure delivered!' : 'One more practice?' };
    set('panelTitle', titles[phase] || 'Welcome to the show.');
    set('panelEyebrow', challenge ? practice ? 'LEARN THE LIFT' : watch || !p.active ? 'LIVE FROM THE VILLA' : 'PRIZE LIFT · YOUR NEXT MOVE' : voting ? 'OPEN VOTE' : 'YOUR EPISODE');
    const texts = { casting: watch ? 'Eight labeled bots. Two randomly assigned Snakes. Their roles stay hidden from this camera until the show reveals them.' : 'Your role belongs to you. Every contestant looks ordinary onstage. Read your objective, then enter the first act.', challenge: watch ? s?.message : !p.active ? 'You can follow the public cameras and receipts. Your votes and controls are closed. Your original team can still win.' : own ? s?.state === 'lifting' ? 'Tilt to guide the ball toward center, then steady it as you climb. Hold Pull to raise your cable; release to lower it.' : s?.message : p.operated ? 'You are watching another lift. Select your own camera to use Pull, or leave your console to help rescue.' : spotting ? 'Your partner was voted out, so you spot this act with no console. Walk into a rescue area to Catch at that lift. Every lift still has two motors.' : 'Walk to a marked rescue area. You can Catch at nearby lifts, or return to your assigned console.', vote: 'Look at the lifts and vote. Everyone can see the choices and counts as votes come in.', runoff: 'Only tied contestants can receive votes. Everyone still onstage votes again. A second tie removes nobody.', result: game.lastVote?.removed === null ? 'Nobody is removed. This act’s vote is used; the episode continues.' : `${game.players[game.lastVote?.removed]?.name} was a ${game.players[game.lastVote?.removed]?.role}. Completed heists are not undone.`, finale: 'All roles are revealed. The reconstruction below uses the actual lift events and ballots from your episode.', 'practice-result': game.practiceResult === 'delivered' ? 'You and Leo lifted the golden treasure using the same cable physics as the episode. Ready to meet the rest of the cast?' : 'Guide the ball toward center and slow it before it rolls across. Both operators still need to lift; a spill needs one well-timed Catch.' };
    set('panelText', texts[phase] || '');
    show('continue', ['casting', 'practice-result'].includes(phase));
    set('continue', phase === 'practice-result' ? 'Practice again →' : 'Enter the first act →');
    if (phase === 'practice-result') show('nextEpisode', true);
    set('sceneCaption', lobby ? 'A little teamwork. A little betrayal.' : challenge ? s?.message || 'Walk into a marked rescue area to help.' : phase === 'casting' ? 'Your role is private. Your actions are on camera.' : phase === 'finale' ? `${game.outcome.team} win the show.` : phase === 'result' ? titles.result : 'Scroll down to the receipts and ballot.');
    set('sceneHint', lobby || challenge && view.camera === 'villa' ? 'WASD / arrows to walk · Tap a destination · E to interact' + (spotting ? ' · C: catch' + (p.role === 'Snake' ? ' · R: rig' : '') : '') : challenge && own ? 'SPACE: pull · C: catch' + (p.role === 'Snake' ? ' · R: rig' : '') : challenge ? 'Select a camera below · Escape to pause' : 'The cameras record actions. The cast decides who to trust.');
    if (voting) {
      const canVote = !watch && p.active, locked = game.locked.has(0), target = game.ballots[0], certain = game.confidences[0] === 'Certain';
      selected = canVote && Number.isInteger(target) ? target : null;
      set('voteHeading', !canVote ? 'The cast is voting.' : phase === 'runoff' ? 'Choose between them.' : 'Pick a face.');
      set('voteHint', !canVote ? 'Watch the fingers. Count the votes.' : locked ? 'Your vote is locked.' : 'Tap to vote. Lock when you’re ready.');
      set('ballotStatus', watch ? 'Watching the vote' : !p.active ? 'Backstage · watching' : selected !== null ? game.players[selected].name + (certain ? ' — I’m sure!' : ' — just a hunch') : game.voted.has(0) ? locked ? 'Skip locked.' : 'Skipped. You can still vote.' : 'Who’s your hunch?');
      show('certain', canVote); show('abstain', canVote); show('lockVote', canVote);
      $('lockVote').disabled = locked || !game.voted.has(0); set('lockVote', locked ? '✓ Locked' : 'Lock vote');
      $('certain').disabled = selected === null || locked;
      $('certain').setAttribute('aria-pressed', String(selected !== null && certain));
      set('certain', certain && selected !== null ? '✓ I’m sure!' : 'I’m sure!');
      $('abstain').disabled = locked;
      const filled = game.locked.size, total = game.activeIds().length;
      const progress = VoteView.icon('lock') + `<b>${filled} / ${total}</b>`;
      if ($('ballotProgress').innerHTML !== progress) $('ballotProgress').innerHTML = progress;
      $('ballotProgress').setAttribute('aria-label', `${filled} of ${total} votes locked`);
      refreshPublicVotes();
    }
    renderCast(force); if (challenge) renderTabs(force);
    if (devTools) devTools.update();
  }
  $('devTimers').addEventListener('click', e => {
    const button = e.target.closest('[data-timer]'); if (!button || button.disabled) return;
    game.setTimerPaused(button.dataset.timer, !game.timers[button.dataset.timer].paused); updateUI();
  });
  $('play').addEventListener('click', () => reset('play', true)); $('practice').addEventListener('click', () => reset('practice', true)); $('watch').addEventListener('click', () => reset('watch', true));
  $('pause').addEventListener('click', () => paused ? resume() : pause());
  $('voteResume').addEventListener('click', resume); $('voteQuit').addEventListener('click', () => reset()); $('resume').addEventListener('click', resume); $('quit').addEventListener('click', () => reset());
  $('continue').addEventListener('click', () => { if (game.phase === 'practice-result') reset('practice', true); else if (game.phase === 'casting') { game.nextPhase(); updateUI(true); } });
  $('nextEpisode').addEventListener('click', () => reset('play', true)); $('replayEpisode').addEventListener('click', () => reset('play', true));
  for (const id of ['roleToggle', 'voteRoleToggle']) $(id).addEventListener('click', () => { roleVisible = !roleVisible; updateUI(); });
  $('interact').addEventListener('click', interact);
  $('leave').addEventListener('click', () => { releaseInputs(); game.operate(0, false); view.camera = 'villa'; view.destination = null; updateUI(true); });
  $('receiptAct').addEventListener('change', () => { shownAct = Number($('receiptAct').value); renderReceipts(); });
  $('receipts').addEventListener('click', e => {
    const shortcut = e.target.closest('[data-vote-shortcut]');
    if (shortcut) { if (!shortcut.disabled) voteFor(Number(shortcut.dataset.voteShortcut)); return; }
    const button = e.target.closest('[data-receipt]'); if (!button) return;
    const record = receiptRecord(), station = record?.stations[Number(button.dataset.receipt)];
    if (!station?.cards) return;
    set('cameraTitle', `${station.name} · ${station.ids.map(id => game.players[id].name).join(' + ')}`);
    $('cameraDetails').innerHTML = VoteView.detail(station, game.players); placeTimerControls($('cameraDialog')); $('cameraDialog').showModal();
  });
  $('closeCamera').addEventListener('click', () => $('cameraDialog').close());
  function voteFor(id) {
    if (game.mode === 'watch') return;
    if (game.castVote(0, id)) { tone(510, .12); updateUI(); }
  }
  $('candidates').addEventListener('click', e => {
    const button = e.target.closest('[data-candidate]'); if (button && !button.disabled) voteFor(Number(button.dataset.candidate));
  });
  $('earlyReviewToggle').addEventListener('click', () => setEarlyReview(true));
  $('watchLifts').addEventListener('click', () => setEarlyReview(false));
  $('voteSpeed').addEventListener('change', () => { $('speed').value = $('voteSpeed').value; });
  $('voteNewEpisode').addEventListener('click', () => reset('play', true));
  $('lockVote').addEventListener('click', () => { if (game.lockVote(0)) updateUI(); });
  $('certain').addEventListener('click', () => { if (game.setCertain(0, game.confidences[0] !== 'Certain')) updateUI(); });
  $('abstain').addEventListener('click', () => { if (game.castVote(0, null)) { selected = null; updateUI(); } });
  function openHelp() {
    const p = game.settings;
    $('rigHelp').textContent = `Play the Snake. Hold R or Rig for ${p.rigHold} seconds. For ${p.rigTime} seconds, motor force is multiplied by ${p.rigForce} and pull-down by ${p.rigDown}. A rigged, uncaught spill is a heist; lava contact is only a failed lift. A Snake spotter can instead hold Rig inside a rescue area to arm that lift without changing any motor.`;
    if (game.phase !== 'lobby') pause(); placeTimerControls($('helpDialog')); $('helpDialog').showModal();
  }
  $('help').addEventListener('click', openHelp); for (const id of ['gotIt', 'closeHelp']) $(id).addEventListener('click', () => $('helpDialog').close());
  $('sound').addEventListener('click', async () => { sound = !sound; if (sound) { audioContext ||= new (window.AudioContext || window.webkitAudioContext)(); await audioContext.resume(); } set('sound', sound ? 'Sound on' : 'Sound off'); $('sound').setAttribute('aria-pressed', String(sound)); tone(660, .13); });
  function frame(now) {
    const elapsed = lastTime ? Math.min(.1, (now - lastTime) / 1000) : 0; lastTime = now;
    if (!paused && !$('helpDialog').open) {
      drawTime += elapsed; move(elapsed);
      const speed = game.mode === 'watch' ? Number($('speed').value) : 1;
      accumulated += elapsed * speed;
      while (accumulated >= 1 / 60) {
        const previousPhase = game.phase; game.tick(1 / 60); accumulated -= 1 / 60;
        if (previousPhase !== game.phase) phaseChanged();
      }
    }
    scene.draw(game, view, drawTime);
    const s = view.camera === 'lift' ? game.stations[view.station] : closestStation();
    if (s?.state === 'catch') $('needle').style.left = `${needle(s, game.timerClock('catch')) * 100}%`;
    if (now - lastUi > 90) { updateUI(); lastUi = now; }
    requestAnimationFrame(frame);
  }
  $('tuneToggle').addEventListener('click', () => openTuning(!tuningOpen));
  $('closeTuning').addEventListener('click', () => openTuning(false));
  $('tuneDefaults').addEventListener('click', () => applyDraft({ ...DEFAULTS }, 'Restored prototype values.'));
  $('tuneRestart').addEventListener('click', () => { reset('practice', true, game.seed); openTuning(true); });
  $('draftExchange').addEventListener('toggle', () => { if ($('draftExchange').open) $('tuningJson').value = LiftSettings.exportDraft(draft); });
  $('copyDraft').addEventListener('click', async () => {
    const text = LiftSettings.exportDraft(draft); $('tuningJson').value = text;
    try { await navigator.clipboard.writeText(text); set('tuningStatus', 'Current draft copied. Paste it into our conversation.'); }
    catch { $('tuningJson').focus(); $('tuningJson').select(); set('tuningStatus', 'Draft selected. Use your browser’s Copy command.'); }
  });
  $('importDraft').addEventListener('click', () => {
    try { applyDraft(LiftSettings.importDraft($('tuningJson').value), 'Imported draft applied live.'); }
    catch (error) { set('tuningStatus', error.message + ' Current settings were kept.'); }
  });
  $('mechanicsPanel').addEventListener('toggle', () => renderMechanics(game?.stations[view.station]));
  $('mechanicsPanel').open = innerWidth > 850;
  buildTuning(); reset(); requestAnimationFrame(frame);
  if (devMode) {
    devTools = SnakeShowDev.mount({
      get game() { return game; }, get paused() { return paused; },
      reset: (...args) => { $('helpDialog').close(); reset(...args); },
      pause, resume, update: () => updateUI(true),
      showScene(visible) { roleVisible = visible; shownAct = game.act; updateUI(true); }
    }, $('devTimers'));
    const initialScene = params.get('scene');
    if (initialScene) { devTools.open(); devTools.runScene(initialScene); }
  }
  // Explicit local test entry point; absent during ordinary play.
  if (params.get('test') === '1') window.snakeShowTest = { get game() { return game; }, get view() { return view; }, get paused() { return paused; }, update: () => updateUI(true), reset, pause, resume };
})();
