using MongoDB.Driver;
using Profession_Analytics.Application.Interfaces;
using Profession_Analytics.Domain.DTO;
using Profession_Analytics.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Profession_Analytics.Application.Services
{
    public class ChartService : IChartService
    {
        private readonly IMongoCollection<JobOffer> _jobOffersCollection;

        public ChartService(IMongoClient mongoClient)
        {
            var database = mongoClient.GetDatabase("Job_Analytics");
            _jobOffersCollection = database.GetCollection<JobOffer>("job_offers");
        }

        public IEnumerable<ChartData> GetChartData(string type, string x, string y, string frequency)
        {
            throw new NotImplementedException();
        }
    }
}
