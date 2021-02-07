using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Interfaces;

namespace Infrastructure.Services
{
    public class OrderService : IOrderService
    {
        private readonly IGenericRepository<Order> _orderRepo;
        private readonly IGenericRepository<DeliveryMethod> _dmRepo;
        private readonly IGenericRepository<Product> _productRepo;
        private readonly IBasketRepository _basketRepo;

        public OrderService(IGenericRepository<Order> orderRepo, IGenericRepository<DeliveryMethod> dmRepo,
        IGenericRepository<Product> productRepo, IBasketRepository basketRepo)
        {
            _orderRepo = orderRepo;
            _dmRepo = dmRepo;
            _productRepo = productRepo;
            _basketRepo = basketRepo;
        }

        public async Task<Order> CreateOrderAsync(string buyerEmail, int deliveryMethodId, string basketId, Address shippingAddress)
        {
            // Create order steps:

            // 1) get basket from the repo
            var basket = await _basketRepo.GetBasketAsync(basketId);

            // 2) get items from the repo
            var items = new List<OrderItem>();
            foreach (var item in basket.Items)
            {
                var productItem = await _productRepo.GetByIdAsync(item.Id);
                var itemOrdered = new ProductItemOrdered(productItemId: productItem.Id, productName: item.ProductName, pictureUrl: item.PictureUrl);
                var orderItem = new OrderItem(itemOrdered: itemOrdered, price: productItem.Price, quantity: item.Quantity);
                items.Add(orderItem);
            }

            // 3) get delivery method from the repo
            var deliveryMethod = await _dmRepo.GetByIdAsync(deliveryMethodId);

            // 4) calc subtotal
            var subtotal = items.Sum(x => x.Price * x.Quantity);

            // 5) create order
            var order = new Order(
                orderItems: items,
                buyerEmail: buyerEmail,
                shipToAddress: shippingAddress,
                deliveryMethod: deliveryMethod,
                subtotal: subtotal);

            // TODO: 6) save to db

            // 7) return order            

            return order;
        }

        public Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync()
        {
            throw new System.NotImplementedException();
        }

        public Task<Order> GetOrderByIdAsync(int id, string buyerEmail)
        {
            throw new System.NotImplementedException();
        }

        public Task<IReadOnlyList<Order>> GetOrderForUserAsync(string buyerEmail)
        {
            throw new System.NotImplementedException();
        }
    }
}