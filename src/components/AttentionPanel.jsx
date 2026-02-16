import { useContext, useEffect, useState } from "react"
import { LeadContext } from "../contexts/LeadContext"

const AttentionPanel = () => {
    const {leads = []} = useContext(LeadContext)
    const DIFFERENCEINDATEINMS =  7 * 24 * 60 * 60

    const [stalledLeads, setStalledLeads] = useState(0)
    const [notContactedPriorityLeads, setNotContactedPriorityLeads] = useState(0)
    const [activeLeads, setActiveLeads] = useState(0)
    

    useEffect(() => {
        const notActiveLeads = leads.filter(lead => lead.status != "Closed" && (Date.now() - (new Date(lead.updatedAt).getMilliseconds()) > DIFFERENCEINDATEINMS))
        setStalledLeads(notActiveLeads.length)
        console.log(notActiveLeads)

        const priorityLeads = notActiveLeads.filter(lead => lead.priority === "High")
        setNotContactedPriorityLeads(priorityLeads.length)

        setActiveLeads(leads.length - notActiveLeads.length)

    }, [leads])
    


    return(
        <div className="bg-orange-500">
            <h3>Attention Panel</h3>
            <hr/>
            {stalledLeads > 0 && <p>{stalledLeads} Stalled Leads</p>}
            {notContactedPriorityLeads > 0 && <p>{notContactedPriorityLeads} High Priority Uncontacted</p>}
            {activeLeads > 0 && <p>{activeLeads} Leads Moved Today</p>}
        </div>
    )
}

export default AttentionPanel