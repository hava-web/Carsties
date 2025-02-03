'use client';
import { Button } from 'flowbite-react';
import React, { useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import Input from '../components/Input';
import DateInput from '../components/DateInput';
import { DATETIME_FULL } from '../constants/datetime';
import { createAuction, updateAuction } from '../actions/auctionAction';
import { usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Auction } from '../types';

type AuctionFormProps = {
  auction?: Auction;
};

const AuctionForm = ({ auction }: AuctionFormProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const {
    handleSubmit,
    control,
    setFocus,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: 'onTouched',
  });

  const onSubmit = async (data: FieldValues) => {
    try {
      let id = '';
      let res;
      if (pathname === '/auctions/create') {
        res = await createAuction(data);
        id = res.id;
      } else {
        if (auction) {
          res = await updateAuction(data, auction.id);
          id = auction.id;
        }
      }

      if (res.error) {
        throw res.error;
      }
      router.push(`/auctions/details/${id}`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.status + ' ' + error.message);
    }
  };

  useEffect(() => {
    if (auction) {
      const { make, model, color, mileage, year } = auction;
      reset({ make, model, color, mileage, year });
    }
    setFocus('make');
  }, [setFocus]);

  return (
    <>
      <form className='flex flex-col mt-3' onSubmit={handleSubmit(onSubmit)}>
        <Input label='Make' name='make' control={control} rules={{ required: 'Make is required' }} />
        <Input label='Model' name='model' control={control} rules={{ required: 'Modal is required' }} />
        <Input label='Color' name='color' control={control} rules={{ required: 'Color is required' }} />
        <div className='grid grid-cols-2 gap-3'>
          <Input label='Year' name='year' control={control} type='number' rules={{ required: 'Year is required' }} />
          <Input
            label='Mileage'
            name='mileage'
            control={control}
            type='number'
            rules={{ required: 'Mileage is required' }}
          />
        </div>
        {pathname === '/auctions/create' && (
          <>
            <Input label='Image URl' name='imageUrl' control={control} rules={{ required: 'Image URL is required' }} />
            <div className='grid grid-cols-2 gap-3'>
              <Input
                label='Reserve Price'
                name='reserve'
                control={control}
                rules={{ required: 'Reserve price is required' }}
              />
              <DateInput
                label='Auction end date/time'
                name='auctionEnd'
                dateFormat={DATETIME_FULL}
                showTimeSelect
                control={control}
                rules={{ required: 'Auction end date is required' }}
              />
            </div>
          </>
        )}

        <div className='flex justify-between'>
          <Button outline color='gray'>
            Cancel
          </Button>
          <Button isProcessing={isSubmitting} outline disabled={!isValid} type='submit' color='success'>
            Submit
          </Button>
        </div>
      </form>
    </>
  );
};

export default AuctionForm;
