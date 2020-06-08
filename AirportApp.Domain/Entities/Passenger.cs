using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using AirportApp.Domain.Entities.Common;

namespace AirportApp.Domain.Entities
{
    public class Passenger : EntityBase
    {
        [Required]
        public string Surname { get; set; }

        [Required]
        public string Name { get; set; }

        public string Patronymic { get; set; }

        [Required]
        public DateTime BirthDate { get; set; }

        public string Address { get; set; }

        [Required]
        public string Series { get; set; }

        [Required]
        public string Number { get; set; }

        public IList<Ticket> Ticket { get; set; } = new List<Ticket>();
    }
}
