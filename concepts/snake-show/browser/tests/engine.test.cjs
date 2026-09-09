const { test } = require('node:test');
const assert = require('node:assert/strict');
const { Episode, POSITIONS, assignGroups, chooseSpotter, tally, winner, makeStation, shares, rng, inCatchZone } = require('../engine.js');

function fixture(ids = [0, 1]) {
  const g = new Episode({ seed: 11, mode: 'play' }); g.start(); g.nextPhase();
  g.players.forEach(p => { p.bot = false; p.active = true; p.role = p.id < 2 ? 'Snake' : 'Loyal'; });
  g.stations = [makeStation(ids, 0, rng(1))];
  for (const id of ids) { g.players[id].operated = true; g.players[id].station = 0; }
  return g;
}

test('casting gives exactly two random Snakes, six Loyals, and seven labeled bots', () => {
  const pairs = new Set();
  for (let seed = 0; seed < 40; seed++) {
    const g = new Episode({ seed });
    assert.equal(g.players.filter(p => p.role === 'Snake').length, 2);
    assert.equal(g.players.filter(p => p.bot).length, 7);
    pairs.add(g.players.filter(p => p.role === 'Snake').map(p => p.id).join());
  }
  assert.ok(pairs.size > 15);
});

test('every Prize Lift has exactly two operators; an odd cast is rejected without a spotter', () => {
  for (const size of [4, 6, 8]) {
    const ids = Array.from({ length: size }, (_, i) => i);
    for (let act = 1; act <= 3; act++) {
      const groups = assignGroups(ids, act);
      assert.deepEqual(groups.flat().sort(), ids);
      assert.ok(groups.every(g => g.length === 2));
    }
  }
  assert.notDeepEqual(assignGroups([0, 1, 2, 3, 4, 5, 6, 7], 1), assignGroups([0, 1, 2, 3, 4, 5, 6, 7], 2));
  assert.throws(() => assignGroups([0, 1, 2, 3, 4, 5, 6], 2), /spotter/);
  assert.throws(() => makeStation([0, 1, 2], 0, rng(1)), /two operators/);
});

test('the spotter is the removed contestant’s last partner; a deadlock keeps the spotter; roles are never consulted', () => {
  const partners = { 0: 1, 1: 0, 2: 3, 3: 2, 4: 5, 5: 4, 6: 7, 7: 6 };
  assert.equal(chooseSpotter([0, 1, 2, 3, 4, 5, 6, 7], null, {}, null), null, 'even cast: nobody spots');
  assert.equal(chooseSpotter([0, 1, 2, 4, 5, 6, 7], 3, partners, null), 2, 'partner of the removed contestant');
  assert.equal(chooseSpotter([0, 1, 2, 4, 5, 6, 7], null, partners, 2), 2, 'deadlock keeps the current spotter');
  assert.equal(chooseSpotter([0, 1, 2, 3, 4, 5], 6, { ...partners, 6: 7 }, 2), null, 'an even cast after the spotter’s act: nobody spots');
  assert.equal(chooseSpotter([0, 1, 2, 4, 5, 6, 7], 3, {}, null), 7, 'fixture fallback only: last active contestant');
  assert.equal(chooseSpotter([0, 1, 2, 3, 4, 5], 7, partners, null), null, 'even cast after a removal: nobody spots');
  assert.equal(chooseSpotter.length, 4);
});

test('the capsule triggers Catch on crossing the tray edge', () => {
  const g = fixture([0, 1]), s = g.stations[0];
  s.x = 1.01;
  assert.ok(shares(s).some(w => w < 0), 'edge detection must use unclamped shares');
  g.tick(1 / 120); assert.equal(s.state, 'catch');
});

test('station delivery requires both ends and banks only one prize', () => {
  const g = fixture([0, 1]), s = g.stations[0];
  s.x = 0; s.h = [2.7, 2.4]; g.players.forEach(p => { p.pulling = true; });
  g.tick(.01); assert.equal(s.delivered, false);
  s.h = [2.7, 2.7]; g.tick(.01); assert.equal(s.delivered, true); assert.equal(g.pot, 1);
  g.tick(5); assert.equal(g.pot, 1);
});

