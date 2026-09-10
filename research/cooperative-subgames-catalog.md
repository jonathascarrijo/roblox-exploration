# Two-player sub-game catalog: It Takes Two and Split Fiction

Research date: **9 September 2026**. Full gameplay and ending spoilers.

This reference inventories the distinct two-player activities in Hazelight's
*It Takes Two* and *Split Fiction*: campaign puzzles, traversal systems, combat
set pieces, optional stories, and competitive diversions. It supports original
game ideation in this repository; it does not adopt features into a concept.

**The named minigames are only part of the reference.** *It Takes Two* has 25
optional competitive minigames. Its interdependent cooperative challenges mostly
belong to the campaign. *Split Fiction* has 12 optional Side Stories, often with
several activities inside one story, plus other diversions. [IT-list] [SF-list]

Jump to: [It Takes Two campaign](#it-takes-two-campaign-activities) ·
[25 minigames](#it-takes-two-all-25-named-competitive-minigames) ·
[Split Fiction campaign](#split-fiction-campaign-activities) ·
[12 Side Stories](#split-fiction-all-12-side-stories) ·
[coverage audit](#coverage-audit) ·
[community favorites](#community-favorites-and-replay-appeal) ·
[mechanics index](#mechanics-index-for-original-design-work) ·
[sources](#source-register).

## Scope and how to use this catalog

A **sub-game** here means a recognizable activity with a player-visible objective
and a distinct rule, control arrangement, or relationship between the players.
The descriptive activity names and IDs below are editorial, unless they name a
chapter, named minigame, Side Story, or boss. They are not an official Hazelight
list of discrete games.

The catalog is exhaustive at the level of the **25 named minigames and 12 named
Side Stories**, and covers every campaign chapter and its major mechanic
families. Campaign granularity is necessarily editorial: repeated rooms using the
same rule are grouped; a new partner dependency receives a separate entry even
when it uses an existing tool. The chapter coverage audit below makes those
groupings inspectable. This is a researched catalog, not a claim of a newly
completed frame-by-frame playthrough or an inventory of every jump and prop.

Included: puzzles, shared vehicles, mounting and transformation mechanics, boss
phases with different player jobs, substantial optional challenges, and unusual
perspective changes. Excluded: ordinary connecting jumps, repeated copies of a
puzzle, dialogue, benches, passive rides, cosmetic interactions, and collectible
or trophy actions without a substantial gameplay rule. Borderline cases are
identified explicitly rather than counted as mandatory cooperation.

Read the **player jobs and objective** column for the actual activity; use the
**mode / pattern** column to compare interactions across games. A chapter's
ordinary platforming connects the listed activities and is not itself repeated
in every row. Unless specified otherwise, reaching the next safe area, solving
the device, or defeating the encounter is the shared objective. Numeric timers,
damage, score targets, and retry rules are omitted unless essential to the idea.

### Classification

| Mode | Meaning |
| --- | --- |
| **C** | Interdependent cooperation: one player's action enables, protects, transports, or combines with the other's. |
| **P** | Parallel play: both tackle the same course or enemies; the listed activity need not have complementary jobs. This can occur within a cooperative campaign. |
| **V** | Versus: players compete for a win, score, or survival advantage. |
| **S** | Scripted or substantially one-sided interaction; included for coverage, not as a strong cooperative model. |

Patterns are this document's design analysis, not source terminology:
**hold/cross** (maintain a state while the partner moves), **relay** (alternate
enabling actions), **combine** (different actions produce one result), **shared
control** (both influence one object), **pilot/gunner**, **guide/act** (one supplies
information or visibility), **protect/act**, **launch/catch**, **timing**,
**tether** (relative position matters), **parallel**, and **competition**.
Additional descriptive tags identify shared memory, shared workload, shared
space, divided attention, playful interaction, one-sided action, or deliberate
inaction; these describe the activity directly rather than a separate taxonomy.

### Evidence and limitations

EA's official pages establish the games' cooperative premise and broad variety,
and explain Side Stories. Detailed encounter rules below come from third-party
walkthroughs and guides, identified by adjacent source links. These are reported
game behaviors; the classifications and cross-game comparisons are our analysis.
[EA-IT] [EA-SF] [EA-side]

Sources sometimes disagree on checkpoint boundaries, names, and role descriptions.
Locations below use the recognizable encounter as well as the chapter; they are
not exact replay timestamps. **†** marks a detail or assignment that particularly
needs a replay check before adapting it. None of the catalog establishes Roblox
implementation feasibility, multiplayer behavior, difficulty, or balance.

## It Takes Two: campaign activities

Characters: **May** and **Cody**. When a job is freely assigned, the table says
“one / other.” A slash between modes means the entry contains both kinds of play.

### The Shed

| ID | Area / activity | Player jobs and objective | Mode / pattern | Evidence |
| --- | --- | --- | --- | --- |
| IT-001 | Wake-up Call: paired machinery | Both pull heavy controls and ground-pound paired switches to power the route. | C / timing | [I1] |
| IT-002 | Biting the Dust: passenger cannon | One aims the vacuum outlet; the other travels through the hose and lands beyond the gap. | C / launch/catch | [G1] |
| IT-003 | Biting the Dust: airflow route | One changes suction or blowing; the other rides the resulting air path, then enables reunion. | C / hold/cross | [N1] |
| IT-004 | Biting the Dust: material transfer | One sucks up red material; the other directs its discharge into the receiving mechanism. | C / shared control | [G1] |
| IT-005 | Vacuum Tower | One collects the boss's bombs through a hose; the other aims them back. Both dodge between openings. | C / combine | [G1] |
| IT-006 | The Depths: nail swing route | Cody places and recalls nails; May hooks her hammer onto them to cross gaps. | C / hold/cross | [G1] |
| IT-007 | The Depths: pin moving machinery | May activates mechanisms; Cody nails the resulting platforms or gates in useful positions. | C / combine | [N1] |
| IT-008 | The Depths: hammer launchers | May strikes launch mechanisms to propel Cody to controls that extend their route. | C / launch/catch | [N1] |
| IT-009 | Toolbox: arm and locks | Cody pins the arm and supplies nail handholds; May swings over and breaks the locks. | C / combine | [G1] |
| IT-010 | Toolbox: airborne attack | May catapults Cody from the shovel; Cody throws nails at the explosive can while airborne. | C / launch/catch | [G1] |
| IT-011 | Wired Up: electrical rail relay | Both grind separate rails and hit power switches within the same activation window to disable fans. | C / timing | [N1] |

### The Tree

| ID | Area / activity | Player jobs and objective | Mode / pattern | Evidence |
| --- | --- | --- | --- | --- |
| IT-012 | Fresh Air: grappling route | Both learn swinging between hooks on the way into the tree. | P / parallel | [G2] |
| IT-013 | Captured: sap and ignition | Cody coats targets with sap; May's matches ignite it to destroy obstacles and enemies. | C / combine | [G2] |
| IT-014 | Captured: sap counterweights | Cody adds weight with sap; May traverses the repositioned wheels and lifts, then opens the return route. | C / hold/cross | [G2] |
| IT-015 | Captured: remote chain reactions | Cody links distant targets with sap trails; May ignites an accessible end. | C / combine | [G2] |
| IT-016 | Captured: furnace launch | Cody prepares fuel and boards; May detonates it to launch him upward. | C / launch/catch | [G2] |
| IT-017 | Shield Wasp | Exploit its exposed back with sap and ignition after avoiding its frontal charge. | C / combine | [G2] |
| IT-018 | Deeply Rooted: nests and Mortar Wasp | Combine weapons to stop spawning enemies, drop bottle plugs, and defeat the projectile-lobbing wasp. | C / combine | [N2] |
| IT-019 | Deeply Rooted: swarm slide and lift | Dodge shaped swarms while sliding or ascending; combine shots where the swarm blocks progress. | C/P / timing | [N2] |
| IT-020 | Deeply Rooted: floating wooden lid | Cody propels/steers the lid; May shoots incoming threats and gate controls. | C / pilot/gunner | [G2] [N2] |
| IT-021 | Deeply Rooted: luminous cavern | Light sap-filled lanterns to reveal traversal, then independently balance on the moving giant fish. | C/P / combine | [N2] |
| IT-022 | Giant Beetle | Fill floor grates with sap; lure the beetle over them and ignite underneath it. | C / combine | [N2] |
| IT-023 | Beetle riding | Cody steers and jumps the beetle; May shoots threats during the ride. | C / pilot/gunner | [N2] |
| IT-024 | Extermination: Wasp Queen | Sap and ignite exposed armor while using rails to reach different sides and evading swarm formations. | C / combine | [B2] |
| IT-025 | Getaway: aircraft | Cody pilots; May operates the weapon, covering threats around their shared craft. | C / pilot/gunner | [N2] |
| IT-026 | Getaway: squirrel duel | May fights the squirrel in a brief fighting-game sequence; Cody has no equivalent combat job. | S / one-sided | [N2] |
| IT-027 | Getaway: glider | Both shift their weight sideways to steer one glider through the tunnel. | C / shared control | [G2] |

### Rose's Room: Pillow Fort and Spaced Out

Portal colors differ between guides; the six trials are identified by machinery
instead. The robot battery interaction recurs at their exits. [N3] [G3] [I-space]

| ID | Area / activity | Player jobs and objective | Mode / pattern | Evidence |
| --- | --- | --- | --- | --- |
| IT-028 | Pillow Fort: shared console | Both reposition screen elements to complete word, line, ordering, and face puzzles. | C / shared control | [N3] |
| IT-029 | Spaced Out: robot power | Tiny Cody enters the robot and holds its battery in place; May operates the external lever. | C / combine | [N3] |
| IT-030 | Space trial: rolling sphere | Giant Cody pushes the sphere supporting May; she balances, then transports tiny Cody on a platform. | C / shared control | [I-space] |
| IT-031 | Space trial: hanging planets | Cody swings planets carrying May; she reaches buttons that create his climbing route. | C / relay | [I-space] |
| IT-032 | Space trial: opposite gravity | May follows wall/ceiling paths while Cody changes size; paired buttons and platforms reunite their routes. | C / relay | [N3] |
| IT-033 | Space trial: seesaw and spring | Cody's changing weight launches or lifts May; both use the spring and shared swinging routes. | C / launch/catch | [G3] |
| IT-034 | Space trial: pinball passenger | May launches tiny Cody and changes gates; Cody steers within the pinball course. | C / shared control | [G3] |
| IT-035 | Space trial: gravity transporter | Cody moves May with a gravity device; May disables obstacles on his route. | C / relay | [G3] |
| IT-036 | Space trial: electrical conductors | Retrieve conductors through size/gravity puzzles, then place them to complete the robot's power circuit. | C / combine | [N3] |
| IT-037 | Space hub: rotating pipe joints | One locks a correctly oriented joint while the other rotates the remaining pipe section. | C / combine | [N3] |
| IT-038 | Moon Baboon: redirected laser | One raises a power core; the targeted partner leads the boss's beam into it. | C / combine | [B3] |
| IT-039 | Moon Baboon: missile riding | Both evade missiles, then mount and steer them back into the spacecraft. | P / parallel | [B3] |
| IT-040 | Moon Baboon: inside/outside | Tiny Cody sabotages the ship from inside while May survives its external attacks. | C / protect/act | [B3] |
| IT-041 | Moon Baboon: UFO pursuit | May pilots the captured UFO; Cody uses its radar and weapon to locate and shoot the fleeing boss. | C / guide/act | [B3] |

### Rose's Room: toys, circus, and castle

| ID | Area / activity | Player jobs and objective | Mode / pattern | Evidence |
| --- | --- | --- | --- | --- |
| IT-042 | Hopscotch: number blocks | Alternate pressure plates to create the partner's numbered stepping route. | C / relay | [N3] |
| IT-043 | Hopscotch: animal rail switches | One rides the rail; the other selects animal-symbol switches to clear upcoming obstructions. | C / guide/act | [G3] |
| IT-044 | Classroom: arithmetic | Both select number tiles that satisfy the displayed arithmetic target. | C / combine | [I-class] |
| IT-045 | Classroom: matching cards | Reveal cards and remember positions to complete the matching pairs. | C/P / shared memory | [I-class] |
| IT-046 | Classroom: connect the dots | One controls horizontal pencil movement, the other vertical; trace the numbered drawing together. | C / shared control | [I-class] |
| IT-047 | Hopscotch: marble maze | Both move their weight around a board to roll a ball through its maze. | C / shared control | [I-class] |
| IT-048 | Hopscotch: cushion launcher | One ground-pounds the air pump; the other uses the launch to reach the next hook or platform. | C / launch/catch | [I-class] |
| IT-049 | Hopscotch: fidget-spinner flight | Both glide through an obstacle route with portable spinners. | P / parallel | [G3] |
| IT-050 | Hopscotch: kaleidoscope | Complete lit floor patterns together, then rotate connecting sections to make a climbable route. | C / combine | [I-class] [N3] |
| IT-051 | Train Station: toy tableau | Place figures in interacting positions to open the handcar's track; both operate the handcar. | C / combine | [G3] [N3] |
| IT-052 | Dino Land | One controls a large dinosaur crane; the other rides a small dinosaur and triggers platform changes. | C / hold/cross | [N3] |
| IT-053 | Pirates Ahoy: paddleboat | Each drives one paddle and cannon; differential paddling steers the shared boat. | C / shared control | [N4] |
| IT-054 | Giant Octopus | Steer and aim the boat while prioritizing tentacles, hostile boats, and the central boss. | C / shared control | [B3] |
| IT-055 | The Greatest Show: ball apparatus | Operate ramps and wheels to transfer one steel ball through a chain of mechanisms. | C / relay | [N4] |
| IT-056 | The Greatest Show: human cannon | One aims and fires; the airborne partner adjusts trajectory to hit balloon targets. | C / launch/catch | [N4] |
| IT-057 | The Greatest Show: unicycle | Cody pedals while May balances the carried ball across a tightrope. | C / shared control | [N4] |
| IT-058 | The Greatest Show: trapeze | Both swing; transfer the ball between partners at the meeting point. | C / launch/catch | [N4] |
| IT-059 | Once Upon a Time: wrecking ball | Coordinate crane positioning and the suspended bowling ball to break the castle gate. | C / shared control | [N4] |
| IT-060 | Dungeon Crawler: fire and ice | May fights with fire and dashes; Cody freezes obstacles and lava and passes barriers with magic. | C / combine | [G3] |
| IT-061 | Dungeon Crawler: pursuing doll | Both clear obstacles while fleeing the cooking doll. | C/P / parallel | [G3] |
| IT-062 | Dungeon Crawler: Immortal Troll | Bait charges into the arena's chains, then lure the troll into the opened central pit. | C/P / timing | [G3] |
| IT-063 | Dungeon Crawler: King and Queen | Both fight chess-piece bosses while avoiding attacks patterned after the pieces. | C/P / parallel | [B3] |
| IT-064 | The Queen: claw machine and Cutie | Coordinate claw-machine controls, then perform paired scripted actions involving the elephant toy. | C/S / shared control | [G3] |

### Cuckoo Clock

May's clone is a fixed teleport destination, not an independently controlled third
player. The important ability is changing where May is at the right moment.
[G4]

| ID | Area / activity | Player jobs and objective | Mode / pattern | Evidence |
| --- | --- | --- | --- | --- |
| IT-065 | Gates of Time: rebuild and cross | Cody changes an object's time state; May uses its restored or moving geometry. | C / hold/cross | [N5] |
| IT-066 | Gates of Time: clone relay | May leaves a destination, helps operate controls, then teleports through before the opening closes. | C / relay | [G4] |
| IT-067 | Town: mechanical firefighting | Cody positions the cloud through time control; May releases its rain over fires. | C / shared control | [N5] |
| IT-068 | Town: drawbridge | May rapidly operates separated buttons with teleportation; Cody secures the aligned bridge through time control. | C / timing | [N5] |
| IT-069 | Clock towers: symbol information | May reads clock/symbol clues beyond an obstacle; Cody enters their order at the remote controls. | C / guide/act | [N5] |
| IT-070 | Clock towers: appearing platforms | One changes platform availability while the other crosses in rhythm with the clock. | C / timing | [G4] |
| IT-071 | Clock towers: bird bombing | Both fly birds, collect aerial explosives, and bombard the exposed generators. | P / parallel | [N5] |
| IT-072 | Clockworks: position across time | Cody moves platforms or the cage; May uses fixed clones to reach otherwise inaccessible positions and keys. | C / combine | [G4] |
| IT-073 | Clockworks: mechanical bull | Cody restores the target mechanism; May attracts a charge and teleports away so the bull hits it. | C / combine | [G4] |
| IT-074 | Clockworks: moving wall climb | Cody shifts walls toward May as she alternates wall jumps. | C / hold/cross | [G4] |
| IT-075 | A Blast from the Past: survival loop | Both dodge pendulums/gears and position themselves to bait falling bombs into clocks. | P / timing | [G4] |
| IT-076 | A Blast from the Past: flying debris | Cody scrubs the exploded debris through time; May jumps along the changing fragments. | C / hold/cross | [G4] |

### Snow Globe

May carries blue magnetism and Cody red. Opposite colors attract and matching
colors repel the marked objects; later they can attract each other. [N6] [G5]

| ID | Area / activity | Player jobs and objective | Mode / pattern | Evidence |
| --- | --- | --- | --- | --- |
| IT-077 | Warming Up: magnetic machinery | Push/pull marked gates, swings, saws, and launchers to create the partner's route. | C / combine | [G5] |
| IT-078 | Warming Up: bridge handoff | One positions a bridge half; the other holds it while the first moves to connect the second half. | C / relay | [N6] |
| IT-079 | Winter Village: rotating wall | May rotates a climbing wall; Cody clings, climbs, and launches toward the bell. | C / hold/cross | [G5] |
| IT-080 | Winter Village: magnetic wheel | One rotates a wheel carrying the partner, then they exchange access to reach the bell. | C / relay | [N6] |
| IT-081 | Winter Village: falling anchors | Cody shoots magnetic discs into the ice; May traverses them before they fall away. | C / hold/cross | [G5] |
| IT-082 | Village / Slippery Slope: winter runs | Both negotiate skating, sledding, rails, and magnetic launch routes. | P / parallel | [N6] |
| IT-083 | Beneath the Ice: shared wrench | Each holds one end magnetically; maneuver and turn it around pipe bolts while avoiding the fish. | C / shared control | [G5] |
| IT-084 | Beneath the Ice: enclosed platform | May manipulates a platform from outside the dome; Cody rides and dismounts so it can be flipped. | C / hold/cross | [G5] |
| IT-085 | Beneath the Ice: water-column route | Both cross currents and water pillars, then use magnets to turn the generator machinery. | C/P / combine | [N6] |
| IT-086 | Slippery Slope: moving anchor route | May repositions the supports Cody needs for traversal. | C / hold/cross | [G5] |
| IT-087 | Slippery Slope: partner attraction | Pull toward one another across gaps; coordinate simultaneous attraction and shelter during the wind sequence. | C / tether | [G5] |

### Garden

| ID | Area / activity | Player jobs and objective | Mode / pattern | Evidence |
| --- | --- | --- | --- | --- |
| IT-088 | Green Fingers: hold open / cut | Cody grips infected plants or enemy shields with his vine; May enters the opening or cuts the target. | C / combine | [N7] |
| IT-089 | Green Fingers: plant transformations | May waters soil; Cody becomes traversal plants or a cactus that shoots attackers. | C / combine | [N7] |
| IT-090 | Green Fingers: growing path | Cody grows a vine and leaf platforms for May to traverse. | C / hold/cross | [G6] |
| IT-091 | Burrower encounters | Cody restrains the creature; May attacks while they also handle smaller enemies. | C / combine | [G6] |
| IT-092 | Weed Whacking: spider mounts | Both climb surfaces on spiders; May washes away infection blocking Cody's route. | C/P / hold/cross | [G6] |
| IT-093 | Trespassing: mobile grass cover | Cody becomes grass beneath May; she stays on it and limits noise near sleeping moles. | C / protect/act | [G6] |
| IT-094 | Trespassing: mole chase | Both flee through changing camera views and use paired ground pounds during the escape. | C/P / timing | [N7] |
| IT-095 | Frog Pond: frog course | Both ride jumping frogs; May dismounts to water sprouts that create Cody's route. | C/P / hold/cross | [G6] |
| IT-096 | Frog Pond: mushroom and watering relay | Cody becomes a bounce mushroom for May; she waters successive temporary platforms for him. | C / relay | [G6] |
| IT-097 | Affliction: restore flower beds | May cleans infected soil; Cody plants himself and spreads flowers between enemy waves. | C / combine | [G6] |
| IT-098 | Joy: fruit combat | May washes away poison so transformed Cody can strike hostile growths. | C / combine | [B6] |
| IT-099 | Joy: expose corruption | Cody possesses Joy and pulls corrupted parts into reach; May cuts them. Repeated phases change Cody's fruit form. | C / combine | [B6] |

### The Attic

| ID | Area / activity | Player jobs and objective | Mode / pattern | Evidence |
| --- | --- | --- | --- | --- |
| IT-100 | Setting the Stage: voice and cymbal | May activates sound-sensitive objects; Cody throws his cymbal at switches and blocks hazards. | C / combine | [N8] |
| IT-100a | Setting the Stage: portable speaker | Cody carries the speaker; May sings through its linked microphone to clear his route. | C / combine | [N8] |
| IT-100b | Setting the Stage: voice-driven platform | May selects microphones to steer Cody's platform; Cody shields himself from lasers. | C / shared control | [N8] |
| IT-101 | Setting the Stage: dials and chimes | Cody adjusts controls for May's side-on route; balancing on chimes helps bring him across. | C / relay | [G7] |
| IT-102 | Microphone snakes | May sings to expose/stun a snake; Cody hits its vulnerable component with the cymbal. | C / combine | [G7] |
| IT-103 | Rehearsal: soundboards | Both activate the soundboard buttons, then start the completed instrumental. | C/P / combine | [G7] |
| IT-104 | Rehearsal: spotlight escort | May tracks Cody with light, keeping him safe from darkness and activating route switches. | C / guide/act | [G7] |
| IT-105 | Symphony: wind instruments | May voices into instruments to launch Cody or raise temporary platforms; he enables her crossing afterward. | C / relay | [N8] |
| IT-106 | Symphony: accordion shield | Cody blocks advancing sound waves with his cymbal; May travels behind him. | C / protect/act | [N8] |
| IT-107 | Symphony: flight and note collection | Both fly to gather notes and gain entry to orchestra enclosures. | P / parallel | [N8] |
| IT-108 | Symphony: clouds and hidden keys | May moves clouds; Cody triggers rain to uncover hiding places and retrieve the orchestra's keys. | C / combine | [N8] |
| IT-109 | Symphony: airborne key fight | Fight flying enemies, recover their keys, and carry them to the orchestra's cage. | C/P / parallel | [N8] |
| IT-110 | Turn Up: disco-ball traversal | Both stay atop the rolling ball and avoid dangerous gaps before reaching the club controls. | P / timing | [G7] |
| IT-111 | Turn Up: DJ stations | Divide attention among scratching, fog, dials, and drum controls to build the audience meter. | C / shared workload | [G7] |
| IT-112 | Turn Up: rhythm performance | Both hit scrolling note prompts between DJ rounds to complete the performance. | C/P / timing | [G7] |

## It Takes Two: all 25 named competitive minigames

All rows here are **V / competition**. Their presence in a cooperative game does
not make their scoring cooperative. Location audit: [IT-list] [IT-list2]. Rules:
[IT-mini] [IT-trophy] [IT-rules]. The names below preserve the commonly documented
menu names; guides also write “Space Walk,” “Slot Cars,” and “Whack A Cody.”

| ID | Minigame | Chapter / section | What the players do | Evidence |
| --- | --- | --- | --- | --- |
| IT-M01 | Whack-a-Cody | Shed / The Depths | May whacks; Cody scores by exposing himself from holes without being hit. | [IT-mini] |
| IT-M02 | Flip the Switch | Shed / The Depths | May hammers targets on a rotating platform; Cody shoots targets with nails. | [IT-mini] |
| IT-M03 | Tug of War | Tree / Captured | Pull the opponent into the central hole. | [IT-mini] |
| IT-M04 | Plunger Dunger | Tree / Deeply Rooted | Shoot moving targets toward the opponent's end; defend your own. | [IT-mini] |
| IT-M05 | Tank Brothers | Rose's Room / Pillow Fort | Drive tanks and aim shots at each other. | [IT-rules] |
| IT-M06 | Spacewalk | Rose's Room / Spaced Out | Jump onto floating cubes to claim more territory. | [IT-rules] |
| IT-M07 | Laser Tennis | Rose's Room / Spaced Out | Activate floor buttons to send laser sweeps across the opponent's arena. | [IT-rules] |
| IT-M08 | Rodeo | Rose's Room / Hopscotch | React to changing prompts to stay on mechanical bulls. | [IT-rules] |
| IT-M09 | Feed the Reptile | Rose's Room / Hopscotch | Throw balls into moving reptile mouths for points. | [IT-rules] |
| IT-M10 | Batting Team | Rose's Room / Hopscotch | Time bat swings to hit the revolving ball repeatedly. | [IT-rules] |
| IT-M11 | Birdstar | Rose's Room / Once Upon a Time | Compete on a scrolling rhythm-button track. | [IT-rules] |
| IT-M12 | Horse Derby | Cuckoo Clock / Gates of Time | Jump or duck obstacles to win a mechanical horse race. | [IT-rules] |
| IT-M13 | Bomb Run | Cuckoo Clock / Gates of Time | Reach checkpoints to reset your fuse while racing the opponent. | [IT-rules] |
| IT-M14 | Icicle Throwing | Snow Globe / Winter Village | Aim icicles at targets to outscore the opponent. | [N6] |
| IT-M15 | Shuffle Board | Snow Globe / Winter Village | Slide pucks into scoring areas with controlled power. | [N6] |
| IT-M16 | Snow Warfare | Snow Globe / Winter Village | Hit each other with snowballs in an arena. | [N6] |
| IT-M17 | Ice Race | Snow Globe / Beneath the Ice | Skate the marked course faster than the opponent. | [N6] |
| IT-M18 | Garden Swings | Garden / Weed Whacking | Build momentum and release for the longer jump. | [IT-trophy] |
| IT-M19 | Larva Basket | Garden / Weed Whacking | Throw food into larvae on rotating rings. | [IT-trophy] |
| IT-M20 | Snail Race | Garden / Frog Pond | Charge and release bursts to steer a snail through obstacles. | [IT-trophy] |
| IT-M21 | Slotcars | Attic / Setting the Stage | Manage acceleration through bends without leaving the track. | [IT-trophy] |
| IT-M22 | Chess | Attic / Setting the Stage, after Rehearsal | Play a conventional chess match. | [IT-trophy] |
| IT-M23 | Musical Chairs | Attic / Setting the Stage, after Rehearsal | React to the correct prompt when the music stops. | [IT-trophy] |
| IT-M24 | Volleyball | Attic / Symphony | Return balls over the net; prevent them landing on your side. | [IT-trophy] |
| IT-M25 | Track Runner | Attic / Setting the Stage, after Symphony | Race through an arcade obstacle course. | [IT-trophy] |

## It Takes Two: substantial extras outside the 25

| ID | Activity | Player jobs and objective | Mode / pattern | Evidence |
| --- | --- | --- | --- | --- |
| IT-X01 | Hell Tower — Gates of Time | Both activate the tower, but each must complete the precision climb individually. | P / parallel | [N5] |
| IT-X02 | Turtle reunion — Winter Village | Find displaced baby turtles and return them using the appropriate magnetic polarity. | C/P / shared workload | [N6] |

Prop jokes, posing for photographs, toy-car stunts, fishing, painting, and similar
brief interactions are outside the substantial-sub-game boundary defined above.
The Cutie sequence is retained as a coverage exception because it concludes an
entire campaign section; it is not a proposed tone or activity for this repo.

## Split Fiction: campaign activities

Characters: **Mio** and **Zoe**. Abilities and vehicles change within chapters.
Having two different powers does not mean every stretch requires both powers.

### Rader Publishing

| ID | Area / activity | Player jobs and objective | Mode / pattern | Evidence |
| --- | --- | --- | --- | --- |
| SF-001 | Freedom Fighters: machinery relay | One stops moving machinery so the other can cross; both time the subsequent console inputs. | C / timing | [S1] |
| SF-002 | Freedom Fighters: aircraft | One pilots through debris; the other shoots pursuing aircraft. | C / pilot/gunner | [S1] |
| SF-003 | Brave Knights: ogre distraction | One throws fruit to distract an ogre while the other sneaks past; then exchange jobs. | C / protect/act | [S1] |
| SF-004 | Brave Knights: chase | Both escape ogres through collapsing routes and moving machinery. | P / parallel | [S1] |

### Neon Revenge

Mio uses a sword and special gravity surfaces; Zoe manipulates marked objects
with her gravity whip. [S2]

| ID | Area / activity | Player jobs and objective | Mode / pattern | Evidence |
| --- | --- | --- | --- | --- |
| SF-005 | Rush Hour: cut and reposition | Mio exposes or cuts mechanisms; Zoe shifts objects to make Mio's wall-running route. | C / relay | [S-rush] |
| SF-006 | Rush Hour: flying traffic | Cross moving vehicles; one positions the truck while the other opens its route. | C / shared control | [S-rush] |
| SF-007 | Play Me Techno: projectile handoff | Mio sends a sphere toward Zoe, who catches and redirects it into a barrier. | C / launch/catch | [S2] |
| SF-008 | Hello, Mr. Hammer | Mio removes the hammer's protection; Zoe seizes it and strikes its owner. | C / combine | [S2] |
| SF-009 | Streets of Neon / Parking Garage | Mio launches Zoe; Zoe places traversable rods for Mio between fights. | C / relay | [S2] |
| SF-010 | Parking Attendant | Mio climbs into the machine; Zoe pulls exposed components outside, then holds its smaller form for attacks. | C / combine | [S2] |
| SF-011 | The Getaway Car | Zoe drives the flying car; Mio shoots threats along its route. | C / pilot/gunner | [S2] |
| SF-012 | Big City Life: thrown passenger | Mio enters a portable toilet; Zoe throws it across the gap. | C / launch/catch | [S2] |
| SF-013 | Flipped Cityscapes | Use the same complementary tools through a changing, side-on gravity layout. | C / relay | [S2] |
| SF-014 | Gravity Bike | Mio drives; Zoe handles threats and a phone interaction during the chase. | C / pilot/gunner | [S2] |
| SF-015 | Skyscraper Climb / crime boss | Ride separate bikes, then combine attacks and launch mechanisms against the multi-stage machine. | C/P / combine | [S2] |

### Hopes of Spring

| ID | Area / activity | Player jobs and objective | Mode / pattern | Evidence |
| --- | --- | --- | --- | --- |
| SF-016 | The Underlands: transformation relay | Mio breaks and climbs; Zoe operates plants and flies pollen routes to enable crossings. | C / relay | [S3] |
| SF-017 | Lord Evergreen: log passage | Aquatic Mio transports the stalk; Zoe climbs it to evade hazards and opens its passage. | C / shared control | [S-fish] |
| SF-018 | Lord Evergreen: egg batting | Mio launches an egg from a seesaw; Zoe releases a pulled-back trunk to bat it into the barrier. | C / timing | [S-egg] |
| SF-019 | Heart of the Forest / Mother Earth | Zoe controls terrain, platforms, and plants while Mio traverses the changing environment. | C / hold/cross | [S3] |
| SF-020 | Mother Earth: underwater protection | Zoe creates plant cover; aquatic Mio moves through predator-filled water. | C / protect/act | [S3] |
| SF-021 | Walking Stick of Doom | Zoe drives the giant walking tree and breaks obstacles; Mio defends against attackers. | C / pilot/gunner | [S3] |
| SF-022 | Silly Monkeys: waterwheel | Zoe stops and releases water flow to launch aquatic Mio to the next area. | C / launch/catch | [S-monkey] |
| SF-023 | Silly Monkeys: branch and flower | Zoe lowers Mio's hanging route; Mio reaches and activates their shared flower lift. | C / relay | [S-monkey] |
| SF-024 | Silly Monkeys: totem gate | Mio strikes the required totems; Zoe delays their reset so the sequence can finish. | C / timing | [S-monkey] |
| SF-025 | It Takes Three to Tango: imitation | Both reproduce the Monkey King's dance prompts. | C/P / timing | [S3] |
| SF-026 | It Takes Three to Tango: monkey chains | Collect matching-color followers while avoiding walls and each other's growing lines. | C/P / shared space | [S3] |
| SF-027 | Halls of Ice: internal lock | Zoe enters the keyhole and rotates symbols; Mio strikes the corresponding external lock parts. | C / guide/act | [S-lock] |
| SF-028 | Halls of Ice: sliding cube | Mio pushes a cube that slides until blocked; Zoe raises stops to steer its route. | C / combine | [S-cube] |
| SF-029 | The Ice King: restraint | Zoe pulls the boss down; ape Mio attacks the opening. | C / combine | [S3] |
| SF-029a | The Ice King: projectile stun | Aquatic Mio releases a sphere; Zoe throws it to stun the boss for Mio's attacks. | C / combine | [S3] |

### Final Dawn

The colored switches, barriers, and armor make the division of work visible.

| ID | Area / activity | Player jobs and objective | Mode / pattern | Evidence |
| --- | --- | --- | --- | --- |
| SF-030 | The Dropship / Infiltration | Both descend through debris, then shoot their own colored route switches. | C/P / combine | [S4] |
| SF-031 | Gun Upgrade: temporary shield holes | Attach and detonate color-matched charges to open the partner's route before holes close. | C / timing | [S4] |
| SF-032 | Toxic Tumblers: shifting colors | Cross industrial hazards while toxin changes barrier colors and therefore which partner must shoot. | C / relay | [S4] |
| SF-033 | Factory Entrance / Exterior: paired machinery | Shoot matching controls to position platforms and launch the partner across. | C / combine | [S-factory] |
| SF-034 | Factory Exterior: moving payload | Attach a charge to moving cargo; the partner opens its passage before remote detonation. | C / relay | [S-factory] |
| SF-035 | Test Chamber: Factory Warden | Break colored defenses and launch one another to reach vulnerable parts. | C / combine | [S4] |
| SF-036 | Run and Gun: route shooting | Shoot switches for one another while sliding, climbing, and escaping industrial hazards. | C / timing | [S4] |
| SF-037 | Run and Gun: portal machinery | One moves the portal apparatus while the other cycles through it to reach the exit. | C / hold/cross | [S4] |
| SF-038 | The Overseer: hostile viewpoint | Fight from the boss's camera view and send colored explosive barrels back at it. | C/P / combine | [S4] |
| SF-039 | Soaring Desperados: jetpack route | Both use jetpacks to cross aerial hazards and reach refueling points. | P / parallel | [D4] |
| SF-040 | The Escape: watercraft | Both steer fast craft through an escape course. | P / parallel | [D4] |
| SF-041 | System Fail Safe Mode | Keep the energy tether safe while exchanging lift controls and crossing hazards together. | C / tether | [S4] |

### Rise of the Dragon Realm

Mio's dragon glides and uses acid; Zoe's climbs and charges. Their abilities
expand as the dragons grow. [S5]

| ID | Area / activity | Player jobs and objective | Mode / pattern | Evidence |
| --- | --- | --- | --- | --- |
| SF-042 | A Serpentine Path: egg keys | Carry eggs between pedestals to operate statues and create the partner's crossing. | C / relay | [S5] |
| SF-042a | Serpent signal relay | Leapfrog egg pedestals to maintain the signal; finish together. | C / relay | [D5] |
| SF-043 | Water Temple: boat | Coordinate paddling on opposite or matching sides to steer through the rapids. | C / shared control | [D5] |
| SF-044 | Water Temple: hatchling routes | Mio glides; Zoe climbs ivy and shifts supports, enabling each other's next landing. | C / relay | [D5] |
| SF-045 | Water Temple: symbol fountains | One identifies the needed route; the other activates matching symbols to raise water platforms. | C / guide/act | [S5] |
| SF-046 | Dragon Riders Unite: acid and impact | Mio removes metal restraints; Zoe knocks the released object into position or breaks crystal. | C / combine | [D5] |
| SF-047 | Dragon Riders Unite: partner catapult | Mio operates acid-driven statue mechanisms that launch Zoe past hazards. | C / launch/catch | [D5] |
| SF-048 | Dragon Riders Unite: rune sequence | Alternate acid and impact inputs on the two sets of symbols. | C / timing | [D5] |
| SF-049 | The Dragon Slayer | Mio attacks at range and clears metal; Zoe strikes openings and clears crystal hazards. | C / combine | [S5] |
| SF-050 | Craft Temple: pursuit and bomb | Escape Megalith, then release, move, and acid-trigger a sphere to break a gate. | C/P / combine | [D5] |
| SF-051 | Dragon Souls: temporary aqueduct | Mio creates bridge sections with acid; Zoe crosses and enables Mio's return route. | C / relay | [D5] |
| SF-052 | Dragon Souls: ball delivery | Mio raises the ball's route; Zoe aims successive strikes to keep it on the platforms. | C / shared control | [D5] |
| SF-053 | Treasure Temple: obstacle sorting | Destroy the metal or crystal portions of incoming obstacles with the appropriate dragon. | C / combine | [D5] |
| SF-054 | Royal Palace: wheel and switches | Roll a shared wheel; later expose and activate targets while platforms sink. | C / timing | [D5] [EA-patch] |
| SF-055 | Treasure Traitor: projectile return | Mio dissolves a mine's shell; Zoe knocks its exposed core into the boss. | C / combine | [S5] |
| SF-056 | Treasure Traitor: partner rescue | Use acid or impact to free the partner from the corresponding trap. | C / protect/act | [S5] |
| SF-057 | Might of Dragons / Into the Storm | Fly adult dragons through aerial hazards, then continue an escape on foot. | P / parallel | [S5] |
| SF-058 | Megalith's Wrath | Climb; divide attacks between exposed growths and pursuing crystals. | C/P / shared workload | [S5] |

### Isolation

Mio's drone hacks or becomes machinery; Zoe's uses magnetic surfaces and forces.
Several encounters turn one player into the other's vehicle or projectile.
[S6] [D6]

| ID | Area / activity | Player jobs and objective | Mode / pattern | Evidence |
| --- | --- | --- | --- | --- |
| SF-059 | Prison Ship: alternating supports | Each landing or control enables the partner's next support across separated routes. | C / relay | [S6] |
| SF-060 | Handy Drones: hack and attach | Mio controls machinery; Zoe magnetically rides it to reach otherwise inaccessible controls. | C / hold/cross | [S6] |
| SF-061 | Down the Rabbit Hole: harpoon | Mio aims magnetic projectiles that transport Zoe across the gap. | C / launch/catch | [D6] [EA-patch] |
| SF-062 | Hydration Facility: living boat | Mio becomes a boat; Zoe rides, leaves for mechanisms, and lands back aboard. | C / launch/catch | [D6] |
| SF-063 | Hydration Facility: rotating maze | Mio reorients the machinery while Zoe moves between its safe sections. | C / hold/cross | [D6] |
| SF-064 | Prison Courtyard: turret escort | Mio disables guards and operates cover remotely while Zoe sneaks through. | C / protect/act | [D6] |
| SF-065 | Pinball Lock | Mio controls flippers and springs; Zoe is the ball and can correct her airborne movement. | C / shared control | [D6] |
| SF-066 | Pinball boss: Pinbawser | Manipulate the boss and pinball mechanisms to send it into the arena's damaging machinery. | C / combine | [D6] |
| SF-067 | Execution Arena: execution robot | Survive the arena, then combine magnetic restraint and hacking to use the robot's own parts against it. | C / combine | [D6] |
| SF-068 | Waste Depot | Alternate hacked containers, magnetic movement, and boat catches across the waste. | C / relay | [S6] |
| SF-069 | Cell Blocks: crusher and hacker | Zoe delays the crushing mechanism while Mio completes the escape hack. | C / protect/act | [S6] |
| SF-070 | Cell Blocks: extendable robot | Mio positions an extending robot body; Zoe uses it as a route and pushes it onward. | C / relay | [S6] |
| SF-071 | Maximum Security: invisible lasers | Mio pilots a light-bearing drone to reveal hazards for Zoe's crossing. | C / guide/act | [S6] |
| SF-072 | Maximum Security: circular laser cut | Mio cuts with a laser; Zoe opens shutters while enemies interfere with progress. | C / combine | [S6] |
| SF-073 | The Prisoner: projectile exchange | Mio hacks an orb; Zoe returns it against Dark Mio. | C / combine | [S6] |
| SF-074 | The Prisoner: inside/outside | Mio enters the adversary's mind; Zoe survives outside and returns the attacks Mio enables. | C / protect/act | [S6] |
| SF-075 | The Prisoner: withheld input | At the final struggle, Mio must stop following her button prompt while Zoe continues. | C / deliberate inaction | [S-stop] |

### The Hollow

Mio's light creates usable paths; Zoe's spectral power pulls and repositions
structures. Later their spirit forms join into one connected creature. [S7]

| ID | Area / activity | Player jobs and objective | Mode / pattern | Evidence |
| --- | --- | --- | --- | --- |
| SF-076 | An Ominous Welcome | Zoe positions discs; Mio illuminates them to create traversable light. | C / combine | [S7] |
| SF-077 | Mosaic of Memories | Move walls, chains, and light sources while maintaining the partner's path. | C / hold/cross | [S7] |
| SF-078 | Ghost Town: chandelier | Both balance the moving chandelier; Zoe later pulls it while Mio handles threats. | C / shared control | [S7] |
| SF-079 | Light in the Dark: bell | Combine pull and light to swing a bell into the chains blocking passage. | C / combine | [S7] |
| SF-080 | Light in the Dark: snake door | Zoe and Mio selectively move/activate rings until the snake pattern aligns. | C / combine | [S7] |
| SF-081 | Spiritual Guides: connected creature | Coordinate two ends of one body across hooks, moving platforms, and narrow hazard gaps. | C / tether | [S7] |
| SF-082 | The Hydra: reunion attack | Reach one another from separated routes, reconnect spirit forms, and attack the head. | C / timing | [S7] |
| SF-083 | The Hydra: siege weapons | Reach and activate crossbows using the established light and pulling mechanics. | C / combine | [S7] |
| SF-084 | Inside the Hydra | Mio carries protective light near Zoe; together restore and activate the final weapon. | C / protect/act | [S7] |

### Split

The finale makes the relationship between the two views part of the puzzle.
These rows are compressed descriptions of the reported mechanics; the linked
walkthrough video lists a chapter timestamp for closer study. [S8] [V8]

| ID | Area / activity | Player jobs and objective | Mode / pattern | Evidence |
| --- | --- | --- | --- | --- |
| SF-085 | Split Up: different realities | Use information from one world to guide the partner's switches and crossings in the other. | C / guide/act | [S8] |
| SF-086 | Split Up: raft and unseen danger | Zoe moves the raft; Mio calls hazards visible only in her version. | C / guide/act | [S8] |
| SF-087 | A Warm Greeting | Cross a shared presentation where sci-fi and fantasy occupy different portions of the scene. | C/P / shared space | [S8] |
| SF-088 | Face-to-Face / Fight a God | Survive Rader's attacks, gather glitches, and jointly activate weapons for damage windows. | C / combine | [S8] |
| SF-089 | Worlds Apart | Activate connected machinery across the two differently rendered worlds to open both routes. | C / combine | [S8] |
| SF-090 | Cross Section | Traverse a shared layout as the visual division between worlds moves through it. | C/P / shared space | [S8] |
| SF-091 | A New Perspective | Zoe acts on the screen's surface to open Mio's route inside it. | C / hold/cross | [S8] |
| SF-092 | Outside the Box | Mio tilts the screen containing Zoe; Zoe navigates the changing slopes and obstacles. | C / shared control | [S8] |
| SF-093 | Final Showdown | Recognize returning threats and repeat joint glitch activation to attack Rader. | C / combine | [S8] |

## Split Fiction: all 12 Side Stories

Portals are in chapters 2–5, three per chapter. The **12 parent rows** below form
the complete named-story inventory. Lettered subentries identify distinct
activities *inside* a story; they do not increase the number of Side Stories.
Portal locations follow [SF-list]; EA describes these as optional worlds that
return players to the campaign afterward. [EA-side]

| ID | Side Story | Portal chapter / section | Activity and two-player relationship | Mode | Evidence |
| --- | --- | --- | --- | --- | --- |
| SF-S01 | The Legend of the Sandfish | Neon Revenge / Play Me Techno | Alternate distracting the sand predator so the partner can cross exposed sand. | C / protect/act | [S-sand] |
| SF-S01a | Sandfish riding | Inside The Legend of the Sandfish | Both ride creatures through the desert escape. | P / parallel | [S-sand] |
| SF-S02 | Farmlife | Neon Revenge / Streets of Neon | Mio's pig flies with a fart boost; Zoe's stretches. Combine their routes and launch interactions to collect apples. | C / relay | [EA-SF] [S-farm] |
| SF-S02a | Sausage preparation | Inside Farmlife | Both cook their sausage bodies, apply condiments to one another, and enter the buns. | C/S / combine | [S-farm] |
| SF-S03 | Mountain Hike | Neon Revenge / Big City Life | Both traverse giants' hands, tools, and moving bodies with timed jumps and grapples. | P / parallel | [S-hike] |
| SF-S04 | Train Heist | Hopes of Spring / Lord Evergreen | Water-ski/glide beside trains, dodge hazards, and board the moving convoy. | P / parallel | [EA-side] [S3] |
| SF-S04a | The Conductor | Inside Train Heist | Both pilot shooting craft through a side-scrolling projectile-pattern boss fight. | P / parallel | [SF-stories] |
| SF-S05 | Gameshow | Hopes of Spring / Walking Stick of Doom | Pass a ticking bomb before it explodes; both must catch it throughout seven obstacle stages. | C / relay | [SF-trophy] |
| SF-S05a | Gameshow variations | Inside Gameshow | Pass and catch through fire, electrical hazards, and disappearing platforms. | C / timing | [SF-stories] |
| SF-S06 | Collapsing Star | Hopes of Spring / Halls of Ice | Time movement between cover against periodic lethal stellar pulses; operate lifts for each other. | C / relay | [S3] |
| SF-S06a | Shared shield escape | Inside Collapsing Star | Shelter both players under one shield and alternate whose shield provides protection. | C / protect/act | [SF-stories] |
| SF-S07 | Kites | Final Dawn / Toxic Tumblers | Travel through airborne rings and kite routes. A race framing coexists with a mostly parallel traversal course. | P/V† | [SF-stories] |
| SF-S08 | Moon Market | Final Dawn / Test Chamber | Complete three cat-retrieval branches to unlock the exit; an introductory cat opens the initial gate. | C/P / shared workload | [S-cats] |
| SF-S08a | Lanterns and musical platforms | Inside Moon Market | Carry lanterns to reveal a route; one plays an instrument while the other crosses its appearing platforms. | C / hold/cross | [S-cats] |
| SF-S08b | Cat-picture puzzle | Inside Moon Market | Match the ground drawing's colors to the gate image, then lift cover for the partner to retrieve the cat. | C / combine | [S-cats] |
| SF-S08c | Flying-house pursuit | Inside Moon Market | Follow the cat across flying transport and books; one opens the chest while the other retrieves it. | C/P / relay | [S-cats] |
| SF-S08d | Potions and transformations | Inside Moon Market | Experiment with potions and transform a partner into an interactable object, including a chair. | C/S / playful interaction | [SF-trophy] |
| SF-S09 | Notebook | Final Dawn / Soaring Desperados | Navigate a sketched story whose platforms and circumstances are rewritten during play. | P / parallel | [SF-stories] |
| SF-S09a | Horse and rider | Inside Notebook | Mio becomes a horse; Zoe uses her as a mount to reach a control. | C / relay | [S4] |
| SF-S09b | Sketch combat and boss choices | Inside Notebook | Fight with changing weapons and confront the demon, crab, and duck variants before rescuing the prince. | P / parallel | [S-notebook] |
| SF-S10 | Slopes of War | Rise of the Dragon Realm / Water Temple | Snowboard through a war zone and perform tricks to compete for score. | V / competition | [EA-side] [SF-stories] |
| SF-S11 | Space Escape | Rise of the Dragon Realm / Craft Temple | Manage space traversal and refills; each manipulates part of the terminal's shape-matching puzzle. | C / combine | [S5] |
| SF-S12 | Birthday Cake | Rise of the Dragon Realm / Treasure Temple | Play as teeth through candy obstacles and light the cake's candles. | C/P / timing | [SF-stories] |
| SF-S12a | Dentist: rescue and counterattack | Inside Birthday Cake | Free a captured partner; control dentures to restrain the dentist's hand while the other attacks. | C / protect/act | [S5] |
| SF-S12b | Dentist: cup tracking | Inside Birthday Cake | Track the cup concealing the partner and select it after the shuffle. | C / guide/act | [S5] |

## Split Fiction: extras outside the 12 Side Stories

| ID | Activity | Player jobs and objective | Mode / pattern | Evidence |
| --- | --- | --- | --- | --- |
| SF-X01 | Laser Hell — Isolation / Maximum Security | Complete five demanding laser rooms as a pair. Failure resets the gauntlet; this is separate from the 12 Side Stories. | C/P / timing | [S-hell] [S-hell2] |
| SF-X02 | Shooting gallery — Final Dawn, near jetpack hand-in | Shoot the targets assigned to each player's color. A score activity, not an additional Side Story. | C/P† / shared workload | [S4] |
| SF-X03 | Disc launcher — Isolation / Prison Courtyard | Zoe activates the disc launcher; Mio shoots its launched targets from the turret. | C / launch/catch | [S6] |
| SF-X04 | Bike phone challenge — Neon Revenge / Gravity Bike | Zoe attempts the phone's distracting verification sequence while Mio drives; distinguish this from ordinary driving/combat. | C/S / divided attention | [SF-trophy] |

## Coverage audit

There are **265 catalog records**: 209 campaign activity records, 25 named
competitive minigames, 25 Side Story records, and 6 additional activities.
The Side Story records comprise **12 named stories plus 13 internal activities**.
These are editorial records, not 265 officially named or mechanically unrelated
games. Two lettered It Takes Two entries and two lettered Split Fiction entries
subdivide campaign activities; ranges below include those suffixes.

| Game / chapter | Campaign IDs | Records | Coverage boundary |
| --- | --- | --- | --- |
| It Takes Two — The Shed | IT-001–011 | 11 | Wake-up Call through Wired Up; both bosses. |
| The Tree | IT-012–027 | 16 | Fresh Air through Getaway; combat, mounts, duel, and glider. |
| Rose's Room | IT-028–064 | 37 | All ten sections; six space trials grouped by machinery, then toys, circus, dungeon, and The Queen. |
| Cuckoo Clock | IT-065–076 | 12 | Gates of Time, Clockworks, and A Blast from the Past. |
| Snow Globe | IT-077–087 | 11 | Warming Up, Winter Village, Beneath the Ice, and Slippery Slope. |
| Garden | IT-088–099 | 12 | Green Fingers, Weed Whacking, Trespassing, Frog Pond, and Affliction. |
| The Attic | IT-100–112, including 100a–b | 15 | Setting the Stage through Turn Up. A Grand Finale is the story resolution, not an additional substantial sub-game here. |
| **It Takes Two campaign total** | | **114** | Seven chapters. |
| Split Fiction — Rader Publishing | SF-001–004 | 4 | Freedom Fighters and Brave Knights. |
| Neon Revenge | SF-005–015 | 11 | Rush Hour through Head of the Crime Syndicate; short transitions grouped with adjacent activities. |
| Hopes of Spring | SF-016–029, including 029a | 15 | The Underlands through The Ice King, including terrain control and both Monkey King rules. |
| Final Dawn | SF-030–041 | 12 | The Dropship through System Fail Safe Mode; opening descent grouped with Infiltration. |
| Rise of the Dragon Realm | SF-042–058, including 042a | 18 | A Serpentine Path through Megalith's Wrath; both flying sections share one record. |
| Isolation | SF-059–075 | 17 | Prison Ship through The Prisoner; the secret challenge is SF-X01. |
| The Hollow | SF-076–084 | 9 | An Ominous Welcome, Mosaic of Memories, Ghost Town, Light in the Dark, Spiritual Guides, and The Hydra. |
| Split | SF-085–093 | 9 | All nine sections; Face-to-Face and Fight a God share the recurring boss-loop record. |
| **Split Fiction campaign total** | | **95** | Eight chapters. |

Chapter and checkpoint cross-checks: [IT-chapters] [SF-chapters]. Some guides
merge checkpoint names or translate them differently; the encounter descriptions
and source links take priority over an exact checkpoint label.

The minigame count by It Takes Two chapter is **2 + 2 + 7 + 2 + 4 + 3 + 5 = 25**.
Split Fiction's Side Story portals are **3 + 3 + 3 + 3 = 12**, in chapters 2–5.
[IT-list] [SF-list]

## Community favorites and replay appeal

Community research added **9 September 2026**. This section addresses what players
*seem to enjoy most*, rather than just what activities exist. It does not change
the 265-record inventory or its cooperation classifications.

**The strongest shortlist in the retrieved discussions is Snow Globe, the castle
dungeon, Cuckoo Clock, and Laser Tennis for It Takes Two; Moon Market, Collapsing
Star, Farmlife, Birthday Cake, and the finale for Split Fiction.** These represent
different pleasures: exploration, complementary powers, competition, shared
comedy, tension, and spectacle. The tables below separate those reasons and the
strength of the evidence. This is a qualitative shortlist, not a measured ranking
of the player population.

### Method and strength of evidence

The evidence ledger below contains **20 sources: 18 Reddit discussions, one
ResetEra discussion page, and one Backloggd player review**. Discussion dates
span 2021–2026. Search began with each game's name plus favorite/favourite,
minigame, level, chapter, side story, ranking, and player discussion. Follow-up
searches checked named candidates, requests for similar games, replay reports,
and contrary opinions. Only readable post/comment text or search-indexed text
was used; inaccessible image tier lists were not interpreted.

**Repeated** means favorable accounts appear in at least two distinct linked
discussions or review pages. **Limited** means the specific activity has thinner
support, even when its chapter is popular. **Mixed** means explicit disagreement
matters to the conclusion. These are editorial evidence labels, not statistical
confidence intervals. Multiple posts by the same person or accounts of the same
pair may overlap; independent threads do not imply independent participants.

No upvotes were added together, and a thread's score was not treated as votes for
every activity mentioned inside it. A ranked list naming every level was not
treated as endorsing every level as a favorite. Broad chapter praise was not
automatically assigned to every puzzle in that chapter. Promotional giveaway
entries, walkthrough authors' rankings, and praise from people explicitly saying
they had only watched footage were excluded from the preference conclusions.

This is a convenience sample of public, predominantly English-language posts,
with strong fan and launch-period selection effects. Search indexing and hidden
comments limit coverage; some players had not finished the games. No
representative sub-game preference survey or activity-level retention dataset
was found in this research. These findings do not establish preferences by age,
platform, skill, or relationship type, and absence from the shortlist does not
mean an activity is disliked.

### It Takes Two: the clearest favorites

| Activity / catalog reference | Signal | What players specifically enjoy | Interpretation and limits |
| --- | --- | --- | --- |
| **Snow Globe**, especially Winter Village and skating — IT-079–087 | Repeated; some dissent | Cozy atmosphere, skating/swimming, exploring, and playful things outside the objective recur in favorite-level discussions. [CP-I1] [CP-I2] [CP-I3] | Strong support for the overall playground experience. This does not establish that its pipe-wrench puzzle or any one minigame is the favorite. |
| **Castle dungeon / fire-and-ice combat** — IT-060–063 | Repeated; requests for more | Separate pairs sought whole games resembling this section; another discussion singles it out as a refreshing favorite. [CP-I4] [CP-I5] [CP-I2] | Especially useful evidence of appetite beyond a one-time surprise. It is self-reported interest, not measured purchasing or retention. |
| **Cuckoo Clock / time and clone puzzles** — IT-065–076 | Repeated | Players praise the cooperative abilities, living town, visual theme, and time manipulation. [CP-I1] [CP-I2] [CP-I3] | A strong asymmetric-puzzle reference. Town exploration and spectacle contribute alongside the actual time-control rules. |
| **Rose's Room variety** — IT-028–064 | Repeated; individual sections mixed | The variety and toy-world creativity attract praise; space puzzles also receive complaints about repetition. [CP-I1] [CP-I2] [CP-I3] | Treat this as evidence for varied activities and pacing. It is too broad to declare every space trial or toy puzzle a community favorite. |
| **Laser Tennis** — IT-M07; competitive | Repeated; explicit replay anecdote | A pair reports spending exceptional time replaying it; separate 2023 and 2026 discussions name it positively. [CP-I6] [CP-I7] [CP-I8] | The clearest recurring named-minigame candidate found. It is versus play, so its popularity does not prove that an interdependent version will work. |

There is also affection for **hammer and nails** (IT-006–010) and **the Attic's
music activities** (IT-100–112). However, the same discussion set contains strong
criticism of the music chapter's ending and tasks, making it a less consistent
favorite than the shortlist above. [CP-I1] [CP-I3]

For the remaining named minigames, the evidence is sparse. **Chess** (IT-M22)
receives a specific recommendation and appears among one player's favorites;
that review also praises ice skating and Laser Tennis. **Batting Team** (IT-M10)
has a favorable reply in the small minigame thread. These are useful leads, not
a defensible second-through-twenty-fifth ranking. [CP-I9] [CP-I10] [CP-I6]

### Split Fiction: optional Side Stories

Rows are grouped by the strength and character of the signal, not ordered by
estimated population popularity.

| Side Story / catalog reference | Signal | What players specifically enjoy | Interpretation and limits |
| --- | --- | --- | --- |
| **Moon Market** — SF-S08–08d | Repeated; return visits reported | Exploration, playful transformations, atmosphere, and a break from action; players describe revisiting or finding more on replay. [CP-S2] [CP-S3] [CP-S10] | One of the strongest references for optional social play. The appeal extends beyond completing the cat puzzles. |
| **Collapsing Star** — SF-S06–06a | Repeated; stress tolerance varies | The dying-star spectacle, sound, and shield timing are recurring highlights; one ranking finds it stressful. [CP-S1] [CP-S2] [CP-S3] [CP-S5] | A strong candidate for studying shared tension and protection. Beauty, urgency, and cooperation are intertwined in the praise. |
| **Farmlife** — SF-S02–02a | Repeated | Pig movement, absurd transformations, and laughter with a partner recur across discussions. [CP-S1] [CP-S2] [CP-S5] | Strong support for playful embodiment and shared comedy; this does not isolate whether fart movement, stretching, or the ending mattered most. |
| **Birthday Cake / dentist** — SF-S12–12b | Repeated; tone divides players | Players praise the bouncy tooth characters, surprise, and dentist encounter; another account turns negative at that boss. [CP-S1] [CP-S2] [CP-S4] | A memorable favorite with a material tonal caveat. Enjoying its surprise does not establish broad appeal for its disturbing imagery. |
| **Train Heist / The Conductor** — SF-S04–04a | Limited breadth; multiple replay accounts | Multiple participants praise the Conductor, and two describe replaying the story. [CP-S1] | A promising replay candidate, with less breadth of evidence than the four above. Distinguish the boss from the preceding chase. |
| **Slopes of War** — SF-S10; competitive | Repeated; mixed | Snowboarding, tricks, and speed attract praise; another discussion includes dislike of its versus framing. [CP-S2] [CP-S4] | Strong for players who enjoy racing and score competition. Do not generalize it to cooperation-first pairs. |
| **Notebook** — SF-S09–09b | Repeated; mixed | Art, jokes, and story-changing presentation earn high praise; other players find it boring or weaker on replay. [CP-S2] [CP-S4] | Its novelty is compelling to some players, while repeated enjoyment is less consistent. |
| **Gameshow** — SF-S05–05a | Strongly mixed | It appears among favorites and replay favorites, but also last in a personal ranking because of stress. [CP-S2] [CP-S3] | Worth studying as a coordination challenge; unsuitable as evidence of a broadly comfortable favorite. Partner familiarity is suggested by commenters, not established as the cause. |

**Kites, Mountain Hike, Space Escape, and The Legend of the Sandfish** also have
supporters. The retrieved comparisons provide a less consistent case for putting
them in the leading group. Complaints include difficult flight controls,
unclear traversal, and urgency that prevents enjoying the scenery; other players
value precisely their setting and movement. This is mixed taste, not a finding
that those stories fail. [CP-S2] [CP-S3]

### Split Fiction: campaign highlights

| Activity / catalog reference | Signal | What the evidence supports |
| --- | --- | --- |
| **Final chapter's perspective changes** — SF-085–093, especially SF-091–092 | Repeated across communities and years | Players repeatedly praise the final chapter's visual invention and surprise, including in June 2026. This is strongest as evidence of a memorable climax; comments do not separately rank each camera puzzle or prove sustained replay. [CP-S6] [CP-S7] [CP-S10] |
| **Dragon riding, flying, and Megalith** — SF-042–058, especially SF-057–058 | Repeated | Rankings favor the dragon chapter's flying and spectacle; a 2026 discussion still identifies the dragon story among the game's highs. This does not establish which preceding temple puzzle is best liked. [CP-S3] [CP-S4] [CP-S8] |
| **Cooperative pinball** — SF-065–066 | Repeated; request for more | A player explicitly wants more two-player pinball, another ranks its chapter first while praising that section, and a later discussion names pinball as a highlight. [CP-S3] [CP-S8] |
| **Neon Revenge / bikes** — SF-005–015 | Repeated | Players favor the city chapter's speed and atmosphere and specifically mention its motorcycles. The chapter-level enthusiasm is clearer than a ranking of its individual bosses. [CP-S3] [CP-S4] |
| **Monkey King's dance and growing monkey lines** — SF-025–026 | Limited at the individual-rule level | Players name the dance and describe laughing at the Monkey King, even when disliking the surrounding chapter. They do not clearly separate the dance from the growing-line game. [CP-S4] [CP-S5] |

The counterevidence is useful: a frustration-focused discussion objects to the
pace and repeated shooting/platforming in sci-fi chapters. Broad praise of a
chapter does not make its controls comfortable for every pair. [CP-S9]

### What this changes about using the catalog

Our design interpretation is to keep three forms of appeal separate:

1. **Wanting more of the activity:** the dungeon and pinball requests, plus
   Laser Tennis and Train Heist replay anecdotes, are the best leads for studying
   a repeatable game loop.
2. **Wanting to spend time together in the place:** Snow Globe and Moon Market
   suggest that optional interactions, movement, and room to improvise can matter
   as much as a mandatory puzzle.
3. **Remembering the surprise:** the finale, Farmlife, and Birthday Cake show the
   value of an unexpected change. Novelty should not be mistaken for evidence
   that the same reveal will remain entertaining over many rounds.

For an original cooperative prototype, the most useful mechanics to examine
first are shared operator/passenger control, complementary combat or tools, and
playful transformations. Laser Tennis is a separate competitive reference.
Gameshow is a useful test of how time pressure changes a pair's experience.
These are research priorities, not additions to a concept or conclusions about
Roblox implementation, audience fit, or commercial demand.

### Community evidence ledger

Dates below identify the initial post where available, not the date of every
reply. All were retrieved or consulted through indexed text on 9 September 2026.
The linked comments are players' accounts; their descriptions of game mechanics
and comparisons with other franchises are not treated as authoritative rules.

| Source | Initial date / available date | Evidence used |
| --- | --- | --- |
| [Favorite level discussion][CP-I1] | 7 March 2024 | Snow, clock town, toy-room variety, hammer/nails, and music preferences. |
| [Favorite and least favorite level][CP-I2] | 18 April 2021 | Favorites and dissent; specific castle and space reactions. |
| [Order the levels][CP-I3] | 28 March 2021 | Chapter comparisons, exploration, complementary powers, and music criticism. |
| [More games like the dungeon section][CP-I4] | 24 May 2021 | A pair requests a whole game resembling the castle activity. |
| [Another dungeon request][CP-I5] | 17 August 2021 | A separate pair describes discovering that they enjoy this style. |
| [Best Minigame?][CP-I6] | 9 May 2021 | Laser Tennis replay anecdote, another endorsement, and Batting Team reply. |
| [r/Games discussion][CP-I7] | 3 February 2023 | Specific Laser Tennis praise within a broader, mixed discussion. |
| [Favorite minigames from AAA titles][CP-I8] | 1 June 2026 | Later independent mention of Laser Tennis. |
| [Backloggd player review][CP-I9] | Date not verified | Named favorites include skating, Chess, and Laser Tennis; indexed excerpt used. |
| [Favorite minigame inside a larger game][CP-I10] | 31 March 2026 | Specific Chess endorsement; limited evidence. |
| [Favorite Side Story?][CP-S1] | 28 March 2025 | Broad side-story preferences, replay anecdotes, and negative dentist reaction. |
| [Side Stories tier list and replies][CP-S2] | 1 April 2025 | Written ranking, direct disagreements, and replay comments; images not used. |
| [Favorite levels and chapters ranked][CP-S3] | 11 March 2025 | Campaign and side-story rankings, pinball request, and later replies. |
| [Favorite / less liked story][CP-S4] | 30 March 2025 | Both positive and negative comparisons across campaign and Side Stories. |
| [Favorite scenes][CP-S5] | 7 March 2025 | Early reactions to pigs, dying star, bikes, and monkey dance; some unfinished playthroughs. |
| [Finished blind: r/gaming discussion][CP-S6] | 11 April 2025 | Repeated finale praise; accounts from people who played distinguished from spectators. |
| [r/playstation discussion][CP-S7] | 5 June 2026 | Later finale praise emphasizing its visual presentation. |
| [Just finished SplitFiction][CP-S8] | Replies dated 1–3 April 2026 | Later highlights include dragons, cat village, and pinball. |
| [Frustrated player discussion][CP-S9] | 29 March 2025 | Counterexample concerning sci-fi pace and repetition. |
| [ResetEra discussion, page 10][CP-S10] | Posts in March 2025 | Moon Market as a breather and praise for the finale; indexed text used. |

[CP-I1]: https://www.reddit.com/r/ItTakesTwo/comments/1b8jdjl/
[CP-I2]: https://www.reddit.com/r/ItTakesTwo/comments/mtk9q5/
[CP-I3]: https://www.reddit.com/r/ItTakesTwo/comments/met4dz/
[CP-I4]: https://www.reddit.com/r/ItTakesTwo/comments/njrsxl/
[CP-I5]: https://www.reddit.com/r/ShouldIbuythisgame/comments/p5yjxo/
[CP-I6]: https://www.reddit.com/r/ItTakesTwo/comments/n82yf1/
[CP-I7]: https://www.reddit.com/r/Games/comments/10sjv1c/
[CP-I8]: https://www.reddit.com/r/videogames/comments/1ttrwje/
[CP-I9]: https://backloggd.com/u/Aarooon/review/2509635
[CP-I10]: https://www.reddit.com/r/gamedesign/comments/1s8iuxq/
[CP-S1]: https://www.reddit.com/r/SplitFiction/comments/1jm1ogj/
[CP-S2]: https://www.reddit.com/r/SplitFiction/comments/1jpa1n0/
[CP-S3]: https://www.reddit.com/r/SplitFiction/comments/1j8j9s3/
[CP-S4]: https://www.reddit.com/r/SplitFiction/comments/1jnipd1/
[CP-S5]: https://www.reddit.com/r/SplitFiction/comments/1j5snl9/
[CP-S6]: https://www.reddit.com/r/gaming/comments/1jwoig6/
[CP-S7]: https://www.reddit.com/r/playstation/comments/1txdnvy/
[CP-S8]: https://www.reddit.com/r/SplitFiction/comments/1s9eao1/
[CP-S9]: https://www.reddit.com/r/SplitFiction/comments/1jmpnij/
[CP-S10]: https://www.resetera.com/threads/split-fiction-ot-twice-the-fun.1126230/page-10

## Mechanics index for original design work

This index is our analysis of the catalog. It groups the *relationship between
players*, independent of the original characters and scenery. Examples are
lookup IDs, not an additional set of games or adopted concept requirements.

| Relationship to explore | Useful examples | Design question |
| --- | --- | --- |
| One maintains a path while the other crosses | IT-006, IT-065, SF-019, SF-077 | What makes maintaining the path an active, legible job? |
| Roles alternate as each reaches safety | IT-078, IT-096, SF-022–024, SF-059 | When does responsibility transfer, and can both recognize that moment? |
| Separate inputs combine into one effect | IT-013, IT-098–099, SF-046, SF-055 | Can each player see what their own input contributed? |
| Two people steer one object | IT-027, IT-046–047, IT-053, SF-043 | Do the controls require negotiation, anticipation, or constant correction? |
| Operator launches a partner who can still steer | IT-002, IT-034, IT-056, SF-061, SF-065 | How much useful control does the passenger retain? |
| Aim and movement belong to different players | IT-020, IT-023, SF-002, SF-011, SF-021 | Are both jobs busy, and how do hazards connect their decisions? |
| One sees or reveals information for the other | IT-043, IT-069, IT-104, SF-027, SF-071, SF-085–086 | What exactly must be communicated: a symbol, direction, timing, or moving safe area? |
| One protects while the other performs a task | IT-093, IT-106, SF-064, SF-069, SF-S06a | Is protection a sustained state, a limited resource, or a timed action? |
| A dangerous object must keep changing hands | IT-058, SF-S05–05a | What prevents one player from keeping it indefinitely? |
| Relative position is the shared constraint | IT-087, SF-041, SF-081 | Does the rule reward closeness, spacing, order, or alternating movement? |
| A player becomes terrain, transport, or machinery | IT-089–090, SF-019, SF-062–065, SF-S09a | How does the transformed player retain agency and feedback? |
| Parallel routes require occasional reunion | IT-039, IT-082, SF-057, SF-082 | Where does each person's individual progress become necessary to the other? |
| Memory or recognition is distributed | IT-045, SF-S08b, SF-S12b | Can observations be shared, or does one player monopolize the answer? |
| The two views themselves become tools | SF-085–092 | Which visual rule changes, and how does the player learn the new rule? |
| Progress depends on withholding input | SF-075 | How can the game communicate that stopping is an intentional contribution? |
| Competitive relief inside a shared adventure | IT-M01–25, SF-S10 | Is a loss brief and recoverable, and does rivalry support the surrounding experience? |

When developing a candidate, specify each player's verbs, the dependency between
them, the success condition, the mistake signal, the reset cost, and whether roles
can swap. The source games' presentation alone does not answer those questions
for a new game. No difficulty, session length, accessibility, or production-cost
rating has been inferred from how brief an activity sounds in this catalog.

Use these as references for abstract interactions. Keep new names, characters,
worlds, art, audio, dialogue, and level layouts original. Recognizable references
within the source games—particularly character cameos, franchise jokes, and
achievement names—are not assets or marketing concepts to carry into this repo.

## Source discrepancies and replay checks

- **Checkpoint boundaries:** chapter and dedicated puzzle guides sometimes use
  different boundaries. Search by encounter too. [S3] [S-egg] [S-monkey]
  VGTimes also translates Final Dawn as “Final Down.” [S4]
- **Role-name slips:** the Rush Hour guide occasionally reverses Mio and Zoe
  within individual instructions. SF-005–006 follows their established abilities
  and avoids relying on those isolated name assignments. [S-rush]
- **Moon Market cats:** four cats in the overall story is consistent with one
  introductory gate cat followed by three retrieval branches. SF-S08 uses that
  distinction. [S-cats]
- **Space Escape meter:** GameSpot describes oxygen and a gravity meter
  inconsistently. SF-S11 therefore records traversal, refills, and the cooperative
  terminal without asserting an exact meter name or depletion rule. [SF-stories]
- **Kites and shooting gallery (†):** formal scoring and winner conditions still
  need verification; the classifications remain provisional.
- **Finale detail:** The Hollow and Split have thinner detailed-source coverage
  than the earlier chapters. Their fine-grained camera transitions and player
  assignments should be replay-checked before becoming a prototype specification.
  The Filibuster Blog attributes its Hollow walkthrough to Game Rant; it is not
  an independent second confirmation. [S7] [S8] [V8]
- **Version differences:** EA's 17 March 2025 patch corrected the Royal Palace
  wheel at high frame rates and the magnetic harpoon's camera sensitivity.
  A recording of a malfunction is not necessarily the intended rule. [EA-patch]

## Source register

All sources were consulted for this research on **9 September 2026**. Dates in
the article may reflect publication or subsequent updates. This is a textual
synthesis with original classifications, not a reproduction of walkthroughs.
No linked video is claimed to have been watched in full. Some Neoseeker pages
were available through search-indexed text while direct page opening returned
an access error; their links are retained for attribution and later review.

### Official framing

- [EA-IT]: Electronic Arts, *It Takes Two* product page and features.
- [EA-SF]: Electronic Arts, *Split Fiction* features.
- [EA-side]: Electronic Arts, *An Introduction to Side Stories* (27 January 2025).
- [EA-patch]: Electronic Arts, *Split Fiction Update Notes — 17 March 2025*.

### It Takes Two: inventories and detailed guides

- [IT-chapters]: Neoseeker's campaign and checkpoint index.
- [IT-list]: PowerPyx, complete 25-minigame location inventory.
- [IT-list2]: GameSkinny, independent minigame location inventory.
- [IT-mini]: community wiki, minigame overview and opening minigame rules.
- [IT-trophy]: PlatGet, trophy guide with minigame rules and optional activities.
- [IT-rules]: Avid Achievers, compact minigame rules table.
- [I1]: Gamerpillar, Chapter 1 walkthrough.
- [G1], [G2], [G3], [G4], [G5], [G6], [G7]: Gamepur's respective Shed, Tree,
  Rose's Room, Cuckoo Clock, Snow Globe, Garden, and Attic walkthroughs.
- [N1], [N2], [N3], [N4], [N5], [N6], [N7], [N8]: Neoseeker's Shed, Tree,
  Rose's Room parts 1 and 2, Cuckoo Clock, Snow Globe, Garden, and Attic guides.
- [B2], [B3], [B6]: Neoseeker's Tree, Rose's Room, and Garden boss guides.
- [I-space]: VGTimes, space-area walkthrough.
- [I-class]: Walkthroughs.games, classroom and kaleidoscope puzzles.

### Split Fiction: inventories and detailed guides

- [SF-chapters]: Gamerpillar's mission and checkpoint index.
- [SF-list]: PowerPyx, all 12 Side Story portal locations.
- [SF-stories]: GameSpot, descriptions of all 12 Side Stories.
- [SF-trophy]: PowerPyx, trophy guide; phone, potions, and partner transformation.
- [S1], [S2], [S3], [S4], [S5], [S6]: VGTimes' walkthroughs for chapters 1–6.
  These English pages are translated and contain occasional naming errors.
- [D4], [D5], [D6]: Notes Read chapter 4–6 walkthroughs, used for additional
  machinery and role detail; translated names differ from menu names.
- [S7]: The Filibuster Blog, Hollow walkthrough, attributed there to Game Rant.
- [S8]: 9Puz, whole-game guide; used for the finale's perspective mechanics.
- [S-rush]: Gamerpillar, Rush Hour.
- [S-egg], [S-monkey], [S-cube], [S-lock]: Gamerpillar's egg-batting, Silly
  Monkeys, sliding-cube, and internal-lock puzzle guides.
- [S-fish]: GameSpot, underwater/stalk traversal; distinct from SF-020's later
  plant-cover sequence.
- [S-factory]: GamerBlurb, factory machinery and moving-cargo puzzle.
- [S-sand], [S-farm], [S-hike], [S-cats]: Gamerpillar's Sandfish, Farmlife,
  Mountain Hike, and Moon Market cat-puzzle guides.
- [S-notebook]: GamerBlurb, Notebook boss choices and demon encounter.
- [S-stop]: Steam community discussion of the final Isolation button prompt;
  community evidence, consistent with the chapter walkthrough.
- [S-hell], [S-hell2]: Insider Gaming and Gamer.org on Laser Hell.
- [V8]: Steam Community's full-game walkthrough video listing; its description
  places the final chapter at **9:52:31**. A replay reference, not a watched source.

[EA-IT]: https://www.ea.com/games/it-takes-two/it-takes-two
[EA-SF]: https://www.ea.com/games/split-fiction/split-fiction/features
[EA-side]: https://www.ea.com/en/games/split-fiction/split-fiction/news/an-introduction-to-side-stories
[EA-patch]: https://www.ea.com/games/split-fiction/split-fiction/news/split-fiction-update-notes-17-03
[IT-chapters]: https://www.neoseeker.com/it-takes-two/walkthrough
[IT-list]: https://www.powerpyx.com/it-takes-two-all-minigame-locations/
[IT-list2]: https://www.gameskinny.com/tips/it-takes-two-guide-all-minigames-locations/
[IT-mini]: https://ittakestwo.fandom.com/wiki/Minigames
[IT-trophy]: https://platget.com/guides/it-takes-two-trophy-guide/
[IT-rules]: https://avidachievers.com/trophy-guides/it-takes-two-trophy-guide/
[I1]: https://gamerpillar.com/chapter-1-it-takes-two-walkthrough/
[G1]: https://www.gamepur.com/guides/it-takes-two-the-shed-gameplay-tips-and-walkthrough-guide
[G2]: https://www.gamepur.com/guides/it-takes-two-the-tree-gameplay-tips-and-walkthrough-guide
[G3]: https://www.gamepur.com/guides/it-takes-two-roses-room-gameplay-tips-and-walkthrough-guide
[G4]: https://www.gamepur.com/guides/it-takes-two-cuckoo-clock-gameplay-tips-and-walkthrough-guide
[G5]: https://www.gamepur.com/guides/it-takes-two-snowglobe-gameplay-tips-and-walkthrough-guide
[G6]: https://www.gamepur.com/guides/it-takes-two-garden-gameplay-tips-and-walkthrough-guide
[G7]: https://www.gamepur.com/guides/it-takes-two-the-attic-gameplay-tips-and-walkthrough-guide
[N1]: https://www.neoseeker.com/it-takes-two/walkthrough/The_Shed
[N2]: https://www.neoseeker.com/it-takes-two/walkthrough/The_Tree
[N3]: https://www.neoseeker.com/it-takes-two/walkthrough/Rose%27s_Room_%28Part_1%29
[N4]: https://www.neoseeker.com/it-takes-two/walkthrough/Rose%27s_Room_%28Part_2%29
[N5]: https://www.neoseeker.com/it-takes-two/walkthrough/Cuckoo_Clock
[N6]: https://www.neoseeker.com/it-takes-two/walkthrough/Snow_Globe
[N7]: https://www.neoseeker.com/it-takes-two/walkthrough/Garden
[N8]: https://www.neoseeker.com/it-takes-two/walkthrough/Attic
[B2]: https://www.neoseeker.com/it-takes-two/walkthrough/The_Tree_Bosses
[B3]: https://www.neoseeker.com/it-takes-two/walkthrough/Rose%27s_Room_Bosses
[B6]: https://www.neoseeker.com/it-takes-two/walkthrough/Garden_Bosses
[I-space]: https://vgtimes.com/guides/114022-complete-walkthrough-it-takes-two-bosses-and-puzzles-at-all-levels.html?page=3
[I-class]: https://walkthroughs.games/lorebase/it-takes-two/missions/classroom-trials-to-roses-kaleidoscope
[SF-chapters]: https://gamerpillar.com/split-fiction-all-mission-list-and-walkthrough/
[SF-list]: https://www.powerpyx.com/split-fiction-all-side-stories-locations/
[SF-stories]: https://www.gamespot.com/articles/all-split-fiction-side-stories-and-locations/1100-6529932/
[SF-trophy]: https://www.powerpyx.com/split-fiction-trophy-guide-roadmap/
[S1]: https://vgtimes.com/guides/122474-split-fiction-rader-publishing-walkthrough.html
[S2]: https://vgtimes.com/guides/122475-split-fiction-neon-revenge-walkthrough.html
[S3]: https://vgtimes.com/guides/122476-split-fiction-hopes-of-spring-walkthrough.html
[S4]: https://vgtimes.com/guides/122534-split-fiction-chapter-4-final-down-walkthrough.html
[S5]: https://vgtimes.com/guides/135948-split-fiction-rise-of-the-dragon-realm-chapter-5-walkthrough.html
[S6]: https://vgtimes.com/guides/137557-split-fiction-isolation-chapter-6-walkthrough.html
[D4]: https://notesread.com/guidechapter-4-last-dawn-in-split-fiction/
[D5]: https://notesread.com/guidechapter-5-the-rise-of-the-dragon-kingdom-in-split-fiction/
[D6]: https://notesread.com/guidechapter-6-isolation-in-split-fiction/
[S7]: https://thefilibusterblog.com/complete-walkthrough-for-split-fiction-the-hollow-level/
[S8]: https://9puz.com/3387-split-fiction-walkthrough/
[S-rush]: https://gamerpillar.com/rush-hour-walkthrough-neon-revenge-split-fiction/
[S-egg]: https://gamerpillar.com/log-egg-puzzle-lord-evergreen-chapter-3-split-fiction/
[S-monkey]: https://gamerpillar.com/silly-monkeys-walkthrough-hopes-of-spring-split-fiction/
[S-cube]: https://gamerpillar.com/sliding-cube-puzzle-halls-of-ice-chapter-3-split-fiction/
[S-lock]: https://gamerpillar.com/door-lock-puzzle-halls-of-ice-chapter-3-split-fiction/
[S-fish]: https://www.gamespot.com/articles/split-fiction-how-to-get-past-underlands-piranhas/1100-6529867/
[S-factory]: https://gamerblurb.com/articles/split-fiction-factory-entrance-walkthrough-chapter-4-final-dawn
[S-cats]: https://gamerpillar.com/moon-market-cat-gate-puzzle-split-fiction/
[S-sand]: https://gamerpillar.com/side-story-1-the-legend-of-the-sandfish-walkthrough-split-fiction/
[S-farm]: https://gamerpillar.com/side-story-2-farmlife-walkthrough-split-fiction/
[S-hike]: https://gamerpillar.com/side-story-3-mountain-hike-walkthrough-split-fiction/
[S-notebook]: https://gamerblurb.com/articles/split-fiction-demon-guide-notebook-quest
[S-stop]: https://steamcommunity.com/app/2001120/discussions/1/601898278747934347/?l=hungarian
[S-hell]: https://insider-gaming.com/how-to-play-split-fiction-laser-hell-secret-level/
[S-hell2]: https://www.gamer.org/how-to-beat-laser-hell-level-in-split-fiction/
[V8]: https://steamcommunity.com/sharedfiles/filedetails/?id=3573432097
