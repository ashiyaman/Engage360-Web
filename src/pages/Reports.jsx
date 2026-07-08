import AgentPerformanceChart from "../components/reports/AgentPerformanceChart";
import ForwardedLeadsChart from "../components/reports/ForwardedLeadsChart";
import LeadsByStatusChart from "../components/reports/LeadsByStatusChart";
import LeadsPipelineChart from "../components/reports/LeadsPipelineChart";
import PriorityDistributionChart from "../components/reports/PriorityDistributionChart";

const reportsCss = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');

  .rpt-page {
    font-family: 'Inter', system-ui, sans-serif;
    padding: 20px 16px 56px;
    width: 100%;
  }

  @media (min-width: 768px) {
    .rpt-page { padding: 28px 32px 64px; }
  }

  /* ── Page header ── */
  .rpt-topbar {
    margin-bottom: 28px;
  }

  .rpt-eyebrow {
    font-family: 'Outfit', sans-serif;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(56,189,248,0.75);
    margin-bottom: 5px;
  }

  .rpt-title {
    font-family: 'Outfit', sans-serif;
    font-size: 24px;
    font-weight: 800;
    color: #F0F4FF;
    letter-spacing: -0.02em;
  }

  @media (min-width: 768px) {
    .rpt-title { font-size: 28px; }
  }

  .rpt-subtitle {
    font-size: 13px;
    color: rgba(255,255,255,0.35);
    margin-top: 3px;
  }

  /* ── Grid layouts ── */
  /* Top row: 2 pie charts side by side on md+ */
  .rpt-grid-2 {
    display: grid;
    grid-template-columns: 1fr;
    gap: 18px;
    margin-bottom: 18px;
  }

  @media (min-width: 768px) {
    .rpt-grid-2 { grid-template-columns: 1fr 1fr; }
  }

  /* Bottom: full width charts */
  .rpt-grid-1 {
    display: grid;
    grid-template-columns: 1fr;
    gap: 18px;
  }

  /* ── Shared chart card ── */
  .rpt-card {
    background: rgba(15,20,40,0.7);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 18px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.45);
    padding: 20px 20px 24px;
    overflow: hidden;
  }

  .rpt-card-eyebrow {
    font-family: 'Outfit', sans-serif;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.3);
    margin-bottom: 4px;
  }

  .rpt-card-title {
    font-family: 'Outfit', sans-serif;
    font-size: 15px;
    font-weight: 700;
    color: #F0F4FF;
    margin-bottom: 18px;
  }

  .rpt-divider {
    height: 1px;
    background: rgba(255,255,255,0.06);
    margin: 18px 0;
  }

  /* ── Recharts global overrides ── */
  .recharts-text { fill: rgba(255,255,255,0.5) !important; font-family: 'Inter', sans-serif !important; font-size: 12px !important; }
  .recharts-cartesian-grid-horizontal line,
  .recharts-cartesian-grid-vertical line { stroke: rgba(255,255,255,0.06) !important; }
  .recharts-tooltip-wrapper .recharts-default-tooltip {
    background: rgba(13,17,34,0.95) !important;
    border: 1px solid rgba(255,255,255,0.1) !important;
    border-radius: 10px !important;
    font-family: 'Inter', sans-serif !important;
  }
  .recharts-legend-item-text { color: rgba(255,255,255,0.55) !important; font-size: 12px !important; }
`;

const Reports = () => {
  return (
    <>
      <style>{reportsCss}</style>

      <div className="rpt-page">
        <div className="rpt-topbar">
          <div className="rpt-eyebrow">Analytics</div>
          <h1 className="rpt-title">Reports</h1>
          <p className="rpt-subtitle">Pipeline health and team performance at a glance.</p>
        </div>

        {/* Row 1: two pie charts */}
        <div className="rpt-grid-2">
          <LeadsPipelineChart />
          <ForwardedLeadsChart />
        </div>

        <div className="rpt-divider" />

        {/* Row 2: full-width charts */}
        <div className="rpt-grid-1">
          <LeadsByStatusChart />
          <AgentPerformanceChart />
        </div>

        <PriorityDistributionChart />
      </div>
    </>
  );
};

export default Reports;
