using HotelZaPse.Models;
using Microsoft.EntityFrameworkCore;

namespace HotelZaPse.Data
{
  
    public class EdunovaContext : DbContext
    {
        public EdunovaContext(DbContextOptions<EdunovaContext> opcije) : base(opcije)
        {

        }


        public DbSet<Djelatnik> Djelatnici { get; set; }


    }
}
