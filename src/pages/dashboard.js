import React, { useEffect, useState } from 'react'

import Sidebar from 'components/SideNavbar'
// import Graph from 'components/Graph'
import live from 'api/livestream'
import Spinner from 'components/spinner'

import MostviewsVideos from 'components/view-video/index'
import Lines from 'components/graphic-chart/Lines'
import Bars from 'components/graphic-chart/Bars'
import SelectForm from 'components/forms/select'
import NumberLivestream from 'components/numberLivestream'
import TopSearch from 'components/topsearch'
import FavMerchant from 'components/fav-merchant'

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true)
    // const [merchantYear, setMerchantYear] = useState()
    const [mostFav, setMostFav] = useState()
    const [mostFavMerchant, setMostFavMerchant] = useState()
    const [mostShared, setMostShared] = useState()
    const [mostView, setMostView] = useState()
    const [totalCompleted, setTotalCompleted] = useState()
    const [totalLive, setTotalLive] = useState()
    const [totalMerchant, setTotalMerchant] = useState()
    const [totalUpcoming, setTotalUpcoming] = useState()
    const [totalUser, setTotalUser] = useState()
    // const [userYear, setUserYear] = useState()
    const [searchKeyword, setSearchKeyword] = useState()
    const [searchCategory, setSearchCategory] = useState()

    const [labels, setLabel] = useState()
    const [dataLine, setDataLine] = useState()
    const [labelMerchant, setLabelMerchant] = useState()
    const [dataBar, setDataBar] = useState()
    const [toggleView, setToggleView] = useState(true)
    const [toggleFav, setToggleFav] = useState(false)
    const [toggleShared, setToggleShared] = useState(false)
    const [toggleKeyword, setToggleKeyword] = useState(true)

    const setToggleDropdown = (e) => {
        if (e.currentTarget.value === "view") {
            setToggleView(true)
            setToggleFav(false)
            setToggleShared(false)
        }
        if (e.currentTarget.value === "fav") {
            setToggleFav(true)
            setToggleView(false)
            setToggleShared(false)
        }
        if (e.currentTarget.value === "share") {
            setToggleShared(true)
            setToggleFav(false)
            setToggleView(false)
        }
    }

    const setToggleSearch = () => {
        let tk = toggleKeyword ? false : true;
        setToggleKeyword(tk)
    }

    useEffect(() => {
        setLoading(true)
        live.getDashboard().then((res) => {
            // setMerchantYear(res.merchant_year)
            setMostFav(res.mostfav)
            setMostFavMerchant(res.mostfavmerchant.map((item) => {
                return {
                    nama: item.name,
                    avatar: item.img_thumbnail,
                    totalSubs: item.total
                }
            }))
            setSearchCategory(res.search_category.map((item) => {
                return { title: item.name, total: item.cnt }
            }))
            setSearchKeyword(res.search_keyword.map((item) => {
                return { title: item.text, total: item.cnt }
            }))
            setMostShared(res.mostshared)
            setMostView(res.mostview)
            setTotalCompleted(res.total_completed)
            setTotalLive(res.total_live)
            setTotalMerchant(res.total_merchant)
            setTotalUpcoming(res.total_upcoming)
            setTotalUser(res.total_user)
            // setUserYear(res.user_year)
            setLabel(res.user_year.map((item) => { return item.year }))
            setDataLine(res.user_year.map((item) => { return item.total }))
            setLabelMerchant(res.merchant_year.map((item) => { return item.year }))
            setDataBar(res.merchant_year.map((item) => { return item.total }))
            setLoading(false);
        });
    }, [])
    return (
        <Spinner isLoading={isLoading} className="min-h-screen">
            <section className="min-h-screen flex flex-col xl:flex-row">
                <Sidebar />
                <section className="w-full md:w-full xl:w-2/5 xxl:w-2/4 pb-10 lg:border-r-2 lg:border-gray-500">
                    <Lines label={labels} data={dataLine} total_user={totalUser} />
                    <Bars label={labelMerchant} data={dataBar} total_merchant={totalMerchant} />
                </section>
                <section className="w-full md:w-full xl:w-2/5 xxl:w-2/4 py-10 lg:border-r-2 lg:border-gray-500">
                    <SelectForm change={setToggleDropdown} name="most-view">
                        <option value="view" className="text-black">Most Viewed Livestream</option>
                        <option value="fav" className="text-black">Most Favourite</option>
                        <option value="share" className="text-black">Most Shared</option>
                    </SelectForm>
                    {
                        toggleView ? mostView && <div>
                            {
                                mostView.map((item, index) => {
                                    return (<MostviewsVideos key={index} no={index + 1} thumbnail={item.img_thumbnail} views={item.views} likes={item.likes} title={item.title} iframe={item.iframe} categories={item.categories} />)
                                })
                            }
                        </div> : null
                    }
                    {
                        toggleFav ? mostFav && <div>
                            {
                                mostFav.map((item, index) => {
                                    return (<MostviewsVideos key={index} no={index + 1} thumbnail={item.img_thumbnail} views={item.views} likes={item.likes} title={item.title} iframe={item.iframe} categories={item.categories} />)
                                })
                            }
                        </div> : null
                    }
                    {
                        toggleShared ? mostShared && <div>
                            {
                                mostShared.map((item, index) => {
                                    return (<MostviewsVideos key={index} no={index + 1} thumbnail={item.img_thumbnail} views={item.views} likes={item.likes} title={item.title} iframe={item.iframe} categories={item.categories} />)
                                })
                            }
                        </div> : null
                    }
                </section>
                <section className="w-full md:w-full xl:w-1/4 xxl:w-4/12 py-10 px-4 lg:px-0">
                    <NumberLivestream live={totalLive} previous={totalCompleted} upcoming={totalUpcoming} />
                    <div className="flex-col py-4 lg:border-b-2 lg:border-gray-500">
                        <SelectForm change={setToggleSearch} name="total-search">
                            <option value="keyword" className="text-black">Top Search Keywords</option>
                            <option value="category" className="text-black">Top Search Categories</option>
                        </SelectForm>
                        {
                            toggleKeyword ?
                                <TopSearch data={searchCategory} /> :
                                <TopSearch data={searchKeyword} />
                        }
                    </div>
                    <div className="flex-col px-2 py-4 xxl:px-8 lg:border-b-2 lg:border-gray-500">
                        <h5 className="text-red-600">Most Favourite Merchant</h5>
                        <FavMerchant merchants={mostFavMerchant} />
                    </div>
                </section>
            </section>
        </Spinner>
    )
}

export default Dashboard;
