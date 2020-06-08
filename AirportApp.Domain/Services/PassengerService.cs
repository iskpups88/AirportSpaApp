using System.Threading.Tasks;
using AirportApp.Contract.Models;
using AirportApp.Domain.Abstractions;
using AirportApp.Domain.Entities;
using AirportApp.Domain.Interfaces;

namespace AirportApp.Domain.Services
{
    public class PassengerService : IPassengerService
    {
        private readonly IPassengerRepository _passengerRepository;

        public PassengerService(IUnitOfWork unitOfWork)
        {
            _passengerRepository = unitOfWork.PassengerRepository;
        }

        public async Task<Page<Passenger>> GetPassengersByFlightNumber(ByFlightNumberRequest request)
        {
            return await _passengerRepository.GetPassengersByFlightNumber(request);
        }
    }
}