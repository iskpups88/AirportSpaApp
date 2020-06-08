using System.Threading.Tasks;
using AirportApp.Contract.Models;
using AirportApp.Domain.Abstractions;
using AirportApp.Domain.Entities;
using AirportApp.Domain.Interfaces;

namespace AirportApp.Domain.Services
{
	internal class FlightService : IFlightService
	{
		private readonly IUnitOfWork _unitOfWork;

		public FlightService(IUnitOfWork unitOfWork)
		{
			_unitOfWork = unitOfWork;
		}

		public async Task<Page<Flight>> GetFlightsInfoAsync(FlightsRequest request)
		{
			var repository = _unitOfWork.FlightRepository;
			return await repository.GetFlightsInfo(request);
		}
	}
}
