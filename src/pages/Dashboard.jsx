import { useContext, useMemo, useState } from "react";

import { LeadContext } from "../contexts/LeadContext";
import StatsBar from "../components/StatsBar";
import LeadMomentum from "../components/leadMomentum";
import FunnelComponent from "../components/FunnelComponent";
import AttentionPanel from "../components/AttentionPanel";
import ActivityFeed from "../components/ActivityFeed";

import { ONE_WEEK_MS } from "../utils/constants";
import LeadList from "../components/leads/LeadList";
import AddLeadForm  from "../components/leads/AddLeadForm";

const Dashboard = () => {
  const { leads } = useContext(LeadContext);
  const [showAddLeadForm, setShowLeadForm] = useState(false)

  //To get leads under each status
  const analytics = useMemo(() => {

    const forwardedLeads = leads.filter((lead) => {
      const updatedAt = new Date(lead.updatedAt).getTime();
      if (isNaN(updatedAt)) return 0;
      return (
        lead.status !== "Closed" &&
        Date.now() - updatedAt < ONE_WEEK_MS)
    });

    const stalledPriorityLeads = leads.filter(lead => {
      const updatedAt = new Date(lead.updatedAt).getTime();

      return(
        lead.priority === "High" &&
        Date.now() - updatedAt > ONE_WEEK_MS
      )      
    })

    const stalledLeads = leads.filter(lead => {
      const updatedAt = new Date(lead.updatedAt).getTime();

      return(
        lead.status !== "Closed" &&
        Date.now() - updatedAt >= ONE_WEEK_MS
      )
    })
  
    console.log(stalledLeads)
    const stalledLeadsCount = stalledLeads.length

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

  const handleShowLeadForm = () => {
    setShowLeadForm(true)
  }

  return (
    <div className="w-full px-4">
      <section className="py-10">
        <StatsBar stats={analytics.stats} />
        <LeadMomentum forwardedLeads={analytics.forwardedLeads.length} stalledLeads={analytics.stalledLeadsCount}/>
      </section>
      <FunnelComponent stats={analytics.stats} />
      <>
      <LeadList />
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
          forwardedLeads = {analytics.forwardedLeads}
          stalledPriorityLeads = {analytics.stalledPriorityLeads}
          stalledLeadsCount = {analytics.stalledLeadsCount}
        />
      </>
      <ActivityFeed />
      <button onClick={handleShowLeadForm}>Add Lead</button>
      {showAddLeadForm && <AddLeadForm />}
    </div>
  );
};

export default Dashboard;
