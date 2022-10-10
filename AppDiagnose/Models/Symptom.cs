using System.Collections.Generic;

namespace AppDiagnose.Models
{
    public class Symptom
    {
        public int SymptomId { get; set; }
        public string navn { get; set; }
        public virtual Kategori kategori { get; set; }
    }
}
