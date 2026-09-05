/* global SnakeRules */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const destinations={casting:{x:50,y:24},practice:{x:78,y:66},dressing:{x:20,y:66},backstage:{x:50,y:77}};
  let s, ledger, last=performance.now();const movement=new Set();
  function reset(){
    s={mode:'lobby',x:50,y:78,path:[],activity:'guide',queued:false,queueTime:0,queueDelay:12,ready:false,practice:0,pulling:false,practiced:false,color:'#087d80',episode:1,old:[],resolveId:null};
    ledger=new SnakeRules.RewardLedger();movement.clear();$('resolveStatus').textContent='';$('practiceStatus').textContent='Hold Pull to lift the practice capsule to the line.';$('practicePrize').setAttribute('transform','');render();
  }
  function queue(){s.queued=true;s.ready=false;s.queueTime=0;s.queueDelay=+$('delay').value;render();}
  function near(){return Object.entries(destinations).filter(([place])=>place!=='backstage'||s.mode==='backstage').find(([,p])=>Math.hypot(p.x-s.x,p.y-s.y)<15)?.[0];}
  function activity(place){
    s.activity=place;s.pulling=false;
    if(place==='casting')$('queuePanel').scrollIntoView({block:'nearest'});
    if(place==='backstage')$('backstagePanel').scrollIntoView({block:'nearest'});
    render();
    if(['practice','dressing'].includes(place) && matchMedia('(max-width:760px)').matches) $('activityPanel').scrollIntoView({block:'start'});
  }
  function walk(place){
    // A small waypoint ring routes taps around the decorative pool.
    const p=destinations[place],ring=[{x:20,y:24},{x:50,y:24},{x:78,y:24},{x:78,y:66},{x:78,y:78},{x:50,y:78},{x:20,y:78},{x:20,y:66}];
    const closest=q=>ring.reduce((best,v,i)=>Math.hypot(v.x-q.x,v.y-q.y)<Math.hypot(ring[best].x-q.x,ring[best].y-q.y)?i:best,0);
    const from=closest(s),to=closest(p),forward=(to-from+ring.length)%ring.length,back=(from-to+ring.length)%ring.length,step=forward<=back?1:-1;
    s.path=[ring[from]];let i=from;while(i!==to){i=(i+step+ring.length)%ring.length;s.path.push(ring[i]);}s.path.push({...p,place});
  }
  document.querySelectorAll('[data-place]').forEach(b=>b.onclick=()=>walk(b.dataset.place));
  $('interact').onclick=()=>{const place=near();if(place)activity(place);};
  $('play').onclick=queue;$('cancelQueue').onclick=()=>{s.queued=false;s.ready=false;s.queueTime=0;render();};
  $('join').onclick=()=>{s.queued=false;s.ready=false;s.mode='onstage';s.activity='guide';s.path=[];render();};
  function remove(){
    if(s.mode==='backstage')return;
    const id='episode-'+s.episode++;
    ledger.award(id,'participation',20,10);s.old.push({id,resolved:false,outcome:null});s.resolveId=id;
    s.mode='backstage';s.queued=false;s.ready=false;s.activity='backstage';s.path=[];s.x=50;s.y=78;
    $('resolveStatus').textContent='Old episode is still running. Requeue now to test a delayed team reward.';
    render();
  }
  $('remove').onclick=remove;
  $('newEpisode').onclick=()=>{s.mode='lobby';s.activity='guide';s.path=[];s.x=50;s.y=78;queue();};
  $('backstagePractice').onclick=()=>activity('practice');$('backstageDress').onclick=()=>activity('dressing');
  $('resolve').onclick=()=>{
    // Settle the oldest pending episode, then allow retrying the latest settlement.
    const old=s.old.find(e=>!e.resolved)||s.old.find(e=>e.id===s.resolveId);if(!old)return;
    const first=!old.resolved;if(first){old.outcome=$('oldOutcome').value;old.resolved=true;s.resolveId=old.id;}
    const added=old.outcome==='Loyals'&&ledger.award(old.id,'team-result',10,5);
    $('resolveStatus').textContent=first?(added?`${old.id}: team bonus delivered, even if you left.`:`${old.id}: ${old.outcome==='incomplete'?'incomplete episode':'team loss'}; participation remains recorded.`):'Delivery retried. No duplicate credit was issued.';
    render();
  };
  function pull(){if(s.activity==='practice'&&!s.practiced)s.pulling=true;}
  function release(){s.pulling=false;}
  $('practicePull').addEventListener('pointerdown',e=>{e.preventDefault();$('practicePull').setPointerCapture(e.pointerId);pull();});
  ['pointerup','pointercancel','lostpointercapture'].forEach(event=>$('practicePull').addEventListener(event,release));
  $('practicePull').addEventListener('keydown',e=>{if(e.code==='Enter'){e.preventDefault();pull();}});
  $('practicePull').addEventListener('keyup',e=>{if(e.code==='Enter')release();});
  $('practicePull').addEventListener('blur',release);
  $('practiceAgain').onclick=()=>{s.practice=0;s.practiced=false;render();};
  document.querySelectorAll('[data-color]').forEach(b=>b.onclick=()=>{s.color=b.dataset.color;render();});
  const keys={ArrowUp:'up',KeyW:'up',ArrowDown:'down',KeyS:'down',ArrowLeft:'left',KeyA:'left',ArrowRight:'right',KeyD:'right'};
  document.addEventListener('keydown',e=>{
    if(/INPUT|SELECT|TEXTAREA/.test(e.target.tagName))return;
    if(keys[e.code]){e.preventDefault();movement.add(keys[e.code]);s.path=[];}
    if(e.code==='Space'&&s.activity==='practice'&&(e.target===document.body||e.target===$('practicePull'))){e.preventDefault();pull();}
    if(e.code==='Enter'&&e.target.tagName!=='BUTTON'){const p=near();if(p)activity(p);}
  });
  document.addEventListener('keyup',e=>{if(keys[e.code])movement.delete(keys[e.code]);if(e.code==='Space')release();});
  document.querySelectorAll('[data-move]').forEach(b=>{b.addEventListener('pointerdown',e=>{e.preventDefault();b.setPointerCapture(e.pointerId);movement.add(b.dataset.move);s.path=[];});['pointerup','pointercancel','lostpointercapture'].forEach(event=>b.addEventListener(event,()=>movement.delete(b.dataset.move)));});
  window.addEventListener('blur',()=>{movement.clear();release();});document.addEventListener('visibilitychange',()=>{if(document.hidden){movement.clear();release();}});
  $('delay').oninput=()=>$('delayValue').textContent=$('delay').value+' s';$('reset').onclick=reset;
  function renderQueue(){
    const count=s.ready?8:s.queued?Math.min(7,1+Math.floor(s.queueTime/s.queueDelay*7)):0;
    $('castSlots').innerHTML=Array.from({length:8},(_,i)=>`<span class="badge" style="opacity:${i<count?1:.3}">${i<count?String(i+1).padStart(2,'0'):'·'}</span>`).join('');
    $('queueTime').textContent=s.ready?'Cast ready':s.queued?Math.floor(s.queueTime)+' s waiting':'Not queued';
    $('queueStatus').textContent=s.ready?'Eight simulated slots are filled. Your next episode starts with a fresh cast.':s.queued?`Finding a cast · ${count}/8 slots filled. Practice and dressing room stay available.`:'Find seven other contestants. You can keep practicing or changing your look while waiting.';
    $('play').hidden=s.queued||s.ready;$('cancelQueue').hidden=!s.queued&&!s.ready;$('join').hidden=!s.ready;
  }
  function render(){
    $('locationTitle').textContent=s.mode==='backstage'?'The show goes on.':s.mode==='onstage'?'You’re in the cast.':'Welcome to the villa.';
    $('locationTag').textContent={lobby:'Lobby',onstage:'Casting rehearsal',backstage:'Backstage'}[s.mode];
    $('backstagePanel').hidden=s.mode!=='backstage';$('castingPanel').hidden=s.mode!=='onstage';$('queuePanel').hidden=s.mode!=='lobby';
    document.querySelector('[data-place=backstage]').disabled=s.mode!=='backstage';
    $('remove').disabled=s.mode==='backstage';$('resolve').disabled=s.old.length===0;
    const names={guide:['Lobby guide','Make yourself at home.','Walk to a station to try it. Practice teaches a short interaction; the dressing room previews a cosmetic look.'],casting:['Casting','Ready for your entrance?','Use Play to find an episode. You can explore while the queue runs.'],practice:['Practice station','One lever. One action.','Hold to raise your end. Release to let the weight take over.'],dressing:['Dressing room','A look they’ll remember.','Choose a color for your next entrance. Your number stays readable.'],backstage:['Backstage lounge','Stay for the reveal?','Public receipts are below the map. Practice and dressing room are still available.']};
    const copy=names[s.activity];$('activityTag').textContent=copy[0];$('activityTitle').textContent=copy[1];$('activityDescription').textContent=copy[2];
    $('practice').hidden=s.activity!=='practice';$('dressing').hidden=s.activity!=='dressing';
    $('practicePull').disabled=s.practiced;$('practiceAgain').hidden=!s.practiced;
    $('practiceStatus').textContent=s.practiced?'Delivered! You learned the lever. A real lift adds a partner and a moving load.':'Hold Pull to lift the practice capsule to the line.';
    $('figure').style.background=s.color;$('avatar').style.background=s.color;
    document.querySelectorAll('[data-color]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.color===s.color)));
    $('outfitStatus').textContent=({'#087d80':'Teal','#c44933':'Coral','#694aca':'Violet'}[s.color])+' look equipped for your next entrance.';
    const totals=ledger.totals();$('fame').textContent=totals.fame;$('credits').textContent=totals.credits;
    $('pending').textContent=s.old.some(e=>!e.resolved)?s.old.filter(e=>!e.resolved).length+' old episode result(s) pending. Leaving does not cancel the reward.':'No pending episode rewards.';
    $('rewardLog').replaceChildren(...[...ledger.entries.values()].map(e=>{const li=document.createElement('li');li.textContent=`${e.episode} · ${e.kind}: +${e.fame} Fame / +${e.credits} Credits`;return li;}));
    const old=s.old.at(-1);
    $('publicOutcome').textContent=old?.resolved?`${old.id}: ${old.outcome==='incomplete'?'Episode incomplete; participation preserved.':old.outcome+' win. The episode has resolved.'}`:'Act 1 complete · Heists: 1/2 · Maya was removed and revealed as Loyal.';
    const cards=SnakeRules.makeAct([0,1,2,3,4,5,6,7],1).publicCards;
    const receiptHTML=e=>`<article class="receipt"><span class="small">Act 1 · ${e.place}</span><p>${e.text}</p></article>`;
    $('backstageReceipts').innerHTML=cards.slice(0,3).map(receiptHTML).join('')+'<details><summary>Other stations’ public receipts</summary>'+cards.slice(3).map(receiptHTML).join('')+'</details>';
    renderQueue();renderMap();
  }
  function renderMap(){
    $('avatar').style.left=s.x+'%';$('avatar').style.top=s.y+'%';const place=near();
    $('interact').disabled=!place;$('interact').textContent=place?'Open '+{casting:'casting',practice:'practice',dressing:'dressing room',backstage:'backstage'}[place]:'Walk to a station';
    $('mapStatus').textContent=s.path.length?'Walking to the station…':place?'You’re near '+{casting:'casting',practice:'the practice station',dressing:'the dressing room',backstage:'backstage'}[place]+'. Open it to interact.':'The pool is in the middle; take a walk around it.';
  }
  function moveTo(x,y){x=Math.max(5,Math.min(95,x));y=Math.max(5,Math.min(95,y));const inPool=(x-51)**2/19**2+(y-52.5)**2/21**2<1;if(!inPool){s.x=x;s.y=y;}}
  function frame(now){const dt=Math.min(.05,(now-last)/1000);last=now;
    if(!document.hidden){
      if(s.queued&&!s.ready){s.queueTime+=dt;if(s.queueTime>=s.queueDelay)s.ready=true;renderQueue();}
      const speed=32*dt;
      if(movement.size){const dx=Number(movement.has('right'))-Number(movement.has('left')),dy=Number(movement.has('down'))-Number(movement.has('up'));moveTo(s.x+dx*speed,s.y);moveTo(s.x,s.y+dy*speed);renderMap();}
      else if(s.path.length){const p=s.path[0],distance=Math.hypot(p.x-s.x,p.y-s.y);if(distance<=speed){s.x=p.x;s.y=p.y;s.path.shift();if(p.place)activity(p.place);}else{moveTo(s.x+(p.x-s.x)/distance*speed,s.y+(p.y-s.y)/distance*speed);}renderMap();}
      if(s.activity==='practice'&&!s.practiced){s.practice=Math.max(0,Math.min(1,s.practice+(s.pulling?.48:-.24)*dt));$('practicePrize').setAttribute('transform',`translate(0,${-69*s.practice})`);$('practicePull').classList.toggle('holding',s.pulling);if(s.practice>=1){s.practiced=true;s.pulling=false;render();}}
    }
    requestAnimationFrame(frame);
  }
  reset();requestAnimationFrame(frame);
})();
