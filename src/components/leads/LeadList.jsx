import { useContext } from "react";
import axios from "axios";
import { LeadContext } from "../../contexts/LeadContext";
import { FUNNEL_STAGES, BASE_URL } from "../../utils/constants";

/* ─── Per-stage design tokens ────────────────────────────────────────── */
const stageConfig = {
  New: {
    glow: "#38BDF8",
    gradient: "linear-gradient(135deg,#0EA5E9,#38BDF8)",
    border: "rgba(56,189,248,0.5)",
    cardAccent: "#38BDF8",
    badgeBg: "rgba(56,189,248,0.15)",
    badgeText: "#7DD3FC",
    icon: "✦",
  },
  Contacted: {
    glow: "#A78BFA",
    gradient: "linear-gradient(135deg,#7C3AED,#A78BFA)",
    border: "rgba(167,139,250,0.5)",
    cardAccent: "#A78BFA",
    badgeBg: "rgba(167,139,250,0.15)",
    badgeText: "#C4B5FD",
    icon: "◈",
  },
  Qualified: {
    glow: "#F472B6",
    gradient: "linear-gradient(135deg,#EC4899,#F472B6)",
    border: "rgba(244,114,182,0.5)",
    cardAccent: "#F472B6",
    badgeBg: "rgba(244,114,182,0.15)",
    badgeText: "#FBCFE8",
    icon: "◆",
  },
  "Proposal Sent": {
    glow: "#FB923C",
    gradient: "linear-gradient(135deg,#EA580C,#FB923C)",
    border: "rgba(251,146,60,0.5)",
    cardAccent: "#FB923C",
    badgeBg: "rgba(251,146,60,0.15)",
    badgeText: "#FED7AA",
    icon: "◉",
  },
  Closed: {
    glow: "#34D399",
    gradient: "linear-gradient(135deg,#059669,#34D399)",
    border: "rgba(52,211,153,0.5)",
    cardAccent: "#34D399",
    badgeBg: "rgba(52,211,153,0.15)",
    badgeText: "#A7F3D0",
    icon: "✔",
  },
};

const priorityConfig = {
  High: { color: "#FF4D6D", bg: "rgba(255,77,109,0.12)", label: "HIGH" },
  Medium: { color: "#FB923C", bg: "rgba(251,146,60,0.12)", label: "MED" },
  Low: { color: "#34D399", bg: "rgba(52,211,153,0.12)", label: "LOW" },
};

