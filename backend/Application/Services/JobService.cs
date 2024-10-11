using backend.Application.Interfaces;
using backend.Domain.DTOs;
using backend.Domain.Entities;
using MongoDB.Driver;
namespace backend.Application.Services 
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
                .ToList();

            return jobTimeSeries;
        }

    }
}
