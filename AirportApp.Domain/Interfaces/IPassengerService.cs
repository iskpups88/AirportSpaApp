using System.Threading.Tasks;
using AirportApp.Contract.Models;
using AirportApp.Domain.Entities;

namespace AirportApp.Domain.Interfaces
{
    public interface IPassengerService
    {
        Task<Page<Passenger>> GetPassengersByFlightNumber(PassengersByFlightNumberRequest request);
    }
}
