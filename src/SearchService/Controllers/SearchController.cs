using Contracts;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Entities;
using SearchService.Models;
using SearchService.RequestHelpers;

namespace SearchService.Controllers;

[ApiController]
[Route("api/search")]
public class SearchController : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<Item>>> SearchItems([FromQuery] SearchParams searchParams)
    {
        var query = DB.PagedSearch<Item, Item>();

        query.Sort(x => x.Ascending(a => a.Make));

        if (!string.IsNullOrEmpty(searchParams.SearchTerm))
        {
            query.Match(Search.Full, searchParams.SearchTerm).SortByTextScore();
        }

        query = searchParams.OrderBy switch
        {
            "make" => query.Sort(x => x.Ascending(a => a.Make)),
            "new" => query.Sort(x => x.Descending(a => a.CreateAt)),
            _ => query.Sort(x => x.Ascending(a => a.AuctionEnd))
        };

        query = searchParams.FilterBy switch
        {
            "finished" => query.Match(x => x.AuctionEnd < DateTime.UtcNow),
            "endingSoon" => query.Match(x => x.AuctionEnd < DateTime.UtcNow.AddHours(6) && x.AuctionEnd > DateTime.UtcNow),
            _ => query.Match(x => x.AuctionEnd > DateTime.UtcNow)
        };

        if (!string.IsNullOrEmpty(searchParams.Seller))
        {
            query.Match(x => x.Seller == searchParams.Seller);
        }

        if (!string.IsNullOrEmpty(searchParams.Winner))
        {
            query.Match(x => x.Winner == searchParams.Winner);
        }

        query.PageNumber(searchParams.PageNumber);

        query.PageSize(searchParams.PageSize);

        var result = await query.ExecuteAsync();

        return Ok(new
        {
            results = result.Results,
            pageCount = result.PageCount,
            totalCount = result.TotalCount
        });
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateItem(AuctionUpdated auctionUpdated)
    {
        try
        {
            var query = await DB.Update<Item>()
                        .MatchID(auctionUpdated.Id)
                        .Modify(i => i.Make, auctionUpdated.Make)
                        .Modify(i => i.Model, auctionUpdated.Model)
                        .Modify(i => i.Color, auctionUpdated.Color)
                        .Modify(i => i.Mileage, auctionUpdated.Mileage)
                        .Modify(i => i.Year, auctionUpdated.Year)
                        .ExecuteAsync();

            if (query != null && query.ModifiedCount > 0)
            {
                return Ok("Update successful");
            }

            return BadRequest("Update in mongo failed or no changes were made");
        }
        catch (Exception ex)
        {
            Console.WriteLine("We have some errors: ", ex.Message);
            throw;
        }
    }

    // [HttpDelete("{id}")]
    // public async Task<ActionResult> DeleteItem(int id)
    // {
    //     return Ok();
    // }
}
