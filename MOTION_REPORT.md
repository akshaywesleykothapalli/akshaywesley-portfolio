# Portfolio motion pass

Completed locally in `/Users/akshaywesley/Desktop/akshay-portfolio` on 7 October 2026. Nothing was deployed or published.

1. **Package:** installed and pinned `framer-motion@14.0.0`; compatible with the project's React 18 dependency. Package lock updated.
2. **Shared system:** `MotionProvider`, `Reveal`, `InteractiveLink`, `MicroButton`, `TransitionContent`, `MotionCurve`, and `ParallaxDecoration`. `LazyMotion` loads DOM animation features separately. Timing tiers: 180ms interaction, 280ms UI transition, 580ms content reveal, 780ms recognition emphasis. Shared ease-out `[.22, 1, .36, 1]`.
3. **Hero:** immediate readable identity, three restrained line reveals with 60ms stagger, supporting copy fade/rise and consistent CTA feedback. Removed competing legacy CSS entrance animation. Existing computational assembly preserved.
4. **About:** editorial line sequence, supporting copy reveal and subtle metric-group scale/fade. No number counting or factual changes.
5. **Selected Work:** scroll planner and mapping unchanged. Project headings, descriptions, toolsets and links reveal once; visuals enter at .985 scale. Existing article/track transforms remain exclusively owned by native horizontal scrolling. Active-state attributes update only when the active project changes; neighboring visuals remain at .86 opacity.
6. **Ringside:** transcript paragraphs stagger; guidance follows with a quiet fade. Product concept and existing sentiment information preserved.
7. **ExoPlanet:** scientific curve draws once; record, precision and NASA evidence fade in. Full curve is restored immediately when reduced motion is enabled. No planetary scene.
8. **NIYAM:** six architecture nodes reveal in order, with 45ms spacing capped by shared delay limits. No repeating pipeline animation.
9. **Wesley Flow:** HUD receives a small scale/rise entrance; understand/reason/act stages and signal path follow sequentially. No spring bounce.
10. **Experience:** section heading, periods, roles, descriptions and technologies reveal progressively. Existing details and content retained.
11. **NASA recognition:** metadata, stronger 780ms headline reveal, project identity and evidence form a clear hierarchy. Decorative orbit alone receives up to 8px of parallax in each direction.
12. **Technology:** category/relationship buttons use shared interaction feedback; selected detail uses presence transition. Hover/focus emphasizes the hovered node and dims unrelated nodes slightly. Absolute node centering stays on its existing CSS transform.
13. **Lab:** shared button hover/tap feedback and `AnimatePresence` detail transitions. Controls stay mounted outside the transition so keyboard focus survives selections. Existing statuses and research questions retained.
14. **Contact:** two restrained headline-line reveals, followed by contact methods and shared link feedback. Original wording retained.
15. **Mobile:** 8px travel, 400ms reveals, at most 60ms reveal delay, shorter UI transitions, no hover scaling or decorative parallax. Pointerless devices receive the same compact treatment. Mobile/tablet vertical project layout preserved.
16. **Reduced motion:** `useReducedMotion`, `MotionConfig`, preference context and CSS safeguards remove transforms, reveal delays, parallax and progress animation. Presence updates become immediate. The original vertical Selected Work fallback remains. Content is fully visible.
17. **Performance:** transform/opacity dominate; no blur, large shadows, width/height animation, looping timelines or React state updates per animation frame added. Scroll progress/parallax use MotionValues. Most reveals run once. Server markup and first hydration render are visible (`initial={false}`), even before features load. First-load JS reported by Next rose from 309kB to 335kB; no formal device performance profile performed.
18. **Added files:** `src/components/motion/MotionSystem.tsx`, `src/components/motion/features.ts`, `src/app/motion.css`; this report and two review screenshots.
19. **Modified files:** `package.json`, `package-lock.json`; `src/app/layout.tsx`, `src/app/page.tsx`; `src/components/layout/Navigation.tsx`; sections `Hero.tsx`, `About.tsx`, `ProjectCard.tsx`, `ProjectVisuals.tsx`, `HorizontalWork.tsx`, `Experience.tsx`, `Achievements.tsx`, `TechnologyPlayground.tsx`, `TechnologyConstellation.tsx`, `LabSection.tsx`, `Contact.tsx`. Production `out/` and build artifacts regenerated. `src/lib/constants.ts` and `src/lib/workScroll.ts` compare unchanged against the pre-pass backup.
20. **Type-check:** `npm run type-check` passed on final source.
21. **Lint:** `npm run lint` passed without warnings/errors.
22. **Build:** `npm run build` passed; static export produced; `out/index.html` exists and is nonempty. Home route 248kB, first-load JS 335kB.
23. **Browser QA:** local production export at `http://127.0.0.1:4173`. Initial desktop load and visible Hero verified. Forward PageDown crossed 01 → 02 → 03 → 04, pin stayed at 88px and released afterward. Reverse PageUp returned 04 → 03 → 02 → 01 and then About. Small ArrowDown increments, fast Home/End, Work/About/Recognition/Tools/Lab/Contact anchors, NASA → ExoPlanet deep link, expanded project details, project-link Tab continuity and clear keyboard focus verified. Technology Native → SwiftUI selection and Lab mouse/Enter selections updated correctly. Hovered Lab button reached `scale(1.015)`. Resize tested at 1440×1000, 1024×768, 768×1024 and 390×844. Wide modes remained horizontal, narrow modes vertical; browser width never overflowed. Mobile menu opened and closed on navigation. Desktop decorative parallax measured 2.89px in the recognition section; mobile was none. Brave reduced-motion emulation at 1460×837 confirmed `reduced:true`, `horizontal:false`, track transform none, static pin, no parallax, hidden progress and zero hidden motion elements. Emulation and temporary browser settings restored. Final local preview logs contained no warnings/errors or hydration errors.
24. **Limitations:** responsive viewport testing does not substitute for physical touch/trackpad or Safari/Firefox testing. No full performance trace or screen-reader session performed. Reduced motion was tested as a live preference change; an independent cold load with that preference was not separately tested. Existing package audit still reports 12 findings (2 moderate, 9 high, 1 critical); unrelated dependency upgrades were outside this motion pass. Hero renderer disposal emitted the informational Three.js context-lost message during reduced-motion switching; no console error/warning was produced.
25. **Deployment:** NOTHING was deployed. No Firebase deployment, publishing or remote hosting changes were performed.

## Review images

- `redesign-review/motion-hero-desktop.png`
- `redesign-review/motion-work-desktop.png`

These are static views of the finished layout; the local preview demonstrates the animations.
