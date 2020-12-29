import React, { useState, useEffect } from 'react'
import Sidebar from 'components/SideNavbar'
import Table from 'components/table/index'
import Spinner from 'components/spinner'
import Category from 'api/category'

const Categories = () => {

    const [isLoading, setLoading] = useState(true)
    const [data, setData] = useState([])

    useEffect(() => {
        Category.getListCategory().then((res) => {
            setData(res.data.map((item) => {
                return {
                    no: item.id,
                    name: item.name,
                    totLivestream: item.total_livestream,
                    totMerchants: item.total_merchant,
                    totSearches: item.total_searches,
                    totViews: item.total_views,
                    // buttons: DeleteButton(item.id)
                }
            }))
            setLoading(false)
            
        })
    }, [])

    const deleteCategory = (id) => {
        
        isLoading(true)
        Category.deleteCategory({ id: id.id, isActive: 0 }).then((res) => {

            isLoading(false)
        })
    }

    const editCategory = (id) => {
        
    }

    const DeleteButton = (id) => {
        return (<><button onClick={() => editCategory(id)} className="py-2 w-full px-4 bg-red-600 font-medium text-white rounded-3xl">Edit</button>
            <button onClick={() => deleteCategory(id)} className="py-2 mt-2 w-full px-4 border border-red-600 font-medium text-red-600 rounded-3xl">Delete</button></>)
        // return <button onClick={() => submitDelete(id)} className="font-semibold text-base md:text-lg text-red-600 mr-4">Delete</button>;
    };

    const tableHeadCategory = [
        {
            title: "No."
        },
        {
            title: "Name"
        },
        // {
        //     title: "Slug"
        // },
        {
            title: "Total Livestreams"
        },
        {
            title: "Total Merchants"
        },
        {
            title: "Total Searches"
        },
        {
            title: "Total Views"
        },
        // {
        //     title: "Total Favourites"
        // },
        // {
        //     title: "Total Shared"
        // },
        {
            title: ""
        },
    ];

    return (
        <Spinner isLoading={isLoading} className="min-h-screen">
            <section className="min-h-screen flex flex-col xl:flex-row ">
                <Sidebar />
                <div className="py-20 px-5 w-full">
                    <div className="flex justify-end">
                        <button className="bg-red-600 text-white font-medium text-lg px-4 py-2 rounded-3xl">Add New Category</button>
                    </div>
                    <div className="flex pt-10 overflow-x-auto">
                        <Table itemHead={tableHeadCategory} itemBodyCategory={data} DeleteButton={DeleteButton} />
                    </div>
                </div>

            </section>
        </Spinner>
    )
}

export default Categories;