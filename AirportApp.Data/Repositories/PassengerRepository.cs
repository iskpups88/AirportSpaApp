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
    public class PassengerRepository : RepositoryBase<Passenger>, IPassengerRepository
    {
        public PassengerRepository(
            AppDbContext context,
            CancellationToken cancellationToken)
            : base(context, cancellationToken)
        {
        }

        public async Task<Page<Passenger>> GetPassengersByFlightNumber(PassengersByFlightNumberRequest request)
        {
            var passengers = await DbSet
                .Include(p => p.Ticket)
                .ThenInclude(t => t.Flight)
                .Where(p => p.Ticket.Any(t => t.Flight.FlightNumber == request.FlightNumber.ToUpper()))
                .ToPageAsync(request, CancellationToken);

            foreach (var item in passengers.Records)
                item.Ticket = item.Ticket.Where(t => t.Flight.FlightNumber == request.FlightNumber.ToUpper()).ToList();

            return passengers;
        }
    }
}
