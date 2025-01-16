'use client'
import React from 'react';
import { AiOutlineCar } from 'react-icons/ai';
import { useParamStore } from '../hooks/useParamStore';
import { usePathname, useRouter } from 'next/navigation';
const Logo = () => {
    const router = useRouter();
    const pathname = usePathname();

    const doReset = () => {
        if (pathname !== '/') router.push('/');
        reset();
    }

    const reset = useParamStore(state => state.reset);
    return (
        <div onClick={doReset} className='cursor-pointer flex items-center gap-2 text-3xl font-semibold text-red-500'>
            <AiOutlineCar size={34} />
            Carsties Auction
        </div>
    )
}

export default Logo