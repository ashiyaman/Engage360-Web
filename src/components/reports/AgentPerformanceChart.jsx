import { useContext } from "react"
import getAnalytics from "../../utils/analytics"
import { LeadContext } from "../../contexts/LeadContext"

const AgentPerformanceChart = () => {
    const {leads} = useContext(LeadContext)
    const {agentPerformance} = getAnalytics(leads)
    const data = Object.entries(agentPerformance).map(([name, value]) => ({name, ...value}))

    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Agent</th>
                        <th>Total</th>
                        <th>High</th>
                        <th>Stalled</th>
                        <th>Closed</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(agent => (
                        <tr>
                            <td>{agent.name}</td>
                            <td>{agent.total}</td>
                            <td>{agent.high}</td>
                            <td>{agent.stalled}</td>
                            <td>{agent.closed}</td>
                        </tr>))}
                </tbody>
            </table>
        </div>
    )
}

export default AgentPerformanceChart