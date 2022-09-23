using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppDiagnose.Models
{
    public class DiagnoseSymptomRel
    {
        public int id { get; set; }
        public int symptomId { get; set; }
        public int diagnoseId { get; set; }
    }
}