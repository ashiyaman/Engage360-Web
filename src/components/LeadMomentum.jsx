import { useContext } from "react";
import { LeadContext } from "../contexts/LeadContext";
import getAnalytics from "../utils/analytics";

const momentumCss = `
  .lm-card {
    background: rgba(15,20,40,0.7);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 18px;
    padding: 20px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
  }

  .lm-title {
    font-family: 'Outfit', sans-serif;
    font-size: 14px;
    font-weight: 700;
    color: #F0F4FF;
    margin-bottom: 2px;
  }

  .lm-subtitle {
    font-size: 11px;
    color: rgba(255,255,255,0.35);
    margin-bottom: 18px;
  }

  .lm-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 14px;
    border-radius: 11px;
    margin-bottom: 8px;
  }

  .lm-row:last-of-type { margin-bottom: 0; }

  .lm-row-forward {
    background: rgba(52,211,153,0.08);
    border: 1px solid rgba(52,211,153,0.2);
  }

  .lm-row-stalled {
    background: rgba(255,77,109,0.08);
    border: 1px solid rgba(255,77,109,0.2);
  }

  .lm-row-left {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: rgba(255,255,255,0.7);
  }

  .lm-icon { font-size: 15px; }

  .lm-count {
    font-family: 'Outfit', sans-serif;
    font-size: 22px;
    font-weight: 800;
    line-height: 1;
  }

  .lm-count-forward { color: #34D399; text-shadow: 0 0 14px rgba(52,211,153,0.5); }
  .lm-count-stalled { color: #FF4D6D; text-shadow: 0 0 14px rgba(255,77,109,0.5); }

  .lm-footer {
    margin-top: 14px;
    padding-top: 12px;
    border-top: 1px solid rgba(255,255,255,0.06);
    font-size: 12px;
    font-weight: 600;
    font-family: 'Outfit', sans-serif;
  }

  .lm-healthy { color: #34D399; }
  .lm-warning { color: #FB923C; }
`;

const LeadMomentum = () => {
  const { leads } = useContext(LeadContext);
  const { forwardedLeads, stalledLeads } = getAnalytics(leads);
  const healthy = forwardedLeads.length >= stalledLeads.length;

  return (
    <>
      <style>{momentumCss}</style>
      <div className="lm-card">
        <div className="lm-title">Lead Momentum</div>
        <div className="lm-subtitle">Past 7 days</div>

        <div className="lm-row lm-row-forward">
          <span className="lm-row-left">
            <span className="lm-icon">▲</span>
            Moved forward
          </span>
          <span className={`lm-count lm-count-forward`}>
            {forwardedLeads.length}
          </span>
        </div>

        <div className="lm-row lm-row-stalled">
          <span className="lm-row-left">
            <span className="lm-icon">▼</span>
            Stalled
          </span>
          <span className={`lm-count lm-count-stalled`}>
            {stalledLeads.length}
          </span>
        </div>

        <div className="lm-footer">
          {healthy
            ? <span className="lm-healthy">🟢 Healthy Pipeline</span>
            : <span className="lm-warning">🟡 Needs Attention</span>
          }
        </div>
      </div>
    </>
  );
};

export default LeadMomentum;

