import { HiExclamationTriangle, HiFire, HiArrowTrendingUp } from "react-icons/hi2";

const AttentionPanel = ({
  forwardedLeads,
  stalledPriorityLeads,
  stalledLeadsCount,
}) => {
  return (
    <section className="bg-white dark:bg-slate-800 rounded-xl shadow border border-gray-200 dark:border-slate-700 p-5 my-10">
      <h2 className="text-lg font-semibold mb-5">
        Attention Panel
      </h2>

      <div className="space-y-4">
        {stalledLeadsCount > 0 && (
          <div className="flex items-center justify-between rounded-lg bg-red-50 dark:bg-red-900/20 p-3">
            <div className="flex items-center gap-3">
              <HiExclamationTriangle className="text-red-500 text-xl" />
              <span>Stalled Leads</span>
            </div>

            <span className="font-bold text-red-600">
              {stalledLeadsCount}
            </span>
          </div>
        )}

        {stalledPriorityLeads.length > 0 && (
          <div className="flex items-center justify-between rounded-lg bg-orange-50 dark:bg-orange-900/20 p-3">
            <div className="flex items-center gap-3">
              <HiFire className="text-orange-500 text-xl" />
              <span>High Priority</span>
            </div>

            <span className="font-bold text-orange-600">
              {stalledPriorityLeads.length}
            </span>
          </div>
        )}

        {forwardedLeads.length > 0 && (
          <div className="flex items-center justify-between rounded-lg bg-green-50 dark:bg-green-900/20 p-3">
            <div className="flex items-center gap-3">
              <HiArrowTrendingUp className="text-green-500 text-xl" />
              <span>Moved This Week</span>
            </div>

            <span className="font-bold text-green-600">
              {forwardedLeads.length}
            </span>
          </div>
        )}

        {stalledLeadsCount === 0 &&
          stalledPriorityLeads.length === 0 &&
          forwardedLeads.length === 0 && (
            <p className="text-gray-500 dark:text-gray-400">
              No alerts. Everything looks good 🎉
            </p>
          )}
      </div>
    </section>
  );
};

export default AttentionPanel;