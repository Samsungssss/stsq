@import "tailwindcss";

@layer base {
  body {
    font-family: 'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
    color: #000000;
    background-color: #ffffff;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
  }

  ::selection {
    background-color: #000000;
    color: #ffffff;
  }
}

html, body, #root {
  min-height: 100%;
}

.font-academic {
  font-family: 'Crimson Pro', Georgia, Cambria, 'Times New Roman', serif;
}

.font-reading {
  font-family: 'Atkinson Hyperlegible', system-ui, sans-serif;
}

.sentence-grid {
  display: inline;
}

.font-mono-code {
  font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

.prose-editorial {
  font-family: 'Crimson Pro', Georgia, Cambria, serif;
  color: #000000;
  line-height: 1.85;
  letter-spacing: 0.005em;
}

@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
