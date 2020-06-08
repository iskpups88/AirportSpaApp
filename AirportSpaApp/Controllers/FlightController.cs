using System.Threading.Tasks;
using AirportApp.Contract.Models;
using AirportApp.Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace AirportSpaApp.Controllers
{
	[ApiController]
	[Route("api/v1/[controller]")]
	public class FlightController : ControllerBase
	{
		private readonly IFlightService _flightService;

		public FlightController(IFlightService flightService)
		{
			_flightService = flightService;
		}

		[HttpGet]
		public async Task<IActionResult> Get([FromQuery] FlightsRequest request)
		{
			var result = await _flightService.GetFlightsInfoAsync(request);
			return Ok(result);
		}
	}
}
