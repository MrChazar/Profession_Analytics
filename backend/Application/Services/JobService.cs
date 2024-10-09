using backend.Application.Interfaces;
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

        public IEnumerable<JobOffer> GetAllJobs() 
        {
            return _jobOffersCollection.Find(_ => true).ToList();
        }
    }
}
