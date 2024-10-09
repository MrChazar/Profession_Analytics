using backend.Domain.Entities;
namespace backend.Application.Interfaces
{
    public interface IJobService
    {
        public IEnumerable<JobOffer> GetAllJobs();
    }
}
