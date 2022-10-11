using System.Collections.Generic;

namespace MinDiagnose.Models
{
    public class Data
    {
        public int symptomId { get; set; }
        public string kategori { get; set;}

        public string navn { get; set; }
        
        public string[] symptomer { get; set; }
    }
}
