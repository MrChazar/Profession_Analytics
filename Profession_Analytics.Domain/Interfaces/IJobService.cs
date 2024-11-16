using Profession_Analytics.Domain.DTO;
using Profession_Analytics.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Profession_Analytics.Application.Interfaces;

public interface IJobService
{
     IEnumerable<JobOffer> GetAllJobs();
     IEnumerable<JobTimeSeries> GetJobTimeSeries();
     IEnumerable<JobTimeSeries> GetAverageEarningTimeSeries();

     Task<IEnumerable<JobStatistic>> CreateStatistics(string title, IEnumerable<string> skill, 
        IEnumerable<string> experienceLevel,
        IEnumerable<string> workingtime, 
        IEnumerable<string> workplaceType, 
        IEnumerable<string> type,
        string frequency);
}
