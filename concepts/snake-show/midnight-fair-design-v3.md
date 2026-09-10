# The Midnight Fair — design v3

Version 3 · 10 September 2026 · Consolidated design draft

**The Midnight Fair** is the selected English title. This brief supersedes [Snake Show v2](archive/snake-show-design-brief-v2.md) and the three collection design passes wherever they disagree with this draft. It consolidates the agreed direction, carries forward the mechanical baseline, and labels remaining proposals. The linked challenge and creature records form part of the current design set; this brief governs cross-system rules and decision status. It does not claim that the production collection game has been implemented or validated; section 15 records the local browser study.

The files remain under `concepts/snake-show/`. The [folder guide](README.md) separates this current brief, challenge and creature records, reference art, browser studies, and archived iterations. **Feira da Meia-Noite** and **Feria de Medianoche** are proposed Portuguese and Spanish titles. Selecting the concept name does not establish name availability or rights clearance.

## 1. The game in one minute

The Midnight Fair is a fantasy creature collection and social deduction game for Roblox, designed for **ages 9–15**, primarily on phones. Players visit a magical nighttime fair, cooperate in short challenges involving baby creatures, and watch for partners secretly diverting those creatures into another nursery.

Eight players enter a match. Six protect the fair's deliveries; two secretly work for its Mischief Court. Players observe mistakes and suspicious actions, inspect factual clues, and vote to remove suspected saboteurs from the remaining challenges. The finale reveals what happened.

**Every participating member of the winning team earns one baby creature, including players voted out.** Each challenge has its own species, and each species comes in colors of differing rarity. Personal delivery, Catch, or sabotage credit is not required for the reward.

Back in the lobby, players inspect and pet their individual babies, walk with a selected companion, admire other people's creatures, arrange a three-baby showcase, and exchange creatures. A proposed collection of achievement badges lets each player choose one accomplishment to display beside their lobby name.

The intended emotional connection is: **“I remember the round when I earned this Moonmop.”** The collection makes the fair worth returning to; cooperation, suspense, and affection must make the time spent there enjoyable. These are design hypotheses, not evidence of retention or demand.

## 2. What is decided and what remains a proposal

| Status | Direction |
| --- | --- |
| **Selected by the user** | The Midnight Fair name and the magical fair premise; Moonmop as the first creature; Moonmop Lift as the challenge name in this brief; ages 9–15. |
| **Agreed collection rules** | One baby per participating winning team member per completed match, including voted-out players; species tied to challenges; colors with differing rarity; individual inspection and petting; exchanging in the lobby. |
| **Agreed social features** | One selected lobby companion, Present, affectionate or impressed reactions with creature responses, creature gatherings, an on-demand three-baby showcase, and a portrait nook. Exact controls and animations need refinement. |
| **Inherited mechanical baseline** | Eight players, two secret opponents, up to three challenge-and-vote stages, one shared sabotage attempt per stage, two successful diversions plus a surviving opponent required for their win, two-motor lifts, and the spotter rule. These remain unvalidated balance choices. |
| **User-proposed badge direction** | An expandable badge catalogue and one player-selected badge persistently visible in the lobby. Exact badge requirements and permanent unlocking are developed here as proposals. |
| **Draft choices in v3** | Keeper/Trickster role names, nursery fiction, one challenge family per match, shared color odds for both winning teams, permanent achievement badges, and the detailed exchange and social interfaces. These require further design review. |
| **User-confirmed prototype voting** | Public choices and counts from the start of a combined 35-second clue/vote period; pointing, hunch/certainty, changing or skipping a choice, and explicit locking. Reconfirmed 10 September 2026 after the migration regressed the working prototype. |
| **Open** | Participation/AFK criteria, departure edge cases, rarity probabilities, final palette roster, badge catalogue, voting presentation refinements, and detailed production scope and sequencing. |

The original personal delivery and armed-drop reward rules in [user-notes.txt](../../user-notes.txt) were superseded by the user's later explicit agreement in conversation. The user-owned file remains unchanged. The earlier brief's 13–16 audience and reality-TV setting are superseded here. The secret-ballot and separate clue-review wording initially carried into v3 was stale: the user had already approved immediate public voting in the 2D prototype. That interaction carries forward into Midnight Fair; changing the premise does not reset approved prototype decisions.

