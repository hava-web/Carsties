using System;
using System.Security.Claims;

namespace AuctionService.IntegrationTests.Utils;

public class AuthHelper
{
    public static Dictionary<string, object> GetBearForUser(string username)
    {
        return new Dictionary<string, object> { { ClaimTypes.Name, username } };
    }
}
