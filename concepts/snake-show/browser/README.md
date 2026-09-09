# Snake Show — playable 2D browser adaptation

Updated 8 September 2026 · Based on the [design brief v2](../snake-show-design-brief-v2.md), the [coupled-cables prototype](../prototypes/prize-lift-coupled-cables.html), and the user-owned direction in `user-notes.txt`.

Open [index.html](index.html) in a modern browser. Everything runs locally, including the art, game rules, and bots. There is no build, installation, account, external asset, or network dependency.

## Play

- **Play with 7 bots:** you play Maya; the other seven contestants are explicitly labeled bots. Two of the eight roles are shuffled privately each episode. You may be a Loyal or a Snake.
- **Practice a lift:** play a two-person lift with one Loyal bot using the same physical rules. No voting, sabotage, or episode rewards.
- **Watch bots:** all eight contestants act autonomously. Choose a camera and run at 1×, 2×, or 4×. Roles remain hidden from the spectator interface until removal or the finale.

The connected episode includes casting, up to three Prize Lift acts with rotating groups, receipts, open voting, runoff/deadlock, removal, public backstage spectating, and a factual finale with all roles and recorded ballots. **New episode** resets the cast and episode scores.

The private role card shows your own avatar with **yellow slit eyes** for a Snake or a **golden prize pin** for a Loyal. The same cues appear when reopening **Show role / My role**. Vote results show these cues on the removed contestant, and the finale shows them on the entire cast. Cast portraits, lift observations and voting targets keep their ordinary appearance before their roles are revealed. These deliberately simple cues are for UX validation.

## Controls

| Action | Keyboard | Pointer / touch |
|---|---|---|
| Walk in the courtyard | WASD or arrow keys | Tap a destination or use the direction buttons |
| Use a nearby console | E | Join console / Watch nearby lift |
| Raise your cable | Hold Space; release to lower | Hold Pull |
| Catch a falling capsule | C, once inside the gold zone | Catch button |
| Arm sabotage as a Snake | Hold R for 1.5 seconds at the baseline | Hold Rig |
| Pause / resume | Escape | Pause / Resume |

At a console, movement is replaced by lift controls. **Leave console** returns to the courtyard. Your assigned cable stops receiving input. Walk into any station’s marked rescue area to help Catch, or return to your own console. Selecting another camera only changes what you see; it grants no remote input or rescue power. Keyboard Space/Enter also operates focused action buttons. Held controls are released and the episode pauses on focus loss or a hidden tab; resuming is explicit.

Sound is optional and off by default. Every sound has a visual equivalent. Reduced-motion preferences suppress decorative movement. Menus, controls, receipts, and ballots are HTML; the game scene is drawn on canvas. The moving scene is not a complete nonvisual gameplay interface.

## Lift tuning and approved preset

The user approved the current browser configuration on **8 September 2026**. The complete 20-setting snapshot is saved as [approved-2026-09-08.json](presets/approved-2026-09-08.json): winch width 1.2, bot skill 20%, static friction 0, sliding friction 0, and the remaining values as captured from the game. To restore it later, paste that file into **Export / import a draft** and select **Apply pasted draft**. The sliders remain available for further experiments.

Select **Tune lift** in the top bar. It exposes all 17 sliders from the coupled-cables prototype with the same ranges, increments, and baseline values, plus **Winch width**, **Bot skill**, and the episode’s **Hold to arm Rig** setting. Every slider also has an editable numeric value. Changed fields are marked with a dot.

**Winch width** is the first slider, under **Frame**. It changes the cable span from 0.8 to 3.0 units (reference width: 2.0). The frame, cable mounts, and tray resize live in both two- and three-cable lifts. Narrower spans produce more tilt at the same cable-height difference and give the capsule a shorter distance to slide off. Resizing preserves the prize’s relative position, load distribution, physical slide velocity, and cable heights; it does not restart an attempt. Older saved drafts inherit the reference width.

**Bot skill** is under **Bots**, immediately after the Frame group. It ranges from 0–100% in 5-point steps (draft baseline: 75%). It controls all bots’ lift reaction time, anticipation of the ball’s momentum, handling mistakes, and Catch accuracy. A live edit takes effect on the next motor decision and clears a current added handling mistake; Catch plans use the skill at the start of their fall. At 100%, bots use the quickest reactions and no added handling mistakes, while still being limited by the cables and the other operators. The setting saves and exports with the rest of the draft.

