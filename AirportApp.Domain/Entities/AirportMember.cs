using System.ComponentModel.DataAnnotations;
using AirportApp.Domain.Entities.Common;
using AirportApp.Domain.Entities.Enums;

namespace AirportApp.Domain.Entities
{
    public class AirportMember : EntityBase
    {
        [Required]
        public string PersonnelNumber { get; set; }

        [Required]
        public string Surname { get; set; }

        [Required]
        public string Name { get; set; }

        public string Patronymic { get; set; }

        [Required]
        public AirportPosition Position { get; set; }
    }
}
