import React, { useEffect, useState } from 'react'
import Sidebar from 'components/SideNavbar'
import Card from 'components/card'
import axios from 'configs/axios'
import Spinner from 'components/spinner'
import ticket from 'api/ticket'

const TicketDetail = (props) => {

    const [isLoading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [message, setmessage] = useState('')

    function getMessage() {
        ticket.getListTicket(props.match.params.id).then(e => {
            const a = e.data.map(a => {
                return {
                    name: a.name,
                    text: a.text,
                    lastUpdated: a.createdAt,
                    image: ""
                }
            })

            setData(a);
            setLoading(false)
        })
    }

    useEffect(() => {
        getMessage()
    }, [])



    function handleSubmit() {
        const formData = new FormData();
        formData.append('ticket_id', props.match.params.id)
        formData.append('message', message)
        axios.post('/admin/insertMessageTicket', formData).then(e => {
            getMessage()
        })
    }

    function handleChange(data) {
        setmessage(data)
    }


    return (
        <Spinner isLoading={isLoading} className="min-h-screen">
            <section className="min-h-screen flex flex-col xl:flex-row ">
                <Sidebar />
                <div className="chat-history">
                    <Card ListData={data} />
                    <div className="ml-16">
                        <div className="flex flex-wrap items-start mt-4">
                            <textarea onChange={e => handleChange(e.target.value)} placeholder="Message" className="w-full md:w-4/5 h-32 px-4 py-2 border border-gray-300 rounded-lg" />
                        </div><br />
                        <div className="flex mt-6">
                            <button onClick={handleSubmit} className="border lg:w-32 w-full text-white font-medium bg-red-600 rounded-lg text-lg px-10 py-2">Reply</button>
                        </div>
                    </div>
                </div>
            </section>
        </Spinner>
    )
}

export default TicketDetail;
