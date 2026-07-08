// import { useContext } from "react";
// import getAnalytics from "../../utils/analytics";
// import { LeadContext } from "../../contexts/LeadContext";
// import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";

// const LeadsByStatusChart = () => {
//     const {leads} = useContext(LeadContext)
//     const {stats} = getAnalytics(leads)
//     console.log(stats)
//     const data = Object.entries(stats).map(([name, value]) => ({name, value}))
//     console.log(data)
//     return (
//         <div style={{ width: '100%', height: 300 }}>
//           <h2>Leads By status</h2>
//            <ResponsiveContainer width="100%" height="100%" >
//         <BarChart data={data} layout="vertical" margin={{ top: 20, right: 30, left: 40, bottom: 5 }}>
//           <CartesianGrid strokeDasharray="3 3" />

//           <XAxis type="number" />
//           <YAxis dataKey="name" type="category" />

//           <Tooltip />
//           <Legend />

//           <Bar dataKey="value" fill="#8884d8" />
//         </BarChart>
//       </ResponsiveContainer>
//         </div>
//       );
// }

// export default LeadsByStatusChart




import { useContext } from "react";
import getAnalytics from "../../utils/analytics";
import { LeadContext } from "../../contexts/LeadContext";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Cell,
} from "recharts";

const STATUS_COLORS = {
  New: "#38BDF8",
  Contacted: "#A78BFA",
  Qualified: "#F472B6",
  "Proposal Sent": "#FB923C",
  Closed: "#34D399",
};

const LeadsByStatusChart = () => {
  const { leads } = useContext(LeadContext);
  const { stats } = getAnalytics(leads);
  const data = Object.entries(stats).map(([name, value]) => ({ name, value }));

  return (
    <div className="rpt-card">
      <div className="rpt-card-eyebrow">Pipeline</div>
      <div className="rpt-card-title">Leads by Status</div>
      <div style={{ width: "100%", height: 260 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 0, right: 24, left: 16, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" allowDecimals={false} />
            <YAxis dataKey="name" type="category" width={100} />
            <Tooltip />
            <Bar dataKey="value" radius={[0, 6, 6, 0]}>
              {data.map((entry, i) => (
                <Cell
                  key={i}
                  fill={STATUS_COLORS[entry.name] || "#A78BFA"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LeadsByStatusChart;
