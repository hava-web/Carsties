'use client';
import { useAuctionStore } from '@/hooks/useAuctionStore';
import { useBidStore } from '@/hooks/useBidStore';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { useParams } from 'next/navigation';
import { ReactNode, useCallback, useEffect, useRef } from 'react';
import { Auction, AuctionFinished, Bid } from '../types';
import { User } from 'next-auth';
import toast from 'react-hot-toast';
import AuctionCreatedToast from '../components/AuctionCreatedToast';
import { getDetailViewData } from '../actions/auctionAction';
import AuctionFinishedToast from '../components/AuctionFinishedToast';

type SignalIRProviderProps = {
  children: ReactNode;
  user: User | null;
};

const SignalIRProvider = ({ children, user }: SignalIRProviderProps) => {
  const connection = useRef<HubConnection | null>(null);
  const setCurrentPrice = useAuctionStore((state) => state.setCurrentPrice);
  const addBid = useBidStore((state) => state.addBid);
  const params = useParams<{ id: string }>();

  const handleAuctionCreated = useCallback((auction: Auction) => {
    if (user?.username !== auction.seller) {
      return toast(<AuctionCreatedToast auction={auction} />, {
        duration: 10000
      })
    }
  }, [user?.username])

  const handleAuctionFinished = useCallback((finishedAuction: AuctionFinished) => {
    const auction = getDetailViewData(finishedAuction.auctionId);
    return toast.promise(auction, {
      loading: 'Loading',
      success: (auction: Auction) => <AuctionFinishedToast auction={auction} finishedAuction={finishedAuction} />
    })
  }, [])

  const handleBidPlace = useCallback((bid: Bid) => {
    console.log(bid);

    if (bid.bidStatus.includes('Accepted')) {
      setCurrentPrice(bid.auctionId, bid.amount);
    }

    if (params.id === bid.auctionId) {
      addBid(bid);
    }
  }, [setCurrentPrice, addBid, params.id])

  useEffect(() => {
    if (!connection.current) {
      connection.current = new HubConnectionBuilder()
        .withUrl('http://localhost:6001/notifications')
        .withAutomaticReconnect()
        .build();
      connection.current
        .start()
        .then(() => 'Connected to notification hub')
        .catch((err) => console.log(err));
      connection.current.on('BidPlaced', handleBidPlace);
      connection.current.on('AuctionCreated', handleAuctionCreated)

      return () => {
        connection.current?.off('BidPlaced', handleBidPlace);
        connection.current?.off('AuctionCreated', handleAuctionCreated);
      }
    }
  }, [handleBidPlace, handleAuctionCreated]);

  return children;
};

export default SignalIRProvider;
