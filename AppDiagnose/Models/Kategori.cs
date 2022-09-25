using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AppDiagnose.Models
{
    public class Kategori
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string navn { get; set; }
        public virtual List<Symptom> symptomer { get; set; }

    }
}
