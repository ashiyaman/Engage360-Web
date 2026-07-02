import { useContext } from "react";
import getAnalytics from "../../utils/analytics";
import { LeadContext } from "../../contexts/LeadContext";
import { ResponsiveContainer, PieChart, Pie } from "recharts";

const LeadsByStatusChart = () => {
    const {leads} = useContext(LeadContext)
    const {stats} = getAnalytics(leads)
    console.log(stats)
    const data = Object.entries(stats).map(([name, value]) => ({name, value}))
    console.log(data)
    return (
        <div style={{ width: '100%', height: 300 }}>
          <h2>Leads By status</h2>
          <ResponsiveContainer>
            <PieChart>
              <Pie dataKey="value" data={data} fill="#8884d8" label={({ name, value }) => `${name}: ${value}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      );
}

export default LeadsByStatusChart