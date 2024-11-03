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

namespace Profession_Analytics.Application.Services
{
    public class JobService : IJobService
    {
        private readonly IMongoCollection<JobOffer> _jobOffersCollection;

        public JobService(IMongoClient mongoClient)
        {
            var database = mongoClient.GetDatabase("Job_Analytics");
            _jobOffersCollection = database.GetCollection<JobOffer>("job_offers");
        }

        /// <summary>
        /// Get every information of every job availble
        /// </summary>
        public IEnumerable<JobOffer> GetAllJobs()
        {
            return _jobOffersCollection.Find(_ => true).ToList();
        }

        /// <summary>
        /// Get a time serie of added jobs
        /// </summary>
        public IEnumerable<JobTimeSeries> GetJobTimeSeries()
        {
            IEnumerable<JobOffer> jobs = _jobOffersCollection.Find(_ => true).ToList();

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
            IEnumerable<JobOffer> jobs = _jobOffersCollection.Find(_ => true).ToList();

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
    }
}
