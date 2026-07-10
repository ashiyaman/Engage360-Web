export const modalCss = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');

  /* ─────────────────────────────────────────────────────────────
     OVERLAY
     Scroll wrapper — does NOT use flexbox so overflow-y works
     on iOS without fighting flex alignment
  ───────────────────────────────────────────────────────────── */
  .m-overlay {
    position: fixed;
    inset: 0;
    z-index: 1000;
    background: rgba(4, 6, 16, 0.78);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    animation: m-fade 0.18s ease-out;
    font-family: 'Inter', system-ui, sans-serif;
    /* Padding-top leaves room so the sheet doesn't cover the whole screen */
    padding-top: 80px;
  }

  @keyframes m-fade {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  /* ─────────────────────────────────────────────────────────────
     CARD — mobile-first: bottom sheet
     margin-top: auto pushes card to the bottom inside the
     scroll container without needing flex on the overlay
  ───────────────────────────────────────────────────────────── */
  .m-card {
    width: 90%;
    max-width: 90%;
    margin-top: auto;
    position: relative;
    border-radius: 20px 20px 0 0;
    background: rgba(13, 17, 34, 0.98);
    backdrop-filter: blur(32px);
    -webkit-backdrop-filter: blur(32px);
    border: 1px solid rgba(255, 255, 255, 0.09);
    border-bottom: none;
    box-shadow: 0 -16px 48px rgba(0, 0, 0, 0.55),
                inset 0 1px 0 rgba(255, 255, 255, 0.06);
    animation: m-rise 0.26s cubic-bezier(0.2, 0.8, 0.3, 1.05);
    /* Ensure it's always at the bottom of the scroll container */
    min-height: calc(100vh - 80px);
    display: flex;
    flex-direction: column;
  }

  @keyframes m-rise {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── Tablet+: switch to a centered floating card ── */
  @media (min-width: 640px) {
    .m-overlay {
      padding: 0;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      padding: 40px 16px 60px;
    }

    .m-card {
      max-width: 540px;
      width: 100%;
      border-radius: 22px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.09);
      min-height: unset;
      display: block;
    }
  }

  @media (min-width: 1024px) {
    .m-overlay { padding-top: 56px; }
  }

  /* ─────────────────────────────────────────────────────────────
     HEADER
  ───────────────────────────────────────────────────────────── */
  .m-header {
    padding: 18px 20px 16px;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
    flex-shrink: 0;
  }

  @media (min-width: 640px) {
    .m-header { padding: 20px 24px 18px; }
  }

  .m-header::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--m-gradient, linear-gradient(135deg,#7C3AED,#A78BFA));
    opacity: 0.14;
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

  .m-header-text {
    position: relative;
    z-index: 1;
    text-align: left;
  }

  .m-eyebrow {
    display: block;
    font-family: 'Outfit', sans-serif;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.45);
    margin-bottom: 3px;
    text-align: left;
  }

  .m-title {
    font-family: 'Outfit', sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: #fff;
    line-height: 1.2;
    text-align: left;
  }

  @media (min-width: 640px) {
    .m-title { font-size: 20px; }
  }

  .m-close {
    position: relative;
    z-index: 1;
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.6);
    font-size: 15px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.18s;
    line-height: 1;
  }

  .m-close:hover {
    background: rgba(255, 77, 109, 0.15);
    border-color: rgba(255, 77, 109, 0.4);
    color: #FF4D6D;
  }

  /* ─────────────────────────────────────────────────────────────
     BODY
  ───────────────────────────────────────────────────────────── */
  .m-body {
    padding: 18px 20px 6px;
    flex: 1;
  }

  @media (min-width: 640px) {
    .m-body { padding: 20px 24px 6px; }
  }

  /* ── Field grid: single col on mobile, 2-col on 500px+ ── */
  .m-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
  }

  @media (min-width: 500px) {
    .m-grid { grid-template-columns: 1fr 1fr; }
  }

  /* ── Individual field ── */
  .m-field {
    display: flex;
    flex-direction: column;
    gap: 6px;
    text-align: left;
  }

  .m-field.full { grid-column: 1 / -1; }

  .m-label {
    display: block;
    font-family: 'Outfit', sans-serif;
    font-size: 10.5px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.4);
    text-align: left;
  }

  .m-value {
    font-size: 14px;
    font-weight: 500;
    color: #F0F4FF;
    text-align: left;
    padding: 2px 0;
    display: block;
  }

  .m-value.muted {
    color: rgba(255, 255, 255, 0.5);
  }

  /* ── Inputs ── */
  .m-input,
  .m-select,
  .m-textarea {
    -webkit-appearance: none;
    appearance: none;
    display: block;
    width: 100%;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: #F0F4FF;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 10px;
    padding: 11px 14px;
    transition: border-color 0.18s, box-shadow 0.18s;
    -webkit-tap-highlight-color: transparent;
  }

  .m-select {
    padding-right: 34px;
    cursor: pointer;
  }

  .m-textarea {
    min-height: 80px;
    resize: vertical;
    line-height: 1.5;
  }

  .m-input:focus,
  .m-select:focus,
  .m-textarea:focus {
    outline: none;
    border-color: var(--m-focus, rgba(167, 139, 250, 0.6));
    box-shadow: 0 0 0 3px var(--m-focus-ring, rgba(167, 139, 250, 0.18));
  }

  .m-input::placeholder,
  .m-textarea::placeholder {
    color: rgba(255, 255, 255, 0.25);
  }

  .m-select option {
    background: #0F1428;
    color: #F0F4FF;
  }

  /* Custom chevron on select */
  .m-select-wrap {
    position: relative;
    display: block;
  }

  .m-select-wrap::after {
    content: '';
    position: absolute;
    right: 13px;
    top: 50%;
    width: 6px;
    height: 6px;
    border-right: 1.5px solid rgba(255, 255, 255, 0.4);
    border-bottom: 1.5px solid rgba(255, 255, 255, 0.4);
    transform: translateY(-65%) rotate(45deg);
    pointer-events: none;
  }

  /* ── Priority dot ── */
  .m-dot-row {
    display: flex;
    align-items: center;
    gap: 8px;
    text-align: left;
  }

  .m-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
    box-shadow: 0 0 8px currentColor;
  }

  /* ── Divider ── */
  .m-divider {
    height: 1px;
    background: rgba(255, 255, 255, 0.07);
    margin: 2px 0;
  }

  /* ── Section title ── */
  .m-section-title {
    font-family: 'Outfit', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.4);
    margin-bottom: 10px;
    text-align: left;
    display: block;
  }

  /* ── Footer / action buttons ── */
  .m-footer {
    display: flex;
    align-items: stretch;
    gap: 10px;
    padding: 14px 20px 20px;
    flex-shrink: 0;
  }

  @media (min-width: 640px) {
    .m-footer {
      padding: 16px 24px 24px;
      justify-content: flex-end;
      align-items: center;
    }
  }

  /* Buttons stretch full-width on mobile */
  .m-btn {
    flex: 1;
    font-family: 'Outfit', sans-serif;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.03em;
    padding: 13px 20px;
    border-radius: 12px;
    cursor: pointer;
    border: 1px solid transparent;
    transition: all 0.18s;
    white-space: nowrap;
    text-align: center;
    -webkit-tap-highlight-color: transparent;
  }

  @media (min-width: 640px) {
    .m-btn {
      flex: none;
      padding: 10px 22px;
      font-size: 13px;
    }
  }

  .m-btn-primary {
    background: var(--m-gradient, linear-gradient(135deg,#7C3AED,#A78BFA));
    color: #fff;
    box-shadow: 0 4px 18px var(--m-shadow, rgba(124, 58, 237, 0.35));
  }

  .m-btn-primary:hover {
    filter: brightness(1.08);
    transform: translateY(-1px);
  }

  .m-btn-primary:active {
    transform: scale(0.97);
    filter: brightness(0.95);
  }

  .m-btn-ghost {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.12);
    color: rgba(255, 255, 255, 0.65);
  }

  .m-btn-ghost:hover {
    background: rgba(255, 255, 255, 0.09);
    color: #fff;
    border-color: rgba(255, 255, 255, 0.2);
  }

  /* ─────────────────────────────────────────────────────────────
     COMMENTS SECTION
  ───────────────────────────────────────────────────────────── */
  .m-comments {
    padding: 14px 20px 28px;
  }

  @media (min-width: 640px) {
    .m-comments { padding: 14px 24px 28px; }
  }

  .m-comment-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 12px;
    max-height: 200px;
    overflow-y: auto;
  }

  .m-comment-item {
    padding: 10px 12px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.07);
    text-align: left;
  }

  .m-comment-text {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.72);
    line-height: 1.5;
    margin-bottom: 4px;
  }

  .m-comment-meta {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.3);
    font-family: 'Outfit', sans-serif;
  }

  .m-comment-add-row {
    display: flex;
    gap: 10px;
    margin-top: 10px;
    align-items: center;
  }

  .m-comment-add-row .m-select-wrap {
    flex: 1;
    min-width: 0;
  }

  @media (max-width: 399px) {
    .m-comment-add-row {
      flex-direction: column;
    }
    .m-comment-add-row .m-select-wrap,
    .m-comment-add-row .m-btn {
      width: 100%;
    }
  }
