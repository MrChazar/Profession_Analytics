using Microsoft.Extensions.DependencyInjection;
using Profession_Analytics.Domain.Repositories;
using Profession_Analytics.Infrastructure.Repositories;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace Profession_Analytics.Infrastructure.Extensions;

public static class ServiceCollectionExtensions
{
    public static void AddInfrastructure(this IServiceCollection services, IConfiguration configuration) 
    {
        services.AddSingleton<IMongoClient>(s =>
        {
            return new MongoClient("mongodb://localhost:27017/Job_Analytics");
        });
        services.AddScoped<IJobOfferRepository, JobOfferRepository>();
    }
}
