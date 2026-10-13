# Editorial theme and kinetic hero

Completed locally on 8 October 2026.

- Replaced blue-on-black styling with ivory paper, charcoal ink and burnt orange. A shared token palette now covers the navigation, project studies, NASA recognition, Technology, Lab and Contact.
- Replaced geometric headline styling with Georgia serif headings, an italic name accent, and neutral Helvetica/Arial body typography. Small technical annotations retain their established formatting where useful.
- Replaced the Hero's WebGL assembly with an authored SVG and project-card composition: rotating sculptural flower, gentle floating cards, and spring-smoothed pointer tilt. Cards link to the actual Ringside and ExoPlanet sections and stop floating during hover/focus. No new claims, packages, or generated images.
- Added a keyboard-accessible pause/resume control. Motion pauses offscreen, when the document is hidden, on compact/pointerless devices, and for reduced-motion preferences. The mobile version is a still composition with the existing restrained entrance reveals.
- Preserved factual project constants, all four project presentations, native horizontal-scroll mapping and vertical fallbacks. Compared constants and scroll planner against the pre-pass backup; unchanged.

## Files

Added `src/app/theme.css`, `src/components/sections/HeroStudio.tsx`.
Modified `src/app/layout.tsx` and `src/components/sections/Hero.tsx`.
Regenerated production output and saved review screenshots in `redesign-review/`.

## Validation

- Type-check passed.
- Lint passed with no warnings/errors.
- Final production build passed, including its lint/type checks. Nonempty `out/index.html` verified.
- Next reports 37.5kB for the home route and 125kB first-load JS, down from 338kB first-load JS before replacing the Hero's WebGL imports.
- Desktop 1440×1000: verified palette and typography, active flower rotation over successive observations, mouse pause and keyboard resume, pointer tilt and return, and pause offscreen.
- Project scroll sequence 01 → 02 → 03 → 04 retained an 88px pin then released into vertical flow. New hero cards and existing curated links use the existing project-anchor behavior.
- Technology Native/SwiftUI selection and Lab keyboard selection passed with the new visual states.
- Mobile 390×844: no browser overflow; vertical projects, still hero, visible content. Tablet 768×1024: no overflow. Checked inherited light text throughout the page and corrected leftover metadata contrast.
- No warnings/errors observed in the in-app preview console.
- Current HTTP responses on both localhost:3000 and 127.0.0.1:4173 contain the updated Hero. An already-open port 3000 page was still showing the older rendered view and needs refresh.

## Limits

Physical touch/trackpad, Safari/Firefox and a formal performance trace were not tested. Reduced-motion support was implemented through the existing preference hook plus explicit CSS and runtime guards; native-browser preference emulation for this new visual was interrupted by user activity and was not completed. The existing reduced-motion horizontal fallback was unchanged and verified in the preceding motion pass.

Nothing was deployed or published.
