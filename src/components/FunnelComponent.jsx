import { Link } from "react-router-dom";
import { FUNNEL_STAGES } from "../utils/constants";
import { useContext } from "react";
import { LeadContext } from "../contexts/LeadContext";
import getAnalytics from "../utils/analytics";

const funnelCss = `
  .fn-card {
    background: rgba(15,20,40,0.7);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 18px;
    padding: 20px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
  }

  .fn-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .fn-title {
    font-family: 'Outfit', sans-serif;
    font-size: 14px;
    font-weight: 700;
    color: #F0F4FF;
  }

  .fn-link {
    font-size: 12px;
    font-weight: 600;
    color: #A78BFA;
    text-decoration: none;
    transition: color 0.18s;
  }

  .fn-link:hover { color: #C4B5FD; text-decoration: underline; }

  .fn-stage { margin-bottom: 14px; }
  .fn-stage:last-child { margin-bottom: 0; }

  .fn-stage-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6px;
  }

  .fn-stage-name {
    font-size: 12.5px;
    font-weight: 600;
    color: rgba(255,255,255,0.7);
    font-family: 'Outfit', sans-serif;
  }

  .fn-stage-count {
    font-size: 12.5px;
    font-weight: 700;
    color: var(--fn-color, #A78BFA);
    font-family: 'Outfit', sans-serif;
  }

  .fn-track {
    width: 100%;
    height: 6px;
    border-radius: 99px;
    background: rgba(255,255,255,0.06);
    overflow: hidden;
  }

  .fn-fill {
    height: 100%;
    border-radius: 99px;
    background: var(--fn-color, #A78BFA);
    box-shadow: 0 0 8px var(--fn-color, #A78BFA);
    transition: width 0.5s cubic-bezier(.4,0,.2,1);
  }
`;

const STAGE_COLORS = {
  New:             "#38BDF8",
  Contacted:       "#A78BFA",
  Qualified:       "#F472B6",
  "Proposal Sent": "#FB923C",
  Closed:          "#34D399",
};

const FunnelComponent = () => {
  const { leads } = useContext(LeadContext);
  const { stats } = getAnalytics(leads);
  const maxCount = Math.max(...Object.values(stats), 1);

  return (
    <>
      <style>{funnelCss}</style>
      <div className="fn-card">
        <div className="fn-header">
          <div className="fn-title">Pipeline Snapshot</div>
          <Link to="/leads" className="fn-link">View Pipeline →</Link>
        </div>

        {FUNNEL_STAGES.map((stage) => {
          const count = stats[stage] || 0;
          const width = (count / maxCount) * 100;
          const color = STAGE_COLORS[stage];

          return (
            <div key={stage} className="fn-stage" style={{ "--fn-color": color }}>
              <div className="fn-stage-row">
                <span className="fn-stage-name">{stage}</span>
                <span className="fn-stage-count">{count}</span>
              </div>
              <div className="fn-track">
                <div className="fn-fill" style={{ width: `${width}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default FunnelComponent;

