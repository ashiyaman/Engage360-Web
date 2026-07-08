// import { useContext, useMemo } from "react";
// import getAnalytics from "../../utils/analytics";
// import { LeadContext } from "../../contexts/LeadContext";
// import { ResponsiveContainer, PieChart, Pie } from "recharts";

// const ForwardedLeadsChart = () => {
//     const {leads} = useContext(LeadContext)
//     const {forwardedLeads, stalledLeads} = getAnalytics(leads)

//     const data = [
//       {name: "Forwarded", value: forwardedLeads.length},
//       {name: "Stalled", value: stalledLeads.length}
//     ]

//     return (
//     <div style={{ width: '100%', height: 300 }}>
//       <h2>Forwarded vs Stalled leads - this week</h2>
//       <ResponsiveContainer>
//         <PieChart>
//           <Pie dataKey="value" data={data} fill="#8884d8" label={({ name, value }) => `${name}: ${value}`} />
//         </PieChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }

// export default ForwardedLeadsChart






import { useContext } from "react";
import getAnalytics from "../../utils/analytics";
import { LeadContext } from "../../contexts/LeadContext";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = ["#38BDF8", "#FB923C"];

const ForwardedLeadsChart = () => {
  const { leads } = useContext(LeadContext);
  const { forwardedLeads, stalledLeads } = getAnalytics(leads);

  const data = [
    { name: "Forwarded", value: forwardedLeads.length },
    { name: "Stalled",   value: stalledLeads.length },
  ];

  return (
    <div className="rpt-card">
      <div className="rpt-card-eyebrow">This Week</div>
      <div className="rpt-card-title">Forwarded vs Stalled</div>
      <div style={{ width: "100%", height: 240 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={58}
              outerRadius={88}
              paddingAngle={4}
              label={({ name, value }) => `${name}: ${value}`}
              labelLine={false}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "rgba(13,17,34,0.95)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 10,
                fontFamily: "Inter, sans-serif",
                fontSize: 12,
                color: "#F0F4FF",
              }}
            />
            <Legend
              iconType="circle"
              iconSize={8}
              formatter={(value) => (
                <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 12 }}>
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ForwardedLeadsChart;
