namespace Core.Entities.OrderAggregate
{
    public class OrderItem : BaseEntity
    {
        public OrderItem() { }

        public OrderItem(ProductItemOrdered itemOrdered, decimal pricce, int quantity)
        {
            ItemOrdered = itemOrdered;
            Pricce = pricce;
            Quantity = quantity;
        }

        public ProductItemOrdered ItemOrdered { get; set; }
        public decimal Pricce { get; set; }
        public int Quantity { get; set; }
    }
}