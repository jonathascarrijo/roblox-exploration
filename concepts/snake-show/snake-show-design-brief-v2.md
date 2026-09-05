# Snake Show design brief v2

Version 2, Prize Lift revised · 5 September 2026 · Design for prototype validation

## What the game is

Snake Show is an online party game on Roblox, the platform where players join games as customizable 3D avatars. Eight players become contestants in a colorful reality-TV competition set in a luxury villa. Each short match is presented as one television **episode**, with team challenges, evidence, live votes, and a final reveal.

The cast has **eight contestants in total: six Loyals and two Snakes**. The Loyals protect the show’s prizes; the Snakes try to steal them through hidden sabotage. A **Loyal** is any contestant who is not a Snake; together they are the Loyals. Roles are assigned privately at the start. Snakes look like ordinary contestants; the name describes their secret role, not an animal character. They know each other’s identities. Loyals know only their own role.

A **heist** is a successful act of sabotage that diverts a challenge’s prize to the Snake team. It is a playable action with an opportunity for others to stop it. Simply making a mistake or losing a challenge does not count as a heist.

## What players do

Contestants move around the villa, cooperate in short physical or timing challenges, watch for suspicious behavior, and inspect **receipts**: event cards showing limited, factual observations. They then vote to remove a suspected Snake from the competition. Removed players can follow the episode from a backstage lounge or join another match.

An episode contains up to three challenge-and-vote **acts** and lasts about 4½ to 5 minutes. Snakes win only if they complete at least two heists and keep one Snake in the competition after the final vote. The Loyals win if either condition is prevented. The finale reveals the roles and reconstructs the key sabotage moments.

## The experience and the business

The intended feeling is playful suspicion: “I trusted my partner, but the replay showed what they did.” Bright stage lights, exaggerated props, confetti, and expressive avatars make the show theatrical rather than frightening. Players earn career progress and cosmetic rewards that continue across episodes.

The initial audience is ages 13–16 worldwide, primarily on phones. The commercial aim is a large returning community that values optional appearance and presentation purchases. This brief specifies the game to prototype; timings, balance, and demand still need player evidence.

# The villa, the characters, and the screen

## The setting

The proposed first set is a compact, stylized luxury villa built as a television studio. A bright courtyard connects a pool deck, challenge stations, and a voting stage with eight contestant podiums. Visible cameras, overhead lights, velvet ropes, and oversized prize cases communicate that everyone is on a show. The layout keeps players close enough to observe one another.

The **lobby** is the arrival area outside an episode. It contains the play button, a practice station, and a dressing-room panel for choosing cosmetics. **Backstage** is the separate lounge for contestants who have been voted out. “Onstage” means still competing, including while moving around the villa; it is not restricted to the voting platform.

## Art direction and character identity

Use rounded shapes, glossy props, warm sunlight, teal pool water, and coral or violet show graphics. The tone is an exaggerated party competition. A stolen prize disappears through a theatrical hatch; a removed contestant exits through confetti. There is no combat or death in the core game.

Players keep recognizable humanoid avatars with compatible outfits and standardized gameplay visibility. Each episode assigns a stable contestant number, portrait, and nameplate so evidence remains readable despite elaborate cosmetics. Snakes have no publicly visible uniform or marker. Their role and teammate information appear only on their own private interface.

## What appears on a phone

During a challenge, the top of the screen shows the act number, time remaining, and **Heists: 0/2**: completed thefts toward the Snakes’ target. This number never means Snakes remaining. Local instructions and large thumb controls explain the task. A smaller Prize Pot indicator shows the score earned from deliveries; it is separate from both team size and heists.

The evidence screen displays a few automatically generated event cards, each with an act, location, and relevant contestants. The voting screen shows the remaining contestants as large selectable portraits. The result screen announces the winning team before showing the replay and rewards. Only information relevant to the current phase occupies the main screen.

## Sound and presentation

Short host captions, countdown tones, camera flashes, and crowd reactions support the show framing. Every gameplay cue also has a readable visual equivalent. Icons and shapes accompany colors. Outfits and effects must preserve visibility on low graphics settings, and paid entrances occupy the same time as free ones. This is an art-direction proposal, not finished concept art.

# An episode from arrival to rewards

## Casting: 10 seconds

Matchmaking assembles eight players. A private card assigns each player to the Loyals or the Snakes and shows that team’s objective. Snakes also see their teammate. All eight entrances appear in a short shared montage. Players do not select or buy their team assignment.

## Each act: 45 seconds of challenge play

All contestants still competing enter the next cooperative challenge. Movement, grouping, instructions, and play fit within 45 seconds. Players can request partners where supported; the game assigns everyone else and rotates groups across acts. Prize Lift uses pairs, with one three-person lift when the active cast is odd. Every operator controls one cable using the same input.

The Snake team has **one armed heist attempt per act**. At Prize Lift, beginning a private Rig hold temporarily reserves it; the first accepted hold gets priority. Completing the hold consumes the attempt. Canceling before completion releases the reservation. A stopped or unsuccessful armed attempt cannot be retried that act. The other Snake sees the team’s attempt status privately.

## Evidence: 10 seconds; voting: 25 seconds, plus a 10-second runoff when tied

At the challenge’s end, the show announces whether a heist succeeded and updates **Heists: x/2**. It then presents a small set of receipts. Players examine the evidence before voting opens. Each active contestant has one secret vote for another active contestant; totals appear together when voting closes. A missing vote is an abstention.

