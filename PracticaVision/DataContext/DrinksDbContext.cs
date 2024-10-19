using Microsoft.EntityFrameworkCore;
using PracticaVision.Models;

namespace PracticaVision.DataContext
{
    public class DrinksDbContext : DbContext
    {
        public DrinksDbContext(DbContextOptions<DrinksDbContext> dbContextOptions) : base(dbContextOptions) { }

        public DbSet<Drink> Drinks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Drink>().ToTable("Drinks");
        }
    }
}