namespace AirportApp.Contract.Models
{
    public class ByFlightNumberRequest : PageRequest
    {
        public string FlightNumber { get; set; }
    }
}