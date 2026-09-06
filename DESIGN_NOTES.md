# Portfolio design and motion

The selected direction uses charcoal surfaces, mint lighting, large typography, an illustrated portrait, and distinct section layouts. The user's requested glow, particles, and section-specific animations are core features.

## Public references reviewed

- [Mike Bennet](https://www.framer.com/marketplace/templates/mike-bennet/) and its [live preview](https://mikebennet.framer.website/): large type, clear hierarchy, generous project presentation, and direct contact paths. Applied those structural ideas to the portfolio's own content.
- [Orbit](https://www.framer.com/marketplace/templates/orbit/) and its [live preview](https://orbit-template.framer.website/): atmospheric presentation with separate benefit, process, and case-study sections. The portfolio uses native CSS orbit forms and light fields with original layouts.

These are public design references, not a claim that most people prefer them. No template code, invented client testimonials, or template business metrics were copied. Game-world portfolio design was explicitly rejected by the user and is not a reference for this implementation.

## Motion by section

| Area | Motion |
| --- | --- |
| Background | Drifting, twinkling particles; nearby connections; cursor repulsion and light; slowly moving glow fields |
| Hero | Staggered text entrance, rotating orbital rings, floating technology marks |
| About | Perspective card unfolding; layered interface illustration, moving API connections, rotating AI symbol |
| Experience | Cards slide along a glowing timeline |
| Projects | Scale/depth entrances; perspective previews on hover; AI pulse, export flow, music equalizer |
| Stack | Side-opening panel; staggered icon tiles when changing category; cursor-following card glow |
| Education | Staggered horizontal wipe entrances |
| Quotes | Focus reveal, slide transitions, slow image zoom on hover |
| Contact | Expanding light rings and a scale entrance with a glow bloom |

Motion respects the operating system's reduced-motion preference and the header's pause control. Canvas rendering is capped at 30fps, uses fewer particles on touch devices, and stops while the tab is hidden. Content stays visible without JavaScript; a static stack fallback exposes every category.

## Icon fixes

The old `.capability-list span` selector applied chip padding and borders to nested icon wrappers, shrinking the available image area. It now targets direct children only. The previous six-group/eight-item slices also omitted tools entirely; the explorer exposes every group and item. Brand icons are local assets, black-only variants have colored replacements or a light backing surface, and experience entries now include local company marks. Source attribution is in `public/ASSET_SOURCES.md`.
