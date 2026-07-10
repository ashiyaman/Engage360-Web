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
                  {isEditing
                    ? <div className="m-select-wrap"><select className="m-select" value={formData?.salesAgent} onChange={set("salesAgent")}>{agents.map((agent) => 
                      <option key={agent._id} value={agent._id}>{agent.name}</option>)}</select></div>
                    : <span className="m-value">{formData?.salesAgent}</span>}
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
