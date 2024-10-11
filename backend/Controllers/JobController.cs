using backend.Domain.Entities;
using MongoDB.Driver;
using Microsoft.AspNetCore.Mvc;
using backend.Application.Interfaces;
using backend.Domain.DTOs;

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
        [Route("Jobs")]
        public IEnumerable<JobOffer> JobOffers()
        {
            return _jobService.GetAllJobs();
        }

        [HttpGet]
        [Route("JobTimeSeries")]
        public IEnumerable<JobTimeSeries> JobTimeSeries() 
        {
            return _jobService.GetJobTimeSeries();
        } 
    }
}
