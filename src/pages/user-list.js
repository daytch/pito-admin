import React, { useEffect, useState } from 'react'
import Sidebar from 'components/SideNavbar'
import TableUser from 'components/table/TableUser'
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
            title: "ID",
            value: 'id'
        },
        {
            title: "User Name",
            value: 'name'
        },
        {
            title: "Email Address",
            value: 'email'
        },
        {
            title: "Device",
            value: 'source'
        },
        {
            title: "Last Session",
            value: 'last_login'
        },
        {
            title: "Joined Date",
            value: 'createdAt'
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
                <div className="py-5 md:py-10 px-5 w-full">
                    <div className="flex justify-between">
                        <div className="w-full md:w-2/5 flex">
                            <input type="text" placeholder="Search..." onChange={e => handleChange(e.target.value)} className="border border-gray-300 text-lg px-2 w-full py-1 focus:outline-none" />
                            <button className="px-1 py-1 bg-red-700 focus:outline-none hover:bg-red-600"><IconSearch /></button>
                        </div>
                    </div>
                    <div className="flex text-xs md:text-md pt-5 overflow-x-auto">
                        <TableUser itemBody={data} itemHead={tableHeadUser} />
                    </div>
                </div>

            </section>
        </Spinner>
    )
}

export default UserListing;

