'use server'
import { Auction, PageResult } from "../types";

export async function getData(query: string): Promise<PageResult<Auction>> {
    const response = await fetch(`http://localhost:6001/search${query}`, { next: { revalidate: 60 } });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}