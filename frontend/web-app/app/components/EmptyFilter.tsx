import React from 'react'
import { useParamStore } from '../hooks/useParamStore';

type EmptyFilterProps = {
    title?: string;
    subTitle?: string;
    showReset?: string;
}

const EmptyFilter = ({
    title = 'No matches for this filter',
    subTitle = 'Try changing or reseting the filter',
    showReset }: EmptyFilterProps) => {

    const reset = useParamStore(state => state.reset);
    return (
        <div>EmptyFilter</div>
    )
}

export default EmptyFilter