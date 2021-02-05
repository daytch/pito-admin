import React from 'react'
import Avatar from 'react-avatar';

const index = ({ ListMerchant }) => {
  
    
    return (
        <>
            {
                ListMerchant && ListMerchant.map((item, index) => {
                    return (
                        <div key={index} className="favmerchant-at-user flex w-full mt-4">
                            {
                                item.img_avatar ? (<img src={item.img_avatar} style={{ width: '100px', height: '100px' }} draggable={false} className="merchant-fav rounded-full xl:w-1/3 border-4 mb-4 xl:mb-0 xl:mr-4 border-red-600" alt={item.name} />) :
                                    (<Avatar name={item.name} className="merchant-fav" round={true} />)
                            }
                            <div className="px-4">
                                <h5 className="font-semibold text-base text-gray-700">{item.name}</h5>
                                <div className="flex flex-wrap mt-2 items-center">
                                    <p className="text-xs md:text-sm text-gray-900 font-light">{item.total_subs} Likes</p> <div className="rounded-full w-1 h-1 bg-gray-700 mx-2"></div>
                                    <p className="text-xs md:text-sm text-gray-900 font-light">{item.total_livestream} Livestreams</p>
                                </div>

                                {
                                    item.category && <div className="flex flex-wrap text-sm font-medium text-gray-700 items-center mt-2">
                                        {
                                            item.category.map((item, index) => {
                                                return (<span key={index}><div className="rounded-full inline-block w-2 h-2 bg-gray-700 mx-2"></div><h6 className="text-xs inline-block">{item.name}</h6></span>)
                                            })
                                        }
                                    </div>
                                }
                            </div>
                        </div>
                    )
                })}
        </>
    )
}

export default index;