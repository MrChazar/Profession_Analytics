using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Profession_Analytics.Domain.DTO
{
    public class AreaChartData
    {
        public string x {  get; set; }
        public List<Tuple<String, int>> y { get; set; }
    }
}
