using System.ComponentModel.DataAnnotations;
using System;

namespace MinDiagnose.Models
{
    public class Bruker
    {
        public int Id { get; set; }
        // Brukt kode fra forelesning om innlogging
        [RegularExpression(@"^[a-zA-ZæøåÆØÅ. \-]{2,20}$")]
        public String Brukernavn { get; set; }
        public string Passord { get; set; }
    }
}
