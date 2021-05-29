import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ReactHtmlParserfrom from 'react-html-parser'
import { ReactComponent as ShareIconMobile } from 'assets/images/share-icon-mobile.svg'

//import Component SVG and image
import { ReactComponent as PlayIcon } from 'assets/images/icon-play.svg'
import { ReactComponent as EyeIcon } from 'assets/images/eye-icon.svg'
import { ReactComponent as LikeIcon } from 'assets/images/thumbs-like-icon.svg'
import { ReactComponent as FbIcon } from 'assets/images/fb-icon.svg'
import { ReactComponent as IgIcon } from 'assets/images/ig-icon.svg'
import { ReactComponent as TtIcon } from 'assets/images/tiktok-icon.svg'
import Modal from 'react-modal'
import DefaultImg from 'assets/images/default.svg'
import { CopyToClipboard } from 'react-copy-to-clipboard'

Modal.setAppElement('*'); // suppresses modal-related test warnings.

const UserLivestreamVideos = ({ displayToolTip, ListVideo }) => {

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
                            <div className="flex">
                                <div className="item relative">
                                    <Link // to={`/livestream/detail/${item.id}`}
                                        to={{
                                            pathname: `/livestream/detail/${item.id}`,
                                            query: { iframe: item.iframe }
                                        }} className="link-wrapped">
                                        <figure className="item-image-user">
                                            <div className="minute-user py-2 px-2">
                                                <p className="font-medium text-sm text-white float-right">30:32</p>
                                            </div>
                                            <PlayIcon style={{ transition: "all .15s ease" }}
                                                onClick={() => openModal(item.iframe)} className="icon" />
                                            <img src={item.img_thumbnail} onError={(e) => { e.target.onerror = null; e.target.src = DefaultImg }} alt={item.title} />
                                        </figure>
                                    </Link>
                                </div>
                            </div>
                            <div className="item-meta xl:px-4 w-full xl:w-2/3">
                                <h4 className="font-semibold text-lg md:text-xl text-gray-700 break-all">{item.title}</h4>
                                <p className="overflow-ellipsis overflow-hidden h-10 break-all font-light mt-2 text-xs md:text-sm text-justify text-gray-700">
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
                                                return (<span key={index}><div className="rounded-full inline-block w-2 h-2 bg-gray-700 mx-2"></div><h6 className="text-xs inline-block">{item}</h6></span>)
                                            })
                                        }
                                    </div>
                                }
                                <div className="merchant-dashboard my-2 flex flex-wrap">
                                    {/* {
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
                                    } */}
                                    {
                                        item.facebook_url && (
                                            <Link target="_blank" to={{ pathname: item.redirect_fb }} style={{ transition: "all .15s ease" }} ><FbIcon className="mr-4" /></Link>)
                                    }
                                    {
                                        item.instagram_url && (<Link target="_blank" to={{ pathname: item.redirect_ig }} style={{ transition: "all .15s ease" }}><IgIcon className="mr-4" /></Link>)

                                    }
                                    {
                                        item.tiktok_url && (<Link target="_blank" to={{ pathname: item.redirect_tiktok }} style={{ transition: "all .15s ease" }}><TtIcon className="mr-4" /></Link>)
                                    }
                                    <CopyToClipboard text={item.share_url}>
                                        <button onClick={displayToolTip}><ShareIconMobile className="mr-4" /></button>
                                    </CopyToClipboard>
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
        </>)
}

export default UserLivestreamVideos;