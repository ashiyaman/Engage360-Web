// import { useContext, useEffect, useState } from "react";
// import { LeadContext } from "../../contexts/LeadContext";
// import Summary from "./Summary";
// import {
//   SOURCES,
//   FUNNEL_STAGES,
//   PRIORITY,
//   BASE_URL,
// } from "../../utils/constants";
// import axios from "axios";

// const detailStageConfig = {
//   New: { glow: "#38BDF8", gradient: "linear-gradient(135deg,#0EA5E9,#38BDF8)" },
//   Contacted: { glow: "#A78BFA", gradient: "linear-gradient(135deg,#7C3AED,#A78BFA)" },
//   Qualified: { glow: "#F472B6", gradient: "linear-gradient(135deg,#EC4899,#F472B6)" },
//   "Proposal Sent": { glow: "#FB923C", gradient: "linear-gradient(135deg,#EA580C,#FB923C)" },
//   Closed: { glow: "#34D399", gradient: "linear-gradient(135deg,#059669,#34D399)" },
// };

// const priorityDotColor = {
//   High: "#FF4D6D",
//   Medium: "#FB923C",
//   Low: "#34D399",
// };

// const css = `
//   @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');

//   .e360-modal-overlay {
//     position: fixed;
//     inset: 0;
//     z-index: 1000;
//     background: rgba(4,6,16,0.72);
//     backdrop-filter: blur(6px);
//     -webkit-backdrop-filter: blur(6px);
//     display: flex;
//     align-items: flex-start;
//     justify-content: center;
//     padding: 24px 16px;
//     overflow-y: auto;
//     animation: e360-fade-in 0.18s ease-out;
//     font-family: 'Inter', system-ui, sans-serif;
//   }

//   @keyframes e360-fade-in {
//     from { opacity: 0; }
//     to { opacity: 1; }
//   }

//   .e360-modal-card {
//     width: 100%;
//     max-width: 560px;
//     margin-top: 32px;
//     border-radius: 22px;
//     background: rgba(13,17,34,0.92);
//     backdrop-filter: blur(28px);
//     -webkit-backdrop-filter: blur(28px);
//     border: 1px solid rgba(255,255,255,0.08);
//     box-shadow: 0 40px 100px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.05);
//     overflow: hidden;
//     animation: e360-modal-rise 0.22s cubic-bezier(.2,.8,.3,1.1);
//   }

//   @keyframes e360-modal-rise {
//     from { opacity: 0; transform: translateY(16px) scale(0.98); }
//     to { opacity: 1; transform: translateY(0) scale(1); }
//   }

//   @media (max-width: 639px) {
//     .e360-modal-overlay { padding: 0; align-items: flex-end; }
//     .e360-modal-card {
//       max-width: 100%;
//       margin-top: 0;
//       border-radius: 22px 22px 0 0;
//       max-height: 92vh;
//       overflow-y: auto;
//     }
//   }

//   /* ── Modal header ── */
//   .e360-modal-header {
//     padding: 20px 24px;
//     position: relative;
//     overflow: hidden;
//     display: flex;
//     align-items: flex-start;
//     justify-content: space-between;
//     gap: 16px;
//   }

//   .e360-modal-header::before {
//     content: '';
//     position: absolute;
//     inset: 0;
//     background: var(--stage-gradient, linear-gradient(135deg,#7C3AED,#A78BFA));
//     opacity: 0.16;
//   }

//   .e360-modal-header::after {
//     content: '';
//     position: absolute;
//     bottom: 0; left: 0; right: 0;
//     height: 1px;
//     background: var(--stage-gradient, linear-gradient(135deg,#7C3AED,#A78BFA));
//     opacity: 0.4;
//   }

//   .e360-modal-title-wrap { position: relative; z-index: 1; }

//   .e360-modal-eyebrow {
//     font-family: 'Outfit', sans-serif;
//     font-size: 10px;
//     font-weight: 700;
//     letter-spacing: 0.14em;
//     text-transform: uppercase;
//     color: rgba(255,255,255,0.45);
//     margin-bottom: 4px;
//   }

