import { useContext, useState } from "react";
import { LeadContext } from "../contexts/LeadContext";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const settingsCss = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');

  .st-page {
    font-family: 'Inter', system-ui, sans-serif;
    padding: 20px 16px 56px;
  }

  @media (min-width: 768px) {
    .st-page { padding: 28px 32px 64px; }
  }

  .st-eyebrow {
    font-family: 'Outfit', sans-serif;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(255,77,109,0.75);
    margin-bottom: 5px;
  }

  .st-title {
    font-family: 'Outfit', sans-serif;
    font-size: 24px;
    font-weight: 800;
    color: #F0F4FF;
    letter-spacing: -0.02em;
    margin-bottom: 6px;
  }

  @media (min-width: 768px) {
    .st-title { font-size: 28px; }
  }

  .st-subtitle {
    font-size: 13px;
    color: rgba(255,255,255,0.35);
    margin-bottom: 28px;
  }

  .st-section { margin-bottom: 32px; }

  .st-section-title {
    font-family: 'Outfit', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.3);
    margin-bottom: 12px;
  }

  .st-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    list-style: none;
    padding: 0; margin: 0;
  }

  .st-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 12px 16px;
    border-radius: 12px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.07);
    transition: border-color 0.18s;
  }

  .st-row:hover { border-color: rgba(255,77,109,0.2); }

  .st-row-name {
    font-size: 13.5px;
    font-weight: 500;
    color: #F0F4FF;
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .st-delete-btn {
    font-family: 'Outfit', sans-serif;
    font-size: 11.5px;
    font-weight: 700;
    padding: 6px 14px;
    border-radius: 20px;
    background: rgba(255,77,109,0.08);
    border: 1px solid rgba(255,77,109,0.25);
    color: #FF4D6D;
    cursor: pointer;
    transition: all 0.18s;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .st-delete-btn:hover {
    background: rgba(255,77,109,0.18);
    border-color: rgba(255,77,109,0.5);
    box-shadow: 0 0 12px rgba(255,77,109,0.25);
  }

  .st-warning {
    font-size: 12px;
    color: rgba(251,146,60,0.7);
    margin-bottom: 24px;
    padding: 10px 14px;
    border-radius: 10px;
    background: rgba(251,146,60,0.06);
    border: 1px solid rgba(251,146,60,0.15);
  }

  /* ── Confirm modal overlay ── */
  .st-confirm-overlay {
    position: fixed;
    inset: 0;
    z-index: 2000;
    background: rgba(4,6,16,0.80);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    display: flex;
    align-items: flex-end;
    justify-content: center;
    animation: st-fade 0.16s ease-out;
    font-family: 'Inter', system-ui, sans-serif;
  }

  @keyframes st-fade {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  @media (min-width: 640px) {
    .st-confirm-overlay {
      align-items: center;
    }
  }

  /* ── Confirm card ── */
  .st-confirm-card {
    width: 100%;
    max-width: 100%;
    border-radius: 20px 20px 0 0;
    background: rgba(13,17,34,0.98);
    backdrop-filter: blur(32px);
    -webkit-backdrop-filter: blur(32px);
    border: 1px solid rgba(255,255,255,0.09);
    border-bottom: none;
    box-shadow: 0 -16px 48px rgba(0,0,0,0.6),
                inset 0 1px 0 rgba(255,255,255,0.06);
    padding: 28px 24px 32px;
    animation: st-rise 0.22s cubic-bezier(0.2,0.8,0.3,1.05);
  }

  @keyframes st-rise {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @media (min-width: 640px) {
    .st-confirm-card {
      max-width: 420px;
      border-radius: 20px;
      border-bottom: 1px solid rgba(255,255,255,0.09);
      padding: 32px 28px;
    }
  }

  /* ── Danger icon ── */
  .st-confirm-icon {
    width: 52px;
    height: 52px;
    border-radius: 14px;
    background: rgba(255,77,109,0.12);
    border: 1px solid rgba(255,77,109,0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    margin-bottom: 18px;
    box-shadow: 0 0 20px rgba(255,77,109,0.15);
  }

  .st-confirm-title {
    font-family: 'Outfit', sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: #F0F4FF;
    margin-bottom: 8px;
  }

  .st-confirm-body {
    font-size: 13.5px;
    color: rgba(255,255,255,0.5);
    line-height: 1.6;
    margin-bottom: 6px;
  }

  .st-confirm-name {
    font-size: 13.5px;
    font-weight: 600;
    color: #F0F4FF;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 8px;
    padding: 8px 12px;
    margin: 10px 0 22px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* ── Confirm buttons ── */
  .st-confirm-btns {
    display: flex;
    gap: 10px;
  }

  .st-btn {
    font-family: 'Outfit', sans-serif;
    font-size: 13px;
    font-weight: 700;
    padding: 12px 20px;
    border-radius: 12px;
    cursor: pointer;
    border: 1px solid transparent;
    transition: all 0.18s;
    text-align: center;
    flex: 1;
  }

  .st-btn-ghost {
    background: rgba(255,255,255,0.05);
    border-color: rgba(255,255,255,0.12);
    color: rgba(255,255,255,0.65);
  }

  .st-btn-ghost:hover {
    background: rgba(255,255,255,0.09);
    color: #fff;
  }

  .st-btn-danger {
    background: linear-gradient(135deg,#C0152A,#FF4D6D);
    color: #fff;
    box-shadow: 0 4px 18px rgba(255,77,109,0.35);
  }

  .st-btn-danger:hover {
    filter: brightness(1.1);
    box-shadow: 0 6px 24px rgba(255,77,109,0.55);
    transform: translateY(-1px);
  }

  .st-btn-danger:active {
    transform: scale(0.97);
    filter: brightness(0.95);
  }
`;

/* ── Reusable confirm modal ───────────────────────────────────────────────── */
const ConfirmModal = ({ title, description, itemName, onConfirm, onCancel }) => (
  <>
    <style>{settingsCss}</style>
    <div
      className="st-confirm-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}
    >
      <div className="st-confirm-card">
        <div className="st-confirm-icon">🗑</div>
        <div className="st-confirm-title">{title}</div>
        <div className="st-confirm-body">{description}</div>
        <div className="st-confirm-name">{itemName}</div>
        <div className="st-confirm-btns">
          <button className="st-btn st-btn-ghost" onClick={onCancel}>
            Cancel
          </button>
          <button className="st-btn st-btn-danger" onClick={onConfirm}>
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  </>
);

/* ── Settings page ────────────────────────────────────────────────────────── */
const Settings = () => {
  const { leads, agents, fetchLeads, fetchAgents } = useContext(LeadContext);

  // pending = { type: 'lead'|'agent', id: string, name: string } | null
  const [pending, setPending] = useState(null);
  const [loading, setLoading] = useState(false);

  const confirmDelete = async () => {
    if (!pending) return;
    setLoading(true);
    try {
      if (pending.type === "lead") {
        await axios.delete(`${BASE_URL}/lead/${pending.id}`);
        fetchLeads();
      } else {
        await axios.delete(`${BASE_URL}/agent/${pending.id}`);
        fetchAgents();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      setPending(null);
    }
  };

  return (
    <>
      <style>{settingsCss}</style>

      {/* Confirm modal — only mounts when a delete is pending */}
      {pending && (
        <ConfirmModal
          title={`Delete ${pending.type === "lead" ? "Lead" : "Agent"}?`}
          description={
            pending.type === "lead"
              ? "This lead and all its associated comments will be permanently removed. This action cannot be undone."
              : "This agent will be permanently removed. Any leads currently assigned to them will show as Not Assigned. This action cannot be undone."
          }
          itemName={pending.name}
          onConfirm={confirmDelete}
          onCancel={() => setPending(null)}
        />
      )}

      <div className="st-page">
        <div className="st-eyebrow">Danger Zone</div>
        <h1 className="st-title">Settings</h1>
        <p className="st-subtitle">Manage and delete your data.</p>

        <div className="st-warning">
          ⚠ Deletions are permanent and cannot be undone.
        </div>

        {/* Leads */}
        <div className="st-section">
          <div className="st-section-title">Leads ({leads?.length ?? 0})</div>
          <ul className="st-list">
            {(leads || []).map((lead) => (
              <li key={lead._id} className="st-row">
                <span className="st-row-name">{lead.name}</span>
                <button
                  className="st-delete-btn"
                  onClick={() =>
                    setPending({ type: "lead", id: lead._id, name: lead.name })
                  }
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Agents */}
        <div className="st-section">
          <div className="st-section-title">Agents ({agents?.length ?? 0})</div>
          <ul className="st-list">
            {(agents || []).map((agent) => (
              <li key={agent._id} className="st-row">
                <span className="st-row-name">{agent.name}</span>
                <button
                  className="st-delete-btn"
                  onClick={() =>
                    setPending({ type: "agent", id: agent._id, name: agent.name })
                  }
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Settings;
