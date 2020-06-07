using System.Threading;
using AirportApp.Domain.Abstractions;
using Microsoft.AspNetCore.Http;

namespace AirportSpaApp.Utils
{
    internal class CancellationTokenAccessor : ICancellationTokenAccessor
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CancellationTokenAccessor(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public CancellationToken GetCancellationToken()
        {
            return _httpContextAccessor.HttpContext?.RequestAborted ?? default;
        }
    }
}