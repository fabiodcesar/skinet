using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Identity
{
    public class AppIdentityDbContext : IdentityDbContext
    {
        //Tipo "AppIdentityDbContext" está sendo especificando porque há mais de 1 contexto
        public AppIdentityDbContext(DbContextOptions<AppIdentityDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            //Sem isso haverá problemas com chave primária (observação da lição 163)
            base.OnModelCreating(builder);
        }
    }
}