test('Rig reservation rejects Loyals and non-operators, contends once, cancels, and consumes at 1.5s', () => {
  const g = fixture([0, 1]), s = g.stations[0];
  s.x = 0; g.players.forEach(p => { p.pulling = true; });
  assert.equal(g.pressRig(2), false, 'not at a console and not the spotter');
  g.players[0].role = 'Loyal'; assert.equal(g.pressRig(0), false, 'Loyals have no Rig'); g.players[0].role = 'Snake';
  assert.equal(g.pressRig(0), true); assert.equal(g.pressRig(1), false);
  g.tick(.7); g.releaseRig(0); assert.equal(g.attempt.reserved, null); assert.equal(g.attempt.spent, false);
  assert.equal(g.pressRig(1), true); g.tick(1.51);
  assert.equal(g.attempt.spent, true); assert.equal(s.armedBy, 1); assert.equal(g.pressRig(0), false);
});

test('leaving or a fault cancels an unfinished Rig and stops public Pull', () => {
  for (const reason of ['leave', 'fault']) {
    const g = fixture(); g.pressRig(0); g.tick(.3);
    reason === 'leave' ? g.operate(0, false) : g.fault(g.stations[0]);
    assert.equal(g.attempt.reserved, null); assert.equal(g.attempt.spent, false); assert.equal(g.players[0].rigging, false);
    assert.equal(g.players[0].pulling, false);
  }
});

test('Catch has two quarter-second zones, one fresh tap per player, and independent saves', () => {
  const g = fixture(), s = g.stations[0]; g.fault(s);
  assert.equal(inCatchZone(s, .89), false); assert.equal(inCatchZone(s, .91), true);
  assert.equal(inCatchZone(s, 1.14), true); assert.equal(inCatchZone(s, 1.16), false);
  assert.equal(inCatchZone(s, 1.975), true); assert.equal(inCatchZone(s, 3), false);
  assert.equal(g.pressCatch(0, 0), 'miss'); g.releaseCatch(0); g.tick(1.025);
  assert.equal(g.pressCatch(0, 0), 'ineligible'); assert.equal(g.pressCatch(1, 0), 'saved');
  assert.equal(s.state, 'lifting'); assert.equal(s.catches, 1); assert.equal(s.x, 0);
});

test('pre-held Catch, ineligible spectators, and removed contestants cannot rescue', () => {
  const g = fixture(), s = g.stations[0];
  assert.equal(g.pressCatch(0, 0), 'ineligible'); g.fault(s); g.tick(1.025);
  assert.equal(g.pressCatch(0, 0), 'held');
  g.players[2].operated = false; g.players[2].x = 0; g.players[2].y = 0;
  assert.equal(g.pressCatch(2, 0), 'ineligible');
  g.players[1].active = false; assert.equal(g.pressCatch(1, 0), 'ineligible');
  g.releaseCatch(0); assert.equal(g.pressCatch(0, 0), 'saved');
});

test('an active nearby contestant can rescue after leaving their console', () => {
  const g = fixture(), s = g.stations[0], p = g.players[2];
  p.operated = false; p.x = 775; p.y = 242;
  g.fault(s); g.tick(1.025); assert.equal(g.pressCatch(2, 0), 'saved');
});

test('only an armed, uncaught spill completes a heist; count stays private until act end', () => {
  for (const armed of [false, true]) {
    const g = fixture(), s = g.stations[0];
    if (armed) { s.armedBy = 0; s.burstUntil = 5; g.attempt.spent = true; }
    g.fault(s); g.tick(3.01);
    assert.equal(s.state, 'reload'); assert.equal(s.heists, Number(armed)); assert.equal(g.heists, 0);
    assert.equal(s.armedBy, null); g.tick(3.01); assert.equal(s.state, 'lifting'); assert.equal(s.armedBy, null);
    g.finishChallenge(); assert.equal(g.heists, Number(armed));
  }
});

test('Catch clears both the diverter and the burst, but keeps the attempt consumed', () => {
  const g = fixture(), s = g.stations[0];
  s.armedBy = 0; s.burstUntil = 5; g.attempt.spent = true;
  g.fault(s); g.tick(1.025); assert.equal(g.pressCatch(1, 0), 'saved');
  assert.equal(s.armedBy, null); assert.equal(s.burstUntil, 0); assert.equal(g.attempt.spent, true);
  g.fault(s); g.tick(3.01); assert.equal(s.heists, 0);
});

