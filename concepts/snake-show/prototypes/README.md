# Snake Show interaction prototypes

5 September 2026 · Proposed interactions based on the [design brief v2](../snake-show-design-brief-v2.md).

Open [the prototype room](index.html) in a modern browser. All new pages work directly from disk, with no build, account, network requests, fonts, or external assets. Keep the HTML files, scripts, and `prototype.css` together. The existing Prize Lift files are unchanged.

## What to try

| Prototype | Interaction to evaluate | Start here |
|---|---|---|
| [Catch & Rig](catch-and-rig.html) | Two-pass rescue timing, independent taps, and one shared Snake attempt | Start an act. Hold Leo’s Rig until armed, trigger a spill, then tap Maya’s Catch inside the marked zone. |
| [Receipts & live vote](receipts-and-vote.html) | Evidence coverage, private suspicion, ballots, runoffs, removal, and the finale | Start an episode; skip the challenge playback, browse each station’s receipts, then select and seal a ballot. |
| [Lobby & backstage](lobby-and-backstage.html) | First interaction, practice while queued, cosmetics, voluntary spectating, and requeue | Walk to Practice, hold Pull, and join the simulated queue. Use the removal scenario to reach backstage. |
| [Prize Lift · coupled cables](prize-lift-coupled-cables.html) | Motor forces, load sharing, tilt, sliding, and physical sabotage | The existing interactive physics model and sliders. |

The new prototypes isolate interactions around Prize Lift. They do not add challenge families or modify the detailed design. Their shared appearance uses original HTML/CSS/SVG shapes.

## Catch & Rig

- `R` / `T`: hold Rig as Leo / Nia. Releasing early cancels the reservation. A fault also cancels an unfinished hold. The first accepted reservation wins; completing it consumes the act’s one team attempt.
- `C` / `V`: Catch as Maya / Omar. Pointer and focused-button keyboard input also work. An unsuccessful tap consumes only that player’s opportunity. A pre-held input requires release and a new press after the prompt.
- The focused fixture contains a three-operator station with Maya, Leo, and Nia, plus Omar in the rescue area. Only Maya and Omar’s Catch inputs are controlled; the other operators abstain. The static scene is a schematic, without triangle physics.
- The public log contains the same fault and loss messages for armed and innocent capsules. A private Snake panel exposes reservation, Rig, and diversion state for inspection. The public heist counter updates only when the act ends.
- The 5-second burst can expire while the capsule’s diverter remains armed. Catch clears both. A replacement capsule inherits no rig; a consumed attempt stays consumed. Reload takes 3 seconds. Timeout, safe delivery, and water drops defeat unresolved attempts without creating heists.
- Sliders configure the next act: Rig hold 1.5 s, Catch window 3 s, and a 0.25 s opportunity on each of two passes. The act deadline is 45 s. The target is centered at 50% of the track; a linear needle traverses the track and returns.

Try an innocent spill, release Rig just before completion, contend for the reservation, miss Maya’s tap then save with Omar, disable Omar’s rescue eligibility, pre-hold Catch, and allow an armed drop to go unrecovered. Blur releases held inputs and pauses; Resume is explicit. Hidden tabs pause. No network latency allowance is simulated.

## Receipts, voting, and reconstruction

This is an episode state-machine rehearsal with **scripted challenge events and other-contestant ballots**. It is not a multiplayer match or a model of human deduction. Roles are fixed for repeatable scenarios: Leo and Nia are the two Snakes. Maya is the default playable contestant; switching to Leo resets the episode and exposes his private Snake objective.

The challenge fixture rotates partnerships, using a three-person station when the active cast is odd. By default it produces a heist in acts 1 and 2 if a Snake remains, alongside an innocent failure. Other stations deliver. The director can instead disable heists to exercise an early Loyal win. Challenge actions and ballot scripts are test fixtures, not proposed game automation. Scripts that target a role deliberately consult the full cast to exercise win conditions.

**Proposed evidence coverage:** every station contributes exactly three cards in fixed location order: outcome, a recorded held/released action, and the Catch or safe-capsule response. The board shows one station at a time and retains earlier acts. No public card includes Rig, motor speed, concealed routing, or an active contestant’s role. Full event records become visible only in the finale. A private suspect selection is an unshared note per act; it does not submit a ballot.

