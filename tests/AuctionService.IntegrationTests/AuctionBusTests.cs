using System;
using System.Net;
using System.Net.Http.Json;
using AuctionService.Data;
using AuctionService.DTOs;
using AuctionService.IntegrationTests.Fixtures;
using AuctionService.IntegrationTests.Utils;
using Contracts;
using MassTransit.Testing;
using Microsoft.Extensions.DependencyInjection;

namespace AuctionService.IntegrationTests;

[Collection("Shared connection")]
public class AuctionBusTests : IAsyncLifetime
{
    private readonly CustomWebAppFactory _factory;
    private readonly HttpClient _httpClient;
    private ITestHarness _testHarness;

    public AuctionBusTests(CustomWebAppFactory factory)
    {
        _factory = factory;
        _httpClient = _factory.CreateClient();
        _testHarness = factory.Services.GetTestHarness();
    }

    [Fact]
    public async Task CreateAuction_WithValidObject_ShouldPublishAuctionCreated()
    {
        //arrange
        var auction = GetAuctionForCreate();
        _httpClient.SetFakeJwtBearerToken(AuthHelper.GetBearForUser("bob"));

        //act
        var response = await _httpClient.PostAsJsonAsync("/api/auctions", auction);

        //assert
        response.EnsureSuccessStatusCode();
        Assert.True(await _testHarness.Published.Any<AuctionCreated>());
    }

    public Task InitializeAsync() => Task.CompletedTask;

    public Task DisposeAsync()
    {
        using var scope = _factory.Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<AuctionDbContext>();
        DbHelper.ReInitDbForTests(db);
        return Task.CompletedTask;
    }

    private static CreateAuctionDto GetAuctionForCreate()
    {
        return new CreateAuctionDto
        {
            Make = "test",
            Model = "testModel",
            ImageUrl = "testUrl",
            Color = "testColor",
            Year = 2021,
            Mileage = 1000,
            ReservePrice = 10,
        };
    }
}
