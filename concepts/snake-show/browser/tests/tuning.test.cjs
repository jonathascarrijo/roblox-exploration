const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { Episode, DT, inCatchZone, needle, gradient, shares } = require('../engine.js');
const Lift = require('../lift-settings.js');

const reference = fs.readFileSync(path.join(__dirname, '../../prototypes/prize-lift-coupled-cables.html'), 'utf8');
function referenceFunction(name) {
  const from = reference.indexOf(`  function ${name}(`);
  assert.ok(from >= 0, `Reference has ${name}`);
  const open = reference.indexOf('{', from); let depth = 1, to = open + 1;
  while (depth && to < reference.length) { if (reference[to] === '{') depth++; if (reference[to] === '}') depth--; to++; }
  return reference.slice(from, to);
}
function episode(settings = {}) {
  const g = new Episode({ mode: 'practice', seed: 11, settings }); g.start();
  g.players.forEach(p => { p.bot = false; }); return g;
}

test('all 17 reference sliders retain their default values, ranges, and increments', () => {
  const context = {};
  vm.runInNewContext(reference.slice(reference.indexOf('  const DEF ='), reference.indexOf('  const NOTES =')) + '\nthis.defaults=DEF;this.sliders=SLIDERS;this.fixed=FIX;', context);
  for (const [key, value] of Object.entries(context.defaults)) assert.equal(Lift.DEFAULTS[key], value, key);
  const specs = context.sliders.filter(s => s.k);
  assert.equal(specs.length, 17);
  for (const r of specs) { const s = Lift.SLIDERS.find(s => s.key === r.k); for (const field of ['min', 'max', 'step']) assert.equal(s[field], r[field], r.k + '.' + field); }
  for (const key of ['mp', 'mw', 'r', 'edge', 'finish', 'top', 'dmax', 'limit', 'zoneAt']) assert.equal(Lift.FIXED[key], context.fixed[key], key);
});

test('two-cable physics matches the original functions frame by frame under changing inputs', () => {
  for (const settings of [{}, { force: 1.3, ballW: 2, cw: 2.5, g: 2.2, roll: .7 }, { force: 2.2, vup: .6, vdown: .4, cb: .4, mus: .04, muk: .02 }]) {
    for (const armed of [false, true]) {
    const g = episode(settings), s = g.stations[0]; s.x = .35;
    if (armed) { s.armedBy = 0; s.burstUntil = 100; }
    const context = { P: { ...Lift.FIXED, ...g.settings, water: Lift.FIXED.lava }, DT,
      S: { yL: 0, yR: 0, vL: 0, vR: 0, x: .35, vx: 0, t: 0, restSince: 0, rollTold: -1, phase: 'running' },
      rigOn: side => armed && side === 'L', log: () => {}, fault: () => { context.S.phase = 'fault'; } };
    vm.createContext(context);
    vm.runInContext(['loads', 'endStep', 'stepPhysics'].map(referenceFunction).join('\n'), context);
    for (let step = 0; step < 800; step++) {
      const left = step % 97 < 66, right = step % 89 < 71;
      g.players[0].pulling = left; g.players[1].pulling = right;
      g.phaseTime = context.S.t; context.stepPhysics(left, right); g.physics(s, DT);
      for (const [value, expected] of [[s.h[0], context.S.yL], [s.h[1], context.S.yR], [s.v[0], context.S.vL], [s.v[1], context.S.vR], [s.x, context.S.x], [s.vx, context.S.vx]]) assert.ok(Math.abs(value - expected) < 1e-9, `step ${step}: ${value} vs ${expected}`);
      if (context.S.phase === 'fault' || s.state !== 'lifting') break;
    }
    }
  }
});

test('live edits affect both cables without replacing the current station', () => {
  const slow = episode({ force: 1.1 }), fast = episode({ force: 1.1 });
  for (const g of [slow, fast]) { g.stations[0].x = 0; g.players[0].pulling = true; g.players[1].pulling = true; }
  const station = fast.stations[0]; fast.applySettings({ force: 2.5, vup: .7 });
  slow.tick(.5); fast.tick(.5);
  assert.equal(fast.stations[0], station); assert.equal(station.settings, fast.settings);
  assert.ok(fast.stations[0].h[0] > slow.stations[0].h[0] + .1);
  const x = station.x; fast.applySettings({ x0: .8 }); assert.equal(station.x, x, 'no teleport on start-offset edit');
  fast.beginAct(); assert.equal(Math.abs(fast.stations[0].x), .8);
});

