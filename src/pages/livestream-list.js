import React, { useState, useEffect } from 'react'
import Sidebar from 'components/SideNavbar'
import Searchbar from 'components/forms/search'
import Dropdown from 'components/forms/dropdown'
import FullWidth from 'components/view-video/FullWidth'
// import thumbnail from 'assets/images/thumbnail-one.jpg'
import Livestream from 'api/livestream'
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
    const [phoneTooltip, setPhoneTooltip] = useState({
        show: false,
        x: 0,
        y: 0,
        orientLeft: false
    })

    function getData(param) {
        Livestream.getLivestream({
            type: param,
            page: 1
        }).then((res) => {
            setVideos(res.data)
            setLoading(false)
        })

    }
    useEffect(() => {
        Livestream.getLivestream({
            type: "live_videos",
            page: 1
        }).then((res) => {
            setVideos(res.data)
            setLoading(false)
        })
    }, [])
    const DeleteButton = (id) => {
        return <button onClick={() => submitDelete(id)} className="font-semibold text-base md:text-lg text-red-600 mr-4">Delete</button>;
    };

    function submitDelete(id) {
        MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                setLoading(true)
                Livestream.deleteLivestream(id).then((res) => {
                    setLoading(false)
                    MySwal.fire(
                        'Deleted!',
                        'Your data has been deleted.',
                        'success'
                    ).then(() => {
                        getData('')
                    })
                });
            }
        })
    }
    function changeDropdown(e) {
        setLoading(true)
        switch (e.value) {
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
        debugger;
        let vids = [...videos];
        switch (e.value) {
            case 'Views':
                setVideos(vids.sort((a, b) => (a.views > b.views) ? 1 : -1));
                break;
            case 'Favourites':
                setVideos(vids.sort((a, b) => (a.likes > b.likes) ? 1 : -1));
                break;
            case 'Shares':
                setVideos(vids.sort((a, b) => (a.share > b.share) ? 1 : -1));
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
            <section className="min-h-screen flex flex-col xl:flex-row ">
                <Sidebar />
                <div className="py-20 px-5 w-full">
                    <div className="flex flex-col md:flex-row md:justify-between items-center">
                        <Searchbar />
                        <div className="flex w-full md:w-3/12 mt-4 md:mt-0 items-center">
                            <h2 className="font-semibold text-sm md:text-lg text-gray-700">Filter</h2>
                            <div className="form-categories border ml-5 w-1/3 border-gray-300 rounded-xl">
                                <Dropdown title="Ongoing" onClick={changeDropdown} items={items} />
                            </div>
                            <div className="form-categories border ml-5 w-1/3 border-gray-300 rounded-xl">
                                <Dropdown title="Date" onClick={changeDropdownFilter} items={itemsDate} />
                            </div>
                        </div>
                    </div>

                    {phoneTooltip.show && (
                        <h3 style={{ color: 'green', textAlign: 'center' }}>URL copied.</h3>
                    )}
                    <div className="grid grid-cols-2 gap-2">
                        {
                            videos.map((item, index) => {

                                const ListVideo = [{ iframe: item.iframe, id: item.id, thumbnail: item.img_thumbnail, share_url: item.share_url, live: false, views: item.views, likes: item.likes, date: item.start_time, title: item.title }]

                                return (
                                    <div key={index} className="flex flex-wrap w-full mt-4">
                                        <FullWidth displayToolTip={displayToolTip} actionLinks={'/livestream/detail/' + item.id} dataVideos={ListVideo} title={item.title} viewsElement={true} DeleteButton={DeleteButton} actions={true} ig={item.redirect_ig} fb={item.redirect_fb} tiktok={item.redirect_tiktok} caption={item.description} category={item.categories} socmedCustom={true} />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </section>
        </Spinner>
    )
}

export default LivestreamList;