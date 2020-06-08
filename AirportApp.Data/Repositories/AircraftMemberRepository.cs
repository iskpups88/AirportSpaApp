using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AirportApp.Contract.Models;
using AirportApp.Data.Extensions;
using AirportApp.Domain.Abstractions;
using AirportApp.Domain.Entities;

namespace AirportApp.Data.Repositories
{
    public class AircraftMemberRepository : RepositoryBase<AircraftMember>, IAircraftMemberRepository
    {
        public AircraftMemberRepository(
            AppDbContext context,
            CancellationToken cancellationToken)
            : base(context, cancellationToken)
        {
        }

        public async Task<Page<AircraftMember>> GetAircraftByFlightNumber(ByFlightNumberRequest request)
        {
            return await DbSet.Where(a =>
                a.Aircraft.Flights.Any(f =>
                    f.FlightNumber == request.FlightNumber.ToUpper()))
                .ToPageAsync(request, CancellationToken);
        }
    }
}