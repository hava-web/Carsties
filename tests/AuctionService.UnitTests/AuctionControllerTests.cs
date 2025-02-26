using System;
using AuctionService.Controllers;
using AuctionService.Data;
using AuctionService.DTOs;
using AuctionService.RequestHelpers;
using AutoFixture;
using AutoMapper;
using MassTransit;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace AuctionService.UnitTests;

public class AuctionControllerTests
{
    private readonly Mock<IAuctionRepositoty> _auctionRepo;
    private readonly Mock<IPublishEndpoint> _publishEndpoint;
    private readonly Fixture _fixture;
    private readonly AuctionController _controller;
    private readonly IMapper _mapper;


    public AuctionControllerTests()
    {
        _fixture = new Fixture();
        _auctionRepo = new Mock<IAuctionRepositoty>();
        _publishEndpoint = new Mock<IPublishEndpoint>();
        var mapper = new MapperConfiguration(mc =>
        {
            mc.AddMaps(typeof(MappingProfiles).Assembly);
        }).CreateMapper().ConfigurationProvider;

        _mapper = new Mapper(mapper);
        _controller = new AuctionController(_auctionRepo.Object, _mapper, _publishEndpoint.Object);
    }

    [Fact]
    public async Task GetAllAuctions_WithNoParams_Return10Auctions()
    {
        //arrange
        var auctions = _fixture.CreateMany<AuctionDto>(10).ToList();
        _auctionRepo.Setup(repo => repo.GetAllAuctions(null)).ReturnsAsync(auctions);

        //act
        var result = await _controller.GetAllAuctions(null);

        //assert
        Assert.Equal(10, result.Value.Count);
        Assert.IsType<ActionResult<List<AuctionDto>>>(result);
    }

}
