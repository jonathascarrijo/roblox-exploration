# Fantasy creature collection — design pass 2

10 September 2026 · Accepted reward direction and exploration of social display

**Reading status:** the agreed reward and social direction is consolidated in [The Midnight Fair — design v3](../midnight-fair-design-v3.md). The interaction detail, optional introduction perch, collection-status comparisons, and proposed observations remain supporting design work. Current-ownership titles are an earlier proposal, not an adopted rule; [pass 3](fantasy-collection-design-pass-3.md) explores permanent badges as an alternative.

**Subsequent agreement:** the user approved the companion, Present action, affectionate reactions with creature responses, baby gatherings, three-baby showcase, and portrait nook. The user then proposed an expandable badge collection with one badge persistently displayed in the lobby. [Design pass 3](fantasy-collection-design-pass-3.md) evaluates that proposal and outcome-dependent colors. The current-ownership title rules below remain an earlier proposal; pass 3 recommends permanent achievement badges alongside a book of current holdings. The voluntary introduction perch below has not been separately selected.

This follows [design pass 1](fantasy-collection-design-pass-1.md), [user-notes.txt](../../../user-notes.txt), and the user's subsequent agreement and additions in conversation. The notes retain the original personal-action reward proposal; the newer explicit agreement supersedes that proposal without editing the user-owned file. The [design brief](../archive/snake-show-design-brief-v2.md) remains the reference for episode mechanics. Audience remains the user-directed 9–15 design target.

## Accepted direction

**Reward:** every participating member of the winning episode team earns **one baby per episode**, including voted-out players. Neither a personal delivery nor a personal heist is required. A losing team earns no baby under this rule. AFK players are excluded through a separate participation check whose precise conditions still need design and testing. There is no additional personal performance score to qualify for the baby.

In an episode with a single challenge species, that species is the reward. If episodes later mix species, the agreed proposed treatment is to let winners choose one species from the challenges played, then reveal its color. This does not adopt mixed-family episodes. Awards appear after the role reveal, and already owned babies never become episode stakes. Retain the brief's handling of later team rewards for players who leave after being voted out; participation and departure edge cases still need specification.

The shared Snake attempt and the Loyal spotter no longer exclude players through lack of a qualifying personal action. The episode's two-heist target, role survival check, and spotter assignment remain unchanged. Reward balance and actual time between adoptions remain untested.

**Agreed social direction:** players can select an owned baby to accompany them around the lobby, present it for admiration, and express awe or affection toward others' babies through reactions that receive a creature response. The user also approved creature gatherings, an on-demand three-baby showcase, and a shared portrait nook. Exact controls, animations, and timings remain design details to refine. Collector status remains under discussion in pass 3.

The collection pivot's final setting and name remain undecided. Lobby companionship is not an instruction to add companions to live challenges.

## Design judgment: make admiration lead to interaction

A useful sequence is: **notice a baby → approach → inspect or react → see a response → discover a collection or an exchange opportunity.** Each step should be short and optional. A rare color can start that sequence; movement, personality, and the owner's choices can sustain it.

Give players several accomplishments to display: a sought-after color, a broad collection, a completed species palette, a carefully arranged showcase, or a favorite individual with a memorable origin. This lets a common Moonmop be worth showing even beside a rare one.

Do not assume more spectacle produces more social interaction. Large effects and repeated announcements could make it harder to see the baby someone wants to inspect. The proposals below need observation with real players.

## The selected companion

One owned individual accompanies the avatar. Switching the selection uses the existing nursery browser, preserving the baby's nickname, color, and origin. A traded-away companion is no longer selectable or visible as owned.

For Moonmop, the recognizable motion is a short waddle with her enormous ears trailing behind. When her owner stops, she gathers her ears; after a longer idle she rests her head on her tail and drapes her ears over herself, following the [latest character design](../images/creatures/moonmop-design-pass-v3-2026-09-10.md).

An optional **Present** action lets the owner lift or settle the baby for a close look. It offers a deliberate moment to show someone, with the same access and animation quality for common and rare colors. The baby can keep up or move beside the avatar after a large separation; caring for it must not turn crossing the lobby into an escort task.

Selection and public display belong in the lobby. Unrevealed episode rewards do not become visible companions before roles are exposed.

## Reactions with a response

Selecting a nearby baby opens a compact inspect view and three initial reaction choices:

| Reaction | Visitor expression | Creature response proposal |
| --- | --- | --- |
| **Aww!** | A small heart and affectionate avatar gesture. | Moonmop peeks around one ear, then leans out. |
| **Wow!** | Starry eyes and a delighted gesture. | Moonmop proudly lifts her softly glowing tail. |
| **Hello!** | A little wave. | Moonmop raises one paw. |

The owner and nearby visitor see the exchange. Reactions are temporary expressions and award no currency, tier points, or permanent public like total. A brief shared animation cooldown prevents overlapping inputs from turning the baby into a stream of effects. Exact timing is a test setting, not a settled number.

Let owners control whether visitors may pet their baby, and let the owner hide incoming reaction effects if desired. A visitor's petting interaction does not alter ownership or the baby's care state. Reaction text, icons, and avatar gestures should make the intended expression understandable; this pass does not select a platform communication implementation or assert its eligibility.

