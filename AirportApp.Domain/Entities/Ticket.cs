using System.ComponentModel.DataAnnotations;
using AirportApp.Domain.Entities.Common;
using AirportApp.Domain.Entities.Enums;

namespace AirportApp.Domain.Entities
{
    public class Ticket : EntityBase
    {
        [Required]
        public string Seat { get; set; }

        [Required]
        public BoardingClass Class { get; set; }

        [Required]
        public decimal Price { get; set; }

        [Required]
        public int FlightId { get; set; }

        public Flight Flight { get; set; }

        [Required]
        public int PassengerId { get; set; }

        public Passenger Passenger { get; set; }
    }
}
