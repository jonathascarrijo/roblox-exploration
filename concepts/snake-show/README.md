# The Midnight Fair

Start with the [current design brief](midnight-fair-design-v3.md). It describes the game, its decision status, round structure, team rewards, collection, social lobby, and open questions. The folder keeps its historical `snake-show` name so the two browser study paths remain stable.

## Documentation map

| Location | What belongs here |
| --- | --- |
| [Design v3](midnight-fair-design-v3.md) | Current product direction and rules that apply across the game. |
| [Challenges](challenges/README.md) | One document per challenge, common challenge rules, tuning references, and parked ideas. |
| [Creatures](creatures/README.md) | One record per species, linked to its challenge: anatomy, personality, nursery behavior, palettes, art, and status. |
| [Explorations](explorations/README.md) | Open alternatives, supporting research, design comparisons, and rationale that still informs current decisions. |
| [Images](images/README.md) | Reference art and dated generation notes, grouped into challenge and creature images. |
| [Browser adaptation](browser/README.md) | Connected local Midnight Fair study with bots, Moonmop adoption, nursery, social/exchange studies, tuning, and immediate public voting. |
| [Interaction studies](prototypes/README.md) | Independent browser prototypes for individual interactions. |
| [Archive](archive/README.md) | Replaced briefs and obsolete standalone artwork. |

The concept root contains the current brief, this guide, and agent guidance. Organize supporting material by its purpose and status: useful explorations stay in `explorations/`, even when parts have been consolidated or superseded. Mark those parts within the document. Archive replaced briefs and retired artifacts; an earlier date alone does not make a document obsolete. Current challenge and creature documents use stable descriptive filenames; their dates and decision status belong inside the documents.

## How the current documents fit together

The main brief governs the whole game: audience, roles, votes, victory, reward eligibility, ownership, and scope. [Shared challenge rules](challenges/shared-rules.md) define the common station behavior. Each challenge owns its specific controls, Rig effect, recovery, tuning, and tests. Each creature owns its identity and presentation. The catalogues index those records instead of repeating their full specifications.

A challenge or creature page may be a proposal. Its existence does not mean it is selected or implemented. If a proposed mechanic conflicts with a shared requirement, record the conflict as unresolved; do not silently change the main game rule.

## Adding a challenge and creature

1. Start from the [challenge template](challenges/_template.md) and [creature template](creatures/_template.md), with a clear date and status.
2. Link the two records in both directions. Describe what the creature needs, what each player does, and the unresolved design questions.
3. Add both catalogue entries. Put supporting art and generation notes under the appropriate `images/` group, and label older staging accurately.
4. Link to existing shared reward and challenge rules. Change the main brief only when the proposal changes the wider game or an adopted decision.
5. Check links and anchors, terminology, arithmetic, and decision status. Preserve the separate run and test instructions in [AGENTS.md](AGENTS.md) and the browser READMEs.

The selected first pairing is [Moonmop Lift](challenges/moonmop-lift.md) and [Moonmop](creatures/moonmop.md). All other creature pairings remain proposals.
