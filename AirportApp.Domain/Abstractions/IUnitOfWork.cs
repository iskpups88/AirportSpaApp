﻿using System.Threading.Tasks;

namespace AirportApp.Domain.Abstractions
{
    public interface IUnitOfWork
    {
        IPassengerRepository PassengerRepository { get; }

        Task SaveAsync();
    }
}