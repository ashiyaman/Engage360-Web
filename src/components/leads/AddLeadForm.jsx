import { useContext, useState } from "react";
import { SOURCES, FUNNEL_STAGES, PRIORITY } from "../../utils/constants";
import { LeadContext } from "../../contexts/LeadContext";

const AddLeadForm = (lead = null) => {
      const [formData, setFormData] = useState(null);
        const {agents} = useContext(LeadContext)
        console.log("agents...",agents)

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

    return(
              <form className="text-left" onSubmit={handleSave}>
                <div className="space-y-6">
                  <div>
                    <label>Name: </label>
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

                  </div>
                  <div>
                    <label>Sales Agent: </label>
                    <select onChange={(e) => {
                        setFormData({
                            ...formData,
                            agent: e.target.value
                        })
                    }}>
                    {agents.map(agent => (
                        <option key={agent._id} value={agent._id}>{agent.name}</option>
                    ))}
                    </select>
                    <input type="text" 
                    value={lead?.salesAgent?.name} />
                  </div>
                  <div>
                    <label>Source: </label>
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
                  </div>
                  <div>
                    <label>Status: </label>
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

                  </div>
                  <div>
                    <label>Priority: </label>
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
                  </div>
                  <div>
                    <label>Time to Close: </label>
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
                  </div>
                </div>
              </form>
    )
}

export default AddLeadForm