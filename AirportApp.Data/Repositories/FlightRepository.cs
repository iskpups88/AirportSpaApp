using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AirportApp.Contract.Models;
using AirportApp.Data.Extensions;
using AirportApp.Domain.Abstractions;
using AirportApp.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace AirportApp.Data.Repositories
{
    public class FlightRepository : RepositoryBase<Flight>, IFlightRepository
    {
        public FlightRepository(
            AppDbContext context,
            CancellationToken cancellationToken)
            : base(context, cancellationToken)
        {
        }

        public async Task<Page<Flight>> GetFlightsInfo(FlightsRequest request)
        {
            var query = DbSet.AsQueryable();

            if (!string.IsNullOrEmpty(request.CityTo))
                query = query.Where(f => f.AirportTo.City == request.CityTo.ToUpper());

            if (!string.IsNullOrEmpty(request.CityFrom))
                query = query.Where(f => f.AirportFrom.City == request.CityFrom.ToUpper());

            if (!string.IsNullOrEmpty(request.FlightNumber))
                query = query.Where(f => f.FlightNumber == request.FlightNumber);

            if (request.DateFrom.HasValue)
                query = query.Where(f => f.Departure >= request.DateFrom);

            if (request.DateTo.HasValue && !request.Completed)
                query = query.Where(f => f.Arrival <= request.DateTo);

            if (request.Completed)
                query = query.Where(f => f.Arrival <= DateTime.Now);

            return await query
                .Include(f => f.Aircraft)
                .Include(f => f.AirportTo)
                .Include(f => f.AirportFrom)
                .AsQueryable()
                .ToPageAsync(request, CancellationToken);
        }
    }
}
