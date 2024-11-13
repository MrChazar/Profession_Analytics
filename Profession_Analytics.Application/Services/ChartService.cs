using MongoDB.Driver;
using Profession_Analytics.Application.Interfaces;
using Profession_Analytics.Domain.DTO;
using Profession_Analytics.Domain.Entities;
using Profession_Analytics.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Profession_Analytics.Application.Services;

public class ChartService(IJobOfferRepository jobOfferRepository) : IChartService
{

    /// <summary>
    /// Get a data for Area Chart
    /// </summary>
    public async Task<IEnumerable<AreaChartData>> GetAreaChartData(string x, string y, string frequency)
    {
        IEnumerable<JobOffer> offers = jobOfferRepository.GetAll();
        List<AreaChartData> data = new List<AreaChartData>();
        if (x == "publishedAt" && y == "experienceLevel")
        {
            data = offers
                .GroupBy(job => job.publishedAt.ToString(frequency)) 
                .Select(group => new AreaChartData
                {
                    x = group.Key,
                    y = group
                        .Where(job => !string.IsNullOrEmpty(job.experienceLevel)) 
                        .GroupBy(job => job.experienceLevel) 
                        .Select(subGroup => new Tuple<string, int>(
                            subGroup.Key, 
                            subGroup.Count() 
                        ))
                        .ToList()
                })
                .OrderBy(job => job.x)
                .ToList();
        }
        else if (x == "publishedAt" && y == "city")
        {
            data = offers
                .GroupBy(job => job.publishedAt.ToString(frequency))
                .Select(group => new AreaChartData
                {
                    x = group.Key,
                    y = group
                        .Where(job => !string.IsNullOrEmpty(job.city))
                        .GroupBy(job => job.city)
                        .Select(subGroup => new Tuple<string, int>(
                            subGroup.Key,
                            subGroup.Count()
                        ))
                        .ToList()
                })
                .OrderBy(job => job.x)
                .ToList();
        }
        else if (x == "publishedAt" && y == "workplaceType")
        {
            data = offers
                .GroupBy(job => job.publishedAt.ToString(frequency))
                .Select(group => new AreaChartData
                {
                    x = group.Key,
                    y = group
                        .Where(job => !string.IsNullOrEmpty(job.workplaceType))
                        .GroupBy(job => job.workplaceType)
                        .Select(subGroup => new Tuple<string, int>(
                            subGroup.Key,
                            subGroup.Count()
                        ))
                        .ToList()
                })
                .OrderBy(job => job.x)
                .ToList();
        }
        else if (x == "publishedAt" && y == "remoteInterview")
        {
            data = offers
                .GroupBy(job => job.publishedAt.ToString(frequency))
                .Select(group => new AreaChartData
                {
                    x = group.Key,
                    y = group
                        .Where(job => !string.IsNullOrEmpty(job.remoteInterview.ToString()))
                        .GroupBy(job => job.remoteInterview.ToString())
                        .Select(subGroup => new Tuple<string, int>(
                            subGroup.Key,
                            subGroup.Count()
                        ))
                        .ToList()
                })
                .OrderBy(job => job.x)
                .ToList();
        }
        else if (x == "publishedAt" && y == "openToHireUkrainians")
        {
            data = offers
                .GroupBy(job => job.publishedAt.ToString(frequency))
                .Select(group => new AreaChartData
                {
                    x = group.Key,
                    y = group
                        .Where(job => !string.IsNullOrEmpty(job.openToHireUkrainians.ToString()))
                        .GroupBy(job => job.openToHireUkrainians.ToString())
                        .Select(subGroup => new Tuple<string, int>(
                            subGroup.Key,
                            subGroup.Count()
                        ))
                        .ToList()
                })
                .OrderBy(job => job.x)
                .ToList();
        }
        else if (x == "publishedAt" && y == "employmentType")
        {
            data = offers
                .GroupBy(job => job.publishedAt.ToString(frequency))
                .Select(group => new AreaChartData
                {
                    x = group.Key,
                    y = group
                        .Where(job => job.employmentTypes != null && job.employmentTypes.Any()) // Check for null or empty list
                        .SelectMany(job => job.employmentTypes)
                        .GroupBy(type => type.type) 
                        .Select(subGroup => new Tuple<string, int>(
                            subGroup.Key,
                            subGroup.Count()
                        ))
                        .ToList()
                })
                .OrderBy(job => job.x)
                .ToList();
        }
        else if (x == "publishedAt" && y == "workingTime")
        {
            data = offers
                 .GroupBy(job => job.publishedAt.ToString(frequency))
                 .Select(group => new AreaChartData
                 {
                     x = group.Key,
                     y = group
                         .Where(job => !string.IsNullOrEmpty(job.workingTime))
                         .GroupBy(job => job.workingTime)
                         .Select(subGroup => new Tuple<string, int>(
                             subGroup.Key,
                             subGroup.Count()
                         ))
                         .ToList()
                 })
                 .OrderBy(job => job.x)
                 .ToList();
        }

        return await Task.FromResult(data);
    }


    /// <summary>
    /// Get a data for Line Chart
    /// </summary>
    public async Task<IEnumerable<LineChartData>> GetLineChartData(string x, string y, string frequency)
    {
        IEnumerable<JobOffer> offers = jobOfferRepository.GetAll();
        List<LineChartData> data = new List<LineChartData>();
        if (x == "publishedAt" && y == "slug") 
        {
            data = offers
            .GroupBy(job => job.publishedAt.ToString($"{frequency}"))
            .Select(group => new LineChartData
            {
                x = group.Key,
                y = group.Select(job => job.slug).Distinct().Count()
            })
            .OrderBy(job => job.x)
            .ToList();
        }
        else if (x == "publishedAt" && y == "employmentTypes")
        {
            data = offers
           .GroupBy(job => job.publishedAt.ToString($"{frequency}"))
           .Select(group => new LineChartData
           {
               x = group.Key,
               y = (int)group
                   .Where(job => job.employmentTypes != null)
                   .SelectMany(job => job.employmentTypes)
                   .Where(type => type.from_pln.HasValue && type.to_pln.HasValue)
                   .Select(type => (type.from_pln.Value + type.to_pln.Value) / 2)
                   .DefaultIfEmpty(0)
                   .Average()
           })
           .OrderBy(job => job.x)
           .ToList();
        }
        return await Task.FromResult(data);
    }
}