Motor force, upward/downward caps, winch drag, gravity, tap pulse, prize weight, slide response/drag/friction, Rig multipliers/duration, and Catch timing feed the actual simulation. Edits apply to all current lifts and carry into future acts and episodes. **Start offset** affects the next loaded capsule or a restart, never teleports a capsule already in play. Changing tap pulse affects future taps. Rig duration is recalculated from the existing arm time; extending it can extend a still-armed capsule’s burst. Changing Catch duration retimes its current fall and needle; previously spent taps and consumed team attempts stay spent.

**Restart same practice** starts a two-person practice lift with the current draft and the same random seed. It resets the practice run, making input comparisons repeatable. **Restore prototype** restores the baseline values live; it does not reset the episode or refund sabotage. Neither action establishes settled presets.

Drafts are stored locally in this browser under `snake-show-lift-draft-v1`, separately from game progress. They survive refreshes and browser restarts on the same origin. If storage is unavailable, settings remain usable for the current tab. **Export / import a draft** provides versioned JSON to paste into a conversation or save elsewhere. An invalid or out-of-range import leaves the current settings intact. The original prototype and its defaults are not edited when tuning the game.

**Motor readouts** shows each corner’s height, share of the prize load, recent hold percentage, and estimated required hold. These use the prototype’s measurements; the required hold estimate assumes an unboosted motor and cannot expose a secret Rig. Live readouts are separate from the limited receipts used for voting. The tuning panel also shows theoretical speeds, static tilt threshold, best-case climb time, and effective Catch-zone duration. These are model estimates, not observed balance results.

## Implemented rules and adaptation choices

The full cast is six Loyals and two Snakes. Snakes win with **at least two heists plus one Snake still active after the last vote**. Both Snakes removed, or two unsuccessful opportunities, produces an early Loyal win. Removed contestants keep their original team result and can read public evidence or follow the public cameras, but cannot pull, sabotage, catch, or vote.

Prize Lift uses the coupled-cable model: fixed motor force, load distributed by the capsule’s position, inertia, drag, sliding friction, exposed edges, and no automatic hoist. The two-cable physics at the reference width is compared frame by frame against functions extracted from the unchanged prototype in the regression suite. Its mechanical view follows the reference: equal horizontal/vertical scale, constant-length rotating tray, inward-moving cable attachments, cable thickness indicating prize load, height ruler, and a quadratic visual fall during Catch. The round golden capsule keeps its crown motif. Odd casts use a triangular tray with three independent corner heights, barycentric weight distribution, a two-axis sliding capsule, and a bubble level. The three-cable extension is a prototype interpretation of the brief and still needs tuning.

The provisional baseline matches the coupled-cables prototype: motor force 1.7× balanced load, gravity 1.5, winch drag 4, prize/tray weight ratio 1, slide response 1.2, slide drag 0.1, static/sliding friction 0.02/0.05, top speed ±0.2, tap pulse 0.15 seconds, start offset 0.5, delivery height 2.6, lower boundary −1.8, and maximum corner-height spread 1.6. Tray mass is 2, winch inertia is 0.6 per corner, and the upper limit is 2.8. These replace the browser adaptation’s earlier mass/inertia and upper-stop values. Physics runs in 1/120-second steps.

Your notes override the older water theme: the challenge pit is **stylized lava**, and the capsule contains an original **golden crown treasure**. The villa retains an ornamental pool. No creature or contestant is harmed; a spill enters the opaque collection prop. A tray contacting lava fails immediately, with no Catch and no heist from that drop. This is a presentation adaptation, not a change to the team objective.

Rig reserves the team’s one attempt while held. At the baseline, canceling, leaving, or faulting before 1.5 seconds releases the reservation. Completion consumes it, arms this capsule’s diverter, and doubles that motor for five seconds. The arming time, motor multipliers, and burst duration are adjustable. An armed, uncaught edge spill awards a heist; expiry of the burst does not disarm the capsule. Catch, delivery, lava contact, or the challenge deadline clears unresolved sabotage. A replacement after an uncaught spill loads in three seconds and carries no rig. A station can bank only one delivery per act.

