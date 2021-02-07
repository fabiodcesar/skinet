using System.Linq;
using System.Security.Claims;

namespace API.Extensions
{
    //Criado na lição 214 para facilitar recebimento do e-mail
    public static class ClaimPrincipalExtensions
    {
        public static string RetrieveEmailFromPrincipal(this ClaimsPrincipal user)
        {
            return user?.Claims?.FirstOrDefault(x=> x.Type == ClaimTypes.Email).Value;
        }
    }
}