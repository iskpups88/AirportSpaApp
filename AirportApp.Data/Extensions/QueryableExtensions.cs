using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AirportApp.Contract.Models;
using Microsoft.EntityFrameworkCore;

namespace AirportApp.Data.Extensions
{
    public static class QueryableExtensions
    {
        public static Task<Page<TEntity>> ToPageAsync<TEntity>(
            this IQueryable<TEntity> queryable,
            PageRequest pageQuery,
            CancellationToken cancellationToken)
        {
            if (pageQuery == null)
                throw new ArgumentNullException(nameof(pageQuery));

            if (pageQuery.PageNumber.HasValue || pageQuery.PageSize.HasValue)
                return queryable
                    .GetPageByPageNumberAsync(pageQuery.PageNumber, GetValidQueryLimit(pageQuery.PageSize), cancellationToken);

            return queryable
                .GetOffsetLimitPageAsync(pageQuery.Offset, GetValidQueryLimit(pageQuery.Limit), cancellationToken);
        }

        private static async Task<Page<TEntity>> GetOffsetLimitPageAsync<TEntity>(this IQueryable<TEntity> queryable,
            int? pageOffset, int pageLimit, CancellationToken cancellationToken)
        {
            var count =
                await queryable
                    .CountAsync(cancellationToken)
                    .ConfigureAwait(false);

            var records = await queryable
                .WithBounds(pageOffset, pageLimit)
                .ToArrayAsync(cancellationToken)
                .ConfigureAwait(false);

            return new Page<TEntity>
            {
                Offset = pageOffset,
                Limit = pageLimit,
                Records = records,
                Total = count
            };
        }

        private static async Task<Page<TEntity>> GetPageByPageNumberAsync<TEntity>(this IQueryable<TEntity> queryable,
            int? pageNumber, int pageSize, CancellationToken cancellationToken)
        {
            var count =
                await queryable
                    .CountAsync(cancellationToken)
                    .ConfigureAwait(false);

            var records = await queryable
                .WithBounds((pageNumber - 1) * pageSize, pageSize)
                .ToArrayAsync(cancellationToken)
                .ConfigureAwait(false);

            var totalPages = count / pageSize;
            if (count % pageSize > 0)
                totalPages++;

            return new Page<TEntity>
            {
                Number = pageNumber,
                Size = pageSize,
                Records = records,
                TotalPages = totalPages
            };
        }

        private static IQueryable<TEntity> WithBounds<TEntity>(this IQueryable<TEntity> queryable, int? pageOffset,
            int pageLimit)
        {
            if (pageOffset.HasValue && pageOffset > 0)
                queryable = queryable.Skip(pageOffset.Value);

            queryable = queryable.Take(pageLimit);

            return queryable;
        }

        private static int GetValidQueryLimit(int? limit)
        {
            if (!limit.HasValue || limit > 50)
                return 20;

            return limit.Value;
        }
    }
}
