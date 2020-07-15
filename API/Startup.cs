using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using Infrastructure.Data;
using Core.Interfaces;
using AutoMapper;
using API.Helpers;
using API.Middleware;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using API.Errors;

namespace API
{
    public class Startup
    {
        private readonly IConfiguration _config;
        public Startup(IConfiguration config)
        {
            _config = config;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddAutoMapper(typeof(MappingProfiles));
            services.AddControllers();
            services.AddDbContext<StoreContext>(x =>
            {
                x.UseSqlite(_config.GetConnectionString("DefaultConnection"));
            });

            
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
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseMiddleware<ExceptionMiddeware>();
            // This is a default code and it was disabled to use own middelware
            // if (env.IsDevelopment())
            // {
            //     app.UseDeveloperExceptionPage();
            // }

            app.UseStatusCodePagesWithReExecute("/errors/{0}");

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseStaticFiles();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
