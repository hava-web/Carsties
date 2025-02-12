'use client'
import { placeBidForAuction } from '@/app/actions/auctionAction';
import { useBidStore } from '@/hooks/useBidStore';
import React from 'react';
import { FieldValues, useForm } from 'react-hook-form';

type BidFormProps = {
    auctionId: string;
    highBid: number;
}

const BidForm = ({ auctionId, highBid }: BidFormProps) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const addBid = useBidStore((state) => state.addBid);
    const onSubmit = (data: FieldValues) => {
        placeBidForAuction(auctionId, +data.amount)
            .then((bid) => {
                addBid(bid);
                reset();
            })
            .catch(() => { })
            .finally(() => { });

    };

    return (
        <>
            <form onSubmit={onSubmit} className='flex items-center border-2 rounded-lg py-2'>

            </form>
        </>
    )
}

export default BidForm