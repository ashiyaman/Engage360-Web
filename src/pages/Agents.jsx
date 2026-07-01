import { useState } from "react"
import AgentList from "../components/agents/AgentList"
import AddAgentForm from "../components/agents/AddAgentForm"

const Agents = () => {
    const [showAddAgent, setShowAddAgent] = useState(false)

    return(
        <div>
            {showAddAgent && <AddAgentForm />}
            <h1 className="text-xl font-bold">Agents</h1>
            <AgentList />
            <button onClick={() => setShowAddAgent(true)}>Add Agent</button>
        </div>
    )
}

export default Agents