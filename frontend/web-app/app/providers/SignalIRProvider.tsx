'use client';
import { useAuctionStore } from '@/hooks/useAuctionStore';
import { useBidStore } from '@/hooks/useBidStore';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { useParams } from 'next/navigation';
import { ReactNode, useEffect, useRef } from 'react';
import { Bid } from '../types';

type SignalIRProviderProps = {
  children: ReactNode;
};

const SignalIRProvider = ({ children }: SignalIRProviderProps) => {
  const connection = useRef<HubConnection | null>(null);
  const setCurrentPrice = useAuctionStore((state) => state.setCurrentPrice);
  const addBid = useBidStore((state) => state.addBid);
  const params = useParams<{ id: string }>();

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
      connection.current.on('BidPlaced', (bid: Bid) => {
        setCurrentPrice(bid.auctionId, bid.amount);
      });
    }
  }, [setCurrentPrice]);

  return children;
};

export default SignalIRProvider;
