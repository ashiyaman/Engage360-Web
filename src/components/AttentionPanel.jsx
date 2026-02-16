import { useContext, useEffect, useState } from "react"
import { LeadContext } from "../contexts/LeadContext"

const AttentionPanel = ({ forwardedLeads, stalledPriorityLeads, stalledLeads }) => {   

return(
        <div className="bg-orange-500">
            <h3>Attention Panel</h3>
            <hr/>
            {stalledLeads > 0 && <p>{stalledLeads} Stalled Leads</p>}
            {stalledPriorityLeads.length > 0 && <p>{stalledPriorityLeads.length} High Priority Uncontacted</p>}
            {forwardedLeads.length > 0 && <p>{forwardedLeads.length} Leads Moved Today</p>}
        </div>
    )
}

export default AttentionPanel