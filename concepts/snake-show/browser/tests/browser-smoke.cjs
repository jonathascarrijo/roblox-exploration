/* Own local page only; never connects to an existing user browser session. */
const assert = require('node:assert/strict');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { mkdir } = require('node:fs/promises');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const url = pathToFileURL(path.join(__dirname, '..', 'index.html')).href;
(async () => {
  const browser = await chromium.launch({ headless: true, ...(process.env.PROTOTYPE_BROWSER ? { executablePath: process.env.PROTOTYPE_BROWSER } : {}) });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1080 } });
  const errors = [], requests = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('request', req => { if (/^https?:/.test(req.url())) requests.push(req.url()); });
  const shots = process.env.PROTOTYPE_SCREENSHOTS;
  if (shots) await mkdir(shots, { recursive: true });
  async function capture(name) { if (shots) { await page.clock.runFor(50); await page.screenshot({ path: path.join(shots, name + '.png'), fullPage: true }); } }
  try {
    const clockStart = new Date('2026-09-05T12:00:00Z');
    await page.clock.install({ time: clockStart });
    await page.clock.pauseAt(new Date(+clockStart + 1000));
    await page.goto(url + '?seed=11&test=1'); await page.clock.runFor(120);
    assert.equal(await page.locator('#cast .cast-member').count(), 8);
    await capture('desktop-lobby');
    await page.locator('#help').click(); assert.equal(await page.locator('#helpDialog').isVisible(), true);
    await page.locator('#gotIt').click();
    await page.locator('#practice').click(); await page.clock.runFor(120);
    assert.equal(await page.evaluate(() => snakeShowTest.game.activeIds().length), 2);
    // At the console, Space drives the winch even after clicks or pauses move focus to another button.
    await page.locator('#freezePhaseTimer').click(); await page.locator('#tuneToggle').click(); await page.locator('#tuneToggle').click();
    await page.keyboard.press('Escape'); await page.clock.runFor(60); await page.keyboard.press('Escape'); await page.clock.runFor(60);
    assert.equal(await page.evaluate(() => document.activeElement.id), 'pause');
    const frozenLiftTimer = await page.locator('#timer').innerText();
    await page.keyboard.down('Space'); await page.clock.runFor(1600);
    assert.equal(await page.evaluate(() => snakeShowTest.game.players[0].pulling), true);
    assert.ok(await page.evaluate(() => snakeShowTest.game.stations[0].h[0] > 0));
    assert.equal(await page.locator('#timer').innerText(), frozenLiftTimer);
    await page.keyboard.up('Space'); await page.clock.runFor(60);
    assert.equal(await page.evaluate(() => snakeShowTest.paused), false);
    await page.locator('#freezePhaseTimer').click();
    assert.equal(await page.evaluate(() => snakeShowTest.game.players[0].pulling), false);
    await capture('desktop-lift');
    await page.locator('#pause').click();
    const time = await page.evaluate(() => snakeShowTest.game.time); await page.clock.runFor(2000);
    assert.equal(await page.evaluate(() => snakeShowTest.game.time), time);
    await page.locator('#resume').click(); await page.clock.runFor(300);
    assert.ok(await page.evaluate(() => snakeShowTest.game.time > 1.6));
    await page.locator('#leave').click(); assert.equal(await page.evaluate(() => snakeShowTest.game.players[0].operated), false);
    await page.locator('#interact').click(); assert.equal(await page.evaluate(() => snakeShowTest.game.players[0].operated), true);
    await page.locator('#pause').click(); await page.locator('#quit').click();
    await page.locator('#play').click();
    assert.equal(await page.evaluate(() => snakeShowTest.game.players.filter(p => p.bot).length), 7);
    assert.equal(await page.evaluate(() => snakeShowTest.game.players.filter(p => p.role === 'Trickster').length), 2);
    assert.match(await page.locator('#privateRole').innerText(), /Trickster/);
    await page.locator('#roleToggle').click(); assert.equal(await page.locator('#privateRole').isVisible(), false);
    await page.locator('#continue').click(); await page.clock.runFor(120);
    // Deterministic physical fixture, then actual keyboard Rig and Catch input.
    await page.evaluate(() => { const g = snakeShowTest.game; g.players.forEach(p => { if (p.bot) p.nextThink = 100; }); });
    await page.keyboard.down('r'); await page.clock.runFor(700); await page.keyboard.up('r');
    assert.equal(await page.evaluate(() => snakeShowTest.game.attempt.reserved), null);
    assert.equal(await page.evaluate(() => snakeShowTest.game.attempt.spent), false);
    await page.keyboard.down('r'); await page.clock.runFor(1650); await page.keyboard.up('r');
    assert.equal(await page.evaluate(() => snakeShowTest.game.attempt.spent), true);
    await page.evaluate(() => { const g = snakeShowTest.game, s = g.stationOf(0); g.fault(s); s.catchPlan = {}; snakeShowTest.update(); });
    await page.clock.runFor(1025); await page.keyboard.press('c');
    assert.match(await page.evaluate(() => snakeShowTest.game.stationOf(0).message), /Caught by Maya/);
    assert.equal(await page.evaluate(() => snakeShowTest.game.stationOf(0).armedBy), null);
    // Finish actual station simulation; read receipts and submit a real ballot.
    await page.evaluate(() => { const g = snakeShowTest.game; while(g.phase==='challenge') g.tick(1/120); snakeShowTest.update(); });
    assert.equal(await page.locator('#receipts .receipt').count(), 4);
    assert.equal(await page.locator('.stage').isVisible(), false);
    await page.locator('[data-receipt="0"]').click();
    assert.equal(await page.locator('#cameraDialog .moment').count(), 3);
    assert.equal(await page.locator('#cameraDialog #freezePhaseTimer').isVisible(),true);
    assert.equal(await page.locator('#cameraDialog .camera-notes').getAttribute('open'), null);
    await page.locator('#closeCamera').click();
    assert.equal(await page.locator('.app > #devTimers').isVisible(),true);
    assert.doesNotMatch(await page.locator('#receipts').innerText(), /Rig|diverter|Trickster channel|doubled/);
    assert.equal(await page.locator('#votePanel').isVisible(), true);
    assert.equal(await page.locator('.candidate').count(), 8);
    assert.equal(await page.locator('.candidate[data-candidate="0"]').isDisabled(), true);
    await page.locator('#freezePhaseTimer').click();
    const frozenVoteTimer = await page.locator('#voteSeconds').innerText();
    await page.locator('.candidate[data-candidate="1"]').click(); await page.locator('#certain').click();
    await page.locator('[data-vote-shortcut="2"]').click(); assert.match(await page.locator('#ballotStatus').innerText(), /hunch/); await page.locator('[data-candidate="1"]').click(); await page.locator('#lockVote').click(); assert.match(await page.locator('#voteHint').innerText(), /locked/);
    assert.equal(await page.locator('#lockVote').isDisabled(), true);
    assert.equal(await page.locator('[data-candidate="0"]').getAttribute('data-accused'), '1');
    assert.ok(Number(await page.locator('#vote-count-1').innerText()) >= 1);
    assert.equal(await page.locator('[data-candidate="0"] .pointing-arm').isVisible(), true);
    await page.clock.runFor(40000);
    assert.equal(await page.locator('#voteSeconds').innerText(), frozenVoteTimer);
    assert.equal(await page.evaluate(() => snakeShowTest.game.locked.size),8);
    assert.equal(await page.evaluate(() => snakeShowTest.game.phase),'vote');
    await capture('desktop-ballot');
    await page.locator('#freezePhaseTimer').click(); await page.clock.runFor(120);
    assert.ok(['result','runoff'].includes(await page.evaluate(() => snakeShowTest.game.phase)));
    // Independent autoplay episode must reach a real ending.
    await page.goto(url + '?seed=5&test=1'); await page.locator('#watch').click();
    await page.locator('#speed').selectOption('4'); await page.locator('#continue').click();
    assert.equal(await page.locator('#privateRole').isVisible(), false);
    await page.clock.runFor(1600);
    assert.ok(await page.evaluate(() => snakeShowTest.game.phaseTime > 6), '4× autoplay advances actual frames');
    await page.evaluate(() => { snakeShowTest.game.tick(350); snakeShowTest.update(); });
    assert.equal(await page.locator('#finalePanel').isVisible(), true);
    assert.equal(await page.locator('.reveal-person.snake').count(), 2);
    assert.ok(await page.locator('#replay .replay-act').count() >= 2);
    await capture('desktop-finale');
    await page.locator('#replayEpisode').click();
    assert.equal(await page.evaluate(() => snakeShowTest.game.heists), 0);
    for (const width of [390, 320, 768]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(url + '?seed=11&test=1'); await page.clock.runFor(120);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `lobby overflow at ${width}`);
      if (width === 390) await capture('phone-lobby');
      await page.locator('#play').click(); await page.locator('#continue').click(); await page.clock.runFor(120);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `lift overflow at ${width}`);
      if (width <= 390) {
        const box = await page.locator('#pull').boundingBox();
        assert.ok(box.y + box.height < 900, `touch Pull must fit with scene at ${width}px`);
      }
      if (width === 390) await capture('phone-lift');
      await page.evaluate(() => { while(snakeShowTest.game.phase==='challenge') snakeShowTest.game.tick(1/120); snakeShowTest.update(); });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `receipts overflow at ${width}`);
      if (width === 390) await capture('phone-receipts');
      await page.clock.runFor(120);
      await page.locator('.candidate[data-candidate="1"]').click();
      const sealBox = await page.locator('#lockVote').boundingBox();
      assert.ok(sealBox.y + sealBox.height < 900, `voting controls fit at ${width}px`);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      if (width === 390) await capture('phone-vote');
    }
    assert.deepEqual(errors, [], 'browser errors'); assert.deepEqual(requests, [], 'external network requests');
    console.log('Browser checks passed: lobby, help, physical controls, practice, pause, leave/rejoin, roles, Rig, Catch, receipts, ballot, finale, restart, and 320/390/768px layouts.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
