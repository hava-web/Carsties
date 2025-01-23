'use client';
import React, { useEffect, useState } from 'react';
import AuctionCard from './AuctionCard';
import { Auction, PageResult } from '../types';
import AppPagination from '../components/AppPagination';
import { getData } from '../actions/auctionAction';
import Filters from './Filters';
import { useParamStore } from '../../hooks/useParamStore';
import { useShallow } from 'zustand/shallow';
import qs from 'query-string';
import EmptyFilter from '../components/EmptyFilter';

export type FilterCommon = {
  pageCount: number;
  pageNumber: number;
  pageSize: number;
  searchTerm: string;
};

const Listings = () => {
  const [data, setData] = useState<PageResult<Auction>>();
  const params = useParamStore(useShallow(state => ({
    pageNumber: state.pageNumber,
    pageSize: state.pageSize,
    searchTerm: state.searchTerm,
    orderBy: state.orderBy,
    filterBy: state.filterBy,
    seller: state.seller,
    winner: state.winner
  })));
  const setParams = useParamStore(state => state.setParams);
  const url = qs.stringifyUrl({ url: '', query: params });

  const setPageNumber = (pageNumber: number) => {
    setParams({ pageNumber });
  }

  useEffect(() => {
    getData(url)
      .then((data: PageResult<Auction>) => {
        setData(data);
      })
      .catch((error) => {
        throw error('Error fetching data:', error);
      });
  }, [url]);

  if (!data) return <div>Loading...</div>;

  return (
    <>
      <Filters />
      {
        data.totalCount === 0 ? (
          <EmptyFilter showReset />
        ) : (
          <>
            <div className='grid grid-cols-4 gap-6'>
              {data.results.map((auction) => (
                <AuctionCard key={auction.id} auction={auction} />
              ))}
            </div>
            <div className='flex justify-center mt-4'>
              <AppPagination setPageNumber={setPageNumber} currentPage={params.pageNumber} pageCount={data.pageCount} />
            </div>
          </>
        )
      }
    </>
  );
};

export default Listings;
