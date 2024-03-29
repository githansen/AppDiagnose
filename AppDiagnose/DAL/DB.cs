﻿using MinDiagnose.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MinDiagnose.DAL
{
    public class Brukere
    {
        public int Id { get; set; }
        public string Brukernavn { get; set; }
        public byte[] Passord { get; set; }
        public byte[] Salt { get; set; }
    }
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
        public virtual DbSet<dbLog> dbLog { get; set; }
        public virtual DbSet<Brukere> brukere { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // må importere pakken Microsoft.EntityFrameworkCore.Proxies
            // og legge til"viritual" på de attriuttene som ønskes å lastes automatisk (LazyLoading)
            optionsBuilder.UseLazyLoadingProxies();
        }

       
    }
}
