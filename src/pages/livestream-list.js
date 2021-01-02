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
        id: 1,
        value: 'Views'
    },
    {
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
    const [filter,setFilter]=useState('')

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
        setLoading(true)
        Livestream.deleteLivestream(id).then((res) => {
            setLoading(false)
            if (res.isSuccess) {
                MySwal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: res.message
                })
                getData('')
            } else {
                MySwal.fire({
                    icon: 'danger',
                    title: 'Error',
                    text: res.message
                })
            }
        });
    }
    function changeDropdown(e) {
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
    function changeDropdown(e) {
        switch (e.value) {
            case 'Ongoing':
                getData('live_videos')
                break;
            case 'Upcoming':
                getData('upcoming_videos')
                break;
            case 'Previous':
                getData('previous_videos')
                break;
        }
    }
    return (
        <Spinner isLoading={isLoading} className="min-h-screen">
            <section className="flex flex-col xl:flex-row ">
                <Sidebar />
                <div className="py-20 px-5 w-full">
                    <div className="flex flex-col md:flex-row md:justify-between items-center">
                        <Searchbar />
                        <div className="flex w-full md:w-auto md:flex-row mt-4 md:mt-0 items-center">
                            <h2 className="font-semibold text-sm md:text-lg text-gray-700">Filter</h2>
                            <div className="flex ml-5 w-1/3">
                                <Dropdown title="Select..." onClick={changeDropdown} items={items} />
                            </div>
                            <div className="flex ml-5 w-1/3">
                                <Dropdown title="Date..." onClick={changeDropdown} items={itemsDate} />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        {
                            videos.map((item, index) => {

                                const ListVideo = [{ iframe: item.iframe, id: item.id, thumbnail: item.img_thumbnail, live: false, views: item.views, likes: item.likes, date: item.start_time, title: item.title }]

                                return (
                                    <div key={index} className="flex flex-wrap w-full mt-4">
                                        <FullWidth actionLinks={'/livestream/' + item.id} dataVideos={ListVideo} title={item.title} viewsElement={true} DeleteButton={DeleteButton} actions={true} ig={item.instagram_url} fb={item.facebook_url} tiktok={item.tiktok_url} caption={item.description} category={item.categories} socmedCustom={true} />
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