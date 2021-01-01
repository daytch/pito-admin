import React, { useEffect, useState } from 'react'
import Sidebar from 'components/SideNavbar'
import Card from 'components/card'
import axios from 'configs/axios'
import Spinner from 'components/spinner'
import ticket from 'api/ticket'
import Dropdown from 'components/forms/dropdown'

const TicketDetail = (props) => {

    const [isLoading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [message, setmessage] = useState('')
    const [hideInput, setHideInput] = useState(false);

    function getMessage() {
        ticket.getListMessage(props.match.params.id).then(e => {

            const isClosed = e.data.map((el) => el.status).indexOf(0);
            setHideInput(isClosed === -1 ? false : true)
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
        // eslint-disable-next-line 
    }, [])



    function handleSubmit() {
        const formData = new FormData();
        formData.append('ticket_id', props.match.params.id)
        formData.append('message', message)
        axios.post('/admin/insertMessageTicket', formData).then(() => {
            getMessage()
        })
    }

    function handleChange(data) {
        setmessage(data)
    }

    const items = [
        {
            id: 1,
            value: 'Open'
        },
        {
            id: 0,
            value: 'Close'
        }
    ]
    return (
        <Spinner isLoading={isLoading} className="min-h-screen">
            <section className="min-h-screen flex flex-col xl:flex-row ">
                <Sidebar />
                <div className="chat-history">
                    <Card ListData={data} />
                    {
                        hideInput ? null :
                            (
                                <div className="ml-16">
                                    <div className="flex flex-wrap items-start mt-4">
                                        <textarea onChange={e => handleChange(e.target.value)} placeholder="Message" className="w-full md:w-4/5 h-32 px-4 py-2 border border-gray-300 rounded-lg" />
                                    </div>
                                    <br />
                                    <Dropdown title="Open" items={items} />
                                    <br />
                                    <div className="flex">
                                        <button onClick={handleSubmit} className="border lg:w-32 w-full text-white font-medium bg-red-600 rounded-lg text-lg px-10 py-2">Reply</button>
                                    </div>
                                </div>)
                    }
                </div>
            </section>
        </Spinner>
    )
}

export default TicketDetail;
