using System.Linq;
using API.Errors;
using Core.Interfaces;
using Infrastructure.Data;
using Infrastructure.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace API.Extensions
{
    public static class ApplicationServicesExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            //Identity - Passo 22: Configurando serviço de token
            services.AddScoped<ITokenService, TokenService>();

            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));            
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped<IBasketRepository, BasketRepository>();
            
             //Use this after AddControllers
            services.Configure<ApiBehaviorOptions>(options => 
            {
                options.InvalidModelStateResponseFactory = actionContext =>
                {
                    //Flattens the error messages into a projected array of strings
                    var errors = actionContext.ModelState
                    .Where(e=> e.Value.Errors.Count > 0)
                    .SelectMany(x =>x.Value.Errors.Select(x=>x.ErrorMessage));

                    //Creates a response object with the error responses
                    var errorResponse = new ApiValidationErrorResponse() {
                        Errors = errors
                    };

                    return new BadRequestObjectResult(errorResponse);
                };
            });

            return services;
        }
    }
}