### Vocabulary for this draft

A **round** is one complete match, formerly called an episode. A round contains up to three **trials**: each trial includes a challenge, clue review, and a vote. A **challenge family** is a reusable minigame such as Moonmop Lift; a **station** is one pair's instance of that challenge.

The proposed role names are **Keeper**, replacing Loyal, and **Trickster**, replacing Snake. A **diversion**, formerly a heist, is the successful secret rerouting of an armed creature pod after an unrescued fault. **Clues** are factual event cards, formerly receipts. These name changes preserve the corresponding baseline mechanics.

**Rig** and **Catch** remain the action labels for continuity while fantasy wording is evaluated. A **spotter** is the active player without a console when the cast is odd. A **variant** is a species–color combination; an **individual** is one specific owned baby with its own identity and history.

## 3. The world and its tone

### A fair beneath the midnight sky

The fair is a compact lantern garden of nursery tents, challenge pavilions, low gathering benches, and an exchange area. Moonlight, warm windows, soft creature glows, and readable pathways establish the fantasy. Midnight is the setting; joining is not tied to the player's real-world clock.

Apprentices help baby creatures reach the fair's nurseries through unusual cooperative trials. The Mischief Court secretly competes to redirect arrivals into its own concealed nursery. This competition is a tradition of the fair. Both routes end with creatures cared for; players are competing over the delivery and the result of the round.

Keepers and Tricksters are temporary match assignments. They are not permanent player factions, purchased roles, or judgments about the player's personality. Tricksters know each other's identities. Keepers know only their own role. Neither role has a public costume during a trial.

The selected premise replaces television cameras, luxury-villa branding, and show-business fame as the main fantasy. Clues may appear in a magical display, but its knowledge remains limited to recorded actions. Magic never supplies an unexplained answer to who is guilty.

### Affection in both endings

Moonmop travels in a clear protective pod. An unrescued spill enters an opaque collection housing above the theatrical lava. Ordinary recovery and secret diversion look identical during play. The introductory scene makes the protection understandable without revealing the secret route of any individual drop.

The finale can show a diverted pod arriving in a cushion nest, where Moonmop unfolds an ear and inspects the pleased Tricksters. A Keeper victory has an equally affectionate nursery welcome. Babies and players are never shown injured, and an owned creature is never put at risk in a round.

The tone must work visually: a safe ending described in lore cannot compensate for a live scene that appears to harm a baby. Test the failure and both endings with the intended audience.

### Moonmop's defining character

[Moonmop](creatures/moonmop.md) is the selected first creature: a lilac baby with enormous trailing ears and a glowing paddle tail. Her creature record contains the selected art, precise anatomy, sleep behavior, and palette proposals. [Moonmop Lift](challenges/moonmop-lift.md) describes the associated challenge.

## 4. From the lobby to a round

The lobby is the social fair outside a match. Players can open My Nursery, equip a companion, meet other babies, exchange, or select Play. A practice area supports training with a clearly labeled bot or a chosen partner. Practice grants no creature rewards.

Keep one primary public queue as the initial matchmaking proposal. Players can join with friends and choose to play again with a compatible group. Their preference about repeat partners should remain private; there is no public rating of a player's trustworthiness. Exact grouping and repeat-avoidance controls need design.

**Draft format: one challenge family per round.** A Moonmop Lift round uses that family in all its trials, with comparable layouts and settings across simultaneous stations. Players learn one task, compare behavior across changing partners, and know the reward species before committing to play. This carries forward the challenge catalogue's proposed format without creating a queue for every species.

If later rounds mix families, eligible winners would choose one species from the challenges actually played, then reveal its color. That is the agreed conditional reward approach, not a decision to introduce mixed-family rounds now. Never select the reward using a trial that was skipped by an early ending.

### Phase budgets

| Phase | Baseline budget | What happens |
| --- | --- | --- |
| Casting | 10 seconds once | Eight players receive private role cards; Tricksters see their teammate. |
| Challenge | Up to 45 seconds per trial | Pairing, instructions, movement, and the cooperative task. |
| Clue review and vote | Up to 35 seconds together per trial | Trial-wide diversion count and factual observations appear; voting opens immediately with public choices and counts. The result reveals any removed player's role. |
| Runoff, if tied | 10 additional seconds | A second vote among the tied leaders. |
| Finale | 20-second presentation target | Winning team, role reveal, reconstruction, and reward introduction. |

