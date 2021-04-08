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
import Moment from 'moment'

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
// mostview mostfav mostshared mostfavmerchant
    const setToggleSearch = () => {
        let tk = toggleKeyword ? false : true;
        setToggleKeyword(tk)
    }
    useEffect(() => {
        setLoading(true)
        live.getDashboard().then((res) => {
            
            setMostFav(res.mostfav)
            setMostFavMerchant(res.mostfavmerchant.map((item) => {
                return {
                    nama: item.name,
                    avatar: item.img_avatar,
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

            setLabel(res.user_year.map((item) => {
                return getMonth(item.month) + "-" + item.year
            }))
            setDataLine(res.user_year.map((item) => { return item.total }))
            setLabelMerchant(res.merchant_year.map((item) => {
                return getMonth(item.month) + "-" + item.year
            }))
            setDataBar(res.merchant_year.map((item) => { return item.total }))
            setLoading(false);
        });
    }, [])
    return (
        <Spinner isLoading={isLoading} className="min-h-screen">
            <section className="flex flex-col xl:flex-row min-h-screen">
                <Sidebar />
                <div className="w-full gap-8 flex py-5 md:py-10 px-5 grid grid-cols-1 lg:grid-cols-5 md:gap-0 lg:gap-4 ">
                    <section className="w-full lg:border-r-2 lg:border-gray-500 lg:col-span-2">
                        <Lines label={labels} data={dataLine} total_user={totalUser} />
                        <Bars label={labelMerchant} data={dataBar} total_merchant={totalMerchant} />
                    </section>
                    <section className="w-full lg:border-r-2 lg:border-gray-500 lg:col-span-2">
                        <SelectForm change={setToggleDropdown} name="most-view">
                            <option value="view" className="text-black">Most Viewed Livestream</option>
                            <option value="fav" className="text-black">Most Favourite</option>
                            <option value="share" className="text-black">Most Shared</option>
                        </SelectForm>
                        {
                            toggleView ? mostView && <div className="mostview-dashboard overflow-auto">
                                {
                                    mostView.map((item, index) => {
                                        return (<MostviewsVideos key={index} id={item.id} no={index + 1} thumbnail={item.img_thumbnail} views={item.views} likes={item.likes} title={item.title} iframe={item.iframe} categories={item.categories} />)
                                    })
                                }
                            </div> : null
                        }
                        {
                            toggleFav ? mostFav && <div className="mostview-dashboard overflow-auto">
                                {
                                    mostFav.map((item, index) => {
                                        return (<MostviewsVideos key={index} id={item.id} no={index + 1} thumbnail={item.img_thumbnail} views={item.views} likes={item.likes} title={item.title} iframe={item.iframe} categories={item.categories} />)
                                    })
                                }
                            </div> : null
                        }
                        {
                            toggleShared ? mostShared && <div className="mostview-dashboard overflow-auto">
                                {
                                    mostShared.map((item, index) => {
                                        return (<MostviewsVideos key={index} id={item.id} no={index + 1} thumbnail={item.img_thumbnail} views={item.views} likes={item.likes} title={item.title} iframe={item.iframe} categories={item.categories} />)
                                    })
                                }
                            </div> : null
                        }
                    </section>
                    <section className="w-full">
                        <NumberLivestream live={totalLive} previous={totalCompleted} upcoming={totalUpcoming} />
                        <div className="flex-col py-4 lg:border-b-2 lg:border-gray-500">
                            <SelectForm change={setToggleSearch} name="total-search">
                                <option value="keyword" className="text-black">Top Search Keywords</option>
                                <option value="category" className="text-black" selected>Top Search Categories</option>
                            </SelectForm>
                            {
                                toggleKeyword ?
                                    <TopSearch data={searchCategory} /> :
                                    <TopSearch data={searchKeyword} />
                            }
                        </div>
                        <div className="flex-col px-2 py-4 xxl:px-4 lg:border-b-2 lg:border-gray-500">
                            <h5 className="text-red-600">Most Favourite Merchant</h5>
                            <FavMerchant merchants={mostFavMerchant} />
                        </div>
                    </section>
                </div>
            </section>
        </Spinner>
    )
}

function getMonth(no) {
    var bln = '';
    switch (no) {
        case 1:
            bln = 'Jan';
            break;
        case 2:
            bln = 'Feb';
            break;
        case 3:
            bln = 'Mar';
            break;
        case 4:
            bln = 'Apr';
            break;
        case 5:
            bln = 'May';
            break;
        case 6:
            bln = 'Jun';
            break;
        case 7:
            bln = 'Jul';
            break;
        case 8:
            bln = 'Aug';
            break;
        case 9:
            bln = 'Sep';
            break;
        case 10:
            bln = 'Oct';
            break;
        case 11:
            bln = 'Nov';
            break;
        default:
            bln = 'Des';
            break;
    }
    return bln;
}
export default Dashboard;
