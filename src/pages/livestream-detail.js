import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import SideNavbar from 'components/SideNavbar'
// import { Link } from 'react-router-dom'
// import { withRouter } from "react-router"
// import { ReactComponent as PlayIcon } from 'assets/images/icon-play.svg'
import { ReactComponent as FbIcon } from 'assets/images/fb-icon.svg'
import { ReactComponent as IgIcon } from 'assets/images/ig-icon.svg'
import { ReactComponent as TtIcon } from 'assets/images/tiktok-icon.svg'
import livestream from 'api/livestream'
import Spinner from 'components/spinner'
import moment from 'moment'
import ReactHtmlParserfrom from 'react-html-parser'
import Modal from 'react-modal'
// import DefaultImg from 'assets/images/default.svg'
Modal.setAppElement('*'); // suppresses modal-related test warnings.
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

const LivestreamDetail = () => {
    const [isLoading, setLoading] = useState(true)
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [startdate, setStartDate] = useState("")
    const [starttime, setStartTime] = useState("")
    const [endtime, setEndTime] = useState("")
    const [category1, setCategory1] = useState("")
    const [category2, setCategory2] = useState("")
    const [category3, setCategory3] = useState("")
    const [fb, setFb] = useState("")
    const [ig, setIg] = useState("")
    const [tiktok, setTiktok] = useState("")
    const [views, setViews] = useState("")
    const [fav, setFav] = useState("")
    const [share, setShared] = useState("")
    // const [thumbnail, setThumbnail] = useState("")
    const { id } = useParams();
    const [iframe, setIframe] = useState('');
    const history = useHistory()

    useEffect(() => {
        setLoading(true)
        livestream.getLivestreamDetail(id).then((res) => {
            let data = res.data;
            debugger; // eslint-disable-line no-debugger
            if (!data){
                MySwal.fire('Empty data!', 'The selected video is empty or has been deleted', 'warning')
            }else{
                let url_iframe = data.fb_url !== "" ? data.fb_url : data.ig !== null ? data.ig_url : data.tiktok_url;
               
                setIframe(url_iframe);
                setTitle(data.title);
                setDesc(data.desc);
                let stDate = moment(data.startDate).format('YYYY-MM-DD');
                let stTime = moment(data.startDate).format('HH:mm');
                let enTime = moment(data.endDate).format('HH:mm');
                setStartDate(stDate);
                setStartTime(stTime);
                setEndTime(enTime);
                let cat1 = data.categories[0] ? data.categories[0].name : "Category";
                let cat2 = data.categories[1] ? data.categories[1].name : "Category";
                let cat3 = data.categories[2] ? data.categories[2].name : "Category";
                setCategory1(cat1);
                setCategory2(cat2);
                setCategory3(cat3);
                setFb(data.fb_url);
                setIg(data.ig_url);
                setTiktok(data.tiktok_url);
                setViews(data.views);
                setFav(data.favorites);
                setShared(data.shares);
                // setThumbnail(data.img_thumbnail);
            }
            setLoading(false)
        })
        // eslint-disable-next-line
    }, [])

    return (
        <Spinner isLoading={isLoading}>
            <section className="min-h-screen flex flex-col xl:flex-row">
                <SideNavbar />
                <div className="py-10 md:py-20 px-5 w-full">
                    <div className="flex flex-col-reverse md:flex-row w-full justify-between">
                        <h6 className="text-red-600 font-semibold text-lg text-center pt-8 md:pt-0">Livestreams Detail</h6>
                        <div className="flex items-center md:mb-0 justify-end">
                            <button onClick={() => { history.goBack() }}><h6 className="text-red-600 font-semibold text-lg">Back</h6></button>
                            {/* <Link to={{
                                pathname: '/dashboard/copy/' + id,
                                query: {
                                    title,
                                    desc,
                                    category1,
                                    category2,
                                    category3,
                                    thumbnail
                                }
                            }} className="text-white bg-red-600 font-semibold text-sm xl:text-lg px-4 mx-4 py-1 rounded-2xl">Copy For New Livestreams</Link> */}
                        </div>
                    </div>

                    <div className="mt-0 md:mt-10">
                        <div className="flex flex-wrap mt-4 md:mt-2 mx-auto justify-center w-full md:w-1/2">
                            {ReactHtmlParserfrom(iframe)}
                            {/* <figure className="item-image-live-detail">
                                <PlayIcon className="play-icon-lvdetail icon" style={{ transition: "all .15s ease", marginLeft: "-8vw !important" }}
                                    onClick={() => openModal(iframe)} />
                                <img className="thumbnail-live-detail thumbnail-lvdetail" src={thumbnail} onError={(e) => { e.target.onerror = null; e.target.src = DefaultImg }} alt={title} width={580} />
                            </figure> */}
                        </div>
                        <div className="flex flex-wrap mt-4 md:mt-2 mx-auto justify-center w-full md:w-1/2">
                            <div className="flex flex-col mr-8 text-center">
                                <h4 className="font-bold text-2xl text-red-600">{views}</h4>
                                <p className="font-light text-sm text-gray-300">Views</p>
                            </div>
                            <div className="flex flex-col mr-8 text-center">
                                <h4 className="font-bold text-2xl text-red-600">{fav}</h4>
                                <p className="font-light text-sm text-gray-300">Subscriber</p>
                            </div>
                            <div className="flex flex-col text-center">
                                <h4 className="font-bold text-2xl text-red-600">{share}</h4>
                                <p className="font-light text-sm text-gray-300">Shared</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col xl:flex-row pt-10">
                        <div className="w-full xl:w-1/2">
                            <div className="flex flex-wrap w-full items-start">
                                <label htmlFor="title" className="w-full xl:w-1/5 text-lg text-gray-700">Title</label>
                                <input type="text" value={title} placeholder="Tittle" className="w-full xl:w-3/4 px-4 bg-gray-700 text-white focus:outline-none py-2 my-2 xl:my-0 xl:ml-4 rounded-lg" readOnly />
                            </div>
                            <div className="flex flex-wrap w-full items-start mt-4">
                                <label htmlFor="desc" className="w-full xl:w-1/5 text-lg text-gray-700">Description</label>
                                <textarea value={desc} placeholder="Description" className="w-full xl:w-3/4 h-32 px-4 bg-gray-700 text-white focus:outline-none py-2 xl:ml-4 my-2 xl:my-0 rounded-lg" readOnly />
                            </div>
                        </div>
                        <div className="w-full xl:w-1/2">
                            <div className="flex flex-wrap w-full items-center">
                                <div className="xl:pr-4 flex flex-wrap xl:flex-no-wrap w-full xl:w-1/2">
                                    <label htmlFor="date" className="w-full xl:w-1/5 text-lg text-gray-700">Date</label>
                                    <input type="date" value={startdate} name="date" className="w-full xl:w-3/4 px-4 py-2 xl:ml-4  bg-gray-700 text-white focus:outline-none my-2 xl:my-0 border border-gray-300 rounded-lg" readOnly />
                                </div>
                                <div className="xl:pr-4 flex flex-wrap xl:flex-no-wrap w-full xl:w-1/2">
                                    <label htmlFor="start" className="w-full xl:w-1/5 text-lg text-gray-700">Start Time</label>
                                    <input type="time" value={starttime} name="start" className="w-full xl:w-3/4 px-4 py-2 xl:ml-4  bg-gray-700 text-white focus:outline-none my-2 xl:my-0 border border-gray-300 rounded-lg" readOnly />
                                </div>
                                <div className="xl:pr-4 flex flex-wrap xl:flex-no-wrap w-full xl:w-1/2">
                                    <label htmlFor="end" className="w-full xl:w-1/5 text-lg text-gray-700">End Time</label>
                                    <input type="time" value={endtime} name="start" className="w-full xl:w-3/4 px-4 py-2 xl:ml-4  bg-gray-700 text-white focus:outline-none my-2 xl:my-0 border border-gray-300 rounded-lg" readOnly />
                                </div>
                            </div>
                            <div className="flex flex-wrap w-full items-center mt-4">
                                <label htmlFor="category" className="w-full xl:w-auto text-lg text-gray-700">Categories</label>
                                <div className="flex flex-wrap">
                                    <input type="text" value={category1} name="category" className="w-1/3 xl:w-auto px-4 py-2 mr-4 text-sm bg-gray-700 text-white focus:outline-none my-2  border border-gray-300 rounded-lg" readOnly />
                                    <input type="text" value={category2} name="category" className="w-1/3 xl:w-auto px-4 py-2 mr-4 text-sm bg-gray-700 text-white focus:outline-none my-2  border border-gray-300 rounded-lg" readOnly />
                                    <input type="text" value={category3} name="category" className="w-1/3 xl:w-auto px-4 py-2 mr-4 text-sm bg-gray-700 text-white focus:outline-none my-2  border border-gray-300 rounded-lg" readOnly />
                                </div>

                            </div>
                            <div className="form-dashboard flex flex-wrap w-full items-center mt-4">
                                <label htmlFor="fbLink" className="w-full text-lg text-gray-700">Facebook Livestreams Link <span className="text-red-700">*</span></label>
                                <input type="text" value={fb} placeholder="https://facebook.com/live/url" className="w-4/5 px-4 py-2 mr-2 bg-gray-700 text-white focus:outline-none my-2 border border-gray-300 rounded-lg" readOnly />
                                <FbIcon />
                            </div>
                            <div className="form-dashboard flex flex-wrap w-full items-center mt-4">
                                <label htmlFor="igLink" className="w-full text-lg text-gray-700">Instagram Livestreams Link <span className="text-red-700">*</span></label>
                                <input type="text" value={ig} placeholder="https://instagram.com/live/url" className="w-4/5 px-4 py-2 mr-2 bg-gray-700 text-white focus:outline-none my-2 border border-gray-300 rounded-lg" readOnly />
                                <IgIcon />
                            </div>
                            <div className="form-dashboard flex flex-wrap w-full items-center mt-4">
                                <label htmlFor="ttLink" className="w-full text-lg text-gray-700">Tiktok Livestreams Link <span className="text-red-700">*</span></label>
                                <input type="text" value={tiktok} placeholder="https://tiktok.com/live/url" className="w-4/5 px-4 py-2 mr-2 bg-gray-700 text-white focus:outline-none my-2 border border-gray-300 rounded-lg" readOnly />
                                <TtIcon />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Spinner>
    )
}

export default LivestreamDetail