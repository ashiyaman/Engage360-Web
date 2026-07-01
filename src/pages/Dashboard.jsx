// // import { useContext, useMemo, useState } from "react";

// import { LeadContext } from "../contexts/LeadContext";
// import StatsBar from "../components/StatsBar";
// import LeadMomentum from "../components/leadMomentum";
// import FunnelComponent from "../components/FunnelComponent";
// import AttentionPanel from "../components/AttentionPanel";
// import ActivityFeed from "../components/ActivityFeed";

// import { ONE_WEEK_MS } from "../utils/constants";
// import LeadList from "../components/leads/LeadList";
// import AddLeadForm from "../components/leads/AddLeadForm";

// const Dashboard = () => {
//   const { leads } = useContext(LeadContext);
//   const [showAddLeadForm, setShowLeadForm] = useState(false);

//   //To get leads under each status
//   const analytics = useMemo(() => {
//     const forwardedLeads = leads.filter((lead) => {
//       const updatedAt = new Date(lead.updatedAt).getTime();
//       if (isNaN(updatedAt)) return 0;
//       return lead.status !== "Closed" && Date.now() - updatedAt < ONE_WEEK_MS;
//     });

//     const stalledPriorityLeads = leads.filter((lead) => {
//       const updatedAt = new Date(lead.updatedAt).getTime();

//       return lead.priority === "High" && Date.now() - updatedAt > ONE_WEEK_MS;
//     });

//     const stalledLeads = leads.filter((lead) => {
//       const updatedAt = new Date(lead.updatedAt).getTime();

//       return lead.status !== "Closed" && Date.now() - updatedAt >= ONE_WEEK_MS;
//     });

//     const stalledLeadsCount = stalledLeads.length;

//     const stats = (leads || []).reduce((acc, lead) => {
//       acc[lead.status] = (acc[lead.status] || 0) + 1;
//       return acc;
//     }, {});

//     return {
//       stats,
//       forwardedLeads,
//       stalledPriorityLeads,
//       stalledLeadsCount
//     };
//   }, [leads]);

//   const handleShowLeadForm = () => {
//     setShowLeadForm(true);
//   };

//   return (
//     <div className="w-full px-4">

//       {/* Modal overlay — only mounts when clicked on Add lead button ard stays mounted behind it */}
//       {showAddLeadForm && (
//         <AddLeadForm onClose={() => setShowLeadForm(false)} />
//       )}

//       <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
//         <div>
//           <h1 className="text-xl font-bold">Dashboard</h1>
//           <p className="text-gray-500">Welcome back!</p>
//         </div>

//         <button
//           onClick={handleShowLeadForm}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer"
//         >
//           + Add Lead
//         </button>
//       </div>
//       <section className="py-10">
//         <StatsBar stats={analytics.stats} />
//         <LeadMomentum
//           forwardedLeads={analytics.forwardedLeads.length}
//           stalledLeads={analytics.stalledLeadsCount}
//         />
//       </section>
//       <FunnelComponent stats={analytics.stats} />
//       <>
//         {/* <ul className="bg-blue-500">
//           {leads &&
//             leads.map((lead) => (
//               <li key={lead._id} className="border-2 m-2">
//                 <h5>{lead.name}</h5>
//                 <p>Status: {lead.status}</p>
//                 <p>Priority: {lead.priority}</p>
//               </li>
//             ))}
//         </ul> */}
//         <AttentionPanel
//           forwardedLeads={analytics.forwardedLeads}
//           stalledPriorityLeads={analytics.stalledPriorityLeads}
//           stalledLeadsCount={analytics.stalledLeadsCount}
//         />
//       </>
//       {/* <ActivityFeed /> */}
//     </div>
//   );
// };

// export default Dashboard;




import { useContext, useMemo, useState } from "react";

import { LeadContext } from "../contexts/LeadContext";
import StatsBar from "../components/StatsBar";
import LeadMomentum from "../components/leadMomentum";
import FunnelComponent from "../components/FunnelComponent";
import AttentionPanel from "../components/AttentionPanel";
import ActivityFeed from "../components/ActivityFeed";
import LeadList from "../components/leads/LeadList";
import AddLeadForm from "../components/leads/AddLeadForm";

import { ONE_WEEK_MS } from "../utils/constants";

