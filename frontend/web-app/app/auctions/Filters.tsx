import { Button, ButtonGroup } from 'flowbite-react'
import React from 'react'
import { FilterCommon } from './Listings'

const pageSizeButtons = [4, 8, 12]

type FiltersProps = {
    filter: FilterCommon;
    FilterChanged: (filter: FilterCommon) => void;
}

const Filters = ({ filter, FilterChanged }: FiltersProps) => {
    return (
        <div className='flex justify-between items-center mb-4'>
            <div className="">
                <span className='uppercase text-sm text-gray-500 mr-2'>Page size</span>
                <ButtonGroup>
                    {pageSizeButtons.map((value, index) => (
                        <Button
                            key={index}
                            onClick={() => FilterChanged({
                                ...filter,
                                pageSize: value,
                                pageNumber: 1
                            })}
                            color={`${filter.pageSize === value ? 'red' : 'gray'}`}
                            className='forcus:ring-0'
                        >
                            {value}
                        </Button>
                    ))}
                </ButtonGroup>
            </div>
        </div>
    )
}

export default Filters