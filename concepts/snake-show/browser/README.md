# The Midnight Fair — playable 2D browser adaptation

Updated 10 September 2026 · Based on [design v3](../midnight-fair-design-v3.md), [Moonmop Lift](../challenges/moonmop-lift.md), and the selected [Moonmop character](../creatures/moonmop.md).

Open [index.html](index.html). The connected prototype now includes a lantern fair, protected Moonmop pods, Keeper/Trickster roles, immediate public voting, team-victory adoptions, and a saved local nursery. It remains one player with local bots, with no build step, package installation, external assets, account, or runtime network dependency. The independent [interaction studies](../prototypes/README.md) keep their own code and historical presentation.

## Play and return to the fair

- **Play with 7 bots:** play Maya in an eight-player cast, with six Keepers and two secret Tricksters. A round uses Moonmop Lift for up to three trials.
- **Practice a lift:** train with one clearly labeled Keeper bot. It uses the same physics and grants no adoption.
- **Watch bots:** all eight players run autonomously; 1×, 2× and 4× playback are available. Watching grants no adoption and exposes no live secret roles.
- **My Nursery:** inspect particular babies, nickname and favorite them, pet them, turn their 2D view, and settle them to sleep. Choose one walking companion or arrange three ordered showcase slots.
- **Meet & present:** inspect Leo’s bot companion, react or pet, Present your own companion, gather on a blanket, or pose in a portrait nook. These are local interaction studies with fixed bot responses and a shared two-second reaction cooldown. Visitor petting and reaction-effect preferences save locally. There are no like counts or care penalties.
- **Exchange garden:** propose one specific baby for one from Leo’s labeled bot collection. This is a scripted exchange study, not a real player market.

The named nursery, exchange and challenge tents also respond to **E** when you walk nearby. The sign at the bottom of the garden enters a round. The nursery and social interfaces are available outside the live round; owned babies never enter the challenge or change its physics.

## Controls and two-motor rules

| Action | Keyboard | Pointer / touch |
| --- | --- | --- |
| Walk in the fair garden | WASD or arrows | Tap a destination or use direction buttons |
| Use a nearby tent or console | E | Lobby buttons; Join console / Watch nearby lift |
| Raise your cable | Hold Space; release to lower | Hold Pull |
| Catch a slipping pod | C, once per fault | Catch in the gold zone |
| Rig as a Trickster | Hold R at your console or spotter rescue area | Hold Rig |
| Pause / resume | Escape | Pause / Resume |

Every lift retains exactly two operators, motors and cables. Pairings rotate. When a removal leaves an odd cast, the removed player’s last partner spots the next trial: no console, but movement between rescue areas, Catch, voting, and the same team reward opportunity. A deadlock preserves the spotter. A Trickster spotter can arm a nearby pod without changing either motor.

One shared Rig attempt is available per trial. An operator’s completed hold arms the pod and temporarily changes their motor; an unrescued armed spill completes a diversion. Catch clears the diverter and motor burst without refunding the attempt. Delivery, a safety-boundary failure, or the deadline defeat an unresolved Rig. Two successful diversions **and** a surviving Trickster after the final required vote are necessary for a Trickster win. Removing both Tricksters or making two diversions impossible gives the Keepers an early win. Deliveries are a separate count, never an extra victory or personal reward requirement.

The pod is clear and protective. The same opaque housing hides ordinary recovery and secret diversion above the theatrical lava. A tray reaching the lower boundary immediately fails, with no Catch or diversion from that contact. Public pictures never identify the diverted station. Both finale scenes welcome safe babies into a nursery.

Selecting a station view grants no remote control or rescue eligibility. Leave console to walk, help Catch nearby, or return to your assigned console. Space drives the winch while operating your console even if another button has focus; Enter activates that button. Inputs release on focus loss, and the game pauses until explicitly resumed. Sound is optional and defaults off. Reduced-motion preferences suppress decorative motion. HTML controls and text accompany the canvas; this is not a complete nonvisual gameplay interface.

## Clues and public voting

After all lifts finish or 45 seconds expire, clues and voting open **together**, with one **35-second clock**. There is no separate waiting period before voting. Early finishers can inspect completed public clues while the other lifts continue; voting starts when the challenge resolves. Previous trials remain available from the Trial selector.

