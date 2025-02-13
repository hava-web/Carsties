'use client'
import { placeBidForAuction } from '@/app/actions/auctionAction';
import { useBidStore } from '@/hooks/useBidStore';
import React from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { numberWithCommas } from '../../libs/numberWithComma';
import toast from 'react-hot-toast';

type BidFormProps = {
    auctionId: string;
    highBid: number;
}

const BidForm = ({ auctionId, highBid }: BidFormProps) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const addBid = useBidStore((state) => state.addBid);
    const onSubmit = async (
        data: FieldValues,
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();
        await placeBidForAuction(auctionId, +data.amount)
            .then((bid) => {
                if (bid.error) throw bid.error;
                addBid(bid);
                reset();

            })
            .catch((error) => {
                toast.error(error.message)
            })
    };

    return (
        <>
            <form onSubmit={handleSubmit((data, event) => onSubmit(data, event as React.FormEvent<HTMLFormElement>))} className='flex items-center border-2 rounded-lg py-2'>
                <input type="number"
                    {...register('amount')}
                    className='input-custom text-sm text-gray-600'
                    placeholder={`Enter your bid (minimum bid is ${numberWithCommas(highBid + 1)})`}
                />
            </form>
        </>
    )
}

export default BidForm