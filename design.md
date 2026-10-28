# Viettage — Design

Premium Vietnamese pantry showcase; web prototype only. User reference: warm minimalism inspired by nutandmore.vn (DNS unavailable), attached noodle packaging for identity only. Citifoods confirms premium spice positioning.

## Identity
Forest #193C30, ivory #F7F4EC, earth #785442, golden cream #D4B579, chili #B82025, body #243A30, muted #62695E. Original red logo sourced from Citifoods. Concept packaging explicitly marked as illustrative.

## Typography & layout
Cormorant Garamond display + Be Vietnam Pro body, Vietnamese compatible. Oversized serif headings, restrained italic, uppercase eyebrow labels. 1320px max-width, 64px desktop / 22px mobile gutters, 100px / 60px section rhythm. Forest hero, asymmetric circular spice photography, fine botanical ornament, thin borders, minimal card corners.

## Motion
Motion React: coordinated 700–900ms entrance, 600ms once-only scroll reveal, gentle photograph drift, manual/autoplay three-scene hero crossfade with pause. CSS decorative orbit. Reduced motion and global switch disable reveal, autoplay, smooth scrolling, hover motion. Pause continuous motion offscreen and in background tab. No scroll hijack.

## Screens and flows
Routes: /, /san-pham, /san-pham/:slug, /cau-chuyen, /cong-thuc, /cong-thuc/:slug, /diem-ban, /lien-he. Product category/dish search → detail → buying channels. Recipe filters and local bookmarks. City/channel selectors with no invented stockists. Validated local-only B2B preview, not actual submission. Shared components and demo data in frontend; no new API or database tables.

## Quality boundaries
Semantic HTML, native search dialog, keyboard focus, 44px targets, mobile menu. No cart/checkout, fake testimonials, certificates, source-region claims or unverified marketplace links. Stock photography is reference only. Contact links point to confirmed Citifoods channels; local form explicitly says it does not send.