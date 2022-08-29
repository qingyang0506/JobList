using jobApi.Model;
using Microsoft.EntityFrameworkCore;

namespace jobApi.Data
{
    public class JobDbContext:DbContext
    {

        public JobDbContext(DbContextOptions<JobDbContext> options) : base(options)
        {

        }

        public DbSet<DetailCard>? Jobs { get; set; }
        
    }
}
