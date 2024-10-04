using Microsoft.EntityFrameworkCore;
using backend.Domain.Entities;
using MongoDB.EntityFrameworkCore.Extensions;
using MongoDB.Driver;

namespace backend.Infrastructure.Data
{
    public class DatabaseContext : DbContext
    {
        public DbSet<JobOffer> JobOffers { get; set; }

        public static DatabaseContext Create(IMongoDatabase database) =>
            new(new DbContextOptionsBuilder<DatabaseContext>()
                .UseMongoDB(database.Client, database.DatabaseNamespace.DatabaseName)
                .Options);

        public DatabaseContext(DbContextOptions options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Mapowanie encji do kolekcji MongoDB
            modelBuilder.Entity<JobOffer>().ToCollection("job_offers");
        }
    }
}
