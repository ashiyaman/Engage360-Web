import { useContext } from "react";
import { LeadContext } from "../contexts/LeadContext";
import getAnalytics from "../utils/analytics";

const apCss = `
  .ap-card {
    background: rgba(15,20,40,0.7);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 18px;
    padding: 20px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
  }

  .ap-title {
    font-family: 'Outfit', sans-serif;
    font-size: 14px;
    font-weight: 700;
    color: #F0F4FF;
    margin-bottom: 16px;
  }

  .ap-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 11px 14px;
    border-radius: 12px;
    margin-bottom: 8px;
    border: 1px solid transparent;
    transition: all 0.18s;
  }

  .ap-row:last-of-type { margin-bottom: 0; }

  .ap-row-stalled {
    background: rgba(255,77,109,0.07);
    border-color: rgba(255,77,109,0.18);
  }

  .ap-row-priority {
    background: rgba(251,146,60,0.07);
    border-color: rgba(251,146,60,0.18);
  }

  .ap-row-forward {
    background: rgba(52,211,153,0.07);
    border-color: rgba(52,211,153,0.18);
  }

  .ap-row-left {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .ap-icon-wrap {
    width: 30px; height: 30px;
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-size: 15px;
    flex-shrink: 0;
  }

  .ap-icon-stalled  { background: rgba(255,77,109,0.15); }
  .ap-icon-priority { background: rgba(251,146,60,0.15); }
  .ap-icon-forward  { background: rgba(52,211,153,0.15); }

  .ap-row-label {
    font-size: 13px;
    font-weight: 600;
    color: rgba(255,255,255,0.75);
    font-family: 'Outfit', sans-serif;
  }

  .ap-count {
    font-family: 'Outfit', sans-serif;
    font-size: 18px;
    font-weight: 800;
    line-height: 1;
  }

  .ap-count-stalled  { color: #FF4D6D; }
  .ap-count-priority { color: #FB923C; }
  .ap-count-forward  { color: #34D399; }

  .ap-empty {
    font-size: 13px;
    color: rgba(255,255,255,0.3);
    text-align: center;
    padding: 20px 0;
  }
`;

const AttentionPanel = () => {
  const { leads } = useContext(LeadContext);
  const { forwardedLeads, stalledLeadsCount, stalledPriorityLeads } = getAnalytics(leads);

  const hasAnything =
    stalledLeadsCount > 0 ||
    stalledPriorityLeads.length > 0 ||
    forwardedLeads.length > 0;

  return (
    <>
      <style>{apCss}</style>
      <div className="ap-card">
        <div className="ap-title">Needs Attention</div>

        {!hasAnything && (
          <div className="ap-empty">No alerts — everything looks good 🎉</div>
        )}

        {stalledLeadsCount > 0 && (
          <div className="ap-row ap-row-stalled">
            <div className="ap-row-left">
              <div className="ap-icon-wrap ap-icon-stalled">⚠</div>
              <span className="ap-row-label">Stalled Leads</span>
            </div>
            <span className="ap-count ap-count-stalled">{stalledLeadsCount}</span>
          </div>
        )}

        {stalledPriorityLeads.length > 0 && (
          <div className="ap-row ap-row-priority">
            <div className="ap-row-left">
              <div className="ap-icon-wrap ap-icon-priority">🔥</div>
              <span className="ap-row-label">High Priority Stalled</span>
            </div>
            <span className="ap-count ap-count-priority">
              {stalledPriorityLeads.length}
            </span>
          </div>
        )}

        {forwardedLeads.length > 0 && (
          <div className="ap-row ap-row-forward">
            <div className="ap-row-left">
              <div className="ap-icon-wrap ap-icon-forward">↑</div>
              <span className="ap-row-label">Moved This Week</span>
            </div>
            <span className="ap-count ap-count-forward">{forwardedLeads.length}</span>
          </div>
        )}
      </div>
    </>
  );
};

export default AttentionPanel;
