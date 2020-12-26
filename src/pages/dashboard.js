import React, { useEffect } from 'react'

import Sidebar from 'components/SideNavbar'
import Graph from 'components/Graph'
import live from 'api/livestream'

const Dashboard = () => {
    useEffect(() => {
        live.getCategory().then((res) => {
            debugger;
        });
    }, [])
    return (
        <section className="flex flex-col xl:flex-row">
            <Sidebar />
            <Graph />
        </section>
    )
}

export default Dashboard;
