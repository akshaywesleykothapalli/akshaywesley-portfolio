# Screenshot fitting and BlurText — 10 October 2026

Updated the existing Desktop portfolio directly.

Fetched https://reactbits.dev/r/BlurText-TS-CSS.json. The untouched response is stored in src/components/text/BlurText.registry.json. Installed its listed dependency, motion@^12.23.12, through npm. The registry supplies only TypeScript; local plain CSS preserves the portfolio's heading layout.

BlurText.tsx uses the registry implementation with small additions: p/span semantics, visible server rendering before enhancement, and an immediate readable reduced-motion state. Main headings, project titles, and introductions use delay=150, animateBy=words, direction=top. The original callback and customization props remain available.

Screenshots use their actual file dimensions and native aspect ratios. JPEG captures now use matching .jpg asset paths. Explicit dimensions reserve layout space while images load. Desktop gallery frames cap their size to fit available height, and stale heading padding has been removed. Perspective is subtler to keep screenshots readable. The image dialog provides fit-to-window and a scrollable 100% view.

The existing overall dark theme, glass navigation, and native scrolling remain in place. No deployment.

Validation: final production build includes lint and type checking. Browser review covers desktop and mobile, image proportions for all four projects, image viewer sizing and Escape dismissal, resolved BlurText, project deep links, and console errors. Reduced-motion and no-JavaScript fallbacks were inspected in source; no OS preference emulation was used.

Reuse triage: no new reusable automation saved. This change is a repository-specific layout and animation integration; the library already publishes its reusable registry installation contract.
