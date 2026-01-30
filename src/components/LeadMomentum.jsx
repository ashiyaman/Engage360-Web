import { useContext } from "react";
import { LeadContext } from "../contexts/LeadContext";

const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;

const LeadMomentum = () => {
  const { leads = [] } = useContext(LeadContext);

  const forwardedLeads = leads.filter((lead) => {
    const updatedAt = new Date(lead.updatedAt).getTime();

    if (isNaN(updatedAt)) return 0;

    return Date.now() - updatedAt < ONE_WEEK_MS;
  });

  return (
    <>
      {leads && (
        <section className="bg-green-500">
          <h3>Lead Momentum(past 7 days)</h3>
          <p>
            <span>▲</span> {forwardedLeads.length} leads moved forward this week
          </p>
          <p>
            <span>▼</span> {leads.length - forwardedLeads.length} leads stalled
          </p>
        </section>
      )}
    </>
  );
};

export default LeadMomentum;
