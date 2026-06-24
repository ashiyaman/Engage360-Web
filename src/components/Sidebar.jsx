import { Link } from "react-router-dom"
import LeadManagement from "../pages/LeadManagement"

const Sidebar = () => {
    return(
        <aside className="flex flex-col pt-25 px-5 text-left gap-3 text-lg">
            <Link to='/dashboard'>Dashboard</Link>
            <Link to='/leads'>Leads</Link>
            <Link to='/sales'>Sales</Link>
            <Link to='/agents'>Agents</Link>
            <Link to='/reports'>Reports</Link>
            <Link to='/settings'>Settings</Link>
        </aside>
    )
}

export default Sidebar