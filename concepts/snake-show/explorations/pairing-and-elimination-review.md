# Prize Lift: pairing and elimination review

**Reading status:** this remains the rationale for the two-operator and odd-cast spotter rules retained in the [current design brief](../midnight-fair-design-v3.md). Repeat spotting, the cost of losing console access after a partner is removed, and spotter sabotage strength still need playtesting. The unselected formats and dated implementation notes below provide context; they do not replace current rules or establish balance.

8 September 2026 analysis · Decision recorded 9 September 2026

## Decision: pairs everywhere, and a spotter for an odd cast

On 9 September 2026 the following format was selected and written into the [design brief](../archive/snake-show-design-brief-v2.md); the analysis below is the record of how it was chosen.

- Individual removals stay as before: without deadlocks the active cast goes 8 → 7 → 6 → 5.
- Every Prize Lift has exactly two operators and two motors. There is no other tray.
- When a vote leaves an odd cast, the removed contestant’s lift partner from that act becomes the next act’s **spotter**: no console, free to walk into any rescue area and Catch there, still voting. A deadlock keeps the current spotter. The rule never consults roles.
- A Snake spotter can hold Rig inside a rescue area to arm that lift. Arming from the rescue area changes no motor; an uncaught spill there is a heist. The act therefore remains a heist opportunity.
- The act’s receipts gain one spotter card: longest stay, time there, saves and misses.
- A departure that leaves an odd cast follows the same rule from the next act.

Why this and not the others: it is deterministic, role-blind, explainable in one sentence (“if your partner is voted out, you spot the next act”), and follows from a pairing the players already saw. The vote runner-up bench would add Loyal power, a second vote target, and tie rules; a public draw is arbitrary for the chosen player; a second wave of lifts makes one contestant lift twice inside 45 seconds; even-sized removal blocks delay reveals or evict two at once; a bot substitute is a partner of known behavior. A remote Rig that boosts an operator’s motor from the rescue area was rejected as the baseline because it frames an honest operator through physics they cannot see and has no observable act; it stays a test variant.

What still needs playtesting: the Loyals’ two-for-one on a failed pair, the repeat-spotter cost after a deadlock, and whether arming without a burst is strong enough against practiced pairs.

The [design brief](../archive/snake-show-design-brief-v2.md) fixes the invariant: **every Prize Lift has exactly two motors and two operators under comparable conditions**. The third motor adds a second balance axis and another coordination relationship. A failure then mixes player behavior with a different task, weakening the interpretation of possible sabotage. Matching average success rates through tuning would not remove that difference.

## The scheduling conflict

The former sequence starts challenges with 8, 7, and 6 contestants after individual removals. Eight fits four simultaneous pairs; seven cannot fit pairs that include everyone exactly once. A deadlock only postpones the problem, and starting with another cast size cannot make repeated single removals preserve even numbers.

For an odd cast of `n` contestants, if everyone operates `k` times, the total `n × k` operator slots must be even. The smallest positive equal participation count is therefore `k = 2`, giving `n` pair attempts. This establishes a scheduling requirement, not equivalent social conditions.

Comparable conditions include common geometry, physics, starting-load assignment, time allowance, controls, Rig/Catch rules, and evidence coverage. Also compare participation count, partner exposure, rescue eligibility, and observation opportunities. Differences in partner skill and voluntary play remain part of deduction; extra demands imposed on only some contestants do not.

## Formats to evaluate together with voting

These alternatives retain the eight-player starting cast and the same Prize Lift mechanics. None of the three was adopted; the decision above kept individual removals and simultaneous pairs.

| Format | Concrete schedule to examine | What changes in the social game |
|---|---|---|
| Remove contestants in even-sized blocks before another lift | Two individual removals after act 1 and after act 2 give challenge casts of 8 → 6 → 4, or four → three → two pairs. The last vote need not preserve parity if no challenge follows. | More removal decisions per set of receipts, more role reveals, and fewer chances for a suspected player to demonstrate behavior with a new partner. The second choice may rely on the same challenge evidence. |
| Keep the cast through a block of challenges; remove afterward | Three challenge acts start with all eight contestants in four rotating pairs; removal votes occur after the challenge block. | Everyone can produce evidence across partners, but votes cannot remove a saboteur between challenges. Mid-episode role reveals and the early win for catching both Snakes no longer occur at the old points. |
| Keep individual removals; give everyone equal pair participation across heats | With seven contestants, schedule seven pair attempts across at least three heats, so each contestant operates twice with two different partners. Apply the same participation count to even casts if comparing acts on that basis. | Waiting, observing earlier heats, and reusing the shared Snake attempt create order effects. Duration, rescuer access, receipt volume, and Prize Pot opportunities change. |

