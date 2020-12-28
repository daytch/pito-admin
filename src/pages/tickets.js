import React, { useEffect, useState } from 'react'
import Sidebar from 'components/SideNavbar'
import Searchbar from 'components/forms/search'
import Table from 'components/table/index'
import { ReactComponent as Hamburger } from 'assets/images/hamburger.svg'
import axios from '../configs/axios'

const Tickets = () => {
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

    const tableBodyTickets = [
        {
            ticketNumber: '#10111456101',
            username: 'Tommy A.S',
            tittle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
            status: 'Open/Closed',
            lastSession: "01/09/2020 (00:18)",
        },
        {
            ticketNumber: '#10111456102',
            username: 'Trumps A.S',
            tittle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
            status: 'Open/Closed',
            lastSession: "01/09/2020 (00:18)",
        },
        {
            ticketNumber: '#10111456103',
            username: 'Dadang A.S',
            tittle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
            status: 'Open/Closed',
            lastSession: "01/09/2020 (00:18)",
        },

    ]

    
    const [ticket, setTicket] = useState([])

    useEffect(() => {
       axios.get('/merchant/listTicket').then(e=>{
           console.log(e.data)
           const a = e.data.map(e=>{
               return {
                   ticketNumber: e.id,
                   tittle: e.title,
                   status: e.status,
                   lastUpdated: e.last_session
               }
           })

           setTicket(a)
       });
    }, [])
    return (
        <>
            <section className="flex flex-col xl:flex-row ">
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
        </>
    )
}

export default Tickets;
