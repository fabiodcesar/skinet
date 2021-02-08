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
        private readonly IBasketRepository _basketRepo;
        private readonly IUnitOfWork _unitOfWork;

        public OrderService(IBasketRepository basketRepo, IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
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
                var productItem = await _unitOfWork.Repository<Product>().GetByIdAsync(item.Id);
                var itemOrdered = new ProductItemOrdered(productItemId: productItem.Id, productName: item.ProductName, pictureUrl: item.PictureUrl);
                var orderItem = new OrderItem(itemOrdered: itemOrdered, price: productItem.Price, quantity: item.Quantity);
                items.Add(orderItem);
            }

            // 3) get delivery method from the repo
            var deliveryMethod = await _unitOfWork.Repository<DeliveryMethod>().GetByIdAsync(deliveryMethodId);

            // 4) calc subtotal
            var subtotal = items.Sum(x => x.Price * x.Quantity);

            // 5) create order
            var order = new Order(
                orderItems: items,
                buyerEmail: buyerEmail,
                shipToAddress: shippingAddress,
                deliveryMethod: deliveryMethod,
                subtotal: subtotal);

            _unitOfWork.Repository<Order>().Add(order);

            //6) save to db
            var result = await _unitOfWork.Complete();

            // 6.1) Return null if failst to save to the database
            if (result <= 0)
                return null;

            // 7) delete basket
            await _basketRepo.DeleteBasketAsync(basketId);

            // 8) return order
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