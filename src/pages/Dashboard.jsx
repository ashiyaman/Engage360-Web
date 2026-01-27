import { useContext, useEffect, useState } from "react"

import { LeadContext } from "../contexts/LeadContext"
import Stats from "../components/Stats"

const Dashboard = () => {
    const {leads} = useContext(LeadContext)

    return(
        <div>
            <h1>Dashboard</h1>
            <section className="bg-yellow-300">
                <Stats />
            </section>
            <ul>
                {leads && leads.map(lead => (<li key={lead._id} className="border-2 m-2">
                    <h5>{lead.name}</h5>
                    <p>Status: {lead.status}</p>
                    <p>Priority: {lead.priority}</p>
                </li>))}
            </ul>
        </div>
    )
}

export default Dashboard