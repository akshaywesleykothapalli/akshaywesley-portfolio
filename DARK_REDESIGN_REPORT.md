# Dark portfolio redesign — 8 October 2026

Updated the existing Desktop project directly. No deployment or publishing.

- Graphite background, white bold Space Grotesk headings, restrained lime accent, small monospace labels.
- Persistent glass navigation: Menu on the hero, then About, Work, Experience, Lab, or Contact according to scroll position. Keyboard Escape and outside click close the menu.
- Hero previews switch among four real project interfaces. Screens have perspective, pointer tilt, scroll rotation, layered frames, and a gentle floating animation. Idle motion pauses outside the viewport and when the document is hidden. Touch devices use small scroll rotations without pointer tracking. Reduced-motion preferences remove spatial animation and use vertical project flow.
- Native full-size screenshot dialogs support Escape, focus restoration, and scroll restoration.
- Short project descriptions, three source-backed technologies, and verified local Git remotes. Removed synthetic project charts, detailed claims, performance figures, award section, extra project list, and large technology visualization from the rendered page.
- Existing experience titles, organizations, dates, and contact email retained; these were not independently verified. No seniority or new achievement claims added.

## Screenshot provenance

- Ringside: captured local built frontend from Desktop/Ringside/public. No live call or negotiation was started.
- ExoPlanet: captured Analyze Data page from Downloads/ExoplanetDetector, using its existing Python environment. No prediction was submitted.
- NIYAM: captured local frontend from Desktop/Government-Intelligence-Platform. No login or policy submission.
- WesleyFlow: existing clean application screenshot Desktop/WesleyFlow/wesleyflow_smart_formatting_verified.png.

Public screenshot assets are in public/projects/. Project code and source links are in src/lib/projectPresentation.ts. Private desktop screenshots, resume placeholders, and unrelated files were not copied into the website.

## Validation

- Type check and lint passed. Final production build passed (125 kB first-load JavaScript).
- Browser checked at 390×844, 768×1024, 1024×768, and 1440×1000; no document horizontal overflow.
- Verified changing navigation labels (Menu, About, Work, Lab), menu keyboard closing/focus, hero project selection, image dialog open/Escape/close, restored body scrolling, native gallery progression, project deep link, pointer-driven rotation, and Lab selection.
- Final browser console check: no errors or warnings.
- Reduced-motion behavior implemented and inspected in source; OS preference emulation was not performed in this pass.
- Review screenshots are in redesign-review/dark-*.png. The local preview remains on port 4173.
