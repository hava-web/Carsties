'use server'
import { auth } from "@/auth";
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

    const session = await auth();

    const res = await fetch('http://localhost:6001/auctions/afbee524-5972-4075-8800-7d1f9d7b0a0c', {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + session?.accessToken
        },
        body: JSON.stringify(data)
    });

    if (!res.ok) return { status: res.status, message: res.statusText }

    return res.statusText;
}