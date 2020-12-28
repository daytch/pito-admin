import React, { useEffect, useState } from 'react'
import Sidebar from 'components/SideNavbar'
import Searchbar from 'components/forms/search'
import Table from 'components/table/index'
import axios from '../configs/axios'
import { ReactComponent as IconSearch } from 'assets/images/icon-search.svg'

const tableHeadMerchant = [
    {
        title: "ID"
    },
    {
        title: "Merchant Name"
    },
    {
        title: "Email Address"
    },
    {
        title: "Total Livestream"
    },
    {
        title: "Total Upcoming Livestream"
    },
    {
        title: "Total Favourites"
    },
    {
        title: "Total Share"
    },
    {
        title: "Total Views"
    },
    {
        title: "Last Session"
    },
    {
        title: "Joined Date"
    },
];

const tableBodyMerchant = [
    {
        id: '10111',
        merchantName: 'Tommy A.S',
        email: 'example@gmail.com',
        totalLivestream: '3.365',
        totalUpcomingLivestream: 3,
        totalFavourites: 222.323,
        totalShare: 222.322,
        totalViews: 222.235,
        lastSession: "01/09/2020 (00:18)",
        joinedDate: "01/09/2020 (00:18)"
    },
    {
        id: '10112',
        merchantName: 'Gundy A.S',
        email: 'example@gmail.com',
        totalLivestream: '3.365',
        totalUpcomingLivestream: 3,
        totalFavourites: 222.323,
        totalShare: 222.322,
        totalViews: 222.235,
        lastSession: "01/09/2020 (00:18)",
        joinedDate: "01/09/2020 (00:18)"
    },
    {
        id: '10113',
        merchantName: 'Trump A.S',
        email: 'example@gmail.com',
        totalLivestream: '3.365',
        totalUpcomingLivestream: 3,
        totalFavourites: 222.323,
        totalShare: 222.322,
        totalViews: 222.235,
        lastSession: "01/09/2020 (00:18)",
        joinedDate: "01/09/2020 (00:18)"
    }
]

const MerchantListing = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('/admin/merchantList').then(e=>{
            setData(e.data)
            console.log(e.data)
        })
    }, []);

    const handleChange = (input) =>{
        if(!input){
            axios.get('/admin/merchantList').then(e=>{
            setData(e.data)
        })
        }
       const c = data.filter(e=> e.name.toLowerCase().includes(input.toLowerCase()))
       setData(c)

    }
    return (
        <>
            <section className="flex flex-col xl:flex-row ">
                <Sidebar />
                <div className="py-20 px-5 w-full">
                    <div className="flex justify-between">
                        <div className="w-full md:w-2/5 flex">
                <input type="text" placeholder="Search..." onChange={e=>handleChange(e.target.value)} className="border border-gray-300 text-lg px-2 w-full py-1 focus:outline-none" />
                <button className="px-1 py-1 bg-red-700 focus:outline-none hover:bg-red-600"><IconSearch /></button>
            </div>
                    </div>
                    <div className="flex pt-10 overflow-x-auto">
                        <Table itemHead={tableHeadMerchant} itemBody={data} />
                    </div>
                </div>

            </section>
        </>
    )
}

export default MerchantListing;