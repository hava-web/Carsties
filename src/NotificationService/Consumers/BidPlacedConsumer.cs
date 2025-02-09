using System;
using Contracts;
using MassTransit;
using Microsoft.AspNetCore.SignalR;
using NotificationService.Hubs;

namespace NotificationService.Consumers;

public class BidPlacedConsumer : IConsumer<BidPlaced>
{
    private readonly IHubContext<NotificationHubs> _hubContext;

    public BidPlacedConsumer(IHubContext<NotificationHubs> hubContext)
    {
        _hubContext = hubContext;
    }
    public async Task Consume(ConsumeContext<BidPlaced> context)
    {
        Console.WriteLine("--> Bid placed message received");

        await _hubContext.Clients.All.SendAsync("BidPlaced", context.Message);
    }
}
