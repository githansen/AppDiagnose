using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MinDiagnose.Models
{
    public class Kategori
    {
       
        public int Id { get; set; }  
        public string navn { get; set; }
        public virtual List<Symptom> symptomer { get; set; }

    }
}
