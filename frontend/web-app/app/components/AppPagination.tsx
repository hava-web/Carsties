'use client'
import { Pagination } from 'flowbite-react'
import React from 'react'
import { FilterCommon } from '../auctions/Listings';

type AppPaginationProps = {
    filter: FilterCommon;
    pageChanged: (filter: FilterCommon) => void;
}

const AppPagination = ({ filter, pageChanged }: AppPaginationProps) => {
    return (
        <Pagination
            currentPage={filter.pageNumber}
            onPageChange={page => pageChanged({
                ...filter,
                pageNumber: page
            })}
            totalPages={filter.pageCount}
            layout='pagination'
            showIcons={true}
            className='text-blue-500 mb-5'
        />
    )
}

export default AppPagination