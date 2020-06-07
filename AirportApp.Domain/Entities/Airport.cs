using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using AirportApp.Domain.Entities.Common;

namespace AirportApp.Domain.Entities
{
    public class Airport : EntityBase
    {
        [Required]
        public string City { get; set; }

        [Required]
        public string ShortName { get; set; }

        public IList<Flight> Flights { get; set; }
    }
}
