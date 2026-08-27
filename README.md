# Restaurant Website Template — مذاق | MATHAQ (demo)

A reusable, single-page restaurant website template built with plain HTML5 / CSS3 / vanilla JS — no frameworks, no build step. Currently themed for a fictional Levantine restaurant ("مذاق | MATHAQ") using placeholder images and demo copy so the template itself can be evaluated independently of any real client.

## Structure

```
restaurant-template/
├── index.html
├── css/style.css      ← all design tokens + layout + animation
├── js/script.js       ← nav, scroll-reveal, menu switching, review carousel
├── assets/images/     ← placeholder photography (predictable filenames)
├── assets/icons/
└── README.md
```

## Signature UX pattern

Every image on the page — hero food shots, menu category icons, the delivery graphic, the customer photo — is clipped into the same scalloped "bloom" shape (defined once in `index.html` as an SVG `<clipPath id="scallop-12">` and reused via `.blob-shape`). That's the one visual idea the whole template is built around, echoing the cloud/scallop image frames from the reference design.

Sections, top to bottom: sticky header → hero (three floating scalloped food images + headline) → menu glimpse (category picker + price list with dotted leaders) → digital QR menu → order/contact (phone mock‑up + delivery graphic + call/WhatsApp buttons) → testimonials carousel → footer.

## Rebranding for a new restaurant

1. **Colors & type** — edit the CSS custom properties at the top of `css/style.css` (`:root { --color-primary: ... }`). Nothing else needs to change.
2. **Logo / name** — replace the `مذ` monogram and "مذاق MATHAQ" text in the header and footer of `index.html`.
3. **Images** — drop new files into `assets/images/` using the same filenames (`hero-01.jpg`, `menu-01.jpg` … `menu-05.jpg`, `delivery.jpg`, `customer-01.jpg`), or update the `src` attributes.
4. **Menu** — edit the `MENU` object at the top of `js/script.js` (category keys map to the category buttons' `data-cat` attributes).
5. **Contact info / hours / locations / socials** — update the order section and footer in `index.html`.
6. **QR code** — swap the placeholder SVG QR pattern in the `#qr` section for a real generated code pointing at the client's digital menu URL.

## Notes

- RTL Arabic layout (`dir="rtl"`) with `Cairo` (body) and `Marhey` (headings) from Google Fonts.
- Respects `prefers-reduced-motion`; all animation is CSS/JS-driven, no external animation library.
- Placeholder images are simple generated color blocks, not AI photography — replace them with real restaurant photography before shipping.
- Menu content, prices, hours, and reviews are fictional demo data only.
