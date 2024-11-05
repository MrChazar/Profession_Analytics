﻿using MongoDB.Driver;
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

        /// <summary>
        /// Get a data for specific type of chart
        /// </summary>
        public IEnumerable<ChartData> GetChartData(string type, string x, string y, string frequency)
        {
            IEnumerable<JobOffer> offers = _jobOffersCollection.Find(_ => true).ToList();
            List<ChartData> data = new List<ChartData>();
            switch (type) 
            {
                case "Lined":
                        if (x == "publishedAt" && y == "slug") 
                        {
                            data = offers
                            .GroupBy(job => job.publishedAt.ToString($"{frequency}"))
                            .Select(group => new ChartData
                            {
                                x = group.Key,
                                y = group.Select(job => job.slug).Distinct().Count()
                            })
                            .OrderBy(job => job.x)
                            .ToList();
                        }
                        if( x == "publishedAt" && y == "employmentTypes") 
                        {
                             data = offers
                            .GroupBy(job => job.publishedAt.ToString($"{frequency}"))
                            .Select(group => new ChartData
                            {
                                x = group.Key,
                                y = (int)group
                                    .Where(job => job.employmentTypes != null)
                                    .SelectMany(job => job.employmentTypes)
                                    .Where(type => type.from_pln.HasValue && type.to_pln.HasValue)
                                    .Select(type => (type.from_pln.Value + type.to_pln.Value) / 2)
                                    .DefaultIfEmpty(0)
                                    .Average()
                            })
                            .OrderBy(job => job.x)
                            .ToList();
                    }
                    break;
                case "Area":
                    if(x == "publishedAt" && y == "experienceLevel") 
                    {
                        data = offers
                            .GroupBy(job => job.publishedAt.ToString($"{frequency}"))
                            .Select(group => new ChartData
                            {
                                x = group.Key,
                                y = (int)group
                                    .Where(job => job.employmentTypes != null)
                                    .SelectMany(job => job.employmentTypes)
                                    .Where(type => type.from_pln.HasValue && type.to_pln.HasValue)
                                    .Select(type => (type.from_pln.Value + type.to_pln.Value) / 2)
                                    .DefaultIfEmpty(0)
                                    .Average()
                            })
                            .OrderBy(job => job.x)
                            .ToList();
                    }
                    break;
            }
           

            return data;
        }
    }
}