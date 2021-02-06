namespace Core.Entities.OrderAggregate
{
    public class Address
    {
        public Address() 
        { 

        }

        public Address(int id, string firstName, string lastName, string street, string city, string state, string zipcode)
        {
            Id = id;
            FirstName = firstName;
            LastName = lastName;
            Street = street;
            City = city;
            State = state;
            Zipcode = zipcode;
        }

        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zipcode { get; set; }
    }
}