/* global SnakeRules */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  let model = new SnakeRules.Rescue(), started = false, paused = false, last = performance.now(), reloadAt = null;
  const held = new Set();
  const settings = () => ({ window: +$('windowSetting').value, zone: +$('zoneSetting').value, hold: +$('holdSetting').value });
  function reset() {
    held.clear(); model = new SnakeRules.Rescue(settings()); started = true; paused = false; reloadAt = null;
    model.log('Act started. Capsule aboard; both operators can Pull.');
    $('start').textContent = 'Restart act'; render();
  }
  function down(action) {
    if (held.has(action) || !started || paused || model.phase === 'ended') return;
    held.add(action);
    if (action === 'leo') model.reserve(1);
    if (action === 'nia') model.reserve(2);
    if (action === 'maya') model.pressCatch(0);
    if (action === 'omar') model.pressCatch(3, $('rescueArea').checked);
    render();
  }
  function up(action) {
    held.delete(action);
    if (action === 'leo') model.release(1);
    if (action === 'nia') model.release(2);
    if (action === 'maya') model.releaseCatch(0);
    if (action === 'omar') model.releaseCatch(3);
    render();
  }
  const bindings = { rigLeo: 'leo', rigNia: 'nia', catchMaya: 'maya', catchOmar: 'omar' };
  Object.entries(bindings).forEach(([id, action]) => {
    const button = $(id);
    button.addEventListener('pointerdown', e => { e.preventDefault(); button.setPointerCapture(e.pointerId); down(action); });
    ['pointerup','pointercancel','lostpointercapture'].forEach(event => button.addEventListener(event, () => up(action)));
    button.addEventListener('contextmenu', e => e.preventDefault());
    button.addEventListener('keydown', e => { if (['Space','Enter'].includes(e.code)) { e.preventDefault(); if (!e.repeat) down(action); } });
    button.addEventListener('keyup', e => { if (['Space','Enter'].includes(e.code)) { e.preventDefault(); up(action); } });
    button.addEventListener('blur', () => up(action));
  });
  const keys = { KeyR:'leo', KeyT:'nia', KeyC:'maya', KeyV:'omar' };
  document.addEventListener('keydown', e => { if (!keys[e.code] || /INPUT|SELECT|TEXTAREA/.test(e.target.tagName)) return; e.preventDefault(); if (!e.repeat) down(keys[e.code]); });
  document.addEventListener('keyup', e => { if (keys[e.code]) up(keys[e.code]); });
  function releaseAll() { [...held].forEach(up); }
  window.addEventListener('blur', () => { releaseAll(); if (started && model.phase !== 'ended') paused = true; render(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) { releaseAll(); paused = true; } });
  $('start').onclick = reset;
  $('spill').onclick = () => { model.fault(); render(); };
  $('pause').onclick = () => { releaseAll(); paused = !paused; render(); };
  $('water').onclick = () => { model.end('water'); releaseAll(); render(); };
  $('deliver').onclick = () => { model.end('delivered'); releaseAll(); render(); };
  $('end').onclick = () => { model.end(); releaseAll(); render(); };
  ['window','zone','hold'].forEach(name => $(name+'Setting').oninput = () => $(name+'Value').textContent = (+$(name+'Setting').value).toFixed(2) + ' s');
  $('rescueArea').onchange = render;
  let logSignature = '';
  function render() {
    const s = model, catching = s.phase === 'catch', elapsed = s.time - s.faultAt;
    $('clock').textContent = s.time.toFixed(1) + ' s';
    $('phase').textContent = { lifting:'Lifting', catch:'Catch!', reload:'Reloading', ended:'Act ended' }[s.phase];
    $('heists').textContent = `${s.phase === 'ended' ? s.heists : 0}/2`;
    $('pause').disabled = !started || s.phase === 'ended'; $('pause').textContent = paused ? 'Resume' : 'Pause';
    $('spill').disabled = !started || paused || s.phase !== 'lifting';
    ['water','deliver'].forEach(id => $(id).disabled = !started || paused || s.phase !== 'lifting');
    $('end').disabled = !started || s.phase === 'ended';
    $('catchTitle').textContent = catching ? 'Catch! · ' + (elapsed < s.settings.window/2 ? 'pass 1 of 2 →' : '← pass 2 of 2') : 'Catch rehearsal';
    $('remaining').textContent = catching ? Math.max(0,s.settings.window-elapsed).toFixed(2) + ' s left' : 'Two passes · one tap per person';
    $('needle').style.left = (catching ? s.needle()*100 : 0) + '%';
    $('zone').style.left = (50-s.settings.zone/s.settings.window*100) + '%';
    $('zone').style.width = (s.settings.zone/s.settings.window*200) + '%';
    Object.entries(bindings).forEach(([id, action]) => $(id).classList.toggle('holding', held.has(action)));
    // Catch remains pressable before the prompt so pre-holding can be tested.
    ['catchMaya','catchOmar'].forEach(id => $(id).disabled = !started || paused || s.phase === 'ended');
    $('catchMaya').innerHTML = `Catch · Maya <kbd>C</kbd><br><small>${s.attempts.has(0) && catching ? 'Tap used · others can still save' : 'Operator · your tap'}</small>`;
    $('catchOmar').innerHTML = `Catch · Omar <kbd>V</kbd><br><small>${!$('rescueArea').checked ? 'Outside rescue area · ineligible' : s.attempts.has(3) && catching ? 'Tap used · others can still save' : 'Nearby rescuer · second tap'}</small>`;
    ['rigLeo','rigNia'].forEach(id => $(id).disabled = !started || paused || s.spent || s.phase !== 'lifting');
    $('attemptStatus').textContent = s.spent ? 'Team attempt consumed' : s.reserved !== null ? `${SnakeRules.CAST[s.reserved]} is reserving the attempt…` : 'Team attempt available';
    const burst = Math.max(0,s.burstUntil-s.time);
    $('rigStatus').textContent = s.armed ? `Rig armed · ${burst > 0 ? '2× motor burst: ' + burst.toFixed(1) + ' s' : 'burst ended; diverter still armed'}` : s.spent ? `Attempt spent. ${s.heists ? 'Private outcome: one heist succeeded.' : 'No capsule is armed.'}` : s.reserved !== null ? 'Ordinary Pull is active throughout this hold.' : 'Rig also sends ordinary Pull during the hold.';
    $('holdProgress').style.width = (s.spent ? 100 : s.reserved !== null ? Math.min(100,(s.time-s.heldSince)/s.settings.hold*100) : 0) + '%';
    $('status').textContent = !started ? 'Ready. Start an act, then trigger a spill when you’re ready.' : paused ? 'Paused. Resume when ready; held inputs have been released.' : catching ? 'Capsule falling. One good tap saves it for everyone.' : s.phase === 'reload' ? 'Capsule lost. A fresh one loads after 3 seconds.' : s.phase === 'ended' ? s.publicLog.at(-2)?.text + ' ' + s.publicLog.at(-1)?.text : s.result === 'caught' ? 'Caught — keep lifting. You can trigger another spill.' : 'Capsule aboard. Trigger a spill to test Catch.';
    $('capsule').setAttribute('transform', catching ? `translate(${70 * Math.min(1,elapsed/s.settings.window)},${105 * Math.min(1,elapsed/s.settings.window)**2})` : '');
    $('capsule').setAttribute('opacity', s.phase === 'reload' || (s.phase === 'ended' && s.result !== 'delivered') ? '0' : '1');
    const signature = JSON.stringify([s.publicLog,s.privateLog]);
    if (signature !== logSignature) { logSignature = signature; [['publicLog',s.publicLog],['privateLog',s.privateLog]].forEach(([id,list]) => { $(id).replaceChildren(...list.slice(-20).map(e => { const li = document.createElement('li'), time = document.createElement('time'); time.textContent = e.time.toFixed(1)+' s'; li.append(time,document.createTextNode(e.text)); return li; })); }); }
  }
  function frame(now) {
    const dt = Math.min(.05,(now-last)/1000); last = now;
    if (started && !paused && model.phase !== 'ended') {
      // An act deadline wins over a catch that would finish after the act.
      if (model.time + dt >= 45) { model.time = 45; model.end(); }
      else model.tick(dt);
      if (model.phase === 'reload') { if (reloadAt === null) reloadAt = model.time+3; if (model.time >= reloadAt) { model.reload(); reloadAt=null; } }
      render();
    }
    requestAnimationFrame(frame);
  }
  render(); requestAnimationFrame(frame);
})();