Even-sized removal blocks do **not** mean eliminating an accused player's lift partner by association. Voting would still need to justify each individual removal. Whether to use consecutive ballots, a ballot naming two people, or another procedure is unresolved. Consecutive votes require decisions about when roles are revealed and what happens if one ballot resolves but the other deadlocks: proceeding with only one removal would recreate the parity conflict. Automatically removing a second contestant to fill a quota is not a specified rule.

Deferring removal also defers its consequences. An accused player continuing to operate after their role is publicly revealed would be a known Loyal or Snake partner and change the evidence being produced. The timing of accusation, removal, role reveal, loss of voting rights, and Snake survival checks must be specified together. Treating an eliminated contestant as a helper is not an equivalent shortcut.

## Worked seven-player schedule: equal turns, unresolved fairness

For contestants A–G, a possible set of heats is:

| Heat | Pairs operating | Contestants without a scheduled lift in that heat |
|---|---|---|
| 1 | A–B, C–D, E–F | G |
| 2 | B–C, F–G | A, D, E |
| 3 | D–E, G–A | B, C, F |

Every contestant operates twice, with two different partners, and waits during one heat. No contestant misses the entire act. However, G can observe before first operating, while others begin immediately; the number of nonoperators also differs between heats. Allowing all waiting contestants to rescue would change available Catch support. Equal turn counts therefore do not establish comparable conditions, and this schedule is not selected for implementation.

Keeping 45 seconds for each heat would use 135 seconds for the three heats before evidence and voting, rather than the former 45-second challenge budget. Splitting 45 seconds among three heats would shorten each lift's allowance to at most 15 seconds before transitions and instructions. Either choice changes the current experience and needs evaluation. A contestant repeating as a filler while everyone else plays once would also create unequal evidence and sabotage exposure.

The current baseline gives the Snake team one armed attempt **per act**, not per lift or heat. Adding heats must not silently grant extra attempts. Retaining one attempt creates a different choice over partners and order; changing it requires a separate decision about the heist target and victory checks. Likewise, the current one-delivery-per-station-per-act rule needs an explicit interpretation before a station hosts several pairs.

## Alternatives not adopted as automatic repairs

- A third motor or operator, including a tuned triangular tray, violates the fixed challenge rule.
- A bye chosen by the game removes someone's play and evidence from that act; alternating byes does not establish equal participation before a player might be eliminated. The selected spotter differs in two ways: the vote, not the game, determines who spots, and the spotter keeps a public role with Catch rights, a receipt, and, for a Snake, the team attempt.
- A bot substitute changes the partner and the evidence of intent. The browser's labeled simulation bots are development fixtures, not authorization for main-cast replacements.
- A returning eliminated player may have a revealed role and different information or incentives. Backstage currently grants no power over ongoing competition.
- Adding another challenge family for odd casts changes the first playable's scope and requires its own complete cooperation, sabotage, and evidence design.

## Decision and validation needed before changing the episode

Select whether to preserve one simultaneous lift per contestant or individual removal between challenges. Then specify a complete episode trace: who plays with whom, when everyone votes, who leaves, when roles become public, and when victory is checked. Keep the two-motor rule fixed throughout.

Check normal removals, first and repeated ties, abstentions, either Snake being removed, both Snakes being removed, and disconnections before and during a lift. A reconnect grace period or incomplete-episode outcome remains a proposal in the brief; none of these paths may silently create a trio, substitute partner, or missing participant. Account for time, equal operating opportunities, partner rotation, rescuers, receipts, score opportunities, and team attempts across every reachable challenge cast.

At the time of this analysis, the first useful comparison looked like removal blocks versus equal-turn heats. The decision recorded at the top of this document took a different path: it kept individual removals and simultaneous pairs, and answered the odd cast with the spotter.

## Implementation status

As of 9 September 2026 the [connected browser game](../browser/README.md) implements the decision: `assignGroups` accepts only even casts, `chooseSpotter` names the spotter, `makeStation` builds two-ended trays only, the spotter can Catch from any rescue area and, as a Snake, arm from one without a motor change, bots can spot, and each act with a spotter records a spotter receipt. The engine suite asserts two operators per lift and a spotter exactly when the cast is odd across seeded episodes.

The independent [interaction studies](../prototypes/README.md) follow the same rule: the Catch/Rig fixture pairs Maya and Leo with Nia as a Snake spotter, and the receipt/vote rehearsal pairs the cast and adds the spotter card. Passing tests establish internal consistency, not balance or fairness with real players.