function spotterFixture(role = 'Snake') {
  const g = fixture([0, 1]), p = g.players[2];
  p.role = role; p.spotting = true; p.operated = false; p.station = -1; g.spotter = 2;
  g.spotLog = { id: 2, seconds: [0], saves: 0, misses: 0 };
  p.x = 0; p.y = 0; return g;
}
const rescueArea = index => ({ x: POSITIONS[index].x, y: POSITIONS[index].y + 60 });

test('a Snake spotter arms a lift only from its rescue area, with no motor change; leaving the area cancels the hold', () => {
  const g = spotterFixture(), s = g.stations[0], p = g.players[2];
  g.players[0].pulling = true; g.players[1].pulling = true;
  assert.equal(g.pressRig(2), false, 'outside every rescue area');
  Object.assign(p, rescueArea(0));
  assert.equal(g.pressRig(2), true); assert.equal(g.attempt.station, 0); assert.equal(g.attempt.reserved, 2);
  g.tick(.5); p.x = 0; g.tick(1 / 120);
  assert.equal(g.attempt.reserved, null); assert.equal(g.attempt.spent, false); assert.equal(p.rigging, false);
  Object.assign(p, rescueArea(0)); assert.equal(g.pressRig(2), true);
  const twin = fixture([0, 1]); twin.players[0].pulling = true; twin.players[1].pulling = true;
  twin.tick(.5); twin.tick(1 / 120); g.tick(2); twin.tick(2);
  assert.equal(g.attempt.spent, true); assert.equal(s.armedBy, 2); assert.equal(s.burstUntil, 0, 'no burst');
  assert.deepEqual(s.h, twin.stations[0].h, 'arming from the rescue area leaves the physics untouched');
  assert.equal(s.x, twin.stations[0].x);
  assert.match(JSON.stringify(s.events.filter(e => e.private)), /rescue area.*no motor changed/);
  g.fault(s); g.tick(3.01); assert.equal(s.heists, 1, 'an uncaught spill at the armed lift is a heist');
});

test('a Loyal spotter cannot arm; a spotter can Catch at the lift they stand beside and both taps are recorded', () => {
  const loyal = spotterFixture('Loyal'); Object.assign(loyal.players[2], rescueArea(0));
  assert.equal(loyal.pressRig(2), false);
  const g = spotterFixture(), s = g.stations[0], p = g.players[2];
  g.fault(s); g.tick(.3); assert.equal(g.pressCatch(2, 0), 'ineligible', 'not inside the rescue area');
  Object.assign(p, rescueArea(0)); g.releaseCatch(2);
  assert.equal(g.pressCatch(2, 0), 'miss'); assert.equal(g.spotLog.misses, 1);
  g.releaseCatch(2); g.tick(.725); assert.equal(g.pressCatch(2, 0), 'ineligible', 'one tap per fault');
  assert.equal(g.pressCatch(1, 0), 'saved');
  g.fault(s); g.tick(1.025); g.releaseCatch(2); assert.equal(g.pressCatch(2, 0), 'saved'); assert.equal(g.spotLog.saves, 1);
});

test('a fault or the deadline at the targeted lift cancels an unfinished spotter hold', () => {
  for (const reason of ['fault', 'timeout']) {
    const g = spotterFixture(), s = g.stations[0]; Object.assign(g.players[2], rescueArea(0));
    g.pressRig(2); g.tick(.5);
    reason === 'fault' ? g.fault(s) : g.endStation(s, 'timeout');
    assert.equal(g.attempt.reserved, null); assert.equal(g.attempt.spent, false);
  }
});

