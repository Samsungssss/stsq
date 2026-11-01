# TOEFL Reading Master — Design System Specification
## Modern Academic Editorial & Examination Platform (Lexis)

> **Architecture:** Master + Overrides pattern.
> Generated via UI UX Pro Max for a production-ready, international educational examination platform.

---

## 1. Visual Direction & Design Philosophy

- **Identity:** Editorial Excellence meets Authentic Standardized Examination.
- **Aesthetic:** Modern academic editorial — clean typographic grids, warm parchment paper surfaces, deep oxford slate ink, restrained citation amber accents, and crisp tactile controls.
- **Zero Generic AI Slop:**
  - ❌ No glowing neon borders or AI gradients.
  - ❌ No floating background bubbles or random particles.
  - ❌ No excessive glassmorphism, heavy blur, or generic purple/cyan themes.
  - ❌ No redundant sentence text inside answer options.
  - ✅ Visual power crafted through typography hierarchy (Crimson Pro & Plus Jakarta Sans), deliberate whitespace, intentional tactile borders, and authentic examination discipline.

---

## 2. Design Tokens & Color Palette

### 2.1 Editorial Palette (High Contrast & Warm Balance)

| Token Name | Hex Code | Tailwind / CSS Value | Description / Usage |
|------------|----------|----------------------|---------------------|
| `--canvas` | `#FBFBF9` | `bg-[#FBFBF9]` | Warm ivory parchment viewport canvas; eliminates eye strain |
| `--surface-paper` | `#FFFFFF` | `bg-white` | Pristine reading sheet and elevated content surfaces |
| `--surface-muted` | `#F4F3EE` | `bg-[#F4F3EE]` | Secondary panels, passage header bands, inactive states |
| `--surface-hover` | `#ECEAE2` | `hover:bg-[#ECEAE2]` | Tactile hover states for sentences and option letters |
| `--ink-primary` | `#0F172A` | `text-slate-900` | Headlines, primary prompts, button text, crisp contrast |
| `--ink-body` | `#1E293B` | `text-slate-800` | Academic reading passage prose (optimal optical density) |
| `--ink-secondary` | `#475569` | `text-slate-600` | Subheadings, feature descriptions, explanatory text |
| `--ink-muted` | `#64748B` | `text-slate-500` | Discipline badges, question counters, metadata labels |
| `--border-subtle` | `#E5E3DC` | `border-[#E5E3DC]` | Delicate warm dividing lines, sentence delimiters |
| `--border-strong` | `#0F172A` | `border-slate-900` | Active selection outlines, primary CTA borders |
| `--brand-oxford` | `#0F243E` | `bg-[#0F243E]` | Primary button fill, platform badge, authoritative tone |
| `--accent-gold` | `#B45309` | `text-amber-700` | Academic citation amber for subtle achievement tags |

### 2.2 Semantic Evaluation Tokens (Evaluation States Only)

| Token Name | Hex Code | Usage |
|------------|----------|-------|
| `--status-correct-bg` | `#ECFDF5` | Emerald tint for correct sentence `[X]` and explanation card |
| `--status-correct-border` | `#059669` | Crisp emerald ring and border for verified target sentence |
| `--status-correct-ink` | `#064E3B` | High-contrast dark emerald text (`ratio > 9:1`) |
| `--status-incorrect-bg` | `#FFF1F2` | Rose tint for student's mistaken sentence selection |
| `--status-incorrect-border` | `#E11D48` | Rose border and strikethrough for student's error |
| `--status-incorrect-ink` | `#881337` | High-contrast dark rose text for distractor analysis |

---

## 3. Typography & Typesetting

| Role | Typeface | Weight | Size | Line Height | Tracking |
|------|----------|--------|------|-------------|----------|
| **Display / Hero** | Plus Jakarta Sans | 800 | 2.5rem – 3.75rem | 1.12 | -0.03em |
| **Passage Title** | Plus Jakarta Sans | 700 | 1.25rem – 1.5rem | 1.3 | -0.015em |
| **Passage Prose** | Crimson Pro | 400 & 600 | 1.1875rem (19px) | 1.85 | +0.01em |
| **Sentence Badges** | JetBrains Mono | 700 | 0.8125rem | 1.0 | +0.05em |
| **Question Heading** | Plus Jakarta Sans | 600 | 1.125rem – 1.25rem | 1.45 | -0.01em |
| **Answer Options A–E** | Plus Jakarta Sans | 800 | 1.5rem (24px) | 1.0 | 0 |
| **Metadata / Timers** | JetBrains Mono | 600 | 0.8125rem | 1.0 | +0.08em |

---

## 4. Spacing, Elevation & Surfaces

- **Grid:** Strict 8-point typographic rhythm (`8px`, `16px`, `24px`, `32px`, `48px`, `64px`).
- **Surfaces:** No decorative glassmorphism or muddy blur. Pristine 1px borders (`#E5E3DC`) over crisp white paper cards with subtle, natural paper shadows (`0 1px 3px rgba(15,23,42,0.05)`).
- **Interactive Tactility:** Active button press transitions (`active:translate-y-[1px]`), smooth border highlights, clear focus rings (`focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2`).
