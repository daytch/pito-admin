import React from 'react'

import { ReactComponent as AvatarDummy } from 'assets/images/avatar-dummy.svg'
import { ReactComponent as SubscriberIcon } from 'assets/images/subscriber-icon.svg'

const index = ({ merchants }) => {
    console.log(merchants)
    return (
        <div className="flex flex-wrap items-center">
            {
                merchants && merchants.map((item, index) => {
                    const increment = index + 1
                    return (
                        <div key={index} className="px-1 xl:w-full xxl:w-auto md:px-4 xl:px-0">
                            <div className="mt-3 flex items-center w-1/2 xxl:mx-0">
                                <h6>{increment}.</h6>
                                <div className="px-2">
                                    <img src={item.avatar} onError={(e) => { e.target.onerror = null; e.target.src = "https://alppetro.co.id/dist/assets/images/default.jpg" }} />
                                    {/* {item.avatar} */}
                                </div>
                                <div className="flex-col">
                                    <h6 className="font-semibold text-base text-red-600">{item.totalSubs}</h6>
                                    <h6 className="text-gray-900 text-xs font-medium flex items-center"><SubscriberIcon className="mr-1" /> Subscriber</h6>
                                </div>
                            </div>
                            <div className="text-gray-400 text-sm font-semibold px-5 py-2 xl:text-center">
                                <h5>{item.nama}</h5>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default index;