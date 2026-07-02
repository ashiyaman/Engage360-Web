// import { useState } from "react"
// import AgentList from "../components/agents/AgentList"
// import AddAgentForm from "../components/agents/AddAgentForm"

// const Agents = () => {
//     const [showAddAgent, setShowAddAgent] = useState(false)

//     return(
//         <div>
//             {showAddAgent && <AddAgentForm />}
//             <h1 className="text-xl font-bold">Agents</h1>
//             <AgentList />
//             <button onClick={() => setShowAddAgent(true)}>Add Agent</button>
//         </div>
//     )
// }

// export default Agents





import { useState } from "react";
import AgentList from "../components/agents/AgentList";
import AddAgentForm from "../components/agents/AddAgentForm";

const agentPageCss = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');

  .e360-page {
    font-family: 'Inter', system-ui, sans-serif;
    padding: 20px 16px 48px;
  }

  @media (min-width: 768px) {
    .e360-page { padding: 28px 32px 56px; }
  }

  .e360-page-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 24px;
  }

  .e360-page-title-group {}

  .e360-page-eyebrow {
    font-family: 'Outfit', sans-serif;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(52,211,153,0.7);
    margin-bottom: 4px;
  }

  .e360-page-title {
    font-family: 'Outfit', sans-serif;
    font-size: 22px;
    font-weight: 800;
    color: #F0F4FF;
    letter-spacing: -0.01em;
  }

  .e360-add-btn {
    font-family: 'Outfit', sans-serif;
    font-size: 12.5px;
    font-weight: 700;
    letter-spacing: 0.04em;
    padding: 9px 18px;
    border-radius: 11px;
    cursor: pointer;
    border: 1px solid transparent;
    transition: all 0.18s;
    background: linear-gradient(135deg,#059669,#34D399);
    color: #fff;
    box-shadow: 0 6px 20px rgba(5,150,105,0.35);
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .e360-add-btn:hover {
    box-shadow: 0 6px 24px rgba(5,150,105,0.6);
    transform: translateY(-1px);
  }

  .e360-add-btn-icon {
    font-size: 16px;
    line-height: 1;
    font-weight: 400;
  }

  .e360-agents-count {
    font-size: 12px;
    color: rgba(255,255,255,0.35);
    margin-bottom: 16px;
    font-family: 'Outfit', sans-serif;
  }

  .e360-agents-count strong {
    color: rgba(52,211,153,0.8);
    font-weight: 700;
  }
`;

const Agents = () => {
  const [showAddAgent, setShowAddAgent] = useState(false);

  return (
    <>
      <style>{agentPageCss}</style>

      {showAddAgent && (
        <AddAgentForm onClose={() => setShowAddAgent(false)} />
      )}

      <div className="e360-page">
        <div className="e360-page-header">
          <div className="e360-page-title-group">
            <div className="e360-page-eyebrow">Team</div>
            <h1 className="e360-page-title">Sales Agents</h1>
          </div>

          <button
            className="e360-add-btn"
            onClick={() => setShowAddAgent(true)}
          >
            <span className="e360-add-btn-icon">＋</span>
            Add Agent
          </button>
        </div>

        <AgentList />
      </div>
    </>
  );
};

export default Agents;
