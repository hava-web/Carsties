import React from 'react';
import { Auction, AuctionFinished } from '../types';
import Link from 'next/link';
import Image from 'next/image';
import { numberWithCommas } from '../auctions/libs/numberWithComma';

type AuctionFinishedToastProps = {
    auction: Auction;
    finishedAuction: AuctionFinished;
}

const AuctionFinishedToast = ({ auction, finishedAuction }: AuctionFinishedToastProps) => {
    return (
        <>
            <Link href={`/auctions/details/${auction.id}`} className='flex flex-col items-center'>
                <div className="flex flex-row items-center gap-2">
                    <Image
                        src={auction.imageUrl}
                        alt={'Image of car'}
                        height={80}
                        width={80}
                        className='rounded-lg w-auto h-auto'
                    />
                    <div className="flex flex-col">
                        <span>Auction for {auction.make} {auction.model} has finished</span>
                        {finishedAuction.itemSold && finishedAuction.amount ? (
                            <p>Congrats to {finishedAuction.winner} who has won this auction for $${numberWithCommas(finishedAuction.amount)}</p>
                        ) : (
                            <p>This auction did not sell </p>
                        )}

                    </div>
                </div>
            </Link>
        </>
    )
}

export default AuctionFinishedToast;