The contestant with the most votes leaves the competition and their team is revealed. A tie for the most votes opens a 10-second **runoff**: only the tied contestants are selectable, every active contestant votes again, including the tied ones, and nobody can vote for themself. Receipts stay open, and a missing vote is an abstention. If the runoff also ties, the show announces a **deadlock** and nobody leaves; that act’s vote is still used. The same process repeats for up to three acts. Without deadlocks or early endings, the active cast shrinks from eight to seven to six to five.

## Winning and the finale: 20 seconds

After the third vote, Snakes win if they have at least two successful heists and at least one Snake remains active. Otherwise the Loyals win. Catching both Snakes ends the episode early with a Loyal victory. Two unsuccessful heist opportunities also trigger an early Loyal victory because reaching two successes is then impossible.

The finale reveals all roles, shows a short factual reconstruction, and awards progress. All original team members share their team’s result, including those voted out. Active survivors do not win individually. The full timing is **10 + 3 × (45 + 10 + 25) + 20 = 270 seconds**, plus 10 seconds for each act that needs a runoff, so an episode runs 270 to 300 seconds. Queue time is additional; transitions are included in the phase budgets.

# Prize Lift — the normal controls

Prize Lift is a cooperative lifting challenge played on a bright studio gantry above the pool. One oversized prize capsule rests on an open **tray** hung from two long cables, one at each end. Each cable has its own motor, and each operator runs one motor. There is no automatic hoist: the operators lift the tray to the receiving shelf themselves. **Get both ends of the tray above the delivery line with the capsule still aboard.** All numbers in this chapter are prototype settings; the table at its end lists them with their names in the playable model.

## Take a console; learn one action

Each operator stands at a numbered console controlling one end of the tray. A normal station has two operators; an odd-sized cast uses one station with a triangular tray, three cables, and three operators, each at a corner. A fixed camera keeps the entire tray, consoles, and nearby contestants visible. The movement joystick is hidden while operating; **Leave** restores movement and releases that cable’s input.

The large **Pull** button has one rule: **hold to run your motor and raise your end; release to let the weight take over.** A held motor pushes its cable with a fixed force. A released cable pays out under whatever it carries. There is no extra boost, and a quick tap only runs the motor for a short pulse, a proposed 0.15 seconds. Pulling and releasing visibly move the avatar’s lever and the corresponding cable. Both teams use identical controls and physical rules.

## The capsule leans on the nearer cable

The capsule’s weight splits between the cables by distance. Near the left end it loads the left cable; at the center it loads both equally. Motor force is fixed and the load is not, so the loaded end answers a pull sluggishly and sinks fast, while the light end answers at once and sinks slowly. The operator carrying the capsule has to hold longer. The operator on the light end has to hold less than feels natural, or the tray tilts.

The tray starts level with the capsule halfway to one end, on a random side, so the two cables never start with the same load. The tray tilts whenever its ends move at different rates. The capsule holds still below a slope of about 1.7 percent, then slides toward the low end, and nothing stops it at the edge. A level gauge mirrors the tray’s tilt, and a local arrow says whether your end is high or low, with shape and position accompanying color. If your end is high, release while the other operator pulls. If it is low, pull. On the three-cable tray, a bubble level shows tilt across the triangle; each player still manages only their own corner.

## The operators set the pace

Nothing lifts the tray except the motors. With both operators holding, the tray reaches the shelf in about 13 seconds at the proposed settings. With neither holding, it sinks. The pool surface sits deeper below the start than the tray can tilt, so one end can reach the water only when both ends have sunk. Any end touching the water is an **automatic drop**: the capsule is lost with no Catch, and the lift simply fails. Refusing to pull therefore cannot produce a safe delivery, and no single operator can sink the tray alone.

Reaching the shelf with the capsule aboard banks one delivery into the Prize Pot. A station can score one delivery per act. Finished operators can watch or help another station for the remaining time. Failure, recovery, and sabotage are defined on the following pages.

## Proposed settings

Distances are in tray half-lengths, so the tray is two units long. These values were tuned by hand in the playable model at [`prototypes/prize-lift-coupled-cables.html`](prototypes/prize-lift-coupled-cables.html), where every row is a slider. They are starting points for the tests below, not validated balance.

| Setting | Proposed value | Name in the model |
|---|---|---|
| Motor force, relative to the load with the capsule centered | 1.7 | `force` |
| Top speed of an end, up | 0.2 per second | `vup` |
| Top speed of an end, down | 0.2 per second | `vdown` |
| Winch drag | 4.0 | `cw` |
| Gravity | 1.5 | `g` |
| Capsule weight, relative to the tray | 1.0 | `ballW` |
| Capsule slide response to slope | 1.2 | `roll` |
| Capsule slide drag | 0.1 | `cb` |
| Static friction, the slope the capsule holds still below | 0.02 | `mus` |
| Sliding friction | 0.05 | `muk` |
| Capsule start offset from the center | 0.5 | `x0` |
| Tap pulse | 0.15 s | `pulse` |
| Delivery line above the start | 2.6 | `finish` |
| Water line below the start | 1.8 | `water` |
| Maximum tilt, from the tray’s length | about 53° | `dmax` |
| Rig hold to arm | 1.5 s | not in the model |
| Rig burst length | 5.0 s | `rigTime` |
| Rig force multiplier while held | 2 | `rigForce` |
| Rig pull-down multiplier while released | 2 | `rigDown` |
| Catch window | 3 s, two passes | `catchWin` |
| Catch zone | 0.25 s per pass | `catchZone` |

