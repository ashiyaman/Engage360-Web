import LeadsByStatusChart from "../components/reports/LeadsByStatusChart"
import LeadsPipelineChart from "../components/reports/LeadsPipelineChart"

const Reports = () => {
    return(
        <div>
            <h3>Reports</h3>
            <LeadsPipelineChart />
            <LeadsByStatusChart />
        </div>
    )
}

export default Reports