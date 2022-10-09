using AppDiagnose.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AppDiagnose.DAL
{

    public class DB : DbContext
    {
        public DB(DbContextOptions<DB> options) : base(options)
        {
            Database.EnsureCreated();

        }


        public virtual DbSet<Diagnose> Diagnoser { get; set; }
        public virtual DbSet<Symptom> Symptomer { get; set; }
        public virtual DbSet<SymptomForDiagnose> SymptomForDiagnose { get; set; }

        public virtual DbSet<Kategori> kategorier { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // må importere pakken Microsoft.EntityFrameworkCore.Proxies
            // og legge til"viritual" på de attriuttene som ønskes å lastes automatisk (LazyLoading)
            optionsBuilder.UseLazyLoadingProxies();
        }

       
    }
}
