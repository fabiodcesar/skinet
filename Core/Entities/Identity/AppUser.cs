using Microsoft.AspNetCore.Identity;

namespace Core.Entities.Identity
{
    //Identity (Section 15) - Passo 1: Nova classe herdada de "IdentityUser"
    public class AppUser: IdentityUser
    {
        //Identity - Passo 2: Criando propriedades
        public string DisplayName { get; set; }
        public Address Address { get; set; }
    }
}