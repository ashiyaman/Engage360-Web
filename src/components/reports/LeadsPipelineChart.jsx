import { useMemo } from "react";

const LeadsPipelineChart = () => {
    const {forwardedLeads, closedLeadsCount} = useMemo(analyt)
    return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie dataKey="value" data={data} fill="#8884d8" label />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LeadsPipelineChart