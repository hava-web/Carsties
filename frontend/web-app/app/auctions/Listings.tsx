import React from 'react';
import AuctionCard from './AuctionCard';

async function getData() {
    const response = await fetch('http://localhost:6001/search?pageSize=10', { next: { revalidate: 60 } });
    console.log(JSON.stringify(response));

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

const Listings = async () => {
    const data = await getData();
    return (
        <div className='grid grid-cols-4 gap-6'>
            {data && data.results.map((auction: any) => (
                <AuctionCard key={auction.id} auction={auction} />
            ))}
        </div>
    )
}

export default Listings