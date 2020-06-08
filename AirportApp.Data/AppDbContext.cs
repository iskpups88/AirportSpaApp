using AirportApp.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace AirportApp.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Passenger> Passengers { get; set; }

        public DbSet<Ticket> Tickets { get; set; }

        public DbSet<Flight> Flights { get; set; }

        public DbSet<Airport> Airports { get; set; }

        public DbSet<Aircraft> Aircrafts { get; set; }

        public DbSet<AircraftMember> AircraftMembers { get; set; }

        public DbSet<AirportMember> AirportMembers { get; set; }

        public DbSet<AirportMemberSchedule> AirportMemberSchedules { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
            //Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<AirportMemberSchedule>()
                .HasIndex(schedule => new { schedule.AirportMemberId, schedule.StartDate, schedule.EndDate })
                .IsUnique();

            modelBuilder.Entity<Flight>()
                .HasOne(flight => flight.AirportFrom)
                .WithMany(airport => airport.Flights)
                .HasForeignKey(flight => flight.AirportFromId)
                .OnDelete(DeleteBehavior.NoAction);

            //modelBuilder.Entity<Flight>()
            //    .HasOne(flight => flight.AirportTo)
            //    .WithMany(airport => airport.Flights)
            //    .HasForeignKey(flight => flight.AirportToId)
            //    .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Flight>()
                .HasIndex(flights => new { flights.FlightNumber, flights.Departure, flights.Arrival })
                .IsUnique();
        }
    }
}
