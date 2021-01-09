import React from 'react'
import Avatar from 'react-avatar';


// import { ReactComponent as AvatarDummy } from 'assets/images/avatar-dummy.svg'
import { ReactComponent as SubscriberIcon } from 'assets/images/subscriber-icon.svg'
import DefaultImg from 'assets/images/default.svg'

const index = ({ merchants }) => {
    console.log(merchants)
    return (
        <div className="flex flex-wrap items-center">
            {
                merchants && merchants.map((item, index) => {
                    const increment = index + 1
                    return (
                        <div key={index} className="px-1 w-1/2">
                            <div className="mt-3 flex items-center w-1/2 xxl:mx-0">
                                <h6>{increment}.</h6>
                                <div className="ml-1 w-2/3">
                                    {
                                        item.avatar ?
                                            <img alt={item.nama}
                                                src={item.avatar} onError={(e) => { e.target.onerror = null; e.target.src = DefaultImg }}
                                                style={{
                                                    width: '35px',
                                                    height: '35px'
                                                }}
                                                className="rounded-full border-4 mb-4 xl:mb-0 xl:mr-4 border-red-600" /> :
                                            (<Avatar name={item.nama} size="35px" className="merchant-fav" round={true} />)
                                    }
                                </div>
                                <div className="px-2 w-1/3">
                                    <h6 className="font-semibold text-base text-red-600">{item.totalSubs}</h6>
                                    <h6 className="text-gray-900 text-xs font-medium flex items-center"><SubscriberIcon className="mr-1" /> Subscriber</h6>
                                </div>
                            </div>
                            <div className="text-gray-400 text-xs font-semibold px-5 py-2 md:text-left">
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