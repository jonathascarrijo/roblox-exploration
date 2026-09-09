/* Isolated browser validation for live tuning and locally saved drafts. */
const assert = require('node:assert/strict');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { mkdir } = require('node:fs/promises');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const url = pathToFileURL(path.join(__dirname, '..', 'index.html')).href + '?seed=11&test=1';
(async () => {
  const browser = await chromium.launch({ headless: true, ...(process.env.PROTOTYPE_BROWSER ? { executablePath: process.env.PROTOTYPE_BROWSER } : {}) });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1080 } });
  const errors = []; page.on('pageerror', e => errors.push(e.message));
  const shots = process.env.PROTOTYPE_SCREENSHOTS;
  if (shots) await mkdir(shots, { recursive: true });
  try {
    const start = new Date('2026-09-08T12:00:00Z');
    await page.clock.install({ time: start }); await page.clock.pauseAt(new Date(+start + 1000));
    await page.goto(url); await page.clock.runFor(100);
    await page.locator('#tuneToggle').click();
    assert.equal(await page.locator('#tuningPanel').isVisible(), true);
    assert.equal(await page.locator('#tuningSliders input[type=range]').count(), 20);
    await page.locator('#value-width').fill('1.2'); await page.locator('#value-width').press('Tab');
    assert.equal(await page.evaluate(() => snakeShowTest.game.settings.width), 1.2);
    await page.locator('#value-botSkill').fill('45'); await page.locator('#value-botSkill').press('Tab');
    assert.equal(await page.evaluate(() => snakeShowTest.game.settings.botSkill), 45);
    await page.locator('#tuneRestart').click(); await page.clock.runFor(100);
    const seed = await page.evaluate(() => snakeShowTest.game.seed);
    const phase = await page.evaluate(() => snakeShowTest.game.phase);
    const time = await page.evaluate(() => snakeShowTest.game.phaseTime);
    const capsule = await page.evaluate(() => snakeShowTest.game.stations[0].x);
    // Use the real keyboard behavior of a focused slider.
    await page.locator('#tune-force').focus(); await page.keyboard.press('ArrowRight');
    assert.equal(await page.evaluate(() => snakeShowTest.game.settings.force), 1.75);
    assert.equal(await page.locator('#value-force').inputValue(), '1.75');
    assert.equal(await page.evaluate(() => snakeShowTest.game.phase), phase);
    assert.equal(await page.evaluate(() => snakeShowTest.game.phaseTime), time);
    await page.locator('#value-x0').fill('0.8'); await page.locator('#value-x0').press('Tab');
    assert.equal(await page.evaluate(() => snakeShowTest.game.stations[0].x), capsule, 'start offset never teleports live prize');
    await page.locator('#tuneRestart').click(); await page.clock.runFor(20);
    assert.equal(await page.evaluate(() => snakeShowTest.game.seed), seed);
    assert.equal(await page.evaluate(() => snakeShowTest.game.settings.force), 1.75);
    assert.equal(await page.evaluate(() => Math.abs(snakeShowTest.game.stations[0].x)), .8);
    await page.locator('#draftExchange summary').click();
    const draft = JSON.parse(await page.locator('#tuningJson').inputValue());
    assert.equal(draft.settings.force, 1.75); assert.equal(draft.settings.x0, .8);
    draft.settings.catchWin = 6; draft.settings.catchZone = .5;
    await page.locator('#tuningJson').fill(JSON.stringify(draft)); await page.locator('#importDraft').click();
    assert.equal(await page.evaluate(() => snakeShowTest.game.settings.catchWin), 6);
    await page.locator('#tuningJson').fill('{"version":1,"settings":{"force":999}}'); await page.locator('#importDraft').click();
    assert.match(await page.locator('#tuningStatus').innerText(), /Current settings were kept/);
    assert.equal(await page.evaluate(() => snakeShowTest.game.settings.force), 1.75);
    // A reload reads the saved draft into a fresh game; settings also carry into play.
    await page.reload(); await page.clock.runFor(100);
    assert.equal(await page.evaluate(() => snakeShowTest.game.settings.catchWin), 6);
    assert.equal(await page.evaluate(() => snakeShowTest.game.settings.width), 1.2);
    assert.equal(await page.evaluate(() => snakeShowTest.game.settings.botSkill), 45);
    await page.locator('#play').click(); await page.locator('#continue').click(); await page.clock.runFor(100);
    assert.equal(await page.evaluate(() => snakeShowTest.game.settings.force), 1.75);
    await page.locator('#tuneToggle').click(); await page.clock.runFor(100);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    if (shots) await page.screenshot({ path: path.join(shots, 'desktop-tuning.png'), fullPage: true });
    // The overlay, scene, and engine use the same adjustable Catch geometry.
    await page.locator('#closeTuning').click();
    await page.evaluate(() => { const g = snakeShowTest.game; g.fault(g.stationOf(0)); g.stationOf(0).catchPlan = {}; snakeShowTest.update(); });
    await page.clock.runFor(2050);
    assert.equal(await page.locator('.catch-zone').evaluate(e => e.style.left), '60%');
    const width = await page.locator('.catch-zone').evaluate(e => parseFloat(e.style.width));
    assert.ok(Math.abs(width - 100 / 6) < .001);
    await page.keyboard.press('c');
    assert.match(await page.evaluate(() => snakeShowTest.game.stationOf(0).message), /Caught by Maya/);
    await page.locator('#tuneToggle').click(); await page.locator('#tuneDefaults').click();
    assert.equal(await page.evaluate(() => snakeShowTest.game.settings.force), 1.7);
    assert.equal(await page.evaluate(() => snakeShowTest.game.settings.catchWin), 3);
    await page.reload(); await page.clock.runFor(100);
    assert.equal(await page.evaluate(() => snakeShowTest.game.settings.force), 1.7);
    for (const width of [390, 320]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(url); await page.clock.runFor(100); await page.locator('#tuneToggle').click();
      await page.locator('#tuneRestart').click(); await page.clock.runFor(100);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `tuning overflow at ${width}`);
      if (shots && width === 390) await page.screenshot({ path: path.join(shots, 'phone-tuning.png'), fullPage: true });
    }
    assert.deepEqual(errors, []);
    console.log('Tuning browser checks passed: 20 sliders, live edits, exact values, same-seed restart, export/import, invalid drafts, reload persistence, episode carryover, Catch geometry, baseline reset, and phone layouts.');
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
