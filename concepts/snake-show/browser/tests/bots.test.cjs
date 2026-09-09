const { test } = require('node:test');
const assert = require('node:assert/strict');
const { Episode, DT, makeStation, rng, inCatchZone } = require('../engine.js');
const Lift = require('../lift-settings.js');

function fixture(settings = {}, count = 2, seed = 11) {
  const g = new Episode({ mode: 'practice', seed, settings: { botSkill: 100, ...settings } }); g.start();
  const ids = Array.from({ length: count }, (_, i) => i);
  g.stations = [makeStation(ids, 0, rng(seed), g.settings)];
  for (const id of ids) Object.assign(g.players[id], { bot: true, operated: true, active: true, role: 'Loyal', station: 0 });
  return g;
}

test('bots tilt a level tray toward the center and reverse the tilt to brake a returning ball', () => {
  const g = fixture(), s = g.stations[0]; g.random = () => .5;
  const decisions = (x, vx) => {
    s.x = x; s.vx = vx; s.h.fill(0); s.v.fill(0);
    return s.ids.map((id, i) => { g.players[id].nextThink = 0; return g.botMotor(g.players[id], s, i); });
  };
  assert.deepEqual(decisions(.6, 0), [false, true], 'raise the end under a stationary ball on the right');
  assert.deepEqual(decisions(-.6, 0), [true, false], 'mirror the correction on the left');
  assert.deepEqual(decisions(.25, -.4), [true, false], 'brake leftward momentum before crossing center');
  assert.deepEqual(decisions(-.25, .4), [false, true], 'brake rightward momentum before crossing center');
});

test('three-cable bots steer the ball on both tray axes', () => {
  const g = fixture({}, 3), s = g.stations[0]; g.random = () => .5;
  s.x = 0; s.z = .6;
  assert.deepEqual(s.ids.map((id, i) => g.botMotor(g.players[id], s, i)), [false, false, true]);
  s.z = -.3; g.players.forEach(p => { p.nextThink = 0; });
  assert.deepEqual(s.ids.map((id, i) => g.botMotor(g.players[id], s, i)), [true, true, false]);
});

test('skilled bots bring displaced balls toward center without a Catch reset', () => {
  for (const width of [.8, 1.2, 2, 3]) for (const count of [2, 3]) for (const sign of [-1, 1]) {
    const g = fixture({ width }, count), s = g.stations[0];
    s.x = sign * .6; s.z = 0;
    let error = 0, samples = 0;
    for (let step = 0; step < 1200; step++) {
      g.phaseTime = step * DT; g.physics(s, DT);
      assert.equal(s.state, 'lifting', 'no spill, lava contact, or catch teleport at width ' + width);
      if (step >= 840) { error += Math.hypot(s.x, s.z); samples++; }
    }
    assert.ok(error / samples < .15, count + ' cables, width ' + width + ': mean offset ' + error / samples);
    assert.ok(Math.min(...s.h) > 0, 'centering still allows upward progress');
  }
});

test('skill changes reaction time immediately without resetting the lift or the team attempt', () => {
  const g = fixture({ botSkill: 0 }), s = g.stations[0], p = g.players[1]; g.random = () => .5;
  g.phaseTime = 2; g.botMotor(p, s, 1); const slowDelay = p.nextThink - g.phaseTime;
  g.attempt.spent = true; p.mistakeUntil = 9;
  const before = { x: s.x, h: [...s.h] };
  g.applySettings({ botSkill: 100 });
  assert.equal(p.nextThink, g.phaseTime); assert.equal(p.mistakeUntil, 0);
  g.botMotor(p, s, 1); assert.ok(p.nextThink - g.phaseTime < slowDelay / 3);
  assert.equal(g.stations[0], s); assert.equal(s.x, before.x); assert.deepEqual(s.h, before.h);
  assert.equal(g.attempt.spent, true);
  assert.equal(Lift.importDraft(Lift.exportDraft(g.settings)).botSkill, 100);
  assert.equal(Lift.importDraft('{"version":1,"settings":{"width":1.2}}').botSkill, 75);
});

test('Catch skill applies to future falls and does not make a Snake cooperative', () => {
  for (const botSkill of [0, 100]) {
    const g = fixture({ botSkill }), s = g.stations[0]; g.random = () => .5; g.fault(s);
    for (const at of Object.values(s.catchPlan)) assert.equal(inCatchZone(s, s.catchAt + at), botSkill === 100);
    const plan = { ...s.catchPlan }; g.applySettings({ botSkill: 100 - botSkill });
    assert.deepEqual(s.catchPlan, plan, 'a live skill edit does not rewrite an ongoing Catch');
  }
  const g = fixture(), s = g.stations[0]; g.mode = 'play'; g.players[1].role = 'Snake'; g.random = () => .5; g.fault(s);
  assert.equal(inCatchZone(s, s.catchAt + s.catchPlan[1]), false);
});
