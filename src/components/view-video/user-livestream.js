import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ReactHtmlParserfrom from 'react-html-parser'
import { ReactComponent as ShareIconMobile } from 'assets/images/share-icon-mobile.svg'
// import Moment from 'moment'

//import Component SVG and image
import { ReactComponent as PlayIcon } from 'assets/images/icon-play.svg'
import { ReactComponent as EyeIcon } from 'assets/images/eye-icon.svg'
import { ReactComponent as LikeIcon } from 'assets/images/thumbs-like-icon.svg'
import { ReactComponent as FbIcon } from 'assets/images/fb-icon.svg'
import { ReactComponent as IgIcon } from 'assets/images/ig-icon.svg'
import { ReactComponent as TtIcon } from 'assets/images/tiktok-icon.svg'
import DefaultImg from 'assets/images/default.svg'
import Modal from 'react-modal'
Modal.setAppElement('*'); // suppresses modal-related test warnings.

const UserLivestreamVideos = ({ ListVideo }) => {

    const [dataModal, setDataModal] = useState('');
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
        <>
            {
                ListVideo && ListVideo.map((item, index) => {
                    return (
                        <div key={index} className="mt-8 flex flex-wrap xl:flex-no-wrap">
                            <div className="">
                                <div className="item relative">
                                    <figure className="item-image-user">
                                        <div className="minute-user py-2 px-2">
                                            <p className="font-medium text-sm text-white float-right">{/*Moment.duration(Moment(item.end_time).diff(Moment(item.start_time))).format("HH:mm:ss")*/}30:32</p>
                                        </div>
                                        <PlayIcon style={{ transition: "all .15s ease" }}
                                            onClick={() => openModal(item.iframe)} className="icon" />
                                        <img src={item.img_thumbnail} onError={(e) => { e.target.onerror = null; e.target.src = DefaultImg }} alt={item.title} />
                                    </figure>
                                </div>
                                <Link to="/" className="link-wrapped hidden"></Link>
                            </div>
                            <div className="item-meta xl:px-4 w-full xl:w-2/3">
                                <h4 className="font-semibold text-lg md:text-xl text-gray-700 break-all">{item.title}</h4>
                                <p className="font-light mt-2 text-xs md:text-sm text-justify text-gray-700">
                                    {item.description}
                                </p>
                                <div className="icon-controller-user flex flex-wrap items-center py-2">
                                    <div className="flex mr-4 items-center">
                                        <EyeIcon className="icon-at-user" />
                                        <h4 className="ml-2 text-gray-900 text-xs md:text-sm font-medium">{item.views} Views</h4>
                                    </div>
                                    <div className="flex mr-4 items-center">
                                        <LikeIcon className="icon-at-user" />
                                        <h4 className="ml-2 text-gray-900 text-xs md:text-sm  font-medium">{item.likes} Likes</h4>
                                    </div>
                                    {/* <div className="flex mr-4 items-center">
                                        <CalendarIcon className="icon-at-user" />
                                        <h4 className="ml-2 text-gray-900 text-xs md:text-sm  font-medium">283 Likes</h4>
                                    </div> */}
                                </div>
                                {
                                    item.categories && <div className="flex flex-wrap text-sm font-medium text-gray-700 items-center mt-2">
                                        {
                                            item.categories.map((item, index) => {
                                                return (<span key={index}><div className="rounded-full inline-block w-2 h-2 bg-gray-700 mx-2"></div><h6 className="inline-block">{item}</h6></span>)
                                                // : (<span key={index}><div className="rounded-full w-2 h-2 bg-gray-700 mx-2"></div><h6>{item}</h6></span>)
                                            })
                                        }
                                    </div>
                                }
                                <div className="merchant-dashboard my-2 flex flex-wrap">
                                    {
                                        item.facebook_url && (
                                            <button style={{ transition: "all .15s ease" }}
                                                onClick={() => openModal(item.facebook_url)}><FbIcon className="mr-4" />
                                            </button>)
                                    }
                                    {
                                        item.instagram_url && (<button style={{ transition: "all .15s ease" }}
                                            onClick={() => openModal(item.instagram_url)}><IgIcon className="mr-4" /></button>)
                                    }
                                    {
                                        item.tiktok_url && (<button style={{ transition: "all .15s ease" }}
                                            onClick={() => openModal(item.tiktok_url)}><TtIcon className="mr-4" /></button>)
                                    }
                                    <button href=""><ShareIconMobile className="mr-4" /></button>
                                </div>

                                <Modal
                                    isOpen={modalIsOpen}
                                    onAfterOpen={afterOpenModal}
                                    onRequestClose={closeModal}
                                    style={customStyles}
                                    contentLabel="Livestream Modal"
                                    shouldCloseOnOverlayClick={false}
                                >
                                    <div className="flex items-start justify-between border-b border-solid border-gray-300 rounded-t">
                                        <h6 ref={_subtitle => (subtitle = _subtitle)}>{item.title}</h6>
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
                    )
                })
            }
        </>
    )
}

export default UserLivestreamVideos;