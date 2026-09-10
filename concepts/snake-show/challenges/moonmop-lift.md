# Moonmop Lift

10 September 2026 · Baseline challenge; inherited mechanics, selected creature; multiplayer balance unvalidated

**Associated creature:** [Moonmop](../creatures/moonmop.md). **Design context:** [The Midnight Fair v3](../midnight-fair-design-v3.md). [Shared challenge rules](shared-rules.md) define the common participation, Rig, Catch, clue, and reward requirements. This file owns this challenge's specific controls, physical effect, recovery location, and unresolved tests.

## Creature and purpose

**Moonmop** needs a protected lift to her overhead moon nest; her enormous trailing ears make the pod useful.

Character anatomy, color proposals, and nursery behavior live in the creature record. The round's winning team earns one baby per eligible player; station deliveries and individual saves do not award extra babies. See the [central reward rule](../midnight-fair-design-v3.md#8-collection-rewards-and-rarity).

## Normal play

A clear pod containing Moonmop rests freely on an open tray beneath an overhead nursery shelf. One cable suspends each end, with one operator controlling each cable's motor. The pair must raise both ends above the delivery line with the pod still aboard.

At a console, a fixed camera shows the tray, both operators, and nearby rescuers. **Pull** replaces movement: hold to run your motor, release to let the weight take over. **Leave** restores movement and stops that cable's input. A quick tap produces the inherited short motor pulse; it is not a separate boost.

The pod begins offset halfway toward one end. Its weight loads the nearer cable more heavily, so that end rises less readily and sinks faster. The other operator must resist over-pulling. The pod slides toward the low end when slope overcomes friction; the tray has no enclosing walls. A tilt gauge and high/low arrows show the correction: release a high end, pull a low one.

There is no automatic hoist. If both operators refuse to pull, the tray sinks toward the lower failure boundary. Boundary contact ends that lift without Catch or a diversion. This remains a safe collection event in the fiction, above the theatrical lava.

A station banks at most one delivery per trial. Finishing leaves time to observe or rescue elsewhere. Another player completing a delivery never grants the finishing pair a second baby.

## Fault and Catch

Moderate tilt gives a warning. When the pod's center passes the tray end, it rolls off and triggers a **fault**. Motors pause and tray height freezes while Catch runs. A separate warning precedes lower-boundary contact; that terminal failure does not run Catch.

During Catch, a needle crosses a marked target zone twice in a proposed three-second window. Each eligible player gets **one fresh tap per fault**. The initial target zone offers a quarter-second opportunity on each pass. Both operators and active players within the station's marked rescue area are eligible.

One successful tap saves the pod for everyone and resolves immediately. Another player's miss cannot cancel a save or consume anyone else's opportunity. Holding a button before the prompt, continuing to hold Pull or Rig, or tapping repeatedly cannot substitute for a fresh correctly timed Catch.

A successful Catch centers the pod, preserves the tray's height, clears any hidden rig, and resumes after a short reset. Catches per lift are not capped. If nobody succeeds, the pod enters the opaque collection housing; a fresh unarmed pod can reload after a proposed three seconds if time remains. The already consumed Trickster attempt never refreshes with that replacement.

## One shared armed attempt per trial

The two Tricksters share **one armed attempt per trial**, including when one is the spotter. Starting a Rig hold temporarily reserves it; the first accepted reservation has priority. Canceling before completion releases the reservation. Completing the hold consumes the attempt for the entire team, even if the later diversion fails. The teammate sees the reservation and attempt state privately.

At a moving lift, a Trickster holds **Rig** for a proposed 1½ seconds. During the hold it also sends ordinary Pull input, with the corresponding normal visible lever action. Releasing early, leaving the console, or a fault before completion cancels the hold.

Completion arms the concealed diverter for that specific pod and starts a proposed five-second motor burst: double force while held and double downward pull while released. The Trickster can exploit that stronger response to tilt the tray, but an attentive partner can still try to level it and then Catch.

**The burst timer and the armed pod are different states.** The burst ending does not disarm the pod. A later unrescued edge fault can still complete that attempt. A successful Catch, safe delivery, lower-boundary contact, challenge timeout, or cancellation defeats the unresolved rig. It never transfers to a replacement pod.