The distinction to test is whether people enjoy a reciprocal moment enough to use it spontaneously. A counter of admiration is unnecessary to test that.

## Other ways to show off

### Small creature gatherings

A low circular bench or blanket gives two or three players a place to settle their selected babies together. Joining is voluntary and does not remove control of the avatar. Two Moonmops might overlap their long ears while settling into a nap; a Puffloom might offer a bubble for another baby to watch.

Start with a shared sniff, wave, or settle interaction that works across species. Bespoke animations for every species pair would grow rapidly with the roster. Special pair behaviors can be later art proposals rather than a requirement for the collection system.

### A three-baby showcase

The owner's inspect view can open a small arrangement of three currently owned babies, chosen from their nursery. The owner selects the individuals and their order. Three mint babies, three different species, or a complete trio of favorite Moonmops can communicate taste as well as rarity.

This is an on-demand display proposal, not three additional followers or a persistent personal room. All visible babies must still be owned. Trading away a displayed baby clears that slot until another is selected.

### A shared portrait nook

One small lobby scene provides flattering light, a low perch, and room for friends and their companions. Owners can reuse Present and the existing reaction poses. A free choice of a few backgrounds helps collectors compose a picture around a color palette.

The initial idea is an in-game composition space. Automatic image export, platform capture integration, and external posting are separate implementation questions and are not part of this pass.

### Voluntary introductions

A small show-and-tell perch gives the next willing player a brief turn to present a selected baby. Show its nickname, species, and named color, followed by optional nearby reactions. Use equal turns and equal presentation time, independent of rarity.

Keep the activity optional while matchmaking remains accessible. No server-wide interruption is needed whenever a rare color arrives. Before adding a rotating perch, test whether ordinary walking, Present, and the portrait nook already create enough moments of attention.

## Collector tier, score, or milestones?

**Open comparison:** the current-ownership title model below has not been selected. Compare it with the permanent achievement badges proposed in [pass 3](fantasy-collection-design-pass-3.md#permanent-achievement-current-collection); permanence still needs a decision.

**Recommendation:** start with a collection book, visible completion milestones, and one chosen title. A numeric score needs a clear definition before it can mean anything to another player.

| Option | What it communicates | Main cost or ambiguity |
| --- | --- | --- |
| Rarity-weighted score | Possession of unusually scarce variants. | Luck and concentration of rare items dominate; balance changes can also alter perceived value. It would encourage optimizing item value over displaying favorites. |
| Collector tier based on unique variants | Breadth of the collection in a compact label. | Tier thresholds are arbitrary until the roster and earning cadence exist. Counting former ownership creates a different achievement from owning the collection now. |
| Collection book and named milestones | Exactly which species and palettes the player has assembled. | Slightly more detail to inspect, but concrete goals and a clear connection to exchanging. |

For the book, a **variant** means one species–color combination. Two lavender Moonmops remain separate babies but count as one owned variant. A mint Moonmop adds a second variant. Count current ownership, including babies received through exchanges. Do not give more completion points for rarity or extra copies.

An inspect card could read **“5 species · 12 color variants owned”**. A Moonmop page could show **“4 of 6 colors owned”**. These are illustrative counts, not a committed roster. Show numerical counts rather than a percentage on the main card so later species additions do not visibly reduce that number.

Completion titles can recognize specific collections. A working example is **Moonmop Specialist**, available while the owner holds a specified set of Moonmop colors. Requirements must list the exact qualifying variants. If more colors are added, retain the named set's definition rather than silently changing its requirements. Players choose whether to wear an available title; the selected baby remains the main visual focus.

There is an explicit tradeoff: trading away the last copy of a qualifying variant lowers current completion and can make a collection title unavailable. Preview that consequence in an exchange. This keeps the label truthful about current ownership and avoids permanent completion credit from repeatedly passing the same rare baby around a group. Trading an extra copy changes neither completion nor title eligibility.

A permanent **discovery journal** is a different reasonable design: it remembers variants ever acquired, even after trading. It would reward circulation and never demote players, but lending a rare baby around would legitimately fill many journals. If we choose that model later, call it discovery and keep current ownership visible separately. The choice cannot be resolved merely by naming both systems “collector level.”

I would defer a global collector leaderboard. A tier can later summarize the same owned-variant count if players want a compact badge; it does not need an additional points economy. Reactions, petting frequency, and votes from other players should not determine collector standing.

## Recommended first comparison

The most useful small design comparison contains one follower, Present, three reactions with creature responses, and an inspect card with the current collection book. Include common colors and duplicate individuals. Compare that with a version that adds a chosen completion title, and observe whether the title contributes anything beyond the baby itself.

Record unsolicited approaches, reactions that receive a response, whether owners voluntarily switch companions to show another, whether viewers understand color versus rarity, and whether common babies also receive attention. Ask whether the exchange led to inspecting a collection or discussing a trade. These are proposed observations, not evidence of retention.

Show players a sample trade that gains a new variant, one that trades an extra copy, and one that removes the last copy needed for a title. Their understanding and response should decide whether current-ownership milestones feel satisfying enough to keep.

The creative priority is the small scene of one player proudly presenting a baby and another stopping to meet it. Collector status should make that scene easier to understand and richer in choices.
