using System.Threading.Tasks;
using AirportApp.Contract.Models;
using AirportApp.Domain.Entities;

namespace AirportApp.Domain.Abstractions
{
	public interface IFlightRepository : IRepository<Flight>
	{
		Task<Page<Flight>> GetFlightsInfo(FlightsRequest request);

	}
}
