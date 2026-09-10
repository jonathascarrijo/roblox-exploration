# Fantasy creature collection — design pass 1

10 September 2026 · Initial exploration, with later decisions noted below

**Reading status:** creature/story proposals, nursery attachment, and exchanging tradeoffs remain useful exploration. The fair direction has since been selected as [The Midnight Fair — design v3](../midnight-fair-design-v3.md); the alternate settings remain unselected. The references below to v2 as the current brief and its unreconciled audience describe the original pass. V3 governs current direction and decision status.

**Later decision:** the user subsequently approved one baby per participating member of the winning episode team, including voted-out players, with no individual delivery or heist requirement. The act-based eligibility rules below are historical exploration and are superseded by [design pass 2](fantasy-collection-design-pass-2.md#accepted-direction). The fair premise was later selected; the other settings and unselected creature proposals remain exploratory.

This pass develops the collection direction in [user-notes.txt](../../../user-notes.txt) and the accompanying request to reconsider Snake Show's identity. The [current design brief](../archive/snake-show-design-brief-v2.md) remains the mechanical reference. The [challenge catalogue](pair-challenge-families.md) supplies unadopted candidates, not a committed content list. This pass targets ages **9–15**, following the user notes; the brief's older 13–16 passage is unreconciled.

## What the user has put on the table

- Every challenge awards its own species of fantasy baby creature.
- Either the Loyals or the Snakes collect from a minigame. A winning Loyal must have delivered the creature; a winning Snake must have dropped an armed creature.
- Species have several colors with different rarities.
- Players can inspect and pet every individual they own.
- The lobby includes an area for exchanging creatures.
- Moonmop Lift is the name used in this discussion for Prize Lift. Existing rules, files, and prototypes still use Prize Lift.
- The reality-show premise and the overall Snake Show name can change. Several design passes should precede a decision.

The fantasy settings, reward interpretations, names, and interface details below are proposals. Collection and exchanging expand the old brief's scope; this document explores that expansion without scheduling implementation or changing monetization.

## The opportunity and the central risk

The strongest opportunity is a creature with a personal story: **“This is the Moonmop I earned when my partner tried to drop her and I caught her.”** Cooperation, suspicion, and the finale can give an individual baby an origin that a generic reward roll would not have. The nursery then gives players a quiet place to revisit that experience together.

The central risk is that the same permanence makes losing more personal. A bad partner, an accusation, or someone else's failed station can cost a collectible. The hypothesis to test is whether that creates enjoyable stakes or resentment toward other players. An appealing creature image alone cannot answer it.

Creature collecting also changes the hierarchy of the product. If it becomes the main reason to play, the lobby, reward cadence, spotter experience, and elimination rules deserve another design pass. They were designed around short team contests and cosmetic progress.

## Three directions worth comparing

All titles and faction names are working labels; availability and rights clearance have not been checked. These are original premise proposals, not claims of market novelty.

| Direction | Player fantasy and world | How secret opposition fits | Main tradeoff |
| --- | --- | --- | --- |
| **The Familiar Fair** | A magical fair opens beneath a borrowed moon. Apprentices guide newly arrived babies through peculiar nursery trials and earn companions. | Most are Keepers; two secretly represent the Mischief Court, redirecting arrivals into a hidden nursery. The competition between routes is a recognized festival tradition. | Best initial fit for short challenges, playful deception, and a social exchange area. Needs a clear reason to care which court wins. |
| **Moonwake Caravan** | A traveling nursery visits strange habitats at night. Each expedition introduces a species and the problem that makes it need help. | Two travelers secretly work for a rival caravan and divert arrivals to its nursery. | Strong sense of discovery, but rivalry around collecting babies can read as kidnapping. Travel and habitats also invite more world-building scope. |
| **Nursery After Dark** | An enchanted nursery's babies cause magical mishaps. Apprentices restore order and meet new companions. | Secret Tricksters try to complete mischievous alternate outcomes during each activity. | Strongest fit for petting and creature personalities. Repeated expulsion and adversarial collection rewards fit less naturally; this could become a broader structural pivot. |

**Recommended next exploration: The Familiar Fair.** It can preserve the readable contest while letting the creatures define its identity. Keepers and Tricksters are temporary match assignments, not permanent player factions or personality labels. Familiar means a magical companion, not a combat unit.

### A scene that explains the proposal

You arrive in a lantern garden where a Moonmop has fallen asleep with her head on her glowing tail and her enormous ears draped over her body. Other players are showing babies on low exchange cushions. A bell opens the next trial.

Inside Moonmop Lift, two apprentices raise a protected pod toward an overhead moon nursery. Someone secretly enchants the mechanism to divert its next unrescued spill. After the trial, factual observations appear as short magical replay cards. Players vote to exclude a suspected Trickster from later trials. At the finale, a cutaway reveals the secret nursery, and eligible players meet their new companions.

The fantasy changes the presentation of evidence, not what it knows. A magical replay records the same limited public actions as the existing receipts; it cannot identify intent or reveal roles early.

### Make the Trickster ending affectionate too

The two routes must visibly lead to good homes. A failed Catch can send the intact pod into an opaque enchanted collection chute above the theatrical lava. Both ordinary recovery and secret diversion have identical public presentation. The finale can show the diverted Moonmop landing in a cushion nest, unfolding an ear, and inspecting the delighted Trickster.

This supports mischievous theft of a festival delivery while keeping the creature unharmed. It needs to be understandable from a few images; a paragraph of hidden lore will not repair an image that looks like throwing a baby into lava. Before play, show that the collection system is safe without revealing which drops will be diverted.

There is a tonal limit here: if protecting a vulnerable baby is the strongest emotional promise, some players may dislike receiving a role that works against its delivery. The fair's mutually understood contest is a proposal for resolving that tension, not proof that it works.

## Reward rules: turn the idea into a testable example

**Superseded reward proposal:** this section and its worked examples explain the problems with personal-action, per-act eligibility. The agreed replacement awards one baby to each participating member of the winning episode team, including voted-out players; see [pass 2](fantasy-collection-design-pass-2.md#accepted-direction) and the current brief.

The current brief defines an **episode winner**, but no separate winning team for each minigame. An **act** is one challenge round followed by evidence and a vote. Several stations operate simultaneously, and successful deliveries can coexist with a heist elsewhere.

For the first paper walkthrough, use this explicit interpretation of the user's proposal:

1. Reward entitlement is decided **per act**. A successful heist makes the Snakes the act's collecting team; otherwise the Loyals are the collecting team. A timeout or ordinary failed drop never becomes a Snake win by itself. A Loyal collecting result with no deliveries awards no babies.
2. On a Loyal collecting result, each Loyal operator who participated in a completed delivery earns one baby of that challenge's species. Both Loyal partners qualify; there is no last-button or final-touch ownership. An idle occupant does not qualify, but the participation rule still needs definition and novice testing.
3. On a Snake collecting result, the Snake whose completed Rig armed the successfully diverted pod earns one baby. This uses the game's recorded arming ownership instead of trying to infer whose motor “caused” the fall. Under this interpretation a Snake spotter can qualify through their own armed diversion; requiring a physical operator instead would exclude that spotter.
4. Cap each player's award at one baby per act. Replacement pods and repeated faults create no extra awards. An unarmed drop, a successful Catch, a sunk tray, a delivery of the armed pod, and an unresolved rig at timeout do not grant a Snake baby.
5. Record entitlement when the act resolves, but reveal colors and grant access after the episode's role reveal. New inventory, previews, or pets must not expose secret roles during voting. A later episode loss does not revoke a completed act's entitlement under this interpretation.
6. Preserve those entitlements through a vote-out or departure and deliver them once the episode resolves, consistent with the brief's delayed result handling. Already owned creatures never enter a challenge's stakes.

These are **working rules for comparison**, not a claim that the user has selected act-based rewards. The alternative is to require the final episode victory as well as the qualifying action. That makes the final vote more consequential, but can erase the reward for several earlier successful challenges. It must be chosen explicitly.

### Example: the consequence of “either team”

Station A's two Loyals deliver their Moonmop. At station B, a Snake successfully diverts an armed pod. Under the act-based interpretation, the Snake earns a baby and station A's Loyals earn none, even though they delivered. If players expect station A to keep its reward, the appropriate alternative is **station-based rewards**, which lets both teams collect during the same act and therefore changes the user's either-team rule.

The distinction should be explained before the trial. It is too consequential to discover at the reward screen.

### Three conflicts that need the next rules pass

**The Snakes compete with their own teammate for eligibility.** There is one shared armed attempt per act. With arming-owner credit, at most one Snake earns a baby that act even if both are active and help their team. One player can take every attempt across the episode. When different species eventually appear in different acts, “take the next one” would not be an equivalent opportunity; the catalogue's proposed one-family-per-episode format avoids that particular species mismatch but not attempt monopolization.

Two alternatives deserve a direct comparison: retain one shared attempt and award both Snakes on a successful team heist, relaxing personal-action eligibility; or give each Snake an attempt and personal credit, while counting at most one successful heist toward the episode target per act. The latter preserves the personal-action principle but increases sabotage pressure and needs new balance work. Neither is an adopted fix.

**A Loyal spotter has no delivery job.** The spotter is the player assigned to rescue duty without a console when the cast is odd. Literal operator-only credit excludes them. Crediting a successful Catch on a subsequently delivered pod would recognize a real contribution, but still leaves a good spotter empty-handed when everyone plays cleanly and could encourage manufactured faults. Revisit the spotter's collection opportunity before settling reward rates.

**Elimination now removes future collection opportunities.** Keeping earned claims is necessary, but a player removed after act one still misses later chances. If collecting becomes the main promise, compare the current elimination format with a separate proposal that keeps everyone involved. Such a change must explain exposed roles, sabotage access, and voting; “let eliminated players keep helping” is not a complete rule.

My recommendation is to resolve these conflicts before choosing numerical rarity odds. Increasing drop rates cannot fix a role that has no qualifying action.

### One delivered baby, two rewarded operators

A pair delivers one pod, so awarding both operators distinct individuals needs an honest fiction. A simple proposal: completing the delivery earns each eligible player an adoption from that species' nursery. The delivered baby introduces them to its siblings. The interface says “Earned through Moonmop Lift,” not that both players now own the exact same animal. Direct ownership of the transported baby is another option, but would require changing the pod's contents or the reward allocation.

## Creatures should explain their challenges

Give each species a recognizable silhouette, a need that explains its activity, and an affectionate behavior that survives into the nursery. Avoid adding unpredictable creature moods to challenge physics: players need to distinguish visible mistakes from sabotage. These are plot proposals, not resolutions of the catalogue's counterplay problems.

| Existing challenge | Creature and reason for the task | Nursery interaction |
| --- | --- | --- |
| **Moonmop Lift** | **Moonmop** sleeps in overhead moon nests. Her huge trailing ears make the protected lift a sensible way to travel. Two motors raise her pod together. | Pet her forehead; she gathers an ear around your hand, then rests her head on her tail. Preserve the [latest long-ear design](../images/creatures/moonmop-design-pass-v3-2026-09-10.md). |
| **Bubble Trouble** | **Puffloom**, a small cloud ray, travels inside a bubble it exhales. One apprentice changes the bubble's size with bellows while the other steers through reeds and rising air. | A stroke along its back produces a tiny bubble; it watches the bubble settle on its nose. |
| **Critter Crossing** | **Mossnibble**, a low, broad baby with six stubby feet and a mossy fringe, follows glowing fruit toward its nursery garden. One player lures; the other aligns crossings. | It leans into a cheek rub and carefully offers you an imaginary berry. |
| **Spotlight Sprint** | **Wicklet**, a baby moth with a lantern-shaped abdomen, needs to reach its roost before the moonlight path fades. One player aims light to form footing; the other carries its travel lantern. | It opens its small wings to warm your fingertip, then closes them around itself. |
| **Stamp & Spark** | **Chimechick**, an enchanted ceramic bird, first comes alive when its shell and chime are assembled. Players build its body before the awakening; machinery never presses a living baby. | A chest rub prompts a two-note chirp; it listens for its own echo. |

The remaining candidates can receive distinct species without becoming commitments to build them:

| Candidate | Plot seed | Design caution |
| --- | --- | --- |
| Bridge Keeper | **Pebblekip**, a heavy stone-backed baby, needs a nursery cart to cross folding bridges. | Story fit does not solve the keeper's ordinary-counter problems. |
| Vault Volley | **Sailpip**, a baby with broad gliding membranes, practices nest-to-nest flight with a gentle launch and receiving cradle. | Choose the basket or steering version only after resolving the receiver/pilot's ability to force a loss. |
| Lantern Walk | **Glimmerbud**, a walking flower baby, follows balanced lantern light home. | Preserve the candidate's explicit movement cues; its wandering rule still needs scrutiny for fair evidence. |
| Ember Escort | **Emberling**, a warm charcoal-bodied baby, needs shelter from crosswinds on its journey to a hearth nursery. | Align the shield to protect the travel cradle; establish counterplay for both jobs. |
| Stretcher Run | **Drowseed**, a seed-shaped sleeper in a broad curled leaf, travels on a shared sling to a hanging nest. | Keep it visually distinct from Moonmop and retain the unresolved movement and camera tests. |
| Cargo Shuffle | **Rumblebun**, a dense round baby with tiny stone feet, rides a cradle that must shift inward through cart turns. | A creature must not become an excuse for another indistinguishable balance game. |
| Rail Cart | Use the species belonging to the underlying lift challenge. | The catalogue defines this as a presentation variant, not a separate family. A new species here would change what “each challenge” means. |

Vault Whisper and Double Stamp remain parked mechanical ideas. Giving them mascots would not resolve the reasons they were parked.

**Best small comparison:** Moonmop, Puffloom, and Mossnibble. They offer different silhouettes and different relationships: balance a passenger, shape its transport, and guide its behavior. This is a collection-focused comparison proposal, not a replacement for the catalogue's gameplay ranking or an implementation order.

## A nursery that treats babies as individuals

The main collection action opens **My Nursery**. A compact species/color browser leads to one large, selectable baby at a time. Players can swipe between individuals, rotate the view, pet, give a nickname, and favorite a baby. Two lavender Moonmops remain two separate records with their own names and origins; they do not collapse into a stack of two.

The individual view shows species, named color, nickname, and a short origin entry such as “Earned through a successful Moonmop Lift delivery.” Keep the record about the owner's experience; do not permanently name or shame their former partner. A received trade can record the exchange without exposing a chain of other players' identities.

Each species needs one good petting response and a distinctive rest pose before many decorative accessories. The latest Moonmop sleep behavior already supplies a strong starting point. Affection is immediate and optional: no hunger timer, neglected-baby penalty, compulsory growth, or stronger challenge stats is proposed. The baby remains a baby.

For a first interface study, use one species in several colors, include duplicate colors, and ask players to find and pet a particular individual. This tests ownership and attachment without requiring a large roster or new game implementation now.

## Colors, rarity, and exchanging

**Color direction:** keep the defining lavender Moonmop common and desirable. Explore peach and mint as less common palettes, midnight blue as rare, and pearl with a lilac glow as very rare. These are palette relationships, not settled drop odds. Rarity affects appearance only; every color keeps the same silhouette, petting quality, and challenge rules.

For an initial reward treatment, the trial uses the standard species appearance and each eligible player's new baby reveals its color at the finale. Independent colors for separate adoptions avoid dividing ownership of a visibly rare pod or encouraging players to abandon a common one. If we later want players to rescue the exact individual they keep, revisit this treatment and the two-operator ownership problem together.

Set odds after measuring how often a player actually earns a creature in each role. A rare color behind rare eligibility can be far rarer in practice than its reward-screen percentage suggests. Announce the available species before play so collection goals do not depend on guessing the next reward. This does not require a separate queue per species.

The lobby's **exchange garden** can make trading a social scene: two players place proposed babies on facing cushions, inspect each individual, and confirm an exchange. Their babies can notice one another while the players inspect. The review shows species, color name, and the exact individual being offered. Changing either offer resets both confirmations; favorited babies require deliberate unlocking before being offered. This is a proposed interface, not a functioning exchange system.

Duplicates can support social exchanges, but common-for-rare trades cannot be assumed to clear. Avoid designing an economy that requires players to delete or fuse cherished babies. Start by observing whether people trade duplicates, seek complete palettes, or keep individuals for their story. No paid random rewards, combat power, breeding, or trading currency is introduced by this pass.

## What to learn in the next passes

1. **Premise and emotion:** compare short storyboards of the fair and caravan, including both team endings. Ask participants to explain the Trickster's goal and where the baby ends up. Look for delight, indifference, or discomfort rather than relying on a stated preference alone.
2. **Reward fairness:** walk through two Loyal operators, a mixed pair, both Snakes seeking the shared attempt, a clean act with a Loyal spotter, a Snake spotter heist, a voted-out contributor, and a delivery canceled by a heist elsewhere. Compare act-based and episode-based rewards explicitly.
3. **Attachment:** show several same-color babies with different nicknames and origins. Test whether an individual matters after its first inspection and petting response.
4. **Repeat play:** when a playable study is requested, compare willingness to repeat the challenge with and without a new color to earn. Collectibles should not conceal an interaction players otherwise want to stop doing.

The most consequential decision for the next discussion is how strongly collection should reshape the contest: preserving Snake Show's elimination and shared sabotage rules creates different reward constraints from rebuilding the match around every player's chance to earn a baby.
