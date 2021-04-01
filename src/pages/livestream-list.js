import React, { useState, useEffect } from 'react'
import Sidebar from 'components/SideNavbar'
import Searchbar from 'components/forms/search'
import Dropdown from 'components/forms/dropdown'
import Livestream from 'components/view-video/Livestream'
import thumbnail from 'assets/images/thumbnail-one.jpg'

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

    function getData(param) {
        let arrData = [];
        setTipe(param);
        debugger;
        if (param === 'All') {
            LivestreamApi.getLivestream({ type: 'live_videos', page: 1 })
                .then((res) => {
                    if (res.data.length > 0) {
                        setTipe(param)
                        arrData = res.data;
                        // setVideos(res.data)
                    }
                    LivestreamApi.getLivestream({ type: 'upcoming_videos', page: 1 })
                        .then((res) => {
                            if (res.data.length > 0) {
                                arrData = arrData.concat(res.data)
                                // setVideos([...videos, res.data])
                            }
                            LivestreamApi.getLivestream({ type: 'previous_videos', page: 1 })
                                .then((res) => {
                                    if (res.data.length > 0) {
                                        arrData = arrData.concat(res.data)
                                        // setVideos([...videos, res.data])
                                    }
                                    setVideos(arrData.sort((a, b) => (a.start_time > b.start_time) ? 1 : -1))
                                    setLoading(false)
                                })
                        })
                })
        } else {
            LivestreamApi.getLivestream({
                type: param,
                page: 1
            }).then((res) => {
                setTipe(param)
                setVideos(res.data)
                setLoading(false)
            })
        }
    }
    useEffect(() => {
        setLoading(true)
        getData('All');
        // LivestreamApi.getLivestream({
        //     type: "live_videos",
        //     page: 1
        // }).then((res) => {
        //     setVideos(res.data)
        //     setLoading(false)
        // })
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
                getData('All')
                setFilter('All')
                break;
            case 'Ongoing':
                getData('live_videos')
                setFilter('live_videos')
                break;
            case 'Upcoming':
                getData('upcoming_videos')
                setFilter('upcoming_videos')
                break;
            case 'Previous':
                getData('previous_videos')
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
                setVideos(vids.sort((a, b) => (a.start_time > b.start_time) ? 1 : -1));
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
                    <div className="flex flex-col md:flex-row md:justify-between items-center">
                        <Searchbar />
                        <div className="text-xs flex w-full md:w-3/12 mt-4 md:mt-0 items-center">
                            <h2 className="font-semibold mr-2 text-sm md:text-lg text-gray-700">Filter</h2>
                            <div className="w-full md:w-40 form-categories border border-gray-300 rounded-md px-1 py-1 mr-2 my-2" role="button">
                                <Dropdown title="All" onClick={changeDropdown} items={items} />
                            </div>
                            <h2 className="font-semibold mr-2 text-sm md:text-lg text-gray-700">Sort</h2>
                            <div className="w-full md:w-40 form-categories border border-gray-300 rounded-md px-1 py-1 mr-2 my-2" role="button">
                                <Dropdown title="Date" onClick={changeDropdownFilter} items={itemsDate} />
                            </div>
                        </div>
                    </div>
                    <div className="my-10">
                        {
                            phoneTooltip.show && (
                                <h3 style={{ color: 'green', textAlign: 'center' }}>URL copied.</h3>
                            )
                        }
                        <Livestream dataVideos={videos} tipe={tipe} displayToolTip={displayToolTip} DisableButton={DisableButton} />
                    </div>
                </div>
            </section>
        </Spinner>
    )
}

export default LivestreamList;
