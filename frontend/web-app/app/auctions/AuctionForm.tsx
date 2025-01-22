
'use client'
import { Button } from 'flowbite-react';
import React, { useEffect } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import Input from '../components/Input';

const AuctionForm = () => {
    const {
        register,
        handleSubmit,
        control,
        setFocus,
        formState: {
            isSubmitting,
            isValid,
            isDirty,
            errors
        }
    } = useForm({
        mode: 'onTouched'
    });

    const onSubmit = (data: FieldValues) => {
        console.log(data);
    }

    useEffect(() => {
        setFocus('make')
    }, [setFocus])

    return (
        <>
            <form className='flex flex-col mt-3' onSubmit={handleSubmit(onSubmit)}>
                <Input
                    label='Make'
                    name='make'
                    control={control}
                    rules={{ required: 'Make is requrired' }}
                />
                <Input
                    label='Model'
                    name='model'
                    control={control}
                    rules={{ required: 'Modal is requrired' }}
                />
                <Input
                    label='Color'
                    name='color'
                    control={control}
                    rules={{ required: 'Color is requrired' }}
                />
                <div className="grid grid-cols-2 gap-3">
                    <Input
                        label='Year'
                        name='year'
                        control={control}
                        type='number'
                        rules={{ required: 'Year is requrired' }}
                    />
                    <Input
                        label='Mileage'
                        name='mileage'
                        control={control}
                        type='number'
                        rules={{ required: 'Mileage is requrired' }}
                    />
                </div>
                <Input
                    label='Image URl'
                    name='imageUrl'
                    control={control}
                    rules={{ required: 'Image URL is requrired' }}
                />
                <div className="grid grid-cols-2 gap-3">
                    <Input
                        label='Reserve Price'
                        name='reserve'
                        control={control}
                        rules={{ required: 'Reserve price is requrired' }}
                    />
                    <Input
                        label='Auction end date/time'
                        name='auctionEnd'
                        control={control}
                        type='date'
                        rules={{ required: 'Auction end date is requrired' }}
                    />
                </div>

                <div className="flex justify-between">
                    <Button outline color='gray'>
                        Cancel
                    </Button>
                    <Button
                        isProcessing={isSubmitting}
                        outline
                        // disabled={!isValid}
                        type='submit'
                        color='success'
                    >
                        Submit
                    </Button>
                </div>
            </form>
        </>
    )
}

export default AuctionForm