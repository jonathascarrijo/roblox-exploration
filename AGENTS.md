# Repository guidance

## Purpose

This repository develops and evaluates original Roblox game concepts. It is
currently documentation-first: concept pitches and design briefs live in
`concepts/`, while platform, market, and policy research belongs in `research/`.

## Sources of truth

- Read `user-notes.txt` before changing a concept. It contains user-owned
  direction and must never be edited by an agent.
- Treat the latest detailed design brief as the source of truth when shorter
  concept documents disagree with it.
- Preserve uncertainty. Clearly distinguish confirmed behavior, prototype
  targets, proposals, and assumptions.

## Editing expectations

- Make focused changes and preserve unrelated work, including untracked files.
- Use clear Markdown with descriptive headings, compact paragraphs, and tables
  only when they improve comparison.
- Keep terminology internally consistent. Define specialized game terms before
  relying on them.
- Do not silently broaden the audience, business model, feature set, or technical
  scope of a concept.
- Favor concrete player-visible rules over vague design language.
- Do not add implementation code unless the task requests it. If a codebase is
  introduced, update this file with its build and test commands.

## Roblox research

- Roblox policies, prices, APIs, discovery guidance, and publishing requirements
  are time-sensitive. Verify them against current official Roblox sources before
  making factual claims.
- Prefer Creator Hub documentation, Roblox Support, official newsroom posts, and
  staff announcements on the Developer Forum. Use third-party sources only when
  official material does not provide the needed fact, and label the limitation.
- Date policy and market research and include direct source links.
- Call out conflicts between official pages instead of choosing a convenient
  interpretation. For financial or eligibility decisions, direct the reader to
  confirm the live Creator Hub or checkout terms.
- Keep all intellectual property original and flag mechanics, names, imagery, or
  marketing that may depend on another rights holder's work.

## Validation

For documentation-only changes, check links, headings, terminology, arithmetic,
and consistency with the current design brief.

Browser interaction prototypes live in `concepts/snake-show/prototypes/`.
They need no build: open `index.html` in a browser, or run
`python3 -m http.server 8000 --bind 127.0.0.1 --directory concepts/snake-show/prototypes`.
Run their dependency-free rule tests with
`node concepts/snake-show/prototypes/tests/rules.test.cjs`.
Optional browser checks use Playwright:
`node concepts/snake-show/prototypes/tests/browser-smoke.cjs`.
See the prototypes' `README.md` for browser dependency overrides, scope, and
manual validation scenarios. These browser studies do not establish Roblox
multiplayer behavior or balance.

The connected 2D browser game lives in `concepts/snake-show/browser/`.
Open its `index.html` directly, or run
`python -m http.server 8000 --bind 127.0.0.1 --directory concepts/snake-show/browser`.
No build or dependencies are required to play. Run the game engine tests with
`node --test concepts/snake-show/browser/tests/engine.test.cjs concepts/snake-show/browser/tests/tuning.test.cjs concepts/snake-show/browser/tests/bots.test.cjs concepts/snake-show/browser/tests/voting.test.cjs` and optional
Playwright checks with `node concepts/snake-show/browser/tests/browser-smoke.cjs`.
Live tuning browser checks use `node concepts/snake-show/browser/tests/tuning-browser.cjs`.
After editing this game's JavaScript or CSS, update the corresponding `?v=`
in `browser/index.html` to the first 12 lowercase hex characters of the file's
SHA-256 hash. Verify UI changes on the served page as well as in isolated tests;
cached scripts can otherwise leave new controls visible but unresponsive.
See that folder's `README.md` for bot behavior, adaptation choices, and browser
dependency overrides. Keep the original interaction studies independent.