test('the spotter receipt is public, names the longest stay and the taps, and leaks no role or Rig', () => {
  const g = spotterFixture(), p = g.players[2]; Object.assign(p, rescueArea(0));
  g.pressRig(2); g.tick(1.6); g.tick(2);
  const review = g.reviewSnapshot(); assert.equal(review.spotter.kind, 'spotter');
  assert.doesNotMatch(JSON.stringify(review), /SECRET|heists|events|role|armed|Rig|Snake/);
  g.finishChallenge();
  const card = g.history[0].spotter;
  assert.equal(card.id, 2); assert.equal(card.station, 'East lift'); assert.ok(card.seconds > 3.5);
  assert.match(card.text, /spotted this act without a console/); assert.match(card.text, /East lift rescue area/);
  assert.doesNotMatch(JSON.stringify(card), /Rig|diverter|Snake|Loyal|armed|burst/);
  const none = fixture([0, 1]); none.finishChallenge(); assert.equal(none.history[0].spotter, null);
});

test('a removal that leaves an odd cast makes the removed contestant’s last partner the spotter; a deadlock keeps them', () => {
  const g = new Episode({ seed: 11, mode: 'watch' }); g.start(); g.nextPhase();
  assert.equal(g.spotter, null); assert.equal(g.stations.length, 4);
  const partners = { ...g.partners }; assert.equal(Object.keys(partners).length, 8);
  while (g.phase === 'challenge') g.tick(1 / 120);
  g.heists = 1; g.history[0].heists = 1;
  for (const id of g.activeIds()) g.castVote(id, id === 3 ? 4 : 3);
  g.finishVote(); assert.equal(g.lastRemoved, 3); g.nextPhase();
  assert.equal(g.act, 2); assert.equal(g.spotter, partners[3]);
  const spotter = g.players[g.spotter];
  assert.equal(spotter.spotting, true); assert.equal(spotter.operated, false); assert.equal(spotter.station, -1);
  assert.equal(g.stations.length, 3); assert.ok(g.stations.every(s => s.ids.length === 2 && !s.ids.includes(g.spotter)));
  assert.deepEqual([...g.stations.flatMap(s => s.ids), g.spotter].sort(), g.activeIds().sort());
  while (g.phase === 'challenge') g.tick(1 / 120);
  assert.equal(g.history[1].spotter.id, spotter.id);
  g.finishVote(); assert.equal(g.phase, 'runoff'); g.finishVote(); assert.equal(g.lastVote.removed, null);
  g.nextPhase(); assert.equal(g.act, 3); assert.equal(g.spotter, spotter.id, 'deadlock: same spotter');
  assert.equal(g.stations.length, 3);
});

test('burst expiry preserves the capsule diverter; lava, deadline, and delivery defeat it', () => {
  const g = fixture(), s = g.stations[0];
  g.phaseTime = 7; s.armedBy = 0; s.burstUntil = 5; g.fault(s); g.tick(3.01); assert.equal(s.heists, 1);
  for (const result of ['lava', 'timeout', 'delivered']) {
    const g = fixture(), s = g.stations[0]; s.armedBy = 0; s.burstUntil = 5;
    g.endStation(s, result); assert.equal(s.heists, 0); assert.equal(s.armedBy, null);
  }
  const lava = fixture(), lift = lava.stations[0]; lift.armedBy = 0; lift.h = [-1.81, -1.81]; lava.tick(.01);
  assert.equal(lift.state, 'lava'); assert.equal(lift.heists, 0);
});

test('every receipt set has equal public coverage and no role/Rig leakage', () => {
  const g = fixture(), s = g.stations[0];
  g.privateEvent(s, 'rig', 'SECRET ROLE AND RIG'); s.armedBy = 0; g.fault(s); g.tick(3.01); g.finishChallenge();
  assert.deepEqual(s.publicCards.map(c => c.kind), ['outcome', 'handling', 'response']);
  assert.doesNotMatch(JSON.stringify(s.publicCards), /SECRET|Rig|diverter|Snake|doubled|burst|speed/);
  assert.match(JSON.stringify(g.history[0].stations[0].events), /SECRET/);
});

test('Loyal bot ballots do not consult other players’ roles', () => {
  const g = fixture(); g.players[2].role = 'Loyal'; g.candidates = [0, 1, 2, 3];
  g.players[2].suspicion = [1, 2, 0, 3, 0, 0, 0, 0]; g.random = () => .4;
  const first = g.botBallot(g.players[2]);
  g.players[0].role = 'Loyal'; g.players[3].role = 'Snake';
  assert.equal(g.botBallot(g.players[2]), first);
});

