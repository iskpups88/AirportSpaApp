using System.Threading.Tasks;
using AirportApp.Contract.Models;
using AirportApp.Domain.Abstractions;
using AirportApp.Domain.Entities;
using AirportApp.Domain.Interfaces;

namespace AirportApp.Domain.Services
{
    public class AircraftService : IAircraftService
    {
        private readonly IAircraftMemberRepository _aircraftMemberRepository;

        public AircraftService(IUnitOfWork unitOfWork)
        {
            _aircraftMemberRepository = unitOfWork.AircraftMemberRepository;
        }

        public async Task<Page<AircraftMember>> GetAircraftMembersByFlightNumber(ByFlightNumberRequest request)
        {
            return await _aircraftMemberRepository.GetAircraftByFlightNumber(request);
        }
    }
}