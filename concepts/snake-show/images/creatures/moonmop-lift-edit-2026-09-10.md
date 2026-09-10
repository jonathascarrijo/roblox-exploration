# Moonmop Lift key-art edit

10 September 2026 · Built-in image generation tool · Character selected; challenge name proposed

## Decision and scope

The user selected Moonmop from the three baby-creature proposals and requested an update to the existing Prize Lift image. The chosen creature is the purple, floppy-eared design in [03-moonmop.png](03-moonmop.png). **Moonmop Lift** is a proposed rebrand previewed in the artwork, not an adopted rename across the rules or prototypes.

The updated image replaces the golden prize with Moonmop in a clear transport pod, replaces water with theatrical lava in accordance with [user-notes.txt](../../../../user-notes.txt), and retains the villa, two operators, two winch motors, and two suspension cables. The open tray and **Pull** label follow the current design brief. The illustration is concept art rather than a gameplay screenshot or validation of the mechanics. No game code was changed.

## Files and review

- [Updated key art](<../../archive/artwork/moonmop-lift-villa-2026-09-10.png>) — saved at the user's requested existing path, 1672 × 941 pixels.
- [Preserved original artwork](prize-lift-before-moonmop.png) — the first edit's scene reference.
- [Moonmop identity reference](03-moonmop.png) — the first edit's character reference.

The first pass retained duplicate suspension cables from the original art. A focused second pass removed the extra pair. Visual review confirmed two foreground motors and two cables, the recognizable Moonmop design in its intact pod, the lava treatment, and readable **MOONMOP LIFT**, **SNAKE SHOW**, **00:18**, **PULL**, and **SAME PLAYERS / BIGGER DRAMA** text. The saved replacement was checked byte-for-byte against the generated output and retains the original dimensions.

## First edit prompt

```text
Use case: precise-object-edit.
Asset type: updated illustrated key art for a cooperative game challenge, with a proposed title rebrand.
Input image 1 is the EDIT TARGET: the supplied wide Prize Lift illustration of a studio-villa challenge, two players at consoles operating a tilted suspended tray over a pool.
Input image 2 is the CHARACTER IDENTITY REFERENCE ONLY: Moonmop, the chosen purple baby creature, shown large and in a clear round transport pod.

Edit image 1 in place conceptually, preserving its wide landscape composition, camera perspective, polished stylized 3D rendering, daylight luxury-villa TV set, palm trees, studio lights and cameras, the female contestant in a coral jacket at the left console, the male contestant in a purple jacket at the right console, their worried engaged expressions, and the exactly TWO overhead motors and TWO suspension cables connected to the two ends of the same tilted tray. Keep the background SNAKE SHOW sign and upper-right 00:18 timer readable.

Make these coordinated changes:
1. Replace the central golden crown prize capsule and the large rectangular transparent enclosure around it with ONE clear spherical transport pod containing Moonmop. Keep the existing suspended tray structure underneath but make it an OPEN tray without enclosing walls, matching the lift mechanic. The round pod sits freely aboard the tilted tray, shifted slightly toward the low right end, visibly at risk of rolling off. It must physically rest on the tray, not float, be strapped down, or be connected to a third cable.
2. Moonmop must closely match image 2: round lilac plush body, pale cream oval face and belly, enormous broad floppy ears hanging sideways, violet eyes, small lavender paws, short rounded feet, a single curled forehead tuft, and a thick broad paddle tail with a soft lavender glow. Preserve the character's sweet infant proportions. Fold the floppy ears naturally within the pod, do not crop or remove them. Show Moonmop facing the viewer with wide worried eyes, slightly raised inner brows and both tiny front paws against the clear glass, looking for help. Vulnerable and endearing, no tears or exaggerated horror. The pod has the same rounded teal base and small coral latch as the reference. The creature must remain highly visible through minimally reflective clear glass and take up most of the pod.
3. Replace the turquoise pool and visible water cascades in image 1 with theatrical glowing orange lava and small stylized lava flows in the SAME basin geometry, creating urgency with warm reflected light. Preserve the sunlit festive villa atmosphere rather than making a dark volcanic dungeon. Lava stays below the suspended tray; the creature and contestants are unharmed. The pod is closed and intact. No smoke obscuring the character.
4. Replace the upper-left PRIZE LIFT logo with a similarly polished readable two-line logo: exact text "MOONMOP" on the first line and "LIFT" on the second. Use lavender and pearl-white dimensional letters with dark violet outline and a simple rounded floppy-ear motif instead of the small crown above this local challenge logo. Keep its footprint compact enough to preserve scene readability. This is a proposed challenge brand; leave the separate SNAKE SHOW villa sign unchanged.
5. Replace the obsolete bottom-right STABILIZE interface text with the exact text "PULL" in the existing orange action button. Keep the timer at "00:18".
6. In the distant other challenge stations, replace any clearly visible golden cargo with small matching Moonmop pods, consistent with the selected living prize. Keep background players and station positions. Change the distant right-hand promotional sign text to "SAME PLAYERS" above "BIGGER DRAMA", preserving its placement.

The central Moonmop pod is the emotional focal point. Maintain detailed, readable machinery and credible gravity; do not redesign the activity into carrying, flying, combat or a third-player lift. No added captions, extra UI, extra foreground characters, extra paws or ears, injury, or watermarks. Output one complete edited landscape image at the target's aspect ratio.
```

## Final correction prompt

The edit target for this pass was the first generated result.

```text
Use case: precise-object-edit.
Edit this Moonmop Lift key-art image with ONE technical correction only: the foreground suspended tray must have exactly TWO suspension cables total, one from each of its TWO overhead winch drums to its corresponding tray end. It currently depicts duplicate front/back cable runs at each end.

KEEP the prominent diagonal cable from the RIGHT EDGE of the LEFT winch drum to the near/front bracket at the LEFT end of the tray (approximately x=645 at top to x=679 at tray on the 1672-wide reference).
KEEP the prominent diagonal cable from the RIGHT EDGE of the RIGHT winch drum to the far RIGHT end of the tray (approximately x=1060 at top to x=1119 at tray).
REMOVE the additional nearly vertical cable behind the left one, approximately x=550 from the underside of the gantry down to the leftmost tray bracket, restoring the villa background behind it. REMOVE its extra hanging amber beacon partway down the now-removed cable.
REMOVE the additional cable behind the pod from the LEFT EDGE of the RIGHT drum (approximately x=995 descending toward x=950), restoring the villa background. Each winch powers just its ONE retained cable. Keep the tray rigid and both retained cables taut.
Coordinates identify the intended objects, not new drawn marks. Keep every OTHER visible cable of distant background stations untouched.

Preserve EVERYTHING ELSE: the exact existing Moonmop creature identity, pose, worried expression, lavender floppy ears and paws against glass; the clear spherical teal-base pod; the tray angle and pod position; the two contestants and their consoles; the lava, villa, sunlight, cameras, background stations; the MOONMOP LIFT title, SNAKE SHOW sign, 00:18 timer, PULL button and SAME PLAYERS BIGGER DRAMA sign. Do not crop, recolor, change the lettering, add objects, or redesign the illustration. Return the same complete landscape composition.
```
