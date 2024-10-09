using backend.Domain.Entities;
using MongoDB.Driver;
using Microsoft.AspNetCore.Mvc;
using backend.Application.Interfaces;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class JobController : ControllerBase
    {

        private IJobService _jobService;
        public JobController(IJobService jobService)
        {
            _jobService = jobService;
        }

        [HttpGet]
        public IEnumerable<JobOffer> GetJobOffers()
        {
            return _jobService.GetAllJobs();
        }
    }
}