test('ballots enforce active cast, no self-votes, editable choices, and runoff eligibility', () => {
  const g = fixture(); g.beginVote(true, [0, 1]);
  assert.equal(g.castVote(0, 0), false); assert.equal(g.castVote(0, 2), false);
  g.players[3].active = false; assert.equal(g.castVote(3, 1), false);
  assert.equal(g.castVote(0, 1), true); assert.equal(g.castVote(0, null), true);
  assert.equal(g.castVote(1, null), true);
  assert.deepEqual(tally([0, 1, 2], { 0: 0, 1: 0, 2: 1 }, [0, 1]).totals, { 0: 1, 1: 1 });
});

test('first tie creates a runoff; second tie consumes the act without removal', () => {
  const g = fixture(); g.history = [{ votes: [] }]; g.completedActs = 1; g.heists = 1;
  g.beginVote(); g.finishVote(); assert.equal(g.phase, 'runoff'); assert.equal(g.candidates.length, 8);
  g.finishVote(); assert.equal(g.phase, 'result'); assert.equal(g.activeIds().length, 8); assert.equal(g.lastVote.removed, null);
  assert.equal(g.history[0].votes.length, 2);
});

test('win conditions require two heists AND a surviving Snake after the final vote', () => {
  const g = fixture();
  assert.equal(winner(g.players, 2, 2), null);
  assert.equal(winner(g.players, 2, 3, false), null);
  assert.equal(winner(g.players, 2, 3).team, 'Snakes');
  assert.equal(winner(g.players, 0, 2).team, 'Loyals');
  g.players[0].active = false; assert.equal(winner(g.players, 2, 3).team, 'Snakes');
  g.players[1].active = false; assert.equal(winner(g.players, 2, 1).team, 'Loyals');
});

test('seeded episodes at different bot skills finish, remain finite, respect one heist/act, and reach both outcomes', () => {
  const outcomes = new Set();
  for (let seed = 1; seed <= 35; seed++) {
    const g = new Episode({ seed, mode: 'watch', settings: { botSkill: seed % 2 ? 0 : 75 } }); g.start(); g.tick(350);
    assert.equal(g.phase, 'finale', `seed ${seed}`); outcomes.add(g.outcome.team);
    assert.ok(g.history.length >= 1 && g.history.length <= 3);
    assert.ok(g.history.every(h => h.heists <= 1));
    for (const h of g.history) {
      assert.ok(h.stations.every(s => s.ids.length === 2), `seed ${seed}: two operators per lift`);
      assert.equal(!!h.spotter, h.cast % 2 === 1, `seed ${seed} act ${h.act}: a spotter exactly when the cast is odd`);
      if (h.spotter) assert.ok(h.stations.every(s => !s.ids.includes(h.spotter.id)));
    }
    assert.ok(g.stations.every(s => [...s.h, ...s.v, s.x].every(Number.isFinite)));
    assert.equal(g.heists, g.history.reduce((sum, h) => sum + h.heists, 0));
  }
  assert.deepEqual([...outcomes].sort(), ['Loyals', 'Snakes']);
});

test('frame size does not change fixed-step physics or seed determinism', () => {
  const a = fixture(), b = fixture(); a.pressPull(0); b.pressPull(0);
  for (let i = 0; i < 120; i++) a.tick(1 / 120);
  for (let i = 0; i < 30; i++) b.tick(1 / 30);
  for (let i = 0; i < 2; i++) assert.ok(Math.abs(a.stations[0].h[i] - b.stations[0].h[i]) < 1e-9);
  assert.ok(Math.abs(a.stations[0].x - b.stations[0].x) < 1e-9);
});

test('the 45-second challenge opens voting immediately with one 35-second timer', () => {
  const g=fixture();
  g.stations[0].state='reload'; g.stations[0].reloadAt=1000;
  g.tick(44.99); assert.equal(g.phase,'challenge');
  g.tick(.02); assert.equal(g.phase,'vote'); assert.ok(g.phaseTime<.02);
  assert.equal(require('../engine.js').DURATIONS.vote,35);
  assert.equal(g.history[0].stations[0].cards.length,3);
  assert.equal(g.castVote(0,1),true);
  g.tick(34.9); assert.equal(g.phase,'vote');
  g.tick(.1); assert.equal(g.phase,'result'); assert.equal(g.lastVote.removed,1);
});

