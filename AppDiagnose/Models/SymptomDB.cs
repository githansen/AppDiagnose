using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppDiagnose.Models
{
    public class SymptomDB :DbContext
    {
        public SymptomDB (DbContextOptions<SymptomDB> options) : base(options)
        {
            Database.EnsureCreated();
        }
        public DbSet<Symptom> Symptomer { get; set; }
    }
}
