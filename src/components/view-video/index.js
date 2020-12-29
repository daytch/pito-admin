import React, { useState } from 'react'
import { Link } from 'react-router-dom'

//import Component SVG and image
import { ReactComponent as PlayIcon } from 'assets/images/icon-play.svg'
import { ReactComponent as EyeIcon } from 'assets/images/eye-icon.svg'
import { ReactComponent as LikeIcon } from 'assets/images/thumbs-like-icon.svg'
import ReactHtmlParserfrom from 'react-html-parser';

const MostviewsVideos = ({ no, thumbnail, views, likes, title, iframe, categories }) => {
    const [showModal, setShowModal] = useState(false);
    const [dataModal, setDataModal] = useState('');

    const changeDataModal = (val, data) => {
        setDataModal(data);
        setShowModal(val)
    }

    return (
        <div className="px-2 lg:px-6 xxl:px-8">
            <div className="mt-8 flex flex-wrap lg:flex-no-wrap">
                <div className="flex flex-wrap lg:flex-no-wrap items-baseline">
                    <div className="flex w-full lg:w-1/2 max-w-none">
                        <p>{no}.</p>
                        <div className="item relative w-auto px-4 lg:px-2">
                            <figure className="item-image">
                                <PlayIcon style={{ transition: "all .15s ease" }}
                                    onClick={() => changeDataModal(true, iframe)} className="icon" />
                                <img src={thumbnail} onError={(e) => { e.target.onerror = null; e.target.src = "https://alppetro.co.id/dist/assets/images/default.jpg" }} alt={title} className="thumbnail-live" />
                            </figure>
                        </div>
                        <Link to="/" className="link-wrapped hidden"></Link>
                    </div>
                    <div className="lg:w-2/3 item-meta">
                        <div className="flex flex-wrap">
                            <h4 className="break-all font-light xl:text-lg xxl:text-xl text-gray-700 py-3 lg:py-0 px-4 lg:px-0 lg:mb-4">{title}</h4>
                        </div>
                        <div className="flex flex-wrap items-center px-4 xl:px-0">
                            <EyeIcon />
                            <h4 className="ml-2 text-red-700 xl:text-sm font-semibold">{views} <span className="text-gray-900 xl:text-xs font-medium">Views</span></h4>
                            <div className="flex ml-4">
                                <LikeIcon />
                                <h4 className="ml-2 text-red-700 xl:text-sm font-semibold">{likes} <span className="text-gray-900 xl:text-xs font-medium">Likes</span></h4>
                            </div>
                        </div>
                        {
                            categories && <div className="flex flex-wrap text-sm font-medium text-gray-700 items-center mt-2">
                                {
                                    categories.map((item, index) => {
                                        return (<span key={index}><div className="rounded-full inline-block w-2 h-2 bg-gray-700 mx-2"></div><h6 className="inline-block">{item}</h6></span>)
                                        // : (<span key={index}><div className="rounded-full w-2 h-2 bg-gray-700 mx-2"></div><h6>{item}</h6></span>)
                                    })
                                }
                            </div>
                        }

                        {showModal ? (
                            <>
                                <div
                                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                                    onClick={() => setShowModal(false)}
                                >
                                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                        {/*content*/}
                                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                            {/*header*/}
                                            <div className="flex items-start justify-between p-2 border-b border-solid border-gray-300 rounded-t">
                                                <h6 className="text-2xl font-semibold">{title}</h6>
                                                <button
                                                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                    onClick={() => setShowModal(false)} >
                                                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                                                </button>
                                            </div>
                                            {/*body*/}
                                            <div className="relative p-6 flex-auto">
                                                {dataModal && ReactHtmlParserfrom(dataModal)}
                                            </div>
                                            {/*footer*/}
                                            <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                                                <button
                                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                                                    type="button"
                                                    style={{ transition: "all .15s ease" }}
                                                    onClick={() => setShowModal(false)}
                                                >Close</button>

                                                <button
                                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                                                    type="button"
                                                    onClick={() => setShowModal(false)}
                                                >Save</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                            </>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MostviewsVideos;