using AutoMapper;
using BiddingService.DTOs;
using BiddingService.Models;

namespace BiddingService;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<Bid, BidDto>();
    }
}
