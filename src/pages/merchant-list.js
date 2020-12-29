import React, { useEffect, useState } from 'react'
import Sidebar from 'components/SideNavbar'
import Searchbar from 'components/forms/search'
import Table from 'components/table/index'
import { ReactComponent as IconSearch } from 'assets/images/icon-search.svg'
import users from 'api/users'

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

const MerchantListing = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        users.getMerchants().then(e=>{
            setData(e.data)
            console.log(e.data)
        })
    }, []);

    const handleChange = (input) =>{
        if(!input){
            users.getMerchants().then(e=>{
            setData(e.data)
        })
        }
       const c = data.filter(e=> e.name.toLowerCase().includes(input.toLowerCase()))
       setData(c)
    }
    
    return (
        <>
            <section className="min-h-screen flex flex-col xl:flex-row ">
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