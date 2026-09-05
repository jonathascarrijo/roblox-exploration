const test = require('node:test');
const assert = require('node:assert/strict');
const { CAST, role, tally, winner, groups, makeAct, Rescue, RewardLedger } = require('../rules.js');
const active = CAST.map((_,i)=>i);

test('cast has eight members, two Snakes, and odd groups retain every operator', () => {
  assert.equal(active.filter(id=>role(id)==='Snake').length,2);
  for(let n=5;n<=8;n++) for(let act=1;act<=3;act++) {
    const pairs=groups(active.slice(0,n),act);
    assert.deepEqual(pairs.flat().sort(),active.slice(0,n));
    assert.equal(pairs.filter(p=>p.length===3).length,n%2);
    assert.ok(pairs.every(p=>p.length===2||p.length===3));
  }
  assert.notDeepEqual(groups(active,1),groups(active,2));
});
test('first Rig claim wins, cancellation releases it, completion consumes it', () => {
  const r=new Rescue();assert.equal(r.reserve(0),false);
  assert.equal(r.reserve(1),true);assert.equal(r.reserve(2),false);
  r.tick(1);r.release(1);assert.equal(r.spent,false);
  assert.equal(r.reserve(2),true);r.tick(1.51);
  assert.equal(r.spent,true);assert.equal(r.armed,true);assert.equal(r.reserve(1),false);
});
test('fault during unfinished Rig cancels reservation without consuming attempt', () => {
  const r=new Rescue();r.reserve(1);r.tick(1);r.fault();
  assert.equal(r.reserved,null);assert.equal(r.spent,false);assert.equal(r.armed,false);
  r.tick(.75);assert.equal(r.pressCatch(0),'saved');assert.equal(r.reserve(2),true);
});
test('a missed tap cannot veto another person’s save or be retried', () => {
  const r=new Rescue();r.reserve(1);r.tick(1.5);r.fault();
  assert.equal(r.pressCatch(0),'miss');r.releaseCatch(0);r.tick(.75);
  assert.equal(r.pressCatch(0),'ineligible');assert.equal(r.pressCatch(3),'saved');
  assert.equal(r.armed,false);assert.equal(r.spent,true);assert.equal(r.heists,0);
  assert.equal(r.pressCatch(2),'ineligible');
});
test('pre-held Catch needs a fresh press and rescue-area eligibility', () => {
  const r=new Rescue();r.pressCatch(0);r.fault();r.tick(.75);
  assert.equal(r.pressCatch(0),'held');assert.equal(r.pressCatch(3,false),'ineligible');
  r.releaseCatch(0);assert.equal(r.pressCatch(0),'saved');
});
test('both passes have the configured opportunity and the second can save', () => {
  const r=new Rescue();r.fault();r.tick(.624);assert.equal(r.inZone(),false);
  r.tick(.002);assert.equal(r.inZone(),true);r.tick(.248);assert.equal(r.inZone(),true);
  r.tick(.002);assert.equal(r.inZone(),false);r.tick(1.374);
  assert.equal(r.pressCatch(0),'saved');
});
test('burst expiry retains diversion; only armed unrecovered Catch creates a heist', () => {
  const r=new Rescue();r.reserve(1);r.tick(1.5);r.tick(6);
  assert.ok(r.time>r.burstUntil);assert.equal(r.armed,true);r.fault();r.tick(3);
  assert.equal(r.heists,1);assert.ok(!r.publicLog.some(e=>/heist/i.test(e.text)));
  r.reload();assert.equal(r.armed,false);assert.equal(r.spent,true);r.fault();r.tick(3);
  assert.equal(r.heists,1);r.end();assert.match(r.publicLog.at(-1).text,/Heists: 1\/2/);
  const innocent=new Rescue();innocent.fault();innocent.tick(3);assert.equal(innocent.heists,0);
});
test('water, delivery, and timeout defeat unresolved rigs without heists', () => {
  for(const reason of ['water','delivered','timeout']) {
    const r=new Rescue();r.reserve(1);r.tick(1.5);r.end(reason);r.end(reason);r.tick(4);
    assert.equal(r.heists,0);assert.equal(r.armed,false);assert.equal(r.phase,'ended');
  }
  const late=new Rescue();late.reserve(1);late.tick(1.5);late.fault();late.end();late.tick(3);assert.equal(late.heists,0);
});
test('a rescued rig cannot create a heist at a later fault', () => {
  const r=new Rescue();r.reserve(1);r.tick(1.5);r.fault();r.tick(.75);r.pressCatch(0);
  r.fault();r.tick(3);assert.equal(r.heists,0);assert.equal(r.spent,true);
});
test('ballots exclude self, inactive voters and targets outside a runoff', () => {
  const r=tally([0,1,2,3],{0:0,1:2,2:1,3:7,7:1},[1,2]);
  assert.deepEqual(r.totals,{1:1,2:1});assert.equal(r.abstentions,2);assert.equal(r.removed,null);
  assert.deepEqual(r.tied,[1,2]);
  const runoff=tally([0,1,2,3],{0:1,1:2,2:1,3:1},r.tied);assert.equal(runoff.removed,1);
});
test('all abstentions produce a tie, and a second tie removes nobody', () => {
  const r=tally(active,{});assert.deepEqual(r.tied,active);assert.equal(r.abstentions,8);
  assert.equal(tally(active,{},r.tied).removed,null);
});
test('winner requires both thefts and a surviving Snake, with early impossibility', () => {
  assert.equal(winner(active,2,2),null);
  assert.equal(winner(active,2,3).team,'Snakes');
  assert.equal(winner(active.filter(id=>role(id)==='Loyal'),2,2).team,'Loyals');
  assert.equal(winner(active,0,2).team,'Loyals');
  assert.equal(winner(active,1,2),null);
  assert.equal(winner(active,1,3).team,'Loyals');
  assert.equal(winner(active.filter(id=>id!==1),2,3).team,'Snakes');
});
test('fixed evidence coverage includes innocent failures and never exposes Rig', () => {
  for(let act=1;act<=3;act++){
    const fixture=makeAct(active,act,act<3);
    assert.equal(fixture.publicCards.length,fixture.stations.length*3);
    assert.ok(fixture.publicCards.every(card=>!('private' in card)));
    assert.ok(fixture.publicCards.every(card=>!/(rig|diverter|snake|heist|twice|speed)/i.test(card.text)));
    assert.equal(fixture.publicCards.filter(card=>card.kind==='outcome'&&card.text.includes('lost')).length,act<3?2:1);
    assert.equal(fixture.pot,act<3?2:3);
    if(act<3)assert.ok(fixture.full.some(e=>e.private));
  }
});
test('participation and delayed team credit are each delivered once per episode', () => {
  const l=new RewardLedger();assert.equal(l.award('old','participation',20,10),true);
  assert.equal(l.award('new','participation',20,10),true);
  assert.equal(l.award('old','team-result',10,5),true);
  assert.equal(l.award('old','team-result',10,5),false);
  assert.equal(l.award('old','participation',20,10),false);
  assert.deepEqual(l.totals(),{fame:50,credits:25});
});
