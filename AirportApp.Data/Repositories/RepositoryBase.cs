using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AirportApp.Contract.Models;
using AirportApp.Data.Extensions;
using AirportApp.Domain.Abstractions;
using AirportApp.Domain.Entities.Common;
using Microsoft.EntityFrameworkCore;

namespace AirportApp.Data.Repositories
{
    public class RepositoryBase<TEntity> : IRepository<TEntity>
        where TEntity : EntityBase
    {
        protected AppDbContext Context { get; }

        protected CancellationToken CancellationToken { get; }

        protected DbSet<TEntity> DbSet { get; }

        public RepositoryBase(AppDbContext context, CancellationToken cancellationToken)
        {
            Context = context;
            CancellationToken = cancellationToken;
            DbSet = context.Set<TEntity>();
        }

        public async Task<TEntity> GetByIdAsync(int id)
        {
            return await DbSet
                .FirstOrDefaultAsync(e => e.Id == id, CancellationToken);
        }

        public async Task<TEntity> CreateAsync(TEntity entity)
        {
            await DbSet
                .AddAsync(entity, CancellationToken);

            return entity;
        }

        public TEntity UpdateAsync(TEntity entity)
        {
            DbSet.Update(entity);
            return entity;
        }

        public async Task DeleteAsync(int id)
        {
            var result = await GetByIdAsync(id);
            DbSet.Remove(result);
        }

        public async Task<IList<TEntity>> GetListAsync()
        {
            return await DbSet.ToListAsync(CancellationToken);
        }

        public virtual async Task<Page<TEntity>> GetPageAsync(PageRequest request)
        {
            return await DbSet.ToPageAsync(request, CancellationToken);
        }
    }
}