Each active contestant may seal one vote for another active contestant. Missing ballots are abstentions. Totals stay hidden until close. A top tie opens a 10-second runoff among tied contestants, with every active contestant voting again and no self-votes. A second tie removes nobody and uses that act’s vote. All-abstention ballots are treated as ties at zero. A human ballot can break the director’s split-vote pattern.

Snakes need two heists and at least one Snake still active after the third vote. Removing both Snakes or exhausting two heist opportunities produces an early Loyal win. Removed contestants lose their ballot, keep the public receipt board, and share their original team’s result. The finale reveals all roles and lets the reviewer step through recorded challenge events and ballots.

Timing defaults: casting 10 s; challenge 45 s; evidence 10 s; vote 25 s; runoff 10 s; finale 20 s. Playback can run at 1× or 4×. Skip advances a phase, result screens pause for review, and hidden tabs pause. These pauses add wall-clock time beyond the brief’s 270–300-second budget. No reward quantities are assigned in this prototype.

## Lobby and backstage

Tap a destination for a walk around the pool, or use WASD, arrow keys, and the phone direction buttons. Enter or the context button opens a nearby station. The practice capsule uses an intentionally simplified single lever: about 2.1 seconds of holding reaches the line; releasing lets it sink. It teaches one action without awarding episode progress. Full physics remains in Prize Lift.

The queue fills eight simulated slots over 12 seconds by default, adjustable from 4–40 seconds. Practice and dressing remain available while queued. Joining shows a private casting card and a link to the independent episode rehearsal. The pages do not transfer game state to each other.

The director’s **Simulate participation + removal** action records meaningful episode participation and moves Maya backstage as a revealed Loyal. Backstage shows only public act-one evidence and outcomes. New Episode leaves and starts a fresh queue. Cosmetics remain equipped in this tab.

**Illustrative rewards:** participation gives 20 Fame / 10 Show Credits; a later Loyal team win adds 10 / 5. These are test values, not an economy specification. Fame is non-spendable progress; Show Credits are earned cosmetic currency; neither is the Prize Pot. No store or purchases are modeled.

Use **Resolve old episode / retry delivery** after requeueing to exercise delayed rewards. The local ledger keys each award by episode and reward kind. Repeated delivery cannot add credit twice. Incomplete episodes and team losses keep participation without a win bonus. Resolution is a director simulation, not a backstage player power. Reloading resets all state; this is not a persistent service or a durable exactly-once delivery guarantee.

## Build and validation

No build or package installation is needed to play. Optionally serve the folder from the repository root:

```sh
python3 -m http.server 8000 --bind 127.0.0.1 --directory concepts/snake-show/prototypes
```

Run the dependency-free rule checks with Node.js:

```sh
node concepts/snake-show/prototypes/tests/rules.test.cjs
```

The optional browser smoke test requires Playwright and a compatible Chromium installation. With `playwright` available to Node and its browser installed:

```sh
node concepts/snake-show/prototypes/tests/browser-smoke.cjs
```

Environment overrides:

- `PLAYWRIGHT_MODULE`: path to an existing Playwright module, when not available through normal Node resolution.
- `PROTOTYPE_BROWSER`: path to an installed Chrome/Chromium executable.
- `PROTOTYPE_SCREENSHOTS`: optional output directory for desktop and phone screenshots.

Browser checks exercise actual controls, cancellation and rescue, both winning teams, early endings, runoff/deadlock, backstage requeue and reward retries, and overflow at 320, 390, and 1360 pixels. The rule suite covers authorization and state edges that are harder to hit manually. Tests do not measure real-device latency, accessibility with assistive technology, performance on Roblox, or player comprehension.

## What still needs a real playtest

Ask players to explain what Heists counts, what a receipt establishes, why a Catch failed, and whether leaving backstage forfeits a team reward. Observe the time to the first useful lobby interaction and whether players choose another episode without prompting. Use actual multiplayer sessions to test evidence quality and trust: a deterministic solo fixture cannot validate social deduction, secrecy, retention, matchmaking, or balance.

All hidden data exists in this browser. Production authority, private replication, validated inputs, disconnect rules, storage, and secure rewards still require implementation and validation. The unresolved per-Snake-versus-team attempt rule and edge-versus-center rescue reset remain open in the brief; these studies use its main proposal of one team attempt and a center reset.
