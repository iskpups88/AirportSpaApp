using AirportApp.Domain.Interfaces;
using AirportApp.Domain.Services;
using Microsoft.Extensions.DependencyInjection;

namespace AirportApp.Domain
{
    public static class Entry
    {
        public static IServiceCollection AddDomainDependencies(this IServiceCollection services)
        {
            services.AddScoped<IFlightService, FlightService>();
            services.AddScoped<IPassengerService, PassengerService>();

            return services;
        }
    }
}
