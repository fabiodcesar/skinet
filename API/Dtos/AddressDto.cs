namespace API.Dtos
{
    //Identity - Passo 25: Criando classe DTO para retornar apenas o endereço
    public class AddressDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zipcode { get; set; }
    }
}