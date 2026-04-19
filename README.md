<div align="center">

# Ez Identity

**A living, on-chain personal identity — stored permanently on Walrus.**

[![Live Site](https://img.shields.io/badge/live-ezidentity.wal.app-7c5cff?style=for-the-badge&logo=walrus)](https://ezidentity.wal.app)
[![Walrus Mainnet](https://img.shields.io/badge/network-Walrus_Mainnet-31d0ff?style=for-the-badge)](https://docs.wal.app)
[![Next.js 16](https://img.shields.io/badge/Next.js-16.2-000000?style=for-the-badge&logo=nextdotjs)](https://nextjs.org)
[![License](https://img.shields.io/badge/license-MIT-ffd65c?style=for-the-badge)](LICENSE)

[**→ Visit the site**](https://ezidentity.wal.app) &nbsp;·&nbsp; [Sui Object](https://suiscan.xyz/mainnet/object/0x74a1b63cd82c8a4747aa96af7cbadc20782fbad4c6c536595af7cf90b7538f55) &nbsp;·&nbsp; [SuiNS](https://suins.io/names/ezidentity)

</div>

---

## What it is

**Ez Identity** is not a portfolio. It is a **meta-narrative about Walrus itself** — a personal identity that reframes the about-me page as a decentralized artifact that has to earn its place on-chain.

Built for the **Walrus Foundation's _Walgo Site Builder_ hackathon** (Walrus Sessions 01), the site opens with a dramatic 8-step handshake — `handshake → connecting to walrus mainnet → resolving on-chain owner → decrypting identity blob → verifying walrus signature → hydrating profile payload → mounting terminal interface → ready` — and unfolds into an interactive AI terminal, a 3D identity core, and a ChainFooter that proves ownership via the Sui address with one-click copy.

Every pixel in the 4.2 MB bundle is served from Walrus storage nodes. Every scroll-reveal replays bidirectionally. Every credential, project, and skill is queryable in natural language.

> _"This identity lives on Walrus. Forever."_

---

## Highlights

- **Boot sequence** — 8-step scrambled text reveal with gradient progress bar and live "on-chain" metadata
- **Interactive AI terminal** — intent-matching engine answers "show projects", "what skills are strongest?", "who are you?" in real time
- **3D identity core** — React Three Fiber scene with orbiting nodes, particle field, GSAP-driven camera rig
- **Bidirectional scroll reveals** — every animation replays when scrolling back up (Reveal, WordReveal, Scramble, CountUp all hooked into IntersectionObserver)
- **On-chain ChainFooter** — Sui owner address as a single clickable hero with copy-to-clipboard + Suiscan explorer link
- **Static export, zero server** — fully prerendered with `output: "export"`, no runtime dependencies
- **Decentralized** — hosted entirely on Walrus mainnet storage nodes; no S3, no Vercel edge, no server

---

## Tech stack

| Layer | Stack |
|---|---|
| **Framework** | [Next.js 16.2](https://nextjs.org) (App Router, Turbopack, static export) |
| **Runtime** | React 19, TypeScript 5 (strict) |
| **Styling** | Tailwind CSS v4, CSS custom properties, `text-balance` |
| **3D / Motion** | [`three`](https://threejs.org), [`@react-three/fiber`](https://r3f.docs.pmnd.rs), [`@react-three/drei`](https://drei.pmnd.rs), [GSAP](https://gsap.com), [Framer Motion](https://motion.dev) |
| **Typography** | Inter · JetBrains Mono · Space Grotesk (via `next/font`) |
| **Hosting** | [Walrus Sites](https://docs.wal.app/walrus-sites/intro.html) on Sui Mainnet |
| **Naming** | [SuiNS](https://suins.io) (`@ezidentity`) |

---

## How it works

```
┌──────────────────────┐        ┌──────────────────────┐
│  next build          │        │   site-builder CLI   │
│  output: "export"    │──────▶ │   publish --epochs 53│
└──────────────────────┘        └──────────┬───────────┘
         │                                 │
         ▼                                 ▼
    out/*.html,                     Walrus storage
    /_next/**,                      (blob quilts, 53 epochs ≈ 1 year)
    /icon.png,                             │
    /image.png                             ▼
                                 Sui Move object
                                 ::site::Site (owner = 0xe7d9…91d11)
                                        │
                                        ▼
                                    SuiNS @ezidentity
                                        │
                                        ▼
                            https://ezidentity.wal.app ✅
```

1. **Build** – Next.js prerenders every route into static HTML/CSS/JS → `out/` (4.2 MB).
2. **Publish** – `site-builder publish` hashes each file, uploads missing blobs to Walrus storage, and creates a `::site::Site` Move object on Sui mainnet owned by the deployer.
3. **Name** – A SuiNS domain (`@ezidentity`) is bound to the site object ID, enabling the `ezidentity.wal.app` subdomain on the public Walrus portal.
4. **Serve** – The Walrus portal resolves `ezidentity.wal.app` → SuiNS → site object → blob quilt patches → your browser.

No CDN. No cache layer. No server. If every Walrus storage node went down, the site would go down. Until then, it is permanent.

---

## Local development

```bash
# Install
npm install

# Dev server (Turbopack)
npm run dev
# → http://localhost:3000

# Production build (static export)
npm run build
# → ./out

# Type-check
npx tsc --noEmit
```

> ⚠️ This repo uses Next.js 16 with breaking changes from earlier majors (see `AGENTS.md`). Consult `node_modules/next/dist/docs/01-app/02-guides/static-exports.md` before changing config.

---

## Deploying to Walrus

Reproduce the mainnet deploy:

```bash
# 1. Install prerequisites
#    - Sui CLI     https://docs.sui.io/guides/developer/getting-started/sui-install
#    - walrus CLI  https://github.com/MystenLabs/walrus/releases
#    - site-builder https://github.com/MystenLabs/walrus-sites/releases

# 2. Configure Sui wallet for mainnet
sui client switch --env mainnet
sui client active-address       # confirm this is the wallet that owns WAL + SUI

# 3. Build the static site
npm run build                   # produces ./out

# 4. Dry-run (estimates cost — no transactions sent)
site-builder --config ./sites-config.yaml \
  publish --epochs 53 --dry-run ./out

# 5. Publish for real
site-builder --config ./sites-config.yaml \
  publish --epochs 53 ./out
# → prints new site object ID and a base36 URL

# 6. Buy a SuiNS name at https://suins.io
#    (required for public access on *.wal.app)

# 7. In the SuiNS dashboard: "Set Walrus Site ID" → paste the site object ID

# 8. Visit https://<your-name>.wal.app
```

A reference `sites-config.yaml` targeting mainnet is included under the hackathon notes.

---

## Project structure

```
app/
├─ layout.tsx              # Root layout, metadata, font loading
├─ page.tsx                # Section orchestration
├─ icon.png                # Circular favicon (auto-picked by Next.js)
├─ data/
│  ├─ identity.ts          # Single source of truth: name, projects, skills, certs, chain
│  └─ knowledge.ts         # Intent-matching engine for AITerminal
├─ lib/
│  └─ focus.tsx            # Cross-section focus context (terminal ↔ sections)
└─ components/
   ├─ BootPreloader.tsx    # 8-step handshake with scrambled text
   ├─ Hero.tsx             # Scramble name, parallax, identity card
   ├─ Scene3D.tsx          # R3F canvas entry
   ├─ scene/
   │  ├─ IdentityCore.tsx  # Wireframe sphere
   │  ├─ OrbitNodes.tsx    # Orbiting planet-lets
   │  ├─ Particles.tsx     # Particle field
   │  └─ CameraRig.tsx     # Scroll-reactive camera
   ├─ AITerminal.tsx       # Natural-language terminal UI
   ├─ Projects.tsx         # 12 real projects, filter by category
   ├─ Skills.tsx           # 22 signals across Frontend/Backend/ML/Cloud/Tools
   ├─ Certificates.tsx     # 41 credentials grouped by issuer
   ├─ Experience.tsx       # Trajectory timeline
   ├─ ChainFooter.tsx      # "This identity lives on Walrus. Forever."
   ├─ Navigation.tsx       # Sticky pill-nav with active-section sync
   ├─ CustomCursor.tsx     # Magnetic cursor (md+)
   ├─ ScrollProgress.tsx   # Top progress bar + jump-to-top ring
   ├─ Reveal.tsx           # Bidirectional fade-up-on-scroll
   ├─ WordReveal.tsx       # Word-stagger entrance
   ├─ CurtainText.tsx      # Clip-path reveal
   ├─ Scramble.tsx         # Single-line scramble (replays on re-entry)
   ├─ CountUp.tsx          # Easing count animation (resets on leave)
   └─ Marquee.tsx          # Infinite ticker
```

---

## Design principles

1. **Narrative over decoration** – Every animation explains something: the boot preloader explains Walrus, the scramble explains identity becoming concrete, the ChainFooter explains ownership.
2. **Everything replays** – Reveals are bidirectional. A visitor who scrolls up should not see static elements — the page should feel alive.
3. **Typography over imagery** – Inter/Space Grotesk/JetBrains Mono do most of the visual work. The only real image is the avatar.
4. **No chain UI kitsch** – No rotating coins, no hex-grid overlays as decoration. The on-chain element is a single address card, treated with the same restraint as editorial typography.
5. **Honest metadata** – No fake blob IDs, no mocked hashes. Every on-chain claim is verifiable on Suiscan.

---

## About

Built by **Ezra Kristanto Nahumury** — Front-End Developer, fresh graduate of **Duta Wacana Christian University (UKDW, 2025)**, and top graduate of the **Cloud Computing cohort at Bangkit Academy 2024 Batch 2** (led by Google · Tokopedia · Gojek · Traveloka). Based in Yogyakarta, Indonesia.

- GitHub – [@EzraNahumury](https://github.com/EzraNahumury)
- LinkedIn – [ezranhmry](https://www.linkedin.com/in/ezranhmry/)
- Email – ezra.kristanto@ti.ukdw.ac.id

---

## License

MIT — do whatever you want, but the identity on `ezidentity.wal.app` is mine.

<div align="center">

_Built for [Walrus Sessions 01](https://thewalrussessions.wal.app) · Apr 2026_

</div>
