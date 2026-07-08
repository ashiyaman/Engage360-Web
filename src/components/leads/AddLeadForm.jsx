// import { useContext, useState } from "react";
// import { SOURCES, FUNNEL_STAGES, PRIORITY } from "../../utils/constants";
// import { LeadContext } from "../../contexts/LeadContext";

// const AddLeadForm = (lead = null) => {
//       const [formData, setFormData] = useState(null);
//         const {agents} = useContext(LeadContext)
//         console.log("agents...",agents)

//       const handleSave = async (e) => {
//     try {
//       e.preventDefault();
//       const response = await axios.put(
//         `${BASE_URL}/leads/edit/${leadId}`,
//         formData,
//       );
//       if (response) {
//         setLeads(
//           leads.map((lead) => (lead._id === leadId ? response.data : lead)),
//         );
//       }
//       setIsEditing(false);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//     return(
//               <form className="text-left" onSubmit={handleSave}>
//                 <div className="space-y-6">
//                   <div>
//                     <label>Name: </label>
//                       <input
//                         type="text"
//                         required
//                         value={formData?.name || ""}
//                         className="border border-gray-400 rounded px-2 py-1"
//                         onChange={(e) => {
//                           setFormData({
//                             ...formData,
//                             name: e.target.value,
//                           });
//                         }}
//                       />

//                   </div>
//                   <div>
//                     <label>Sales Agent: </label>
//                     <select onChange={(e) => {
//                         setFormData({
//                             ...formData,
//                             agent: e.target.value
//                         })
//                     }}>
//                     {agents.map(agent => (
//                         <option key={agent._id} value={agent._id}>{agent.name}</option>
//                     ))}
//                     </select>
//                     <input type="text" 
//                     value={lead?.salesAgent?.name} />
//                   </div>
//                   <div>
//                     <label>Source: </label>
//                       <select
//                         value={formData?.source}
//                         className="border border-gray-400 rounded px-2 py-1"
//                         onChange={(e) => {
//                           setFormData({
//                             ...formData,
//                             source: e.target.value,
//                           });
//                         }}
//                       >
//                         {SOURCES.map((source) => (
//                           <option
//                             className="bg-#242424 text-white"
//                             key={source}
//                             value={source}
//                           >
//                             {source}
//                           </option>
//                         ))}
//                       </select>
//                   </div>
//                   <div>
//                     <label>Status: </label>
//                       <select
//                         value={formData?.status}
//                         className="border border-gray-400 rounded px-2 py-1"
//                         onChange={(e) => {
//                           setFormData({
//                             ...formData,
//                             status: e.target.value,
//                           });
//                         }}
//                       >
//                         {FUNNEL_STAGES.map((status) => (
//                           <option
//                             className="bg-#242424 text-white"
//                             key={status}
//                             value={status}
//                           >
//                             {status}
//                           </option>
//                         ))}
//                       </select>

//                   </div>
//                   <div>
//                     <label>Priority: </label>
//                       <select
//                         value={formData?.priority}
//                         className="border border-gray-400 rounded px-2 py-1"
//                         onChange={(e) => {
//                           setFormData({
//                             ...formData,
//                             priority: e.target.value,
//                           });
//                         }}
//                       >
//                         {PRIORITY.map((priority) => (
//                           <option
//                             className="bg-#242424 text-white"
//                             key={priority}
//                             value={priority}
//                           >
//                             {priority}
//                           </option>
//                         ))}
//                       </select>
//                   </div>
//                   <div>
//                     <label>Time to Close: </label>
//                       <input
//                         type="number"
//                         value={formData?.timeToClose}
//                         onChange={(e) => {
//                           setFormData({
//                             ...formData,
//                             timeToClose: e.target.value,
//                           });
//                         }}
//                       />
//                   </div>
//                 </div>
//               </form>
//     )
// }

// export default AddLeadForm





import { useContext, useState } from "react";
import axios from "axios";
import { SOURCES, FUNNEL_STAGES, PRIORITY, BASE_URL } from "../../utils/constants";
import { LeadContext } from "../../contexts/LeadContext";

