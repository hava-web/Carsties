'use client'
import React, { useState } from 'react';
import Image from 'next/image';

type ImageProps = {
    imageUrl: string
}

const CarImage = ({ imageUrl }: ImageProps) => {
    const [isLoading, setIsLoading] = useState(true);
    return (
        <>
            <Image
                src={imageUrl}
                alt={`Image of car`}
                fill
                priority
                className={`
                    object-cover group-hover:opacity-75 duration-700 ease-in-out
                    ${isLoading
                        ? 'grayscale blur-2xl scale-110'
                        : 'grayscale-0 blur-0 scale-100'}
                `}
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw'
                onLoad={() => setIsLoading(false)}
            />
        </>
    )
}

export default CarImage