Every lift contributes its outcome, longest observed handling interval, and last Catch response. The spotter adds their longest rescue-area stay and saves/misses. These factual observations never consult roles, private Rig events, or the secretly selected route. Trial-wide diversion totals appear after challenge resolution.

Votes are public from the first choice: live counts, pointing, hunch/certainty, tied-leader costumes, and per-player locks. Tap a face or its clue-card shortcut to vote. Change your hunch, skip and return, or select **I’m sure!**; certainty is expressive and never adds vote weight. Changing the target resets certainty. **Lock vote** freezes your choice and confidence. The latest valid choice counts at the deadline even if unlocked; all active players locking ends the vote early unless its developer clock is frozen. No self-votes. A tie opens a 10-second runoff among tied leaders; another tie removes nobody. The finale reconstructs individual voter → target choices.

This is the user-approved prototype contract recovered from Git commit `b0d1d65` on 10 September 2026. It is the default on the normal page, with no ballot-mode query parameter. The **Public votes** developer scene merely pre-fills example choices. Roles and private sabotage remain secret until their intended reveals.

**New round** immediately starts a fresh playable round, including from practice results and spectating. **Return to the fair** is a separate action for nursery access.

Removed players can observe public views, clues and results, with no active controls or votes. **Return to the fair** lets the old round finish in the background in this tab while the player browses or starts another round. Its eligible adoption arrives once at its own finale. Background rounds pause when the page is paused or hidden; they are not saved across a reload or closed tab. Leaving an active, unfinished round abandons it without a reward. These are local study constraints, not production departure rules.

## Adoption, identity and saving

Each participating member of the original winning team is entitled to one baby, even after a vote-out. The local player’s individual is saved only after the finale; repeated claims for the same round/player do not create duplicates. Practice, watching, incomplete rounds, losses, and developer scenes grant none. Delivery, Catch and Rig success do not affect eligibility, quantity or color.

**Temporary participation assumption:** an accepted control attempt, movement during a trial, opening/reviewing clues, or casting/abstaining on a ballot qualifies. No success or time quota is imposed. The bots are assumed to participate. Production AFK, departures and reconnection rules remain open; the prototype does not validate them.

Individuals have unique IDs, nicknames, variants and origin entries. Same-color babies remain separate records while counting as one owned variant. A round reward describes the team victory, not a personal save. An exchanged baby retains its original origin, including an explicit study origin for Leo’s starter babies.

The provisional palette tests differing rarity with shared odds for both teams:

| Study color | Study rarity | Chance per award |
| --- | --- | --- |
| Lilac | Common | 50% |
| Peach | Common | 25% |
| Mint | Uncommon | 15% |
| Midnight blue | Rare | 8% |
| Pearl | Very rare | 2% |

These names, tiers and probabilities are implementation fixtures, **not approved rarity decisions or measured acquisition targets**. The trial always shows the signature lilac pod. A separate seeded color draw keeps the palette independent of role and personal performance; the same test seed reproduces the color. The in-game collection-study details disclose the odds. Every shade uses the same art and affection controls.

Three proposed badges are exercised locally: **First Friend**, **Both Sides of the Moon**, and **Moonmop Devotee** (own all five explicitly listed study colors simultaneously). Badge unlocks remain after an exchange; one equipped badge appears beside Maya’s lobby name. Current holdings are counted separately. These are draft requirements and permanence behavior, not new product approvals.

Nursery ownership, claim receipts, completed exchanges, preferences and equipment save together under `midnight-fair-nursery-v1`. Lift tuning keeps its existing separate key. Browser storage is origin-specific: direct-file and served play may use different saves. An unreadable snapshot is preserved; storage failure falls back to a clearly reported temporary session. There is no cloud save, server authority or coordination between multiple tabs. Use one game tab per saved collection. Clearing browser data removes the local collection.

## Exchange study

Select the exact individual on each side, inspect nickname/species/color/rarity/origin, ask Leo to confirm, then confirm the current arrangement. Leo deliberately accepts any one unlocked baby for one of his offers; this tests the interface rather than trading demand.