test('live votes publish each accepted choice and count immediately and reset for the runoff', () => {
  const g=fixture(); g.finishChallenge();
  assert.deepEqual(Object.values(g.liveVotes().totals),Array(8).fill(0));
  assert.equal(g.castVote(0,0),false); assert.deepEqual(g.liveVotes().choices,{});
  assert.equal(g.castVote(0,1),true); assert.equal(g.liveVotes().totals[1],1);
  assert.deepEqual(g.liveVotes().choices,{0:1});
  assert.equal(g.castVote(0,2),true); assert.equal(g.liveVotes().totals[2],1); assert.equal(g.liveVotes().totals[1],0); g.castVote(0,1);
  g.castVote(1,2); g.castVote(2,null);
  const live=g.liveVotes(); assert.deepEqual(live.skipped,[2]); assert.equal(live.totals[2],1);
  assert.doesNotMatch(JSON.stringify(live),/role|Snake|Loyal|removed|confidence/);
  g.finishVote(); assert.equal(g.phase,'runoff');
  assert.deepEqual(g.lastVote.totals,live.totals);
  assert.deepEqual(g.liveVotes().choices,{}); assert.deepEqual(g.liveVotes().skipped,[]);
  assert.deepEqual(Object.values(g.liveVotes().totals),Array(8).fill(0));
  assert.equal(g.castVote(3,4),false); assert.equal(g.castVote(3,1),true);
  assert.deepEqual(g.liveVotes().choices,{3:1});
});

test('an already-decided episode still ends without offering a meaningless vote', () => {
  const g=fixture(); g.act=2; g.heists=0; g.finishChallenge();
  assert.equal(g.outcome.team,'Loyals'); assert.equal(g.phase,'finale');
});

test('early finish exposes only completed public observations and waits for the last lift', () => {
  const g=fixture(); g.stations.push(makeStation([2,3],1,rng(2)));
  g.endStation(g.stations[0], 'delivered'); g.privateEvent(g.stations[0], 'rig', 'SECRET');
  g.stations[1].state='reload'; g.stations[1].reloadAt=1000; g.tick(.1);
  assert.equal(g.phase,'challenge'); assert.equal(g.castVote(0,1),false);
  const review=g.reviewSnapshot(); assert.equal(review.stations[0].ready,true);
  assert.equal(review.stations[0].cards[0].state,'delivery');
  assert.equal(review.stations[1].ready,false); assert.equal(review.stations[1].cards,null);
  assert.doesNotMatch(JSON.stringify(review), /SECRET|heists|events|role|armed/);
  assert.equal(g.history.length,0);
  g.endStation(g.stations[1], 'lava'); g.tick(.01);
  assert.equal(g.phase,'vote'); assert.ok(g.phaseTime<.01); assert.equal(g.history.length,1);
});
test('votes can change, skip and return; certainty resets on a new target and never adds weight', () => {
  const g=fixture(); g.finishChallenge();
  assert.equal(g.setCertain(0,true),false); g.castVote(0,1);
  assert.equal(g.confidences[0],'Hunch'); g.setCertain(0,true);
  assert.deepEqual(g.liveVotes().certain,[0]); assert.equal(g.liveVotes().totals[1],1);
  g.castVote(0,1); assert.equal(g.confidences[0],'Certain'); assert.equal(g.liveVotes().totals[1],1);
  g.castVote(0,2); assert.equal(g.confidences[0],'Hunch'); assert.deepEqual(g.liveVotes().certain,[]);
  assert.equal(g.liveVotes().totals[1],0); assert.equal(g.liveVotes().totals[2],1);
  g.castVote(0,null); assert.deepEqual(g.liveVotes().leaders,[]); assert.equal(g.setCertain(0,true),false);
  g.castVote(0,3); g.castVote(1,2); assert.deepEqual(g.liveVotes().leaders,[2,3]);
  g.castVote(1,3); assert.deepEqual(g.liveVotes().leaders,[3]);
  g.phaseTime=35; assert.equal(g.castVote(0,2),false); assert.equal(g.setCertain(0,true),false);
  g.finishVote(); assert.equal(g.lastVote.removed,3); assert.equal(g.lastVote.totals[3],2);
  assert.equal(g.castVote(0,2),false);
});

