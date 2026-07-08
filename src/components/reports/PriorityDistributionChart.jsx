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

const COLORS = {
  New: "#38BDF8",
  Contacted: "#A78BFA",
  Qualified: "#F472B6",
  "Proposal Sent": "#FB923C",
  Closed: "#34D399",
};

const PriorityDistributionChart = () => {
  const { leads } = useContext(LeadContext);
  const { priorityDistributionLeads } = getAnalytics(leads);
  const data = Object.entries(priorityDistributionLeads).map(
    ([name, value]) => ({ name, value }),
  );

  return (
    <div>
      <div className="rpt-card-title">Priority Distribution</div>
      <div style={{ width: "100%", height: 240 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              dataKey="value"
              data={data}
              fill="#8884d8"
              label={({ name, value }) => `${name}: ${value}`}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PriorityDistributionChart;
