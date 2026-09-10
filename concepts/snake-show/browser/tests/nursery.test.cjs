const test = require('node:test');
const assert = require('node:assert/strict');
const { Episode } = require('../engine.js');
const { Collection, PALETTE, KEY, makeBaby } = require('../nursery.js');
function memory() { const data = new Map(); return { getItem: k => data.get(k) || null, setItem: (k, v) => data.set(k, v) }; }
function won(role = 'Keeper', seed = 12) {
  const g = new Episode({ seed }); g.start(); g.nextPhase(); g.players[0].role = role;
  g.pressPull(0); g.act = 2; g.completedActs = 2;
  g.outcome = { team: role === 'Keeper' ? 'Keepers' : 'Tricksters', reason: 'fixture' }; g.setPhase('finale'); return g;
}
test('every participating member of the original winning team remains entitled after removal', () => {
  const g = won(); g.players.forEach(p => g.participants.add(p.id)); g.players[0].active = false;
  for (const p of g.players) assert.equal(g.rewardEligible(p.id),p.role==='Keeper');
  const c = new Collection(memory()), b = c.award(g); assert.ok(b); assert.equal(c.state.babies.length,1);
  assert.match(b.origin,/Keeper victory/); assert.doesNotMatch(b.origin,/personally|saved|delivered/);
});
test('awards wait for the finale and exclude losses, idle participation, practice, watch and dev scenes', () => {
  for (const mutate of [g => g.phase='result', g=>g.phase='challenge', g=>g.outcome=null, g=>g.outcome.team='Tricksters', g=>g.participants.clear(), g=>g.mode='practice', g=>g.mode='watch', g=>g.study=true]) {
    const g=won(); mutate(g); const c=new Collection(memory()); assert.equal(c.award(g),null); assert.equal(c.state.babies.length,0);
  }
});
test('novice attempts, clue review and spotter activity qualify without a success quota', () => {
  const g = new Episode(); g.start(); g.nextPhase(); g.players[0].spotting=true;
  g.participate(0); g.pot=0; g.heists=0; g.outcome={team:g.players[0].role==='Keeper'?'Keepers':'Tricksters'};
  g.players[0].active=false; g.setPhase('finale'); assert.equal(g.rewardEligible(0),true);
});
test('same individual is awarded once across retries and reloads; another round can earn a same-color duplicate', () => {
  const storage=memory(), c=new Collection(storage), g=won(); const first=c.award(g);
  assert.equal(c.award(g).id,first.id); const loaded=new Collection(storage); assert.equal(loaded.award(g).id,first.id);
  const other=won(); assert.notEqual(other.roundId,g.roundId); const duplicate=loaded.award(other);
  assert.notEqual(duplicate.id,first.id); assert.equal(duplicate.variant,first.variant);
  assert.deepEqual(loaded.counts(),{individuals:2,species:1,variants:1});
});
test('team and personal performance do not change the shared provisional palette draw', () => {
  assert.equal(PALETTE.reduce((n,p)=>n+p.weight,0),100); assert.ok(new Set(PALETTE.map(p=>p.weight)).size>1);
  for(let seed=1;seed<=40;seed++) {
    const a=won('Keeper',seed), b=won('Trickster',seed); b.pot=30; b.heists=3;
    assert.equal(new Collection(memory()).award(a).variant,new Collection(memory()).award(b).variant);
  }
});
test('nicknames, favorites, one companion and ordered showcase slots persist independently of variant counts', () => {
  const storage=memory(), c=new Collection(storage), a=c.award(won()), b=c.award(won());
  c.edit(a.id,{nickname:'  Feather  ',favorite:true}); c.equip('companion',a.id); c.equip('showcase',a.id,0); c.equip('showcase',b.id,1); c.equip('showcase',a.id,2);
  const restored=new Collection(storage); assert.equal(restored.state.babies[0].nickname,'Feather'); assert.equal(restored.state.babies[0].favorite,true);
  assert.equal(restored.state.companion,a.id); assert.deepEqual(restored.state.showcase,[null,b.id,a.id]); assert.equal(restored.counts().variants,1);
  assert.equal(c.equip('companion','unknown'),false); assert.equal(c.equip('showcase',a.id,4),false);
});
test('exchanges require current unlocked individuals and both confirmations; completed exchanges are atomic and idempotent', () => {
  const storage=memory(), c=new Collection(storage), g=won(), a=c.award(g), b=c.state.botBabies[0], origin=b.origin;
  const trade={id:'one',mine:a.id,theirs:b.id,confirmed:true,botConfirmed:false};
  assert.equal(c.exchange(trade),'unconfirmed'); c.edit(a.id,{favorite:true}); trade.botConfirmed=true;
  assert.equal(c.exchange(trade),'changed'); c.edit(a.id,{favorite:false}); c.equip('companion',a.id); c.equip('showcase',a.id,1);
  assert.equal(c.exchange(trade),'complete'); const restored=new Collection(storage);
  assert.equal(restored.state.babies[0].id,b.id); assert.equal(restored.state.babies[0].origin,origin);
  assert.ok(restored.state.botBabies.some(b=>b.id===a.id)); assert.equal(restored.state.companion,null); assert.deepEqual(restored.state.showcase,[null,null,null]);
  assert.ok(restored.state.badges.includes('first')); assert.equal(restored.exchange(trade),'already');
  assert.equal(restored.award(g),null,'retry after trading away the award must never recreate it'); assert.equal(restored.counts().individuals,1);
});
test('fixed palette badge counts current variants and remains unlocked after last-copy exchange', () => {
  const c=new Collection(memory()), s=structuredClone(c.state);
  s.babies=PALETTE.map(p=>makeBaby(p.id,p.id,'Local test')); c.unlock(s); c.commit(s); c.setting('equippedBadge','palette');
  c.exchange({id:'palette-trade',mine:'pearl',theirs:'leo-0',confirmed:true,botConfirmed:true});
  assert.equal(c.counts().variants,4); assert.ok(c.state.badges.includes('palette')); assert.equal(c.state.equippedBadge,'palette');
});
test('unavailable storage stays usable with an explicit warning; malformed snapshots are preserved', () => {
  const storage=memory(); storage.setItem(KEY,'invalid'); const c=new Collection(storage); c.award(won());
  assert.equal(storage.getItem(KEY),'invalid'); assert.match(c.warning,/preserved/); assert.equal(c.state.babies.length,1);
  const unavailable=new Collection({getItem:()=>null,setItem:()=>{throw new Error('quota');}}); unavailable.award(won());
  assert.match(unavailable.warning,/only in this tab/); assert.equal(unavailable.state.babies.length,1);
});
