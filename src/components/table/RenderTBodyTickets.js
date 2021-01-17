import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

const RenderTBodyTickets = ({ itemBodyTickets }) => {
    return (
        <>
            {
                itemBodyTickets && itemBodyTickets.map((item, index) => {
                    let title = item.title
                    return (
                        <tr key={index} className="border-b border-gray-50">
                                <td className="text-center py-3 px-4 text-red-600 font-bold text-sm">
                                <Link className="w-full" to={{
                                    pathname: `/ticket/${item.ticketNumber}`,
                                    query: { title }
                                }}>{item.ticketNumber}</Link>
                            </td>
                            <td className="text-center py-3 px-4 text-red-600 font-bold text-sm">{item.username}</td>
                            <td className="text-center py-3 px-4 text-gray-400 font-light">{item.title}</td>
                            <td className="text-center py-3 px-4 text-gray-400 font-light">{item.status}</td>
                            <td className="text-center py-3 px-4 text-gray-400 font-light">{ moment(item.b).format('DD/MM/YYYY')}</td>
                        </tr>
                    )
                })
            }
        </>
    )
}

export default RenderTBodyTickets;