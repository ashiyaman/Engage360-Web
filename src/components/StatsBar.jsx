import { useContext, useMemo } from "react";
import { LeadContext } from "../contexts/LeadContext";

const StatsBar = ({stats}) => {
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

export default StatsBar;
