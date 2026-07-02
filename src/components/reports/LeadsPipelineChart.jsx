import { useContext, useMemo } from "react";
import getAnalytics from "../../utils/analytics";
import { LeadContext } from "../../contexts/LeadContext";
import { ResponsiveContainer, PieChart, Pie } from "recharts";

const LeadsPipelineChart = () => {
    const {leads} = useContext(LeadContext)
    const {closedLeads} = getAnalytics(leads)

    const data = [
      {name: "In Pipeline", value: leads.length - closedLeads.length},
      {name: "Closed", value: closedLeads.length}
    ]

    return (
    <div style={{ width: '100%', height: 300 }}>
      <h2>In Pipeline vs Closed</h2>
      <ResponsiveContainer>
        <PieChart>
          <Pie dataKey="value" data={data} fill="#8884d8" label />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LeadsPipelineChart