/* ─── Inline styles (avoids Tailwind purge issues in any env) ─────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');

  .e360-board * { box-sizing: border-box; }

  .e360-board {
    font-family: 'Inter', system-ui, sans-serif;
    padding: 16px 4px 32px;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  @media (min-width: 768px) {
    .e360-board { padding: 24px 4px 40px; }
  }

  .e360-cols {
    display: flex;
    gap: 18px;
    min-width: max-content;
  }

  /* Mobile: stacked, full-width, no horizontal scroll */
  @media (max-width: 639px) {
    .e360-board {
      overflow-x: hidden;
    }
    .e360-cols {
      flex-direction: column;
      min-width: 0;
      width: 100%;
      gap: 16px;
    }
  }

  /* Small tablets: horizontal snap-scroll columns */
  @media (min-width: 640px) and (max-width: 1023px) {
    .e360-cols {
      scroll-snap-type: x mandatory;
      padding-bottom: 4px;
    }
  }

  @media (min-width: 1280px) {
    .e360-cols {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      min-width: 0;
    }
  }

  /* ── Column ── */
  .e360-col {
    width: 288px;
    border-radius: 20px;
    background: rgba(15,20,40,0.7);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid rgba(255,255,255,0.06);
    box-shadow: 0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04);
    overflow: hidden;
    transition: border-color 0.25s, box-shadow 0.25s;
  }

  @media (max-width: 639px) {
    .e360-col {
      width: 100%;
      border-radius: 16px;
    }
  }

  @media (min-width: 640px) and (max-width: 1279px) {
    .e360-col {
      scroll-snap-align: start;
      flex-shrink: 0;
    }
  }

  @media (min-width: 1280px) { .e360-col { width: auto; } }

  .e360-col.drag-over {
    border-color: var(--col-glow);
    box-shadow: 0 0 0 2px var(--col-glow), 0 32px 80px rgba(0,0,0,0.6);
  }

  /* ── Column header ── */
  .e360-header {
    padding: 12px 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
  }

  @media (min-width: 768px) {
    .e360-header { padding: 14px 16px; }
  }

  .e360-header::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--col-gradient);
    opacity: 0.18;
  }

  .e360-header::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 1px;
    background: var(--col-gradient);
    opacity: 0.4;
  }

  .e360-header-left {
    display: flex;
    align-items: center;
    gap: 10px;
    position: relative;
    z-index: 1;
  }

  .e360-stage-icon {
    width: 30px; height: 30px;
    border-radius: 8px;
    background: var(--col-gradient);
    display: flex; align-items: center; justify-content: center;
    font-size: 13px;
    box-shadow: 0 0 14px var(--col-glow);
  }

  .e360-stage-name {
    font-family: 'Outfit', sans-serif;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #fff;
  }

  .e360-count {
    position: relative; z-index: 1;
    min-width: 26px; height: 26px; padding: 0 8px;
    border-radius: 20px;
    background: var(--col-badge-bg);
    color: var(--col-badge-text);
    font-size: 11px;
    font-weight: 700;
    display: flex; align-items: center; justify-content: center;
    border: 1px solid var(--col-glow);
    font-family: 'Outfit', sans-serif;
    box-shadow: 0 0 10px var(--col-glow);
  }

  /* ── Column body ── */
  .e360-body {
    padding: 14px;
    min-height: 440px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  @media (max-width: 639px) {
    .e360-body { min-height: 140px; padding: 12px; }
    .e360-empty { min-height: 80px; }
  }

  /* ── Empty drop zone ── */
  .e360-empty {
    flex: 1;
    min-height: 120px;
    border: 1.5px dashed rgba(255,255,255,0.08);
    border-radius: 14px;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    gap: 8px;
    color: rgba(255,255,255,0.2);
    font-size: 12px;
    font-weight: 500;
    transition: border-color 0.2s, color 0.2s;
  }

  .e360-col.drag-over .e360-empty {
    border-color: var(--col-glow);
    color: var(--col-badge-text);
  }

  .e360-empty-icon {
    font-size: 22px;
    opacity: 0.35;
  }

  /* ── Card ── */
  .e360-card {
    border-radius: 14px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.07);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    overflow: hidden;
    cursor: grab;
    position: relative;
    transition: transform 0.22s cubic-bezier(.2,.8,.3,1.2),
                box-shadow 0.22s,
                border-color 0.22s;
    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
  }

  .e360-card::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 3px;
    background: var(--col-gradient);
    border-radius: 3px 0 0 3px;
    box-shadow: 0 0 10px var(--col-glow);
    transition: width 0.22s;
  }

  .e360-card:hover {
    transform: translateY(-3px) scale(1.015);
    border-color: rgba(255,255,255,0.14);
    box-shadow: 0 18px 50px rgba(0,0,0,0.6), 0 0 0 1px var(--col-border);
  }

  .e360-card:hover::before { width: 4px; }
  .e360-card:active { cursor: grabbing; transform: scale(0.97); opacity: 0.85; }

  .e360-card-inner { padding: 14px 14px 14px 18px; }

  /* ── Card: lead row ── */
  .e360-lead-row {
    display: flex;
    align-items: center;
    gap: 11px;
  }

  .e360-avatar {
    flex-shrink: 0;
    width: 40px; height: 40px;
    border-radius: 12px;
    background: var(--col-gradient);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Outfit', sans-serif;
    font-size: 13px;
    font-weight: 700;
    color: #fff;
    box-shadow: 0 4px 14px var(--col-glow);
    letter-spacing: 0.04em;
  }

  .e360-lead-name {
    font-family: 'Outfit', sans-serif;
    font-size: 14px;
    font-weight: 600;
    color: #F0F4FF;
    line-height: 1.3;
  }

  .e360-agent {
    font-size: 11px;
    color: rgba(255,255,255,0.38);
    margin-top: 2px;
  }

  /* ── Card: source ── */
  .e360-source {
    margin-top: 10px;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 11px;
    color: rgba(255,255,255,0.4);
    background: rgba(255,255,255,0.04);
    padding: 4px 10px;
    border-radius: 20px;
    border: 1px solid rgba(255,255,255,0.07);
  }

  /* ── Card: tags ── */
  .e360-tags {
    margin-top: 10px;
    display: flex; flex-wrap: wrap; gap: 6px;
  }

  .e360-tag {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    padding: 3px 9px;
    border-radius: 20px;
    background: rgba(255,255,255,0.05);
    color: rgba(255,255,255,0.55);
    border: 1px solid rgba(255,255,255,0.1);
  }

  /* ── Card: footer ── */
  .e360-footer {
    margin-top: 12px;
    padding-top: 10px;
    border-top: 1px solid rgba(255,255,255,0.06);
    display: flex; align-items: center; justify-content: space-between;
  }

  .e360-priority {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 3px 10px;
    border-radius: 20px;
  }

  .e360-days {
    display: flex; align-items: center; gap: 5px;
    font-size: 11px;
    color: rgba(255,255,255,0.35);
  }

  .e360-days-dot {
    width: 5px; height: 5px; border-radius: 50%;
    background: var(--col-glow);
    box-shadow: 0 0 6px var(--col-glow);
  }
