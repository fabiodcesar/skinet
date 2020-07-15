using System.Linq;
using API.Errors;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace API.Extensions
{
    public static class ApplicationServicesExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
            
            services.AddScoped<IProductRepository, ProductRepository>();
            
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