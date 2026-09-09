const test = require('node:test');
const assert = require('node:assert/strict');
const { CAST, role, tally, winner, groups, chooseSpotter, makeAct, Rescue, RewardLedger } = require('../rules.js');
const active = CAST.map((_,i)=>i);

test('cast has eight members and two Snakes; every lift pairs exactly two operators', () => {
  assert.equal(active.filter(id=>role(id)==='Snake').length,2);
  for(const n of [4,6,8]) for(let act=1;act<=3;act++) {
    const pairs=groups(active.slice(0,n),act);
    assert.deepEqual(pairs.flat().sort(),active.slice(0,n));
    assert.ok(pairs.every(p=>p.length===2));
  }
  assert.notDeepEqual(groups(active,1),groups(active,2));
  assert.throws(()=>groups(active.slice(0,7),1),/spotter/);
});
test('an odd cast names the removed contestant’s last partner as spotter; a deadlock keeps the spotter', () => {
  const partners={0:1,1:0,2:3,3:2,4:5,5:4,6:7,7:6};
  assert.equal(chooseSpotter(active,null,partners,null),null);
  assert.equal(chooseSpotter(active.filter(id=>id!==5),5,partners,null),4);
  assert.equal(chooseSpotter(active.filter(id=>id!==5),null,partners,4),4);
  assert.equal(chooseSpotter(active.filter(id=>id!==5&&id!==4),4,partners,4),null);
  const one=makeAct(active,1), seven=active.filter(id=>id!==5);
  const two=makeAct(seven,2,true,{removed:5,partners:one.partners});
  assert.equal(two.spotter,one.partners[5]);
  assert.ok(two.stations.every(ids=>ids.length===2&&!ids.includes(two.spotter)));
  assert.deepEqual([...two.stations.flat(),two.spotter].sort(),seven);
  assert.equal(two.publicCards.filter(c=>c.kind==='spotter').length,1);
  assert.ok(!/(rig|diverter|snake|heist)/i.test(two.publicCards.find(c=>c.kind==='spotter').text));
  const three=makeAct(seven,3,true,{removed:null,partners:two.partners,spotter:two.spotter});
  assert.equal(three.spotter,two.spotter);
  // A Snake spotter with no Snake at a console arms a lift from the rescue area, with no motor change.
  const snakeSpots=makeAct([0,1,3,4,5,6,7],2,true,{removed:2,partners:{2:1,1:2}});
  assert.equal(snakeSpots.spotter,1); assert.equal(snakeSpots.heist,1);
  assert.match(snakeSpots.full.find(e=>e.private).text,/rescue area.*no motor changed/);
});
test('first Rig claim wins, cancellation releases it, completion consumes it; a spotter arms without a burst', () => {
  const r=new Rescue();assert.equal(r.reserve(0),false);
  assert.equal(r.reserve(1),true);assert.equal(r.reserve(2),false);
  r.tick(1);r.release(1);assert.equal(r.spent,false);
  assert.equal(r.reserve(2),true);r.tick(1.51);
  assert.equal(r.spent,true);assert.equal(r.armed,true);assert.equal(r.reserve(1),false);
  assert.equal(r.burstUntil,r.time,'Nia spots: no motor burst');
  assert.match(r.privateLog.at(-1).text,/rescue area/);
  const console=new Rescue();console.reserve(1);console.tick(1.5);assert.equal(console.burstUntil,console.time+5);
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
    assert.equal(fixture.publicCards.length,fixture.stations.length*3+(fixture.spotter===null?0:1));
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
