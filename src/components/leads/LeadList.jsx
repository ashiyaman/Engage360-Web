import { useContext } from "react";
import { LeadContext } from "../../contexts/LeadContext";
import { Link } from "react-router-dom";

const LeadList = () => {
  const { leads } = useContext(LeadContext);
  console.log('...lead list........', leads);
  return (
    <ul>
      {leads.map((lead) => (
        <li key={lead._id}>
          <Link
            key={lead._id}
            className="bg-amber-400"
            to={`/leads/${lead._id}`}
          >
            <span>{lead.name} - </span>
            <span>{lead.status} - </span>
            <span>{lead.salesAgent.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default LeadList;