test('width changes the physical slope and distance to an edge while retaining relative prize placement', () => {
  const wide = episode({ width: 2, mus: 0, muk: 0 }), narrow = episode({ width: 1, mus: 0, muk: 0 });
  for (const g of [wide, narrow]) { const s = g.stations[0]; s.h = [-.1, .1]; s.x = 0; g.physics(s, DT); }
  assert.ok(Math.abs(gradient(narrow.stations[0]).x / gradient(wide.stations[0]).x - 2) < 1e-9);
  assert.ok(Math.abs(narrow.stations[0].vx / wide.stations[0].vx - 2) < 1e-9, 'half the span doubles slide acceleration');
  assert.ok(Math.abs(narrow.stations[0].x / wide.stations[0].x - 4) < 1e-9, 'shorter tray also halves the travel distance to an edge');
  const s = wide.stations[0], before = { h: [...s.h], x: s.x, vx: s.vx, load: shares(s) };
  wide.applySettings({ width: .8 });
  assert.equal(wide.stations[0], s); assert.deepEqual(s.h, before.h);
  assert.equal(s.x, before.x); assert.equal(s.vx, before.vx); assert.deepEqual(shares(s), before.load);
  const triangle = { ids: [0, 1, 2], h: [0, .2, .4], settings: { width: 2 } };
  const slope = gradient(triangle); triangle.settings.width = 1;
  assert.equal(gradient(triangle).x, 2 * slope.x); assert.equal(gradient(triangle).z, 2 * slope.z);
  assert.equal(Lift.importDraft('{"version":1,"settings":{"force":1.8}}').width, 2, 'old drafts inherit the reference width');
});

test('live Catch duration and zone drive eligibility and both needle passes', () => {
  const g = episode(), s = g.stations[0]; g.fault(s);
  g.applySettings({ catchWin: 6, catchZone: .5 });
  const zone = Lift.catchGeometry(g.settings);
  assert.equal(zone.start, .6); assert.equal(zone.seconds, .5);
  assert.equal(inCatchZone(s, 1.79), false); assert.equal(inCatchZone(s, 2.05), true);
  assert.equal(inCatchZone(s, 3.95), true); assert.equal(needle(s, 3), 1);
  g.tick(3.1); assert.equal(s.state, 'catch', 'window not hardcoded to 3 seconds');
  g.applySettings({ catchWin: 1, catchZone: 1.5 });
  assert.equal(Lift.catchGeometry(g.settings).seconds, .2, 'zone clips exactly as in the reference');
  g.tick(DT); assert.equal(s.state, 'reload');
});

test('live Rig duration and hold preserve the single consumed team attempt', () => {
  const g = episode({ rigHold: .25, rigTime: 1 }), s = g.stations[0];
  g.players[0].role = 'Snake'; g.pressRig(0); g.tick(.26);
  assert.equal(g.attempt.spent, true); const start = s.armedAt;
  g.applySettings({ rigTime: 6, rigForce: 3 }); assert.equal(s.burstUntil, start + 6);
  assert.equal(g.pressRig(0), false);
});

test('draft round-trip, validation, and instances keep experiment settings independent', () => {
  const data = { ...Lift.DEFAULTS, cw: 3.7, catchWin: 5 };
  assert.deepEqual(Lift.importDraft(Lift.exportDraft(data)), data);
  for (const bad of ['bad JSON', '{"version":2,"settings":{}}', '{"version":1,"settings":{"vup":-1}}', '{"version":1,"settings":{"force":"2"}}', '{"version":1,"settings":{"secret":1}}']) assert.throws(() => Lift.importDraft(bad));
  const a = episode(), b = episode();
  assert.throws(() => a.applySettings({ force: 2, catchWin: NaN })); assert.equal(a.settings.force, 1.7);
  a.applySettings({ force: 2 }); assert.equal(b.settings.force, 1.7); assert.equal(Lift.DEFAULTS.force, 1.7);
});

test('all supported slider extremes remain finite during seeded bot episodes', () => {
  for (const spec of Lift.SLIDERS) for (const value of [spec.min, spec.max]) {
    const g = new Episode({ mode: 'watch', seed: 18, settings: { [spec.key]: value } }); g.start(); g.tick(350);
    assert.equal(g.phase, 'finale', spec.key + '=' + value);
    assert.ok(g.stations.every(s => [...s.h, ...s.v, s.x, s.z, s.vx, s.vz].every(Number.isFinite)), spec.key + '=' + value);
  }
});
