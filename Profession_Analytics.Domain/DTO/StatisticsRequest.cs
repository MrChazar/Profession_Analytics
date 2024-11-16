using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Profession_Analytics.Domain.DTO;

public class StatisticsRequest
{
    public string Title { get; set; }
    
    public string? Skill { get; set; }
    public string ExperienceLevel { get; set; }
    public string WorkingTime { get; set; }
    public string WorkplaceType { get; set; }
    public string Type { get; set; }
    public string Frequency { get; set; }
}
