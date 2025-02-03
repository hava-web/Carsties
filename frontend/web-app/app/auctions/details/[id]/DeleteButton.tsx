'use client'
import { deleteAuction } from '@/app/actions/auctionAction';
import { Button } from 'flowbite-react'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

type DeleteButtonProps = {
    id: string
}

const DeleteButton = ({ id }: DeleteButtonProps) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const doDelete = () => {
        setLoading(true);
        deleteAuction(id).then((res) => {
            if (res.error) throw res.error;
            router.push('/');
        }).catch((error) => {
            toast.error(error.status + ' ' + error.message);
        }).finally(() => {
            setLoading(false);
        });
    }

    return (
        <>
            <Button color={'failure'} outline isProcessing={loading} onClick={doDelete}>
                Delete Auction
            </Button>
        </>
    )
}

export default DeleteButton