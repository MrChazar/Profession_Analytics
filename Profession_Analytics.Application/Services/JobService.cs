using Profession_Analytics.Application.Interfaces;
using Profession_Analytics.Domain.DTO;
using Profession_Analytics.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using Profession_Analytics.Domain.Repositories;

namespace Profession_Analytics.Application.Services;

public class JobService(IJobOfferRepository jobOfferRepository) : IJobService
{


    /// <summary>
    /// Get every information of every job availble
    /// </summary>
    public IEnumerable<JobOffer> GetAllJobs()
    {
        return jobOfferRepository.GetAll();
    }

    /// <summary>
    /// Get a time serie of added jobs
    /// </summary>
    public IEnumerable<JobTimeSeries> GetJobTimeSeries()
    {
        IEnumerable<JobOffer> jobs = jobOfferRepository.GetAll();

        var jobTimeSeries = jobs
            .GroupBy(job => job.publishedAt.ToString("yyyy-MM-dd"))
            .Select(group => new JobTimeSeries
            {
                Date = group.Key,
                Value = group.Select(job => job.slug).Distinct().Count()
            })
            .OrderBy(job => job.Date)
            .ToList();

        return jobTimeSeries;
    }

    /// <summary>
    /// Get a time series of average daily earnings of added jobs
    /// </summary>
    public IEnumerable<JobTimeSeries> GetAverageEarningTimeSeries()
    {
        IEnumerable<JobOffer> jobs = jobOfferRepository.GetAll();

        var jobTimeSeries = jobs
            .GroupBy(job => job.publishedAt.ToString("yyyy-MM-dd"))
            .Select(group => new JobTimeSeries
            {
                Date = group.Key,
                Value = (int)group
                    .Where(job => job.employmentTypes != null)
                    .SelectMany(job => job.employmentTypes)
                    .Where(type => type.from_pln.HasValue && type.to_pln.HasValue)
                    .Select(type => (type.from_pln.Value + type.to_pln.Value) / 2)
                    .DefaultIfEmpty(0)
                    .Average()
            })
            .OrderBy(job => job.Date)
            .ToList();

        return jobTimeSeries;
    }

    /// <summary>
    /// Get a detailed summary of certain IT position that include 
    /// </summary>
    public async Task<IEnumerable<JobStatistic>> CreateStatistics(IEnumerable<string> skill, IEnumerable<string> experienceLevel, IEnumerable<string> workingTime, IEnumerable<string> workplaceType, IEnumerable<string> type)
    {
        IEnumerable<JobOffer> jobs = jobOfferRepository.GetAll();
        var data_filtered = jobs
            .Where(job => job.requiredSkills.Intersect(skill).Any())
            .Where(job => experienceLevel.Any(level => job.experienceLevel.Contains(level)))
            .Where(job => workingTime.Any(level => job.workingTime.Contains(level)))
            .Where(job => workplaceType.Any(level => job.workplaceType.Contains(level)))
            .Where(job => job.employmentTypes.Any(et => type.Contains(et.type)))
            .ToList();

        var data = data_filtered
                .GroupBy(job => job.publishedAt.ToString($"yyyy-MM-dd"))
                .Select(group => new JobStatistic
                {
                    x = group.Key,
                    addedOffers = group.Select(job => job.slug).Distinct().Count(),
                    averageSalary = (int)group
                        .Where(job => job.employmentTypes != null)
                        .SelectMany(job => job.employmentTypes)
                        .Where(type => type.from_pln.HasValue && type.to_pln.HasValue)
                        .Select(type => (type.from_pln.Value + type.to_pln.Value) / 2)
                        .DefaultIfEmpty(0)
                        .Average()
                })
                .OrderBy(job => job.x)
                .ToList();

        return await Task.FromResult(data);
    }
}
