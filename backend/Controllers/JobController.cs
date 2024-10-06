using backend.Domain.Entities;
using MongoDB.Driver;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class JobController : ControllerBase
    {
        private readonly IMongoCollection<JobOffer> _jobOffersCollection;

        public JobController(IMongoClient mongoClient)
        {
            var database = mongoClient.GetDatabase("Job_Analytics");  
            _jobOffersCollection = database.GetCollection<JobOffer>("job_offers"); 
        }

        [HttpGet]
        public IEnumerable<JobOffer> GetJobOffers()
        {
            var a = _jobOffersCollection.Find(_ => true).ToList();

            return _jobOffersCollection.Find(_ => true).ToList();  
        }
    }
}
