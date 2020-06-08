using System.Threading.Tasks;
using AirportApp.Contract.Models;
using AirportApp.Domain.Entities;

namespace AirportApp.Domain.Interfaces
{
	public interface IFlightService
	{
		Task<Page<Flight>> GetFlightsInfoAsync(FlightsRequest request);
	}
}
