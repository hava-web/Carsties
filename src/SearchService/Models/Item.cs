using System;
using MongoDB.Entities;

namespace SearchService.Models;

public class Item : Entity
{
    public int ReservePrice { get; set; }

    public string? Seller { get; set; }

    public string? Winner { get; set; }

    public int SoldAmount { get; set; }

    public int CurrentHighBid { get; set; }

    public DateTime CreateAt { get; set; }

    public DateTime UpdateAt { get; set; }

    public DateTime AuctionEnd { get; set; }

    public string? Status { get; set; }

    public string? Make { get; set; }

    public string? Model { get; set; }

    public int Year { get; set; }

    public string? Color { get; set; }

    public int Mileage { get; set; }

    public string? ImageUrl { get; set; }
}
