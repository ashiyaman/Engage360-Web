import { useContext } from "react";
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

  .st-subtitle {
    font-size: 13px;
    color: rgba(255,255,255,0.35);
    margin-bottom: 28px;
  }

  .st-section {
    margin-bottom: 32px;
  }

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

  .st-row:hover {
    border-color: rgba(255,77,109,0.2);
  }

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
    margin-bottom: 16px;
    padding: 10px 14px;
    border-radius: 10px;
    background: rgba(251,146,60,0.06);
    border: 1px solid rgba(251,146,60,0.15);
  }
`;

const Settings = () => {
  const { leads, agents, fetchLeads, fetchAgents } = useContext(LeadContext);

  const handleLeadDelete = async (e, leadId) => {
    e.preventDefault();
    if (!window.confirm("Delete this lead? This cannot be undone.")) return;
    try {
      const response = await axios.delete(`${BASE_URL}/lead/${leadId}`);
      if (response) await fetchLeads();
    } catch (err) {
      console.log(err);
    }
  };

  const handleAgentDelete = async (e, agentId) => {
    e.preventDefault();
    if (!window.confirm("Delete this agent? This cannot be undone.")) return;
    try {
      const response = await axios.delete(`${BASE_URL}/agent/${agentId}`);
      if (response) {
        await fetchAgents()
        await fetchLeads()
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <style>{settingsCss}</style>
      <div className="st-page">
        <div className="st-eyebrow">Danger Zone</div>
        <h1 className="st-title">Settings</h1>
        <p className="st-subtitle">Manage and delete your data.</p>

        <div className="st-warning">
          ⚠ Deletions are permanent and cannot be undone.
        </div>

        {/* Leads */}
        <div className="st-section">
          <div className="st-section-title">Leads ({leads.length})</div>
          <ul className="st-list">
            {leads.map((lead) => (
              <li key={lead._id} className="st-row">
                <span className="st-row-name">{lead.name}</span>
                <button
                  className="st-delete-btn"
                  onClick={(e) => handleLeadDelete(e, lead._id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Agents */}
        <div className="st-section">
          <div className="st-section-title">Agents ({agents.length})</div>
          <ul className="st-list">
            {agents.map((agent) => (
              <li key={agent._id} className="st-row">
                <span className="st-row-name">{agent.name}</span>
                <button
                  className="st-delete-btn"
                  onClick={(e) => handleAgentDelete(e, agent._id)}
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
