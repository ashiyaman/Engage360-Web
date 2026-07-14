import { useContext } from "react";
import { LeadContext } from "../../contexts/LeadContext";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
} from "recharts";
import getAnalytics from "../../utils/analytics";

// Bug fixed: was using status colors, now uses priority colors
const PRIORITY_COLORS = {
  High:   "#FF4D6D",
  Medium: "#FB923C",
  Low:    "#34D399",
};

const PriorityDistributionChart = () => {
  const { leads } = useContext(LeadContext);
  const { priorityDistributionLeads } = getAnalytics(leads);

  // Bug fixed: was missing Object.entries conversion — Pie needs an array not an object
  const data = Object.entries(priorityDistributionLeads).map(
    ([name, value]) => ({ name, value })
  );

  return (
    <div className="rpt-card mt-5">
      <div className="rpt-card-eyebrow">Priority</div>
      <div className="rpt-card-title">Open Leads by Priority</div>
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
              {data.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={PRIORITY_COLORS[entry.name] || "#A78BFA"}
                />
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

export default PriorityDistributionChart;

