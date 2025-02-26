using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AuctionService.DTOs;
using AuctionService.Entities;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace AuctionService.Data;

public class AuctionRepositoty : IAuctionRepositoty
{
    private readonly AuctionDbContext _context;
    private readonly IMapper _mapper;

    public AuctionRepositoty(AuctionDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    public void AuctionAdd(Auction auction)
    {
        _context.Auctions.Add(auction);
    }

    public async Task<List<AuctionDto>> GetAllAuctions(string date)
    {
        var query = _context.Auctions.OrderBy(x => x.Item.Make).AsQueryable();

        if (!string.IsNullOrEmpty(date))
        {
            query = query.Where(x => x.UpdateAt.CompareTo(DateTime.Parse(date).ToUniversalTime()) > 0);
        }

        return await query.ProjectTo<AuctionDto>(_mapper.ConfigurationProvider).ToListAsync();
    }

    public async Task<AuctionDto> GetAuctionByIdAsync(Guid id)
    {
        return await _context.Auctions
       .ProjectTo<AuctionDto>(_mapper.ConfigurationProvider)
       .FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task<Auction> GetAuctionEntityById(Guid id)
    {
        return await _context.Auctions.Include(x => x.Item)
            .FirstOrDefaultAsync(x => x.Id == id);
    }

    public void RemoveAuction(Auction auction)
    {
        _context.Auctions.Remove(auction);
    }

    public async Task<bool> SaveChanges()
    {
        return await _context.SaveChangesAsync() > 0;
    }
}
