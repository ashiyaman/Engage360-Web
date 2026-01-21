import { Outlet } from "react-router-dom"

import Header from "./Header"
import Sidebar from "./Sidebar"

const Body = () => {
    return(
        <>
            <Header />
            <Sidebar />
            <Outlet />
        </>
    )
}

export default Body