import React, { useState, useEffect } from 'react'
import Sidebar from 'components/SideNavbar'

// import userAvatarDummy from 'assets/images/user-avatar.jpg'
import { ReactComponent as FbIcon } from 'assets/images/fb-icon-blue.svg'
import { ReactComponent as EmailIcon } from 'assets/images/email-icon.svg'
import { ReactComponent as GoogleIcon } from 'assets/images/google-icon-colorful.svg'
// import { ReactComponent as AvatarDummy } from 'assets/images/avatar-dummy.svg'

import Avatar from 'react-avatar';
import Dropdown from 'components/forms/dropdown'
import User from 'api/users'
import UserLivestreamVideos from 'components/view-video/user-livestream'
import MerchantDetail from 'components/merchant'
import { useParams } from 'react-router-dom'
import Spinner from 'components/spinner'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)


const UserDetail = () => {

    const [isLoading, setLoading] = useState(true)
    const [data, setData] = useState('')
    const [id] = useState(useParams())
    const [isMerchant, setIsMerchant] = useState('')
    const [livestreamFav, setLivestreamFav] = useState('')
    const [livestreamView, setLivestreamView] = useState('')
    const [merchantPopular, setMerchantPopular] = useState('')
    const [merchantRecent, setMerchantRecent] = useState('')
    const [isMerchantRecent, setIsMerchantRecent] = useState('')
    const [isLivestreamFav, setIsLivestreamFav] = useState('')
    const [nama, setNama] = useState('')

    useEffect(() => {
        User.getUserDetail(id.id).then((res) => {
            setData(res.data)
            setNama(res.data.name)
            setIsMerchant(res.isMerchant)
            setLivestreamFav(res.livestream_mostfav)
            setLivestreamView(res.livestream_mostview)
            setMerchantPopular(res.merchant_mostpopular)
            setMerchantRecent(res.merchant_mostrecent)
            setLoading(false)
        })
    }, [])

    const MostList = [
        {
            id: 2,
            value: 'Most Views'
        }, {
            id: 3,
            value: 'Most Favourites'
        }
    ]
    const MostRecent2 = [

        {
            id: 2,
            value: 'Most Popular'
        }, {
            id: 3,
            value: 'Most Recent'
        }
    ]
    function changeMerchant(e) {
        let isMerchantR = e.value === "Most Recent" ? true : false
        setIsMerchantRecent(isMerchantR)
    }
    function changeLivestream(e) {
        let isLivestreamF = e.value === "Most Favourites" ? true : false
        setIsLivestreamFav(isLivestreamF)
    }
    const changeName = (e) => { setNama(e.target.value) }
    function updateProfile() {
        setLoading(true)
        User.submitUserProfile({ userId: id.id, name: nama }).then((res) => {
            setLoading(false)
            if (res.isSuccess) {
                MySwal.fire('Success', res.message, 'success');
            } else {
                MySwal.fire('Error', res.message, 'danger');
            }
        })
    }

    return (
        <Spinner isLoading={isLoading} className="min-h-screen">
            <section className="min-h-screen flex flex-col xl:flex-row">
                <Sidebar />
                <div className="py-10 md:py-20 flex flex-col xl:flex-row w-full xxl:px-6">
                    <div className="w-full xl:w-3/5 xxl:w-3/5 px-4">
                        <div className="flex flex-col xl:flex-row xl:items-center">

                            {
                                data.img_avatar ? (<img src={data.img_avatar} draggable={false} className="rounded-full w-4/5 xl:w-1/3 border-8 mb-4 xl:mb-0 xl:mr-4 border-red-600 mx-auto" alt={data.name} />) :
                                    (<Avatar name={data.name} className="mx-auto" round={true} size="125px" />)
                            }

                            <div className="md:px-8">
                                <h4 className="text-red-600 md:text-2xl font-bold">{data.name}</h4>
                                <p className="md:text-lg mt-4">{data.email}</p>
                                <div className="md:flex flex-wrap hidden ">
                                    <button disabled className="flex items-center text-sm md:text-base shadow-md mr-1 px-6 mt-4 py-2 border border-gray-50 rounded-3xl bg white text-gray-700">
                                        <FbIcon className="mr-3" /> Facebook
                                                </button>
                                    <button disabled className="flex items-center text-sm md:text-base shadow-md px-6 mt-4 py-2 border border-gray-50 rounded-3xl bg white text-gray-700">
                                        <GoogleIcon className="mr-3" /> Google
                                                </button>
                                    <button disabled className="flex items-center text-sm md:text-base shadow-md mr-4 px-6 mt-4 py-2 border border-gray-50 rounded-3xl bg white text-gray-700">
                                        <EmailIcon className="mr-3" /> Email
                                                </button>
                                </div>
                                <div className="flex">
                                    {
                                        isMerchant ?
                                            <button className="font-semibold mr-2 md:mr-4 text-sm md:text-base px-8 mt-4 md:py-2 rounded-md bg-red-600 text-white">Merchant</button> :
                                            <button className="font-semibold px-6 mr-2 md:mr-4 text-sm md:text-base mt-4 py-2 whitespace-no-wrap md:py-2 rounded-md bg-gray-400 text-white">Non Merchant</button>
                                    }
                                </div>
                            </div>

                        </div>
                        <div className="user-detail flex flex-wrap xl:flex-no-wrap md:hidden ">
                            <button className="flex items-center text-sm md:text-base shadow-md mr-4 px-6 mt-4 py-2 border border-gray-50 rounded-3xl bg white text-gray-700">
                                <FbIcon className="mr-3" /> Facebook
                                                </button>
                            <button className="flex items-center text-sm md:text-base shadow-md px-6 mt-4 mr-4 py-2 border border-gray-50 rounded-3xl bg white text-gray-700">
                                <GoogleIcon className="mr-3" /> Google
                                                </button>
                            <button className="flex items-center text-sm md:text-base shadow-md mr-4 px-6 mt-4 py-2 border border-gray-50 rounded-3xl bg white text-gray-700">
                                <EmailIcon className="mr-3" /> Email
                                                </button>
                        </div>
                        <div className="flex flex-col-reverse">
                            <div className="flex flex-col pt-16">
                                <div className="flex md:justify-between items-center">
                                    <p className="px-6 text-red-600 font-bold text-base">Favorite Livestreams</p>
                                    <div className="w-50 text-sm px-2 py-1 my-2 md:my-0 md:ml-4 border border-gray-300 rounded-md" >
                                        <Dropdown witdh="w-48" title="Most Recent" onClick={changeLivestream} items={MostList} />
                                    </div>
                                </div>
                                <div className="px-2">
                                    {
                                        isLivestreamFav ?
                                            <UserLivestreamVideos ListVideo={livestreamFav} /> :
                                            <UserLivestreamVideos ListVideo={livestreamView} />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full xl:w-2/5 px-4 flex flex-col">
                        <div className="pt-20 px-4 hidden md:block">
                            <h5 className="text-gray-700 font-light text-lg">Change Display Name</h5>
                            <input type="text" placeholder="Display Name" onChange={changeName} value={nama} className="rounded-lg border w-full border-gray-50 px-2 py-2 my-2 focus:outline-none" />
                            <div className="w-auto mt-2">
                                <button onClick={updateProfile} className="rounded-3xl float-right px-10 py-3 bg-red-600 text-white text-lg font-medium">Save</button>
                            </div>
                        </div>
                        <div className="pt-10 md:pt-8 flex flex-col px-4">
                            <div className="flex justify-between items-center">
                                <p className="text-red-600 font-bold text-base">Favorite Merchants</p>
                                <div className="w-50 text-sm px-2 py-1 my-2 md:my-0 md:ml-4 border border-gray-300 rounded-md" >
                                    <Dropdown witdh="w-48" title="Most Recent" onClick={changeMerchant} items={MostRecent2} />
                                </div>
                            </div>
                            <div className="pt-6">
                                {
                                    isMerchantRecent ?
                                        <MerchantDetail ListMerchant={merchantRecent} /> :
                                        <MerchantDetail ListMerchant={merchantPopular} />
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Spinner>
    )
}

export default UserDetail;
