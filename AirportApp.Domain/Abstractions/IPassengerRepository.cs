using System.Threading.Tasks;
using AirportApp.Contract.Models;
using AirportApp.Domain.Entities;

namespace AirportApp.Domain.Abstractions
{
    public interface IPassengerRepository : IRepository<Passenger>
    {
        Task<Page<Passenger>> GetPassengersByFlightNumber(ByFlightNumberRequest request);
    }
}
