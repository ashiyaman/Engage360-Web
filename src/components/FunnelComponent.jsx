import { Link } from "react-router-dom";
import { FUNNEL_STAGES } from "../utils/constants";
import { useContext } from "react";
import { LeadContext } from "../contexts/LeadContext";
import getAnalytics from "../utils/analytics";

const FunnelComponent = () => {
  const {leads} = useContext(LeadContext)
  const {stats} = getAnalytics(leads)
  const maxCount = Math.max(...Object.values(stats), 1);

  return (
    <section className="bg-white dark:bg-slate-800 rounded-xl shadow border border-gray-200 dark:border-slate-700 p-5">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-semibold mb-5">Pipeline Snapshot</h2>
        <Link to="/leads" className="text-sm text-blue-600 hover:underline">
          View Pipeline →
        </Link>
      </div>

      <div className="space-y-4">
        {FUNNEL_STAGES.map((stage) => {
          const count = stats[stage] || 0;
          const width = (count / maxCount) * 100;

          return (
            <div key={stage}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">{stage}</span>
                <span className="text-sm font-semibold">{count}</span>
              </div>

              <div className="w-full h-3 rounded-full bg-gray-200 dark:bg-slate-700 overflow-hidden">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all duration-300"
                  style={{ width: `${width}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FunnelComponent;
