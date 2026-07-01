import { useContext, useState } from "react"
import { LeadContext } from "../../contexts/LeadContext"
import AddAgentForm from "./AddAgentForm"

const AgentList = () => {
    const {agents} = useContext(LeadContext)
    const [selectedAgent, setSelectedAgent] = useState(null)
    const [showAddAgent, setShowAddAgent] = useState(false)

    return(
        <ul className="w-full">
            {showAddAgent && <AddAgentForm agent={selectedAgent}/>}
            {agents.map(agent => 
                (<li 
                    key={agent._id}
                    onClick={() => setSelectedAgent(agent)}
                    className="flex justify-between">
                    <span>{agent.name}</span>
                    <span>{agent.email}</span>
                    <button onClick={() => setShowAddAgent(true)}>Edit Agent</button>
                </li>)
            )}
        </ul>
    )
}

export default AgentList