test('locking freezes the choice and certainty; the last active lock resolves immediately', () => {
  const g=fixture(); g.finishChallenge(); assert.equal(g.lockVote(0),false);
  g.castVote(0,1);g.setCertain(0,true);assert.equal(g.lockVote(0),true);
  assert.equal(g.castVote(0,2),false); assert.equal(g.castVote(0,null),false);assert.equal(g.setCertain(0,false),false);
  for(let id=1;id<7;id++){g.castVote(id,id===1?2:1);g.lockVote(id);}
  assert.equal(g.phase,'vote');assert.equal(g.locked.size,7);assert.equal(g.phaseTime,0);
  g.castVote(7,1);g.lockVote(7);assert.equal(g.phase,'result');assert.equal(g.lastVote.removed,1);
});
test('all active locks can advance a runoff; removed contestants never hold the clock', () => {
  const g=fixture();g.players[7].active=false;g.finishChallenge();
  for(let id=0;id<7;id++){g.castVote(id,null);g.lockVote(id);}
  assert.equal(g.phase,'runoff');assert.equal(g.locked.size,0);assert.equal(g.voted.size,0);
  assert.equal(g.lockVote(7),false);
  for(let id=0;id<7;id++){g.castVote(id,id===1?null:1);g.lockVote(id);}
  assert.equal(g.phase,'result');assert.equal(g.lastVote.removed,1);
});

