using System.Threading;
using AirportApp.Domain.Abstractions;
using AirportApp.Domain.Entities;

namespace AirportApp.Data.Repositories
{
    public class PassengerRepository : RepositoryBase<Passenger>, IPassengerRepository
    {
        public PassengerRepository(
            AppDbContext context,
            CancellationToken cancellationToken)
            : base(context, cancellationToken)
        {
        }
    }
}
