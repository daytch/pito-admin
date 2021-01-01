import React, { useEffect, useState } from 'react'
import Sidebar from 'components/SideNavbar'
import Searchbar from 'components/forms/search'
import Table from 'components/table/index'
import { ReactComponent as Hamburger } from 'assets/images/hamburger.svg'
import ticketAPI from 'api/ticket'
import Spinner from 'components/spinner'

const Tickets = () => {
    const [isLoading, setLoading] = useState(true)
    const tableHeadTickets = [
        {
            title: "Ticket Number"
        },
        {
            title: "User Name"
        },
        {
            title: "Tittle"
        },
        {
            title: "Status"
        },
        {
            title: "Last Session"
        },
    ];

    const [ticket, setTicket] = useState([])

    useEffect(() => {
        ticketAPI.getListTicket().then(e => {
            const a = e.data.map(e => {
                return {
                    ticketNumber: e.id,
                    username:e.name,
                    tittle: e.title,
                    status: (e.status === 1) ? "Open" : "Close",
                    lastUpdated: e.last_session
                }
            })

            setTicket(a)
            setLoading(false)
        });
    }, [])
    return (
        <Spinner isLoading={isLoading} className="min-h-screen">
            <section className="min-h-screen flex flex-col xl:flex-row ">
                <Sidebar />
                <div className="py-20 px-5 w-full">
                    <div className="tickets flex justify-start">
                        <Hamburger className="mr-4" />
                        <Searchbar />
                    </div>
                    <div className="flex pt-10 overflow-x-auto">
                        <Table itemHead={tableHeadTickets} itemBodyTickets={ticket} />
                    </div>
                </div>

            </section>
        </Spinner>
    )
}

export default Tickets;
