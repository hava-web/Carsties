import Heading from '@/app/components/Heading';
import React from 'react';
import AuctionForm from '../../AuctionForm';
import { getDetailViewData } from '@/app/actions/auctionAction';

const Update = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const data = await getDetailViewData(id);
  return (
    <>
      <div className='mx-auto max-w-[75%] shadow-lg p-10 bg-white rounded-lg'>
        <Heading title='Update your auction' subTitle='Please update the details of your car' />
        <AuctionForm auction={data} />
      </div>
    </>
  );
};

export default Update;