test('freezing a phase timer keeps physics, bot reactions and elapsed simulation time running', () => {
  const a=fixture(), b=fixture();
  for(const g of [a,b]) { g.players[1].bot=true; g.pressPull(0); }
  a.setTimerPaused('phase',true); a.tick(1); b.tick(1);
  assert.equal(a.timerClock(),0); assert.ok(a.phaseTime>.99); assert.ok(a.time>.99);
  assert.deepEqual(a.stations[0].h,b.stations[0].h);assert.deepEqual(a.stations[0].held,b.stations[0].held);
  assert.ok(a.stations[0].h[0]>0);assert.ok(a.players[1].nextThink>0);
  a.setTimerPaused('phase',false);a.tick(.25);assert.ok(Math.abs(a.timerClock()-.25)<1e-8);
});
test('frozen phase clocks hold casting, completed lifts and reveals, then resume without a jump', () => {
  const g=new Episode({seed:11});g.start();g.tick(3);g.setTimerPaused('phase',true);g.tick(60);
  assert.equal(g.phase,'casting');assert.ok(Math.abs(g.timerClock()-3)<1e-8);
  g.setTimerPaused('phase',false);g.tick(6.9);assert.equal(g.phase,'casting');g.tick(.2);assert.equal(g.phase,'challenge');
  g.setTimerPaused('phase',true);for(const s of g.stations)g.endStation(s,'delivered');g.tick(60);
  assert.equal(g.phase,'challenge');assert.equal(g.history.length,0);
  g.setTimerPaused('phase',false);g.tick(.01);assert.equal(g.phase,'vote');
  g.castVote(0,1);g.finishVote();g.setTimerPaused('phase',true);g.tick(20);
  assert.equal(g.phase,'result');assert.equal(g.timerClock(),0);
  g.setTimerPaused('phase',false);g.tick(5.01);assert.notEqual(g.phase,'result');
});
test('bots can vote and lock beyond 35 seconds while the voting timer alone is frozen', () => {
  const g=fixture();g.players.forEach(p=>p.bot=true);g.finishChallenge();g.setTimerPaused('phase',true);g.tick(50);
  assert.equal(g.phase,'vote');assert.equal(g.timerClock(),0);assert.equal(g.voted.size,8);assert.equal(g.locked.size,8);
  assert.equal(g.history[0].votes.length,0);g.setTimerPaused('phase',false);g.tick(.01);
  assert.ok(['result','runoff'].includes(g.phase));assert.equal(g.history[0].votes.length,1);
  const human=fixture();human.finishChallenge();human.setTimerPaused('phase',true);human.tick(60);
  assert.equal(human.castVote(0,1),true);assert.equal(human.castVote(0,2),true);assert.equal(human.setCertain(0,true),true);assert.equal(human.lockVote(0),true);
});
test('Catch can freeze at a valid tap position while another lift keeps moving', () => {
  const g=fixture(),s=g.stations[0];g.stations.push(makeStation([2,3],1,rng(2)));
  g.fault(s);g.tick(1);g.setTimerPaused('catch',true);const clock=g.timerClock('catch'),h=g.stations[1].h[0];
  g.tick(2);assert.equal(g.timerClock('catch'),clock);assert.equal(s.state,'catch');assert.notEqual(g.stations[1].h[0],h);
  assert.equal(g.pressCatch(0,0),'saved');
  const miss=fixture(),m=miss.stations[0];miss.fault(m);miss.tick(.5);miss.setTimerPaused('catch',true);miss.tick(5);
  assert.equal(m.state,'catch');miss.setTimerPaused('catch',false);miss.tick(2.51);assert.equal(m.state,'reload');
});
test('Rig hold and burst timers freeze independently without stopping cable physics', () => {
  const g=fixture(),s=g.stations[0];g.settings.rigHold=.5;g.pressRig(0);g.tick(.2);
  g.setTimerPaused('rig',true);const height=s.h[0];g.tick(.3);assert.equal(g.attempt.spent,false);assert.notEqual(s.h[0],height);
  g.setTimerPaused('rig',false);g.tick(.31);assert.equal(g.attempt.spent,true);g.releaseRig(0);
  const remaining=s.burstUntil-g.timerClock('rig');g.setTimerPaused('rig',true);g.tick(.1);
  assert.ok(Math.abs(s.burstUntil-g.timerClock('rig')-remaining)<1e-8);
});
test('a frozen Rig clock also holds the spotter\u2019s arm from the rescue area', () => {
  const g=spotterFixture(),s=g.stations[0],p=g.players[2];g.players[0].pulling=true;g.players[1].pulling=true;
  Object.assign(p,rescueArea(0));assert.equal(g.pressRig(2),true);g.tick(.5);
  g.setTimerPaused('rig',true);const height=s.h[0];g.tick(2);
  assert.equal(g.attempt.spent,false,'the hold does not complete while Rig is frozen');assert.equal(g.attempt.reserved,2);assert.notEqual(s.h[0],height,'cables keep moving');
  g.setTimerPaused('rig',false);g.tick(1.01);assert.equal(g.attempt.spent,true);assert.equal(s.armedBy,2);assert.equal(s.burstUntil,0,'still no burst');
});
test('reload and post-Catch reset clocks resume from where they stopped', () => {
  const g=fixture(),s=g.stations[0];g.fault(s);g.lose(s);g.tick(1);g.setTimerPaused('reload',true);g.tick(5);
  assert.equal(s.state,'reload');assert.ok(Math.abs(s.reloadAt-g.timerClock('reload')-2)<1e-8);
  g.setTimerPaused('reload',false);g.tick(2.01);assert.equal(s.state,'lifting');
  const save=fixture(),lift=save.stations[0];save.fault(lift);save.tick(1);save.pressCatch(0,0);save.setTimerPaused('reload',true);
  const heights=[...lift.h];save.tick(2);assert.deepEqual(lift.h,heights);
  save.setTimerPaused('reload',false);save.tick(.6);assert.notDeepEqual(lift.h,heights);
});
test('timer holds remain independent across phases and a new episode starts with running clocks', () => {
  const g=fixture();g.setTimerPaused('phase',true);g.setTimerPaused('catch',true);g.tick(1);
  assert.equal(g.timerClock(),0);assert.equal(g.timerClock('catch'),0);assert.ok(g.timerClock('rig')>.99);
  g.beginVote();g.tick(2);assert.equal(g.timerClock(),0);assert.equal(g.timerClock('catch'),0);
  assert.equal(g.setTimerPaused('unknown',true),false);assert.equal(g.setTimerPaused('phase','yes'),false);
  assert.ok(Object.values(new Episode().timers).every(t=>!t.paused));
});
