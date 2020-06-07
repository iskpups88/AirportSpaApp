using System;
using AirportApp.Domain.Abstractions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace AirportApp.Data
{
    public static class Entry
    {
        public static IServiceCollection AddEfCore(this IServiceCollection services, Action<DbContextOptionsBuilder> optionsAction)
        {
            services.AddDbContext<AppDbContext>(optionsAction);
            services.AddScoped<IUnitOfWork, UnitOfWork>();

            return services;
        }
    }
}
