const test = require('node:test');
const assert = require('node:assert/strict');
const { Episode } = require('../engine.js');
const View = require('../vote-view.js');
function sample() { const g = new Episode({ seed:11, mode:'watch' }); g.start(); g.nextPhase(); while(g.phase==='challenge') g.tick(1/120); return g; }
test('illustrated lift summaries do not depend on hidden roles or private events', () => {
  const g=sample(), record=g.history[0];
  for(const s of record.stations) {
    const before=View.stationCard(s,g.players,0)+View.detail(s,g.players);
    const players=g.players.map(p=>({...p,role:p.role==='Snake'?'Loyal':'Snake'}));
    const station={...s,events:[{kind:'rig',text:'SECRET RIG BY SOMEONE',private:true}]};
    assert.equal(View.stationCard(station,players,0)+View.detail(station,players),before);
    assert.doesNotMatch(before,/SECRET|diverter|motor force|Snake|Loyal/);
    assert.equal(View.facts(s,players).length,3);
    for(const card of s.cards) assert.ok(View.detail(s,players).includes(card.text.replace(/&/g,'&amp;').replace(/'/g,'&#39;')));
  }
});
test('delivery, lava and timeout have distinct pictures; losses never become individual heist claims', () => {
  const g=sample(), s=structuredClone(g.history[0].stations[0]);
  const pictures=new Set();
  for(const [state,failed,label] of [['delivery',false,'Delivered!'],['lava',true,'Into the lava'],['timeout',true,'Time ran out']]) {
    s.cards[0]={...s.cards[0],state,failed,losses:2};
    const f=View.facts(s,g.players)[0]; assert.equal(f.label,label); pictures.add(f.image);
    const card=View.stationCard(s,g.players,0); assert.match(card,/2 lost/); assert.doesNotMatch(card,/stolen|heist|Snake/);
  }
  assert.equal(pictures.size,3);
});
test('pictures distinguish high Pull, low idle, high release, and lack of a sustained interval', () => {
  const g=sample(), s=structuredClone(g.history[0].stations[0]), pictures=new Set();
  for(const type of ['high-hold','low-idle','high-release']) {
    s.cards[1]={...s.cards[1],type,seconds:3}; pictures.add(View.facts(s,g.players)[1].image);
  }
  assert.equal(pictures.size,3);
  s.cards[1].seconds=.1;
  assert.equal(View.facts(s,g.players)[1].label,'No long hold or pause');
  s.ids=[0,1,2]; s.cards[1].seconds=3;
  assert.notEqual(View.facts(s,g.players)[1].image,View.facts({...s,ids:[0,1]},g.players)[1].image);
});
test('the last catch distinguishes saved, missed and no attempt; reveals name only the voted-out role', () => {
  const g=sample(), s=structuredClone(g.history[0].stations[0]), pictures=new Set();
  for(const [ids,saved,label] of [[[1],true,'Leo caught it!'],[[1],false,'Leo missed'],[[],false,'No catch tried']]) {
    s.cards[2]={...s.cards[2],ids,saved}; const f=View.facts(s,g.players)[2]; assert.equal(f.label,label); pictures.add(f.image);
  }
  assert.equal(pictures.size,3);
  for(const role of ['Loyal','Snake']) {
    const p=g.players.find(p=>p.role===role), other=g.players.find(q=>q.role!==role), vote={removed:p.id,totals:{[p.id]:4,[other.id]:2},abstentions:1}, html=View.result(vote,g.players);
    assert.match(html,new RegExp(` ${role}</span>`)); assert.match(html,/4 votes/); assert.match(html,/1 skipped/);
    assert.equal((html.match(new RegExp(role==='Snake'?'class="snake-eyes"':'class="loyal-prize-pin"','g'))||[]).length,2);
    assert.doesNotMatch(html,role==='Snake'?/loyal-prize-pin/:/snake-eyes/);
    const changed=g.players.map(q=>q.id===p.id?q:{...q,role:q.role==='Snake'?'Loyal':'Snake'});
    assert.equal(View.result(vote,changed),html);
  }
  const tie=View.result({removed:null,totals:{1:2,2:2},abstentions:4},g.players);
  assert.match(tie,/Everyone stays/); assert.doesNotMatch(tie,/role-stamp|Snake|Loyal|snake-eyes|loyal-prize-pin/);
});

test('all eight seats remain visible, while self, eliminated and non-tied candidates are unvotable', () => {
  const g=sample(); g.mode='play'; g.players[0].bot=false;
  let live=g.liveVotes(), states=g.players.map(p=>View.candidateState(g,p,live));
  assert.equal(states.length,8); assert.equal(states[0].tag,'YOU'); assert.equal(states[0].disabled,true);
  assert.equal(states.slice(1).every(s=>!s.disabled),true);
  g.castVote(0,7); live=g.liveVotes();
  states=g.players.map(p=>View.candidateState(g,p,live));
  assert.equal(states[0].target,7); assert.equal(states[7].count,1); assert.equal(states.slice(1).every(s=>!s.disabled),true);
  g.lockVote(0); assert.equal(g.players.every(p=>View.candidateState(g,p,g.liveVotes()).disabled),true);
  g.players[6].active=false; g.beginVote(true,[1,2]);
  states=g.players.map(p=>View.candidateState(g,p,g.liveVotes()));
  assert.equal(states.length,8); assert.equal(states[6].tag,'OUT');
  assert.equal(states[3].tag,'NOT TIED'); assert.equal(states[3].disabled,true);
  assert.equal(states[1].disabled,false); assert.equal(states[2].disabled,false);
  g.castVote(3,1); assert.equal(View.candidateState(g,g.players[3],g.liveVotes()).target,1);
  g.mode='watch'; assert.equal(g.players.every(p=>View.candidateState(g,p,g.liveVotes()).disabled),true);
});

test('pointing fingers track actual target positions in every direction and after resizing', () => {
  const from={left:100,top:100,width:130,height:87};
  for(const [dx,dy] of [[200,0],[-200,0],[0,200],[0,-200],[200,200],[-200,-200]]) {
    const to={...from,left:from.left+dx,top:from.top+dy};
    const pose=View.pointingPose(from,to), radians=pose.angle*Math.PI/180;
    if(dx) assert.equal(Math.sign(Math.cos(radians)),Math.sign(dx));
    if(dy) assert.equal(Math.sign(Math.sin(radians)),Math.sign(dy));
    const scaled=r=>Object.fromEntries(Object.entries(r).map(([k,v])=>[k,v*2]));
    assert.ok(Math.abs(View.pointingPose(scaled(from),scaled(to)).angle-pose.angle)<1e-10);
  }
  assert.match(View.votingPortrait(sample().players[0]),/class="pointing-arm" hidden/);
});

test('the leader costume depends only on positive public votes, including ties', () => {
  const g=sample(); g.beginVote(); g.castVote(0,1); g.castVote(1,2);
  const leaders=()=>g.players.filter(p=>View.candidateState(g,p,g.liveVotes()).leader).map(p=>p.id);
  assert.deepEqual(leaders(),[1,2]); g.castVote(1,3); assert.deepEqual(leaders(),[1,3]);
  g.players.forEach(p=>p.role=p.role==='Snake'?'Loyal':'Snake'); assert.deepEqual(leaders(),[1,3]);
  g.beginVote(); assert.deepEqual(leaders(),[]);
  assert.match(View.waitingStation(g.reviewSnapshot().stations[0],g.players),/Still playing/);
});

test('role cues are opt-in and never appear on unrevealed faces or evidence', () => {
  const g=sample(),p=g.players[0],snake={...p,role:'Snake'},loyal={...p,role:'Loyal'};
  assert.match(View.rolePortrait(snake),/class="snake-eyes"/);assert.doesNotMatch(View.rolePortrait(snake),/loyal-prize-pin/);
  assert.match(View.rolePortrait(loyal),/class="loyal-prize-pin"/);assert.doesNotMatch(View.rolePortrait(loyal),/snake-eyes/);
  assert.equal(View.portrait(snake),View.portrait(loyal));assert.equal(View.votingPortrait(snake),View.votingPortrait(loyal));
  for(const html of [View.portrait(snake),View.votingPortrait(snake),...g.history[0].stations.map(s=>View.stationCard(s,g.players,0))]) assert.doesNotMatch(html,/snake-eyes|loyal-prize-pin/);
});
