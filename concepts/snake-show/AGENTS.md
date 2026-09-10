# The Midnight Fair and Snake Show study guidance

This folder holds The Midnight Fair concept and the earlier Snake Show studies:
the current brief, challenge and creature records, supporting explorations,
archived briefs, reference images, and two independent browser codebases. Start with `README.md`.
The repository-level `AGENTS.md` still applies; this file adds concept-specific
rules.

## Documents and sources of truth

- `midnight-fair-design-v3.md` is the current consolidated design draft and the
  source of truth for cross-system rules, scope, and decision status. It
  explicitly distinguishes agreed direction from proposals and existing browser
  behavior. `archive/snake-show-design-brief-v2.md` preserves the earlier design;
  historical documents defer to the current design set when they disagree.
- `challenges/README.md` indexes one document per challenge.
  `challenges/shared-rules.md` owns the common challenge contract; individual
  challenge pages own controls, physical Rig effects, recovery, tuning, and tests.
  Keep the detailed Moonmop Lift rules in `challenges/moonmop-lift.md`.
- `creatures/README.md` indexes one record per species for identity, nursery
  behavior, palette proposals, art references, and status. Link each creature
  and its challenge in both directions. Update both catalogues when adding one;
  use the `_template.md` files as starting points, not adopted specifications.
- Keep the concept root for the current brief, navigation, and agent guidance.
  Replaced briefs and obsolete standalone artifacts belong in `archive/`;
  age or consolidation into the brief alone is not a reason to archive useful
  exploration. The browser folders keep their existing paths. Do not turn an
  extracted candidate into an adopted feature.
- Read the repository's `user-notes.txt` before changing the brief or any
  exploration. Never edit that file.
- `explorations/` holds open alternatives, supporting research, design passes,
  and rationale that still informs current decisions. Its README explains each
  document's relevance and status. A document may contain both useful and
  superseded material: mark the superseded sections and point to current rules
  instead of archiving the whole document. Preserve dated analysis and repair
  links when relocating it. Archive an exploration only when its useful content
  has been retired or fully replaced, with a pointer to the replacement.
- `images/challenges/` and `images/creatures/` hold reference art and dated
  generation notes. Earlier versions remain available for provenance. Only an
  explicit user decision recorded in the current brief or creature record makes
  art selected; a filename or illustration does not establish adoption.
- When the brief records a decision that the browser game does not implement,
  say so explicitly in both places rather than leaving the two to disagree.

## Preserve approved browser behavior

- A premise, art, vocabulary, or collection migration must preserve approved
  prototype interactions unless the user explicitly changes them. The latest
  brief's draft or inherited rules do not silently override subsequent user
  decisions. Reconcile the brief when a conflict is found.
- Before changing behavior, compare with the last working implementation and
  its tests. `b0d1d65` is the pre-Midnight-Fair recovery reference. See
  [the browser behavior contract](browser/README.md#preserving-approved-prototype-behavior).
- Voting is public and available immediately when challenge resolution opens
  the combined 35-second clue/vote screen. Preserve pointing, live totals,
  hunch/certainty, locking, shortcuts, runoff and replay. Roles remain secret.
- Keep existing behavioral assertions through presentation changes. Do not
  make a regression pass by changing the expected timing, skipping a new gate,
  or enabling an experimental flag. Check the normal page and normal reload.

## Two browser codebases, kept independent

- `prototypes/` contains the original interaction studies. They test single
  interactions in isolation and do not establish Roblox multiplayer behavior or
  balance.
- `browser/` contains the connected 2D browser adaptation with bots, tuning,
  and voting.
- Do not share code, styles, or fixtures between the two folders. A change in
  one must not require a change in the other.
- Both are plain HTML, CSS, and JavaScript with no build step and no package
  installation. Do not introduce a bundler, a package manager, or runtime
  dependencies.

## Interaction prototypes (`prototypes/`)

Open `prototypes/index.html` directly, or serve the folder from the repository
root:

```sh
python3 -m http.server 8000 --bind 127.0.0.1 --directory concepts/snake-show/prototypes
```

Run the dependency-free rule tests:

```sh
node concepts/snake-show/prototypes/tests/rules.test.cjs
```

Optional browser checks use an existing Playwright installation:

```sh
node concepts/snake-show/prototypes/tests/browser-smoke.cjs
```

See `prototypes/README.md` for browser dependency overrides, scope, and manual
validation scenarios.

## Connected 2D game (`browser/`)

Open `browser/index.html` directly, or serve the folder from the repository
root:

```sh
python -m http.server 8000 --bind 127.0.0.1 --directory concepts/snake-show/browser
```

Run the dependency-free engine suite after any change to game logic:

```sh
node --test concepts/snake-show/browser/tests/engine.test.cjs concepts/snake-show/browser/tests/tuning.test.cjs concepts/snake-show/browser/tests/bots.test.cjs concepts/snake-show/browser/tests/voting.test.cjs concepts/snake-show/browser/tests/dev-tools.test.cjs concepts/snake-show/browser/tests/nursery.test.cjs
```

Optional Playwright checks:

```sh
node concepts/snake-show/browser/tests/browser-smoke.cjs
node concepts/snake-show/browser/tests/tuning-browser.cjs
node concepts/snake-show/browser/tests/nursery-browser.cjs
```

The nursery browser suite uses the HTTP server above (or `PROTOTYPE_URL`) and
checks collection flows, immediate public voting, and normal reloads. It uses an isolated
browser context. Developer scenes grant no collection rewards.

Cache-busting rule, required after editing any JavaScript or CSS file in
`browser/`: update that file's `?v=` value in `browser/index.html` to the first
12 lowercase hex characters of the file's SHA-256 hash. For example:

```sh
sha256sum concepts/snake-show/browser/app.js | cut -c1-12
```

Verify UI changes on the served page after a normal reload as well as in
isolated tests. A stale cached script can leave new controls visible but
unresponsive, and a fresh headless browser does not reproduce that.

Use the built-in developer scenes (`index.html?dev=1&scene=vote`) for
repeatable UI checks. See `browser/README.md` for bot behavior, adaptation
choices, the approved lift preset in `browser/presets/`, and Playwright
environment overrides (`PLAYWRIGHT_MODULE`, `PROTOTYPE_BROWSER`,
`PROTOTYPE_SCREENSHOTS`).

## Validation

- For documentation changes: check links, headings, terminology, arithmetic,
  and consistency with the design brief.
- For `browser/` changes: run the engine suite, update `?v=` values, and check
  the served page. Run the Playwright scripts when a browser is available and
  report any assertion that fails rather than skipping it silently.
- For `prototypes/` changes: run the rule tests and, when possible, the smoke
  test.
- Generated `test-artifacts/` output is ignored by Git and must not be
  committed.
