import React, { useState } from 'react';
import { Link } from 'react-router-dom';

//import Component SVG and image
import DefaultImg from 'assets/images/default.svg';
import { ReactComponent as PlayIcon } from 'assets/images/icon-play.svg';
import { ReactComponent as EyeIcon } from 'assets/images/eye-icon.svg';
import { ReactComponent as LikeIcon } from 'assets/images/thumbs-like-icon.svg';
import { ReactComponent as SharedIcon } from 'assets/images/shared-icon.svg';
import { ReactComponent as FbIcon } from 'assets/images/fb-rounded.svg';
import { ReactComponent as IgIcon } from 'assets/images/ig-rounded.svg';
import { ReactComponent as TiktokIcon } from 'assets/images/tiktok-rounded.svg';
import { ReactComponent as ShareLinkIcon } from 'assets/images/share-link.svg';
import ReactHtmlParserfrom from 'react-html-parser';
import Modal from 'react-modal';
import Moment from 'moment';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import general from '../../shared/general';
import { toast } from 'react-toastify';
Modal.setAppElement('*'); // suppresses modal-related test warnings.

const MostviewsVideos = ({ key, id, thumbnail, views, likes, title, iframe, start_time, share, redirect_fb,
    redirect_ig, redirect_tiktok, share_url, merchant }) => {

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
    function goToLink(url) {
        window.open(url, "_blank");
    }

    function triggerToast() {
        toast.info("Copied! 🚀", {
            position: toast.POSITION.TOP_RIGHT
        });
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
            <div key={key} className="px-2 mb-2 lg:px-6 xxl:px-0">
                <div className="mt-8 flex flex-wrap lg:flex-no-wrap">
                    <div className="md:flex flex-row">
                        <div className="flex max-w-none">
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
                        <div className="flex flex-col ml-2">
                            <div className="flex flex-wrap">
                                <h6 className="break-all font-bold text-sm text-red-700 py-3 lg:py-0 px-4 lg:px-0">Live on {Moment(start_time).format('MMMM Do YYYY, h:mm a')}</h6>
                            </div>
                            <div className="flex flex-wrap lg:h-12">
                                <h5 className="break-all overflow-wrap text-xs md:text-sm font-semibold text-md text-gray-700 py-3 lg:py-0 px-4 lg:px-0 lg:mb-2">{title}</h5>
                            </div>
                            <div className="flex flex-wrap">
                                <p className="break-all overflow-wrap font-light text-xs md:text-sm text-gray-700 py-3 lg:py-0 px-4 lg:px-0">{merchant}</p>
                            </div>
                            <div className="flex flex-wrap items-center px-4 xl:px-0 leading-relaxed">
                                <div className="flex mr-2 md:mr-4 items-center">
                                    <EyeIcon className="icon-at-user" />
                                    <h5 className="ml-2 text-gray-900 xl:text-xs font-semibold">{general.kFormatter(views)} <span className="text-gray-900 xl:text-xs font-medium">Views</span></h5>
                                </div>
                                <div className="flex mr-2 md:mr-4 items-center">
                                    <LikeIcon className="icon-at-user" />
                                    <h5 className="ml-2 text-gray-900 xl:text-xs font-semibold">{general.kFormatter(likes)} <span className="text-gray-900 xl:text-xs font-medium">Likes</span></h5>
                                </div>
                                <div className="flex mr-2 md:mr-4 items-center">
                                    <SharedIcon className="icon-at-user" />
                                    <h5 className="ml-2 text-gray-900 xl:text-xs font-semibold">{share} <span className="text-gray-900 xl:text-xs font-medium">Shares</span></h5>
                                    {/* <CalendarIcon className="icon-at-user" />
                                <h4 className="ml-2 text-gray-900 text-sm md:text-sm  font-medium">{Moment(Converter.convertToLocal(start_time)).fromNow()}</h4> */}
                                </div>
                            </div>
                            <div className="flex flex-row">
                                {
                                    redirect_fb && (
                                        <FbIcon onClick={() => goToLink(redirect_fb)} className="mt-2 mr-2" />
                                    )
                                }
                                {
                                    redirect_ig && (
                                        <IgIcon onClick={() => goToLink(redirect_ig)} className="mt-2 mr-2" />
                                    )
                                }
                                {
                                    redirect_tiktok && (
                                        <TiktokIcon onClick={() => goToLink(redirect_tiktok)} className="mt-2 mr-2" />
                                    )
                                }
                                {
                                    share_url && (

                                        <CopyToClipboard text={share_url}>
                                            <ShareLinkIcon onClick={() => triggerToast()} className="mt-2 mr-2" />
                                        </CopyToClipboard>
                                        // <ShareLinkIcon onClick={() => goToLink(share_url)} className="mt-2 mr-2" />
                                    )
                                }
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
            <hr className="solid" />
        </>
    )
}

export default MostviewsVideos;