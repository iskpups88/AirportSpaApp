using System;

namespace AirportApp.Contract.Models
{
    public class FlightsRequest : PageRequest
    {
        public DateTime? DateFrom { get; set; }

        public DateTime? DateTo { get; set; }

        public string CityTo { get; set; }

        public string CityFrom { get; set; }

        public string FlightNumber { get; set; }

        public bool Completed { get; set; }
    }
}