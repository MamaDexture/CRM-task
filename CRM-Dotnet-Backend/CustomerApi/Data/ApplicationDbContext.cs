using CustomerApi.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace CustomerApi.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public required DbSet<Customer> Customers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    base.OnModelCreating(modelBuilder);

    modelBuilder.Entity<Customer>()
        .Property(c => c.CreatedAt)
        .HasDefaultValueSql("GETDATE()")
        .ValueGeneratedOnAdd();

    modelBuilder.Entity<Customer>()
        .Property(c => c.EditedAt)
        .HasDefaultValueSql("GETDATE()")
        .ValueGeneratedOnAddOrUpdate();
}
       public override int SaveChanges()
{
    foreach (var entry in ChangeTracker.Entries<Customer>())
    {
        if (entry.State == EntityState.Modified)
        {
            
            entry.Entity.EditedAt = DateTime.Now;                // Update EditedAt
        }
        else if (entry.State == EntityState.Added)
        {
            entry.Entity.CreatedAt = DateTime.Now;               // Set CreatedAt for new entities
            entry.Entity.EditedAt = DateTime.Now;                // Set EditedAt for new entities
        }
    }

    return base.SaveChanges();
}

public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
{
    foreach (var entry in ChangeTracker.Entries<Customer>())
    {
        if (entry.State == EntityState.Modified)
        {
            entry.Property(c => c.CreatedAt).IsModified = false; // Ensure CreatedAt doesn't change
            entry.Entity.EditedAt = DateTime.Now;                // Update EditedAt
        }
        else if (entry.State == EntityState.Added)
        {
            entry.Entity.CreatedAt = DateTime.Now;               // Set CreatedAt for new entities
            entry.Entity.EditedAt = DateTime.Now;                // Set EditedAt for new entities
        }
    }

    return await base.SaveChangesAsync(cancellationToken);
}
    }
}
