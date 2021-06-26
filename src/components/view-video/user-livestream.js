import React, { useState } from 'react';
import { Link } from 'react-router-dom';
//import Component SVG and image
import { ReactComponent as PlayIcon } from 'assets/images/icon-play.svg';
import { ReactComponent as EyeIcon } from 'assets/images/eye-icon.svg';
import { ReactComponent as LikeIcon } from 'assets/images/thumbs-like-icon.svg';
import { ReactComponent as SharedIcon } from 'assets/images/shared-icon.svg';
import { ReactComponent as FbIcon } from 'assets/images/fb-rounded.svg';
import { ReactComponent as IgIcon } from 'assets/images/ig-rounded.svg';
import { ReactComponent as TiktokIcon } from 'assets/images/tiktok-rounded.svg';
import { ReactComponent as ShareLinkIcon } from 'assets/images/share-link.svg';
import Moment from 'moment';
import Modal from 'react-modal';
import DefaultImg from 'assets/images/default.svg';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import general from '../../shared/general';
import { toast } from 'react-toastify';

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
            {
                ListVideo && ListVideo.map((item, index) => {
                    var ifrem = item.iframe;
                    return (
                        <>
                            <div key={index} className="mb-4 mt-8 flex flex-wrap xl:flex-no-wrap">
                                <div className="flex max-w-none">
                                    <div className="item relative w-auto px-4 lg:px-2">
                                        <figure className="item-image">
                                            <Link to={{
                                                pathname: `/livestream/detail/${item.id}`,
                                                query: { iframe : ifrem }
                                            }} className="link-wrapped">
                                                <PlayIcon style={{ transition: "all .15s ease" }}
                                                    onClick={() => openModal(item.iframe)} className="icon" />
                                                <img src={item.img_thumbnail} onError={(e) => { e.target.onerror = null; e.target.src = DefaultImg }} alt={item.title} className="thumbnail-live" />
                                            </Link>
                                        </figure>
                                    </div>
                                </div>

                                <div className="flex flex-grow flex-col ml-2">
                                    <div className="flex flex-wrap">
                                        <h6 className="break-all font-bold text-sm text-red-700 py-3 lg:py-0 px-4 lg:px-0">Live on {Moment(item.start_time).format('MMMM Do YYYY, h:mm a')}</h6>
                                    </div>
                                    <div className="flex flex-wrap h-12">
                                        <h5 className="break-all font-semibold text-md text-gray-700 py-3 lg:py-0 px-4 lg:px-0 lg:mb-2">{item.title}</h5>
                                    </div>
                                    <div className="flex flex-wrap">
                                        <p className="break-all font-light text-sm text-gray-700 py-3 lg:py-0 px-4 lg:px-0">{item.merchant?.name}</p>
                                    </div>
                                    <div className="flex flex-wrap items-center px-4 xl:px-0 leading-relaxed">
                                        <div className="flex mr-2 md:mr-4 items-center">
                                            <EyeIcon className="icon-at-user" />
                                            <h5 className="ml-2 text-gray-900 xl:text-xs font-semibold">{general.kFormatter(item.views)} <span className="text-gray-900 xl:text-xs font-medium">Views</span></h5>
                                        </div>
                                        <div className="flex mr-2 md:mr-4 items-center">
                                            <LikeIcon className="icon-at-user" />
                                            <h5 className="ml-2 text-gray-900 xl:text-xs font-semibold">{general.kFormatter(item.likes)} <span className="text-gray-900 xl:text-xs font-medium">Likes</span></h5>
                                        </div>
                                        <div className="flex mr-2 md:mr-4 items-center">
                                            <SharedIcon className="icon-at-user" />
                                            <h5 className="ml-2 text-gray-900 xl:text-xs font-semibold">{item.share} <span className="text-gray-900 xl:text-xs font-medium">Shares</span></h5>
                                        </div>
                                    </div>
                                    <div className="flex flex-row">
                                        {
                                            item.redirect_fb && (
                                                <FbIcon onClick={() => goToLink(item.redirect_fb)} className="mt-2 mr-2" />
                                            )
                                        }
                                        {
                                            item.redirect_ig && (
                                                <IgIcon onClick={() => goToLink(item.redirect_ig)} className="mt-2 mr-2" />
                                            )
                                        }
                                        {
                                            item.redirect_tiktok && (
                                                <TiktokIcon onClick={() => goToLink(item.redirect_tiktok)} className="mt-2 mr-2" />
                                            )
                                        }
                                        {
                                            item.share_url && (

                                                <CopyToClipboard text={item.share_url}>
                                                    <ShareLinkIcon onClick={() => triggerToast()} className="mt-2 mr-2" />
                                                </CopyToClipboard>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                            <hr className="solid" />
                        </>
                    )
                })
            }
        </>)
}

export default UserLivestreamVideos;