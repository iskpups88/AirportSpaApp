using System.Threading.Tasks;
using AirportApp.Contract.Models;
using AirportApp.Domain.Entities;

namespace AirportApp.Domain.Abstractions
{
    public interface IAircraftMemberRepository : IRepository<AircraftMember>
    {
        Task<Page<AircraftMember>> GetAircraftByFlightNumber(ByFlightNumberRequest request);
    }
}
