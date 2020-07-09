using Microsoft.EntityFrameworkCore;
using CloudBeatAsp.Models;

namespace CloudBeatAsp.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext>options):base(options){}

        public DbSet<Patient> Patients { get; set; }
        public DbSet<Event> Events { get; set; }
    }
} 