﻿using Microsoft.AspNetCore.Mvc;
using Profession_Analytics.Application.Interfaces;
using Profession_Analytics.Application.Services;

namespace Profession_Analytics.API.Controllers
{
    public class ChartController : Controller
    {
        private IChartService _chartService;
        public ChartController(IChartService jobService)
        {
            _chartService = jobService;
        }


        [HttpGet]
        [Route("Create")]
        public IActionResult Create([FromQuery] string type, 
            [FromQuery] string x, [FromQuery] string y, [FromQuery] string frequency)
        {
            if(type == "Lined") 
            {
                return Ok(_chartService.GetLineChartData(x, y, frequency));
            }
            if( type == "Area") 
            {
                return Ok(_chartService.GetAreaChartData(x, y, frequency));
            }
            return Ok("dupa");
        }


    }
}
