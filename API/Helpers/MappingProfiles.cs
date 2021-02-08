using AutoMapper;
using Core.Entities;
using API.Dtos;
using Core.Entities.OrderAggregate;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Product, ProductToReturnDto>()
            .ForMember(d => d.ProductBrand, o => o.MapFrom(s => s.ProductBrand.Name))
            .ForMember(d => d.ProductType, o => o.MapFrom(s => s.ProductType.Name))
            .ForMember(d => d.PictureUrl, o => o.MapFrom<ProductUrlResolver>());

            //Identity - Passo 26: Mapping Addres to dto and vice-versa
            CreateMap<Core.Entities.OrderAggregate.Address, AddressDto>().ReverseMap();

            CreateMap<CustomerBasketDto, CustomerBasket>();
            CreateMap<BasketItemDto, BasketItem>();

            // Namespace do agregado precisa ser explícito
            CreateMap<AddressDto, Core.Entities.OrderAggregate.Address>();

            CreateMap<Order, OrderToReturnDto>();
            CreateMap<OrderItem, OrderItemDto>();
        }
    }
}