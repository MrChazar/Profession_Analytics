using Profession_Analytics.Domain.DTO;
using Profession_Analytics.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Profession_Analytics.Application.Interfaces
{
    public interface IJobService
    {
        public IEnumerable<JobOffer> GetAllJobs();
        public IEnumerable<JobTimeSeries> GetJobTimeSeries();
        public IEnumerable<JobTimeSeries> GetAverageEarningTimeSeries();
        public IEnumerable<ChartData> GetChartData();
    }
}