//   .e360-modal-title {
//     font-family: 'Outfit', sans-serif;
//     font-size: 20px;
//     font-weight: 700;
//     color: #fff;
//   }

//   .e360-modal-close {
//     position: relative;
//     z-index: 1;
//     flex-shrink: 0;
//     width: 32px; height: 32px;
//     border-radius: 10px;
//     background: rgba(255,255,255,0.06);
//     border: 1px solid rgba(255,255,255,0.1);
//     color: rgba(255,255,255,0.6);
//     font-size: 16px;
//     line-height: 1;
//     cursor: pointer;
//     display: flex; align-items: center; justify-content: center;
//     transition: all 0.18s;
//   }

//   .e360-modal-close:hover {
//     background: rgba(255,77,109,0.15);
//     border-color: rgba(255,77,109,0.4);
//     color: #FF4D6D;
//   }

//   /* ── Modal body ── */
//   .e360-modal-body {
//     padding: 22px 24px 8px;
//   }

//   .e360-field-grid {
//     display: grid;
//     grid-template-columns: 1fr;
//     gap: 16px;
//   }

//   @media (min-width: 480px) {
//     .e360-field-grid { grid-template-columns: 1fr 1fr; }
//   }

//   .e360-field {
//     display: flex;
//     flex-direction: column;
//     gap: 6px;
//   }

//   .e360-field.full { grid-column: 1 / -1; }

//   .e360-field-label {
//     font-family: 'Outfit', sans-serif;
//     font-size: 10.5px;
//     font-weight: 700;
//     letter-spacing: 0.1em;
//     text-transform: uppercase;
//     color: rgba(255,255,255,0.4);
//   }

//   .e360-field-value {
//     font-size: 14px;
//     font-weight: 500;
//     color: #F0F4FF;
//   }

//   .e360-field-value.muted {
//     color: rgba(255,255,255,0.55);
//   }

//   .e360-priority-dot-row {
//     display: flex;
//     align-items: center;
//     gap: 7px;
//   }

//   .e360-priority-dot {
//     width: 8px; height: 8px;
//     border-radius: 50%;
//     box-shadow: 0 0 8px currentColor;
//   }

//   .e360-input,
//   .e360-select-field {
//     appearance: none;
//     -webkit-appearance: none;
//     font-family: 'Inter', sans-serif;
//     font-size: 13.5px;
//     font-weight: 500;
//     color: #F0F4FF;
//     background: rgba(255,255,255,0.05);
//     border: 1px solid rgba(255,255,255,0.12);
//     border-radius: 10px;
//     padding: 9px 12px;
//     width: 100%;
//     transition: border-color 0.18s, box-shadow 0.18s;
//   }

//   .e360-select-field {
//     padding-right: 30px;
//     cursor: pointer;
//   }

//   .e360-input:focus,
//   .e360-select-field:focus {
//     outline: none;
//     border-color: rgba(167,139,250,0.6);
//     box-shadow: 0 0 0 3px rgba(167,139,250,0.18);
//   }

//   .e360-select-field option {
//     background: #0F1428;
//     color: #F0F4FF;
//   }

//   .e360-select-wrap-sm {
//     position: relative;
//   }

//   .e360-select-wrap-sm::after {
//     content: '';
//     position: absolute;
//     right: 12px;
//     top: 50%;
//     width: 6px;
//     height: 6px;
//     border-right: 1.5px solid rgba(255,255,255,0.4);
//     border-bottom: 1.5px solid rgba(255,255,255,0.4);
//     transform: translateY(-65%) rotate(45deg);
//     pointer-events: none;
//   }

//   /* ── Action row ── */
//   .e360-modal-actions {
//     display: flex;
//     justify-content: flex-end;
//     gap: 10px;
//     padding: 18px 24px 22px;
//   }

//   .e360-btn {
//     font-family: 'Outfit', sans-serif;
//     font-size: 12.5px;
//     font-weight: 700;
//     letter-spacing: 0.04em;
//     padding: 9px 18px;
//     border-radius: 11px;
//     cursor: pointer;
//     border: 1px solid transparent;
//     transition: all 0.18s;
//   }