# Prize Lift — faults and recovery

## A warning players can read

Moderate tilt produces an amber warning and a directional arrow. Returning toward level clears it. The tray has no walls. If the tilt persists, the capsule slides, and when its center passes the end of the tray it rolls off: the motors freeze, the capsule begins to fall, and a three-second **Catch!** sequence starts. A tray sinking toward the water shows a separate warning when either end comes within 0.3 of a unit of the surface.

The fault looks the same whether a Snake has rigged the lift or everyone is innocent. Its warning, sound, and the capsule’s movement carry no role information. Normal Pull input pauses during the sequence, and the tray holds its position. A warning identifies a physical problem; it does not identify sabotage.

## Catch is a timing action

A large needle sweeps across a marked catch zone twice during the proposed **three-second window**. Tap **Catch** when the needle is inside that zone. The initial target is a quarter of a second of opportunity on each pass, with enough lead-in to read the cue. The world gauge and local overlay show the same server-timed motion.

Each operator gets one tap per fault. Active contestants standing in the clearly marked rescue area can also attempt a catch, once each. **One successful tap saves the capsule for everyone.** Another player’s early or late tap cannot cancel that save or consume someone else’s opportunity. The first successful input resolves the sequence immediately.

Catch requires a fresh press after the prompt appears. Holding Pull, holding Rig, pre-holding Catch, or rapidly tapping cannot automatically complete it. A missed tap uses that player’s opportunity; the remaining eligible players can still save the capsule. Input acceptance needs a bounded latency allowance tested on ordinary phones and connections.

## What happens next

A successful catch puts the capsule back at the center of the tray and resumes the lift from the tray’s current height after a short reset. It also clears any hidden rig on that prize. Players see **“Caught — keep lifting”**, without learning whether a rig existed. Each rescue costs the window plus the climb back, about one to three seconds. In simulated runs at the proposed settings, a lift that survived a single fault finished at about 15 seconds, and a partner who held without ever leveling survived seven faults in a row and still delivered at about 25 seconds. Catches per lift are deliberately not capped. A station that spills and is saved again and again is itself a strong tell that one operator keeps tilting the tray while the other keeps saving it, which points at a Snake and is therefore not in a Snake’s interest. Whether the capsule should instead return to the edge it fell from is a test setting.

If nobody succeeds, the capsule falls into the pool’s opaque collection housing. Everyone sees that same failure. A fresh capsule loads on the tray after a proposed three seconds if time remains; the station still has at most one scoring delivery. An already consumed Snake attempt stays consumed. Expiry of the act, a sunk tray, or an administrative cancellation never creates a heist by itself.

# Prize Lift — the hidden heist

## Rig is a private control, with a real effect

While operating a moving tray, a Snake can hold **Rig** instead of Pull for **1½ seconds**. For that entire hold, Rig also sends the ordinary Pull input: the same end rises, the same lever moves, and the same load rules apply. Releasing early, leaving the console, or entering a fault before completion cancels the unfinished hold and releases its reservation.

Completion consumes the team’s act attempt and does two things at once. It arms a concealed diverter in the collection housing for this capsule. And for the next **5 seconds** it doubles that motor: twice the force while held and twice the pull on the cable while released, so that end moves twice as fast in both directions. The Snake privately sees **“Rig armed”** and a countdown. The button then becomes unavailable for another attempt. No exterior hatch opens and no object changes appearance.

## The burst tilts the tray; the Catch decides the theft

Without the burst, a Snake cannot out-tilt an attentive partner, because both motors have the same limits. The doubled motor is what makes sabotage possible, and it lasts five seconds. From the light end, a burst of pulling drives the capsule toward the partner’s end and off it. From the heavy end, letting the doubled cable drop does the same toward the Snake’s own end. Either way the tray tilts, the capsule slides, and Loyals get the ordinary Catch. A partner who levels quickly can still keep the capsule aboard.

An **armed capsule followed by an unsuccessful Catch** diverts it into the concealed Snake channel: one successful heist. Without a rig, the same visible drop sends it to the ordinary recovery bin and awards no heist. A successful Catch clears the rig and ends that attempt; safe delivery, a sunk tray, or the act ending also defeats an unresolved attempt. The rig cannot transfer to a replacement capsule.

## One shared scene; limited private information

Loyals, Snakes, and live observers see the same tray position, lever movement, tilt, warning, capsule slide, Catch gauge, and capsule drop, subject to their camera view. **There is no Snake-only version of the physical scene.** The internal routing is concealed from everyone’s live camera. A doubled end does move visibly faster than a plain motor allows; the brief accepts that as a live observation a watching player may or may not notice, and the receipts never record it.

Only private interface information differs: role card, Snake teammate identity, Rig button, hold progress, burst countdown, attempt status, and immediate confirmation of its outcome. Everyone receives the successful-heist count at the act’s end. The finale can show a cutaway of the recorded diversion after roles are revealed. The stolen capsule is an episode prop, never a player’s owned item or saved currency.

## Prototype acceptance

First verify that novices understand hold/release and the leaning capsule, a single attentive Loyal can rescue, and both viewers see identical public events. Test refusal to play, constant holds, tap spam, deliberate imbalance, and two- versus three-person stations. Measure, against novice and practiced Loyal partners, how often a Rig burst produces a fault and how often that fault becomes a heist. If experienced players stop every heist, or newcomers cannot stop one, revise the interaction before adding challenges.

