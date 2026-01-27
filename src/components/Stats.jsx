import { useContext, useMemo } from "react";
import { LeadContext } from "../contexts/LeadContext";

const Stats = () => {
  const { leads } = useContext(LeadContext);

  const stats = useMemo(
    () =>
      (leads || []).reduce((acc, lead) => {
        acc[lead.status] = (acc[lead.status] || 0) + 1;
        return acc;
      }, {}),
    [leads],
  );

  return (
    <>
      <h2>Stats</h2>
      <ul>
        {Object.keys(stats).map((stat) => (
          <li key={stat}>
            {stat}: {stats[stat]}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Stats;
