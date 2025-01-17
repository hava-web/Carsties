'use server'
import { Auction, PageResult } from "../types";

export async function getData(query: string): Promise<PageResult<Auction>> {
    const response = await fetch(`http://localhost:6001/search${query}`, { next: { revalidate: 60 } });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

export async function updateAuctionTest() {
    const data = {
        mileage: Math.floor(Math.random() * 10000) + 1
    };

    const res = await fetch('http://localhost:6001/auctions', {
        method: 'PUT',
        headers: {},
        body: JSON.stringify(data)
    });

    if (res.ok) return { status: res.status, message: res.statusText }

    return res.json();
}