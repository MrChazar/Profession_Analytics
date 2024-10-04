using MongoDB.Bson;
using MongoDB.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace backend.Domain.Entities
{
    [Collection("JustJoinIT_Jobs")]
    public class JobOffer
    {
        public string Slug { get; set; }
        public string Title { get; set; }
        public List<string> RequiredSkills { get; set; }
        public List<string> NiceToHaveSkills { get; set; }
        public string WorkplaceType { get; set; }
        public string WorkingTime { get; set; }
        public string ExperienceLevel { get; set; }
        public List<EmploymentType> EmploymentTypes { get; set; }
        public int CategoryId { get; set; }
        public List<Location> Multilocation { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        public bool RemoteInterview { get; set; }
        public string CompanyName { get; set; }
        public string CompanyLogoThumbUrl { get; set; }
        public DateTime PublishedAt { get; set; }
        public bool OpenToHireUkrainians { get; set; }
    }

    public class EmploymentType
    {
        public decimal To { get; set; }
        public decimal From { get; set; }
        public string Type { get; set; }
        public bool Gross { get; set; }
        public decimal ToChf { get; set; }
        public decimal ToEur { get; set; }
        public decimal ToGbp { get; set; }
        public decimal ToPln { get; set; }
        public decimal ToUsd { get; set; }
        public string Currency { get; set; }
        public decimal FromChf { get; set; }
        public decimal FromEur { get; set; }
        public decimal FromGbp { get; set; }
        public decimal FromPln { get; set; }
        public decimal FromUsd { get; set; }
    }

    public class Location
    {
        public string City { get; set; }
        public string Slug { get; set; }
        public string Street { get; set; }
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
    }

}