const addLeadCss = `
  .e360-form-overlay {
    position: fixed;
    inset: 0;
    z-index: 1000;
    background: rgba(4,6,16,0.72);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 24px 16px;
    overflow-y: auto;
    animation: e360-fade-in 0.18s ease-out;
    font-family: 'Inter', system-ui, sans-serif;
  }

  @keyframes e360-fade-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  .e360-form-card {
    width: 100%;
    max-width: 520px;
    margin-top: 40px;
    border-radius: 22px;
    background: rgba(13,17,34,0.94);
    backdrop-filter: blur(28px);
    -webkit-backdrop-filter: blur(28px);
    border: 1px solid rgba(255,255,255,0.08);
    box-shadow: 0 40px 100px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.05);
    overflow: hidden;
    animation: e360-rise 0.22s cubic-bezier(.2,.8,.3,1.1);
  }

  @keyframes e360-rise {
    from { opacity: 0; transform: translateY(16px) scale(0.98); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  @media (max-width: 639px) {
    .e360-form-overlay { padding: 0; align-items: flex-end; }
    .e360-form-card {
      max-width: 100%;
      margin-top: 0;
      border-radius: 22px 22px 0 0;
      max-height: 92vh;
      overflow-y: auto;
    }
  }

  /* Header */
  .e360-form-header {
    padding: 20px 24px;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .e360-form-header::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg,#7C3AED,#A78BFA);
    opacity: 0.16;
  }

  .e360-form-header::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(135deg,#7C3AED,#A78BFA);
    opacity: 0.4;
  }

  .e360-form-header-title {
    position: relative;
    z-index: 1;
    font-family: 'Outfit', sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: #fff;
  }

  .e360-form-close {
    position: relative;
    z-index: 1;
    width: 32px; height: 32px;
    border-radius: 10px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    color: rgba(255,255,255,0.6);
    font-size: 16px;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.18s;
  }

  .e360-form-close:hover {
    background: rgba(255,77,109,0.15);
    border-color: rgba(255,77,109,0.4);
    color: #FF4D6D;
  }

  /* Body */
  .e360-form-body {
    padding: 24px 24px 8px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .e360-form-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
  }

  @media (min-width: 480px) {
    .e360-form-grid { grid-template-columns: 1fr 1fr; }
  }

  .e360-form-field { display: flex; flex-direction: column; gap: 6px; }
  .e360-form-field.full { grid-column: 1 / -1; }

  .e360-form-label {
    font-family: 'Outfit', sans-serif;
    font-size: 10.5px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.4);
  }

  .e360-form-input,
  .e360-form-select {
    appearance: none;
    -webkit-appearance: none;
    font-family: 'Inter', sans-serif;
    font-size: 13.5px;
    font-weight: 500;
    color: #F0F4FF;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 10px;
    padding: 9px 12px;
    width: 100%;
    transition: border-color 0.18s, box-shadow 0.18s;
  }

  .e360-form-select { padding-right: 30px; cursor: pointer; }

  .e360-form-input:focus,
  .e360-form-select:focus {
    outline: none;
    border-color: rgba(167,139,250,0.6);
    box-shadow: 0 0 0 3px rgba(167,139,250,0.18);
  }

  .e360-form-select option { background: #0F1428; color: #F0F4FF; }

  .e360-form-select-wrap { position: relative; }
  .e360-form-select-wrap::after {
    content: '';
    position: absolute;
    right: 12px; top: 50%;
    width: 6px; height: 6px;
    border-right: 1.5px solid rgba(255,255,255,0.4);
    border-bottom: 1.5px solid rgba(255,255,255,0.4);
    transform: translateY(-65%) rotate(45deg);
    pointer-events: none;
  }

  /* Footer */
  .e360-form-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    padding: 20px 24px 24px;
  }

  .e360-btn {
    font-family: 'Outfit', sans-serif;
    font-size: 12.5px;
    font-weight: 700;
    letter-spacing: 0.04em;
    padding: 9px 18px;
    border-radius: 11px;
    cursor: pointer;
    border: 1px solid transparent;
    transition: all 0.18s;
  }

  .e360-btn-primary {
    background: linear-gradient(135deg,#7C3AED,#A78BFA);
    color: #fff;
    box-shadow: 0 6px 20px rgba(124,58,237,0.35);
  }

  .e360-btn-primary:hover {
    box-shadow: 0 6px 24px rgba(124,58,237,0.6);
    transform: translateY(-1px);
  }

  .e360-btn-ghost {
    background: rgba(255,255,255,0.05);
    border-color: rgba(255,255,255,0.12);
    color: rgba(255,255,255,0.7);
  }

  .e360-btn-ghost:hover {
    background: rgba(255,255,255,0.09);
    color: #fff;
  }
`;

