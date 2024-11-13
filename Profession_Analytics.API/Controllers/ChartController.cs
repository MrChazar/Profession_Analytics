using Microsoft.AspNetCore.Mvc;
using Profession_Analytics.Application.Interfaces;
using Profession_Analytics.Application.Services;

namespace Profession_Analytics.API.Controllers;

[ApiController]
[Route("[controller]")]
public class ChartController(IChartService _chartService) : Controller
{

    [HttpGet]
    [Route("Create")]
    public async Task<IActionResult> Create([FromQuery] string type, 
        [FromQuery] string x, [FromQuery] string y, [FromQuery] string frequency)
    {
        if(type == "Lined") 
        {
            var response = await _chartService.GetLineChartData(x, y, frequency);
            if(response == null)
                return NotFound();
            return Ok(response);
        }
        if( type == "Area") 
        {
            var response = await _chartService.GetAreaChartData(x, y, frequency);
            if (response == null)
                return NotFound();
            return Ok(response);
        }

        return BadRequest("Żądanie błędne");
    }
}
