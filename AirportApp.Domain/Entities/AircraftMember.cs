using System.ComponentModel.DataAnnotations;
using AirportApp.Domain.Entities.Common;
using AirportApp.Domain.Entities.Enums;

namespace AirportApp.Domain.Entities
{
    public class AircraftMember : EntityBase
    {
        [Required]
        public string Surname { get; set; }

        [Required]
        public string Name { get; set; }

        public string Patronymic { get; set; }

        [Required]
        public AircraftPosition Position { get; set; }

        [Required]
        public int AircraftId { get; set; }

        public Aircraft Aircraft { get; set; }
    }
}