const AddLeadForm = ({ onClose }) => {
  const { agents, fetchLeads } = useContext(LeadContext);

  const [formData, setFormData] = useState({
    name: "",
    salesAgent: "",
    source: SOURCES?.[0] || "",
    status: FUNNEL_STAGES?.[0] || "New",
    priority: PRIORITY?.[0] || "Medium",
    timeToClose: "",
  });

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/leads`, formData);
      fetchLeads();
      onClose?.();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <style>{addLeadCss}</style>

      <div
        className="e360-form-overlay"
        onClick={(e) => { if (e.target === e.currentTarget) onClose?.(); }}
      >
        <div className="e360-form-card">
          {/* HEADER */}
          <div className="e360-form-header">
            <span className="e360-form-header-title">Add New Lead</span>
            <button type="button" className="e360-form-close" onClick={onClose}>✕</button>
          </div>

          {/* BODY */}
          <form onSubmit={handleSave}>
            <div className="e360-form-body">
              <div className="e360-form-grid">
                {/* Name */}
                <div className="e360-form-field full">
                  <label className="e360-form-label">Name</label>
                  <input
                    type="text"
                    required
                    className="e360-form-input"
                    placeholder="e.g. Acme Corp"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>

                {/* Sales Agent */}
                <div className="e360-form-field full">
                  <label className="e360-form-label">Sales Agent</label>
                  <div className="e360-form-select-wrap">
                    <select
                      required
                      className="e360-form-select"
                      value={formData.salesAgent}
                      onChange={(e) =>
                        setFormData({ ...formData, salesAgent: e.target.value })
                      }
                    >
                      <option value="" disabled>Select agent</option>
                      {(agents || []).map((agent) => (
                        <option key={agent._id} value={agent._id}>
                          {agent.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Source */}
                <div className="e360-form-field">
                  <label className="e360-form-label">Source</label>
                  <div className="e360-form-select-wrap">
                    <select
                      className="e360-form-select"
                      value={formData.source}
                      onChange={(e) =>
                        setFormData({ ...formData, source: e.target.value })
                      }
                    >
                      {(SOURCES || []).map((source) => (
                        <option key={source} value={source}>{source}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Status */}
                <div className="e360-form-field">
                  <label className="e360-form-label">Status</label>
                  <div className="e360-form-select-wrap">
                    <select
                      className="e360-form-select"
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({ ...formData, status: e.target.value })
                      }
                    >
                      {(FUNNEL_STAGES || []).map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Priority */}
                <div className="e360-form-field">
                  <label className="e360-form-label">Priority</label>
                  <div className="e360-form-select-wrap">
                    <select
                      className="e360-form-select"
                      value={formData.priority}
                      onChange={(e) =>
                        setFormData({ ...formData, priority: e.target.value })
                      }
                    >
                      {(PRIORITY || []).map((priority) => (
                        <option key={priority} value={priority}>{priority}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Time to Close */}
                <div className="e360-form-field">
                  <label className="e360-form-label">Time to Close (days)</label>
                  <input
                    type="number"
                    min="1"
                    required
                    className="e360-form-input"
                    placeholder="e.g. 30"
                    value={formData.timeToClose}
                    onChange={(e) =>
                      setFormData({ ...formData, timeToClose: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="e360-form-footer">
              <button
                type="button"
                className="e360-btn e360-btn-ghost"
                onClick={onClose}
              >
                Cancel
              </button>
              <button type="submit" className="e360-btn e360-btn-primary">
                Create Lead
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddLeadForm;