The full baseline is **10 + 3 × (45 + 35) + 20 = 270 seconds**, or **300 seconds** with three runoffs: roughly 4½–5 minutes, excluding queue time. Transitions and result presentation must fit those budgets; they are not additional hidden phases. Early endings shorten a round. Nursery browsing after the result is outside the timed match.

These remain timing targets. The browser preserves this combined voting flow but includes a separate five-second result pause and an open-ended finale, described in section 15.

## 5. Teams, partners, votes, and victory

### The team objective

Six Keepers try to prevent the Trickster team from satisfying both victory conditions. Two Tricksters must achieve **at least two successful diversions** and have **at least one Trickster still active after the final required vote**. Preventing either condition gives the Keepers the win.

The display **Diversions: 0/2** counts completed diversions toward that target, never Tricksters remaining. It can exceed two if the third trial also produces a diversion. Removing a Trickster does not subtract past diversions.

Deliveries are a separate temporary performance count. They do not add creatures to inventory, determine personal eligibility, or create another victory threshold. Keepers can win by preventing diversions or identifying both Tricksters even if they made few deliveries. Whether that makes delivery itself feel insufficiently valuable is a playtest question; v3 does not silently add a delivery requirement.

### Exactly two operators at each lift

Every Moonmop Lift has two operators, two motors, and two suspension cables. Every station in a trial shares tray geometry, physical settings, start-offset rule, controls, time, rescue rules, and clue coverage. The initially heavier side is assigned independently of secret roles.

Pairings rotate across trials; the game completes assignments when partner requests do not. An odd cast never creates a three-player lift. A participant who finishes can walk to another station's rescue area, but cannot take an extra reward by doing so.

### The spotter

Eight players start as four pairs. When a vote removes someone and leaves an odd cast, that removed player's most recent lift partner becomes the next trial's spotter. They have no console, can move between marked rescue areas, can Catch once per fault where eligible, and still vote. Their team-result reward opportunity is unchanged.

If a deadlock keeps an odd cast unchanged, the current spotter keeps the post. In a normal round, only trial two has a spotter: the cast progresses through eight, seven, six, and five active players. If trial one's vote deadlocks, a later removal can instead make trial three the odd-cast trial.

A Trickster spotter can arm a pod from its rescue area using the team's shared Rig attempt, with no motor effect. The spotter's clue records the rescue area where they spent the most time and their saves or misses. None of that proves their role.

The inherited single-departure rule uses the same last-partner assignment from the next trial. Multiple departures, unavailable former partners, reconnect timing, and cancellations need explicit production rules; the local browser study does not validate them.

### Evidence and the ballot

After the challenge, announce the trial's total successful diversions and show factual clues. Do not identify the secretly diverted station through its public outcome card. A failed armed pod and a failed unarmed pod have the same public failure presentation.

The carried-forward prototype uses **public voting immediately** when the challenge resolves. Clue review and voting share one 35-second period. Each active player can select another active player from a face or clue shortcut, and everyone sees choices, pointing and incoming counts live. A choice starts as a **Hunch**; **I’m sure!** expresses certainty without extra vote weight. Players can change their choice, skip and return, then **Lock vote** to freeze their choice and confidence. Changing a target resets certainty. The latest valid choice counts at the deadline even if unlocked; missing votes are abstentions. All active players locking can end the vote early. Past clues remain available throughout this screen and later trials.

The player with the most votes is removed and their role is revealed. A tie opens a runoff among the tied leaders. Every active player votes again, including tied players, and cannot vote for themself. Another tie is a **deadlock**: nobody leaves, and the trial's vote is used. A vote expresses a player's judgment; it is never presented as verified evidence.

Public choices, counts, confidence and locks are explicit user-approved prototype behavior, not an opt-in experiment. Their effect on independent reasoning and group pressure still needs playtesting. Role identities, Rig and private diversion events retain their existing secrecy. The finale reconstructs individual ballots as well as the hidden challenge events.

### Resolve the round in this order

