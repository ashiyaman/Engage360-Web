import { useContext, useMemo, useState } from "react";

import { LeadContext } from "../contexts/LeadContext";
import StatsBar from "../components/StatsBar";
import LeadMomentum from "../components/leadMomentum";
import FunnelComponent from "../components/FunnelComponent";
import AttentionPanel from "../components/AttentionPanel";
import ActivityFeed from "../components/ActivityFeed";

import { ONE_WEEK_MS } from "../utils/constants";

const Dashboard = () => {
  const { leads } = useContext(LeadContext);

  //To get leads under each status
  const analytics = useMemo(() => {

    const forwardedLeads = leads.filter((lead) => {
      const updatedAt = new Date(lead.updatedAt).getTime();
      if (isNaN(updatedAt)) return 0;
      return ((Date.now() - updatedAt < ONE_WEEK_MS) && lead.status !== "Closed")
    });

    const stalledPriorityLeads = leads.filter(lead => lead.priority === "High")

    const stalledLeadsCount = leads.length - forwardedLeads.length

    const stats = (leads || []).reduce((acc, lead) => {
      acc[lead.status] = (acc[lead.status] || 0) + 1;
      return acc;
    }, {});

    return {
      stats,
      forwardedLeads,
      stalledPriorityLeads,
      stalledLeadsCount
    }
  }, [leads]);

  return (
    <div>
      <h1>Dashboard</h1>
      <section className="bg-yellow-300">
        <StatsBar stats={analytics.stats} />
        <LeadMomentum forwardedLeads={analytics.forwardedLeads} stalledLeads={analytics.stalledLeads}/>
      </section>
      <FunnelComponent stats={analytics.stats} />
      <>
        <ul className="bg-blue-500">
          {leads &&
            leads.map((lead) => (
              <li key={lead._id} className="border-2 m-2">
                <h5>{lead.name}</h5>
                <p>Status: {lead.status}</p>
                <p>Priority: {lead.priority}</p>
              </li>
            ))}
        </ul>
        <AttentionPanel 
          forwardedLeads = {analytics.forwardedLeads}
          stalledPriorityLeads = {analytics.stalledPriorityLeads}
          stalledLeadsCount = {analytics.stalledLeadsCount}
        />
      </>
      <ActivityFeed />
    </div>
  );
};

export default Dashboard;
