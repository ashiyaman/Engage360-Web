export const modalCss = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');

  /* ── Overlay ── */
  .m-overlay {
    position: fixed;
    inset: 0;
    z-index: 1000;
    background: rgba(4,6,16,0.75);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 20px 16px 40px;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    animation: m-fade 0.18s ease-out;
    font-family: 'Inter', system-ui, sans-serif;
  }

  @keyframes m-fade {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  /* ── Card ── */
  .m-card {
    width: 100%;
    max-width: 540px;
    margin-top: 48px;
    border-radius: 22px;
    background: rgba(13,17,34,0.96);
    backdrop-filter: blur(32px);
    -webkit-backdrop-filter: blur(32px);
    border: 1px solid rgba(255,255,255,0.08);
    box-shadow:
      0 40px 100px rgba(0,0,0,0.7),
      inset 0 1px 0 rgba(255,255,255,0.06);
    overflow: hidden;
    animation: m-rise 0.22s cubic-bezier(.2,.8,.3,1.1);
  }

  @keyframes m-rise {
    from { opacity: 0; transform: translateY(14px) scale(0.98); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  /* Mobile: full-width bottom sheet */
  @media (max-width: 639px) {
    .m-overlay {
      padding: 0;
      align-items: flex-end;
    }
    .m-card {
      max-width: 100%;
      margin-top: 0;
      border-radius: 20px 20px 0 0;
      max-height: 94vh;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }
  }

  /* Tablet: slightly less padding, still centered */
  @media (min-width: 640px) and (max-width: 1023px) {
    .m-card { margin-top: 32px; }
  }

  /* ── Header ── */
  .m-header {
    padding: 18px 22px;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
  }

  .m-header::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--m-gradient, linear-gradient(135deg,#7C3AED,#A78BFA));
    opacity: 0.15;
    pointer-events: none;
  }

  .m-header::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 1px;
    background: var(--m-gradient, linear-gradient(135deg,#7C3AED,#A78BFA));
    opacity: 0.4;
  }

  .m-header-text { position: relative; z-index: 1; }

  .m-eyebrow {
    font-family: 'Outfit', sans-serif;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.45);
    margin-bottom: 3px;
  }

  .m-title {
    font-family: 'Outfit', sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: #fff;
    line-height: 1.2;
  }

  @media (min-width: 640px) {
    .m-title { font-size: 20px; }
  }

  .m-close {
    position: relative;
    z-index: 1;
    flex-shrink: 0;
    width: 32px; height: 32px;
    border-radius: 10px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    color: rgba(255,255,255,0.6);
    font-size: 15px;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.18s;
    line-height: 1;
  }

  .m-close:hover {
    background: rgba(255,77,109,0.15);
    border-color: rgba(255,77,109,0.4);
    color: #FF4D6D;
  }

  /* ── Body ── */
  .m-body {
    padding: 20px 22px 8px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  @media (min-width: 640px) {
    .m-body { padding: 22px 24px 8px; }
  }

  /* 2-column grid for form fields on sm+ screens */
  .m-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 14px;
  }

  @media (min-width: 500px) {
    .m-grid { grid-template-columns: 1fr 1fr; }
  }

  .m-field { display: flex; flex-direction: column; gap: 6px; }
  .m-field.full { grid-column: 1 / -1; }

  .m-label {
    font-family: 'Outfit', sans-serif;
    font-size: 10.5px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.4);
  }

  .m-value {
    font-size: 14px;
    font-weight: 500;
    color: #F0F4FF;
    padding: 2px 0;
  }

  .m-value.muted { color: rgba(255,255,255,0.5); }

  /* ── Inputs ── */
  .m-input,
  .m-select,
  .m-textarea {
    appearance: none;
    -webkit-appearance: none;
    font-family: 'Inter', sans-serif;
    font-size: 13.5px;
    font-weight: 500;
    color: #F0F4FF;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 10px;
    padding: 9px 12px;
    width: 100%;
    transition: border-color 0.18s, box-shadow 0.18s;
  }

  .m-select { padding-right: 30px; cursor: pointer; }

  .m-textarea {
    min-height: 76px;
    resize: vertical;
    line-height: 1.5;
  }

  .m-input:focus,
  .m-select:focus,
  .m-textarea:focus {
    outline: none;
    border-color: var(--m-focus, rgba(167,139,250,0.6));
    box-shadow: 0 0 0 3px var(--m-focus-ring, rgba(167,139,250,0.18));
  }

  .m-select option { background: #0F1428; color: #F0F4FF; }

  /* Select wrapper with custom chevron */
  .m-select-wrap { position: relative; }
  .m-select-wrap::after {
    content: '';
    position: absolute;
    right: 12px; top: 50%;
    width: 6px; height: 6px;
    border-right: 1.5px solid rgba(255,255,255,0.4);
    border-bottom: 1.5px solid rgba(255,255,255,0.4);
    transform: translateY(-65%) rotate(45deg);
    pointer-events: none;
  }

  /* ── Priority dot ── */
  .m-dot-row {
    display: flex;
    align-items: center;
    gap: 7px;
  }

  .m-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
    box-shadow: 0 0 8px currentColor;
  }

  /* ── Divider ── */
  .m-divider {
    height: 1px;
    background: rgba(255,255,255,0.07);
    margin: 4px 0;
  }

  /* ── Section title (comments etc) ── */
  .m-section-title {
    font-family: 'Outfit', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.4);
    margin-bottom: 10px;
  }

  /* ── Footer / actions ── */
  .m-footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
    padding: 16px 22px 20px;
    flex-wrap: wrap;
  }

  @media (min-width: 640px) {
    .m-footer { padding: 18px 24px 22px; }
  }

  /* ── Buttons ── */
  .m-btn {
    font-family: 'Outfit', sans-serif;
    font-size: 12.5px;
    font-weight: 700;
    letter-spacing: 0.04em;
    padding: 9px 20px;
    border-radius: 11px;
    cursor: pointer;
    border: 1px solid transparent;
    transition: all 0.18s;
    white-space: nowrap;
  }

  @media (max-width: 639px) {
    .m-btn { flex: 1; text-align: center; }
  }

  .m-btn-primary {
    background: var(--m-gradient, linear-gradient(135deg,#7C3AED,#A78BFA));
    color: #fff;
    box-shadow: 0 6px 20px var(--m-shadow, rgba(124,58,237,0.35));
  }

  .m-btn-primary:hover {
    box-shadow: 0 6px 28px var(--m-shadow, rgba(124,58,237,0.55));
    transform: translateY(-1px);
  }

  .m-btn-primary:active { transform: scale(0.97); }

  .m-btn-ghost {
    background: rgba(255,255,255,0.05);
    border-color: rgba(255,255,255,0.12);
    color: rgba(255,255,255,0.65);
  }

  .m-btn-ghost:hover {
    background: rgba(255,255,255,0.09);
    color: #fff;
    border-color: rgba(255,255,255,0.2);
  }

  /* ── Comment section ── */
  .m-comments { padding: 0 22px 22px; }

  @media (min-width: 640px) {
    .m-comments { padding: 0 24px 24px; }
  }

  .m-comment-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 14px;
    max-height: 160px;
    overflow-y: auto;
  }

  .m-comment-item {
    padding: 10px 12px;
    border-radius: 10px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
  }

  .m-comment-text {
    font-size: 13px;
    color: rgba(255,255,255,0.7);
    line-height: 1.5;
    margin-bottom: 4px;
  }

  .m-comment-meta {
    font-size: 11px;
    color: rgba(255,255,255,0.3);
    font-family: 'Outfit', sans-serif;
  }

  .m-comment-add-row {
    display: flex;
    gap: 10px;
    margin-top: 10px;
    flex-wrap: wrap;
    align-items: flex-start;
  }

  .m-comment-add-row .m-select-wrap {
    flex: 1;
    min-width: 130px;
  }

  @media (max-width: 400px) {
    .m-comment-add-row { flex-direction: column; }
    .m-comment-add-row .m-btn { width: 100%; }
  }
`;

// Accent overrides — call getAccentCss('violet'|'green'|'sky') and inject with modalCss
export const ACCENTS = {
  violet: {
    gradient: 'linear-gradient(135deg,#7C3AED,#A78BFA)',
    focus:    'rgba(167,139,250,0.6)',
    focusRing:'rgba(167,139,250,0.18)',
    shadow:   'rgba(124,58,237,0.35)',
  },
  green: {
    gradient: 'linear-gradient(135deg,#059669,#34D399)',
    focus:    'rgba(52,211,153,0.6)',
    focusRing:'rgba(52,211,153,0.15)',
    shadow:   'rgba(5,150,105,0.35)',
  },
  sky: {
    gradient: 'linear-gradient(135deg,#0EA5E9,#38BDF8)',
    focus:    'rgba(56,189,248,0.6)',
    focusRing:'rgba(56,189,248,0.15)',
    shadow:   'rgba(14,165,233,0.35)',
  },
};