`;

const LeadList = () => {
  const { leads, fetchLeads } = useContext(LeadContext);

  const leadsByStatus = (leads || []).reduce((acc, curr) => {
    if (!acc[curr.status]) acc[curr.status] = [];
    acc[curr.status].push(curr);
    return acc;
  }, {});

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add("drag-over");
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove("drag-over");
  };

  const updateStatus = async (e, status) => {
    e.currentTarget.classList.remove("drag-over");
    try {
      const leadId = e.dataTransfer.getData("leadId");
      await axios.patch(`${BASE_URL}/leads/edit/status/${leadId}`, { status });
      fetchLeads();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <style>{css}</style>

      <div className="e360-board">
        <div className="e360-cols">
          {FUNNEL_STAGES.map((stage) => {
            const cfg = stageConfig[stage] || stageConfig["New"];
            const stagLeads = leadsByStatus[stage] || [];

            return (
              <div
                key={stage}
                className="e360-col"
                style={{
                  "--col-glow": cfg.glow,
                  "--col-gradient": cfg.gradient,
                  "--col-border": cfg.border,
                  "--col-badge-bg": cfg.badgeBg,
                  "--col-badge-text": cfg.badgeText,
                }}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => updateStatus(e, stage)}
              >
                {/* HEADER */}
                <div className="e360-header">
                  <div className="e360-header-left">
                    <div className="e360-stage-icon">{cfg.icon}</div>
                    <span className="e360-stage-name">{stage}</span>
                  </div>
                  <span className="e360-count">{stagLeads.length}</span>
                </div>

                {/* BODY */}
                <div className="e360-body">
                  {stagLeads.length === 0 ? (
                    <div className="e360-empty">
                      <span className="e360-empty-icon">⊕</span>
                      Drop leads here
                    </div>
                  ) : (
                    stagLeads.map((lead) => {
                      const pCfg =
                        priorityConfig[lead.priority] || priorityConfig["Low"];
                      const initials = lead.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase();

                      return (
                        <div
                          key={lead._id}
                          className="e360-card"
                          draggable
                          onDragStart={(e) =>
                            e.dataTransfer.setData("leadId", lead._id)
                          }
                        >
                          <div className="e360-card-inner">
                            {/* Name + agent */}
                            <div className="e360-lead-row">
                              <div className="e360-avatar">{initials}</div>
                              <div>
                                <div className="e360-lead-name">
                                  {lead.name}
                                </div>
                                <div className="e360-agent">
                                  {lead.salesAgent?.name}
                                </div>
                              </div>
                            </div>

                            {/* Source */}
                            <div className="e360-source">
                              <span>📍</span>
                              {lead.source}
                            </div>

                            {/* Tags */}
                            {lead.tags?.length > 0 && (
                              <div className="e360-tags">
                                {lead.tags.map((tag) => (
                                  <span key={tag} className="e360-tag">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}

                            {/* Footer */}
                            <div className="e360-footer">
                              <span
                                className="e360-priority"
                                style={{
                                  color: pCfg.color,
                                  background: pCfg.bg,
                                  border: `1px solid ${pCfg.color}40`,
                                  boxShadow: `0 0 8px ${pCfg.color}30`,
                                }}
                              >
                                {pCfg.label}
                              </span>

                              <span className="e360-days">
                                <span className="e360-days-dot" />
                                {lead.timeToClose}d to close
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default LeadList;
