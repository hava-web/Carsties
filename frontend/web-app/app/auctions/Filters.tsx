import { Button, ButtonGroup } from 'flowbite-react';
import React from 'react';
import { useParamStore } from '../hooks/useParamStore';

const pageSizeButtons = [4, 8, 12];

const Filters = () => {
    const pageSize = useParamStore(state => state.pageSize);
    const setParams = useParamStore(state => state.setParams);

    return (
        <div className='flex justify-between items-center mb-4'>
            <div className="">
                <span className='uppercase text-sm text-gray-500 mr-2'>Page size</span>
                <ButtonGroup>
                    {pageSizeButtons.map((value, index) => (
                        <Button
                            key={index}
                            onClick={() => setParams({
                                pageSize: value,
                            })}
                            color={`${pageSize === value ? 'red' : 'gray'}`}
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