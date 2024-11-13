using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Profession_Analytics.Domain.Repositories;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using Profession_Analytics.Application.Interfaces;
using Profession_Analytics.Application.Services;

namespace Profession_Analytics.Application.Extensions;

public static class ServiceCollectionExtensions
{
    public static void AddApplication(this IServiceCollection services, IConfiguration configuration) 
    {
        services.AddScoped<IJobService, JobService>();
        services.AddScoped<IChartService, ChartService>();
    }
}
