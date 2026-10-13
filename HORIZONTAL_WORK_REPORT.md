# Pinned Selected Work interaction — local verification

Completed directly in `/Users/akshaywesley/Desktop/akshay-portfolio` on 7 October 2026.

## Implementation approach

Added a progressive native-scroll enhancement around the existing four flagship ProjectCards. Their content, typography, compositions, and product/technical visuals were not rewritten. A CSS sticky stage contains a flex track. A passive page-scroll listener schedules a single animation-frame update, using previously measured values to translate the track and update a restrained project counter/progress line.

There is one primary browser/page scroll. No wheel or touch event is cancelled. No drag interaction, snap, native horizontal scrollbar, separately scrollable project container, Lenis, GSAP, or new dependency was introduced. The viewport uses overflow: clip, not an overflow-x scrolling interaction.

## Pin start/end

The stage becomes sticky when its top reaches **88px** below the viewport top. Its height is `100svh - 104px`, leaving room for the fixed navigation and a small bottom margin.

The surrounding journey height equals the sticky stage height plus the measured journey duration. When that duration is complete, normal CSS sticky containment releases the stage. Wesley Flow's bottom content is exposed before release. The existing Other Projects section remains immediately after the flagship journey, followed by Experience; its content and document order were preserved.

Some existing case-study panels are taller than the available viewport. To preserve them without squeezing, clipping away information, or creating nested scrolling, normal page scroll first exposes each panel's full height, then moves the track to the next panel. The same deterministic mapping runs in reverse. No easing lag or aggressive snapping is applied.

## Horizontal distance and pacing

`horizontalDistance = track.scrollWidth - projectViewport.clientWidth`

Each panel's actual offsetLeft determines its horizontal position. Its vertical content overflow is `max(0, panel.offsetHeight - projectViewport.clientHeight)`. Reading intervals include that overflow plus short introductory/end holds, each capped at 140px of page scroll. Horizontal transitions use 1.15 times the measured distance between panels. Total page-scroll duration is calculated from those intervals, not a hardcoded multiple of viewport width.

At the tested 1440×1000 desktop viewport, the project viewport measured 1290px, the track 5290px, and horizontal travel 4000px. The measured page journey was approximately 6913px. Each panel occupies the full inner viewport, approximately 90vw; the inter-panel gap is 3vw.

ResizeObserver refreshes measurements when card/disclosure heights, viewport dimensions, or preceding Hero/About dimensions change. Window resize, breakpoint changes, motion-preference changes, and font readiness also refresh the mapping. Active reading/transition positions are retained where possible during resize. All observers, listeners, animation frames, and inline transforms are cleaned up on unmount.

## Breakpoint and fallbacks

- Horizontal mode: **width ≥ 1024px and height ≥ 600px**, without reduced-motion preference.
- Phones, smaller/portrait tablets, and short windows: the existing vertical stack.
- `prefers-reduced-motion: reduce`: the existing vertical stack, without pinning or track transforms.
- Before JavaScript initialization, or with JavaScript unavailable: ordinary vertical document flow.

The fallback is implemented in both the runtime configuration and a CSS media-query safety rule. No content is hidden from the DOM or reordered.

## Accessibility and anchors

DOM order stays Ringside → ExoPlanet → NIYAM → Wesley Flow. Links and native disclosure controls retain normal keyboard order. Focus entering a transformed off-screen panel maps page scroll to the appropriate project and vertical reading position so the focused control becomes visible. There is no focus trap and no forced focus during ordinary scrolling.

Existing project anchors, including Recognition's ExoPlanet link and direct project hashes, map into the measured journey. Ordinary section anchors retain native browser behavior. Progress text is not an aria-live announcement on every scroll frame.

## Files changed

Added:

- `src/components/sections/HorizontalWork.tsx`
- `src/lib/workScroll.ts`
- `src/app/horizontal-work.css`

Modified:

- `src/components/sections/SelectedWork.tsx` — wraps only the featured projects.
- `src/app/layout.tsx` — imports the new scoped interaction stylesheet.

`ProjectCard.tsx`, `ProjectVisuals.tsx`, factual constants, all other section components, prior project-design styles, package.json, and package-lock.json were not changed in this task. The report and preview image are additional local review artifacts.

## Required checks

| Check | Result |
| --- | --- |
| npm run type-check | PASS, exit 0 |
| npm run lint | PASS, no warnings or errors |
| npm run build | PASS, compilation and static generation succeeded |
| out/index.html | EXISTS |
| Scroll mapping checks | PASS: measured travel, bounds, tall-panel coverage, monotonic forward/reverse progress, resized endpoints |

The final build reports 222 kB for the home route and 309 kB first-load JavaScript. No packages were installed or restored.

## Browser QA

- **Entry and pin:** Work enters from normal document flow; the stage top remained 88px throughout the active horizontal journey.
- **Forward sequence:** native Page Down input produced 01 → 02 → 03 → 04, then a negative stage-top value as the pin released.
- **Reverse sequence:** native Page Up input produced 04 → 03 → 02 → 01; the stage then moved downward into normal flow toward About.
- **Full content:** measured per-panel vertical reveal exposes tall ExoPlanet/Wesley Flow content and final links. On release, Wesley Flow's bottom aligned with the moving viewport bottom within subpixel rounding.
- **Wheel-style input:** native scrolling in the installed Brave browser moved the pinned track and advanced the visible counter from 01 to 02.
- **Fast traversal:** Home and End reached the page top/footer without trapping or erroneous track state.
- **Keyboard:** links in all four panels were reachable and visibly inside the project viewport. Enter expanded ExoPlanet's technology disclosure, and measurements updated. The project viewport's scrollLeft remained 0.
- **Large tablet / resize:** 1024×768 retained horizontal mode and recalculated dimensions while preserving the current Wesley Flow panel.
- **Smaller tablet:** 768×1024 rendered vertically.
- **Phone:** 390×844 rendered vertically with no sticky positioning or track transform. All four project x coordinates matched and their y positions followed document order.
- **Reduced motion:** browser DevTools emulated prefers-reduced-motion: reduce at 1460px width. Live inspection confirmed reduced=true, horizontal=false, pin=static, track=none, and all four DOM project IDs in the correct order. Temporary emulation and browser test settings were restored afterward.
- **Horizontal overflow:** document width stayed within viewport width at 1440px, 1024px, 768px, and 390px. The clipped project viewport has no native horizontal scrollbar.
- **Console:** no errors or warnings were captured in the in-app browser during desktop traversal, resize, focus, and fast-scroll checks. Brave emitted a normal Three.js context-disposal info message when its existing Hero canvas switched to the reduced-motion fallback; no project scene was involved.

Physical trackpad gestures and real tablet touch/orientation changes were not tested on hardware. Wheel-style input, keyboard input, responsive viewport changes, and browser media emulation were tested. No broad cross-browser/device certification or performance benchmark is claimed.

## Explicit confirmations

**The old project 3D scenes were NOT restored.** There are no RingsideScene3D, ExoplanetScene3D, NiyamScene3D, or WesleyFlowScene3D files in src, and no project Canvas instances were added. Lenis remains removed.

**NOTHING WAS DEPLOYED OR PUBLISHED.** No firebase deploy, production deployment, hosting update, or publishing command was run. All changes, verification, build output, and previews remain local.
