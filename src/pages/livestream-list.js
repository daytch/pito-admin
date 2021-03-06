import React, { useState, useEffect } from 'react'
import Sidebar from 'components/SideNavbar'
import Searchbar from 'components/forms/search'
import Dropdown from 'components/forms/dropdown'
import Livestream from 'components/view-video/Livestream'
import Pagination from 'components/pagination'

import LivestreamApi from 'api/livestream'
import Spinner from 'components/spinner'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)
const itemsDate = [
    {
        id: 0,
        value: 'Date'
    }, {
        id: 1,
        value: 'Views'
    }, {
        id: 2,
        value: 'Favourites'
    }, {
        id: 3,
        value: 'Shares'
    }
]
const items = [
    {
        id: 0,
        value: 'All'
    },
    {
        id: 1,
        value: 'Ongoing'
    },
    {
        id: 2,
        value: 'Upcoming'
    }, {
        id: 3,
        value: 'Previous'
    }
]

const LivestreamList = () => {
    const [isLoading, setLoading] = useState(true)
    const [videos, setVideos] = useState([])
    const [filter, setFilter] = useState('')
    const [tipe, setTipe] = useState('')
    const [phoneTooltip, setPhoneTooltip] = useState({
        show: false,
        x: 0,
        y: 0,
        orientLeft: false
    })
    const [totalLive, setTotalLive] = useState(1)
    const [totalPrevious, setTotalPreviuos] = useState(1)
    const [totalNext, setTotalNext] = useState(1)
    const [totalAll, setTotalAll] = useState(1)
    function getDataKeyword(page, keyword) {
        setLoading(true);
        if (keyword) {
            LivestreamApi.getLivestreamByKeyword(keyword, page).then((res) => {
                // setTipe(param)
                setVideos(res.data);

                setTotalLive(Math.ceil(res.data.length / 10));
                setTotalNext(Math.ceil(res.data.length / 10));
                setTotalPreviuos(Math.ceil(res.data.length / 10));
                setTotalAll(Math.ceil(res.data.length / 10));
                // if (param == "live_videos") {
                // setTotalLive(Math.ceil(res.total_video / 10));
                // } else if (param == "upcoming_videos") {
                // setTotalNext(Math.ceil(res.total_video / 10));
                // } else if (param == "previous_videos") {
                // setTotalPreviuos(Math.ceil(res.total_video / 10));
                // } else {
                // setTotalAll(Math.ceil(res.total_video / 10));
                // }

                setLoading(false)
            });
        } else {
            getData(1, 'All');
        }
    }
    function getData(page, param, keyword) {
        setLoading(true)
        LivestreamApi.getLivestream({
            type: param,
            page: page,
            keyword: keyword
        }).then((res) => {
            setTipe(param)
            setVideos(res.data);
            if (param == "live_videos") {
                setTotalLive(Math.ceil(res.total_video / 10));
            } else if (param == "upcoming_videos") {
                setTotalNext(Math.ceil(res.total_video / 10));
            } else if (param == "previous_videos") {
                setTotalPreviuos(Math.ceil(res.total_video / 10));
            } else {
                setTotalAll(Math.ceil(res.total_video / 10));
            }
            setLoading(false)
        });
    }
    useEffect(() => {
        setFilter('All');
        getData(1, 'All');
    }, [])
    const DisableButton = (id) => {
        return <button onClick={() => submitDelete(id)} className="border border-red-600 rounded-full w-full px-6 py-3 font-medium text-red-600 focus:outline-none">Disable</button>;
    };

    function submitDelete(id, tp) {

        MySwal.fire({
            title: 'Are you sure?',
            text: "Do you really want to disable this livestream schedule? This process cannot be undone.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, disable it!'
        }).then((result) => {
            if (result.isConfirmed) {
                setLoading(true)
                LivestreamApi.deleteLivestream(id).then((res) => {
                    setLoading(false)
                    MySwal.fire(
                        'Disabled!',
                        'Your data has been disabled.',
                        'success'
                    ).then(() => {

                        setLoading(true)
                        getData(tp)
                    })
                });
            }
        })
    }
    function changeDropdown(e) {
        setLoading(true)
        switch (e.value) {
            case 'All':
                getData(1, 'All')
                setFilter('All')
                break;
            case 'Ongoing':
                getData(1, 'live_videos')
                setFilter('live_videos')
                break;
            case 'Upcoming':
                getData(1, 'upcoming_videos')
                setFilter('upcoming_videos')
                break;
            case 'Previous':
                getData(1, 'previous_videos')
                setFilter('previous_videos')
                break;
        }
    }

    function changeDropdownFilter(e) {

        let vids = [...videos];
        switch (e.value) {
            case 'Views':
                setVideos(vids.sort((a, b) => (a.views > b.views) ? -1 : 1));
                break;
            case 'Favourites':
                setVideos(vids.sort((a, b) => (a.likes > b.likes) ? -1 : 1));
                break;
            case 'Shares':
                setVideos(vids.sort((a, b) => (a.share > b.share) ? -1 : 1));
                break;
            case 'Date':
                setVideos(vids.sort((a, b) => (a.start_time > b.start_time) ? -1 : 1));
                break;
        }
    }

    const displayToolTip = () => {
        if (!phoneTooltip.show) {
            setPhoneTooltip(prev => ({ ...prev, show: true })); // show tooltip
            setTimeout(() => {
                setPhoneTooltip(prev => ({ ...prev, show: false })); // remove/hide tooltip
            }, 1500);
        }
    }

    return (
        <Spinner isLoading={isLoading} className="min-h-screen">
            <section className="min-h-screen flex flex-col xl:flex-row">
                <Sidebar />
                <div className="py-5 md:py-10 px-5 w-full">
                    <div className="flex flex-wrap  justify-between items-center">
                        <Searchbar getDataKeyword={getDataKeyword} param={filter} pages={filter == "live_videos" ? totalLive : filter == "upcoming_videos" ? totalNext : filter == "previous_videos" ? totalPrevious : totalAll} />
                        <div className="text-xs flex justify-end w-full md:w-3/12 mt-4 md:mt-0 items-center">
                            <h2 className="font-semibold mr-2 text-sm md:text-lg text-gray-700">Filter</h2>
                            <div className="w-full md:w-56 form-categories border border-gray-300 rounded-md px-1 py-1 mr-2 my-2" role="button">
                                <Dropdown title="All" onClick={changeDropdown} items={items} />
                            </div>
                            <h2 className="font-semibold mr-2 text-sm md:text-lg text-gray-700">Sort</h2>
                            <div className="w-full md:w-56 form-categories border border-gray-300 rounded-md px-1 py-1 mr-2 my-2" role="button">
                                <Dropdown title="Date" onClick={changeDropdownFilter} items={itemsDate} />
                            </div>
                        </div>
                    </div>
                    {
                        videos.length > 0 ? (<>
                            <div className="my-10">
                                {
                                    phoneTooltip.show && (
                                        <h3 style={{ color: 'green', textAlign: 'center' }}>URL copied.</h3>
                                    )
                                }
                                <Livestream dataVideos={videos} tipe={tipe} displayToolTip={displayToolTip} DisableButton={DisableButton} />
                            </div>
                            <div className="overflow-x-auto w-full mt-3 mb-2">
                                <Pagination pages={filter == "live_videos" ? totalLive : filter == "upcoming_videos" ? totalNext : filter == "previous_videos" ? totalPrevious : totalAll} getData={getData} tipe={filter} />
                            </div></>) : null
                    }
                </div>
            </section>
        </Spinner>
    )
}

export default LivestreamList;
