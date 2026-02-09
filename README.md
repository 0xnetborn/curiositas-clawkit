# Curiositas ClawKit Demo

Frontend demo per Curiositas ClawKit v1 - Costruito con Next.js, Tailwind CSS e Anime.js.

## Tech Stack
- Next.js 14 (App Router)
- Tailwind CSS
- TypeScript
- Anime.js v4 per animazioni smooth

## Sezioni

| Sezione | Animazione |
|---------|------------|
| **Hero** | Timeline entrance + stagger cards |
| **Features** | Stagger reveal 6 cards |
| **Squad** | 12 agenti con stagger animation |
| **Workflow** | Linee animate + stagger steps |
| **Pricing** | Cards con hover effects |

## Installazione

```bash
npm install
npm run dev
```

## Deploy su Vercel

```bash
npx vercel login
npx vercel --prod
```

## Struttura

```
src/
├── app/
│   ├── page.tsx          # Main page con tutte le sezioni
│   └── globals.css        # Tailwind + custom styles
└── components/
    ├── Navbar.tsx         # Navbar animata
    ├── HeroSection.tsx    # Hero + 2 Pack cards
    ├── FeaturesSection.tsx # 6 feature cards
    ├── SquadSection.tsx   # 12 AI agents grid
    ├── WorkflowSection.tsx # 2 workflow visualizations
    └── PricingSection.tsx # 3 pricing plans
```

## Pack Disponibili

### Pack 1 - Marketing Co-Founder (Presence Engine)
- **Squad:** Athena, Calliope, Themis, Hermes, Chronos, Daedalus
- **Workflow:** Ricerca → Scrittura → Review → Repurpose → Amplificazione → Misurazione

### Pack 2 - Business Operator (Execution Engine)
- **Squad:** Hera, Argus, Prometheus, Hestia, Heracles, Mnemosyne
- **Workflow:** Priorità → Esecuzione → Follow-up → Decisioni → Report

## Prezzi

| Piano | Prezzo | Features |
|-------|--------|----------|
| Starter | 0€/mese | 1 Pack, 2 agenti, 100 credits |
| Pro | 49€/mese | Tutti i Pack, 12 agenti, 1000 credits |
| Team | 149€/mese | Illimitati, API access, supporto dedicato |

---

Crafted with 🦝 & ⚡ by Curiositas Studio
