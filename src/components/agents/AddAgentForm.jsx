// import axios from "axios";
// import { useContext, useState } from "react";
// import { BASE_URL } from "../../utils/constants";
// import { LeadContext } from "../../contexts/LeadContext";

// const agentFormCss = `
//   .e360-form-overlay {
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
//     animation: aff-fade 0.18s ease-out;
//     font-family: 'Inter', system-ui, sans-serif;
//   }

//   @keyframes aff-fade { from { opacity: 0; } to { opacity: 1; } }

//   .e360-form-card {
//     width: 100%;
//     max-width: 440px;
//     margin-top: 80px;
//     border-radius: 22px;
//     background: rgba(13,17,34,0.94);
//     backdrop-filter: blur(28px);
//     -webkit-backdrop-filter: blur(28px);
//     border: 1px solid rgba(255,255,255,0.08);
//     box-shadow: 0 40px 100px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.05);
//     overflow: hidden;
//     animation: aff-rise 0.22s cubic-bezier(.2,.8,.3,1.1);
//   }

//   @keyframes aff-rise {
//     from { opacity: 0; transform: translateY(14px) scale(0.98); }
//     to   { opacity: 1; transform: translateY(0) scale(1); }
//   }

//   @media (max-width: 639px) {
//     .e360-form-overlay { padding: 0; align-items: flex-end; }
//     .e360-form-card {
//       max-width: 100%;
//       margin-top: 0;
//       border-radius: 22px 22px 0 0;
//     }
//   }

//   .e360-form-header {
//     padding: 20px 24px;
//     position: relative;
//     overflow: hidden;
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//   }

//   .e360-form-header::before {
//     content: '';
//     position: absolute;
//     inset: 0;
//     background: linear-gradient(135deg,#059669,#34D399);
//     opacity: 0.16;
//   }

//   .e360-form-header::after {
//     content: '';
//     position: absolute;
//     bottom: 0; left: 0; right: 0;
//     height: 1px;
//     background: linear-gradient(135deg,#059669,#34D399);
//     opacity: 0.4;
//   }

//   .e360-form-header-title {
//     position: relative;
//     z-index: 1;
//     font-family: 'Outfit', sans-serif;
//     font-size: 18px;
//     font-weight: 700;
//     color: #fff;
//   }

//   .e360-form-close {
//     position: relative;
//     z-index: 1;
//     width: 32px; height: 32px;
//     border-radius: 10px;
//     background: rgba(255,255,255,0.06);
//     border: 1px solid rgba(255,255,255,0.1);
//     color: rgba(255,255,255,0.6);
//     font-size: 16px;
//     cursor: pointer;
//     display: flex; align-items: center; justify-content: center;
//     transition: all 0.18s;
//   }

//   .e360-form-close:hover {
//     background: rgba(255,77,109,0.15);
//     border-color: rgba(255,77,109,0.4);
//     color: #FF4D6D;
//   }

//   .e360-form-body {
//     padding: 24px 24px 8px;
//     display: flex;
//     flex-direction: column;
//     gap: 16px;
//   }

//   .e360-form-field { display: flex; flex-direction: column; gap: 6px; }

//   .e360-form-label {
//     font-family: 'Outfit', sans-serif;
//     font-size: 10.5px;
//     font-weight: 700;
//     letter-spacing: 0.1em;
//     text-transform: uppercase;
//     color: rgba(255,255,255,0.4);
//   }

//   .e360-form-input {
//     appearance: none;
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

//   .e360-form-input:focus {
//     outline: none;
//     border-color: rgba(52,211,153,0.6);
//     box-shadow: 0 0 0 3px rgba(52,211,153,0.15);
//   }

//   .e360-form-footer {
//     display: flex;
//     justify-content: flex-end;
//     gap: 10px;
//     padding: 20px 24px 24px;
//   }

//   .e360-btn {
//     font-family: 'Outfit', sans-serif;
//     font-size: 12.5px;
//     font-weight: 700;
//     padding: 9px 18px;
//     border-radius: 11px;
//     cursor: pointer;
//     border: 1px solid transparent;
//     transition: all 0.18s;
//   }

//   .e360-btn-green {
//     background: linear-gradient(135deg,#059669,#34D399);
//     color: #fff;
//     box-shadow: 0 6px 20px rgba(5,150,105,0.35);
//   }

//   .e360-btn-green:hover {
//     box-shadow: 0 6px 24px rgba(5,150,105,0.6);
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
// `;

// const AddAgentForm = ({ agent = null, onClose }) => {
//   const { fetchAgents } = useContext(LeadContext);
//   const [formData, setFormData] = useState({
//     name: agent?.name || "",
//     email: agent?.email || "",
//   });

