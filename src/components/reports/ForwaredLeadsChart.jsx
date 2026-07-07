import { useContext, useMemo } from "react";
import getAnalytics from "../../utils/analytics";
import { LeadContext } from "../../contexts/LeadContext";
import { ResponsiveContainer, PieChart, Pie } from "recharts";

const ForwardedLeadsChart = () => {
    const {leads} = useContext(LeadContext)
    const {forwardedLeads, stalledLeads} = getAnalytics(leads)

    const data = [
      {name: "Forwarded", value: forwardedLeads.length},
      {name: "Stalled", value: stalledLeads.length}
    ]

    return (
    <div style={{ width: '100%', height: 300 }}>
      <h2>Forwarded vs Stalled leads - this week</h2>
      <ResponsiveContainer>
        <PieChart>
          <Pie dataKey="value" data={data} fill="#8884d8" label={({ name, value }) => `${name}: ${value}`} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ForwardedLeadsChart