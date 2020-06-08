namespace AirportApp.Contract.Models
{
    public class PassengersByFlightNumberRequest : PageRequest
    {
        public string FlightNumber { get; set; }
    }
}