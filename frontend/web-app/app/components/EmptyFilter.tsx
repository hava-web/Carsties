import React from 'react'
import { useParamStore } from '../hooks/useParamStore';
import Heading from './Heading';
import { Button } from 'flowbite-react';

type EmptyFilterProps = {
    title?: string;
    subTitle?: string;
    showReset?: boolean;
}

const EmptyFilter = ({
    title = 'No matches for this filter',
    subTitle = 'Try changing or reseting the filter',
    showReset }: EmptyFilterProps) => {

    const reset = useParamStore(state => state.reset);
    return (
        <div className='h-[40vh] flex flex-col gap-2 justify-center items-center shadow-lg'>
            <Heading title={title} subTitle={subTitle} center />
            <div className="mt-4">
                {showReset && (
                    <Button onClick={reset}>Remove Filters</Button>
                )}
            </div>
        </div>
    )
}

export default EmptyFilter