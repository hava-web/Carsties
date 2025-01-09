'use client'
import React from 'react';
import { AiOutlineCar } from 'react-icons/ai';
import { useParamStore } from '../hooks/useParamStore';
const Logo = () => {
    const reset = useParamStore(state => state.reset);
    return (
        <div onClick={reset} className='cursor-pointer flex items-center gap-2 text-3xl font-semibold text-red-500'>
            <AiOutlineCar size={34} />
            Carsties Auction
        </div>
    )
}

export default Logo