Only **an armed pod followed by an unsuccessful Catch** creates a diversion. Ordinary mistakes, unarmed drops, idle stations, sunk trays, and expired timers create none. Making an error is not by itself a Trickster action.

## Rig from the rescue area

A Trickster spotter can hold Rig inside a station's marked rescue area for the same duration and under the same reservation rule. Releasing, leaving the area, or a fault during the unfinished hold cancels it. Completion arms that pod and consumes the team attempt.

No motor is changed. The operators can still make an ordinary fault, and an uncaught armed drop then counts as a diversion. The spotter keeps their own Catch opportunity. Giving a spotter an invisible remote motor burst is not the baseline: it would make another operator's handling reflect a force they did not choose.

## Public observations remain consistent

Everyone sees the same physical scene, subject to camera position. Rig causes a real motor effect when used at a console; it does not give the Trickster a different version of the lift. Secret routing remains concealed, and fault warnings do not change with arming.

Each station supplies three clue cards in fixed location order: its outcome, its longest sustained relevant handling interval, and its last Catch response. A spotter adds the one location-and-rescue card. Selection never uses secret roles to choose a desired suspect.

Handling clues describe holding or releasing while an end was high or low. They do not report Rig input, force multipliers, cable speed, or hidden routing. For example: **“Leo kept pulling while his end was high.”** That might describe an innocent mistake or deliberate play. A missed Catch is similarly inconclusive.

The full finale can reveal arming, physical action, rescue responses, secret routing, and recorded ballots. It cannot assert an unrecorded intention or claim someone lied in conversation.

## Validation and implementation status

The [connected browser adaptation](../browser/README.md), updated 10 September 2026, implements the lift mechanics with protected Moonmop pods and local team-victory adoptions, including voted-out participants. Its provisional participation, palette and saved-ownership rules are documented there. The independent [isolated studies](../prototypes/README.md) retain their earlier interaction scope. Neither validates Roblox multiplayer balance. The saved browser preset and the reference tuning below remain distinct configurations.

Test novice and practiced pairs, refusing to pull, repeated ordinary faults, a Trickster in either console job, simultaneous Catches, reservation contention, and a Trickster spotter. Keep the two-motor geometry comparable at every station. Check whether an attentive partner can prevent an ordinary loss and still has meaningful counterplay against Rig. Repeated spotting and the effects of removal remain round-level questions in v3.

The main reference uses a centered reset after Catch; an edge reset and one attempt per Trickster remain unselected alternatives. This extraction changes no mechanics, tuning, or implementation.

## Tuning reference

These are starting values from the coupled-cables model and browser adaptation, not measured balance for a multiplayer creature game. Distances use tray half-lengths: a tray is two units long. The historical model identifier `water` refers to the lower failure boundary, not the v3 visual theme.

**Reference versus selected study:** this table describes the original width-2 coupled-cables reference. To reproduce the user-approved browser study, use its [complete preset](../browser/presets/approved-2026-09-08.json), including width 1.2, bot skill 20%, and friction 0/0. Neither the reference table nor the selected local preset is designated final production tuning by v3.

| Setting | Starting value |
| --- | --- |
| Motor force relative to centered load | 1.7 |
| Maximum end speed, up/down | 0.2 units per second in each direction |
| Winch drag | 4.0 |
| Gravity | 1.5 |
| Pod-to-tray weight ratio | 1.0 |
| Pod slide response / drag | 1.2 / 0.1 |
| Static / sliding friction | 0.02 / 0.05 |
| Initial pod offset from center | 0.5 |
| Tap pulse | 0.15 seconds |
| Delivery height above start | 2.6 |
| Lower failure boundary below start | 1.8 |
| Maximum end-height difference | 1.6, giving approximately 53° maximum tilt |
| Rig hold / burst | 1.5 seconds / 5 seconds |
| Rig held-force / released-pull multipliers | 2 / 2 |
| Catch duration / opportunity per pass | 3 seconds / 0.25 seconds, two passes |
| Fresh pod reload after an uncaught spill | 3 seconds |

The current browser's short post-Catch reset and replacement-height behavior are implementation choices documented in its README. Server timing, latency allowance, and final reset details require their own validation. Returning a caught pod to the center remains the baseline; returning it to the edge is an unselected alternative.
