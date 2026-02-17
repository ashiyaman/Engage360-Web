import { useContext } from "react";
import { LeadContext } from "../contexts/LeadContext";

const LeadMomentum = ({forwardedLeads, stalledLeadsCount}) => {

  return (
    <>

        <section className="bg-green-500">
          <h3>Lead Momentum(past 7 days)</h3>
          <p>
            <span>▲</span> {forwardedLeads.length} leads moved forward this week
          </p>
          <p>
            <span>▼</span> {stalledLeadsCount} leads stalled
          </p>
        </section>
      
    </>
  );
};

export default LeadMomentum;
