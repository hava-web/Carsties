using AuctionService.Entities;

namespace AuctionService.UnitTests;

public class AuctionEntityTests
{
    [Fact]
    public void HasReservePrice_ReverserPriceGtZero_True()
    {
        //arrange
        var auction = new Auction
        {
            Id = Guid.NewGuid(),
            ReservePrice = 10
        };
        //act
        var result = auction.HasReservePrice();

        //assert
        Assert.True(result);
    }

    [Fact]
    public void HasReservePrice_ReverserPriceIsZero_False()
    {
        //arrange
        var auction = new Auction
        {
            Id = Guid.NewGuid(),
            ReservePrice = 0
        };
        //act
        var result = auction.HasReservePrice();

        //assert
        Assert.False(result);
    }
}