1. At challenge resolution, record any diversion. A trial with no successful diversion uses one unsuccessful opportunity, whether the Tricksters armed a pod or not.
2. If two opportunities have failed, reaching two successful diversions is impossible. End with a Keeper win; no additional vote can change that result.
3. Otherwise review clues and vote, including any runoff. If both Tricksters have been removed, end with a Keeper win.
4. If this was the third vote and a Trickster remains, two or more diversions give the Tricksters the win; otherwise the Keepers win. Before the third trial, continue if neither early ending applies.

Two early successful diversions do not end the round: the Keepers still have the remaining votes to remove the Tricksters. All original members share their team's final result, subject to the separate participation requirement for the creature award.

## 6. Challenge rules

The [challenge catalogue](challenges/README.md) lists the baseline and candidates. [Shared challenge rules](challenges/shared-rules.md) define the common two-job format, sabotage, Catch, clue, and delivery requirements. Each challenge has a separate document for its controls, creature relationship, physical Rig effect, recovery, tuning, and open tests.

[Moonmop Lift](challenges/moonmop-lift.md) is the baseline: two operators raise a protected Moonmop pod on a two-cable tray, correct its tilt, and try to Catch it after a fault. A Trickster's Rig can strengthen their motor and arm a concealed diversion. The complete control rules and [tuning reference](challenges/moonmop-lift.md#tuning-reference) now live in that challenge document.

The round's team objective, votes, spotter assignment, and reward eligibility remain in this brief. Extracting challenge details does not change any of them.

## 7. One complete example

Maya, Leo, Nia, Omar, Tess, Hugo, Iris, and Ben enter a Moonmop Lift round. Leo and Nia are privately assigned Trickster. All eight have the same advertised reward species: Moonmop.

In trial one, Maya and Leo operate a lift. Leo completes Rig and over-pulls; the pod slips, nobody catches it, and it is diverted. Another station fails without being armed. The public cards describe both failures and the observed handling, while the total reads **Diversions: 1/2**. The players mistakenly vote out Hugo, a Keeper. His former partner Tess will spot next.

In trial two, the six console operators form three pairs and Tess moves among rescue areas. Nia completes the team's next diversion. The total reaches **2/2**. The group votes out Leo, revealing a Trickster. Six players remain, so trial three has three pairs and no spotter.

Nia cooperates in trial three to reduce suspicion. Prior diversions remain recorded, but the group connects her with an earlier suspicious lift and removes her. With both Tricksters removed, the Keepers win.

Assuming all participated, Maya, Omar, Tess, Hugo, Iris, and Ben each receive **one Moonmop**, regardless of which individuals delivered or caught. Hugo still qualifies after his early removal. Leo and Nia receive no baby. If Nia had survived the final vote, Leo and Nia would instead each receive one, and the Keepers would receive none.

Colors reveal after the roles and outcome. Under this draft's proposed shared odds, each winner has the same color distribution. Existing owned babies remain untouched in either result.

## 8. Collection rewards and rarity

### The entitlement players should understand

**Win with your team, receive one baby.** An eligible player receives exactly one award for the completed round, including an early team victory. Delivering multiple pods, making multiple saves, or performing both diversions does not increase that amount. Practice, incomplete rounds without a valid team result, and losing rounds grant no victory baby under this draft.

Being voted out does not erase eligibility. A removed player can follow the public round from a rest area or return to the lobby and queue again. The old round's eventual award is delivered once after its outcome is resolved. Reconnection or a retry must not duplicate it.

AFK means absent or idle rather than participating. Its operational definition is still open: being present in the server is insufficient, but a novice, a quiet spotter, or an early vote-out must not fail an arbitrary performance quota. Production needs an explicit participation rule and treatment of deliberate early departure before this reward system is ready to release. Pending awards must not create an efficient strategy of repeatedly joining and abandoning rounds.

### What the baby represents

A team victory earns an adoption from that challenge's nursery. Each winner meets a separate individual of the species; several players do not acquire ownership of the same transported animal. The new baby's origin can say **“Earned in a Moonmop Lift round — Keeper victory.”** It must not imply that every winner personally saved or diverted the pod.

A color reveal introduces the individual that joins the player's collection. During the trial, Moonmop uses the standard species appearance. This avoids presenting one visibly rare pod that several teammates expect to own and keeps reward information from revealing roles before the finale.

