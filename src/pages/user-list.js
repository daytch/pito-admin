import React, { useEffect, useState } from 'react'
import Sidebar from 'components/SideNavbar'
import Table from 'components/table/index'
import axios from '../configs/axios'
import { ReactComponent as IconSearch } from 'assets/images/icon-search.svg'

const UserListing = () => {
    const tableHeadUser = [
        {
            title: "ID"
        },
        {
            title: "User Name"
        },
        {
            title: "Email Address"
        },
        {
            title: "Device"
        },
        {
            title: "Last Session"
        },
        {
            title: "Joined Date"
        },
    ];

    const tableBodyUser = [
        {
            id: '10111',
            username: 'Tommy A.S',
            device: 'Android/Ios',
            email: 'example@gmail.com',
            lastSession: "01/09/2020 (00:18)",
            joinedDate: "01/09/2020 (00:18)"
        },
        {
            id: '10112',
            username: 'Gundy A.S',
            device: 'Android/Ios',
            email: 'example@gmail.com',
            lastSession: "01/09/2020 (00:18)",
            joinedDate: "01/09/2020 (00:18)"
        },
        {
            id: '10113',
            username: 'Trump A.S',
            device: 'Android/Ios',
            email: 'example@gmail.com',
            lastSession: "01/09/2020 (00:18)",
            joinedDate: "01/09/2020 (00:18)"
        }
    ]

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('/admin/userList').then(e=>{
            setData(e.data)
        })
    }, []);

    const handleChange = (input) =>{
        if(!input){
            axios.get('/admin/userList').then(e=>{
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
                        <Table itemHead={tableHeadUser} itemBodyUser={data} />
                    </div>
                </div>

            </section>
        </>
    )
}

export default UserListing;

