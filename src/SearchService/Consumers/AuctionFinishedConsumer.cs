using System;
using Contracts;
using MassTransit;
using MongoDB.Entities;
using SearchService.Models;

namespace SearchService.Consumers;

public class AuctionFinishedConsumer : IConsumer<AuctionFinished>
{
    public async Task Consume(ConsumeContext<AuctionFinished> context)
    {
        Console.WriteLine("--> Consuming Auction Finished");
        var auction = await DB.Find<Item>().OneAsync(context.Message.AuctionId);

        auction.Status = auction.Winner != null ? "Finished" : "ReserveNotMet";

        await auction.SaveAsync();
    }
}
