import { useContext, useMemo, useState } from "react";

import { LeadContext } from "../contexts/LeadContext";
import StatsBar from "../components/StatsBar";
import LeadMomentum from "../components/leadMomentum";
import FunnelComponent from "../components/FunnelComponent";
import AttentionPanel from "../components/AttentionPanel";
import ActivityFeed from "../components/ActivityFeed";

import { ONE_WEEK_MS } from "../utils/constants";
import LeadList from "../components/leads/LeadList";
import AddLeadForm from "../components/leads/AddLeadForm";

const Dashboard = () => {
  const { leads } = useContext(LeadContext);
  const [showAddLeadForm, setShowLeadForm] = useState(false);

  //To get leads under each status
  const analytics = useMemo(() => {
    const forwardedLeads = leads.filter((lead) => {
      const updatedAt = new Date(lead.updatedAt).getTime();
      if (isNaN(updatedAt)) return 0;
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

    const stalledLeadsCount = stalledLeads.length;

    const stats = (leads || []).reduce((acc, lead) => {
      acc[lead.status] = (acc[lead.status] || 0) + 1;
      return acc;
    }, {});



    return {
      stats,
      forwardedLeads,
      stalledPriorityLeads,
      stalledLeadsCount
    };
  }, [leads]);

  const handleShowLeadForm = () => {
    setShowLeadForm(true);
  };

  return (
    <div className="w-full px-4">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 pt-25">
        <div>
          <h1 className="text-xl font-bold">Dashboard</h1>
          <p className="text-gray-500">Welcome back!</p>
        </div>

        <button
          onClick={handleShowLeadForm}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer"
        >
          + Add Lead
        </button>
      </div>
      <section className="py-10">
        <StatsBar stats={analytics.stats} />
        <LeadMomentum
          forwardedLeads={analytics.forwardedLeads.length}
          stalledLeads={analytics.stalledLeadsCount}
        />
      </section>
      <FunnelComponent stats={analytics.stats} />
      <>
        {/* <ul className="bg-blue-500">
          {leads &&
            leads.map((lead) => (
              <li key={lead._id} className="border-2 m-2">
                <h5>{lead.name}</h5>
                <p>Status: {lead.status}</p>
                <p>Priority: {lead.priority}</p>
              </li>
            ))}
        </ul> */}
        <AttentionPanel
          forwardedLeads={analytics.forwardedLeads}
          stalledPriorityLeads={analytics.stalledPriorityLeads}
          stalledLeadsCount={analytics.stalledLeadsCount}
        />
      </>
      {/* <ActivityFeed /> */}
    </div>
  );
};

export default Dashboard;
