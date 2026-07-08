const summaryCss = `
  .e360-summary {
    margin: 0 24px 4px;
    padding: 14px 16px;
    border-radius: 12px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
    position: relative;
    overflow: hidden;
  }

  .e360-summary::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg,#7C3AED,#38BDF8);
    opacity: 0.05;
    pointer-events: none;
  }

  .e360-summary-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;
  }

  .e360-summary-icon {
    width: 22px; height: 22px;
    border-radius: 6px;
    background: linear-gradient(135deg,#7C3AED,#A78BFA);
    display: flex; align-items: center; justify-content: center;
    font-size: 11px;
    box-shadow: 0 0 10px rgba(167,139,250,0.5);
    flex-shrink: 0;
  }

  .e360-summary-title {
    font-family: 'Outfit', sans-serif;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(167,139,250,0.8);
  }

  .e360-summary p {
    font-size: 12.5px;
    color: rgba(255,255,255,0.55);
    line-height: 1.6;
    margin: 0 0 4px;
  }

  .e360-summary p:last-child { margin-bottom: 0; }

  .e360-summary strong {
    color: rgba(255,255,255,0.8);
    font-weight: 600;
  }

  .e360-summary-action {
    display: inline-block;
    margin-top: 8px;
    font-size: 11.5px;
    font-weight: 600;
    color: #A78BFA;
    background: rgba(167,139,250,0.1);
    border: 1px solid rgba(167,139,250,0.25);
    border-radius: 20px;
    padding: 3px 10px;
  }
`;

const Summary = ({ lead }) => {
  const recommendedAction =
    lead?.priority === "High" && lead?.lastActivity > 7
      ? "Follow up with customer."
      : lead?.status === "Proposal Sent" && lead?.timeToClose < 5
      ? "Schedule final discussion."
      : "Monitor and check in next week.";

  return (
    <>
      <style>{summaryCss}</style>

      <div className="e360-summary my-5">
        <div className="e360-summary-header">
          <div className="e360-summary-icon">✦</div>
          <span className="e360-summary-title">AI Summary</span>
        </div>

        <p>
          <strong>{lead?.name}</strong> is a{" "}
          <strong>{lead?.priority}-priority</strong> lead currently in the{" "}
          <strong>{lead?.status}</strong> stage.
        </p>

        <p>Last activity was <strong>{}</strong> days ago.</p>

        <p>
          Estimated to close in{" "}
          <strong>{lead?.timeToClose ?? "—"} days</strong>.
          {lead?.tags?.length > 0 && (
            <> Tagged as: <strong>{lead.tags.join(", ")}</strong>.</>
          )}
        </p>

        <span className="e360-summary-action">
          Recommended: {recommendedAction}
        </span>
      </div>
    </>
  );
};

export default Summary;
