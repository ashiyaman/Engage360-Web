import { useContext } from "react"
import { LeadContext } from "../contexts/LeadContext"
import { BASE_URL } from "../utils/constants"
import axios from "axios"

const Settings = () => {
    const {leads, agents, fetchLeads, fetchAgents} = useContext(LeadContext)

    const handleLeadDelete = async(e, leadId) => {
        e.preventDefault()
        try{
            const response = await axios.delete(`${BASE_URL}/lead/${leadId}`)
            if(response){
                fetchLeads()
            }
        }
        catch(err){
            console.log(err)
        }
    }

      const handleAgentDelete = async(e, agentId) => {
        e.preventDefault()
        try{
            const response = await axios.delete(`${BASE_URL}/agent/${agentId}`)
            if(response){
                fetchAgents()
            }
        }
        catch(err){
            console.log(err)
        }
    }

    return(
        <div>
            <h2>Settings</h2>
            <ul>
                <h3>Leads</h3>
                {leads.map(lead => (<li>{lead.name} <button onClick={(e) => handleLeadDelete(e, lead._id)}>Delete</button></li>))}
            </ul>
            <ul>
                <h3>Agents</h3>
                {agents.map(agent => (<li>{agent.name} <button onClick={(e) => handleAgentDelete(e, agent._id)}>Delete</button></li>))}
            </ul>
        </div>
    )
}

export default Settings