import React, { useEffect, useState } from 'react'
import Sidebar from 'components/SideNavbar'
import Table from 'components/table/index'
import axios from '../configs/axios'
import { ReactComponent as IconSearch } from 'assets/images/icon-search.svg'
import User from 'api/users'
import Spinner from 'components/spinner'

const UserListing = () => {

    const [isLoading, setLoading] = useState(true)
    const [data, setData] = useState([]);

    useEffect(() => {
        setLoading(true)
        User.getUserList().then(e => {
            setData(e.data)
            setLoading(false)
        })
    }, []);


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

    const handleChange = (input) => {
        if (!input) {
            axios.get('/admin/userList').then(e => {
                setData(e.data)
            })
        }
        const c = data.filter(e => e.name.toLowerCase().includes(input.toLowerCase()))
        setData(c)

    }

    return (
        <Spinner isLoading={isLoading} className="min-h-screen">
            <section className="min-h-screen flex flex-col xl:flex-row ">
                <Sidebar />
                <div className="py-20 px-5 w-full">
                    <div className="flex justify-between">
                        <div className="w-full md:w-2/5 flex">
                            <input type="text" placeholder="Search..." onChange={e => handleChange(e.target.value)} className="border border-gray-300 text-lg px-2 w-full py-1 focus:outline-none" />
                            <button className="px-1 py-1 bg-red-700 focus:outline-none hover:bg-red-600"><IconSearch /></button>
                        </div>
                    </div>
                    <div className="flex pt-10 overflow-x-auto">
                        <Table itemHead={tableHeadUser} itemBodyUser={data} />
                    </div>
                </div>

            </section>
        </Spinner>
    )
}

export default UserListing;

