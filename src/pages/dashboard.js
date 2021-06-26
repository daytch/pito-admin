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
import Pagination from 'components/pagination'

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true)
    const [mostFav, setMostFav] = useState()
    const [mostFavMerchant, setMostFavMerchant] = useState()
    const [mostShared, setMostShared] = useState()
    const [mostView, setMostView] = useState()
    const [totalCompleted, setTotalCompleted] = useState()
    const [totalLive, setTotalLive] = useState()
    const [totalMerchant, setTotalMerchant] = useState()
    const [totalUpcoming, setTotalUpcoming] = useState()
    const [totalUser, setTotalUser] = useState()
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

    const [totalMostView, setTotalMostView] = useState(0)
    const [totalMostFav, setTotalMostFav] = useState(0)
    const [totalMostShared, setTotalMostShared] = useState(0)
    const [totalMostFavMerchant, setTotalMostFavMerchant] = useState(0)

    const setToggleDropdown = (e) => {
        if (e.currentTarget.value === "view") {
            getData(1, "mostview")
            setToggleView(true)
            setToggleFav(false)
            setToggleShared(false)
        }
        if (e.currentTarget.value === "fav") {
            getData(1, "mostfav")
            setToggleFav(true)
            setToggleView(false)
            setToggleShared(false)
        }
        if (e.currentTarget.value === "share") {
            getData(1, "mostshared")
            setToggleShared(true)
            setToggleFav(false)
            setToggleView(false)
        }
    }
    // mostview mostfav mostshared mostfavmerchant
    function getData(page, tipe) {
        setLoading(true)
        live.getDashboardPaging(tipe, page)
            .then((res) => {
                if (tipe == "mostview") {
                    setMostView(res)
                } else if (tipe == "mostfav") {
                    setMostFav(res)
                } else if (tipe == "mostshared") {
                    setMostShared(res)
                } else {
                    setMostFavMerchant(res.map((item) => {
                        return {
                            nama: item.name,
                            avatar: item.img_avatar,
                            totalSubs: item.total
                        }
                    }))
                }
                setLoading(false)
            });
    }

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

            setTotalMostView(res.count_mostview);
            setTotalMostFav(res.count_mostfav);
            setTotalMostShared(res.count_mostshared);
            setTotalMostFavMerchant(res.count_mostfavmerchant);
            setLoading(false);
        });
    }, [])
    return (
        <Spinner isLoading={isLoading} className="min-h-screen">
            <section className="flex flex-col xl:flex-row min-h-screen">
                <Sidebar />
                <div className="lg:w-full lg:flex lg:py-5 md:py-10 md:px-5 md:grid-cols-1 lg:grid-cols-5 md:gap-0 lg:gap-4 ">
                    <section className="w-full md:w-6/12 lg:border-r-2 lg:border-gray-500 lg:col-span-2">
                        <Lines label={labels} data={dataLine} total_user={totalUser} />
                        <Bars label={labelMerchant} data={dataBar} total_merchant={totalMerchant} />
                    </section>
                    <section className="w-full md:w-6/12 lg:border-r-2 lg:border-gray-500 lg:col-span-2">
                        <SelectForm change={setToggleDropdown} name="most-view">
                            <option value="view" className="text-black">Most Viewed Livestream</option>
                            <option value="fav" className="text-black">Most Favourite</option>
                            <option value="share" className="text-black">Most Shared</option>
                        </SelectForm>
                        {
                            toggleView ? mostView && <div className="mostview-dashboard overflow-auto">
                                {
                                    mostView.map((item, index) => {
                                        return (<MostviewsVideos key={index} id={item.id} thumbnail={item.img_thumbnail} views={item.views} redirect_fb={item.redirect_fb} redirect_ig={item.redirect_ig} merchant={item.merchant?.name}
                                            likes={item.likes} title={item.title} iframe={item.iframe} start_time={item.start_time} share={item.share} redirect_tiktok={item.redirect_tiktok} share_url={item.share_url} />)
                                    })
                                }
                                {/* mostfavmerchant */}
                                <div className="overflow-x-auto w-full mt-3 mb-2">
                                    <Pagination pages={totalMostView} getData={getData} tipe={'mostview'} />
                                </div>
                            </div> : null
                        }
                        {
                            toggleFav ? mostFav && <div className="mostview-dashboard overflow-auto">
                                {
                                    mostFav.map((item, index) => {
                                        return (<MostviewsVideos key={index} id={item.id} thumbnail={item.img_thumbnail} views={item.views} redirect_fb={item.redirect_fb} redirect_ig={item.redirect_ig} merchant={item.merchant?.name}
                                            likes={item.likes} title={item.title} iframe={item.iframe} start_time={item.start_time} share={item.share} redirect_tiktok={item.redirect_tiktok} share_url={item.share_url} />)
                                    })
                                }
                                <div className="overflow-x-auto w-full mt-3 mb-2">
                                    <Pagination pages={totalMostFav} getData={getData} tipe={'mostfav'} />
                                </div>
                            </div> : null
                        }
                        {
                            toggleShared ? mostShared && <div className="mostview-dashboard overflow-auto">
                                {
                                    mostShared.map((item, index) => {
                                        return (<MostviewsVideos key={index} id={item.id} thumbnail={item.img_thumbnail} views={item.views} redirect_fb={item.redirect_fb} redirect_ig={item.redirect_ig} merchant={item.merchant?.name}
                                            likes={item.likes} title={item.title} iframe={item.iframe} start_time={item.start_time} share={item.share} redirect_tiktok={item.redirect_tiktok} share_url={item.share_url} />)
                                    })
                                }
                                <div className="overflow-x-auto w-full mt-3 mb-2">
                                    <Pagination pages={totalMostShared} getData={getData} tipe={'mostshared'} />
                                </div>
                            </div> : null
                        }
                    </section>
                    <section className="w-full md:w-1/5">
                        <NumberLivestream live={totalLive} previous={totalCompleted} upcoming={totalUpcoming} />
                        <div className="flex-col py-4 lg:border-b-2 lg:border-gray-500">
                            <SelectForm change={setToggleSearch} name="total-search">
                                <option value="keyword" className="text-black">Top Search Keywords</option>
                                <option defaultValue="category" className="text-black">Top Search Categories</option>
                            </SelectForm>
                            {
                                toggleKeyword ?
                                    <TopSearch data={searchCategory} /> :
                                    <TopSearch data={searchKeyword} />
                            }
                        </div>
                        <div className="flex-col px-2 py-4 lg:border-b-2 lg:border-gray-500">
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
