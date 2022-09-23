using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppDiagnose.Models
{
    public class DB :DbContext
    {
        public DB (DbContextOptions<DB> options) : base(options)
        {
            Database.EnsureCreated();
        }
        public DbSet<Symptom> Symptomer { get; set; }
        public DbSet<Diagnose> Diagnoser { get; set; }
        public DbSet<DiagnoseSymptomRel> DiagnoseSymptomRels { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLazyLoadingProxies();
        }
    }
}
