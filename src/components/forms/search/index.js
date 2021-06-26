import React from 'react'
import { ReactComponent as IconSearch } from 'assets/images/icon-search.svg'
let keywords = '';
const onSearch = (e) => {
    keywords = e;
}
// const index = ({ name, pages, param, getData }) => {
//     return (
//         <>
//             <div className="w-full md:w-2/5 flex">
//                 <input type="text" name={name}
//                     onChange={(e) => { getData(pages, param, e.target.value); onSearch(e.target.value) }}
//                     placeholder="Search..."
//                     className="border border-gray-300 text-lg px-2 w-full py-1 focus:outline-none" />
//                 <button className="px-1 py-1 bg-red-700 focus:outline-none hover:bg-red-600" onClick={(e) => getData(pages, param, keywords)}><IconSearch /></button>
//             </div>
//         </>
//     )
// }

const index = ({ name, pages, param, getDataKeyword }) => {
    return (
        <div className="w-full md:w-2/5 flex">
            <input type="text" name={name}
                onChange={(e) => { getDataKeyword(1, e.target.value); onSearch(e.target.value)}}
                placeholder="Search..."
                className="border border-gray-300 text-lg px-2 w-full py-1 focus:outline-none" />
            <button className="px-1 py-1 bg-red-700 focus:outline-none hover:bg-red-600" onClick={(e) => getDataKeyword(1, keywords)}><IconSearch /></button>
        </div>
    )
}


export default index;