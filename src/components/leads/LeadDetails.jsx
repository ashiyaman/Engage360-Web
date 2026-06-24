import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LeadContext } from "../../contexts/LeadContext";
import Summary from "./Summary";
import {
  SOURCES,
  FUNNEL_STAGES,
  PRIORITY,
  BASE_URL,
} from "../../utils/constants";
import axios from "axios";

const LeadDetails = () => {
  const { leadId } = useParams();
  const { leads, setLeads } = useContext(LeadContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);

  const lead = leads.find((lead) => lead._id === leadId);

  useEffect(() => {
    if (lead) {
      setFormData({ ...lead });
    }
  }, [lead]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.put(
        `${BASE_URL}/leads/edit/${leadId}`,
        formData,
      );
      if (response) {
        setLeads(
          leads.map((lead) => (lead._id === leadId ? response.data : lead)),
        );
      }
      setIsEditing(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h3 className="font-semibold">Lead Details - {formData?.name}</h3>
      <Summary lead={lead} />
      <form className="text-left" onSubmit={handleSave}>
        <div className="space-y-6">
          <div>
            <label>Name: </label>
            {isEditing ? (
              <input
                type="text"
                required
                value={formData?.name || ""}
                className="border border-gray-400 rounded px-2 py-1"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  });
                }}
              />
            ) : (
              <span>{formData?.name}</span>
            )}
          </div>
          <div>
            <label>Sales Agent: </label>
            <input type="text" 
            value={lead.salesAgent.name} />
          </div>
          <div>
            <label>Source: </label>
            {isEditing ? (
              <select
                value={formData?.source}
                className="border border-gray-400 rounded px-2 py-1"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    source: e.target.value,
                  });
                }}
              >
                {SOURCES.map((source) => (
                  <option
                    className="bg-#242424 text-white"
                    key={source}
                    value={source}
                  >
                    {source}
                  </option>
                ))}
              </select>
            ) : (
              <span>{formData?.source}</span>
            )}
          </div>
          <div>
            <label>Status: </label>
            {isEditing ? (
              <select
                value={formData?.status}
                className="border border-gray-400 rounded px-2 py-1"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    status: e.target.value,
                  });
                }}
              >
                {FUNNEL_STAGES.map((status) => (
                  <option
                    className="bg-#242424 text-white"
                    key={status}
                    value={status}
                  >
                    {status}
                  </option>
                ))}
              </select>
            ) : (
              <span>{formData?.status}</span>
            )}
          </div>
          <div>
            <label>Priority: </label>
            {isEditing ? (
              <select
                value={formData?.priority}
                className="border border-gray-400 rounded px-2 py-1"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    priority: e.target.value,
                  });
                }}
              >
                {PRIORITY.map((priority) => (
                  <option
                    className="bg-#242424 text-white"
                    key={priority}
                    value={priority}
                  >
                    {priority}
                  </option>
                ))}
              </select>
            ) : (
              <span>{formData?.priority}</span>
            )}
          </div>
          <div>
            <label>Time to Close: </label>
            {isEditing ? (
              <input
                type="number"
                value={formData?.timeToClose}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    timeToClose: e.target.value,
                  });
                }}
              />
            ) : (
              <span>{formData?.timeToClose}</span>
            )}
          </div>
        </div>
        {isEditing && <button type="submit">Update</button>}
      </form>
      {!isEditing && (
        <button type="button" onClick={handleEdit}>
          Edit
        </button>
      )}

      <div>
        <h2>Comments</h2>
        <textarea placeholder="Add your comments here..."></textarea>
        <select>
          <option>Sales Agent</option>
        </select>
        <button>Add Comment</button>
      </div>
    </div>
  );
};

export default LeadDetails;
