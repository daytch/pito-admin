import React from 'react'
import useSortableData from 'components/table/useSortableData'

const TableCategory = ({ itemHead, itemBody, DeleteButton }) => {

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
                                <th key={index} onClick={() => item.value !== 'id' || item.value ? requestSort(item.value) : null} className={"text-center py-3 px-4 font-semibold text-sm " + item.value + " " + getClassNamesFor(item.value)}>{item.title}</th>
                            )
                        })
                    }
                </tr>
            </thead>
            <tbody className="text-gray-700">
                {
                    items ? items.map((item, index) => {
                        return (
                            <tr key={index} className="text-xs md:text-sm border-b border-gray-50">
                                <td className="text-center py-3 px-4 text-red-600 font-bold">{item.no}</td>
                                <td className="text-center py-3 px-4 text-gray-700 font-bold">{item.name}</td>
                                <td className="text-center py-3 px-4 text-gray-700 font-light">{item.totLivestream}</td>
                                <td className="text-center py-3 px-4 text-gray-700 font-light">{item.totMerchants}</td>
                                <td className="text-center py-3 px-4 text-gray-700 font-light">{item.totSearches}</td>
                                <td className="text-center py-3 px-4 text-gray-700 font-light">{item.totViews}</td>
                                <td className="flex-col py-4">
                                    <DeleteButton id={item.no} catName={item.name} />
                                </td>
                            </tr>
                        )
                    }) : null
                }
            </tbody>
        </table >
    )
}

export default TableCategory;