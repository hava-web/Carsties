'use client'
import React, { useState } from 'react'
import { updateAuctionTest } from '../actions/auctionAction';
import { Button } from 'flowbite-react';

const AuthTest = () => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<string | object | undefined>();

    const doUpdate = () => {
        setResult(undefined);
        setLoading(true);
        updateAuctionTest()
            .then(res => setResult(res))
            .catch((error) => {
                setResult(error)
            })
            .finally(() => setLoading(false))
    }

    return (
        <>
            <div className="flex items-center gap-4">
                <Button outline isProcessing={loading} onClick={doUpdate}>
                    Test auth
                </Button>
                <div className="">
                    {JSON.stringify(result, null, 2)}
                </div>
            </div>
        </>
    )
}

export default AuthTest