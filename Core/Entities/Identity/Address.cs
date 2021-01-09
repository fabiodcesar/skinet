using System.ComponentModel.DataAnnotations;

namespace Core.Entities.Identity
{
    //Identity - Passo 3: Criando classe Address para armazenar endereço do usuário
    public class Address
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zipcode { get; set; }

        //Observação do curso: The AppUserId is a string which means it will be defined as a nullable in our Database.
        //This means instead of overwriting the address each update will create a new row in the Address table.
        //To avoid this please add the [Required] attribute to the AppUserId property
        [Required]
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
    }
}