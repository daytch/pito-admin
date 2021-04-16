import React from 'react'

const NumberLivestream = ({ upcoming, live, previous }) => {
    return (
        <div className="flex-col px-2 pb-4 border-b-2 border-gray-500">
            <h5 className="text-red-600">Total Number of Livestreams</h5>
            <div className="flex justify-between mt-4">
                <h4 className="text-lg font-semibold text-gray-700">UPCOMING</h4>
                <h4 className="text-red-700 font-semibold text-lg">{upcoming} <span className="text-gray-400 text-xs">LIVESTREAMS</span></h4>
            </div>
            <div className="flex justify-between mt-4">
                <h4 className="text-lg font-semibold text-gray-700">LIVE NOW</h4>
                <h4 className="text-red-700 font-semibold text-lg">{live} <span className="text-gray-400 text-xs">LIVESTREAMS</span></h4>
            </div>
            <div className="flex justify-between mt-4">
                <h4 className="text-lg font-semibold text-gray-700">COMPLETED</h4>
                <h4 className="text-red-700 font-semibold text-lg">{previous} <span className="text-gray-400 text-xs">LIVESTREAMS</span></h4>
            </div>
        </div>
    )
}

export default NumberLivestream;