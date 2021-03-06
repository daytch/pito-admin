import React, { useEffect, useState } from 'react'
import Sidebar from 'components/SideNavbar'
import Card from 'components/card'
import Support from 'api/ticket'
import Dropdown from 'components/forms/dropdown'
import { Link } from 'react-router-dom'
import Spinner from 'components/spinner'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const TicketDetail = (props) => {

    const [id] = useState(props.match.params.id)
    const [title] = useState(props.location.query.title)
    const [isLoading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [message, setMessage] = useState('')
    const [status, setStatus] = useState('')
    const [hideInput, setHideInput] = useState(false);

    function changeMessage(e) {
        setMessage(e.getData());
    }
    function getMessage() {
        Support.getListMessage(props.match.params.id).then(e => {

            const isClosed = e.data.map((el) => el.status).indexOf(1);
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
        setLoading(true)
        const formData = new FormData();
        formData.append('ticket_id', props.match.params.id)
        formData.append('message', message)
        Support.ReplyTicket(formData).then(() => {
            getMessage()
            setLoading(false)
        })
    }

    function changeStatus(e) {
        if (e.id === 1) {
            MySwal.fire({
                title: 'Are you sure?',
                text: "Do you really want to close this Ticket Support? This process cannot be undone.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, close it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    setLoading(true)
                    let ticket_id = id;
                    Support.delete({ ticket_id }).then((res) => {
                        setLoading(false)
                        MySwal.fire(
                            'Deleted!',
                            'Your data has been deleted.',
                            'success'
                        ).then(() => {
                            window.location.href = '/ticket'
                        })
                    })
                }
            })
        }
        setStatus(e.id)
    }

    function handleChange(data) {
        setMessage(data)
    }

    const items = [
        {
            id: 0,
            value: 'Open'
        },
        {
            id: 1,
            value: 'Close'
        }
    ]

    return (
        <Spinner isLoading={isLoading}>
            <section className="min-h-screen flex flex-col xl:flex-row ">
                <Sidebar />
                <div className="chat-history">
                    {
                        hideInput ? null :
                            (
                                <div className="ml-3 md:ml-20 mt-5">
                                    <div className="flex">
                                        <div className="w-full md:w-40 form-categories border border-gray-300 rounded-md px-2 py-2 mr-4 my-2" role="button">
                                            <Dropdown title="Open" onClick={changeStatus} items={items} />
                                        </div>
                                    </div>
                                </div>
                            )
                    }
                    <Card ListData={data} title={title} />
                    {
                        hideInput ? (
                            <div className="ml-20 mt-5">
                                <div className="flex">
                                    <Link to={"/ticket"} className="border border-gray-300 text-red-600 rounded-md text-lg px-6 py-2 mr-4">Back</Link>
                                </div>
                            </div>) :
                            (
                                <div className="md:ml-16">
                                    <div className="flex flex-wrap items-start mt-4">
                                        {/* <textarea onChange={e => handleChange(e.target.value)} placeholder="Message" className="w-full md:w-4/5 h-32 px-4 py-2 border border-gray-300 rounded-lg" /> */}
                                        <CKEditor
                                            editor={ClassicEditor}
                                            // data="<p>Hello from CKEditor 5!</p>"
                                            config={{ placeholder: "Please type a message..." }}
                                            onReady={editor => {
                                                editor.editing.view.change(writer => {
                                                    writer.setStyle(
                                                        "height",
                                                        "200px",
                                                        editor.editing.view.document.getRoot()
                                                    );
                                                });
                                                const data = editor.getData();
                                                // You can store the "editor" and use when it is needed.
                                                console.log('Editor is ready to use!', editor);
                                            }}
                                            onChange={(event, editor) => {
                                                changeMessage(editor);
                                                console.log({ event, editor, data });
                                            }}
                                        // onBlur={(event, editor) => {
                                        //     // console.log('Blur.', editor);
                                        // }}
                                        // onFocus={(event, editor) => {
                                        //     // console.log('Focus.', editor);
                                        // }}
                                        />
                                    </div>
                                    {/* <div className="w-40 form-categories border border-gray-300 rounded-md px-2 py-2 mr-4 my-2" role="button">
                                        <Dropdown title="Open" onClick={changeStatus} items={items} />
                                    </div> */}
                                    <div className="flex py-5">
                                        <Link to={"/ticket"} className="border border-gray-300 text-red-600 rounded-md text-lg px-6 py-2 mr-4">Back</Link>
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
