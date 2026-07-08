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

const COLORS = ["#A78BFA", "#34D399"];

const LeadsPipelineChart = () => {
  const { leads } = useContext(LeadContext);
  const { closedLeads } = getAnalytics(leads);

  const inPipeline = (leads || []).length - closedLeads.length;

  const data = [
    { name: "In Pipeline", value: inPipeline },
    { name: "Closed",      value: closedLeads.length },
  ];

  return (
    <div className="rpt-card">
      <div className="rpt-card-eyebrow">Overview</div>
      <div className="rpt-card-title">Pipeline vs Closed</div>
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

export default LeadsPipelineChart;