//   .e360-btn-primary {
//     background: linear-gradient(135deg,#7C3AED,#A78BFA);
//     color: #fff;
//     box-shadow: 0 6px 20px rgba(124,58,237,0.4);
//   }

//   .e360-btn-primary:hover {
//     box-shadow: 0 6px 24px rgba(124,58,237,0.6);
//     transform: translateY(-1px);
//   }

//   .e360-btn-ghost {
//     background: rgba(255,255,255,0.05);
//     border-color: rgba(255,255,255,0.12);
//     color: rgba(255,255,255,0.7);
//   }

//   .e360-btn-ghost:hover {
//     background: rgba(255,255,255,0.09);
//     color: #fff;
//   }

//   /* ── Comments section ── */
//   .e360-comments {
//     margin: 4px 24px 24px;
//     padding-top: 18px;
//     border-top: 1px solid rgba(255,255,255,0.07);
//   }

//   .e360-comments-title {
//     font-family: 'Outfit', sans-serif;
//     font-size: 13px;
//     font-weight: 700;
//     letter-spacing: 0.06em;
//     text-transform: uppercase;
//     color: rgba(255,255,255,0.5);
//     margin-bottom: 12px;
//   }

//   .e360-comment-textarea {
//     width: 100%;
//     min-height: 72px;
//     resize: vertical;
//     font-family: 'Inter', sans-serif;
//     font-size: 13.5px;
//     color: #F0F4FF;
//     background: rgba(255,255,255,0.04);
//     border: 1px solid rgba(255,255,255,0.1);
//     border-radius: 12px;
//     padding: 12px 14px;
//     transition: border-color 0.18s, box-shadow 0.18s;
//   }

//   .e360-comment-textarea:focus {
//     outline: none;
//     border-color: rgba(56,189,248,0.55);
//     box-shadow: 0 0 0 3px rgba(56,189,248,0.15);
//   }

//   .e360-comment-row {
//     display: flex;
//     gap: 10px;
//     margin-top: 10px;
//     align-items: center;
//   }

//   .e360-comment-row .e360-select-wrap-sm { flex: 1; }
// `;

// const LeadDetails = ({ lead, onClose }) => {
//   const { leads, agents, setLeads } = useContext(LeadContext);
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState(lead || {});
//   const [newComment, setNewComment] = useState("")
//   const [comments, setComments] = useState([])
//   const [commentAgent, setCommentAgent] = useState(null)

//   const fetchComments = async() => {
//     try{
//       const allComments = await axios.get(`${BASE_URL}/comments/${lead._id}`)
//       setComments(allComments.data.data)
//     }
//     catch(err){
//       console.log(err)
//     }
//   }

//   useEffect(() => {
//     fetchComments()
//   }, [])

//   const stageCfg = detailStageConfig[formData?.status] || detailStageConfig.New;

//   const handleEdit = () => setIsEditing(true);

//   const handleSave = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.put(
//         `${BASE_URL}/leads/edit/${lead._id}`,
//         formData
//       );
//       if (response) {
//         setLeads(
//           leads.map((l) => (l._id === lead._id ? response.data : l))
//         );
//       }
//       setIsEditing(false);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleAddComment = async(e, leadId) => {
    