Every offer edit clears both confirmations. Canceling or closing an uncompleted proposal transfers nothing. A completed exchange moves both offers in one saved snapshot and records a transaction ID so retrying it cannot duplicate a transfer. Favorites must first be deliberately unlocked in My babies. The review warns when giving away the last copy of a variant or clearing a companion/showcase slot. Successful exchanges clear affected equipment while retaining origins and earned badges. No currency, automatic price or real-money value is introduced.

This tests single-tab local ownership behavior. Multiplayer acceptance, conflicting clients, interrupted server transactions and reconnect recovery still require authoritative implementation and testing.

## Lift tuning and approved preset

The user approved the current browser configuration on **8 September 2026**. The complete 20-setting snapshot is saved as [approved-2026-09-08.json](presets/approved-2026-09-08.json): winch width 1.2, bot skill 20%, static friction 0, sliding friction 0, and the remaining values as captured from the game. To restore it later, paste that file into **Export / import a draft** and select **Apply pasted draft**. The sliders remain available for further experiments.

Select **Tune lift** in the top bar. It exposes all 17 sliders from the coupled-cables prototype with the same ranges, increments, and baseline values, plus **Winch width**, **Bot skill**, and the round’s **Hold to arm Rig** setting. Every slider also has an editable numeric value. Changed fields are marked with a dot.

**Winch width** is the first slider, under **Frame**. It changes the cable span from 0.8 to 3.0 units (reference width: 2.0). The frame, cable mounts, and tray resize live. Narrower spans produce more tilt at the same cable-height difference and give the pod a shorter distance to slide off. Resizing preserves the pod’s relative position, load distribution, physical slide velocity, and cable heights; it does not restart an attempt. Older saved drafts inherit the reference width.

**Bot skill** is under **Bots**, immediately after the Frame group. It ranges from 0–100% in 5-point steps (draft baseline: 75%). It controls all bots’ lift reaction time, anticipation of the ball’s momentum, handling mistakes, and Catch accuracy. A live edit takes effect on the next motor decision and clears a current added handling mistake; Catch plans use the skill at the start of their fall. At 100%, bots use the quickest reactions and no added handling mistakes, while still being limited by the cables and the other operators. The setting saves and exports with the rest of the draft.

Motor force, upward/downward caps, winch drag, gravity, tap pulse, pod weight, slide response/drag/friction, Rig multipliers/duration, and Catch timing feed the actual simulation. Edits apply to all current lifts and carry into future trials and rounds. **Start offset** affects the next loaded pod or a restart, never teleports a pod already in play. Changing tap pulse affects future taps. Rig duration is recalculated from the existing arm time; extending it can extend a still-armed pod’s burst. Changing Catch duration retimes its current fall and needle; previously spent taps and consumed team attempts stay spent.

**Restart same practice** starts a two-person practice lift with the current draft and the same random seed. It resets the practice run, making input comparisons repeatable. **Restore prototype** restores the baseline values live; it does not reset the round or refund sabotage. Neither action establishes settled presets.

Drafts are stored locally in this browser under `snake-show-lift-draft-v1`, separately from game progress. They survive refreshes and browser restarts on the same origin. If storage is unavailable, settings remain usable for the current tab. **Export / import a draft** provides versioned JSON to paste into a conversation or save elsewhere. An invalid or out-of-range import leaves the current settings intact. The original prototype and its defaults are not edited when tuning the game.

**Motor readouts** shows each end’s height, share of the pod load, recent hold percentage, and estimated required hold. These use the prototype’s measurements; the required hold estimate assumes an unboosted motor and cannot expose a secret Rig. Live readouts are separate from the limited clues used for voting. The tuning panel also shows theoretical speeds, static tilt threshold, best-case climb time, and effective Catch-zone duration. These are model estimates, not observed balance results.

## Bots, timing and development controls

Bots retain the existing controller: predicted pod motion determines target tilt and their own motor input. Skill changes reaction time, anticipation, mistakes and Catch timing. Trickster bots share Rig reservations, know their teammate and can sabotage; Keeper ballots use public clues with uncertainty. Spotters walk between rescue areas at the same movement speed. Bot results do not establish human cooperation quality or game balance.

