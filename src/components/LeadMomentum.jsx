import { useContext, useMemo } from "react";
import { LeadContext } from "../contexts/LeadContext";
import getAnalytics from "../utils/analytics";

const LeadMomentum = () => {
  const {leads} = useContext(LeadContext)
  const {forwardedLeads, stalledLeads} = getAnalytics(leads)

  const healthy = forwardedLeads.length >= stalledLeads.length;

  return (
    <>
      <section className="bg-white dark:bg-slate-800 rounded-xl shadow border border-gray-200 dark:border-slate-700 p-5">
        <h2 className="text-lg font-semibold">Lead Momentum</h2>

        <p className="text-sm text-gray-500 mb-4">Past 7 days</p>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <p className="text-green-600">▲ Leads moved forward</p>

            <span className="font-bold text-xl">{forwardedLeads.length}</span>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-red-500">▼ Leads stalled</p>

            <span className="font-bold text-xl">
              {stalledLeads.length > 0 ? stalledLeads.length : 0}
            </span>
          </div>
        </div>
        <div className="mt-4 border-t pt-3">
          <span
            className={`text-sm font-medium ${
              healthy ? "text-green-600" : "text-red-500"
            }`}
          >
            {healthy ? "🟢 Healthy Pipeline" : "🟡 Needs Attention"}
          </span>
        </div>
      </section>
    </>
  );
};

export default LeadMomentum;
