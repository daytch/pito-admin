import React, { useState } from 'react'
import SideNavbar from 'components/SideNavbar'
import Edit from 'components/forms/edit'
import Spinner from 'components/spinner'

const LivestreamEdit = ({ match, location }) => {
    const [data] = useState(location.query)
    const [isLoading, setLoading] = useState(true)
    
    function openLoading() { setLoading(true) }

    function closeLoading() { setLoading(false) }

    return (
        <Spinner isLoading={isLoading} className="min-h-screen">
            <section className="min-h-screen flex flex-col xl:flex-row">
                <SideNavbar />
                <div className="py-10 md:py-20 px-5 w-full">
                    <h6 className="text-red-600 font-bold text-lg">Edit Livestreams</h6>
                    <div className="mt-4">
                        <Edit id={match.params.id} openLoading={openLoading} closeLoading={closeLoading} data={data} />
                    </div>
                </div>
            </section>
        </Spinner>
    )
}

export default LivestreamEdit;
