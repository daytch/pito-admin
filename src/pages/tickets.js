import React, { useEffect, useState } from 'react'
import Sidebar from 'components/SideNavbar'
import Searchbar from 'components/forms/search'
import TableTicket from 'components/table/TableTicket'
import { ReactComponent as Hamburger } from 'assets/images/hamburger.svg'
import ticketAPI from 'api/ticket'
import Spinner from 'components/spinner'

const Tickets = () => {
    const [isLoading, setLoading] = useState(true)
    const tableHeadTickets = [
        {
            title: "Ticket Number",
            value: 'ticketNumber'
        },
        {
            title: "User Name",
            value: 'username'
        },
        {
            title: "Title",
            value: 'title'
        },
        {
            title: "Status",
            value: 'status'
        },
        {
            title: "Last Session",
            value: 'lastUpdated'
        }
    ];

    const [ticket, setTicket] = useState([])

    useEffect(() => {
        ticketAPI.getListTicket().then(e => {
            const a = e.data.map(e => {
                return {
                    ticketNumber: e.id,
                    username: e.name,
                    title: e.title,
                    status: (e.status === 0) ? "Open" : "Close",
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
                <div className="py-5 md:py-10 px-5 w-full">
                    <div className="tickets flex justify-start">
                        <Hamburger className="mr-4" />
                        <Searchbar />
                    </div>
                    <div className="flex pt-5 md:pt-10 overflow-x-auto">
                        <TableTicket itemHead={tableHeadTickets} itemBody={ticket} />
                    </div>
                </div>

            </section>
        </Spinner>
    )
}

export default Tickets;
