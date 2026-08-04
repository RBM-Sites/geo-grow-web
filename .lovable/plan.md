# Google Reviews on the Home Page

Replace the hardcoded testimonial block on the home page with a live Google Reviews widget that pulls real reviews from the existing public endpoint (verified live: "Right On Plumbing LLC", 4.9 rating, 19 reviews).

## New component: `src/components/GoogleReviews.jsx`

Self-contained, inline-styled (no Tailwind), props: `placeId`, `apiBase`, `layout`, `theme`, `accent`, `minRating`, `maxReviews`.

Behavior:
- On mount, fetch `${apiBase}?place_id=${placeId}` — no headers, no key, no Supabase client.
- Reads `result.rating`, `result.user_ratings_total`, `result.reviews`.
- Filters reviews below `minRating` (4), caps at `maxReviews` (5).
- Shows centered "Loading reviews..." while fetching; renders nothing on failure or empty result.

Rendering:
- Header row: large bold rating number, five stars filled up to `Math.round(rating)`, then "(19 reviews)".
- Horizontally scrolling row of cards, min 280px wide, 16px gaps — scrolls sideways on mobile, sits in a row on wide screens.
- Each card: 36px circular avatar with initials in white on accent, reviewer name in medium weight, relative time in muted gray beneath, that review's star row, then review text at 14px / 1.5 line height in muted gray.
- Centered "Powered by Google Reviews" in small muted text at the bottom.

Styling values: accent `#02365A`, section bg `#f9fafb`, card bg white, border `1px solid #e5e7eb`, radius 8px, padding 16px, primary text `#1f2937`, muted `#6b7280`, unfilled star `#d1d5db`. Stars are 16px five-pointed SVGs.

## Home page change (`src/pages/Index.tsx`)

- Remove the existing hardcoded "What Our Customers Say" section (the three fake testimonials).
- Add a new section directly below the hero/trust bar using the site's `section-padding` and `container-custom` classes, with a centered `<h2>` reading "What Our Customers Say" above the widget.
- Keep the "Read All Customer Reviews →" link to `/reviews` under the widget.
- Mount with the exact props given: placeId `ChIJPfLBoqXryIARmjA2Wqe32RY`, apiBase the reviews-proxy URL, layout `carousel`, theme `light`, accent `#02365A`, minRating 4, maxReviews 5.

## Not doing

No Supabase integration, edge function, table, secret, or env var. No API key. No reviews library, no placeholder data.
