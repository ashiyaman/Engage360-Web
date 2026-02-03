import { useContext, useMemo, useState } from "react"

import { LeadContext } from "../contexts/LeadContext"
import StatsBar from "../components/StatsBar"
import LeadMomentum from "../components/leadMomentum"
import FunnelComponent from "../components/FunnelComponent"

const Dashboard = () => {
    const {leads} = useContext(LeadContext)

      const stats = useMemo(
    () =>
      (leads || []).reduce((acc, lead) => {
        acc[lead.status] = (acc[lead.status] || 0) + 1;
        return acc;
      }, {}),
    [leads],
  );

    return(
        <div>
            <h1>Dashboard</h1>
            <section className="bg-yellow-300">
                <StatsBar stats={stats} />
                <LeadMomentum />
            </section>
            <FunnelComponent stats={stats} />
            <ul className="bg-blue-500">
                {leads && leads.map(lead => (<li key={lead._id} className="border-2 m-2">
                    <h5>{lead.name}</h5>
                    <p>Status: {lead.status}</p>
                    <p>Priority: {lead.priority}</p>
                </li>))}
            </ul>
        </div>
    )
}

export default Dashboard