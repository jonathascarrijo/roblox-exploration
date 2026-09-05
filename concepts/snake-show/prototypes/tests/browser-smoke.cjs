/* Optional browser checks: see ../README.md for Playwright setup. */
const assert = require('node:assert/strict');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { mkdir } = require('node:fs/promises');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const url = name => pathToFileURL(path.join(__dirname,'..',name+'.html')).href;

(async () => {
  const browser=await chromium.launch({headless:true,...(process.env.PROTOTYPE_BROWSER?{executablePath:process.env.PROTOTYPE_BROWSER}:{})});
  const errors=[];
  const page=await browser.newPage({viewport:{width:1360,height:1000}});
  page.on('pageerror',error=>errors.push(error.message));
  await page.clock.install();
  try {
    for(const name of ['index','catch-and-rig','receipts-and-vote','lobby-and-backstage']) {
      await page.goto(url(name));
      assert.equal(await page.locator('h1').count(),1);
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,name+' desktop overflow');
    }
    await page.goto(url('catch-and-rig'));
    await page.locator('#start').click();
    await page.keyboard.down('r');await page.clock.runFor(800);await page.keyboard.up('r');
    assert.match(await page.locator('#attemptStatus').innerText(),/available/);
    await page.keyboard.down('t');await page.clock.runFor(1600);await page.keyboard.up('t');
    assert.match(await page.locator('#attemptStatus').innerText(),/consumed/);
    await page.locator('#spill').click();
    await page.keyboard.press('c');await page.clock.runFor(750);await page.keyboard.press('v');
    assert.match(await page.locator('#status').innerText(),/Caught/);
    assert.match(await page.locator('#rigStatus').innerText(),/No capsule is armed/);
    assert.doesNotMatch(await page.locator('#publicLog').innerText(),/Rig|diverter|Heist succeeded/);
    // Pre-held Catch cannot fire at the prompt, even at the correct time.
    await page.keyboard.down('c');await page.locator('#spill').click();await page.clock.runFor(750);
    assert.equal(await page.locator('#phase').innerText(),'Catch!');
    await page.keyboard.up('c');await page.keyboard.press('c');
    assert.match(await page.locator('#status').innerText(),/Caught/);

    await page.goto(url('receipts-and-vote'));
    await page.locator('#script').selectOption('snake');
    for(let n=0;n<20 && !(await page.locator('#finale').isVisible());n++)await page.locator('#next').click();
    assert.equal(await page.locator('#sceneTitle').innerText(),'Loyals win.');
    assert.match(await page.locator('#sceneDescription').innerText(),/Both Snakes/);
    assert.equal(await page.locator('#heists').innerText(),'2/2');
    await page.locator('#replayNext').click();assert.match(await page.locator('#replayCount').innerText(),/^2 /);
    await page.locator('#restart').click();await page.locator('#script').selectOption('loyal');
    for(let n=0;n<24 && !(await page.locator('#finale').isVisible());n++){
      if(await page.locator('#voting').isVisible() && (await page.locator('#act').innerText())!=='Act 1/3')assert.equal(await page.locator('#submit').isDisabled(),true);
      await page.locator('#next').click();
    }
    assert.equal(await page.locator('#sceneTitle').innerText(),'Snakes win.');
    assert.match(await page.locator('#roles').innerText(),/Maya · Loyal\nRemoved · Team loss/);
    await page.locator('#restart').click();await page.locator('#script').selectOption('abstain');
    for(let i=0;i<4;i++)await page.locator('#next').click();
    assert.equal(await page.locator('#phaseLabel').innerText(),'Secret vote');
    assert.equal(await page.locator('#totals').isVisible(),false);
    assert.doesNotMatch(await page.locator('#receipts').innerText(),/Rig|diverter|Snake|speed/);
    await page.locator('#next').click();assert.match(await page.locator('#resultMessage').innerText(),/Tie/);
    await page.locator('#next').click();assert.equal(await page.locator('#phaseLabel').innerText(),'Runoff');
    await page.locator('#next').click();assert.match(await page.locator('#resultMessage').innerText(),/Deadlock/);
    await page.locator('#restart').click();await page.locator('#outcomes').selectOption('none');
    for(let n=0;n<24 && !(await page.locator('#finale').isVisible());n++)await page.locator('#next').click();
    assert.equal(await page.locator('#sceneTitle').innerText(),'Loyals win.');
    assert.equal(await page.locator('#act').innerText(),'Act 2/3');

    await page.goto(url('lobby-and-backstage'));
    await page.locator('[data-place=practice]').click();await page.clock.runFor(7000);
    assert.equal(await page.locator('#practice').isVisible(),true);
    await page.locator('#practicePull').focus();await page.keyboard.down('Space');await page.clock.runFor(2300);await page.keyboard.up('Space');
    assert.match(await page.locator('#practiceStatus').innerText(),/Delivered/);
    await page.locator('#delay').fill('4');await page.locator('#play').click();await page.clock.runFor(4200);
    assert.equal(await page.locator('#join').isVisible(),true);await page.locator('#join').click();
    assert.equal(await page.locator('#castingPanel').isVisible(),true);
    await page.locator('#remove').click();assert.equal(await page.locator('#fame').innerText(),'20');
    await page.locator('#backstageDress').click();await page.locator('[data-color="#694aca"]').click();
    await page.locator('#newEpisode').click();assert.equal(await page.locator('#queuePanel').isVisible(),true);
    assert.match(await page.locator('#pending').innerText(),/1 old/);
    await page.locator('#resolve').click();assert.equal(await page.locator('#fame').innerText(),'30');
    await page.locator('#resolve').click();assert.equal(await page.locator('#fame').innerText(),'30');
    assert.match(await page.locator('#resolveStatus').innerText(),/No duplicate/);
    assert.match(await page.locator('#avatar').getAttribute('style'),/rgb\(105, 74, 202\)/);

    const out=process.env.PROTOTYPE_SCREENSHOTS;
    if(out)await mkdir(out,{recursive:true});
    for(const width of [390,320,1360]) {
      await page.setViewportSize({width,height:900});
      for(const name of ['index','catch-and-rig','receipts-and-vote','lobby-and-backstage']) {
        await page.goto(url(name));
        if(name==='receipts-and-vote')for(let i=0;i<4;i++)await page.locator('#next').click();
        assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`${name} overflows at ${width}px`);
        if(out&&width!==320)await page.screenshot({path:path.join(out,`${name}-${width}.png`),fullPage:true});
      }
    }
    const phone=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
    phone.on('pageerror',error=>errors.push(error.message));await phone.clock.install();
    await phone.goto(url('catch-and-rig'));await phone.locator('#start').tap();await phone.locator('#spill').tap();
    await phone.clock.runFor(750);await phone.locator('#catchMaya').tap();
    assert.match(await phone.locator('#status').innerText(),/Caught/);
    await phone.goto(url('lobby-and-backstage'));await phone.locator('[data-place=practice]').tap();await phone.clock.runFor(7000);
    assert.equal(await phone.locator('#practice').isVisible(),true);
    await phone.locator('#practicePull').scrollIntoViewIfNeeded();
    const box=await phone.locator('#practicePull').boundingBox(),cdp=await phone.context().newCDPSession(phone);
    await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:box.x+box.width/2,y:box.y+box.height/2}]});
    await phone.clock.runFor(2300);await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
    assert.match(await phone.locator('#practiceStatus').innerText(),/Delivered/);
    await phone.close();
    assert.deepEqual(errors,[]);
    console.log('Browser checks passed: Rig/Catch, votes/runoff/early wins, removal/requeue/rewards, touch controls, and 320/390/1360px layouts.');
  } finally { await browser.close(); }
})().catch(error=>{console.error(error);process.exitCode=1;});
