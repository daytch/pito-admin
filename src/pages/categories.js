import React, { useState, useEffect } from 'react'
import Sidebar from 'components/SideNavbar'
import Table from 'components/table/index'
import Spinner from 'components/spinner'
import Category from 'api/category'
import Modal from 'react-modal'
Modal.setAppElement('*'); // suppresses modal-related test warnings.
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const Categories = () => {

    var subtitle;
    const [isLoading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [title, setTitle] = useState('')
    const [categoryName, setCategoryName] = useState('')
    const [id, setId] = useState('')
    const [isUpdate, setIsUpdate] = useState(true)
    const [modalIsOpen, setIsOpen] = useState(false)

    function getData() {
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
    }
    useEffect(() => {
        getData()
        // eslint-disable-next-line 
    }, [])

    const changeName = (CategoryName) => {
        setCategoryName(CategoryName)
    }

    const deleteCategory = (id) => {

        MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, close it!'
        }).then((result) => {
            if (result.isConfirmed) {
                setLoading(true)
                setId(id.id)
                Category.deleteCategory({ id: id.id, isActive: 0 }).then((res) => {
                    setLoading(false)
                    if (res.isSuccess) {
                        MySwal.fire('Success!', res.message, 'success');
                        getData()
                    } else {
                        MySwal.fire('Error!', res.message, 'danger');
                    }
                })
            }
        })
    }

    const insertCategory = () => {
        setLoading(true)
        Category.insertCategory({ name: categoryName }).then(res => {
            if (res.isSuccess) {
                MySwal.fire('Success!', res.message, 'success');
                getData()
                closeModal()
            } else {
                MySwal.fire('Error!', res.message, 'danger');
            }
        })
    }

    const updateCategory = () => {
        setLoading(true)
        Category.updateCategory({ name: categoryName, id: id }).then(res => {
            if (res.isSuccess) {
                MySwal.fire('Success!', res.message, 'success');
                getData()
                closeModal()
            } else {
                MySwal.fire('Error!', res.message, 'danger');
            }
        })
    }

    const openModalforInsert = () => {
        setIsUpdate(false)
        setCategoryName('')
        setId('')
        setTitle('Create Category')
        openModal()
    }

    const editCategory = (id) => {
        setIsUpdate(true)
        setCategoryName(id.catName)
        setId(id.id)
        setTitle('Edit Category')
        openModal()
    }

    const DeleteButton = (id) => {
        return (<><button onClick={() => editCategory(id)} className="text-xs py-2 w-full px-4 bg-red-600 font-medium text-white rounded-3xl">Edit</button>
            <button onClick={() => deleteCategory(id)} className="text-xs py-2 mt-2 w-full px-4 border border-red-600 font-medium text-red-600 rounded-3xl">Delete</button></>)
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

    const openModal = () => { setIsOpen(true) }

    const closeModal = () => { setIsOpen(false) }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '34vw'
        }
    };

    return (
        <Spinner isLoading={isLoading} className="min-h-screen">
            <section className="min-h-screen flex flex-col xl:flex-row ">
                <Sidebar />
                <div className="py-20 px-5 w-full">
                    <div className="flex justify-end">
                        <button onClick={() => openModalforInsert()} className="bg-red-600 text-white font-medium text-md px-4 py-2 rounded-3xl">Add New Category</button>
                    </div>
                    <div className="flex pt-10 overflow-x-auto">
                        <Table itemHead={tableHeadCategory} itemBodyCategory={data} DeleteButton={DeleteButton} />
                    </div>
                </div>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Livestream Modal"
                    shouldCloseOnOverlayClick={false}
                >
                    <div className="flex items-start justify-between border-b border-solid border-gray-300 rounded-t">
                        <h6 ref={_subtitle => (subtitle = _subtitle)}>{title}</h6>
                        <button
                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={closeModal}  >
                            <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                        </button>
                    </div>
                    {/*body*/}
                    <div className="relative p-6 flex-auto">
                        {/* {dataModal && ReactHtmlParserfrom(dataModal)} */}
                        <div className="flex flex-wrap w-full items-start my-2">
                            <label htmlFor="name" className="w-full text-xs text-sm md:w-1/4 text-base text-gray-700">Category Name</label>
                            <input type="text" value={categoryName} onChange={(e) => {
                                changeName(e.target.value)
                            }} placeholder="Category Name" className="w-full text-xs md:w-4/6 px-4 py-2 my-2 md:my-0 md:ml-4 border border-gray-300 rounded-lg" />
                        </div>
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end rounded-b">
                        <button onClick={() => isUpdate ? updateCategory() : insertCategory()} className="pt-1 py-2 text-xs mr-1 w-full px-4 bg-red-600 font-medium text-white rounded-3xl">Save</button>
                        <button
                            className="pt-1 py-2 text-xs mr-1 w-full px-4 border border-red-600 font-medium text-red-600 rounded-3xl"
                            type="button"
                            style={{ transition: "all .15s ease" }}
                            onClick={closeModal}
                        >Close</button>

                    </div>
                </Modal>
            </section>
        </Spinner>
    )
}

export default Categories;