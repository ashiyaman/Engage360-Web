import { useContext, useMemo } from "react";
import { LeadContext } from "../contexts/LeadContext";

import getAnalytics from "../utils/analytics"

const StatsBar = () => {
  const {leads} = useContext(LeadContext)
  const {stats} = getAnalytics(leads)
  return (
    <>
      <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-4">
        {Object.keys(stats).map((stat) => (
          <li key={stat}>
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-3 border border-gray-200 dark:border-slate-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">{stat}</p>
              <h2 className="text-3xl font-bold text-blue-600 mt-2">{stats[stat]}</h2>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default StatsBar;
