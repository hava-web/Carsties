using System;
using Contracts;
using MassTransit;
using Microsoft.AspNetCore.SignalR;
using NotificationService.Hubs;

namespace NotificationService.Consumers;

public class AuctionCreatedConsumer : IConsumer<AuctionCreated>
{
    private readonly IHubContext<NotificationHubs> _hubContext;

    public AuctionCreatedConsumer(IHubContext<NotificationHubs> hubContext)
    {
        _hubContext = hubContext;
    }

    public async Task Consume(ConsumeContext<AuctionCreated> context)
    {
        Console.WriteLine("--> Auction created message received");

        await _hubContext.Clients.All.SendAsync("AuctionCreated", context.Message);
    }
}
