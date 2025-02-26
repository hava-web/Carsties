using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AuctionService.DTOs;
using AuctionService.Entities;

namespace AuctionService.Data;

public interface IAuctionRepositoty
{
    Task<List<AuctionDto>> GetAllAuctions(string date);
    Task<AuctionDto> GetAuctionByIdAsync(Guid id);
    Task<Auction> GetAuctionEntityById(Guid id);
    void AuctionAdd(Auction auction);
    void RemoveAuction(Auction auction);
    Task<bool> SaveChanges();

}
