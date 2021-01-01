using System.Collections.Generic;

namespace Core.Entities
{
    public class CustomerBasket
    {
        //Necessário construtor sem parâmetros para evitar problemas com Redis
        public CustomerBasket() { }
        public CustomerBasket(int id)
        {
            Id = id;
        }

        public int Id { get; set; }
        public List<BasketItem> Items { get; set; } = new List<BasketItem>();
    }
}