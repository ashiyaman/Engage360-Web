const Summary = ({lead}) => {
    return(
        <div className="text-justify">
            <hr/>
            <h3>AI Summary</h3>
            <p>{lead.name} is a {lead.priority}-priority lead currently in the {lead.status} stage.</p>
            <p>Last activity was {} days ago.</p>
            <p>The lead has {} comments and is estimated to close in {} days</p>
            <p>Recommended Action: 
                {(lead.priority === "High" && lead.lastActivitity > 7) 
                    ? "Follow up with customer." 
                    : (lead.status === "Proposal Sent" && lead.timeToClose < 5) 
                    ? "Schedule final discussion." 
                    : "Do Nothing."}</p>
            <hr/>
        </div>
    )
}

export default Summary