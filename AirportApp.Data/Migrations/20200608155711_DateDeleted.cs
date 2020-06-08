using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace AirportApp.Data.Migrations
{
    public partial class DateDeleted : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Flights_FlightNumber_Date",
                table: "Flights");

            migrationBuilder.DropColumn(
                name: "Date",
                table: "Flights");

            migrationBuilder.CreateIndex(
                name: "IX_Flights_FlightNumber_Departure_Arrival",
                table: "Flights",
                columns: new[] { "FlightNumber", "Departure", "Arrival" },
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Flights_FlightNumber_Departure_Arrival",
                table: "Flights");

            migrationBuilder.AddColumn<DateTime>(
                name: "Date",
                table: "Flights",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateIndex(
                name: "IX_Flights_FlightNumber_Date",
                table: "Flights",
                columns: new[] { "FlightNumber", "Date" },
                unique: true);
        }
    }
}
