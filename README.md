# Roblox exploration

This repository develops and evaluates original Roblox game concepts. It is
documentation-first: it holds design briefs, supporting research, and a few
browser studies used to test single interactions. It is not a Roblox place
project.

## Repository map

| Location | What belongs here |
| --- | --- |
| [`concepts/`](concepts/) | Concept pitches and design briefs, one folder per concept. |
| [`research/`](research/) | Platform, market, and policy research, dated and linked to official sources. |
| [`user-notes.txt`](user-notes.txt) | User-owned direction. Agents never edit this file. |
| [`output/`](output/) | Generated artifacts, such as reference images. |

## Current concept

[The Midnight Fair](concepts/snake-show/README.md) is the active concept. Start
with its [design brief](concepts/snake-show/midnight-fair-design-v3.md), which
is the source of truth when shorter documents disagree with it. The folder keeps
its historical `snake-show` name so the browser study paths stay stable.

## Working in this repository

- Read [`CLAUDE.md`](CLAUDE.md) for editing expectations, research standards, and
  validation steps.
- Before you change anything under `concepts/snake-show/`, read
  [`concepts/snake-show/AGENTS.md`](concepts/snake-show/AGENTS.md). It holds the
  run, test, and cache-busting rules for the two browser codebases.
- Verify Roblox policies, prices, and APIs against current official sources, and
  date what you record.