//   const handleSave = async (e) => {
//     e.preventDefault();
//     try {
//       if (agent) {
//         const response = await axios.put(
//           `${BASE_URL}/agents/edit/${agent._id}`,
//           formData
//         );
//         if (response) fetchAgents();
//       } else {
//         const response = await axios.post(`${BASE_URL}/agents`, formData);
//         if (response) fetchAgents();
//       }
//       onClose?.();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <>
//       <style>{agentFormCss}</style>

//       <div
//         className="e360-form-overlay"
//         onClick={(e) => { if (e.target === e.currentTarget) onClose?.(); }}
//       >
//         <div className="e360-form-card">
//           <div className="e360-form-header">
//             <span className="e360-form-header-title">
//               {agent ? "Edit Agent" : "Add New Agent"}
//             </span>
//             <button type="button" className="e360-form-close" onClick={onClose}>✕</button>
//           </div>

//           <form onSubmit={handleSave}>
//             <div className="e360-form-body">
//               <div className="e360-form-field">
//                 <label className="e360-form-label">Name</label>
//                 <input
//                   type="text"
//                   required
//                   className="e360-form-input"
//                   placeholder="e.g. John Doe"
//                   value={formData.name}
//                   onChange={(e) =>
//                     setFormData({ ...formData, name: e.target.value })
//                   }
//                 />
//               </div>

//               <div className="e360-form-field">
//                 <label className="e360-form-label">Email</label>
//                 <input
//                   type="email"
//                   required
//                   className="e360-form-input"
//                   placeholder="e.g. john@example.com"
//                   value={formData.email}
//                   onChange={(e) =>
//                     setFormData({ ...formData, email: e.target.value })
//                   }
//                 />
//               </div>
//             </div>

//             <div className="e360-form-footer">
//               <button
//                 type="button"
//                 className="e360-btn e360-btn-ghost"
//                 onClick={onClose}
//               >
//                 Cancel
//               </button>
//               <button type="submit" className="e360-btn e360-btn-green">
//                 {agent ? "Save Changes" : "Add Agent"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AddAgentForm;





import axios from "axios";
import { useContext, useState } from "react";
import { BASE_URL } from "../../utils/constants";
import { LeadContext } from "../../contexts/LeadContext";
import { modalCss, ACCENTS } from "../../styles/modalCss";

const a = ACCENTS.green;

const AddAgentForm = ({ agent = null, onClose }) => {
  const { fetchAgents } = useContext(LeadContext);
  const [formData, setFormData] = useState({
    name:  agent?.name  || "",
    email: agent?.email || "",
  });

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (agent) {
        const res = await axios.put(`${BASE_URL}/agents/edit/${agent._id}`, formData);
        if (res) fetchAgents();
      } else {
        const res = await axios.post(`${BASE_URL}/agents`, formData);
        if (res) fetchAgents();
      }
      onClose?.();
    } catch (err) {
      console.log(err);
    }
  };

  const set = (key) => (e) => setFormData({ ...formData, [key]: e.target.value });

  return (
    <>
      <style>{modalCss}</style>

      <div
        className="m-overlay"
        onClick={(e) => { if (e.target === e.currentTarget) onClose?.(); }}
      >
        <div
          className="m-card"
          style={{
            "--m-gradient":   a.gradient,
            "--m-focus":      a.focus,
            "--m-focus-ring": a.focusRing,
            "--m-shadow":     a.shadow,
          }}
        >
          {/* HEADER */}
          <div className="m-header">
            <div className="m-header-text">
              <div className="m-eyebrow">Agent</div>
              <div className="m-title">{agent ? "Edit Agent" : "Add New Agent"}</div>
            </div>
            <button type="button" className="m-close" onClick={onClose}>✕</button>
          </div>

          {/* FORM */}
          <form onSubmit={handleSave}>
            <div className="m-body">
              <div className="m-field">
                <label className="m-label">Name</label>
                <input
                  type="text"
                  required
                  className="m-input"
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={set("name")}
                />
              </div>

              <div className="m-field">
                <label className="m-label">Email</label>
                <input
                  type="email"
                  required
                  className="m-input"
                  placeholder="e.g. john@example.com"
                  value={formData.email}
                  onChange={set("email")}
                />
              </div>
            </div>

            <div className="m-footer">
              <button type="button" className="m-btn m-btn-ghost" onClick={onClose}>Cancel</button>
              <button type="submit" className="m-btn m-btn-primary">
                {agent ? "Save Changes" : "Add Agent"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddAgentForm;