//     try {
//       e.preventDefault();
//       const response = await axios.post(
//         `${BASE_URL}/comment`,
//         {description: newComment, lead: leadId, salesAgent: commentAgent}
//       );
//       if (response) {
//         fetchComments()
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   return (
//     <>
//       <style>{css}</style>

//       <div
//         className="e360-modal-overlay"
//         onClick={(e) => {
//           if (e.target === e.currentTarget) onClose();
//         }}
//       >
//         <div
//           className="e360-modal-card"
//           style={{ "--stage-gradient": stageCfg.gradient }}
//         >
//           {/* HEADER */}
//           <div className="e360-modal-header">
//             <div className="e360-modal-title-wrap">
//               <div className="e360-modal-eyebrow">Lead Details</div>
//               <div className="e360-modal-title">{formData?.name}</div>
//             </div>
//             <button
//               type="button"
//               className="e360-modal-close"
//               onClick={onClose}
//               aria-label="Close"
//             >
//               ✕
//             </button>
//           </div>

//           {lead && <Summary lead={lead} />}

//           {/* BODY */}
//           <form onSubmit={handleSave}>
//             <div className="e360-modal-body">
//               <div className="e360-field-grid">
//                 <div className="e360-field full">
//                   <span className="e360-field-label">Name</span>
//                   {isEditing ? (
//                     <input
//                       type="text"
//                       required
//                       className="e360-input"
//                       value={formData?.name || ""}
//                       onChange={(e) =>
//                         setFormData({ ...formData, name: e.target.value })
//                       }
//                     />
//                   ) : (
//                     <span className="e360-field-value">{formData?.name}</span>
//                   )}
//                 </div>

//                 <div className="e360-field">
//                   <span className="e360-field-label">Sales Agent</span>
//                   <span className="e360-field-value muted">
//                     {lead?.salesAgent?.name}
//                   </span>
//                 </div>

//                 <div className="e360-field">
//                   <span className="e360-field-label">Source</span>
//                   {isEditing ? (
//                     <div className="e360-select-wrap-sm">
//                       <select
//                         className="e360-select-field"
//                         value={formData?.source}
//                         onChange={(e) =>
//                           setFormData({ ...formData, source: e.target.value })
//                         }
//                       >
//                         {SOURCES.map((source) => (
//                           <option key={source} value={source}>
//                             {source}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   ) : (
//                     <span className="e360-field-value">{formData?.source}</span>
//                   )}
//                 </div>

//                 <div className="e360-field">
//                   <span className="e360-field-label">Status</span>
//                   {isEditing ? (
//                     <div className="e360-select-wrap-sm">
//                       <select
//                         className="e360-select-field"
//                         value={formData?.status}
//                         onChange={(e) =>
//                           setFormData({ ...formData, status: e.target.value })
//                         }
//                       >
//                         {FUNNEL_STAGES.map((status) => (
//                           <option key={status} value={status}>
//                             {status}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   ) : (
//                     <span className="e360-field-value">{formData?.status}</span>
//                   )}
//                 </div>

//                 <div className="e360-field">
//                   <span className="e360-field-label">Priority</span>
//                   {isEditing ? (
//                     <div className="e360-select-wrap-sm">
//                       <select
//                         className="e360-select-field"
//                         value={formData?.priority}
//                         onChange={(e) =>
//                           setFormData({ ...formData, priority: e.target.value })
//                         }
//                       >
//                         {PRIORITY.map((priority) => (
//                           <option key={priority} value={priority}>
//                             {priority}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   ) : (
//                     <span className="e360-priority-dot-row">
//                       <span
//                         className="e360-priority-dot"
//                         style={{
//                           background: priorityDotColor[formData?.priority],
//                           color: priorityDotColor[formData?.priority],
//                         }}
//                       />
//                       <span className="e360-field-value">
//                         {formData?.priority}
//                       </span>
//                     </span>
//                   )}
//                 </div>

//                 <div className="e360-field">
//                   <span className="e360-field-label">Time to Close</span>
//                   {isEditing ? (
//                     <input
//                       type="number"
//                       className="e360-input"
//                       value={formData?.timeToClose}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           timeToClose: e.target.value,
//                         })
//                       }
//                     />
//                   ) : (
//                     <span className="e360-field-value">
//                       {formData?.timeToClose} days
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </div>

//             <div className="e360-modal-actions">
//               {isEditing ? (
//                 <>
//                   <button
//                     type="button"
//                     className="e360-btn e360-btn-ghost"
//                     onClick={() => {
//                       setFormData(lead);
//                       setIsEditing(false);
//                     }}
//                   >
//                     Cancel
//                   </button>
//                   <button type="submit" className="e360-btn e360-btn-primary">
//                     Save Changes
//                   </button>
//                 </>
//               ) : (
//                 <button
//                   type="button"
//                   className="e360-btn e360-btn-primary"
//                   onClick={handleEdit}
//                 >
//                   Edit Lead
//                 </button>
//               )}
//             </div>
//           </form>

//           {/* COMMENTS */}
//           <div className="e360-comments">
//             <div className="e360-comments-title">Comments</div>
//             {comments && <ul>
//                 {comments.map(comment => <li key={comment._id}>{comment.description} <p>{comment.salesAgent.name}</p></li>)}
//               </ul>}
//             <textarea
//               className="e360-comment-textarea"
//               placeholder="Add your comments here..."
//               onChange={(e) => setNewComment(e.target.value, lead._id)}
//             />
//             <div className="e360-comment-row">
//               <div className="e360-select-wrap-sm">
//                 <select className="e360-select-field" onChange={(e) => setCommentAgent(e.target.value)}>
//                   {agents.map(agent => (
//                     <option value={agent._id} key={agent._id}>{agent.name}</option>
//                   ))}
//                 </select>
//               </div>
//               <button type="button" onClick={(e) => handleAddComment(e, lead._id)} className="e360-btn e360-btn-primary">
//                 Add Comment
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default LeadDetails;



import { useContext, useEffect, useState } from "react";
import { LeadContext } from "../../contexts/LeadContext";
import Summary from "./Summary";
import { SOURCES, FUNNEL_STAGES, PRIORITY, BASE_URL } from "../../utils/constants";
import axios from "axios";
import { modalCss, ACCENTS } from "../../styles/modalCss";

const STAGE_ACCENT = {
  New:            ACCENTS.sky,
  Contacted:      ACCENTS.violet,
  Qualified:      { gradient:"linear-gradient(135deg,#EC4899,#F472B6)", focus:"rgba(244,114,182,0.6)", focusRing:"rgba(244,114,182,0.18)", shadow:"rgba(236,72,153,0.3)" },
  "Proposal Sent":{ gradient:"linear-gradient(135deg,#EA580C,#FB923C)", focus:"rgba(251,146,60,0.6)",  focusRing:"rgba(251,146,60,0.18)",  shadow:"rgba(234,88,12,0.3)"  },
  Closed:         ACCENTS.green,
};

const PRIORITY_COLOR = { High:"#FF4D6D", Medium:"#FB923C", Low:"#34D399" };

const LeadDetails = ({ lead, onClose }) => {
  const { leads, agents, setLeads } = useContext(LeadContext);
  const [isEditing, setIsEditing]   = useState(false);
  const [formData, setFormData]     = useState(lead || {});
  const [comments, setComments]     = useState([]);
  const [newComment, setNewComment] = useState("");
  const [commentAgent, setCommentAgent] = useState(agents?.[0]?._id || "");

  const accent = STAGE_ACCENT[formData?.status] || ACCENTS.violet;

  // Fix: [] dependency — fetch once on mount, not on every comment change
  useEffect(() => { fetchComments(); }, []);

  const fetchComments = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/comments/${lead._id}`);
      setComments(res.data.data || []);
    } catch (err) { console.log(err); }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${BASE_URL}/leads/edit/${lead._id}`, formData);
      if (res) setLeads(leads.map((l) => (l._id === lead._id ? res.data : l)));
      setIsEditing(false);
    } catch (err) { console.log(err); }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    try {
      const res = await axios.post(`${BASE_URL}/comment`, {
        description: newComment,
        lead: lead._id,
        salesAgent: commentAgent,
      });
      if (res) { setNewComment(""); fetchComments(); }
    } catch (err) { console.log(err); }
  };

  const set = (key) => (e) => setFormData({ ...formData, [key]: e.target.value });

  return (
    <>
      <style>{modalCss}</style>

      <div
        className="m-overlay"
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <div
          className="m-card"
          style={{
            "--m-gradient":   accent.gradient,
            "--m-focus":      accent.focus,
            "--m-focus-ring": accent.focusRing,
            "--m-shadow":     accent.shadow,
            maxWidth: "580px",
          }}
        >
          {/* HEADER */}
          <div className="m-header">
            <div className="m-header-text">
              <div className="m-eyebrow">Lead Details</div>
              <div className="m-title">{formData?.name}</div>
            </div>
            <button type="button" className="m-close" onClick={onClose} aria-label="Close">✕</button>
          </div>

          {/* AI SUMMARY */}
          {lead && <Summary lead={lead} />}

          {/* FIELDS */}
          <form onSubmit={handleSave}>
            <div className="m-body">
              <div className="m-grid">

                <div className="m-field full">
                  <span className="m-label">Name</span>
                  {isEditing
                    ? <input type="text" required className="m-input" value={formData?.name || ""} onChange={set("name")} />
                    : <span className="m-value">{formData?.name}</span>}
                </div>

                <div className="m-field">
                  <span className="m-label">Sales Agent</span>
                  <span className="m-value muted">{lead?.salesAgent?.name}</span>
                </div>

                <div className="m-field">
                  <span className="m-label">Source</span>
                  {isEditing
                    ? <div className="m-select-wrap"><select className="m-select" value={formData?.source} onChange={set("source")}>{SOURCES.map((s) => <option key={s} value={s}>{s}</option>)}</select></div>
                    : <span className="m-value">{formData?.source}</span>}
                </div>

                <div className="m-field">
                  <span className="m-label">Status</span>
                  {isEditing
                    ? <div className="m-select-wrap"><select className="m-select" value={formData?.status} onChange={set("status")}>{FUNNEL_STAGES.map((s) => <option key={s} value={s}>{s}</option>)}</select></div>
                    : <span className="m-value">{formData?.status}</span>}
                </div>

                <div className="m-field">
                  <span className="m-label">Priority</span>
                  {isEditing
                    ? <div className="m-select-wrap"><select className="m-select" value={formData?.priority} onChange={set("priority")}>{PRIORITY.map((p) => <option key={p} value={p}>{p}</option>)}</select></div>
                    : <span className="m-dot-row">
                        <span className="m-dot" style={{ background: PRIORITY_COLOR[formData?.priority], color: PRIORITY_COLOR[formData?.priority] }} />
                        <span className="m-value">{formData?.priority}</span>
                      </span>}
                </div>

                <div className="m-field">
                  <span className="m-label">Time to Close</span>
                  {isEditing
                    ? <input type="number" className="m-input" value={formData?.timeToClose} onChange={set("timeToClose")} />
                    : <span className="m-value">{formData?.timeToClose} days</span>}
                </div>

              </div>
            </div>

            <div className="m-footer">
              {isEditing ? (
                <>
                  <button type="button" className="m-btn m-btn-ghost" onClick={() => { setFormData(lead); setIsEditing(false); }}>Cancel</button>
                  <button type="submit" className="m-btn m-btn-primary">Save Changes</button>
                </>
              ) : (
                <button type="button" className="m-btn m-btn-primary" onClick={() => setIsEditing(true)}>Edit Lead</button>
              )}
            </div>
          </form>

          {/* COMMENTS */}
          <div className="m-divider" style={{ margin: "0 22px" }} />
          <div className="m-comments">
            <div className="m-section-title" style={{ marginTop: 18 }}>Comments</div>

            {/* Comment list */}
            {comments.length > 0 && (
              <div className="m-comment-list">
                {comments.map((c) => (
                  <div key={c._id} className="m-comment-item">
                    <div className="m-comment-text">{c.description}</div>
                    <div className="m-comment-meta">
                      {c.salesAgent?.name || "Agent"}
                      {c.createdAt ? ` · ${new Date(c.createdAt).toLocaleDateString()}` : ""}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Add comment */}
            <textarea
              className="m-textarea"
              placeholder="Add a comment…"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />

            <div className="m-comment-add-row">
              <div className="m-select-wrap">
                <select
                  className="m-select"
                  value={commentAgent}
                  onChange={(e) => setCommentAgent(e.target.value)}
                >
                  {(agents || []).map((a) => (
                    <option key={a._id} value={a._id}>{a.name}</option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                className="m-btn m-btn-primary"
                onClick={handleAddComment}
              >
                Add Comment
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default LeadDetails;
