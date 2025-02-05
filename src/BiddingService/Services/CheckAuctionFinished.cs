using System;
using BiddingService.Models;
using MongoDB.Entities;

namespace BiddingService.Services;

public class CheckAuctionFinished : BackgroundService
{
    private readonly ILogger<CheckAuctionFinished> _logger;
    private readonly IServiceProvider _service;

    public CheckAuctionFinished(ILogger<CheckAuctionFinished> logger, IServiceProvider service)
    {
        _logger = logger;
        _service = service;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("Start checking auctions finished");

        stoppingToken.Register(() => _logger.LogInformation("=> Auctions checking is stopping"));

        while (stoppingToken.IsCancellationRequested)
        {
            await CheckAuction(stoppingToken);

            await Task.Delay(5000, stoppingToken);
        }
    }

    private async Task CheckAuction(CancellationToken stoppingToken)
    {
        var finishedAuctions = await DB.Find<Auction>()
            .Match(a => a.AuctionEnd < DateTime.UtcNow)
            .Match(a => !a.Finished)
            .ExecuteAsync(stoppingToken);

        if (finishedAuctions.Count == 0) return;

        _logger.LogInformation("Found {count} auctions that have finished", finishedAuctions.Count);

        using var scope = _service.CreateScope();

    }
}
