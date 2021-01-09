using Core.Entities.Identity;

namespace Core.Interfaces
{
    //Identity - Passo 19: Criando interface
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}