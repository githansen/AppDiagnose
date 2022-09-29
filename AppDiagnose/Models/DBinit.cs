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

                //Kategori 1
                var mentalt = new Kategori
                {
                    navn = "mentalt",
                };
                context.kategorier.Add(mentalt);

                //Kategori 2
                var hode = new Kategori
                {
                    navn = "hode"
                };
                context.kategorier.Add(hode);

                //Kategori 3
                var rygg = new Kategori
                {
                    navn = "rygg"
                };
                context.kategorier.Add(rygg);

                //Symptom 1
                var konsentrasjonsvansker = new Symptom
                {
                    navn = "Konsentrasjonsvansker",
                    kategori = mentalt
                };

                //Symptom 2
                var hyperaktivitet = new Symptom
                {
                    navn = "Hyperaktivitet",
                    kategori = mentalt

                };
                //Symptom 3
                var impulsivitet = new Symptom
                {
                    navn = "Impulsivitet",
                    kategori = mentalt
                };
                //Symptom for diagnose 1
                var konsvansker = new SymptomForDiagnose
                {
                    symptom = konsentrasjonsvansker,
                    diagnose = ADHD
                };
                //Symptom for diagnose 2
                var hyper = new SymptomForDiagnose
                {
                    symptom = hyperaktivitet,
                    diagnose = ADHD
                };
                //Symptom for diagnose 3
                var impuls = new SymptomForDiagnose
                {
                    symptom = impulsivitet,
                    diagnose = ADHD
                };

                //Lagrer i databasen
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

                //Symptom 4
                var sym1 = new Symptom
                {
                   navn="hodepine",
                    kategori = hode
                };
                context.Symptomer.Add(sym1);


                //Symptom 5
                var sym2 = new Symptom
                {
                    navn = "nakkestivhet",
                    kategori = mentalt
                };
                context.Symptomer.Add(sym2);
                //Symptom 6
                var sym3 = new Symptom
                {
                    navn = "skuldersmerter",
                    kategori = mentalt
                };
                context.Symptomer.Add(sym3);

                //Symptom 7
                var sym5 = new Symptom
                {
                    navn = "ryggsmerter",
                    kategori = rygg
                };
                context.Symptomer.Add(sym5);

                //Symptom 8
                var sym7 = new Symptom
                {
                    navn = "svimmelhet",
                    kategori = mentalt
                };
                context.Symptomer.Add(sym7);
                //Symptom 9
                var sym8 = new Symptom
                {
                    navn = "øresus",
                    kategori = hode
                };
                context.Symptomer.Add(sym8);

                //Symptom 10
                var sym9 = new Symptom
                {
                    navn = "synsforstyrrelser",
                    kategori = hode
                };
                context.Symptomer.Add(sym9);

                //Symptom for diagnose 4
                var symdig1 = new SymptomForDiagnose
                {
                    diagnose=Whiplash,
                    symptom=sym1
                };
                context.SymptomForDiagnose.Add(symdig1);
                //Symptom for diagnose 5
                var symdig2 = new SymptomForDiagnose
                {
                    diagnose = Whiplash,
                    symptom = sym2
                };
                context.SymptomForDiagnose.Add(symdig2);
                //Symptom for diagnose 6
                var symdig3 = new SymptomForDiagnose
                {
                    diagnose = Whiplash,
                    symptom = sym3
                };
                context.SymptomForDiagnose.Add(symdig3);

                //Symptom for diagnose 7
                var symdig5 = new SymptomForDiagnose
                {
                    diagnose = Whiplash,
                    symptom = sym5
                };
                context.SymptomForDiagnose.Add(symdig5);

                //Symptom for diagnose 8
                var symdig6 = new SymptomForDiagnose
                {
                    diagnose = Whiplash,
                    symptom = konsentrasjonsvansker
                };
                context.SymptomForDiagnose.Add(symdig6);
                //Symptom for diagnose 9
                var symdig7 = new SymptomForDiagnose
                {
                    diagnose = Whiplash,
                    symptom = sym7
                };
                context.SymptomForDiagnose.Add(symdig7);

                //Symptom for diagnose 10
                var symdig8 = new SymptomForDiagnose
                {
                    diagnose = Whiplash,
                    symptom = sym8
                };
                context.SymptomForDiagnose.Add(symdig8);
                //Symptom for diagnose 11
                var symdig9 = new SymptomForDiagnose
                {
                    diagnose = Whiplash,
                    symptom = sym9
                };
                context.SymptomForDiagnose.Add(symdig9);

                //Lagrer endringer
                context.SaveChanges();
            }
        }
    }
}
