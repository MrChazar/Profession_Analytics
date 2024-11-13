using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;

namespace Profession_Analytics.Domain.Entities;

[BsonIgnoreExtraElements]
public class JobOffer
{
    [BsonRepresentation(BsonType.ObjectId)]
    public string _id { get; set; }

    public string slug { get; set; }
    public List<string> requiredSkills { get; set; }

    public string title { get; set; }
    public string workplaceType { get; set; }
    public string workingTime { get; set; }
    public string experienceLevel { get; set; }
    public List<employmentType> employmentTypes { get; set; }
    public int categoryId { get; set; }
    public List<location> multilocation { get; set; }
    public string city { get; set; }
    public string street { get; set; }
    public string latitude { get; set; }
    public string longitude { get; set; }
    public bool remoteInterview { get; set; }
    public string companyName { get; set; }
    public DateTime publishedAt { get; set; }
    public bool openToHireUkrainians { get; set; }
}

[BsonIgnoreExtraElements]
public class employmentType
{
    public string type { get; set; }
    public bool gross { get; set; }
    public decimal? to_pln { get; set; }
    public string? currency { get; set; }
    public decimal? from_pln { get; set; }
}

public class location
{
    public string city { get; set; }
    public string slug { get; set; }
    public string street { get; set; }
    public decimal latitude { get; set; }
    public decimal longitude { get; set; }
}
