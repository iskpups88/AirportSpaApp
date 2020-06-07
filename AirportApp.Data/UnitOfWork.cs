using System;
using System.Threading;
using System.Threading.Tasks;
using AirportApp.Data.Repositories;
using AirportApp.Domain.Abstractions;

namespace AirportApp.Data
{
    public class UnitOfWork : IUnitOfWork, IDisposable
    {
        public AppDbContext Context { get; }

        public CancellationToken CancellationToken { get; }

        public UnitOfWork(AppDbContext context, ICancellationTokenAccessor cancellationTokenAccessor)
        {
            Context = context;
            CancellationToken = cancellationTokenAccessor.GetCancellationToken();
        }

        public IPassengerRepository PassengerRepository => new PassengerRepository(Context, CancellationToken);

        public async Task SaveAsync()
        {
            Context.ChangeTracker.DetectChanges();
            await Context.SaveChangesAsync(CancellationToken);
        }

        private void ReleaseUnmanagedResources()
        {
            Context.Dispose();
        }

        private void Dispose(bool disposing)
        {
            ReleaseUnmanagedResources();
            if (disposing)
            {
                Context?.Dispose();
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        ~UnitOfWork()
        {
            Dispose(false);
        }
    }
}
