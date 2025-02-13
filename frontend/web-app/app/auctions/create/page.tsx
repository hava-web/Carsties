import Heading from '@/app/components/Heading'
import React from 'react'
import AuctionForm from '../AuctionForm'

const Create = () => {
    return (
        <div className='mx-auto max-w-[75%] shadow-lg p-10 bg-white rounded-lg'>
            <Heading title='Sell your car!' subTitle='Please enter the details of your car' />
            <AuctionForm />
        </div>
    )
}

export default Create