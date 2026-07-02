import { useContext } from "react";
import getAnalytics from "../../utils/analytics";
import { LeadContext } from "../../contexts/LeadContext";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";

const LeadsByStatusChart = () => {
    const {leads} = useContext(LeadContext)
    const {stats} = getAnalytics(leads)
    console.log(stats)
    const data = Object.entries(stats).map(([name, value]) => ({name, value}))
    console.log(data)
    return (
        <div style={{ width: '100%', height: 300 }}>
          <h2>Leads By status</h2>
           <ResponsiveContainer width="100%" height="100%" >
        <BarChart data={data} layout="vertical" margin={{ top: 20, right: 30, left: 40, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis type="number" />
          <YAxis dataKey="name" type="category" />

          <Tooltip />
          <Legend />

          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
        </div>
      );
}

export default LeadsByStatusChart