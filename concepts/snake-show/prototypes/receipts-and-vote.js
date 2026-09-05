/* global SnakeRules */
(() => {
  'use strict';
  const { CAST, role, tally, winner, makeAct } = SnakeRules;
  const $ = id => document.getElementById(id);
  const durations = { casting:10, challenge:45, evidence:10, vote:25, runoff:10, finale:20 };
  let s, last = performance.now(), receiptAct = 1, page = 0, replayIndex = 0;
  function reset() {
    s = { phase:'ready', left:10, act:1, active:CAST.map((_,i)=>i), viewer:+$('viewer').value, heists:0, pot:0, records:[], ballots:[], selected:null, submitted:undefined, runoff:null, lastTally:null, paused:false, revealed:true, finish:null, suspects:{} };
    receiptAct=1; page=0; replayIndex=0; render();
  }
  function enter(phase) { s.phase=phase; s.left=durations[phase] || 0; s.paused=false; render(); }
  function finalize(outcome) { s.finish=outcome; replayIndex=0; enter('finale'); }
  function startChallenge() {
    s.pending=makeAct(s.active,s.act,$('outcomes').value==='two' && s.act<=2);
    enter('challenge');
  }
  function finishChallenge() {
    s.records.push(s.pending); s.heists+=s.pending.heist; s.pot+=s.pending.pot;
    receiptAct=s.act; page=0;
    // Impossibility can end immediately. The third vote must still happen
    // when the Snakes have met the heist target.
    if (s.heists+(3-s.act)<2) { finalize({team:'Loyals',reason:'Two unsuccessful heist opportunities made two successes impossible.'}); return; }
    enter('evidence');
  }
  function beginVote(runoff=false) { s.selected=null; s.submitted=undefined; enter(runoff?'runoff':'vote'); }
  function scriptedBallots(candidates) {
    const style=$('script').value, ballots={};
    const preferred = style==='snake' ? candidates.find(id=>role(id)==='Snake') : style==='loyal' ? candidates.find(id=>role(id)==='Loyal') : null;
    if (style==='tie') {
      const [a,b]=candidates;
      let na=0,nb=0;
      // First construct a valid tied rehearsal ballot for the full cast.
      for (const id of s.active) {
        let target;
        if(id===a) target=b; else if(id===b) target=a;
        else if(na<Math.floor(s.active.length/2)) target=a;
        else if(nb<Math.floor(s.active.length/2)) target=b;
        if(target!==undefined) { ballots[id]=target; if(target===a)na++;else nb++; }
      }
      // The human's actual ballot replaces the scripted one and can break the tie.
    } else {
      for(const id of s.active) {
        if(style==='abstain') continue;
        const eligible=candidates.filter(x=>x!==id);
        const target=preferred!==null && preferred!==undefined && preferred!==id ? preferred : eligible[(id+s.act)%eligible.length];
        if(target!==undefined) ballots[id]=target;
      }
    }
    delete ballots[s.viewer];
    if(s.active.includes(s.viewer) && Number.isInteger(s.submitted)) ballots[s.viewer]=s.submitted;
    return ballots;
  }
  function closeVote() {
    const wasRunoff=s.phase==='runoff', candidates=wasRunoff?s.runoff:s.active;
    const ballots=scriptedBallots(candidates), result=tally(s.active,ballots,candidates);
    s.ballots.push({act:s.act,runoff:wasRunoff,...result});
    s.lastTally=result; s.resultKind=result.removed!==null?'removed':wasRunoff?'deadlock':'tie';
    if(result.removed!==null) s.active=s.active.filter(id=>id!==result.removed);
    else if(!wasRunoff) s.runoff=result.tied;
    enter('result');
  }
  function afterResult() {
    if(s.resultKind==='tie') { beginVote(true); return; }
    const outcome=winner(s.active,s.heists,s.act);
    if(outcome) { finalize(outcome); return; }
    s.act++; s.runoff=null; startChallenge();
  }
  function advance() {
    if(s.phase==='ready') enter('casting');
    else if(s.phase==='casting') startChallenge();
    else if(s.phase==='challenge') finishChallenge();
    else if(s.phase==='evidence') beginVote();
    else if(['vote','runoff'].includes(s.phase)) closeVote();
    else if(s.phase==='result') afterResult();
    else if(s.phase==='finale') { s.left=0; s.paused=true; render(); }
  }
  function replayEvents() {
    return s.records.flatMap(record=>[
      ...record.full.map(e=>`Act ${e.act} · ${e.time} s · ${e.place}: ${e.text}`),
      ...s.ballots.filter(b=>b.act===record.act).flatMap(b=>[
        `Act ${record.act} · ${b.runoff?'Runoff':'Vote'}: ${b.removed!==null?CAST[b.removed]+' removed ('+role(b.removed)+')':b.runoff?'Deadlock; nobody removed':'Tie; runoff opened'}. ${b.abstentions} abstention(s).`,
        ...b.accepted.map(v=>`${CAST[v.voter]} voted for ${CAST[v.target]} in act ${record.act}${b.runoff?'’s runoff':''}.`)
      ])
    ]);
  }
  function drawReceipts() {
    $('actTabs').replaceChildren(...s.records.map(record=>{ const b=document.createElement('button'); b.textContent='Act '+record.act; b.setAttribute('aria-pressed',String(receiptAct===record.act)); b.onclick=()=>{receiptAct=record.act;page=0;drawReceipts();};return b; }));
    const record=s.records.find(r=>r.act===receiptAct);
    $('receiptCount').textContent=record?record.publicCards.length+' cards':'No receipts yet';
    const board=$('receipts'); board.replaceChildren();
    if(!record) { const p=document.createElement('p');p.textContent='Receipts arrive after the first challenge.';board.append(p); }
    else record.publicCards.slice(page*3,page*3+3).forEach(card=>{ const article=document.createElement('article');article.className='receipt';const tag=document.createElement('span');tag.className='small';tag.textContent=`Act ${card.act} · ${card.place} · ${card.time} s`;const p=document.createElement('p');p.textContent=card.text;article.append(tag,p);board.append(article); });
    $('receiptPrev').disabled=!record || page===0;
    $('receiptNext').disabled=!record || (page+1)*3>=record.publicCards.length;
    $('receiptPage').textContent=record?`${page+1} / ${record.stations.length}`:'';
    const suspect=$('suspect'); suspect.replaceChildren(new Option('No selection',''));
    s.active.filter(id=>id!==s.viewer).forEach(id=>suspect.add(new Option(`${String(id+1).padStart(2,'0')} · ${CAST[id]}`,id)));
    suspect.value=s.suspects[receiptAct]??'';
    suspect.disabled=!record;
  }
  function drawPortraits() {
    const candidates=s.phase==='runoff'?s.runoff:s.active, canVote=s.active.includes(s.viewer);
    $('portraits').replaceChildren(...candidates.map(id=>{
      const b=document.createElement('button');b.className='portrait';b.disabled=!canVote || id===s.viewer || s.submitted!==undefined;
      b.setAttribute('aria-pressed',String(s.selected===id));
      b.innerHTML=`<span class="badge">${String(id+1).padStart(2,'0')}</span><span>${CAST[id]}<small>${id===s.viewer?'You · cannot vote for yourself':'Active contestant'}</small></span>`;
      b.onclick=()=>{s.selected=id;drawPortraits();};return b;
    }));
    $('submit').disabled=!canVote || s.selected===null || s.submitted!==undefined;
    $('abstain').disabled=!canVote || s.submitted!==undefined;
    $('ballotStatus').textContent=!canVote?'You’re backstage. Public receipts stay open; you have no ballot.':s.submitted===null?'Abstention sealed.':s.submitted!==undefined?`Ballot sealed for ${CAST[s.submitted]}. Other votes are hidden.`:s.selected!==null?`${CAST[s.selected]} selected. Seal your ballot to submit.`:'No ballot submitted. A missing vote becomes an abstention.';
  }
  function drawResult() {
    const r=s.lastTally;if(!r)return;
    $('resultMessage').textContent=s.resultKind==='removed'?`${CAST[r.removed]} leaves in confetti. Revealed team: ${role(r.removed)}.${r.removed===s.viewer?' You can follow the rest from backstage.':''}`:s.resultKind==='tie'?`Tie between ${r.tied.map(id=>CAST[id]).join(', ')}. A 10-second runoff follows.`:'Deadlock. Nobody leaves; this act’s vote is used.';
    $('totals').replaceChildren(...Object.entries(r.totals).map(([id,votes])=>{const row=document.createElement('div');row.className='total';row.innerHTML=`<span>${CAST[id]}</span><div class="bar"><i style="width:${votes/8*100}%"></i></div><b>${votes}</b>`;return row;}));
    $('abstentions').textContent=`${r.abstentions} abstention(s). Totals appeared together after the ballot closed.`;
  }
  function drawReplay() {
    const events=replayEvents();replayIndex=Math.min(replayIndex,Math.max(0,events.length-1));
    $('replayCard').textContent=events[replayIndex]||'No completed challenge events.';
    $('replayCount').textContent=events.length?`${replayIndex+1} / ${events.length}`:'';
    $('replayPrev').disabled=replayIndex===0;$('replayNext').disabled=replayIndex>=events.length-1;
  }
  function render() {
    const phase=s.phase;
    $('act').textContent=`Act ${s.act}/3`;$('clock').textContent=Math.ceil(s.left)+' s';$('heists').textContent=s.heists+'/2';$('pot').textContent=s.pot;
    $('phaseLabel').textContent={ready:'Ready to cast',casting:'Private casting',challenge:'Challenge playback',evidence:'Inspect evidence',vote:'Secret vote',runoff:'Runoff',result:'Public result',finale:'Finale'}[phase];
    document.querySelectorAll('.phase-strip span').forEach((el,i)=>el.classList.toggle('on',i==={ready:0,casting:0,challenge:1,evidence:2,vote:3,runoff:3,result:3,finale:4}[phase]));
    $('casting').hidden=!['ready','casting'].includes(phase);$('challenge').hidden=phase!=='challenge';$('voting').hidden=!['vote','runoff'].includes(phase);$('result').hidden=phase!=='result';$('finale').hidden=phase!=='finale';
    const scenes={ready:['Your place on the show.','Start casting to begin the phase clock.'],casting:['A secret worth keeping.','This is your private team card. The public cast has no role markers.'],challenge:['Different partners. Same objective.','One prize per station. The event fixture plays out at the end of this challenge.'],evidence:['Read the room. Read the receipts.','Every station has the same evidence coverage. Browse earlier acts whenever you need.'],vote:['Who leaves the show?','One secret vote for another active contestant.'],runoff:['One more vote.','Only tied contestants can receive votes. Everyone active votes again, except for themselves.'],result:['The votes are in.','Take a moment to review the public outcome. Continue when ready.'],finale:[`${s.finish?.team} win.`,s.finish?.reason||'']};
    $('sceneTitle').textContent=scenes[phase][0];$('sceneDescription').textContent=scenes[phase][1];
    $('roleTitle').textContent=s.revealed?`${CAST[s.viewer]} · ${role(s.viewer)}`:'Role card hidden';
    $('objective').textContent=s.revealed?(role(s.viewer)==='Snake'?'Complete at least two heists and keep one Snake onstage after the final vote. Your teammate is Nia.':'Prevent two heists, or vote out both Snakes. Your whole team shares the result, including removed contestants.'):'Only your contestant can see this card in the intended game.';
    $('roleToggle').textContent=s.revealed?'Hide role card':'Show role card';
    if(phase==='challenge') $('stations').innerHTML=s.pending.stations.map((ids,i)=>`<div class="card"><span class="tag">${['East','Pool','West','Garden'][i]} lift</span><p style="margin:12px 0 0">${ids.map(id=>`${String(id+1).padStart(2,'0')} · ${CAST[id]}`).join('<br>')}</p><small>${ids.length===3?'Three cables · triangular tray':'Two cables · one operator each'}</small></div>`).join('');
    if(['vote','runoff'].includes(phase))drawPortraits();if(phase==='result')drawResult();
    if(phase==='finale'){$('roles').innerHTML=CAST.map((name,id)=>`<div class="portrait"><span class="badge ${role(id)==='Snake'?'snake':''}">${String(id+1).padStart(2,'0')}</span><span>${name} · ${role(id)}<small>${s.active.includes(id)?'Onstage':'Removed'} · ${role(id)==='Snake'?(s.finish.team==='Snakes'?'Team win':'Team loss'):(s.finish.team==='Loyals'?'Team win':'Team loss')}</small></span></div>`).join('');drawReplay();}
    $('next').textContent={ready:'Start episode',casting:'Skip casting →',challenge:'Skip to receipts →',evidence:'Open voting →',vote:'Close ballot →',runoff:'Close runoff →',result:s.resultKind==='tie'?'Open runoff →':'Continue episode →',finale:'Finish reveal'}[phase];
    $('next').disabled=phase==='finale' && s.left===0;
    $('pause').disabled=['ready','result'].includes(phase)||(phase==='finale'&&s.left===0);$('pause').textContent=s.paused?'Resume':'Pause';
    drawReceipts();
  }
  $('next').onclick=advance;$('restart').onclick=reset;$('viewer').onchange=reset;
  $('pause').onclick=()=>{s.paused=!s.paused;render();};$('roleToggle').onclick=()=>{s.revealed=!s.revealed;render();};
  $('submit').onclick=()=>{if(s.selected!==null&&s.submitted===undefined){s.submitted=s.selected;drawPortraits();}};
  $('abstain').onclick=()=>{s.submitted=null;drawPortraits();};
  $('suspect').onchange=()=>s.suspects[receiptAct]=$('suspect').value;
  $('receiptPrev').onclick=()=>{page--;drawReceipts();};$('receiptNext').onclick=()=>{page++;drawReceipts();};
  $('replayPrev').onclick=()=>{replayIndex--;drawReplay();};$('replayNext').onclick=()=>{replayIndex++;drawReplay();};
  document.addEventListener('visibilitychange',()=>{if(document.hidden){s.paused=true;render();}});
  function frame(now){const dt=Math.min(.1,(now-last)/1000);last=now;if(!s.paused && durations[s.phase] && s.left>0){s.left=Math.max(0,s.left-dt*+$('speed').value);$('clock').textContent=Math.ceil(s.left)+' s';if(s.left===0)advance();}requestAnimationFrame(frame);}
  reset();requestAnimationFrame(frame);
})();
