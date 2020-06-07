using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using AirportApp.Domain.Entities.Common;

namespace AirportApp.Domain.Entities
{
    public class Aircraft : EntityBase
    {
        [Required]
        public string Identifier { get; set; }

        [Required]
        public string Model { get; set; }

        [Required]
        public int FlightId { get; set; }

        public IList<AircraftMember> AircraftMembers { get; set; } = new List<AircraftMember>();
    }
}