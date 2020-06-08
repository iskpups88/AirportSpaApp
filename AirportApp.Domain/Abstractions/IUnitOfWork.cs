using System.Threading.Tasks;

namespace AirportApp.Domain.Abstractions
{
    public interface IUnitOfWork
    {
        IPassengerRepository PassengerRepository { get; }

        IFlightRepository FlightRepository { get; }

        IAircraftMemberRepository AircraftMemberRepository { get; }

        Task SaveAsync();
    }
}
