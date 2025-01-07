'use client'
import { Pagination } from 'flowbite-react'
import React from 'react'

type AppPaginationProps = {
    currentPage: number;
    pageCount: number;
    setPageNumber: (page: number) => void;
}

const AppPagination = ({ currentPage, pageCount, setPageNumber }: AppPaginationProps) => {
    return (
        <Pagination
            currentPage={currentPage}
            onPageChange={page => setPageNumber(page)}
            totalPages={pageCount}
            layout='pagination'
            showIcons={true}
            className='text-blue-500 mb-5'
        />
    )
}

export default AppPagination