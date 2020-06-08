using System.Threading.Tasks;
using AirportApp.Contract.Models;
using AirportApp.Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace AirportSpaApp.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class AircraftMemberController : ControllerBase
    {
        private readonly IAircraftService _aircraftService;

        public AircraftMemberController(IAircraftService aircraftService)
        {
            _aircraftService = aircraftService;
        }

        [HttpGet("byFlightNumber")]
        public async Task<IActionResult> Get([FromQuery] ByFlightNumberRequest request)
        {
            var result = await _aircraftService.GetAircraftMembersByFlightNumber(request);

            return Ok(result);
        }
    }
}