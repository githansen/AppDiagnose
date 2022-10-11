using System.ComponentModel.DataAnnotations.Schema;

namespace MinDiagnose.Models
{
    public class SymptomForDiagnose
    {
        
        public int Id { get; set; }
        public virtual Diagnose diagnose { get; set; }
        public virtual Symptom symptom { get; set; }
    }
}
