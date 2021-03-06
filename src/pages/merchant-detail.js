import React, { useEffect, useState } from 'react'
import Sidebar from 'components/SideNavbar'

// import userAvatarDummy from 'assets/images/user-avatar.jpg'
import { ReactComponent as FbIcon } from 'assets/images/fb-icon.svg'
import { ReactComponent as IgIcon } from 'assets/images/ig-icon.svg'
import { ReactComponent as TtIcon } from 'assets/images/tiktok-icon.svg'

import Dropdown from 'components/forms/dropdown'
import LineCustom from 'components/graphic-chart/LineCustom'
import HistoryLivestreams from 'components/view-video/user-livestream'
import User from 'api/users'
import { useParams, Link } from 'react-router-dom'
import Spinner from 'components/spinner'
import moment from 'moment'
import Avatar from 'react-avatar'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

const MerchantDetail = () => {

    const [isLoading, setLoading] = useState(true)
    const [id] = useState(useParams())
    const [avatar, setAvatar] = useState();
    const [category, setCategory] = useState([]);
    const [videos, setVideos] = useState([]);
    const [fb, setFB] = useState();
    const [ig, setIG] = useState();
    const [tiktok, setTiktok] = useState();
    const [about, setAbout] = useState();
    const [name, setName] = useState();
    const [isActive, setIsactive] = useState();
    const [fav, setFav] = useState();
    const [share, setShare] = useState();
    const [view, setView] = useState();
    const [graphFav, setGraphFav] = useState();
    const [graphShare, setGraphShare] = useState();
    const [graphView, setGraphView] = useState();
    const [labelGraph, setLabelGraph] = useState();

    function changeDateid(e) {

        switch (e.value) {
            case "Date":
                setVideos(videos.sort((a, b) => (moment(a.start_time).isAfter(b.start_time)) ? 1 : -1));
                break;
            case "Views":
                setVideos(videos.sort((a, b) => (a.views > b.views) ? 1 : -1));
                break;
            case "Favourites":
                setVideos(videos.sort((a, b) => (a.likes > b.likes) ? 1 : -1));
                break;
            default:
                setVideos(videos.sort((a, b) => (a.id > b.id) ? 1 : -1));
                break;

        }
    }

    function DisableUser() {
        MySwal.fire({
            title: 'Are you sure?',
            text: "Do you really want to disable this merchant?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, disable it!'
        }).then((result) => {
            if (result.isConfirmed) {
                setLoading(true);
                User.disableUser({ 'user_id': id.id }).then((res) => {
                    let data = res;
                    setLoading(false);
                    if (data.isSuccess) {
                        MySwal.fire('Success!', data.message, 'success');
                    } else {
                        MySwal.fire('Error!', data.message, 'warning');
                    }
                })
            }
        })

    }

    function EnableUser() {
        setLoading(true);
        User.enableUser({ 'user_id': id.id }).then((res) => {
            debugger;
            let data = res;
            setLoading(false);
            if (data.isSuccess) {
                MySwal.fire('Success!', data.message, 'success');
            } else {
                MySwal.fire('Error!', data.message, 'warning');
            }
        })
    }

    const MostRecent2 = [
        {
            id: 1,
            value: 'Date'
        },
        {
            id: 2,
            value: 'Views'
        }, {
            id: 3,
            value: 'Favourites'
        },
        {
            id: 4,
            value: 'Shares'
        }
    ]

    useEffect(() => {
        User.getMerchantDetail(id.id).then((res) => {
            let data = res.data;

            setIsactive(data.isActive);
            setAvatar(data.img_avatar);
            setCategory(data.categories);
            setFB(data.fb_url);
            setIG(data.ig_url);
            setTiktok(data.tiktok_url);
            setAbout(data.about);
            setName(data.name);
            setVideos(data.history_videos);

            if (Array.isArray(data.fav_month) || typeof (data.fav_month) === 'object') {
                setLabelGraph(data.fav_month.map((item) => {
                    return getMonth(item.month) + "-" + item.year
                }))
                setGraphFav(data.fav_month.map((item) => { return item.total }));
            }
            if (Array.isArray(data.view_month) || typeof (data.view_month) === 'object') {
                setGraphView(data.view_month.map((item) => { return item.total }));
            }
            if (Array.isArray(data.shared_month) || typeof (data.shared_month) === 'object') {
                setGraphShare(data.shared_month.map((item) => { return item.total }));
            }

            setFav(data.total_fav);
            setShare(data.total_shared);
            setView(data.total_view);
            setLoading(false);
        })
    }, [])

    return (
        <Spinner isLoading={isLoading} className="min-h-screen">
            <section className="min-h-screen flex flex-col xl:flex-row">
                <Sidebar />
                <div className="py-10 md:py-20 flex flex-col md:flex-row w-full">
                    <div className="w-full md:w-3/5 xxl:w-1/2 px-4">
                        <div className="flex flex-col xl:flex-row xl:items-center">
                            {
                                avatar ?
                                    <img src={avatar} draggable={false} className="rounded-full w-4/5 xl:w-1/3 border-8 mb-4 xl:mb-0 xl:mr-4 border-red-600 mx-auto" alt="" />
                                    : <Avatar name={name} className="w-full mx-auto" round={true} /> // <img src={avatar} draggable={false} className="rounded-full w-4/5 xl:w-1/3 border-8 mb-4 xl:mb-0 xl:mr-4 border-red-600 mx-auto" alt="" />
                            }

                            <div className="md:px-8 w-auto">
                                <h4 className="text-red-600 text-2xl font-bold">{name}</h4>
                                <p className="text-sm mt-1 font-light text-justify">
                                    {about}
                                </p>
                                {
                                    category && <div className="flex flex-wrap text-sm font-medium text-gray-700 items-center mt-2">
                                        {
                                            category.map((item, index) => {
                                                return (<span key={index}><div className="rounded-full inline-block w-2 h-2 bg-gray-700 mx-2"></div><h6 className="inline-block">{item.name}</h6></span>)
                                                // : (<span key={index}><div className="rounded-full w-2 h-2 bg-gray-700 mx-2"></div><h6>{item}</h6></span>)
                                            })
                                        }
                                    </div>
                                }
                                <div className="flex flex-wrap mt-4 md:mt-2">
                                    <div className="flex flex-col mr-8 text-center">
                                        <h4 className="font-bold text-2xl text-red-600">{view}</h4>
                                        <p className="font-light text-sm text-gray-300">Views</p>
                                    </div>
                                    <div className="flex flex-col mr-8 text-center">
                                        <h4 className="font-bold text-2xl text-red-600">{fav}</h4>
                                        <p className="font-light text-sm text-gray-300">Likes</p>
                                    </div>
                                    <div className="flex flex-col text-center">
                                        <h4 className="font-bold text-2xl text-red-600">{share}</h4>
                                        <p className="font-light text-sm text-gray-300">Shared</p>
                                    </div>
                                </div>
                            </div>
                            {/* )
                                })
                            } */}
                            <div className="w-1/5 hidden xl:flex flex-col">
                                {fb && <Link to={{ pathname: fb }} target="_blank"><FbIcon className="mb-4" /></Link>}
                                {ig && <Link to={{ pathname: ig }} target="_blank"><IgIcon className="mb-4" /></Link>}
                                {tiktok && <Link to={{ pathname: tiktok }} target="_blank"><TtIcon className="mb-4" /></Link>}
                            </div>
                        </div>
                        <div className="flex flex-wrap pt-8 justify-center">
                            {
                                isActive === 1 ? (<button onClick={DisableUser} className="rounded-3xl text-sm md:text-base font-medium mr-2 mb-2 xl:mb-0 md:mr-6 text-red-600 border border-red-600 px-6 py-2 md:px-12 md:py-2">Disable</button>)
                                    : (<button onClick={EnableUser} className="rounded-3xl text-sm md:text-base font-medium mr-2 mb-2 xl:mb-0 md:mr-6 text-green-600 border border-green-600 px-6 py-2 md:px-12 md:py-2">Enable</button>)
                            }

                            <Link to={{
                                pathname: `/merchant/edit/${id.id}`,
                                query: id
                            }} className="rounded-3xl text-sm md:text-base font-medium mr-2 mb-2 xl:mb-0 md:mr-6 text-white bg-red-600 px-6 py-2 md:px-10 md:py-2" >
                                Edit Account
                            </Link>
                            <Link to={{ pathname: `/livestream/create/${id.id}`, query: id }} className="rounded-3xl text-sm md:text-base font-medium text-white bg-red-600 px-6 py-2 md:px-10 md:py-2">
                                Create Livestreams
                            </Link>
                        </div>
                        <div className="pt-8">
                            {
                                typeof (labelGraph) !== 'undefined' && typeof (graphFav) !== 'undefined' && typeof (graphShare) !== 'undefined' && typeof (graphView) !== 'undefined' ?
                                    (
                                        <LineCustom labels={labelGraph} favData={graphFav} shareData={graphShare} viewData={graphView} />)
                                    : null
                            }
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 flex flex-col">
                        <div className="pt-8 flex flex-col px-4">
                            <div className="flex justify-between items-center">
                                <p className="text-red-600 font-bold text-base">Livestreams History</p>
                                <Dropdown title="Date" items={MostRecent2} onClick={changeDateid} idx={1} />
                            </div>
                            <div className="pt-6">
                                {
                                    videos && <HistoryLivestreams ListVideo={videos} />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Spinner >
    )
}

function getMonth(no) {
    var bln = '';
    switch (no) {
        case 1:
            bln = 'Jan';
            break;
        case 2:
            bln = 'Feb';
            break;
        case 3:
            bln = 'Mar';
            break;
        case 4:
            bln = 'Apr';
            break;
        case 5:
            bln = 'May';
            break;
        case 6:
            bln = 'Jun';
            break;
        case 7:
            bln = 'Jul';
            break;
        case 8:
            bln = 'Aug';
            break;
        case 9:
            bln = 'Sep';
            break;
        case 10:
            bln = 'Oct';
            break;
        case 11:
            bln = 'Nov';
            break;
        default:
            bln = 'Des';
            break;
    }
    return bln;
}
export default MerchantDetail;
