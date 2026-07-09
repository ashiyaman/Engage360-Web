import { useContext, useState } from "react";
import { LeadContext } from "../../contexts/LeadContext";
import AddAgentForm from "./AddAgentForm";

const agentListCss = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');

  .e360-agent-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-family: 'Inter', system-ui, sans-serif;
  }

  .e360-agent-row {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 18px;
    border-radius: 14px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.07);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    transition: background 0.18s, border-color 0.18s, box-shadow 0.18s;
    cursor: default;
  }

  .e360-agent-row:hover {
    background: rgba(255,255,255,0.07);
    border-color: rgba(255,255,255,0.12);
    box-shadow: 0 8px 28px rgba(0,0,0,0.35);
  }

  .e360-agent-avatar {
    flex-shrink: 0;
    width: 40px; height: 40px;
    border-radius: 12px;
    background: linear-gradient(135deg,#059669,#34D399);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Outfit', sans-serif;
    font-size: 13px;
    font-weight: 700;
    color: #fff;
    box-shadow: 0 4px 12px rgba(52,211,153,0.4);
    letter-spacing: 0.04em;
  }

  .e360-agent-info {
    flex: 1;
    min-width: 0;
  }

  .e360-agent-name {
    font-family: 'Outfit', sans-serif;
    font-size: 14px;
    font-weight: 600;
    color: #F0F4FF;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .e360-agent-email {
    font-size: 12px;
    color: rgba(255,255,255,0.38);
    margin-top: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .e360-agent-edit-btn {
    flex-shrink: 0;
    font-family: 'Outfit', sans-serif;
    font-size: 11.5px;
    font-weight: 700;
    padding: 6px 14px;
    border-radius: 20px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    color: rgba(255,255,255,0.6);
    cursor: pointer;
    transition: all 0.18s;
    white-space: nowrap;
  }

  .e360-agent-edit-btn:hover {
    background: rgba(167,139,250,0.12);
    border-color: rgba(167,139,250,0.4);
    color: #A78BFA;
  }

  .e360-agent-empty {
    padding: 40px 20px;
    text-align: center;
    color: rgba(255,255,255,0.2);
    font-size: 13px;
    border: 1.5px dashed rgba(255,255,255,0.08);
    border-radius: 14px;
  }

  @media (min-width: 768px) {
  .e360-agent-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1280px) {
  .e360-agent-list {
    grid-template-columns: repeat(3, 1fr);
  }
}
`;

const AgentList = () => {
  const { agents } = useContext(LeadContext);
  const [editingAgent, setEditingAgent] = useState(null);

  const initials = (name) =>
    name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "?";

  return (
    <>
      <style>{agentListCss}</style>

      {editingAgent && (
        <AddAgentForm
          agent={editingAgent}
          onClose={() => setEditingAgent(null)}
        />
      )}

      <ul className="e360-agent-list">
        {(agents || []).length === 0 ? (
          <div className="e360-agent-empty">
            No agents yet — add one above.
          </div>
        ) : (
          agents.map((agent) => (
            <li key={agent._id} className="e360-agent-row">
              <div className="e360-agent-avatar">{initials(agent.name)}</div>

              <div className="e360-agent-info">
                <div className="e360-agent-name">{agent.name}</div>
                <div className="e360-agent-email">{agent.email}</div>
              </div>

              <button
                className="e360-agent-edit-btn"
                onClick={() => setEditingAgent(agent)}
              >
                Edit
              </button>
            </li>
          ))
        )}
      </ul>
    </>
  );
};

export default AgentList;
