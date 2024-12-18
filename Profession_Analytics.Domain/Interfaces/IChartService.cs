﻿using Profession_Analytics.Domain.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Profession_Analytics.Application.Interfaces;

public interface IChartService
{
     Task<IEnumerable<LineChartData>> GetLineChartData(string x, string y, string frequency);
     Task<IEnumerable<AreaChartData>> GetAreaChartData(string x, string y, string frequency);
}
