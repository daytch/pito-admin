import React, { useState } from 'react'
import { Link } from 'react-router-dom'

//import Component SVG and image
import DefaultImg from 'assets/images/default.svg'
import { ReactComponent as PlayIcon } from 'assets/images/icon-play.svg'
import { ReactComponent as EyeIcon } from 'assets/images/eye-icon.svg'
import { ReactComponent as LikeIcon } from 'assets/images/thumbs-like-icon.svg'
import { ReactComponent as CalendarIcon } from 'assets/images/calendar-icon.svg'
import ReactHtmlParserfrom from 'react-html-parser'
import Modal from 'react-modal'
import Moment from 'moment'
import Converter from 'configs/moment/DatetimeConverter'
Modal.setAppElement('*'); // suppresses modal-related test warnings.

const MostviewsVideos = ({ id, no, thumbnail, views, likes, title, iframe, categories, start_time }) => {

    const [dataModal, setDataModal] = useState('')
    const [modalIsOpen, setIsOpen] = useState(false)
    let subtitle;

    const openModal = (data) => {
        setIsOpen(true)
        setDataModal(data)
    }
    const closeModal = () => { setIsOpen(false) }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
        }
    };

    return (
        <div className="px-2 lg:px-6 xxl:px-0">
            <div className="mt-8 flex flex-wrap lg:flex-no-wrap">
                <div className="md:flex flex-row lg:flex-no-wrap items-baseline">
                    <div className="flex w-full lg:w-1/2 max-w-none">
                        <p>{no}.</p>
                        <div className="item relative w-auto px-4 lg:px-2">
                            <figure className="item-image">
                                <Link to={{
                                    pathname: `/dashboard/detail/${id}`,
                                    query: { iframe }
                                }} className="link-wrapped">
                                    <PlayIcon style={{ transition: "all .15s ease" }}
                                        onClick={() => openModal(iframe)} className="icon" />
                                    <img src={thumbnail} onError={(e) => { e.target.onerror = null; e.target.src = DefaultImg }} alt={title} className="thumbnail-live" />
                                </Link>
                            </figure>
                        </div>
                    </div>
                    <div className="flex flex-col ml-6 lg:w-2/3 item-meta">
                        <div className="flex flex-wrap">
                            <h4 className="break-all font-light xl:text-lg xxl:text-xl text-gray-700 py-3 lg:py-0 px-4 lg:px-0 lg:mb-4">{title}</h4>
                        </div>
                        <div className="flex flex-wrap items-center px-4 xl:px-0 leading-relaxed">
                            <div className="flex mr-2 md:mr-4 items-center">
                                <EyeIcon className="icon-at-user" />
                                <h4 className="ml-2 text-red-700 xl:text-sm font-semibold">{views} <span className="text-gray-900 xl:text-xs font-medium">Views</span></h4>
                            </div>
                            <div className="flex mr-2 md:mr-4 items-center">
                                <LikeIcon className="icon-at-user" />
                                <h4 className="ml-2 text-red-700 xl:text-sm font-semibold">{likes} <span className="text-gray-900 xl:text-xs font-medium">Likes</span></h4>
                            </div>
                            <div className="flex mr-2 md:mr-4 items-center">
                                <CalendarIcon className="icon-at-user" />
                                <h4 className="ml-2 text-gray-900 text-sm md:text-sm  font-medium">{Moment(Converter.convertToLocal(start_time)).fromNow()}</h4>
                            </div>
                        </div>
                        {
                            categories && <div className="pl-3 xl:pl-0 flex flex-wrap text-sm font-medium text-gray-700 items-center mt-2">
                                {
                                    categories.map((item, index) => {
                                        return (<span key={index}><div className="rounded-full inline-block w-2 h-2 bg-gray-700 mx-2"></div><h6 className="text-xs inline-block">{item}</h6></span>)
                                    })
                                }
                            </div>
                        }

                        <Modal
                            isOpen={modalIsOpen}
                            onAfterOpen={afterOpenModal}
                            onRequestClose={closeModal}
                            style={customStyles}
                            contentLabel="Livestream Modal"
                            shouldCloseOnOverlayClick={false}
                        >
                            <div className="flex items-start justify-between border-b border-solid border-gray-300 rounded-t">
                                <h6 ref={_subtitle => (subtitle = _subtitle)}>{title}</h6>
                                <button
                                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                    onClick={closeModal}  >
                                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                                </button>
                            </div>
                            {/*body*/}
                            <div className="relative p-6 flex-auto">
                                {ReactHtmlParserfrom(dataModal)}
                            </div>
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MostviewsVideos;