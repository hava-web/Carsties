'use client'

import React from 'react';
import { AiOutlineCar } from 'react-icons/ai';
import Search from './Search';

const Navbar = () => {
    return (
        <>
            <header className='stricky top-0 z-50 flex justify-between bg-white p-5 items-center text-gray-800 shadow-md'>
                <div >
                    <AiOutlineCar size={34} />
                    <div className='flex items-center gap-2 text-3xl font-semibold text-red-500'>
                        Carsties Auction
                    </div>
                </div>
                <Search />
                <div className="">Login</div>
            </header>
        </>
    )
}

export default Navbar