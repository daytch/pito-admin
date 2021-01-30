import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import useSortableData from 'components/table/useSortableData'

const TableUser = ({ itemHead, itemBody }) => {

    const { items, requestSort, sortConfig } = useSortableData(itemBody);
    const getClassNamesFor = (name) => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };
    return (
        <table className="md:text-md text-xs w-full divide-y divide-gray-200 bg-white">
            <thead className="bg-pink-500 text-gray-700 font-semibold text-sm">
                <tr>
                    {
                        itemHead && itemHead.map((item, index) => {
                            return (
                                <th key={index} onClick={() => requestSort(item.value)} className={"text-center py-3 px-4 font-semibold text-sm " + getClassNamesFor(item.value)}>{item.title}</th>
                            )
                        })
                    }
                </tr>
            </thead>
            <tbody className="text-gray-700">
                {
                    items && items.map((item, index) => {
                        return (
                            <tr key={index} className="border-b border-gray-50">
                                <td className="text-center py-3 px-4 text-red-600 font-bold text-sm"><Link className="hover:text-blue-500" to={{
                                    pathname: `/user/${item.id}`,
                                    query: item
                                }}>{item.id}</Link></td>
                                <td className="text-center py-3 px-4 text-red-600 font-bold text-sm"><Link className="hover:text-blue-500" to={{
                                    pathname: `/user/${item.id}`,
                                    query: item
                                }}>{item.name}</Link></td>
                                <td className="text-center py-3 px-4 text-gray-400 font-light"><a className="hover:text-blue-500" href={"mailto:" + item.email}>{item.email}</a></td>
                                <td className="text-center py-3 px-4 text-gray-400 font-light">{item.source}</td>
                                <td className="text-center py-3 px-4 text-gray-400 font-light">{item.last_login ? moment(item.last_login).format('DD/MM/YYYY') : "-"}</td>
                                <td className="text-center py-3 px-4 text-gray-400 font-light">{moment(item.createdAt).format('DD/MM/YYYY')}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default TableUser;