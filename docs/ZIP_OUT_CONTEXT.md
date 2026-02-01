# ZIP OUT CONTEXT — TMS STEM Launchpad

This ZIP is the **current working site** plus a **directive for the next chat**.

## Locked: do NOT regress these
- **Gimkit scrollers and Overview scrollers must remain working** (no missing/blank Overview, no broken scrollers).
- **Ask Geppetto uses the graphic image button** (sparkly blue PNG), not a text-styled button.
- **Ask Geppetto is its own entity**: it stays **outside** the Gimkit card, inside its **own small card** with the same subtle border/rounding/shadow style as other cards.

## The unresolved layout problem (the reason for the next chat)
The top section should look like the intended mockups:
- The **Overview card** (left) should be the **predominantly wide card**.
- The **Gimkit card** (right) should not expand wider than intended.
- The **bottom edge of the Overview card** and the **bottom edge of the Ask Geppetto card** must align horizontally.
- On some deploys/loads, there is wasted empty space in the right column (between Gimkit and Ask Geppetto), and/or the widths briefly look correct while loading and then “snap” into an incorrect wider layout.

## EXACT directive for the next chat
User request (verbatim intent):

> We could tell the Overview scroller to adjust so that it may expand to whatever the required size is in order to force the scroller to the bottom of the Language & Website Design card.

Implement this idea in a clean, deterministic way:
1. **Force bottom alignment** between the left Overview card and the right (Gimkit + Ask Geppetto stack) **without breaking scrollers**.
2. Prefer a solution where the **Overview scroller area** (inside the left card) can **grow/flex** so the scroller sits at the **bottom** of the card (instead of leaving dead space below it).
3. Keep the **Overview card predominantly wide**. If widths need rebalancing, the Gimkit column must not “take over” width.
4. Reduce wasted empty space in the right column: tighten vertical spacing so the stack feels intentional.

## Practical guidance / constraints
- The site is deployed as a **single ZIP** (always full-site ZIP for redeploy).
- Do not rename files or restructure directories unless explicitly requested.
- If a change touches CSS/JS shared across pages, verify it on at least:
  - project-03 (Music Production)
  - project-04 (Language & Website Design)
  - project-02 (Photography)
  - project-09 (Flight, Rockets, & Projectiles)

