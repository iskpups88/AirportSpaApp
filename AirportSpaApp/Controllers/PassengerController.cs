using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AirportApp.Domain.Abstractions;
using AirportApp.Domain.Entities;
using AutoFixture;
using Microsoft.AspNetCore.Mvc;

namespace AirportApp.WebHost.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class PassengerController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private string Location = "api/v1/PassengerController/{0}";

        public PassengerController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpPost]
        public async Task<IActionResult> AddPassenger(Passenger passenger)
        {
            var result = await _unitOfWork.PassengerRepository.CreateAsync(passenger);
            await _unitOfWork.SaveAsync();

            return Created(string.Format(Location, result.Id), result);
        }

        [HttpGet]
        public async Task<IActionResult> GetPassenger()
        {
            var fixture = new Fixture();

            var aircraft = fixture
                .Build<Aircraft>()
                .Without(p => p.AircraftMembers)
                .Create();

            var aircraftMembers = fixture
                .Build<AircraftMember>()
                .With(p => p.Aircraft, aircraft)
                .With(p => p.AircraftId, aircraft.Id)
                .CreateMany(4);

            aircraft.AircraftMembers = aircraftMembers.ToList();

            var airportTo = fixture
                .Build<Airport>()
                .Without(p => p.Flights)
                .Create();

            var airportFrom = fixture
                .Build<Airport>()
                .Without(p => p.Flights)
                .Create();

            var ticket = fixture
                .Build<Ticket>()
                .Without(p => p.Flight)
                .Without(p => p.Passenger)
                .Create();

            var tickets = new List<Ticket>() { ticket };

            var passenger = fixture
                .Build<Passenger>()
                .With(p => p.Ticket, tickets)
                .Create();

            ticket.Passenger = passenger;
            ticket.PassengerId = passenger.Id;

            var flight = fixture
                .Build<Flight>()
                .With(p => p.AirportFromId, airportFrom.Id)
                .With(p => p.AirportFrom, airportFrom)
                .With(p => p.AirportToId, airportTo.Id)
                .With(p => p.AirportTo, airportTo)
                .With(p => p.Tickets, tickets)
                .With(p => p.AircraftId, aircraft.Id)
                .With(p => p.Aircraft, aircraft)
                .Create();

            airportTo.Flights = new List<Flight> { flight };
            airportFrom.Flights = new List<Flight> { flight };
            ticket.Flight = flight;
            ticket.FlightId = flight.Id;

            return Ok(passenger);
        }
    }
}
