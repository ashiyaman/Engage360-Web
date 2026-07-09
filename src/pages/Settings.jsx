const Settings = () => {
  const { leads, agents, fetchLeads, fetchAgents } = useContext(LeadContext);

  const handleLeadDelete = async (e, leadId) => {
    e.preventDefault();
    if (!window.confirm("Delete this lead? This cannot be undone.")) return;
    try {
      const response = await axios.delete(`${BASE_URL}/lead/${leadId}`);
      if (response) fetchLeads();
    } catch (err) {
      console.log(err);
    }
  };

  const handleAgentDelete = async (e, agentId) => {
    e.preventDefault();
    if (!window.confirm("Delete this agent? This cannot be undone.")) return;
    try {
      const response = await axios.delete(`${BASE_URL}/agent/${agentId}`);
      if (response) fetchAgents();
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
