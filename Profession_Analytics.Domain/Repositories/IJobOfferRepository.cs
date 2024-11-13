using Profession_Analytics.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Profession_Analytics.Domain.Repositories;

public interface IJobOfferRepository
{
    IEnumerable<JobOffer> GetAll();
}
