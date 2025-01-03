'use client'
import React, { useEffect, useState } from 'react';
import AuctionCard from './AuctionCard';
import { Auction, PageResult } from '../types';
import AppPagination from '../components/AppPagination';
import { getData } from '../actions/auctionAction';
import Filters from './Filters';

export type FilterCommon = {
    pageCount: number;
    pageNumber: number;
    pageSize: number;
}

const Listings = () => {
    const [auctions, setAuctions] = useState<Auction[]>([]);
    const [filter, setFilter] = useState<FilterCommon>(
        {
            pageCount: 0,
            pageNumber: 1,
            pageSize: 4
        }
    );

    useEffect(() => {
        getData(filter.pageNumber, filter.pageSize).then((data: PageResult<Auction>) => {
            setAuctions(data.results);
            setFilter({
                ...filter,
                pageCount: data.pageCount
            });
        }).catch((error) => {
            console.error('Error fetching data:', error);
        });
    }, [filter.pageNumber, filter.pageSize]);

    if (auctions.length === 0) return <div>Loading...</div>;

    return (
        <>
            <Filters filter={filter} FilterChanged={setFilter} />
            <div className='grid grid-cols-4 gap-6'>
                {auctions.map((auction) => (
                    <AuctionCard key={auction.id} auction={auction} />
                ))}
            </div>
            <div className="flex justify-center mt-4">
                <AppPagination pageChanged={setFilter} filter={filter} />
            </div>
        </>
    )
}

export default Listings