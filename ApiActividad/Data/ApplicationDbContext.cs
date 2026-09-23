using Microsoft.EntityFrameworkCore;
using AppPrueba.Models;

namespace AppPrueba.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Auto> Autos { get; set; }
}