Timing remains a documented adaptation: casting 10 seconds, each challenge up to 45, combined clue review/voting up to 35, runoff up to 10, and a separate readable result pause of 5. Without early finishes or unanimous locking, three trials reach the finale in **265–295 seconds**: `10 + 3 × (45 + 35 + 5)`, plus runoffs. A 20-second finale would make **285–315 seconds**, 15 seconds beyond v3’s target. The finale stays open for inspection and nursery browsing. Pauses and developer timer holds can extend play further.

[Developer scenes](index.html?dev=1&scene=vote) cover private roles, public votes, Catch, early completion, runoff/deadlock, role reveals, finale, watching, rest-area spectating and trial-two history. Scenes preserve lift tuning and grant no babies; all rounds in a `dev=1` tab are reward-free. Legacy `roleSnake` and `roleLoyal` scene IDs still load the renamed role cards; `Snake` and `Loyal` still open their role-reveal scenes.

The **DEV · TIMERS** bar remains available during normal play. Freeze a phase countdown while physics and accepted inputs continue, or independently freeze Catch, Rig and reload timers. Opening instructions or clue details brings the same timer controls into the dialog. The full Pause remains separate. Scene steps act only on their current phase, including clue review.

## Run and validate

From the repository root:

```sh
python3 -m http.server 8000 --bind 127.0.0.1 --directory concepts/snake-show/browser
```

Open [the local game](http://127.0.0.1:8000/). Directly opening `index.html` also works. No package installation or build is required.

Run the dependency-free suite:

```sh
node --test concepts/snake-show/browser/tests/engine.test.cjs concepts/snake-show/browser/tests/tuning.test.cjs concepts/snake-show/browser/tests/bots.test.cjs concepts/snake-show/browser/tests/voting.test.cjs concepts/snake-show/browser/tests/dev-tools.test.cjs concepts/snake-show/browser/tests/nursery.test.cjs
```

Optional browser checks require an existing Playwright installation:

```sh
node concepts/snake-show/browser/tests/browser-smoke.cjs
node concepts/snake-show/browser/tests/tuning-browser.cjs
node concepts/snake-show/browser/tests/nursery-browser.cjs
```

Set `PLAYWRIGHT_MODULE` to an existing Playwright/Playwright Core module and `PROTOTYPE_BROWSER` to an installed Chromium/Chrome executable if needed. `PROTOTYPE_SCREENSHOTS` selects the screenshot folder. The nursery suite requires the server above, or a `PROTOTYPE_URL` pointing to its `index.html`; it verifies exact asset hashes and normal reloads in the same browser context. Generated `test-artifacts/` files are ignored.

The suite covers two-motor invariants and spotters, baseline physics, Rig/Catch, phase deadlines, immediate public voting, confidence and locks, developer scenes, team entitlement and claim retries, persistence, duplicate individuals, exchange constraints, badge/current-holding separation, pending vote-out rewards, and desktop/320/390/768px layouts. It does not establish production security, multiplayer reliability, audience comprehension, or balance.

Append `?seed=11` to reproduce the cast and bot stream. `&test=1` additionally exposes `snakeShowTest` for the isolated suite; it is absent in ordinary play. Internal `SnakeShow`, `Episode`, `act`, `pot` and `heists` identifiers remain for compatibility with the existing studies and fixtures; visible language follows v3. Offline state is inherently inspectable.

After editing browser JavaScript or CSS, update each referenced `?v=` in `index.html` to the first 12 lowercase hex characters of that file’s SHA-256 hash. Check the served page after a normal reload as well as in isolated tests.

## Preserving approved prototype behavior

A new setting, vocabulary, creature or collection system builds on the working game. Compare behavioral changes against the last working revision before changing implementation or tests. The recovery reference is `b0d1d65`; its voting, input, timer, pairing, spotter, physics, bot and tuning assertions are retained with only the new fictional names and safe-landing copy adapted.

Protect the default experience in tests: a hidden flag or skipped phase must not be needed to reproduce an approved interaction. Keep the shared 35-second vote, public signals, quick replay, independent developer clocks, Space-at-console focus behavior, numeric tuning controls, saved drafts and the approved preset unless the user explicitly changes those decisions. Update the current brief when an older written rule conflicts with an explicit user decision. These checks preserve behavior; they do not establish player comprehension or production balance.
