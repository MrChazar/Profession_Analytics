using MongoDB.Driver;
using Profession_Analytics.Domain.Entities;
using Profession_Analytics.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Profession_Analytics.Infrastructure.Repositories;

public class JobOfferRepository : IJobOfferRepository
{
    private readonly IMongoCollection<JobOffer> _jobOffersCollection;

    public JobOfferRepository(IMongoClient mongoClient)
    {
        var database = mongoClient.GetDatabase("Job_Analytics");
        _jobOffersCollection = database.GetCollection<JobOffer>("job_offers");
    }

    public IEnumerable<JobOffer> GetAll()
    {
        return (_jobOffersCollection.Find(_ => true).ToList());
    }
}