At the baseline, Catch lasts three seconds with a 0.25-second opportunity on each of two passes. As in the reference, the zone starts at 60% of the track: the baseline windows are 0.90–1.15 seconds and 1.85–2.10 seconds after the fall begins. This replaces the earlier centered zone. Requested zone width is clipped to the remaining 40% of the track; the tuning panel reports its effective duration. Each eligible contestant gets one fresh tap per fall. One save resolves immediately and clears sabotage; another contestant’s miss cannot cancel it. A catch centers the capsule, freezes it briefly for a 0.45-second reset, and preserves the tray heights. The local simulation models no network delay allowance.

The lower-boundary drop and post-loss capsule reload reset are explicitly browser prototype choices: replacements restart at the initial height. Rewards, cosmetics, real matchmaking, multiplayer networking, chat, saved progression, and Roblox services are outside this browser build. The requested bot-filled episode is a **local simulation exception** to the brief’s proposal that production practice bots remain outside the main cast. No production matchmaking or balance decision is implied.

## Visual voting room

The 8 September browser iteration uses **open voting**. Players whose lift finishes early automatically see **What happened?** while unfinished lifts show **Still playing**. They can return to watch or help nearby lifts. Voting stays closed until every lift finishes or the 45-second limit expires. Then pictures and voting share **35 seconds** (the former 10-second review plus 25-second vote). An already-decided episode goes directly to the finale.

Every completed lift shows its operators, illustrated handling, the last Catch response, and its outcome. The pictures summarize public observations; they are not chronological replay frames or proof of what caused an outcome. **Look closer** enlarges the observations; **More detail** contains the factual text. Heist totals appear only after the entire act, never against an individual lift.

All eight contestants have fixed seats in **Pick a face**, including your unvotable **YOU** seat and removed contestants marked **OUT**. Votes and incoming counts are public immediately. Each voter points a finger at their current target; the direction follows the screen layout. The same players in **The lifts** are voting shortcuts, including when reviewing older rounds. Self-voting, removed targets and targets outside a runoff stay disabled everywhere.

A tap casts a **hunch** immediately. **I’m sure!** becomes available after choosing someone and toggles a public certainty marker, without changing vote weight. Choosing a different target starts as a hunch again. Players can change or skip their vote until **Lock vote** or the deadline. Certainty and locking are separate. Once everyone still onstage locks (eight players in the first round), the remaining timer is skipped. Otherwise the deadline counts each latest choice, including unlocked votes. Bots cast and lock at their scheduled decision time.

The contestants with the most votes wear a temporary green snake hood; all tied leaders receive it, and zero votes produce no hood. It follows the public count, never the hidden role. A runoff resets votes, certainty, locks, counts and fingers, retaining all eight seats but only allowing tied targets. All active contestants vote again. A second tie leaves everyone in play. The result reveals only the removed contestant’s role.

Watch mode and backstage show the same public information but cannot cast the human ballot. **My role** reveals your own private card on request. **Pause** freezes the clock with an inline **Resume** bar. Desktop puts voting beside the pictures; narrow layouts put voting first.

The illustrations match the cast's onstage clothing, hair, skin, and glasses. Touch controls, keyboard selection, text equivalents, and reduced-motion preferences are supported. This visual direction still needs comprehension testing with the intended audience; implementation checks do not establish that children understand the clues.

## Bot behavior and evidence

Bots steer the capsule toward the center and slow it before it overshoots. They use its position and physical slide velocity to choose a target tilt, then operate their own cable to approach that tilt while climbing. The controller works on both axes of a three-cable tray and respects the tuned width. This replaces the earlier level-first controller and its extra hold allowance on a loaded corner. Skill controls reaction delays, momentum anticipation, occasional over-pulls, and planned Catch accuracy. Catch plans are real input times derived from the configured window and zone. Snake bots retain their sabotage strategy: they know their own team, contend for the same Rig reservation, choose whether to over-pull or drop their boosted cable, and intentionally mistime Catch. They stop initiating sabotage after their team reaches two heists. All outcomes arise from the physical simulation and accepted taps.

Every station contributes three receipts, in fixed location order: **outcome**, **the longest sustained observed handling interval**, and **the last Catch response**. Handling intervals consider high-held Pull, low-idle, and high-released Pull; ties use contestant number. Intervals shorter than 0.2 seconds are reported as no sustained interval. Selection never consults secret events or roles. Live receipts never name Rig, a diverter, a motor multiplier, or an active role. Heist totals become public only after the act ends. Older receipts remain accessible.

