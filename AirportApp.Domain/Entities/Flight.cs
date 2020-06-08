using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using AirportApp.Domain.Entities.Common;

namespace AirportApp.Domain.Entities
{
    public class Flight : EntityBase
    {
        [Required]
        public string FlightNumber { get; set; }

        [Required]
        public int AirportFromId { get; set; }

        public Airport AirportFrom { get; set; }

        [Required]
        public int AirportToId { get; set; }

        public Airport AirportTo { get; set; }

        [Required]
        public DateTime Departure { get; set; }

        [Required]
        public DateTime Arrival { get; set; }

        public IList<Ticket> Tickets { get; set; } = new List<Ticket>();

        [Required]
        public int AircraftId { get; set; }

        public Aircraft Aircraft { get; set; }

        [Required]
        public string AirCompany { get; set; }
    }
}
