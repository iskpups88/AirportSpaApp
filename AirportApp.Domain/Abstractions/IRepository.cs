﻿using System.Collections.Generic;
using System.Threading.Tasks;
using AirportApp.Domain.Entities;
using AirportApp.Domain.Entities.Common;

namespace AirportApp.Domain.Abstractions
{
    public interface IRepository<TEntity>
        where TEntity : EntityBase
    {
        Task<TEntity> GetByIdAsync(int id);

        Task<TEntity> CreateAsync(TEntity entity);

        TEntity UpdateAsync(TEntity entity);

        Task DeleteAsync(int key);

        Task<IList<TEntity>> GetListAsync();
    }
}