Loyal bots weigh these public cards with random uncertainty, retaining decaying suspicion across acts. They never query other roles to choose a ballot. Snakes use the same evidence plus their legitimate teammate knowledge to deflect votes. Bots are fallible rule-based agents, not language models or models of human social behavior.

Casting is 10 seconds, challenge up to 45, combined review/vote up to 35, runoff up to 10. Each resolved ballot has an additional five-second readable reveal. The finale remains open for inspection. With no early finishes or unanimous locking, three-act browser play reaches the finale in **265–295 seconds** (10 + 3 × (45 + 35 + 5), plus runoffs), with optional pauses adding time. The finale is manually dismissible; its viewing duration is not capped at the brief’s 20-second target. Completed lifts, unanimous locks, practice and early wins can finish sooner.

## Development timer controls

The sticky **DEV · TIMERS** bar is available in normal play, practice, watch mode, and voting fixtures. Opening lift pictures or instructions brings the same controls into the dialog so they remain accessible. **Freeze timer** stops only the current phase countdown. Physics, movement, bot decisions, Catch, Rig, voting, and animations keep running. It also holds the phase open after all lifts finish or everyone locks a vote; **Resume timer** permits the pending transition. It works for casting, the lift round, voting, runoff and the result reveal. The lobby and finale have no running phase countdown.

**Other timers** independently freezes Catch (including the falling-capsule animation and tap window), Rig (hold and burst duration), or reload (including the short post-Catch reset). Each switch applies to that mechanic at every lift. Inputs can still resolve or cancel an action. Bot reaction times and physical movement are never frozen by these switches. The normal **Pause** button and Escape still pause the whole game.

Frozen clocks resume at their saved time without catching up. Switches remain set across phases; starting a new episode or practice resets them. Timer holds are development tools and can extend a round beyond the normal duration.

## Run and validate

From the repository root, optionally serve the game:

```sh
python -m http.server 8000 --bind 127.0.0.1 --directory concepts/snake-show/browser
```

Then open `http://127.0.0.1:8000`. Direct `file://` opening works too.

JavaScript and CSS URLs in `index.html` include content versions so an updated page does not reuse older cached controls. After editing an asset, update its `?v=` value to the first 12 lowercase hex characters of its SHA-256 hash. Verify the served page after a normal reload; a fresh isolated browser alone does not reproduce an existing tab's cache.

Run the dependency-free engine suite:

```sh
node --test concepts/snake-show/browser/tests/engine.test.cjs concepts/snake-show/browser/tests/tuning.test.cjs concepts/snake-show/browser/tests/bots.test.cjs concepts/snake-show/browser/tests/voting.test.cjs
```

For repeatable UI checks, open [the voting fixtures](tests/voting-harness.html) on the same local server. They provide paused, clearly labeled empty and public vote boards, **Next bot vote** and **Bots lock votes** controls, early-finish previews, **Finish another lift**, **Timer ends**, runoff, deadlock, both role reveals, watch, backstage, and prior-round scenarios. The fixture buttons drive the existing test entry point; they do not appear in normal play.

Optional browser checks require an existing Playwright installation and Chromium:

```sh
node concepts/snake-show/browser/tests/browser-smoke.cjs
node concepts/snake-show/browser/tests/tuning-browser.cjs
```

Set `PLAYWRIGHT_MODULE` to an installed Playwright module path, `PROTOTYPE_BROWSER` to a Chrome/Chromium executable, and optionally `PROTOTYPE_SCREENSHOTS` to a screenshot output directory. Generated `test-artifacts/` is ignored. The browser tests launch an isolated headless browser against these local files, exercise actual controls, and check narrow layouts and errors. They never attach to an existing user browser.

Append `?seed=11` to reproduce a cast and bot random stream; different human actions can still change its path. `?seed=11&test=1` additionally exposes the `snakeShowTest` inspection hook used by the browser suite. It is absent without the explicit `test=1` query. The full local state is inherently inspectable; hiding roles in the interface is not production secrecy.

Before using this as evidence about the Roblox game, playtest comprehension, timing, observation across cameras, phone controls, and two-/three-cable balance with real players. Bot outcomes do not establish social deduction quality, multiplayer fairness, or retention.
