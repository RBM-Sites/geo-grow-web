
Goal: fix the mobile scrolled header so the logo is never clipped and the hamburger icon is always visible.

1) What I found
- The issue is in `src/components/Layout.tsx` (`Header`).
- Logo clipping is caused by aggressive vertical offsets on the logo (`-mt-4` + large fixed height inside a fixed nav).
- Hamburger invisibility is caused by `text-white` on a fully transparent header while scrolling over light content sections.

2) Implementation plan
- Refactor mobile header positioning in `Header`:
  - Remove upward logo offset on mobile (no negative top margin).
  - Keep/boost only bottom overflow so the logo still hangs below the bar (as requested).
  - Keep logo large, but constrain with stable container sizing so it doesn’t clip at viewport top.
- Keep scroll behavior (transparent header on scroll), but improve icon legibility:
  - Keep white hamburger lines in scrolled state.
  - Add a subtle dark circular backing (`bg-brand-dark/50` + light ring/backdrop blur) so it remains visible over both dark and light backgrounds.
- Tighten mobile utility-strip behavior:
  - Make the top contact strip desktop-only (or hidden on mobile) so it doesn’t interfere with the fixed transparent nav geometry.
- Preserve existing behavior:
  - Sticky bottom click-to-call remains mobile-only and rounded button style.
  - Desktop nav/dropdowns unchanged.

3) Validation pass (mobile-first)
- Home page:
  - Top of page: full logo visible (no top clipping), hamburger visible.
  - Scrolled over hero and white sections: hamburger still visible.
  - Sticky call button appears only after scroll and stays rounded.
- Repeat same checks on representative inner pages:
  - one service category page
  - one service detail page
  - contact page
  - gallery page
- Desktop sanity check:
  - nav links/dropdowns unaffected, no layout regressions.

Technical details
- Primary file: `src/components/Layout.tsx`
- Likely class updates:
  - logo `<img>` sizing/margins (`h-*`, `-mt-*`, `-mb-*`)
  - mobile nav row spacing/height (`py-*`, possible `min-h-*`)
  - hamburger button styles in scrolled state (`text-*`, `bg-*`, `ring-*`, `backdrop-blur-*`)
  - top info strip visibility breakpoints (`hidden lg:block` pattern)
