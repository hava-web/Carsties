'use client'
import React from 'react'
import { useParamStore } from '../hooks/useParamStore';
import Heading from './Heading';
import { Button } from 'flowbite-react';
import { signIn } from 'next-auth/react';

type EmptyFilterProps = {
    title?: string;
    subTitle?: string;
    showReset?: boolean;
    showLogin?: boolean;
    callbackUrl?: string;
}

const EmptyFilter = ({
    title = 'No matches for this filter',
    subTitle = 'Try changing or reseting the filter',
    showReset,
    showLogin,
    callbackUrl
}: EmptyFilterProps) => {

    const reset = useParamStore(state => state.reset);
    return (
        <div className='h-[40vh] flex flex-col gap-2 justify-center items-center shadow-lg'>
            <Heading title={title} subTitle={subTitle} center />
            <div className="mt-4">
                {showReset && (
                    <Button onClick={reset}>Remove Filters</Button>
                )}

                {showLogin && (
                    <Button onClick={() => { signIn('id-server', { callbackUrl }) }}>
                        Login
                    </Button>
                )}
            </div>
        </div>
    )
}

export default EmptyFilter