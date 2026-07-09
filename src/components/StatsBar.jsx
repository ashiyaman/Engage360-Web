import { useContext } from "react";
import { LeadContext } from "../contexts/LeadContext";
import getAnalytics from "../utils/analytics";
import {Link} from "react-router-dom";

const statsCss = `
  .sb-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  @media (min-width: 640px) {
    .sb-grid { grid-template-columns: repeat(3, 1fr); }
  }

  @media (min-width: 1024px) {
    .sb-grid { grid-template-columns: repeat(5, 1fr); }
  }

  .sb-card {
    background: rgba(15,20,40,0.7);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 16px;
    padding: 16px 18px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
    position: relative;
    overflow: hidden;
    transition: border-color 0.18s, box-shadow 0.18s;
    cursor: pointer;
  }

  .sb-card:hover {
    border-color: rgba(255,255,255,0.12);
    box-shadow: 0 12px 40px rgba(0,0,0,0.5);
  }

  .sb-card::before {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 2px;
    background: var(--sb-color, #A78BFA);
    opacity: 0.7;
  }

  .sb-label {
    font-family: 'Outfit', sans-serif;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.4);
    margin-bottom: 10px;
  }

  .sb-value {
    font-family: 'Outfit', sans-serif;
    font-size: 32px;
    font-weight: 800;
    color: var(--sb-color, #A78BFA);
    line-height: 1;
    text-shadow: 0 0 20px var(--sb-color, #A78BFA);
  }
`;

const STATUS_COLORS = {
  New:            "#38BDF8",
  Contacted:      "#A78BFA",
  Qualified:      "#F472B6",
  "Proposal Sent":"#FB923C",
  Closed:         "#34D399",
};

const StatsBar = () => {
  const { leads } = useContext(LeadContext);
  const { stats } = getAnalytics(leads);

  return (
    <>
      <style>{statsCss}</style>
      <ul className="sb-grid" style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {Object.entries(stats).map(([status, count]) => (
          <Link
            to="/leads"
            key={status}
            className="sb-card"
            style={{ "--sb-color": STATUS_COLORS[status] || "#A78BFA" }}
            
          >
            <div className="sb-label">{status}</div>
            <div className="sb-value">{count}</div>
          </Link>
        ))}
      </ul>
    </>
  );
};

export default StatsBar;

