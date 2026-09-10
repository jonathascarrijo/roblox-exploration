/* Local scene shortcuts. Mounted only with ?dev=1; normal play has no panel. */
(function (root) {
  'use strict';
  const commonJS = typeof module !== 'undefined' && module.exports;
  if (!commonJS && new URLSearchParams(location.search).get('dev') !== '1') return;
  const Engine = commonJS ? require('./engine.js') : root.SnakeShow;
  const scenes = [
    ['roleSnake', 'Your Trickster role'], ['roleLoyal', 'Your Keeper role'],
    ['vote', 'Vote'], ['public', 'Public votes'], ['catch', 'Catch timer'],
    ['early', 'Early finish'], ['runoff', 'Runoff'], ['deadlock', 'Deadlock'],
    ['Trickster', 'Trickster reveal'], ['Keeper', 'Keeper reveal'], ['finale', 'Finale reveal'],
    ['watch', 'Watching'], ['backstage', 'Rest area'], ['history', 'Trial 2']
  ];
  const actions = [
    ['oneVote', 'Next bot vote'], ['botLocks', 'Bots lock votes'],
    ['finishLift', 'Finish another lift'], ['deadline', 'Timer ends']
  ];
  const voting = g => ['vote', 'runoff'].includes(g.phase);
  const finishChallenge = g => {
    // Bounded even if a future fixture accidentally freezes the phase clock.
    g.setTimerPaused('phase', false);
    for (let i = 0; g.phase === 'challenge' && i < 5500; i++) g.tick(1 / 120);
    if (g.phase === 'challenge') throw new Error('Scene did not finish its lift round.');
  };
  function create(ui) {
    function runScene(kind) {
      // Keep saved scene URLs working after the role names change.
      kind = ({ Snake: 'Trickster', Loyal: 'Keeper' })[kind] || kind;
      if (!scenes.some(([id]) => id === kind)) return false;
      if (kind.startsWith('role')) {
        const wanted = kind === 'roleSnake' ? 'Trickster' : 'Keeper';
        let seed = 1;
        while (new Engine.Episode({ seed }).players[0].role !== wanted) seed++;
        ui.reset('play', true, seed);
        ui.game.study = true; ui.game.setTimerPaused('phase', true);
        ui.showScene(true);
        return true;
      }
      ui.reset('watch', true, 11);
      const g = ui.game; g.study = true;
      g.nextPhase();
      if (kind === 'catch') {
        g.mode = 'play'; g.players.forEach(p => p.bot = false);
        g.fault(g.stationOf(0)); g.tick(1);
      } else if (kind === 'early') {
        g.mode = 'play'; g.players[0].bot = false;
        g.stations.forEach(s => { s.state = 'reload'; s.reloadAt = 1000; });
        ui.update(); g.phaseTime = 12;
        g.endStation(g.stationOf(0), 'delivered'); g.tick(.01);
      } else {
        finishChallenge(g);
        if (kind === 'history') {
          g.heists = 1; g.history[0].heists = 1;
          for (const p of g.players) g.castVote(p.id, p.id === 1 ? 2 : 1);
          g.finishVote(); g.nextPhase(); finishChallenge(g);
        }
        if (kind !== 'watch') { g.mode = 'play'; g.players[0].bot = false; }
        if (kind === 'backstage') { g.players[0].active = false; g.beginVote(); }
        if (kind === 'public') {
          [7, 0, 3, 2, 0, 1, null, 2].forEach((target, id) => g.castVote(id, target));
          g.setCertain(3, true);
        }
        if (['runoff', 'deadlock'].includes(kind)) {
          g.castVote(0, 1); g.castVote(1, 2); g.finishVote();
          if (kind === 'deadlock') g.finishVote();
        }
        if (['Trickster', 'Keeper'].includes(kind)) {
          const target = g.players.find(p => p.role === kind).id;
          for (const p of g.players) g.castVote(p.id, p.id === target ? null : target);
          g.finishVote();
        }
        if (kind === 'finale') {
          g.act = 3; g.completedActs = 3; g.heists = 2;
          g.history[0].act = 3; g.history[0].heists = 2;
          for (const p of g.players) g.castVote(p.id, p.id === 1 ? null : 1);
          g.finishVote(); g.nextPhase();
        }
      }
      ui.showScene(false); ui.pause();
      return true;
    }
    function available(action) {
      const g = ui.game;
      if (action === 'oneVote') return voting(g) && g.players.some(p => p.bot && p.active && !g.voted.has(p.id));
      if (action === 'botLocks') return voting(g) && g.players.some(p => p.bot && p.active && !g.locked.has(p.id));
      if (action === 'finishLift') return g.phase === 'challenge' && g.stations.some(s => !g.stationFinished(s));
      if (action === 'deadline') return ['casting', 'challenge', 'vote', 'runoff', 'result'].includes(g.phase);
      return false;
    }
    function step(action) {
      if (!available(action)) return false;
      const g = ui.game;
      if (action === 'oneVote') {
        const p = g.players.find(p => p.bot && p.active && !g.voted.has(p.id));
        g.castVote(p.id, g.botBallot(p));
      } else if (action === 'botLocks') {
        for (const p of g.players.filter(p => p.bot && p.active && !g.locked.has(p.id))) {
          if (!voting(g)) break;
          if (!g.voted.has(p.id)) g.castVote(p.id, g.botBallot(p));
          g.lockVote(p.id);
        }
      } else if (action === 'finishLift') {
        g.endStation(g.stations.find(s => !g.stationFinished(s)), 'delivered'); g.tick(.01);
      } else if (action === 'deadline') {
        // Expire only this phase, including a previously frozen countdown.
        // Leave bot identities and future bot decisions intact.
        g.setTimerPaused('phase', false);
        g.phaseTime += Math.max(0, Engine.DURATIONS[g.phase] - g.timerClock());
        if (g.phase === 'challenge') g.finishChallenge(); else g.nextPhase();
      }
      ui.update();
      return true;
    }
    return { runScene, available, step };
  }
  function mount(ui, host) {
    const controller = create(ui);
    const pauseButton = document.createElement('button');
    pauseButton.id = 'devSimulationPause';
    const menu = document.createElement('details');
    menu.id = 'devScenes'; menu.className = 'dev-scenes';
    menu.innerHTML = '<summary>Dev scenes</summary><div class="dev-scenes-content">' +
      '<p>Scenes restart this local round. Your lift tuning is kept.</p>' +
      '<div class="dev-scene-buttons" role="group" aria-label="Load a dev scene">' +
      scenes.map(([id, label]) => `<button data-dev-scene="${id}">${label}</button>`).join('') + '</div>' +
      '<div class="dev-scene-buttons dev-scene-steps" role="group" aria-label="Step the current scene">' +
      actions.map(([id, label]) => `<button data-dev-step="${id}">${label}</button>`).join('') + '</div>' +
      '<button data-dev-fresh>Fresh round</button></div>';
    host.append(pauseButton, menu);
    pauseButton.addEventListener('click', () => ui.paused ? ui.resume() : ui.pause());
    menu.addEventListener('click', e => {
      const button = e.target.closest('button');
      if (!button || button.disabled) return;
      if (button.dataset.devScene) controller.runScene(button.dataset.devScene);
      else if (button.dataset.devStep) controller.step(button.dataset.devStep);
      else if (button.hasAttribute('data-dev-fresh')) ui.reset('play', true);
      // Pause and scene changes move focus; return it to the dev control.
      if (!button.disabled) button.focus();
    });
    function update() {
      pauseButton.textContent = ui.paused ? 'Resume game' : 'Pause game';
      pauseButton.disabled = ui.game.phase === 'lobby';
      pauseButton.setAttribute('aria-pressed', String(ui.paused));
      for (const button of menu.querySelectorAll('[data-dev-step]')) button.disabled = !controller.available(button.dataset.devStep);
    }
    update();
    return { ...controller, update, open: () => { menu.open = true; } };
  }
  const api = { create, mount, scenes, actions };
  if (commonJS) module.exports = api; else root.SnakeShowDev = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