### Color baseline for this draft

Species have several colors with different rarity. Their selected colors and palette proposals live in the [creature records](creatures/README.md), including [Moonmop's proposed palette](creatures/moonmop.md#colors-and-rarity). Exact tiers and probabilities remain unset. Common colors should remain appealing; all colors have equal gameplay behavior and the same quality of affectionate animation.

**Recommended, not yet approved:** both winning teams draw from the same palette with the same odds. Clean deliveries, Catch saves, and personal diversions do not change reward quality. A dramatic rescue can be part of the round's story without making deliberate faults a route to better odds.

The proposed dusk nursery gives Trickster victories a distinctive arrival scene. A guaranteed dusk baby or a Snake-exclusive color family remains an alternative under evaluation, not part of this baseline. A softer bias toward different shades by team, with identical rarity-tier probabilities and every color available to both, also remains only an alternative.

Tune rarity against actual earning cadence. For illustration only, a player winning half their rounds would average one baby per two rounds. A particular color with a 10% chance per award would then take 20 rounds on average; a 1% color would take 200. These are expectations under stated assumptions, not guarantees, measured win rates, or target requirements.

The six-to-two role split also matters if exclusive palettes are considered. With full participation and equal team win rates, the total supply would be three Keeper-origin babies per Trickster-origin baby. That describes origin pools, not the scarcity of each shade. Do not assume exclusive pools would have equal availability merely because their color odds match.

## 9. Creatures and their challenge stories

The [creature catalogue](creatures/README.md) owns the species list, with one record per creature for anatomy, personality, nursery behavior, palette proposals, art references, and decision status. Every creature record links to its [challenge](challenges/README.md), and every challenge links back to its creature.

[Moonmop](creatures/moonmop.md) is the selected first creature. All other species remain proposals; the catalogues do not constitute a committed release roster. Each challenge must have an enjoyable cooperative task and complete sabotage, prevention, clue, and reward rules before implementation. A new creature does not resolve an old counterplay problem.

Candidate comparison and parked ideas live in the challenge catalogue. Global reward and ownership rules stay in this brief so adding a species cannot silently change how players earn or exchange babies.

## 10. My Nursery and showing off

### Every baby is an individual

My Nursery has a compact species/color browser and a large individual view. Players can select, rotate, inspect, pet, nickname, favorite, and choose a baby as their lobby companion. Two lilac Moonmops remain separate records; they do not collapse into a stack of two.

The individual view shows nickname, species, named color, rarity, and an origin entry. A traded baby retains its actual origin without suggesting the current owner personally earned it. Avoid exposing a chain of previous players or permanently identifying a partner blamed during a match.

Affection is immediate and optional. No hunger timer, neglect penalty, compulsory growth, breeding, fusion, or stronger challenge stats is included. Babies remain babies. A species needs a good petting response and distinctive rest behavior before a large accessory catalogue.

### One selected companion and Present

One currently owned baby accompanies the avatar around the lobby. Moonmop waddles with dragging ears and can settle into her selected sleep pose when the owner lingers. Companion movement must keep up without making ordinary lobby travel an escort challenge.

**Present** gives the owner a deliberate way to lift or settle the baby for another player to admire. Common and rare colors receive equal access and animation quality. These are proposed animation treatments of an agreed interaction.

Companions and achievement displays belong to the lobby. They do not obstruct a live challenge, reveal an unannounced reward, or add gameplay abilities. Trading away the selected baby removes it as an equipped owned companion.

### Reactions that receive a response

Selecting a nearby baby offers a small inspect view and proposed reactions **Aww!**, **Wow!**, and **Hello!**. An affectionate avatar gesture might make Moonmop peek around an ear; amazement might prompt her to lift her glowing tail; a wave might receive a tiny paw-wave.

The owner and visitor see the response. Reactions create no permanent like total, badge points, or currency. A brief shared cooldown prevents overlapping effects. Exact timing, text, and animation need testing. Owners can control visitor petting and hide reaction effects under the proposed interface.

The desired sequence is to notice, approach, react, and learn about a baby. A common variant with expressive behavior should still invite that interaction.

### Gatherings, showcases, and portraits

Low benches or blankets let players voluntarily settle companions together. Shared sniff, wave, and resting behaviors can cover the initial roster; bespoke animation for every species pair is not required. A special example for exploration is two Moonmops settling with their long ears overlapping.

The **three-baby showcase** is an on-demand arrangement opened from the owner's inspect view. The player chooses three currently owned individuals and their order: a matching color group, different species, or personal favorites. Trading a displayed baby clears its slot. The showcase does not mean three more followers or an explorable private home.

A **portrait nook** provides a small shared composition space with appealing light, perches, and room for friends and their babies. It reuses Present and reaction poses. Automatic image export and external sharing are separate production questions.

A rotating show-and-tell perch remains an optional proposal from pass 2, not an additional agreed feature. Test whether companionship and the agreed gathering spaces already create sufficient opportunities to be noticed before adding another timed activity.

## 11. Collection book and proposed achievement badges

The book shows current holdings by species and variant. Duplicate individuals do not increase variant completion. Trades count toward current holdings; exchanging the last copy reduces that current count. An illustrative inspect card might say **“5 species · 12 color variants owned.”** These are example counts, not a fixed roster.

The user's badge proposal is an expandable catalogue with **one equipped badge persistently displayed beside the lobby name**. The selection can be changed or hidden, and inspecting it explains the requirement. V3 interprets persistent display as a saved equipment choice, not an irreversible choice.

**Draft recommendation:** badges record completed achievements and remain unlocked after an exchange. A badge says what the player achieved; the collection book says what they own now. This supersedes the earlier draft suggestion of removing a collection title after trading away a required variant, but permanent unlocking still needs agreement.

| Working badge | Proposed requirement |
| --- | --- |
| **First Friend** | Earn the first baby through a team victory. |
| **Moonmop Devotee** | Hold a specified, fixed set of Moonmop colors simultaneously. |
| **Lavender Gathering** | Hold specified lavender variants across several named species simultaneously. |
| **Both Sides of the Moon** | Earn a team victory as a Keeper and as a Trickster. |
| **Moonlit Menagerie** | Hold a specified set of different species simultaneously. |

Collection requirements must list the actual variants and remain stable when the roster grows. Collection badges can be earned through exchanging; group lending can therefore help several players complete a set. That is accepted under this draft interpretation, and those badges do not claim independent acquisition. A future personally earned collection badge would need an explicit requirement based on that player's round rewards.

Badges belong to the player who earned them and are not transferred with creatures. Give badges comparable display space and quality, including early achievements. More badges should introduce recognizable accomplishments; an expanding catalogue does not require a global score or leaderboard. Rarity-weighted collector scores remain outside the proposed baseline.

## 12. The exchange garden

The lobby includes a dedicated area where two players can propose an exchange of specific owned individuals. Facing cushions display the offered babies while both players inspect their names, species, named colors, rarity, and origin. Ownership remains unchanged during inspection.

The proposed flow is: select individuals, review both offers, and confirm the current arrangement. Any addition, removal, or substitution resets both confirmations. A canceled or interrupted proposal transfers nothing. A completed exchange transfers both agreed offers together and records the result so reconnects or retries cannot duplicate babies or complete only one side.

Favorited babies require deliberate unlocking before they can be offered. Warn within the review if the offer removes the last copy of a variant or clears a companion/showcase slot. Under the proposed permanent badge system, already earned badges remain available.

Show that exchanging may help complete a palette, but do not assume common-for-rare offers will find willing partners. The base design introduces no trade currency, automatic price, real-money value, or requirement to delete cherished duplicates. Trading is an agreed product feature; it needs its own usability and ownership-reliability work before real inventory is exchanged.

## 13. Progress, purchases, and product boundaries

The persistent identity is the player's creatures, their selected companion, their chosen badge, and their presentation. The round's delivery and diversion counts reset. Collection completion is distinct from individual baby ownership and any future competitive rating.

Carry forward the appearance-only commercial direction: optional purchases may support avatar presentation, emotes, or decorative presentation choices while preserving equal controls, evidence, voting, role assignment, and reward eligibility. Basic play with friends remains free in the design. Specific products, pricing, and demand have not been established.

The old **Fame** and **Show Credits** systems were designed around the reality show. Their retention or replacement is an explicit open progression decision, not an automatically adopted new currency system. This brief fully specifies neither a consolation reward for losses nor a season pass. The creature award remains the one-per-winning-round rule above.

Do not expand this draft into creature combat, paid role odds, purchased stat advantages, paid random rewards, breeding, a trading currency, ranked queues, or multiple public matchmaking pools. None is needed to review the agreed collection loop.

## 14. Screen and information requirements

The main phone screens are the fair lobby, private role card, challenge station, clue review, ballot, finale/adoption, My Nursery, another player's inspect/showcase view, badge selection, and exchange review. Each should make its current action apparent without requiring chat or a full manual at entry.

At a console, preserve large Pull, temporary Catch, and Leave controls, plus the private Rig control when eligible. Use text, shape, and position alongside color. Keep warnings understandable without sound. Costumes, companion effects, and decorative presentation must not obscure evidence or change timing.

Each round assigns stable contestant numbers, portraits, and nameplates. Before the role reveal, only eligible players receive secret role, teammate, Rig, reservation, and outcome information. Revealing an inventory award or a special palette before the finale must not become another way to discover roles.

Removed players can see public outcomes, clues, and public choices, counts and locks; they receive no hidden-role camera feed or ability to affect the current round. Their original team result still matters for rewards. Exact separation of ongoing-round information and lobby interaction needs production design.

Reaction buttons, editable nicknames, communication, badge presentation, and exchange interfaces are game-design proposals. Platform implementation and release requirements need current official verification before shipment. Ages 9–15 is the intended design audience, not a claim of platform access or approval. This draft does not reuse v2's dated policy, pricing, or discovery claims as current facts.

## 15. What exists and what must be built or tested

The [connected browser adaptation](browser/README.md), updated 10 September 2026, now integrates a local Midnight Fair study: lantern-garden presentation, protected Moonmop pods, the draft Keeper/Trickster language, two-motor physics, Rig, Catch, spotters, combined clue review and immediate public voting, and a finale with local team-victory adoptions. My Nursery saves individual babies, nicknames, favorites, one companion, three showcase slots, and a small draft badge catalogue. Present, reactions, gatherings, a portrait nook, and a scripted exchange with a labeled bot are available for interface study. This is not the production Roblox game or evidence of multiplayer behavior.

The saved [user-approved browser preset](browser/presets/approved-2026-09-08.json) is the reference for reproducing that study's selected configuration: width 1.2, bot skill 20%, and zero static and sliding friction, with its other settings in the file. It is distinct from the older [coupled-cables reference values](challenges/moonmop-lift.md#tuning-reference). Approval of a local study configuration does not establish final multiplayer tuning.

Important differences remain explicit:

- Its five-color Moonmop palette, rarity tiers and 50/25/15/8/2% probabilities are disclosed local fixtures, not approved odds. Both teams use the same draw, without personal performance weighting.
- Its temporary participation rule accepts a control attempt, trial movement, clue review or ballot interaction, without a success quota. Voted-out participants retain eligibility. Bot participation is assumed; production AFK criteria remain open.
- Its default public voting flow preserves the working 2D prototype at Git revision `b0d1d65`: one shared 35-second clue/vote screen, public pointing and counts, hunch/certainty, locking and quick replay. The separate five-second result pause and open-ended finale still differ from v3’s timing target.
- Ownership, claim receipts, equipment, badge unlocks and exchanges persist in one browser’s storage. The bot exchange resets confirmations after edits, protects favorites, warns about last copies and equipment, and transfers both offers together locally. This does not implement real player exchange or authoritative ownership.
- A removed player can return to the local fair while the previous round finishes in the same tab and grants any eligible award once. Pending rounds are not recovered after a reload or closing the tab. Networking, production matchmaking, multi-client coordination and departure/reconnection handling remain unimplemented.

The original [interaction studies](prototypes/README.md) remain independent. Implementation and browser tests exercise these local rules and interfaces; they do not establish balance, production security, or understanding by the intended audience. Prototyping the draft names, palette, participation rule, badges and social controls does not change their decision status in this brief.

### Proposed validation sequence

| Study | What it must resolve |
| --- | --- |
| **Premise and reward walkthrough** | Players can explain both teams, where failed pods go, who earns a baby, and why a voted-out winner still receives one. |
| **Moonmop Lift with real pairs** | Honest play is enjoyable; ordinary errors allow counterplay; Rig creates a readable opportunity; Catch is neither an automatic denial nor an impossible rescue. |
| **Complete rounds** | Clues influence judgments; spotters stay involved; eliminations feel tolerable; test comprehension and social effects of the preserved public choices, confidence and locking flow. |
| **Collection and social study** | Players distinguish individuals from variants, pet particular babies, approach other companions, and understand badges versus current holdings. Include common colors. |
| **Reward cadence** | Measure team win rates, time between babies, losing streaks, returns, and effects of role preference before selecting rarity odds. Check AFK and early-exit incentives. |
| **Exchange study** | Players understand exact offers, confirmation resets, last-copy consequences, and origin records. Ownership is reliable through interruption and retries. |
| **Additional family comparison** | A new creature's activity adds an enjoyable cooperative relationship and complete sabotage, prevention, clue, and reward rules. |

The first small collection study can use Moonmop in several colors, including same-color duplicates. It does not need every species, badge, and interaction in this brief. That sequencing is a proposal for learning efficiently, not a withdrawal of the agreed product features.

The production system must resolve roles, physics, accepted inputs, rescue, sabotage reservations, votes, rewards, and ownership authoritatively. Exercise simultaneous Catches, competing Rig reservations, reconnects, repeated reward claims, and interrupted exchanges. Preserve one public physical scene and keep secret data from ineligible clients. Detailed architecture belongs in a later implementation specification.

## 16. Decisions for the next design review

1. **Role language:** keep the proposed Keeper/Trickster names or choose a clearer localized pair. The selected game title stays The Midnight Fair.
2. **Voting presentation:** refine the preserved public choices, pointing, hunch/certainty and locks through comprehension and social-pressure playtests. Reintroducing secret ballots or a delay before voting would require an explicit new decision.
3. **Participation and departures:** define eligibility without rewarding idle or serial abandoned rounds, while protecting novices, spotters, legitimate vote-outs, and reconnection.
4. **Badge permanence:** confirm permanent achievement unlocks, including collection badges earned through exchanges and cooperative lending.
5. **Color rules:** confirm shared odds or explicitly select a different palette treatment. Set probabilities only after acquisition cadence is measured.
6. **Spotter and game balance:** test repeat spotting, the effect of removing both a suspect and their partner's console access, one shared Rig attempt, and Catch difficulty across skill levels.
7. **Progression and production:** decide whether any former Fame/Show Credits progression survives, define the first integrated fair prototype, and sequence the agreed social and exchange features.

The major test is whether players enjoy earning, knowing, and introducing their creatures while still enjoying a round whose outcome they cannot control alone.

## Appendix A. Source trail and superseded directions

- [User-owned notes](../../user-notes.txt), supplemented by subsequent explicit decisions in this conversation: audience, creatures, collection, the accepted team reward rule, social display, and the selected title.
- [Snake Show design brief v2](archive/snake-show-design-brief-v2.md): inherited game rules and historical design rationale. Its show setting, older audience, initial collection scope, and terminology are superseded here.
- [Collection pass 1](explorations/fantasy-collection-design-pass-1.md): original fair proposal, creature/challenge mapping, and now-superseded personal-action eligibility exploration.
- [Collection pass 2](explorations/fantasy-collection-design-pass-2.md): the agreed reward and social direction; current-ownership titles were an earlier proposal.
- [Collection pass 3](explorations/fantasy-collection-design-pass-3.md): permanent badge recommendation and evaluation of performance weighting and dusk palettes. Evaluation did not itself approve those reward alternatives.
- [Current challenge catalogue](challenges/README.md) and [creature catalogue](creatures/README.md): modular mechanics and species records. The [family exploration](explorations/pair-challenge-families.md) and [pairing review](explorations/pairing-and-elimination-review.md) preserve earlier research and rationale.
- [Browser adaptation](browser/README.md) and [interaction studies](prototypes/README.md): implemented local studies with their documented differences and limits.

No new market, price, policy, or platform-eligibility research was performed for this design draft. Historical external research remains in the repository with its original dates; it is not evidence that the new concept, title, social systems, or business model have been validated.