The earlier model’s simulation found that the Catch, not the tilt, decides the heist rate, and the coupled-cables model has not changed that. Expect the catch-zone width and the number of attempts per act to be the balance dials, with the Rig burst length and multipliers behind them.

# Receipts, deduction, and the live vote

## What evidence actually says

A receipt is a short, automatically generated record of something the show’s cameras or challenge systems observed. It is always accurate within its stated scope, but does not expose the complete event log. For example: the east lift failed; Maya and Leo operated it; Leo kept pulling while his end was high; Maya missed a catch.

These receipts identify a place, people, and observable actions. A normal Pull and a Rig hold have the same public action, so no card names the private Rig input before the finale. Receipts record when a motor was held or idle while its end sat above or below the other, never how fast an end moved, so a Rig burst leaves the same kind of card as an ordinary over-pull. Other stations may have failed innocently, and successful heists are announced for the act as a whole. Comparing behavior across acts and partnerships is how players narrow their suspicions.

Receipts remain accessible for the rest of the episode. The initial design shows only a few salient cards at once; players can revisit earlier acts. Selection must follow documented coverage rules, rather than secretly choosing clues that guarantee a desired winner. The full record is reserved for the finale.

## What a player can decide

A player might trust someone who helped deliver a prize, suspect repeated poor winch handling before failures, or reconsider when another partnership produces conflicting evidence. A missed catch is not proof of guilt. Loyals try to identify the Snakes. Snakes can cooperate to build credibility, choose when to risk sabotage, and vote to divert suspicion.

Voting is based on player judgment. A vote is never presented as verified evidence. The core interface consists of the automatic event board, an optional local suspect selection, and the final ballot. A local selection is visible only to that player until they submit a vote; it does not send a custom message.

## Communication and fairness

The game must remain understandable when text and voice chat are unavailable. Optional communication uses Roblox’s permitted systems. Additional shared accusation buttons or player-selected receipts require assessment under Roblox’s preset-message rules [2]; they are not assumed to be available in the baseline.

No player can purchase an extra vote, clearer evidence, a different role probability, or faster access to the result. Identity markers and evidence visibility remain consistent across outfits, graphics settings, devices, and languages. The game does not issue permanent “liar” labels or carry a suspicion score into later episodes.

## What the reveal proves

The finale can identify the actual operator, the rig, the missed or successful response, and the resulting heist. It can show relevant ballots, including runoff ballots, as historical actions. It cannot claim that a player saw something, lied in conversation, or intended a betrayal unless that information is explicitly supported by recorded game actions.

# A complete example episode

This illustrative episode demonstrates the rules. It is not a scripted sequence that the game forces players to follow.

## The cast and the first act

Maya, Leo, Nia, Omar, Tess, Hugo, Iris, and Ben enter the villa. Leo and Nia privately learn that they are Snakes. The other six are Loyals and do not know who the Snakes are.

Maya partners with Leo at Prize Lift; each controls one end of the tray. Leo completes a Rig hold, and for the next five seconds his doubled motor keeps pulling while his end is already high. The capsule slides off Maya’s end before she can level, and she mistimes her Catch tap. Nobody else saves the case, so its capsule is diverted. Another station fails innocently. The act ends with **Heists: 1/2**.

Receipts show both failed stations and relevant winch actions. Maya remembers Leo helping earlier and votes for Hugo. Enough others choose Hugo that he is removed; his card reveals Loyal. He can follow the public episode backstage or start another match. **Seven contestants remain: five Loyals and two Snakes, Leo and Nia. Heists: 1/2 means one successful theft, not one remaining Snake.**

## The second act

Groups rotate. Nia uses the next act’s attempt successfully at another station, bringing the display to **Heists: 2/2**. Both Snakes are still active before this act’s vote. They have met the theft requirement, but at least one must survive all remaining votes.

This time the group votes out Leo, and his card reveals Snake. Six contestants remain: five Loyals and one Snake, Nia. **Heists: 2/2 stays unchanged** because removing a Snake does not undo completed thefts. The Loyals can still win by identifying Nia in the final act.

## The third act and the outcome

Nia chooses to play cooperatively in the final challenge. She already has the two team heists required and now wants to avoid suspicion. Not using this act’s attempt does not erase either previous success.

The remaining players revisit the second act’s receipts and connect Nia with that station’s suspicious adjustment. They vote her out. With both Snakes exposed, the Loyals win despite the two stolen capsules. If they had instead removed a Loyal or deadlocked, Nia would have survived and the Snakes would have won.

## The payoff

The finale reconstructs Leo’s rig and winch action, Maya’s missed catch, the first vote, and Nia’s later heist. Players see how cooperation, observation, and voting produced the outcome. Hugo still receives the Loyal team-result bonus despite his early removal. Everyone can equip earned cosmetics and choose another episode.

# Joining, leaving, and playing backstage

## A first session on a phone

A newcomer arrives in the lobby and selects Play. While the game finds seven other contestants, they can try a clearly labeled practice station. The first experience teaches movement and one interaction, then introduces the team objective at casting and receipts at the first evidence phase. A full role manual or store tour is unnecessary.

Internal targets are a meaningful first interaction within 15 seconds and an episode start within 45 seconds at the 90th percentile in supported regions. These are prototype targets, not measured results or Roblox benchmarks. Matchmaking delays, failed joins, and practice time must be visible in the product metrics.

