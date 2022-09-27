using System.Collections.Generic;

namespace AppDiagnose.Models
{
    public class Diagnose
    {

        public int DiagnoseId { get; set; }
        public string navn { get; set; }
        public string info { get; set; }
        public string link { get; set; }
        public virtual List<SymptomForDiagnose> symptomer { get; set; }
    }
}