using System;

namespace AuctionService.IntegrationTests.Fixtures;

[CollectionDefinition("Shared connection")]
public class SharedFixture : ICollectionFixture<CustomWebAppFactory>
{

}