Use standard Roblox movement and a large context button. At a Prize Lift console, a fixed camera replaces movement controls with Pull, temporarily Catch, and a small Leave control. Eligible Snakes also see Rig. Nearby rescuers receive Catch within the marked rescue area. Keep voting portraits large and make every cue readable without sound.

## After a contestant is voted out

The player moves to backstage, a lounge outside the competition. They can inspect the same public receipts, follow public outcomes, try a short practice activity, prepare their next entrance, or choose **New Episode**. Selecting New Episode leaves that match and starts matchmaking again; it does not erase earned progress.

Backstage offers no hidden-role camera feed, new private clues, or power over the current vote. Players cannot send targeted hints, spotlight suspects, or change ongoing rules. They may select cosmetic or challenge preferences for a later episode. Optional free predictions can be tested later, without stakes or purchases, and with no hidden-role prediction rewards for Snakes.

Earned participation credit is recorded when the player leaves. Any later team-result reward is delivered once when the old episode resolves. Measure whether players voluntarily follow the result, stay active backstage, or prefer a fresh match. The presence of a spectator feature does not establish engagement.

## Friends, incomplete episodes, and re-entry

One primary public queue keeps the population together. Small friend groups can join together; basic friend play is free. New arrivals enter between episodes and do not inherit departed players’ secret roles. Any computer-controlled practice characters are explicitly labeled and remain outside the main cast.

A brief reconnect allowance should cover temporary connection loss. If a departure makes a fair episode impossible, end it as incomplete and preserve earned participation credit. The precise grace period and cancellation rule need validation. Incomplete episodes are recorded separately from normal team wins and losses.

# Career progress, identity, and purchases

## What carries into the next episode

**Fame** is a non-spendable measure of career progress. **Show Credits** are earned currency for cosmetic unlocks. Both persist between episodes. The Prize Pot and heist counter belong only to the current episode and reset afterward. A future competitive rating would be a separate measure of match performance.

Players receive baseline progress for meaningful challenge participation, plus modest bonuses for the team result and useful performance such as a correct vote. Repeated accusations, intentionally getting removed, and idle time do not generate bonus progress. Exact reward amounts remain to be tested.

The persistent identity is a recognizable contestant: an outfit, entrance animation, reveal performance, trophy shelf, and dressing-room backdrop. The **dressing room** initially means a compact customization panel and preview area in the lobby. A large explorable personal room is a possible later feature.

## Self-expression and relationships

Style labels such as Mastermind or Showstopper can describe cosmetic themes or earned achievements. The launch game has only two functional roles, Loyal and Snake, with no additional secret professions, neutral teams, or personal victory conditions. Future abilities require a clear purpose, equal gameplay access, and independent testing.

Players can choose to rematch with a compatible cast and use Roblox’s supported friend controls. Later, recurring groups could earn a shared cosmetic set or trophy display. Permanent memories should celebrate participation and achievements; a player’s suspicion or unpopularity in one episode should not become a public label.

## What can be sold

Optional fixed-price purchases include outfit sets, entrances, reveal animations, emotes, and dressing-room decor. Players see the item in a preview and use it during normal show moments. Paid and free presentation options have the same duration and preserve equal visibility, information, voting weight, and timing.

A **season** is a themed content period with new challenges, presentation, and collectibles. A **season pass** is an optional paid reward track for that period, with clear completion and return policies. It follows a reliable release cadence rather than being a dependency for the prototype. Basic participation and winning never require buying it.

Advanced private hosting could eventually sell controls for organizing a show with friends. Trading, paid random rewards, role-odds purchases, stat boosts, and purchased reputation are outside the initial scope. Revenue should be assessed through returning players, payer conversion, and actual creator receipts, alongside acquisition and operating costs. Item desirability and willingness to pay need direct evidence.

# Growth, seasons, and future formats

## Why an episode may be worth sharing

A brief reconstruction of real cooperation, sabotage, and voting can make an episode understandable to both its players and a viewer. The first implementation is an in-game reenactment generated from event records. A reusable video file is a separate feature; any native capture must be checked against the current CaptureService controls and device support [6].

Measure voluntary viewing, replaying, and capture, then separately measure attributable visits and the behavior of those visitors. Producing a finale every episode does not by itself create viral distribution. Replays must show a meaningful, player-created reversal and remain quick to dismiss.

## Roblox discovery and the unfamiliar player

Roblox’s discovery system recommends games to players. Its current guidance emphasizes early departure, play-through, repeat play days, and playtime, with additional signals including intentional friend play and spending. It distinguishes users acquired from Home recommendations from other sources [1]. The product implication is to make the first episode work for an unfamiliar solo player as well as for a creator’s established group.

Promotional images should show actual recognizable situations: partners at a challenge, a suspicious adjustment, a vote, or a reveal. Evaluate promotion through first-episode completion and later return as well as clicks. A popular creator’s entertaining session does not demonstrate that random public groups will enjoy the same rules.

## Content that adds variety without losing readability

Begin with one villa and, after validating Prize Lift, add two more mechanically distinct challenge families. A challenge family is a reusable type of activity with variations in layout, timing, partner structure, and evidence coverage. New families must define their own heist action, counterplay, and receipt rules before implementation.

A later season can add a visual theme, one challenge family, selected cosmetics, and a shared event. Bigger settings such as a cruise ship or ski lodge should retain familiar controls and clear evidence. A **modifier** changes one announced rule for an episode; introduce these only after the base format is understood and test each interaction.

