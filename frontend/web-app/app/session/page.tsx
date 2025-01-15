import React from 'react';
import { auth } from '../auth';
import Heading from '../components/Heading';

const page = async () => {
    const session = await auth();
    return (
        <>
            <Heading title='Session dashboard' subTitle='' />
            <div className="bg-blue-200 border-2 border-blue-500">
                <h3 className='text-lg'>Session data</h3>
                <pre>{JSON.stringify(session, null, 2)}</pre>
            </div>
        </>
    )
}

export default page;