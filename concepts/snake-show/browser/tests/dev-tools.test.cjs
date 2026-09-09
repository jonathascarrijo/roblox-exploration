const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const Engine = require('../engine.js');
const Dev = require('../dev-tools.js');
const approved = require('../presets/approved-2026-09-08.json').settings;

function fixture(settings = approved) {
  const ui = {
    game: null, paused: false, roleVisible: false,
    reset(mode = 'play', start = false, seed = 17) {
      ui.game = new Engine.Episode({ mode, seed, settings }); ui.paused = false;
      if (start) ui.game.start();
    },
    update() {}, showScene(visible) { ui.roleVisible = visible; },
    pause() { ui.paused = true; }, resume() { ui.paused = false; }
  };
  ui.reset();
  return { ui, dev: Dev.create(ui) };
}

test('every dev scene opens with baseline and approved tuning, including the new spotter rules', () => {
  const phases = { roleSnake:'casting', roleLoyal:'casting', vote:'vote', public:'vote', catch:'challenge', early:'challenge', runoff:'runoff', deadlock:'result', Snake:'result', Loyal:'result', finale:'finale', watch:'vote', backstage:'vote', history:'vote' };
  for (const settings of [{}, approved]) for (const [scene] of Dev.scenes) {
    const { ui, dev } = fixture(settings), before = { ...ui.game.settings };
    assert.equal(dev.runScene(scene), true);
    const g = ui.game;
    assert.equal(g.phase, phases[scene], scene);
    assert.deepEqual(g.settings, before, 'loading a scene preserves tuning');
    assert.equal(g.players.filter(p => p.role === 'Snake').length, 2);
    assert.ok(g.stations.every(s => s.ids.length === 2));
    if (scene.startsWith('role')) {
      assert.equal(g.players[0].role, scene === 'roleSnake' ? 'Snake' : 'Loyal');
      assert.equal(g.timers.phase.paused, true); assert.equal(ui.paused, false); assert.equal(ui.roleVisible, true);
    } else { assert.equal(ui.paused, true); assert.equal(ui.roleVisible, false); }
    if (scene === 'history') {
      assert.equal(g.act, 2); assert.equal(g.activeIds().length, 7);
      assert.equal(g.stations.length, 3); assert.equal(g.history[1].spotter.id, g.spotter);
    }
    if (['Snake', 'Loyal'].includes(scene)) assert.equal(g.players[g.lastVote.removed].role, scene);
    if (scene === 'catch') assert.equal(g.stationOf(0).state, 'catch');
    if (scene === 'early') assert.equal(g.stations.filter(s => g.stationFinished(s)).length, 1);
  }
});

test('vote steps cast visibly, lock only bots, and handle all eight in watch mode', () => {
  const { ui, dev } = fixture();
  dev.runScene('vote'); dev.step('oneVote');
  assert.equal(ui.game.voted.size, 1); assert.equal(ui.game.locked.size, 0);
  assert.equal(ui.game.voted.has(0), false);
  dev.step('botLocks');
  assert.equal(ui.game.voted.size, 7); assert.equal(ui.game.locked.size, 7);
  assert.equal(ui.game.phase, 'vote'); assert.equal(dev.available('botLocks'), false);
  dev.runScene('watch');
  for (let i = 0; i < 8; i++) assert.equal(dev.step('oneVote'), true);
  assert.equal(ui.game.voted.size, 8); assert.equal(dev.available('oneVote'), false);
  dev.step('botLocks'); assert.ok(['result', 'runoff'].includes(ui.game.phase));
});

test('finish-lift and deadline steps respect phase boundaries and preserve bot identities', () => {
  const { ui, dev } = fixture();
  for (const [action] of Dev.actions) assert.equal(dev.step(action), false, 'lobby is not a scene to step');
  assert.equal(dev.runScene('unknown'), false);
  dev.runScene('early');
  const bots = ui.game.players.map(p => p.bot);
  dev.step('finishLift'); assert.equal(ui.game.stations.filter(s => ui.game.stationFinished(s)).length, 2);
  ui.game.setTimerPaused('phase', true); ui.game.tick(2);
  assert.equal(dev.step('deadline'), true); assert.equal(ui.game.phase, 'vote');
  assert.deepEqual(ui.game.players.map(p => p.bot), bots);
  assert.equal(Object.keys(ui.game.botVoteAt).length, 7, 'future bot votes are still scheduled');
  assert.equal(dev.available('finishLift'), false);
  dev.step('deadline'); assert.equal(ui.game.phase, 'runoff');
  dev.step('deadline'); assert.equal(ui.game.phase, 'result');
  dev.runScene('finale');
  for (const [action] of Dev.actions) assert.equal(dev.step(action), false);
  dev.runScene('roleSnake'); dev.step('deadline'); assert.equal(ui.game.phase, 'challenge');
  assert.equal(ui.game.timers.phase.paused, false);
});

test('the browser scene tool is exposed only with the exact dev opt-in', () => {
  const source = fs.readFileSync(require.resolve('../dev-tools.js'), 'utf8');
  for (const search of ['', '?test=1', '?dev=0', '?dev=true', '?dev=1']) {
    const context = { location: { search }, URLSearchParams, SnakeShow: Engine };
    vm.runInNewContext(source, context);
    assert.equal(!!context.SnakeShowDev, search === '?dev=1');
  }
});
