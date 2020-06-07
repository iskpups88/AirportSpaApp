using System;
using System.ComponentModel.DataAnnotations;
using AirportApp.Domain.Entities.Common;

namespace AirportApp.Domain.Entities
{
    public class AirportMemberSchedule : EntityBase
    {
        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        [Required]
        public int AirportId { get; set; }

        public Airport Airport { get; set; }

        [Required]
        public int AirportMemberId { get; set; }

        public AirportMember AirportMember { get; set; }
    }
}
