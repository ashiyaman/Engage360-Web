import AgentPerformanceChart from "../components/reports/agentPerformanceChart"
import ForwardedLeadsChart from "../components/reports/ForwaredLeadsChart"
import LeadsByStatusChart from "../components/reports/LeadsByStatusChart"
import LeadsPipelineChart from "../components/reports/LeadsPipelineChart"

const Reports = () => {
    return(
        <div>
            <h3>Reports</h3>
            <LeadsPipelineChart />
            <LeadsByStatusChart />
            <ForwardedLeadsChart />
            <AgentPerformanceChart />
        </div>
    )
}

export default Reports