'use client';
import React, { useEffect, useState } from 'react';
import AuctionCard from './AuctionCard';
import { Auction, PageResult } from '../types';
import AppPagination from '../components/AppPagination';
import { getData } from '../actions/auctionAction';
import Filters from './Filters';
import { useParamStore } from '../hooks/useParamStore';
import { useShallow } from 'zustand/shallow';
import qs from 'query-string';

export type FilterCommon = {
  pageCount: number;
  pageNumber: number;
  pageSize: number;
  searchTerm: string;
};

const Listings = () => {
  const [data, setData] = useState<PageResult<Auction>>();
  const params = useParamStore(useShallow(state => ({
    pageCount: state.pageCount,
    pageNumber: state.pageNumber,
    pageSize: state.pageSize,
    searchTerm: state.searchTerm,
  })));
  const setParams = useParamStore(state => state.setParams);
  const url = qs.stringify({ url: '', qery: params });

  useEffect(() => {
    getData(url)
      .then((data: PageResult<Auction>) => {
        setAuctions(data.results);
        setFilter({
          ...filter,
          pageCount: data.pageCount,
        });
      })
      .catch((error) => {
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
      <div className='flex justify-center mt-4'>
        <AppPagination pageChanged={setFilter} filter={filter} />
      </div>
    </>
  );
};

export default Listings;
