import { Link } from "react-router-dom"
import LeadManagement from "../pages/LeadManagement"

const Sidebar = () => {
    return(
        <aside className="flex flex-col left-0">
            <h1>Sidebar</h1>
            <Link to='/leads'>Leads</Link>
            <Link to='/sales'>Sales</Link>
            <Link to='/agents'>Agents</Link>
            <Link to='/reports'>Reports</Link>
            <Link to='/settings'>Settings</Link>
        </aside>
    )
}

export default Sidebar