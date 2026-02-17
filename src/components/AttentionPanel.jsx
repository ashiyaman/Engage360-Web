import { useContext, useEffect, useState } from "react"
import { LeadContext } from "../contexts/LeadContext"

const AttentionPanel = ({ forwardedLeads, stalledPriorityLeads, stalledLeadsCount }) => {   

return(
        <div className="bg-orange-500">
            <h3>Attention Panel</h3>
            <hr/>
            {stalledLeadsCount > 0 && <p>{stalledLeadsCount} Stalled Leads</p>}
            {stalledPriorityLeads.length > 0 && <p>{stalledPriorityLeads.length} High Priority Uncontacted</p>}
            {forwardedLeads.length > 0 && <p>{forwardedLeads.length} Leads Moved Today</p>}
        </div>
    )
}

export default AttentionPanel