const dashCss = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');

  /* ── Page shell ── */
  .dash-page {
    font-family: 'Inter', system-ui, sans-serif;
    padding: 20px 16px 56px;
    width: 100%;
  }

  @media (min-width: 768px) {
    .dash-page { padding: 28px 32px 64px; }
  }

  /* ── Top bar: title + CTA ── */
  .dash-topbar {
    display: flex;
    flex-direction: column;
    gap: 14px;
    margin-bottom: 28px;
  }

  @media (min-width: 640px) {
    .dash-topbar {
      flex-direction: row;
      align-items: flex-start;
      justify-content: space-between;
    }
  }

  .dash-eyebrow {
    font-family: 'Outfit', sans-serif;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(167,139,250,0.75);
    margin-bottom: 5px;
  }

  .dash-title {
    font-family: 'Outfit', sans-serif;
    font-size: 24px;
    font-weight: 800;
    color: #F0F4FF;
    letter-spacing: -0.02em;
    line-height: 1.15;
  }

  @media (min-width: 768px) {
    .dash-title { font-size: 28px; }
  }

  .dash-subtitle {
    font-size: 13px;
    color: rgba(255,255,255,0.35);
    margin-top: 3px;
  }

  /* ── Add Lead button ── */
  .dash-add-btn {
    font-family: 'Outfit', sans-serif;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.04em;
    padding: 10px 20px;
    border-radius: 12px;
    cursor: pointer;
    border: 1px solid transparent;
    background: linear-gradient(135deg, #7C3AED, #A78BFA);
    color: #fff;
    box-shadow: 0 6px 22px rgba(124,58,237,0.4);
    transition: all 0.18s;
    display: inline-flex;
    align-items: center;
    gap: 7px;
    white-space: nowrap;
    align-self: flex-start;
  }

  .dash-add-btn:hover {
    box-shadow: 0 8px 28px rgba(124,58,237,0.65);
    transform: translateY(-1px);
  }

  .dash-add-btn:active {
    transform: scale(0.97);
  }

  .dash-add-icon {
    font-size: 18px;
    font-weight: 300;
    line-height: 1;
  }

  /* ── Divider between sections ── */
  .dash-divider {
    height: 1px;
    background: rgba(255,255,255,0.06);
    margin: 28px 0;
  }

  /* ── Section label ── */
  .dash-section-label {
    font-family: 'Outfit', sans-serif;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.3);
    margin-bottom: 14px;
  }

  /* ── Stats + momentum row ── */
  .dash-analytics {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 28px;
  }

  @media (min-width: 1024px) {
    .dash-analytics {
      flex-direction: row;
      align-items: flex-start;
      gap: 20px;
    }
    .dash-analytics-primary { flex: 1; }
    .dash-analytics-secondary { width: 280px; flex-shrink: 0; }
  }

  /* ── Two-col layout: funnel + attention ── */
  .dash-mid {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 28px;
  }

  @media (min-width: 1024px) {
    .dash-mid {
      flex-direction: row;
      align-items: flex-start;
    }
    .dash-mid-funnel { flex: 1; }
    .dash-mid-attention { width: 320px; flex-shrink: 0; }
  }
`;

const Dashboard = () => {
  const { leads } = useContext(LeadContext);
  const [showAddLeadForm, setShowLeadForm] = useState(false);

  const analytics = useMemo(() => {
    const forwardedLeads = leads.filter((lead) => {
      const updatedAt = new Date(lead.updatedAt).getTime();
      if (isNaN(updatedAt)) return false;
      return lead.status !== "Closed" && Date.now() - updatedAt < ONE_WEEK_MS;
    });

    const stalledPriorityLeads = leads.filter((lead) => {
      const updatedAt = new Date(lead.updatedAt).getTime();
      return lead.priority === "High" && Date.now() - updatedAt > ONE_WEEK_MS;
    });

    const stalledLeads = leads.filter((lead) => {
      const updatedAt = new Date(lead.updatedAt).getTime();
      return lead.status !== "Closed" && Date.now() - updatedAt >= ONE_WEEK_MS;
    });

    const stats = (leads || []).reduce((acc, lead) => {
      acc[lead.status] = (acc[lead.status] || 0) + 1;
      return acc;
    }, {});

    return {
      stats,
      forwardedLeads,
      stalledPriorityLeads,
      stalledLeadsCount: stalledLeads.length,
      closedLeadsCount: leads.length - forwardedLeads.length
    };
  }, [leads]);

  return (
    <>
      <style>{dashCss}</style>

      {/* Bug fix: was <showAddLeadForm> (lowercase = HTML element, not a component) */}
      {showAddLeadForm && (
        <AddLeadForm onClose={() => setShowLeadForm(false)} />
      )}

      <div className="dash-page">

        {/* ── Top bar ── */}
        <div className="dash-topbar">
          <div>
            <div className="dash-eyebrow">Overview</div>
            <h1 className="dash-title">Dashboard</h1>
            <p className="dash-subtitle">Welcome back — here's what's moving.</p>
          </div>

          <button
            className="dash-add-btn"
            onClick={() => setShowLeadForm(true)}
          >
            <span className="dash-add-icon">＋</span>
            Add Lead
          </button>
        </div>

        {/* ── Stats + Momentum ── */}
        <div className="dash-analytics">
          <div className="dash-analytics-primary">
            <div className="dash-section-label">Pipeline at a glance</div>
            <StatsBar stats={analytics.stats} />
          </div>
          <div className="dash-analytics-secondary">
            <div className="dash-section-label">Momentum</div>
            <LeadMomentum
              forwardedLeads={analytics.forwardedLeads.length}
              stalledLeads={analytics.stalledLeadsCount}
            />
          </div>
        </div>

        <div className="dash-divider" />

        {/* ── Funnel + Attention ── */}
        <div className="dash-mid">
          <div className="dash-mid-funnel">
            <div className="dash-section-label">Funnel breakdown</div>
            <FunnelComponent stats={analytics.stats} />
          </div>
          <div className="dash-mid-attention">
            <div className="dash-section-label">Needs attention</div>
            <AttentionPanel
              forwardedLeads={analytics.forwardedLeads}
              stalledPriorityLeads={analytics.stalledPriorityLeads}
              stalledLeadsCount={analytics.stalledLeadsCount}
            />
          </div>
        </div>

      </div>
    </>
  );
};

export default Dashboard;
