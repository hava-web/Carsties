import { Button, ButtonGroup } from 'flowbite-react';
import React from 'react';
import { useParamStore } from '../../hooks/useParamStore';
import { AiOutlineClockCircle, AiOutlineSortAscending } from 'react-icons/ai';
import { BsFillStopCircleFill, BsStopwatch } from 'react-icons/bs';
import { GiFinishLine, GiFlamer } from 'react-icons/gi';

const pageSizeButtons = [4, 8, 12];
const orderButtons = [
    {
        label: "Alphabetical",
        icon: AiOutlineSortAscending,
        value: "make",
    },
    {
        label: "End Date",
        icon: AiOutlineClockCircle,
        value: "endingSoon",
    },
    {
        label: "Recently added",
        icon: BsFillStopCircleFill,
        value: "new",
    }
];

const filterButtons = [
    {
        label: "Live Auctions",
        icon: GiFlamer,
        value: "live",
    },
    {
        label: "Ending < 6 hours",
        icon: GiFinishLine,
        value: "endingSoon",
    },
    {
        label: "Completed",
        icon: BsStopwatch,
        value: "finished",
    }
];

const Filters = () => {
    const pageSize = useParamStore(state => state.pageSize);
    const setParams = useParamStore(state => state.setParams);
    const orderBy = useParamStore(state => state.orderBy);
    const filterBy = useParamStore(state => state.filterBy);

    return (
        <div className='flex justify-between items-center mb-4'>
            <div>
                <span className='uppercase text-sm text-gray-500 mr-2'>fliter by</span>
                <ButtonGroup key={1}>
                    {filterButtons.map(({ label, icon: Icon, value }) => (
                        <Button
                            key={value}
                            onClick={() => setParams({
                                filterBy: value
                            })}
                            color={`${filterBy === value ? 'red' : 'gray'}`}
                            className='forcus:ring-0'
                        >
                            <Icon className='mr-3 w-5 h-5' />
                            {label}
                        </Button>
                    ))}
                </ButtonGroup>
            </div>
            <div>
                <span className='uppercase text-sm text-gray-500 mr-2'>Order by</span>
                <ButtonGroup key={2}>
                    {orderButtons.map(({ label, icon: Icon, value }) => (
                        <Button
                            key={value}
                            onClick={() => setParams({
                                orderBy: value
                            })}
                            color={`${orderBy === value ? 'red' : 'gray'}`}
                            className='forcus:ring-0'
                        >
                            <Icon className='mr-3 w-5 h-5' />
                            {label}
                        </Button>
                    ))}
                </ButtonGroup>
            </div>
            <div>
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