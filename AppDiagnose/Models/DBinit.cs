using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.VisualBasic;
using System.Collections.Generic;

namespace AppDiagnose.Models
{
        public static class DBinit
        {
            public static void Initialize(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<DB>();
                context.Database.EnsureDeleted();
                context.Database.EnsureCreated();

                //DIAGNOSE 1
                var ADHD = new Diagnose
                {
                    navn = "ADHD",
                    info = "????????",
                    link="www.adhd-norge.no"
                };

                var konsentrasjonsvansker = new Symptom
                {
                    navn = "Konsentrasjonsvansker",
                    kategori = "Mentalt",
                };

                var hyperaktivitet = new Symptom
                {
                    navn = "Hyperaktivitet",
                    kategori = "Mentalt",

                };

                var impulsivitet = new Symptom
                {
                    navn = "Impulsivitet",
                    kategori = "Mentalt",
                };
                var konsvansker = new SymptomForDiagnose
                {
                    symptom = konsentrasjonsvansker,
                    diagnose = ADHD
                };
                var hyper = new SymptomForDiagnose
                {
                    symptom = hyperaktivitet,
                    diagnose = ADHD
                };
                var impuls = new SymptomForDiagnose
                {
                    symptom = impulsivitet,
                    diagnose = ADHD
                };
                context.SymptomForDiagnose.Add(konsvansker);
                context.SymptomForDiagnose.Add(hyper);
                context.SymptomForDiagnose.Add(impuls);
                context.Symptomer.Add(konsentrasjonsvansker);
                context.Symptomer.Add(impulsivitet);
                context.Symptomer.Add(hyperaktivitet);                
                context.Diagnoser.Add(ADHD);


                //DIAGNOSE 2
                var Whiplash = new Diagnose
                {
                    navn="Whiplash",
                    info="AUAUAU",
                    link="www.whiplash.no"
                };
                context.Diagnoser.Add(Whiplash);
                var sym1 = new Symptom
                {
                   navn="hodepine",
                   kategori="hode"
                };
                context.Symptomer.Add(sym1);

                var sym2 = new Symptom
                {
                    navn = "nakkestivhet",
                    kategori = "nakke"
                };
                context.Symptomer.Add(sym2);
                var sym3 = new Symptom
                {
                    navn = "skuldersmerter",
                    kategori = "overkropp"
                };
                context.Symptomer.Add(sym3);
                
         
                var sym5 = new Symptom
                {
                    navn = "ryggsmerter",
                    kategori = "rygg"
                };
                context.Symptomer.Add(sym5);
                
                
                var sym7 = new Symptom
                {
                    navn = "svimmelhet",
                    kategori = "mentalt"
                };
                context.Symptomer.Add(sym7);
                var sym8 = new Symptom
                {
                    navn = "øresus",
                    kategori = "øre"
                };
                context.Symptomer.Add(sym8);
                var sym9 = new Symptom
                {
                    navn = "synsforstyrrelser",
                    kategori = "øyne"
                };
                context.Symptomer.Add(sym9);
                var symdig1 = new SymptomForDiagnose
                {
                    diagnose=Whiplash,
                    symptom=sym1
                };
                context.SymptomForDiagnose.Add(symdig1);
                var symdig2 = new SymptomForDiagnose
                {
                    diagnose = Whiplash,
                    symptom = sym2
                };
                context.SymptomForDiagnose.Add(symdig2);
                var symdig3 = new SymptomForDiagnose
                {
                    diagnose = Whiplash,
                    symptom = sym3
                };
                context.SymptomForDiagnose.Add(symdig3);

                var symdig5 = new SymptomForDiagnose
                {
                    diagnose = Whiplash,
                    symptom = sym5
                };
                context.SymptomForDiagnose.Add(symdig5);
                var symdig6 = new SymptomForDiagnose
                {
                    diagnose = Whiplash,
                    symptom = konsentrasjonsvansker
                };
                context.SymptomForDiagnose.Add(symdig6);
                var symdig7 = new SymptomForDiagnose
                {
                    diagnose = Whiplash,
                    symptom = sym7
                };
                context.SymptomForDiagnose.Add(symdig7);
                var symdig8 = new SymptomForDiagnose
                {
                    diagnose = Whiplash,
                    symptom = sym8
                };
                context.SymptomForDiagnose.Add(symdig8);
                var symdig9 = new SymptomForDiagnose
                {
                    diagnose = Whiplash,
                    symptom = sym9
                };
                context.SymptomForDiagnose.Add(symdig9);


                context.SaveChanges();
            }
        }
    }
}
