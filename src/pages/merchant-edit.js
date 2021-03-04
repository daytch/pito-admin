import React, { useEffect, useState } from 'react'
import Sidebar from 'components/SideNavbar'

import { ReactComponent as FbIcon } from 'assets/images/fb-icon-blue.svg'
import { ReactComponent as EmailIcon } from 'assets/images/email-icon.svg'
import { ReactComponent as GoogleIcon } from 'assets/images/google-icon-colorful.svg'
import Avatar from 'react-avatar';
import users from 'api/users'
import { toast, ToastContainer } from 'react-toastify'
import Dropdown from 'components/forms/dropdown'
import livestream from 'api/livestream';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Spinner from 'components/spinner'
import { useParams, Link } from 'react-router-dom'

const MySwal = withReactContent(Swal)
const MerchantEdit = () => {

    const [id] = useState(useParams())
    const [data, setData] = useState([]);
    const [category, setCategory] = useState(data.category)
    const [categoryid, setCategoryid] = useState({})
    const [isLoading, setLoading] = useState(true)
    const [cat1, setCat1] = useState('')
    const [cat2, setCat2] = useState('')
    const [cat3, setCat3] = useState('')

    function getData() {

        users.getMerchantDetail(id.id).then((e) => {

            setData(e.data);
            let categories = e.data.categories;

            setCat1(categories[0] && categories[0].name ? categories[0].name : 'Category')
            setCat2(categories[1] && categories[1].name ? categories[1].name : 'Category')
            setCat3(categories[2] && categories[2].name ? categories[2].name : 'Category')
            let c = e.data.categories.map((item, index) => {
                return {
                    key: index + 1,
                    value: item.category_id
                }
            })
            var result = {};
            for (var i = 0; i < c.length; i++) {
                result[c[i].key] = c[i].value;
            }
            setCategoryid(result)
            setLoading(false);

            livestream.getCategory().then((res) => {
                const ListCategory = res.data.map((i) => {
                    return { "id": i.id, "value": i.text }
                })
                setCategory(ListCategory);
                setLoading(false)
            })
        })
    }

    useEffect(() => {
        livestream.getCategory().then((res) => {

            const ListCategory = res.data.map((i) => {
                return { "id": i.id, "value": i.text }
            })
            setCategory(ListCategory);
            setLoading(false)
        })
        getData()
        // eslint-disable-next-line
    }, [])

    function changeCategoryid(e, idx) {
        setCategoryid({ ...categoryid, [idx]: e.id });
    }

    function goBack() {
        
        window.location.href = "/merchant/" + id
    }

    function handleEdit() {
        setLoading(true);
        let cat = []
        for (const [value] of Object.entries(categoryid)) {
            cat.push(value)
        }
        if (new Set(cat).size !== cat.length) {
            setLoading(false)
            MySwal.fire('Validation!', 'Cannot pick same categories.', 'warning');
            return;
        }

        const formData = new FormData();
        let exclude = ["isNext", "total_videos", "total_fav", "total_view", "total_shared", "shared_month", "history_videos", "fav_month", "view_month"]
        for (const [key, value] of Object.entries(data)) {
            if (exclude.indexOf(key) === -1) {
                // if (key === "img_avatar") {
                //     formData.append("mypic", value)
                // } else 
                if (key === "img_avatar" && typeof (value) === "string") {
                    console.log('empty')
                }
                else {
                    formData.append(key, value)
                }
            }
        }

        formData.append('userId', id.id)
        formData.set('categories', cat)

        users.submitMerchantProfile(formData).then(e => {
            if (e.isSuccess) {
                MySwal.fire("Success", e.message, 'success')
                getData()
            } else {
                MySwal.fire("Error", e.message, 'error')
            }
        })
    }

    function UploadNewAva() {
        document.getElementById("uploadAva").click()
    }
    function handleChange(data, value) {
        setData((e) => {
            return {
                ...e,
                [data]: value
            }
        })
    }

    return (
        <Spinner isLoading={isLoading} className="min-h-screen">
            <section className="min-h-screen flex flex-col xl:flex-row">
                <Sidebar />
                <ToastContainer position="top-right" />
                <div className="py-10 md:py-10 flex flex-col md:flex-row w-full">
                    <div className="w-full md:w-3/5 xxl:w-1/2 px-4">
                        <div className="flex flex-col xl:flex-row xl:items-center">
                            <div className="w-4/5 md:w-1/2 flex-row-reverse">
                                {
                                    data.img_avatar ?
                                        (<><img src={data.img_avatar ? data.img_avatar : ava} draggable={false} className="merchantedit-img rounded-full border-8 mb-4 xl:mb-0 xl:mr-4 border-red-600 mx-auto" alt={data.name} />
                                            <br />
                                            <h3 className="mr-8 text-md font-light flex">{data.email}</h3></>) :
                                        (<><Avatar name={data.name} className="mx-auto" round={true} size="125px" />
                                            <br />
                                            <h3 className="mr-8 text-md font-light flex">{data.email}</h3></>)
                                }
                            </div>
                            <div className="xl:px-8 w-3/6">
                                <div className="flex flex-wrap w-full pt-2">
                                    <input hidden type="file" onChange={(e) => mypicChange(e)} id="uploadAva" />
                                    <button onClick={UploadNewAva} className="px-4 py-1 w-full bg-red-600 shadow-md my-2 text-white text-md rounded-xl">Upload New Avatar</button>
                                    <button className="px-6 py-1 w-full border border-red-600 shadow-md my-2 text-red-600 text-md rounded-xl">Delete Avatar</button>
                                    <div className="user-detail w-full justify-center pt-2">
                                        {
                                            true === "facebook" ? (<span className="flex justify-center text-sm md:text-base shadow-md px-2 mt-2 py-1 border border-gray-50 rounded-xl bg white text-gray-700">
                                                <FbIcon className="mr-3" /> Facebook </span>) :   // if(a) then `b`
                                                true === "facebook" ? (<span className="flex justify-center text-sm md:text-base shadow-md px-2 mt-2 py-1 border border-gray-50 rounded-xl bg white text-gray-700">
                                                    <GoogleIcon className="mr-3" /> Google </span>) : (<span className="flex justify-center text-sm md:text-base shadow-md px-2 mt-2 py-1 border border-gray-50 rounded-xl bg white text-gray-700">
                                                        <EmailIcon className="mr-3" /> Email </span>)
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 flex flex-col">
                        <div className="flex flex-col pt-8 md:pt-0 px-4">
                            <h6 className="text-red-600 font-semibold text-lg">Edit Profile</h6>
                            <div className="flex flex-wrap w-full items-start my-2">
                                <label htmlFor="name" className="w-full md:w-1/4 text-sm text-gray-700">Display Name</label>
                                <input type="text" value={data.name} onChange={(e) => {
                                    handleChange('name', e.target.value)
                                }} placeholder="Your Display Name" className="w-full text-sm md:w-4/6 px-2 py-1 my-2 md:my-0 md:ml-4 border border-gray-300 rounded-md" />
                            </div>
                            <div className="flex flex-wrap w-full items-start my-2">
                                <label htmlFor="about" className="w-full md:w-1/4 text-sm text-gray-700">About</label>
                                <textarea value={data.about} onChange={(e) => {
                                    handleChange('about', e.target.value)
                                }} placeholder="Describe Your Self" className="w-full text-sm md:w-4/6 px-2 py-1 h-32 my-2 md:my-0 md:ml-4 border border-gray-300 rounded-lg" />
                            </div>
                            <div className="flex flex-wrap w-full items-start my-2">
                                <label htmlFor="name" className="w-full md:w-1/4 text-sm text-gray-700">Category 1</label>
                                <div className="w-full text-sm md:w-4/6 px-2 py-1 my-2 md:my-0 md:ml-4 border border-gray-300 rounded-md" >
                                    <Dropdown title={cat1} placeholder="Category 1" items={category} onClick={changeCategoryid} idx={1} />
                                </div>
                            </div>
                            <div className="flex flex-wrap w-full items-start my-2">
                                <label htmlFor="name" className="w-full md:w-1/4 text-sm text-gray-700">Category 2</label>
                                <div className="w-full text-sm md:w-4/6 px-2 py-1 my-2 md:my-0 md:ml-4 border border-gray-300 rounded-md" >
                                    <Dropdown title={cat2} placeholder="Category 2" items={category} onClick={changeCategoryid} idx={2} />
                                </div>
                            </div>
                            <div className="flex flex-wrap w-full items-start my-2">
                                <label htmlFor="name" className="w-full md:w-1/4 text-sm text-gray-700">Category 3</label>
                                <div className="w-full text-sm md:w-4/6 px-2 py-1 my-2 md:my-0 md:ml-4 border border-gray-300 rounded-md" >
                                    <Dropdown title={cat3} placeholder="Category 3" items={category} onClick={changeCategoryid} idx={3} />
                                </div>
                            </div>
                            <div className="flex flex-wrap w-full items-start my-2">
                                <label htmlFor="name" className="w-full md:w-1/4 text-sm text-gray-700">Facebook Page Link</label>
                                <input type="text" value={data.fb_url} onChange={(e) => {
                                    handleChange('fb_url', e.target.value)
                                }} placeholder="https://facebook.com" className="w-full text-sm md:w-4/6 px-2 py-1 my-2 md:my-0 md:ml-4 border border-gray-300 rounded-md" />
                            </div>
                            <div className="flex flex-wrap w-full items-start my-2">
                                <label htmlFor="name" className="w-full md:w-1/4 text-sm text-gray-700">Instagram Page Link</label>
                                <input type="text" value={data.ig_url} onChange={(e) => {
                                    handleChange('ig_url', e.target.value)
                                }} placeholder="https://instagram.com" className="w-full text-sm md:w-4/6 px-2 py-1 my-2 md:my-0 md:ml-4 border border-gray-300 rounded-md" />
                            </div>
                            <div className="flex flex-wrap w-full items-start my-2">
                                <label htmlFor="name" className="w-full md:w-1/4 text-sm text-gray-700">Tiktok Page Link</label>
                                <input type="text" value={data.tiktok_url} onChange={(e) => {
                                    handleChange('tiktok_url', e.target.value)
                                }} placeholder="https://tiktok.com" className="w-full text-sm md:w-4/6 px-2 py-1 my-2 md:my-0 md:ml-4 border border-gray-300 rounded-md" />
                            </div>
                        </div>
                        <div className="flex justify-end md:px-8 mt-4">
                            <button className="w-1/3 px-4 py-1 rounded-3xl border border-red-600 text-red-600 mx-5 font-medium"><Link to={`/merchant/${id.id}`} className="link-wrapped">Cancel</Link></button>
                            <button onClick={handleEdit} className="w-1/3 px-4 py-1 rounded-3xl bg-red-600 text-white font-medium">Save</button>
                        </div>
                    </div>
                </div>
            </section>
        </Spinner>
    )
}

export default MerchantEdit;
