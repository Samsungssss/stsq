# TOEFL iBT® Reading — Select the Sentence Practice Platform

A premium, production-ready educational examination platform designed for students preparing for the **Select the Sentence** question type in the TOEFL iBT Reading section. Built with React 19, TypeScript, Tailwind CSS v4, Motion, Three.js, and Swiss Modernism 2.0 design tokens.

---

## 🌟 Key Features

- **20 Original Academic Reading Passages**: University-level passages spanning 20 distinct academic fields (Biology, Astronomy, Economics, Archaeology, Neuroscience, Climate Science, and more).
- **Mandatory Letter-Only Answer Options**: Authentic letter buttons `[A]`, `[B]`, `[C]`, `[D]`, and `[E]`. Zero sentence text clutter in the answer options.
- **Synchronized Bidirectional Highlighting**: Clicking an option letter highlights sentence `[X]` in the passage text, and clicking a sentence in the passage activates letter option `X`.
- **100% Offline & Deterministic Grading**: All 20 answer keys, target quotes, educational explanations, and distractor breakdowns are stored locally. Zero external API calls or backend latency.
- **Framer Component Architecture**:
  - **Fluid Button**: Liquid hover bubble animations, font rolling effects, and responsive press states.
  - **Aura Background**: WebGL shader background delivering a serene, distraction-free reading atmosphere.
- **Diagnostic Results Dashboard**: Animated score percentage gauge, estimated TOEFL scaled band (0–30), pacing metrics, filter pills, and expandable question review cards.

---

## 🛠️ Technology Stack

- **Framework**: React 19 (SPA) with Vite 8
- **Language**: TypeScript (ES2022)
- **Styling**: Tailwind CSS v4
- **Animations**: Motion (`motion/react`)
- **WebGL Shader**: Three.js (`three`)
- **Icons**: Lucide React (`lucide-react`)
- **Design Tokens**: Persisted Swiss Modernism 2.0 specification (`design-system/toefl-reading-master/MASTER.md`)

---

## 🚀 Quick Start & Local Development

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/toefl-select-sentence.git

# Navigate to project directory
cd toefl-select-sentence

# Install dependencies
npm install
```

### Run Local Development Server

```bash
npm run dev
```

The application will start on `http://localhost:3000`.

---

## 📦 Production Build

To test the production build locally:

```bash
# Compile TypeScript and bundle static assets into /dist
npm run build

# Preview production build locally
npm run preview
```

---

## ⚡ Vercel Deployment Instructions

This application is 100% client-side and requires **zero environment variables or backend servers**. It is fully pre-configured for instant deployment on Vercel.

### Option 1: Vercel GitHub Integration (Recommended)

1. Push your repository to **GitHub** or **GitLab**.
2. Go to the [Vercel Dashboard](https://vercel.com/new) and click **Add New Project**.
3. Import your repository.
4. Vercel will automatically detect the **Vite** framework preset with the following build settings:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**.

### Option 2: Vercel CLI Deployment

1. Install the Vercel CLI globally:
   ```bash
   npm install -g vercel
   ```
2. Run `vercel` in the root directory:
   ```bash
   vercel
   ```
3. Deploy to production:
   ```bash
   vercel --prod
   ```

---

## 📄 License & Apache 2.0

Distributed under the Apache 2.0 License. See `LICENSE` for details.
