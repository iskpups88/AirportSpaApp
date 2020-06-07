using System.Threading;

namespace AirportApp.Domain.Abstractions
{
    public interface ICancellationTokenAccessor
    {
        CancellationToken GetCancellationToken();
    }
}
