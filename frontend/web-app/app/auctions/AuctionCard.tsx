import React from 'react'
import CountdownTimer from './CountdownTimer'
import CarImage from './CarImage'
import { Auction } from '../types'

export type AuctionCardProps = {
    auction: Auction
}

const AuctionCard = ({ auction }: AuctionCardProps) => {
    return (
        <a href='#' className='group'>
            <div className="relative w-full bg-gray-200 aspect-[16/10] rounded-lg overflow-hidden">
                <CarImage imageUrl={auction.imageUrl} />
                <div className="absolute bottom-2 left-2">
                    <CountdownTimer auctionEnd={auction.auctionEnd} />
                </div>
            </div>
            <div className="flex justify-between items-center mt-4">
                <h3 className='tetx-gray-700'>{auction.make} {auction.model}</h3>
                <p className='font-semibold text-sm'>{auction.year}</p>
            </div>
        </a>
    )
}

export default AuctionCard