Shared premieres can place the same special challenge in ordinary servers with repeat windows across time zones. Measure return after the event separately from the event’s peak player count. Roblox’s 2025 retrospective describes both event-driven peaks and established games; that observation does not establish what causes durable success [5].

Future ranked competition, spectator hosting, player trading, and creator-authored formats each need their own audience evidence and operational capacity. The expansion ambition is a recognizable reality-show franchise whose formats share a contestant identity and an enjoyable social core.

# Prototype scope and evidence for expansion

## The first playable product

Build one small villa set, Prize Lift, eight-player casting, two secret teams, the heist counter, an automatic receipt board, secret voting, a short factual reveal, and a clear New Episode action. Use simple temporary art—a **gray-box prototype**—while preserving the visual cues needed for cooperation and deduction.

Add two more challenge families and a small earned cosmetic collection after the initial gameplay test. Advanced customization, additional role types, ranked matchmaking, trading, and multiple public queues are outside this first scope. Generous resources should improve observation, iteration, accessibility, and polish before increasing the number of systems.

## Can people understand and enjoy it?

Run repeated sessions with roughly 40–60 appropriately recruited target-age players on real phones, covering strangers and existing friends. After a brief objective explanation, stop coaching. Ask what happened before showing the complete replay. Watch whether votes reflect observed events or simply follow a confident participant.

Proposed initial screening gates are that 80% explain their team objective, 70% identify relevant evidence, and 60% voluntarily start another episode when free to stop. Compare suspect accuracy against a random choice among eligible contestants. Team win rates alone may reflect sabotage difficulty. These small-sample gates are internal proposals, not population retention estimates.

Compare 4½- and six-minute episodes, easier and harder Catch timing, shorter and longer Rig bursts, and permitted chat on or off. Change one major factor at a time. Test idle stations, constant holds, tap spam, intentional imbalance, extra rescuers, coordinated friend votes, and newcomer targeting. Measure heist success against novice and practiced Loyals; tune two- and three-person stations separately. A dominant low-effort strategy requires revision. Record the tie rate per vote and how each runoff resolved; if deadlocks stay common, revisit the vote structure rather than the tie rule.

## Do unfamiliar players return?

Use fresh public cohorts once the game is understandable and eligible for its audience. A **cohort** is a group of players who first arrived in the same period. Track their first interaction, challenge, evidence view, vote, removal, finale, next episode, and later return, including crashes and departures.

Illustrative ambitions are 75% first-episode completion and return rates of 30% on day 1, 12% on day 7, and 6% on day 30. These are proposed targets; compare them with actual similar-experience benchmarks. Roblox’s retention measures refer to returning on the specified day [3]. Segment by acquisition, device, region, party size, and communication availability.

Use adequate sample sizes and stated uncertainty before expanding. The decision should depend on voluntary repeat play, later return, and cosmetic demand in ordinary public groups, including after a content lull.

# Delivery constraints and open decisions

## Information, reliability, and fair outcomes

The server must own roles, sabotage reservations, winch state, Catch resolution, vote totals, rewards, and the factual replay. Replicate one public scene to every viewer. Send private role and rig information only to eligible clients; merely hiding secret data in a Loyal’s interface is insufficient. Validate input timing, proximity, and state transitions, including simultaneous catch attempts.

Rewards must be issued once even if a player reconnects, starts another episode, or a server retries. The Product Owner should require explicit behavior for missed votes, abandoned sabotage claims, disconnects, and incomplete episodes. The proposed reconnect and cancellation rules need tests against deliberate leaving as well as normal connection loss.

Role assignment may use bounded recent history to reduce long waits for a Snake turn, provided the weighting does not make roles predictable. External voice chat and friends revealing their roles remain limitations. Competitive ranked play needs stronger integrity evidence than casual sessions.

## Platform requirements affecting the product

Roblox’s preset guidance limits one experience—called a Universe in its technical documentation—to 12 displayed presets, requires a ten-second send rate limit and filtering, and prohibits recreating free-form conversation [2]. Any added shared receipt, accusation, or confession interface must be assessed for its actual communication behavior. Optional text and voice use Roblox’s authorized systems.

Current age-based account materials describe additional evaluation for games available to under-16 players and different access and communication rules by account and region [4]. Confirm actual audience eligibility, maturity classification, and creator requirements before recruitment or paid launch. Describe the game’s real features accurately during review.

All characters, branding, art, sound, and show presentation must be original or properly licensed. Snake Show is a working title whose availability remains unverified. Team names are localized through the experience’s translation table rather than left to automatic translation, which would render an invented noun such as “Loyals” unpredictably [7]. “Loyal” has a plain native word in most supported languages, but its transliteration in Japanese and Korean reads as “royal”, so those two need a native term; and its French and German forms coincide with the team name used by local editions of the reality format The Traitors, so the name should be reviewed for format proximity together with the working title. The proposed visual treatment is a design direction, not evidence that assets, a name, or platform approval have been secured.

## Decisions the prototype must resolve

The two-heist target, the 1½-second Rig hold, the five-second Rig burst and its multipliers, the three-second Catch window and quarter-second zone, the motor force and speed limits, the capsule’s friction and start offset, the pool depth, receipt coverage, runoff length, and episode length are test settings. Two Prize Lift rules remain open from its review: whether the Snake team keeps one attempt per act or each Snake gets one, and whether a caught capsule returns to the center or to the edge it fell from. The core question is whether players enjoy cooperation, notice a plausible betrayal, reason about evidence, and feel fairly treated when wrong.

