using System.Threading.Tasks;
using AirportApp.Contract.Models;
using AirportApp.Domain.Entities;

namespace AirportApp.Domain.Interfaces
{
    public interface IAircraftService
    {
        Task<Page<AircraftMember>> GetAircraftMembersByFlightNumber(ByFlightNumberRequest request);
    }
}
