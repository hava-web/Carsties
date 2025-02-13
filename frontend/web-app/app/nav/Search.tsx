'use client'

import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { useParamStore } from '../../hooks/useParamStore';
import { usePathname, useRouter } from 'next/navigation';

const Search = () => {
    const router = useRouter();
    const pathname = usePathname();
    const setParams = useParamStore(state => state.setParams);
    const setSearchValue = useParamStore(state => state.setSearchValue);
    const searchValue = useParamStore(state => state.searchValue);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    }

    const search = () => {
        if (pathname !== '/') router.push('/')
        setParams({
            searchTerm: searchValue,
        })
    }

    return (
        <div className='flex w-[50%] items-center border-2 rounded-full py-2 shadow-sm'>
            <input
                onKeyDown={(e: React.KeyboardEvent<Element>) => { if (e.key === 'Enter') search() }}
                value={searchValue}
                onChange={onChange}
                type="text"
                placeholder='Search for cars by make, model or color'
                className='input-custom focus:border-transparent text-sm text-gray-600'
            />
            <button onClick={search}>
                <FaSearch
                    size={34}
                    className='bg-red-400 text-white rounded-full p-2 cursor-pointer mx-2'
                />
            </button>
        </div>
    )
}

export default Search