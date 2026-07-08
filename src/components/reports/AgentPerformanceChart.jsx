import { useContext } from "react";
import getAnalytics from "../../utils/analytics";
import { LeadContext } from "../../contexts/LeadContext";

const agentCss = `
  .apt-table-wrap {
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .apt-table {
    width: 100%;
    border-collapse: collapse;
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 13px;
  }

  /* ── Header ── */
  .apt-table thead tr {
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }

  .apt-table th {
    font-family: 'Outfit', sans-serif;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.35);
    padding: 0 16px 12px;
    text-align: left;
    white-space: nowrap;
  }

  .apt-table th:first-child { padding-left: 0; }
  .apt-table th:not(:first-child) { text-align: right; }

  /* ── Body rows ── */
  .apt-table tbody tr {
    border-bottom: 1px solid rgba(255,255,255,0.04);
    transition: background 0.15s;
  }

  .apt-table tbody tr:last-child { border-bottom: none; }

  .apt-table tbody tr:hover {
    background: rgba(255,255,255,0.03);
  }

  .apt-table td {
    padding: 14px 16px;
    vertical-align: middle;
  }

  .apt-table td:first-child { padding-left: 0; }
  .apt-table td:not(:first-child) { text-align: right; }

  /* ── Agent name cell ── */
  .apt-agent-cell {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .apt-avatar {
    width: 32px;
    height: 32px;
    border-radius: 9px;
    background: linear-gradient(135deg,#7C3AED,#A78BFA);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Outfit', sans-serif;
    font-size: 11px;
    font-weight: 700;
    color: #fff;
    flex-shrink: 0;
    box-shadow: 0 4px 10px rgba(124,58,237,0.4);
  }

  .apt-agent-name {
    font-family: 'Outfit', sans-serif;
    font-size: 13.5px;
    font-weight: 600;
    color: #F0F4FF;
    white-space: nowrap;
  }

  /* ── Metric cell: number + mini bar ── */
  .apt-metric {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 5px;
    min-width: 56px;
  }

  .apt-metric-value {
    font-family: 'Outfit', sans-serif;
    font-size: 14px;
    font-weight: 700;
    color: #F0F4FF;
    line-height: 1;
  }

  .apt-bar-track {
    width: 100%;
    height: 3px;
    border-radius: 99px;
    background: rgba(255,255,255,0.06);
    overflow: hidden;
  }

  .apt-bar-fill {
    height: 100%;
    border-radius: 99px;
    transition: width 0.4s cubic-bezier(.4,0,.2,1);
  }

  /* ── Empty state ── */
  .apt-empty {
    padding: 32px 0;
    text-align: center;
    color: rgba(255,255,255,0.2);
    font-size: 13px;
  }

  /* ── Mobile: hide stalled column on very small screens ── */
  @media (max-width: 480px) {
    .apt-col-stalled { display: none; }
  }
`;

const METRIC_COLORS = {
  total:   "#A78BFA",
  high:    "#FF4D6D",
  stalled: "#FB923C",
  closed:  "#34D399",
};

const initials = (name) =>
  name?.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() || "?";

const AgentPerformanceChart = () => {
  const { leads } = useContext(LeadContext);
  const { agentPerformance } = getAnalytics(leads);

  const data = Object.values(agentPerformance).sort(
    (a, b) => b.total - a.total
  );

  // column maxes for proportional bar widths
  const maxTotal   = Math.max(...data.map((a) => a.total),   1);
  const maxHigh    = Math.max(...data.map((a) => a.high),    1);
  const maxStalled = Math.max(...data.map((a) => a.stalled), 1);
  const maxClosed  = Math.max(...data.map((a) => a.closed),  1);

  const barWidth = (value, max) => `${Math.round((value / max) * 100)}%`;

  return (
    <>
      <style>{agentCss}</style>

      <div className="rpt-card">
        <div className="rpt-card-eyebrow">Team</div>
        <div className="rpt-card-title">Agent Performance</div>

        {data.length === 0 ? (
          <div className="apt-empty">No agent data yet.</div>
        ) : (
          <div className="apt-table-wrap">
            <table className="apt-table">
              <thead>
                <tr>
                  <th>Agent</th>
                  <th>Total</th>
                  <th>High Priority</th>
                  <th className="apt-col-stalled">Stalled</th>
                  <th>Closed</th>
                </tr>
              </thead>
              <tbody>
                {data.map((agent) => (
                  <tr key={agent?.name}>
                    {/* Agent name */}
                    <td>
                      <div className="apt-agent-cell">
                        <div className="apt-avatar">{initials(agent?.name)}</div>
                        <span className="apt-agent-name">{agent?.name}</span>
                      </div>
                    </td>

                    {/* Total */}
                    <td>
                      <div className="apt-metric">
                        <span className="apt-metric-value">{agent.total}</span>
                        <div className="apt-bar-track">
                          <div
                            className="apt-bar-fill"
                            style={{
                              width: barWidth(agent.total, maxTotal),
                              background: METRIC_COLORS.total,
                            }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* High Priority */}
                    <td>
                      <div className="apt-metric">
                        <span
                          className="apt-metric-value"
                          style={{ color: agent.high > 0 ? METRIC_COLORS.high : "#F0F4FF" }}
                        >
                          {agent.high}
                        </span>
                        <div className="apt-bar-track">
                          <div
                            className="apt-bar-fill"
                            style={{
                              width: barWidth(agent.high, maxHigh),
                              background: METRIC_COLORS.high,
                            }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Stalled */}
                    <td className="apt-col-stalled">
                      <div className="apt-metric">
                        <span
                          className="apt-metric-value"
                          style={{ color: agent.stalled > 0 ? METRIC_COLORS.stalled : "#F0F4FF" }}
                        >
                          {agent.stalled}
                        </span>
                        <div className="apt-bar-track">
                          <div
                            className="apt-bar-fill"
                            style={{
                              width: barWidth(agent.stalled, maxStalled),
                              background: METRIC_COLORS.stalled,
                            }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Closed */}
                    <td>
                      <div className="apt-metric">
                        <span
                          className="apt-metric-value"
                          style={{ color: agent.closed > 0 ? METRIC_COLORS.closed : "#F0F4FF" }}
                        >
                          {agent.closed}
                        </span>
                        <div className="apt-bar-track">
                          <div
                            className="apt-bar-fill"
                            style={{
                              width: barWidth(agent.closed, maxClosed),
                              background: METRIC_COLORS.closed,
                            }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default AgentPerformanceChart;
