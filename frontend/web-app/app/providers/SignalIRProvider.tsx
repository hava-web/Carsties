'use client';
import { useAuctionStore } from '@/hooks/useAuctionStore';
import { useBidStore } from '@/hooks/useBidStore';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { useParams } from 'next/navigation';
import { ReactNode, useCallback, useEffect } from 'react';
import { Auction, AuctionFinished, Bid } from '../types';
import { User } from 'next-auth';
import toast from 'react-hot-toast';
import AuctionCreatedToast from '../components/AuctionCreatedToast';
import { getDetailViewData } from '../actions/auctionAction';
import AuctionFinishedToast from '../components/AuctionFinishedToast';

type SignalIRProviderProps = {
  children: ReactNode;
  user: User | null;
  notifyUrl: string;
};

const SignalIRProvider = ({ children, user, notifyUrl }: SignalIRProviderProps) => {
  // const connection = useRef<HubConnection | null>(null);
  const setCurrentPrice = useAuctionStore((state) => state.setCurrentPrice);
  const addBid = useBidStore((state) => state.addBid);
  const params = useParams<{ id: string }>();

  const handleAuctionCreated = useCallback(
    (auction: Auction) => {
      if (user?.username !== auction.seller) {
        return toast(<AuctionCreatedToast auction={auction} />, {
          duration: 10000,
        });
      }
    },
    [user?.username],
  );

  const handleAuctionFinished = useCallback((finishedAuction: AuctionFinished) => {
    const auction = getDetailViewData(finishedAuction.auctionId);
    return (
      toast.promise(auction, {
        loading: 'Loading',
        success: (auction: Auction) => <AuctionFinishedToast auction={auction} finishedAuction={finishedAuction} />,
        error: () => 'Auction finished',
      }),
      { success: { duration: 10000, icon: null } }
    );
  }, []);

  const handleBidPlace = useCallback(
    (bid: Bid) => {
      if (bid.bidStatus.includes('Accepted')) {
        setCurrentPrice(bid.auctionId, bid.amount);
      }

      if (params.id === bid.auctionId) {
        addBid(bid);
      }
    },
    [setCurrentPrice, addBid, params.id],
  );

  // useEffect(() => {
  //   if (!connection.current) {
  //     connection.current = new HubConnectionBuilder()
  //       .withUrl('http://localhost:6001/notifications')
  //       .withAutomaticReconnect()
  //       .build();
  //     connection.current
  //       .start()
  //       .then(() => 'Connected to notification hub')
  //       .catch((err) => console.log(err));
  //     connection.current.on('BidPlaced', handleBidPlace);
  //     connection.current.on('AuctionCreated', handleAuctionCreated);
  //     connection.current.on('AuctionFinished', handleAuctionFinished);

  //     return () => {
  //       connection.current?.off('BidPlaced', handleBidPlace);
  //       connection.current?.off('AuctionCreated', handleAuctionCreated);
  //       connection.current?.off('AuctionFinished', handleAuctionFinished);
  //     };
  //   }
  // }, [handleBidPlace, handleAuctionCreated, handleAuctionFinished, notifyUrl]);

  useEffect(() => {
    let hubConnection: HubConnection | null = null; // Store connection in a local variable

    const startConnection = async () => {
      try {
        hubConnection = new HubConnectionBuilder()
          .withUrl(notifyUrl)
          .withAutomaticReconnect()
          .build();

        await hubConnection.start();
        console.log('Connected to notification hub');

        hubConnection.on('BidPlaced', handleBidPlace);
        hubConnection.on('AuctionCreated', handleAuctionCreated);
        hubConnection.on('AuctionFinished', handleAuctionFinished);

      } catch (err) {
        console.error("Error connecting to hub:", err); // More informative error message
        // Consider retrying connection after a delay:
        setTimeout(startConnection, 5000); // Retry after 5 seconds
      }
    };

    startConnection(); // Call the async function

    return () => {
      if (hubConnection) { // Check if connection exists before trying to disconnect
        hubConnection.off('BidPlaced', handleBidPlace);
        hubConnection.off('AuctionCreated', handleAuctionCreated);
        hubConnection.off('AuctionFinished', handleAuctionFinished);
        hubConnection.stop().catch(console.error); // Stop connection on unmount
      }
    };
  }, [handleBidPlace, handleAuctionCreated, handleAuctionFinished, notifyUrl]);

  return children;
};

export default SignalIRProvider;
