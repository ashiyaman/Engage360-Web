import { useState } from "react";
import LeadList from "../components/leads/LeadList";
import AddLeadForm from "../components/leads/AddLeadForm";

const lmCss = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');

  .lmg-page {
    font-family: 'Inter', system-ui, sans-serif;
    padding: 20px 16px 56px;
  }

  @media (min-width: 768px) {
    .lmg-page { padding: 28px 32px 64px; }
  }

  .lmg-topbar {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 4px;
  }

  .lmg-eyebrow {
    font-family: 'Outfit', sans-serif;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(167,139,250,0.75);
    margin-bottom: 5px;
  }

  .lmg-title {
    font-family: 'Outfit', sans-serif;
    font-size: 24px;
    font-weight: 800;
    color: #F0F4FF;
    letter-spacing: -0.02em;
  }

  .lmg-add-btn {
    font-family: 'Outfit', sans-serif;
    font-size: 13px;
    font-weight: 700;
    padding: 10px 20px;
    border-radius: 12px;
    cursor: pointer;
    border: 1px solid transparent;
    background: linear-gradient(135deg,#7C3AED,#A78BFA);
    color: #fff;
    box-shadow: 0 6px 22px rgba(124,58,237,0.4);
    transition: all 0.18s;
    display: inline-flex;
    align-items: center;
    gap: 7px;
    white-space: nowrap;
    align-self: flex-start;
  }

  .lmg-add-btn:hover {
    box-shadow: 0 8px 28px rgba(124,58,237,0.65);
    transform: translateY(-1px);
  }
`;

const LeadManagement = () => {
  const [showAddLead, setShowAddLead] = useState(false);

  return (
    <>
      <style>{lmCss}</style>

      {showAddLead && (
        <AddLeadForm onClose={() => setShowAddLead(false)} />
      )}

      <div className="lmg-page">
        <div className="lmg-topbar">
          <div>
            <div className="lmg-eyebrow">Pipeline</div>
            <h1 className="lmg-title">Lead Management</h1>
          </div>
          <button
            className="lmg-add-btn"
            onClick={() => setShowAddLead(true)}
          >
            <span>＋</span>
            Add Lead
          </button>
        </div>

        <LeadList />
      </div>
    </>
  );
};

export default LeadManagement;
