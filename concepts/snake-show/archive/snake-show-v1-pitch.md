# Snake Show (v1 pitch, archived)

> **Archived on September 5, 2026.** This is the original concept pitch, kept
> for history. It is superseded by
> [`snake-show-design-brief-v2.md`](../snake-show-design-brief-v2.md), which is
> the source of truth. Several ideas below were changed or dropped there; see
> Annex A of the brief for the reasons. The Context section at the end still
> holds the market case study and the Innersloth IP note.

Game concept for Roblox. Category: social betrayal for teens.

**One-line pitch:** a stylized betrayal reality show. Eight contestants live in a villa for one short "episode". Two of them are Snakes. Everyone has a secret persona, nobody stops playing when they're out, and your fame carries over between episodes.

## Why a reality show

The show framing is the key creative choice. It gives the game a fantasy that *Among Us* never owned, and it turns the awkward parts of social deduction into show mechanics: votes become live eliminations, eliminated players become the audience, clues become "receipts", and season passes become literal seasons. Teen audiences already know this language from *The Traitors*, *Big Brother*, and, on Roblox, from *Dress to Impress*.

Engine: **social deduction + persistent progression + collection and status + short mobile episodes.**

## The loop: one episode in about four minutes

1. **Cast (10 seconds).** Each player gets a secret persona card. Two players are Snakes. Everyone makes a themed entrance with their equipped walk-on animation.
2. **Day (about 75 seconds).** Contestants play quick two-person or group challenges in shared rooms to fill the Prize Pot. Challenges are small games, not chores: keep a tray balanced, memory match, tug of war. Snakes can "snake" a contestant when they're alone. The victim vanishes in a puff of confetti and leaves a snakeskin clue.
3. **Live vote (30 seconds).** No typing required. Players tap a face to accuse and attach one "receipt" from a wheel: *"Saw them near the pool"*, *"Was with me"*, *"They're lying"*. The vote is shown as a broadcast graphic, and one contestant is sent to the audience.
4. **Repeat Day and Vote three times**, then a cinematic **Snake reveal** with the Snake's own elimination animation. Fame is paid out to everyone, including the audience.

A twist card is drawn every episode and changes one rule: double elimination, immunity idol, blind vote, silent episode, swapped personas. This is the *Imposters & Roles* lesson: rules that change keep the format fresh without new content.

## How it removes the three frictions

- **Eliminated players become the audience, and the audience has power.** They earn Applause by watching and spend it on a three-second spotlight over any contestant, a fan mail hint to one contestant, or a vote on the next twist. They also bet on who the Snakes are and earn Fame for correct guesses. Getting eliminated changes your role. It doesn't end your game.
- **Communication works without chat.** Tap-to-accuse, receipts, reaction emotes, and a buddy system. Two contestants can pair up for a challenge bonus, which rewards cooperation mechanically. A Snake buddy can betray the pair, which creates stories.
- **Being a contestant is its own fantasy.** Every persona has an ability and a personal goal. Detective: check one alibi per episode. Influencer: your vote counts double when two others copy it. Drama Queen: earn bonus Fame when you're accused and survive. Bodyguard: protect one player per night. Neutral personas add uncertainty: Chaos Agent wins on a tied vote, Fan Favorite wins if voted out early. Snake assignment is fair, weighted to players who haven't been a Snake recently, and never sold.

## Progression, status, and revenue

- **Fame** is the XP and the leaderboard. Correct votes, challenge wins, surviving accusations, and good audience bets all pay Fame, so every path to a good episode is rewarded.
- **Seasons** last 8 to 10 weeks and ship a new villa (cruise ship, ski lodge, space yacht), new twist cards, and a season pass.
- **Prime Time** is the ranked mode. Top players appear on the lobby Hall of Fame wall.
- **Collection** covers outfits, walk-on entrances, "snaked" animations, catchphrases, trophies, and a personal dressing room that friends can visit. Rarity tiers first, trading later once the economy is stable.
- **Revenue** comes from outfits and identities, entrance and elimination animations, catchphrases and emotes, dressing room decor, the season pass, and Golden Ticket private servers with special formats such as 16 players, all-Snakes, or no-audience mode. No power and no role odds for sale.

## Why the bet is sound

- The reveal cinematic is a clip-worthy moment every four minutes, which is the distribution engine on TikTok and Shorts.
- The audience system means an eight-player episode always keeps eight people engaged.
- The persona deck and twist cards give live-ops a cheap way to change the game every week.

## Biggest risks to test early

- Whether tap-and-receipt voting produces enough real deduction for teens.
- Whether audience powers feel meaningful without unbalancing the vote.
- Whether four minutes is enough time for tension to build.

All three can be tested with a gray-box prototype before any art.

## Context

Based on the case study of *Among Us* clones on Roblox: *Impostor [Beta]* (peak 67k concurrent, now dozens), *Crewmates!* (833M visits, unavailable), *Impostor | Among Us* (261M visits, hundreds of players), and *Imposters & Roles* (250M visits, about 4k concurrent, survived by expanding into 60 roles, neutral factions, and ranked). The lasting reference is *Murder Mystery 2*: fast starts, tension every round, collection and trading outside the match, and simple mobile controls. The betrayal mechanic is evergreen; the literal *Among Us* reproduction is not. All IP must be original, per the [Innersloth fan creation policy](https://www.innersloth.com/fan-creation-policy/).
