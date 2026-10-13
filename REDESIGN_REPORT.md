# Local portfolio redesign report

Completed 7 October 2026 in `/Users/akshaywesley/Desktop/akshay-portfolio`.

## 1. What was removed

Removed the four project-specific WebGL scenes, their dynamic imports, scroll-driven scene progress, stage controls, and obsolete narration state. Removed Lenis and its ScrollTrigger synchronization so wheel and touch scrolling follow native browser behavior. No horizontal project track, carousel, pinned sequence, or wheel-to-horizontal conversion remains.

## 2. Selected Work redesign

Four numbered vertical editorial chapters now lead into smaller Only Cards and BlockchainHub presentations. Large titles, project statements, readable descriptions, selected capabilities, primary technologies, expandable secondary toolsets, and existing GitHub/case-study links carry the hierarchy. All project information and visual explanations are ordinary HTML or SVG and available without WebGL or scroll-triggered reveals.

## 3. Flagship presentations

- **Ringside:** editorial copy on the left and a negotiation workspace concept on the right. An illustrative transcript, sentiment/keyword analysis, guidance panel, and Voice → Transcription → Analysis → Guidance pipeline focus on the actual capabilities. Example dialogue and analysis are explicitly illustrative; no metrics were added.
- **ExoPlanet AI Observatory:** a broad scientific figure with a deterministic illustrative transit light curve. Kepler / TESS, RF Ensemble, detection, and characterization provide technical context. Verified 150,000+ records, 94.8% precision, and Best Use of Science — NASA Space Apps Challenge 2025 remain prominent. The figure is labeled illustrative and does not represent measured observations.
- **NIYAM:** a muted green document architecture on the left, with explanation and capabilities on the right. The six-stage vertical pipeline covers Government document → OCR → Structured extraction → Semantic search / RAG → Knowledge graph → Policy intelligence. “Targeting 550+ central schemes” remains a target, not an achieved scale claim.
- **Wesley Flow:** a centered macOS window/HUD concept, an illustrative voice command, and native speech → local inference → macOS automation routing. Primary Swift, SwiftUI, Apple Foundation Models, and Ollama appear upfront; the full verified toolset remains expandable. The concept is explicitly labeled, not presented as an actual screenshot.

## 4. Animation reductions

Projects have no animation or scroll-driven React updates. Hero idle rotation and its travelling signal were removed. The Hero now uses demand rendering: pointer input gently tilts the assembly, renders settle, and no perpetual render loop remains. Reduced-motion mode uses its static HTML fallback. The headline uses a brief 350ms reveal with no blur. Hover feedback and deliberate Technology/Lab selection remain. The existing Experience and Recognition sections are static and readable.

## 5. Components removed

- `RingsideScene3D.tsx`
- `ExoplanetScene3D.tsx`
- `NiyamScene3D.tsx`
- `WesleyFlowScene3D.tsx`
- `LenisProvider.tsx`

Also removed unused Orbit, clampProgress, and SceneProps helpers from ScenePrimitives, obsolete project narration styles, and legacy canvas container styles. SceneStage, ComputationalCore, and Trace remain for the Hero.

## 6. Components added

`ProjectVisuals.tsx` adds ProjectVisual and the focused RingsidePreview, ObservatoryPreview, NiyamPreview, FlowPreview, and SignalPath presentation helpers. `editorial.css` provides the responsive project design system. ProjectCard was rewritten as a server-rendered editorial presentation without client state or effects.

## 7. Performance improvements

Removed direct dependencies `gsap`, `lenis`, `@react-three/rapier`, and `@react-three/drei`; npm removed 48 installed packages in total. Removed obsolete package optimization references. Projects mount zero Canvas instances and have no scene loops, ScrollTriggers, or scroll-progress state updates. Hero renders on demand and preserves context cleanup/fallback handling. Three.js and React Three Fiber remain because the Hero still uses them.

The final build reports 220 kB for the home route and 307 kB first-load JavaScript. These are final bundle values, not before/after measurements. No Lighthouse, frame-rate, or memory benchmark was performed.

## 8. Desktop, tablet, and mobile improvements

Desktop compositions differ by project; tablet collapses Ringside into a stacked presentation; mobile stacks all project content naturally. NIYAM becomes a readable vertical architecture; Ringside’s transcript/intelligence panels stack; Wesley Flow’s action pipeline uses compact rows. Scientific chart labels enlarge on mobile. Project titles wrap, diagrams fit the available width, and there are no desktop-only controls needed to understand the work.

Browser layout checks passed at 1440×1000, 768×1024, 390×844, and 320×740. Both document width and descendant bounding-box checks showed no horizontal overflow. Visual inspection covered desktop, tablet, and mobile. Every flagship project was visible in vertical order; none contained a Canvas. Native forward and reverse scrolling changed the page position normally.

## 9. Accessibility improvements

Project articles now have explicit heading associations. Pipelines use ordered lists, figures have explanatory captions, and the light curve has an accessible description. Static HTML replaces canvas-only project explanations. Disclosure controls use native details/summary and retain visible focus styles and 44px targets. Keyboard Enter expanded the Ringside toolset and mobile menu; Escape closed the menu and returned focus to its toggle. Internal anchor targets all exist, and Work/Recognition/ExoPlanet navigation was exercised. Technology and Lab selection were tested on mobile.

Reduced-motion CSS and the React static Hero fallback were inspected. An end-to-end operating-system reduced-motion toggle was not tested because the available browser interface lacks media-preference emulation.

## 10. Type-check result

`npm run type-check`: PASS, exit 0, after the final refinements.

## 11. Lint result

`npm run lint`: PASS, exit 0, no ESLint warnings or errors. An initial sandbox-limited run could not write its cache; the authorized rerun passed.

## 12. Production build result

`npm run build`: PASS, exit 0. Compilation, bundled lint/type validation, static page generation, optimization, and build tracing completed.

## 13. Static export result

Next.js `output: 'export'` is preserved. Static export passed and `out/index.html` exists. The final export was served only on `http://127.0.0.1:4173`. Browser console inspection found no warnings or errors after reloading the final export.

## 14. Remaining limitations

- Reduced-motion behavior was verified in implementation, but not through a live operating-system preference switch.
- The preview interfaces and light curve are illustrative, not actual product captures or research observations.
- External GitHub and case-study URLs were preserved; their remote availability was not tested.
- Performance gains described above are structural; no before/after benchmark was performed.
- The package operation reported 12 audit findings (2 moderate, 9 high, 1 critical). Dependency security upgrades were outside this UI redesign and were not performed.
- Browser QA used the available Chromium-based in-app browser, not real iOS/Android devices or a full cross-browser matrix. Rote’s configured Chrome runner was unavailable, so the in-app browser was used for verification.

Factual source integrity was verified by comparing SHA-256 hashes with the pre-edit backup: constants.ts, About.tsx, Experience.tsx, and Achievements.tsx are unchanged. No new metrics, awards, employment achievements, or project technology claims were introduced. No Global Winner or CNN + Transformer claim was added.

## 15. Deployment confirmation

**NOTHING WAS DEPLOYED OR PUBLISHED.** No `firebase deploy`, production push, hosting update, or publication command was run. All source changes, builds, exports, and previews remain local.
