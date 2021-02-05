import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as PlayIcon } from 'assets/images/icon-play.svg'
import { ReactComponent as FbIcon } from 'assets/images/fb-icon.svg'
import { ReactComponent as IgIcon } from 'assets/images/ig-icon.svg'
import { ReactComponent as TtIcon } from 'assets/images/tiktok-icon.svg'
import { ReactComponent as ShareIcon } from 'assets/images/share-icon.svg'
import { ReactComponent as ShareIconMobile } from 'assets/images/share-icon-mobile.svg'
import BgUpcoming from 'assets/images/bg-upcoming.png'
import DefaultImg from 'assets/images/default.svg'
import iconLive from 'assets/images/live-icon.png'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Converter from 'configs/moment/DatetimeConverter'
import Countdown from 'components/forms/countdown'
import Moment from 'moment'

const Livestream = ({ displayToolTip, dataVideos, DisableButton, tipe }) => {
    console.log(dataVideos)
    return (
        <>
            {
                dataVideos && dataVideos.map((item, index) => {
                    let allWord = Moment(Converter.convertToLocal(item.start_time)).fromNow();
                    allWord = allWord.replace("a ", "1 ");
                    var angka = allWord.replace(/[^\d.-]/g, '');
                    var teks = allWord.replace(/[0-9]/g, '');
                    return (
                        <div className="flex mb-6 flex-col lg:flex-row" key={index}>
                            <div className="flex">
                                <div className="item relative w-auto">
                                    <Link to={{
                                        pathname: `/livestream/detail/${item.id}`
                                    }} className="link-wrapped">
                                        <figure className="item-image-live">
                                            {
                                                item?.live ? (
                                                    <>
                                                        <img className="live-icon px-2 py-2" src={iconLive} alt="live icon" />
                                                        <div className="live-viewers bg-blue-900 opacity-50 text-sm rounded-lg mt-2" style={{ width: 66, height: 26 }}>
                                                        </div>
                                                        {/* <div className="live-viewers-wrap flex px-2 items-center py-1 text-sm font-light text-white rounded-lg mt-2" style={{ width: 66, height: 26 }}>
                                                            <EyeIconWhite className="mx-auto" />
                                                            <h6 className="mx-auto opacity-100">{item.views}</h6>
                                                        </div> */}
                                                    </>
                                                ) : null
                                            }
                                            {
                                                Moment(Converter.convertToLocal(item.start_time)).isAfter(new Date()) ? (
                                                    <>
                                                        <div className="upcoming rounded-lg border-2 border-red-600 w-11/12 md:w-full">
                                                            <Countdown StartTime={Converter.convertToLocal(item.start_time)} />
                                                        </div>
                                                        <img style={{ maxWidth: '348px', maxHeight: '222px' }} src={BgUpcoming} alt={item.title} className="thumbnail-live" />
                                                    </>
                                                ) : (
                                                        <>
                                                            <PlayIcon style={{ transition: "all .15s ease" }}
                                                                onClick={() => openModal(item.iframe)} className="icon" />
                                                            <img style={{ maxWidth: '348px', maxHeight: '222px' }} src={item.img_thumbnail} onError={(e) => { e.target.onerror = null; e.target.src = DefaultImg }} alt={item.title} className="thumbnail-live" />
                                                        </>
                                                    )
                                            }
                                        </figure>
                                    </Link>
                                </div>
                                <div className="share-icon-live flex-col px-2 xxl:px-8">
                                    {
                                        item.redirect_fb && (
                                            <Link target="_blank" to={{ pathname: item.redirect_fb }} style={{ transition: "all .15s ease" }} ><FbIcon className="icon-sosmed my-2 mx-1 md:mr-4" /></Link>)
                                    }
                                    {
                                        item.redirect_ig && (<Link target="_blank" to={{ pathname: item.redirect_ig }} style={{ transition: "all .15s ease" }}><IgIcon className="icon-sosmed my-2 mx-1 md:mr-4" /></Link>)

                                    }
                                    {
                                        item.redirect_tiktok && (<Link target="_blank" to={{ pathname: item.redirect_tiktok }} style={{ transition: "all .15s ease" }}><TtIcon className="icon-sosmed my-2 mx-1 md:mr-4" /></Link>)
                                    }
                                    <CopyToClipboard text={item.share_url} className="flex md:hidden">
                                        <button onClick={displayToolTip}><ShareIconMobile className="icon-sosmed my-2 mx-1 md:mr-4" /></button>
                                    </CopyToClipboard>
                                </div>
                            </div>
                            <div className="flex flex-col-reverse md:flex-row">

                                <div className="flex md:flex-col px-2 xxl:px-8 items-center">
                                    <div className="mr-8 md:mb-3 md:mr-0 leading-tight text-center">
                                        <h4 className="font-bold text-xl text-red-600">{item.views}</h4>
                                        <span className="text-sm text-gray-300 font-light">Views</span>
                                    </div>
                                    <div className="mr-8 md:mb-3 md:mr-0 leading-tight text-center">
                                        <h4 className="font-bold text-xl text-red-600">{item.share}</h4>
                                        <span className="text-sm text-gray-300 font-light">Shared</span>
                                    </div>
                                    <div className="mr-2 md:mb-3 md:mr-0 leading-tight text-center">
                                        {
                                            Moment(new Date()).isBefore(Converter.convertToLocal(item.end_time)) &&
                                                Moment(new Date()).isAfter(Converter.convertToLocal(item.start_time)) ? (
                                                    <h4 className="font-bold text-xl text-red-600">Live Now</h4>
                                                ) : Moment(new Date()).isAfter(Converter.convertToLocal(item.end_time)) ? (
                                                    // previous
                                                    <>
                                                        <h4 className="font-bold text-xl text-red-600">{angka}</h4>
                                                        <span className="text-sm text-gray-300 font-light whitespace-no-wrap">{teks}</span>
                                                    </>
                                                ) : null
                                        }
                                    </div>
                                    <div className="w-full flex-col flex md:hidden mx-auto mt-2 leading-tight">
                                        <button className="bg-red-600 text-sm rounded-full w-full px-2 py-2 mb-2 font-medium text-white focus:outline-none">Edit</button>
                                        <button className="border border-red-600 text-sm rounded-full w-full px-2 py-2 font-medium text-red-600 focus:outline-none">Disable</button>
                                    </div>
                                </div>

                                <div className="flex-col md:px-4 xxl:px-8 leading-tight">
                                    <h4 className="font-bold text-xl text-red-600">{item.merchant ? item.merchant.name : ''}</h4>
                                    <div className="mt-4">
                                        <h5 className="text-gray-700 font-semibold mb-2 break-all">{item.title}</h5>
                                        <p className="max-lines text-livestream text-justify text-sm md:text-base break-all">{item.description}</p>
                                        {
                                            item.categories && <div className="flex flex-wrap text-xs font-medium text-gray-700 items-center mt-2">
                                                {
                                                    item.categories.map((itemx, indexx) => {
                                                        return (<span key={indexx}><div className="rounded-full inline-block w-2 h-2 bg-gray-700 mx-2"></div><h6 className="inline-block text-xs">{itemx}</h6></span>)
                                                    })
                                                }
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className="flex-col hidden md:flex mx-auto px-4 leading-tight xl:w-3/12 xxl:w-1/4">
                                    <CopyToClipboard text={item.share_url}>
                                        <button onClick={displayToolTip} className="bg-red-600 rounded-full w-full px-6 py-3 mb-4 font-medium text-white flex items-center justify-center focus:outline-none">Share <ShareIcon className="mx-2" /></button>
                                    </CopyToClipboard>
                                    <button className="bg-red-600 rounded-full w-full px-6 py-3 mb-4 font-medium text-white focus:outline-none"><Link to={{
                                        pathname: '/livestream/edit/' + item.id,
                                        query: { item }
                                    }}>Edit</Link>
                                    </button>
                                    <DisableButton id={item.id} tp={tipe} />
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

export default Livestream;