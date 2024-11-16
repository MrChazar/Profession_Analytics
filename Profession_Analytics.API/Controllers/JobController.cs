using Microsoft.AspNetCore.Mvc;
using Profession_Analytics.Application.Interfaces;
using Profession_Analytics.Domain.DTO;
using Profession_Analytics.Domain.Entities;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Profession_Analytics.API.Controllers;

[ApiController]
[Route("[controller]")]
public class JobController(IJobService _jobService) : Controller
{

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
    [Route("CreateStatistic")]
    public async Task<IActionResult> Statistics([FromQuery] StatisticsRequest request)
    {
        var response = await _jobService.CreateStatistics(
            request.Title,
            request.Skill?.Split(","),
            request.ExperienceLevel?.Split(","),
            request.WorkingTime?.Split(","),
            request.WorkplaceType?.Split(","),
            request.Type?.Split(","),
            request.Frequency
        );

        if (response == null)
            return NotFound();

        return Ok(response);
    }

}
