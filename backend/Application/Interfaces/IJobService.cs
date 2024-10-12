using backend.Domain.DTOs;
using backend.Domain.Entities;
namespace backend.Application.Interfaces
{
    public interface IJobService
    {
        public IEnumerable<JobOffer> GetAllJobs();
        public IEnumerable<JobTimeSeries> GetJobTimeSeries();
        public IEnumerable<JobTimeSeries> GetAverageEarningTimeSeries();
    }
}