The Prize Pot must be understandable as a temporary performance score alongside the heist objective. Backstage must earn voluntary attention. Cosmetics need demonstrated desirability. If any of these systems confuse players or fail to add value, simplify them before expanding. A new challenge needs a complete description of normal play, sabotage, prevention, evidence, and rewards before it enters the backlog.

# Sources and interpretation

Official materials were checked on 5 September 2026. Platform documentation can change. Sources support the stated platform facts; the game mechanics, visual direction, example episode, and numeric test targets in this brief are proposed design choices.

**[1]** [Roblox Creator Hub — Discovery](https://create.roblox.com/docs/discovery)

Recommendation signals, acquisition-cohort distinctions, and interpretation of benchmark experiences.

**[2]** [Roblox Creator Hub — Preset system guidelines](https://create.roblox.com/docs/chat/preset-system-guidelines)

Permitted gameplay presets, finite scope, communication boundaries, filtering, display limits, and send-rate requirements.

**[3]** [Roblox Creator Hub — Retention](https://create.roblox.com/docs/production/analytics/retention)

D1, D7, and D30 cohort definitions; first-time experience, core-loop, and performance guidance.

**[4]** [Roblox — Safety Center](https://about.roblox.com/safety)

Current Kids and Select account descriptions, communication controls, and review process for available games. See also the April announcement below.

**[4a]** [Roblox — Introducing Kids and Select accounts](https://about.roblox.com/newsroom/2026/04/introducing-roblox-kids-and-select-accounts)

Announcement of account progression, additional game evaluation, and regional variation. Use current operational guidance for launch requirements.

**[5]** [Roblox — The 2025 Roblox Replay](https://about.roblox.com/newsroom/2025/12/roblox-replay-decoded-search-style)

Retrospective on searches, established and new games, shared events, and device differences. Descriptive platform evidence, not causal retention analysis.

**[6]** [Roblox Creator Hub — CaptureService](https://create.roblox.com/docs/reference/engine/classes/CaptureService)

Authoritative reference to check before implementing native capture. In-game reconstruction is a separate proposed feature.

**[7]** [Roblox Creator Hub — Localization](https://create.roblox.com/docs/production/localization)

Automatic translation of in-game text, precedence of manual translation-table entries, and the AutoLocalize property for text that must not be translated.

## How to use this brief

This document is the complete proposed concept for a Product Owner evaluating and organizing Snake Show. It explains the player experience before commercial strategy and delivery constraints. It is sufficiently concrete to scope and test the first playable, while leaving unvalidated timing and balance values open to revision.

The first product review should use observed player behavior to decide which mechanics deserve refinement and which should be removed. Later production specifications will add exact screen states, asset requirements, reward quantities, error handling, and acceptance criteria for each implemented feature.

# Annex A — Why the design changed

This annex explains changes from the initial concept and subsequent Prize Lift refinements. It is historical context; the main brief defines the complete proposed game. Design judgments remain hypotheses until tested.

## What stayed: the cast and the show fantasy

The cast remains **eight contestants: six Loyals plus two Snakes**. The opening now states the total first. “Heists: x/2” explicitly counts thefts, never remaining Snakes; the worked example states both team sizes after removals. The reality-show fantasy, short episodes, secret betrayal, persistent cosmetic identity, and fair role assignment remain central.

## Challenge sabotage replaces free-roam attacks

The initial concept let Snakes remove isolated contestants between minigames. Sabotage now happens inside cooperation; only voting removes contestants. Partner choice, mistakes, and suspicious behavior belong to one activity, and more players stay active long enough to develop shared history.

This gives up some chase tension and the immediate thrill of an attack. Prize Lift must provide enjoyable physical cooperation and counterplay; keeping contestants active does not excuse a flat challenge.

## Prize Lift: clearer controls and credible secrecy

The earlier v2 mixed winch and balancing jobs, timing taps, boost, Rig, and a hold-to-Stabilize response. The refinement gives every operator one hold/release cable control. Automatic motor progress prevents refusing to play from guaranteeing safety. Catch becomes a timing action with an individual attempt, so holding or spamming cannot automatically rescue, and a Snake cannot veto someone else’s save.

Rig now arms concealed routing rather than creating a mandatory disturbance. Its hold also performs a real Pull, with identical public physics and animation. A heist requires an actual unrecovered failure. This preserves observable suspicious behavior without rendering conflicting worlds. The tradeoff is more reliance on winch skill; novice and experienced groups must both have meaningful chances to cause and prevent theft.

## Prize Lift: coupled cables replace the paced motor

The refinement above never stated how the winch responded to input, and heist feasibility depended entirely on that. A simulation of one plausible model, bounded cable reach with load shifts larger than the red boundary, showed a Snake could always force a fault, and that the heist then hung on the partner’s single Catch tap: about 16% Snake wins against average partners with the shared attempt, rising to 37% with one attempt per Snake. A first mockup of that analysis is kept at [`prototypes/prize-lift-under-the-hood.html`](prototypes/prize-lift-under-the-hood.html).

The revised chapter replaces the paced motor with one motor per cable, constant force, a capsule that loads the nearer cable, and a tray with no walls. In the playable model, a plain motor cannot out-tilt an attentive partner; only the Rig burst can. Sabotage therefore depends on a tool the rules can meter instead of on a quirk of the winch, and refusing to pull sinks the tray instead of stalling it. Three decisions followed play: the Rig is a timed burst rather than a standing state, the pool sits deeper than the tray can tilt so nobody can sink it alone, and receipts do not record speed. Settings were tuned by hand and remain hypotheses. The Catch is still the bottleneck; attempts per act and the catch-zone width remain the balance dials.

## Win conditions and duration are explicit

The original draft left victory and removal limits incomplete. One Snake attempt per act, two heists, and a surviving Snake define the objective and its risks. Ties, early wins, and the shrinking cast are explicit. A tie originally removed nobody. A vote simulation with Loyal votes landing on a Snake between 30% and 60% of the time showed that rule skipping more than one of the three eliminations per episode, which also withholds team reveals from the Loyals. A runoff among the tied contestants replaced it, with a deadlock removing nobody only if the runoff ties again. The threshold and all Prize Lift timings still need testing.

The original four-minute loop contained 325 seconds before its reveal: 10 + 3 × (75 + 30). The revised budget is 270 seconds including a 20-second finale, or 300 seconds if every act needs a runoff, so about 4½ to 5 minutes. A six-minute comparison checks whether more time improves tension and deduction.

# Annex A · Evidence and participation

## Recorded events replace an accusation-first interface

The initial receipt wheel mixed claims such as seeing someone near a location with judgments such as calling them a liar. The proposed baseline starts with an automatic factual event board and secret voting. This gives every player something concrete to interpret and visually separates an observation from a player’s accusation.

Too much evidence would solve the game automatically; too little would make voting arbitrary. Receipt coverage, visibility, and recall across acts therefore need explicit rules and tests. Player-selected shared receipts may be added later if they improve play and meet the communication requirements.

## Chat independence is built into the actions

The initial wheel was intended to remove typing friction. That goal remains, but the design does not assume an unrestricted vocabulary of claims and replies. The baseline uses cooperative controls, visible events, a private suspect selection, and a ballot. Roblox’s current preset rules impose finite scope and communication limits [2]. Any additional communication surface must be evaluated for its actual behavior.

The tradeoff is less verbal persuasion when optional chat is unavailable. Tests must show that players can still form and revise suspicions from play. A successful session among talkative friends would not establish that the same game works silently on a phone.

## Backstage becomes optional and cannot decide the vote

The initial audience could spotlight contestants, send hints, and spend applause on influence. Those tools could transmit decisive information from eliminated players, including a Snake who already knows the other Snake. The proposed backstage offers public evidence, practice, customization, and a choice to join a new episode, without affecting the ongoing competition.

Earned progress and later team-result rewards survive that choice, so players are not compelled to spectate for payment. This reduces audience power and may reduce time spent in a particular episode. The relevant test is whether players remain engaged voluntarily or return to active play through a better requeue experience.

Audience betting is deferred to optional free predictions without stakes or purchases. Snakes cannot earn hidden-role prediction rewards. This avoids building an activity whose outcome is already known to some participants. The initial draft did not specify monetary wagers; this is a product-scope decision, not a claim that it did.

## The finale explains events, beyond revealing a role

The initial reveal focused on the Snake’s identity and animation. The proposal reconstructs the actual sabotage, response, and relevant vote. That can resolve the mystery, teach players, and create a specific story worth sharing. It also requires reliable event records and careful presentation. Replay appeal and attributable acquisition must be measured; a recurring cinematic alone does not prove virality.

# Annex A · Progression, scope, and evidence

## Extra personas and conflicting goals are deferred

The initial role deck included investigative abilities, double votes, and personal wins for ties or early elimination. The proposed first game has only Loyal and Snake roles. Style and identity remain available through cosmetics and achievements. Removing additional victory conditions makes team incentives easier to explain and reduces situations where optimal personal play undermines everyone else’s match.

This gives up some immediate variety. A role or ability should return only when it adds a distinct decision that players can understand, with equal gameplay access. More combinations alone are not evidence of deeper deduction or longer retention.

## Progress and skill are separated

The initial Fame system combined experience, leaderboard status, and rewards from several activities. The proposal uses Fame for career progress, Show Credits for earned cosmetics, and a separate rating if competitive play is later introduced. The Prize Pot stays an episode-only performance score. This makes the meaning of each number clearer and avoids presenting playtime or audience activity as competitive skill.

Even this separation may introduce too many indicators. The prototype must show that players understand the team objective and the temporary Pot before more progression is displayed. Reward values and cosmetic demand remain unproven.

## Ranked, trading, and larger content commitments wait

Prime Time ranked play, trading, numerous custom formats, and frequent replacement villas were expansion ideas in the initial draft. The proposed release prioritizes one queue, one readable setting, and a few strong challenge families. This protects matchmaking density, limits collusion-sensitive competitive commitments, and lets players learn evidence in a familiar environment.

Seasons can change theme and add a challenge without replacing the entire map. Modifiers need individual testing because inexpensive rule changes can still create expensive balance interactions. Advanced paid hosting remains a possibility; ordinary play with friends is free. The tradeoff is a smaller initial feature set and fewer immediate purchasing surfaces.

## Success claims become testable investment criteria

Statements that all eight players remain engaged, every reveal drives clips, or rule cards guarantee freshness become questions measured through player behavior. Competitor visits and concurrency figures were removed as proof of durability because they do not establish retention or revenue, and the supplied figures were not independently verified in this brief.

The proposed gates test comprehension, evidence use, voluntary repeat play, later return, and cosmetic demand in ordinary public groups. Targets are internal hypotheses, not published Roblox benchmarks. The investment case strengthens when those observations support the design; it weakens when extra content or promotion is needed to conceal an unsatisfying core loop.
