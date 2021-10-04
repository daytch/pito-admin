import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as PlayIcon } from 'assets/images/icon-play.svg';
import { ReactComponent as EyeIcon } from 'assets/images/eye-icon.svg';
import { ReactComponent as LikeIcon } from 'assets/images/thumbs-like-icon.svg';
import { ReactComponent as SharedIcon } from 'assets/images/shared-icon.svg';
import { ReactComponent as FbIcon } from 'assets/images/fb-rounded.svg';
import { ReactComponent as IgIcon } from 'assets/images/ig-rounded.svg';
import { ReactComponent as TiktokIcon } from 'assets/images/tiktok-rounded.svg';
import { ReactComponent as ShareLinkIcon } from 'assets/images/share-link.svg';
import DefaultImg from 'assets/images/default.svg';
import iconLive from 'assets/images/live-icon.png';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Converter from 'configs/moment/DatetimeConverter';
import general from '../../shared/general';
import { toast } from 'react-toastify';
import Moment from 'moment';

const Livestream = ({ displayToolTip, dataVideos, DisableButton, tipe }) => {

    const [dataModal, setDataModal] = useState('');
    const [modalIsOpen, setIsOpen] = useState(false);

    const openModal = (data) => {
        setIsOpen(true)
        setDataModal(data)
    }

    function goToLink(url) {
        window.open(url, "_blank");
    }

    function triggerToast() {
        toast.info("Copied! 🚀", {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    return (
        <>
            {
                dataVideos && dataVideos.map((item, index) => {
                    if (index === 0) {
                        console.log(item);
                    }
                    let iframe = item.iframe
                    let allWord = Moment(Converter.convertToLocal(item.start_time)).fromNow();
                    allWord = allWord.replace("a ", "1 ");
                    var angka = allWord.replace(/[^\d.-]/g, '');
                    var teks = allWord.replace(/[0-9]/g, '');
                    return (
                        <>
                            {
                                (index !== 0) &&
                                <hr className="solid" />

                            }
                            <div className="flex flex-wrap mt-4 mb-6 flex-row" key={index}>
                                <div className="flex flex-grow md:flex-none justify-center md:justify-start md:mr-4">
                                    <div className="item relative w-auto">
                                        <Link to={{
                                            pathname: `/livestream/detail/${item.id}`,
                                            query: {
                                                iframe: iframe
                                            }
                                        }} className="link-wrapped">
                                            <figure className="item-image-live">
                                                {
                                                    item?.live ? (
                                                        <>
                                                            <img className="live-icon px-2 py-2" src={iconLive} alt="live icon" />
                                                            <div className="live-viewers bg-blue-900 opacity-50 text-sm rounded-lg mt-2" style={{ width: 66, height: 26 }}>
                                                            </div>
                                                        </>
                                                    ) : null
                                                }
                                                {
                                                    <>
                                                        <PlayIcon style={{ transition: "all .15s ease" }}
                                                            onClick={() => openModal(iframe)} className="icon" />
                                                        <img style={{ maxWidth: '348px', maxHeight: '222px' }} src={item.img_thumbnail} onError={(e) => { e.target.onerror = null; e.target.src = DefaultImg }} alt={item.title} className="thumbnail-live" />
                                                    </>
                                                }
                                            </figure>
                                        </Link>
                                    </div>
                                </div>
                                <div className="flex flex-grow flex-col">
                                    <div className="flex flex-wrap">
                                        <h6 className="break-all font-bold text-sm text-red-700 py-3 lg:py-0 px-4 lg:px-0">Live on {Moment(item.start_time).format('LLL')}</h6>
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
                                <div className="flex flex-shrink w-full md:w-56 flex-col mt-2">
                                    <button className="bg-red-600 text-sm rounded-full w-full px-2 py-2 mb-2 font-medium text-white focus:outline-none">Edit</button>
                                    <button className="border border-red-600 text-sm rounded-full w-full px-2 py-2 font-medium text-red-600 focus:outline-none">Disable</button>
                                </div>
                            </div>
                        </>)
                })
            }
        </>
    )
}

export default Livestream;