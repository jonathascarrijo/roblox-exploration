/* Isolated, served-page checks; reuse one browser context for normal reloads. */
const assert = require('node:assert/strict');
const path = require('node:path');
const fs = require('node:fs/promises');
const crypto = require('node:crypto');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const url = process.env.PROTOTYPE_URL || 'http://127.0.0.1:8000/index.html';
(async () => {
  const browser = await chromium.launch({ headless: true, ...(process.env.PROTOTYPE_BROWSER ? { executablePath: process.env.PROTOTYPE_BROWSER } : {}) });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1080 } });
  const errors = []; page.on('pageerror', e => errors.push(e.message));
  const shots = process.env.PROTOTYPE_SCREENSHOTS || path.join(__dirname, '..', 'test-artifacts');
  await fs.mkdir(shots, { recursive: true });
  const start = new Date('2026-09-10T12:00:00Z');
  async function capture(name) { await page.screenshot({ path: path.join(shots, name + '.png'), fullPage: true }); }
  async function lobby() { await page.evaluate(() => snakeShowTest.reset()); }
  async function earn() {
    await page.evaluate(() => {
      const t=snakeShowTest; t.reset('play',true,1); const g=t.game; g.nextPhase();
      // Complete two real prevention trials; a novice's accepted Pull suffices.
      g.players.forEach(p=>p.bot=false); g.players[0].role='Keeper'; g.pressPull(0);
      for(const s of g.stations) g.endStation(s,'delivered'); g.finishChallenge();
      for(const id of g.activeIds())g.castVote(id,null);g.finishVote();g.finishVote();g.nextPhase();
      for(const s of g.stations)g.endStation(s,'delivered');g.finishChallenge();t.update();
    });
    assert.equal(await page.evaluate(()=>snakeShowTest.game.phase),'finale');
    assert.match(await page.locator('#adoption').innerText(),/joins you/);
    await page.locator('#adoptionNursery').click();
  }
  try {
    await page.clock.install({time:start}); await page.clock.pauseAt(new Date(+start+1000));
    await page.goto(url+'?seed=1&test=1'); await page.clock.runFor(150);
    await page.waitForFunction(() => document.querySelector('#openNursery'));
    // Query strings must match the exact files, including new modules.
    const resources=await page.locator('script[src],link[rel=stylesheet]').evaluateAll(nodes=>nodes.map(n=>n.getAttribute('src')||n.getAttribute('href')));
    for(const resource of resources) {
      const [name,query]=resource.split('?v='), bytes=await fs.readFile(path.join(__dirname,'..',name));
      assert.equal(query,crypto.createHash('sha256').update(bytes).digest('hex').slice(0,12),name+' cache version');
    }
    // The SVG-backed canvas art must actually decode, not silently draw an empty pod.
    assert.equal(await page.evaluate(async()=>{const im=new Image();im.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(MidnightNursery.art({variant:'lilac'}));await im.decode();return im.naturalWidth>0;}),true);
    await page.clock.runFor(100); await capture('midnight-lobby');
    await page.locator('#openNursery').click(); assert.match(await page.locator('#nurseryBody').innerText(),/A little nest/);
    await page.locator('[data-nursery-tab=social]').first().click(); await page.locator('[data-reaction="Hello!"]').click();
    assert.match(await page.locator('#nurseryStatus').innerText(),/paw-wave/);
    await page.locator('#closeNursery').click();
    await earn();
    const first=await page.evaluate(()=>snakeShowTest.collection.state.babies[0].id);
    await page.locator('#babyNickname').fill('<Moon & stars>'); await page.locator('[data-rename]').click();
    assert.equal(await page.locator('.baby-detail .baby-identity>b').innerText(),'<Moon & stars>');
    await page.locator('[data-pose=pet]').click(); assert.match(await page.locator('#nurseryStatus').innerText(),/gathers an ear/);
    await page.locator('[data-turn]').click(); await page.locator('[data-companion]').click(); await page.locator('[data-favorite]').click();
    await page.locator('[data-nursery-tab=showcase]').click(); await page.locator('[data-showcase="0"]').selectOption(first);
    await page.locator('[data-nursery-tab=badges]').click(); await page.locator('[data-badge=first]').click();
    await page.locator('#closeNursery').click(); assert.match(await page.locator('#lobbyBadge').innerText(),/First Friend/);
    await page.reload(); await page.clock.runFor(150);
    assert.equal(await page.evaluate(()=>snakeShowTest.collection.state.babies.length),1);
    assert.equal(await page.evaluate(()=>snakeShowTest.collection.state.companion),first);
    assert.equal(await page.evaluate(()=>snakeShowTest.collection.state.showcase[0]),first);
    assert.match(await page.locator('#lobbyCompanion').innerText(),/<Moon & stars>/);
    // A distinct round makes another individual even with the same seed and color.
    await earn(); assert.equal(await page.locator('[data-baby]').count(),2);
    await capture('midnight-nursery');
    await page.locator('[data-nursery-tab=exchange]').click(); await page.locator('#tradeMine').selectOption(first);
    assert.equal(await page.locator('[data-bot-confirm]').isDisabled(),true,'favorites are locked');
    await page.locator('[data-nursery-tab=babies]').click(); await page.locator(`[data-baby="${first}"]`).click(); await page.locator('[data-favorite]').click();
    await page.locator('[data-nursery-tab=exchange]').click(); await page.locator('#tradeMine').selectOption(first);
    await page.locator('[data-bot-confirm]').click();
    await page.locator('#tradeTheirs').selectOption('leo-1'); assert.equal(await page.locator('[data-trade-confirm]').isDisabled(),true,'offer edits reset confirmations');
    await page.locator('[data-bot-confirm]').click(); await capture('midnight-exchange');
    await page.locator('#closeNursery').click();
    assert.ok(await page.evaluate(id=>snakeShowTest.collection.state.babies.some(b=>b.id===id),first),'closing proposal transfers nothing');
    await page.locator('#openExchange').click(); await page.locator('#tradeMine').selectOption(first);
    assert.equal(await page.locator('[data-trade-confirm]').isDisabled(),true);
    await page.locator('[data-bot-confirm]').click(); await page.locator('[data-trade-confirm]').click();
    assert.match(await page.locator('#nurseryStatus').innerText(),/Exchange complete/);
    assert.equal(await page.evaluate(()=>snakeShowTest.collection.state.companion),null);
    assert.equal(await page.evaluate(()=>snakeShowTest.collection.state.showcase[0]),null);
    assert.equal(await page.evaluate(()=>snakeShowTest.collection.state.equippedBadge),'first');
    await page.locator('#closeNursery').click(); await page.reload(); await page.clock.runFor(150);
    assert.equal(await page.evaluate(()=>snakeShowTest.collection.state.babies.length),2);
    // The normal page must preserve public voting from the first review frame.
    // No query parameter enables these behaviors, and no review clock is skipped.
    await page.locator('#play').click(); await page.locator('#continue').click();
    await page.evaluate(()=>{const g=snakeShowTest.game;g.players.forEach(p=>p.bot=false);g.finishChallenge();snakeShowTest.update();});
    assert.equal(await page.evaluate(()=>snakeShowTest.game.phase),'vote');
    assert.equal(await page.locator('#votePanel').isVisible(),true);
    assert.equal(await page.locator('#voteSeconds').innerText(),'35');
    await page.locator('[data-candidate="2"]').click();
    await page.locator('#certain').click();
    await page.evaluate(()=>{const g=snakeShowTest.game;g.castVote(1,3);g.setCertain(1,true);g.castVote(4,3);g.lockVote(1);snakeShowTest.update();});
    await page.clock.runFor(100);
    assert.equal(await page.locator('.live-vote-count:visible').count(),8);
    assert.equal(await page.locator('.pointing-arm:visible').count(),3);
    assert.equal(await page.locator('[data-accused]').count(),3);
    assert.equal(await page.locator('#certain').isVisible(),true);
    assert.equal(await page.locator('#vote-count-3').innerText(),'2');
    assert.equal(await page.locator('[data-candidate="3"]').evaluate(el=>el.classList.contains('vote-leader')),true);
    assert.match(await page.locator('#voter-choice-1').innerText(),/✓ ! →/);
    assert.equal(await page.locator('#ballotProgress').getAttribute('aria-label'),'1 of 8 votes locked');
    // Clue-card shortcuts change the live choice and reset certainty.
    await page.locator('[data-vote-shortcut="3"]').first().click();
    assert.equal(await page.locator('#vote-count-2').innerText(),'0');
    assert.equal(await page.locator('#vote-count-3').innerText(),'3');
    assert.equal(await page.locator('#certain').getAttribute('aria-pressed'),'false');
    await page.locator('#abstain').click();
    assert.equal(await page.locator('#vote-count-3').innerText(),'2');
    await page.locator('[data-candidate="2"]').click(); await page.locator('#certain').click();
    await capture('midnight-public-ballot'); await page.locator('#lockVote').click();
    assert.match(await page.locator('#voteHint').innerText(),/locked/);
    assert.equal(await page.locator('#certain').isDisabled(),true);
    // Voted-out participant returns to the fair; their old round still resolves once in this tab.
    await page.evaluate(()=>{const t=snakeShowTest,g=t.game;g.players[0].role='Keeper';g.players[0].active=false;g.participants.add(0);g.act=2;g.completedActs=1;g.heists=0;g.beginAct();g.act=2;for(const s of g.stations)g.endStation(s,'delivered');t.update();t.reset();});
    const before=await page.evaluate(()=>snakeShowTest.collection.state.babies.length);
    assert.equal(await page.evaluate(()=>snakeShowTest.pendingRounds.length),1);
    await page.clock.runFor(200); assert.equal(await page.evaluate(()=>snakeShowTest.pendingRounds.length),0);
    assert.equal(await page.evaluate(()=>snakeShowTest.collection.state.babies.length),before+1);
    await page.clock.runFor(200); assert.equal(await page.evaluate(()=>snakeShowTest.collection.state.babies.length),before+1);
    // Quick replay and returning to the fair are distinct, available actions.
    async function watchVote() {
      await page.evaluate(()=>{const t=snakeShowTest;t.reset('watch',true,11);const g=t.game;g.nextPhase();g.players.forEach(p=>p.bot=false);g.finishChallenge();t.update();});
    }
    await watchVote();
    for(const width of [320,390,768,1440]) {
      await page.setViewportSize({width,height:900});
      assert.equal(await page.locator('#voteNewEpisode').isVisible(),true);
      assert.equal(await page.locator('#voteReturnFair').isVisible(),true);
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'spectator controls overflow at '+width);
    }
    await page.locator('#voteNewEpisode').click();
    assert.deepEqual(await page.evaluate(()=>[snakeShowTest.game.phase,snakeShowTest.game.mode]),['casting','play']);
    await watchVote(); await page.locator('#voteReturnFair').click();
    assert.equal(await page.evaluate(()=>snakeShowTest.game.phase),'lobby');
    await page.locator('#practice').click();
    await page.evaluate(()=>{const t=snakeShowTest;for(const s of t.game.stations)t.game.endStation(s,'delivered');t.game.finishChallenge();t.update();});
    await page.locator('#nextEpisode').click();
    assert.deepEqual(await page.evaluate(()=>[snakeShowTest.game.phase,snakeShowTest.game.mode]),['casting','play']);
    await page.evaluate(()=>{snakeShowTest.reset('watch',true);snakeShowTest.update();});
    await page.locator('#returnFair').click();
    assert.equal(await page.evaluate(()=>snakeShowTest.game.phase),'lobby');
    for(const width of [390,320,768]) {
      await page.setViewportSize({width,height:900}); await lobby(); await page.locator('#openNursery').click();
      for(const tab of ['babies','showcase','social','badges','exchange']) {
        await page.locator(`[data-nursery-tab=${tab}]`).first().click();
        assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,tab+' page overflow at '+width);
        assert.equal(await page.locator('#nurseryDialog').evaluate(el=>el.scrollWidth>el.clientWidth),false,tab+' dialog overflow at '+width);
        if(width===390 && ['babies','social','exchange'].includes(tab))await capture('midnight-phone-'+tab);
      }
      await page.locator('#closeNursery').click();
    }
    const owned=await page.evaluate(()=>snakeShowTest.collection.state.babies.length);
    await page.goto(url+'?dev=1&scene=finale&test=1'); await page.clock.runFor(100);
    assert.equal(await page.evaluate(()=>snakeShowTest.collection.state.babies.length),owned,'developer finale grants nothing');
    assert.deepEqual(errors,[]);
    console.log('Midnight Fair browser checks passed: hashed assets, normal reload, nursery, adoption, individual duplicates, safe names, favorites, companion/showcase/badges, atomic bot exchanges, immediate public ballots, pending vote-out award, dev isolation, and 320/390/768px layouts.');
  } finally { await browser.close(); }
})().catch(e=>{console.error(e);process.exitCode=1;});