`;

export const ACCENTS = {
  violet: {
    gradient:  'linear-gradient(135deg,#7C3AED,#A78BFA)',
    focus:     'rgba(167,139,250,0.6)',
    focusRing: 'rgba(167,139,250,0.18)',
    shadow:    'rgba(124,58,237,0.35)',
  },
  green: {
    gradient:  'linear-gradient(135deg,#059669,#34D399)',
    focus:     'rgba(52,211,153,0.6)',
    focusRing: 'rgba(52,211,153,0.15)',
    shadow:    'rgba(5,150,105,0.35)',
  },
  sky: {
    gradient:  'linear-gradient(135deg,#0EA5E9,#38BDF8)',
    focus:     'rgba(56,189,248,0.6)',
    focusRing: 'rgba(56,189,248,0.15)',
    shadow:    'rgba(14,165,233,0.35)',
  },
  pink: {
    gradient:  'linear-gradient(135deg,#EC4899,#F472B6)',
    focus:     'rgba(244,114,182,0.6)',
    focusRing: 'rgba(244,114,182,0.18)',
    shadow:    'rgba(236,72,153,0.3)',
  },
  amber: {
    gradient:  'linear-gradient(135deg,#EA580C,#FB923C)',
    focus:     'rgba(251,146,60,0.6)',
    focusRing: 'rgba(251,146,60,0.18)',
    shadow:    'rgba(234,88,12,0.3)',
  },
};