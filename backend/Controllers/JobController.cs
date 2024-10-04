using backend.Domain.Entities;
using backend.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class JobController : ControllerBase
    {
        private readonly DatabaseContext _dbContext;
        private readonly ILogger<JobController> _logger;

        public JobController(ILogger<JobController> logger, DatabaseContext dbContext)
        {
            _logger = logger;
            _dbContext = dbContext;
        }

        [HttpGet]
        public IEnumerable<JobOffer> GetJobOffers()
        {
            // Pobieranie wszystkich ofert pracy z MongoDB
            return _dbContext.JobOffers.ToList();
        }
    }
}
