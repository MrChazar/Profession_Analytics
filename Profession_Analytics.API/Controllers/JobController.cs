using Microsoft.AspNetCore.Mvc;
using Profession_Analytics.Application.Interfaces;
using Profession_Analytics.Domain.DTO;
using Profession_Analytics.Domain.Entities;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Profession_Analytics.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class JobController : Controller
    {
        private IJobService _jobService;
        public JobController(IJobService jobService)
        {
            _jobService = jobService;
        }

        [HttpGet]
        [Route("Jobs")]
        public IActionResult JobOffers()
        {
            return Ok(_jobService.GetAllJobs());
        }

        [HttpGet]
        [Route("JobTimeSeries")]
        public IActionResult JobTimeSeries()
        {
            return Ok(_jobService.GetJobTimeSeries());
        }

        [HttpGet]
        [Route("DailyAverageEarning")]
        public IActionResult AverageEarningTimeSeries()
        {
            return Ok(_jobService.GetAverageEarningTimeSeries());
        }

        [HttpGet]
        [Route("Create")]
        public async Task<IActionResult> Statistics([FromQuery] string title, [FromQuery]  List<string> experienceLevel, [FromQuery] List<string> workingTime, [FromQuery] List<string> workplaceType, [FromQuery] List<string> type) 
        {
            return Ok(await _jobService.CreateStatistics(title, experienceLevel, workingTime, workplaceType, type));
        }

    }
}
