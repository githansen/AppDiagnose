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


                var ADHD = new Diagnose
                {
                    navn = "ADHD",
                    info="????????"
                };

                var konsentrasjonsvansker = new Symptom
                {
                    navn="Konsentrasjonsvansker",
                    kategori="Mentalt",
                };

                var hyperaktivitet = new Symptom
                {
                    navn="Hyperaktivitet",
                    kategori="Mentalt",

                };

                var impulsivitet = new Symptom
                {
                    navn = "Impulsivitet",
                    kategori = "Mentalt",
                };
               var konsvansker = new SymptomForDiagnose
                {
                    symptom = konsentrasjonsvansker,
                    diagnose=ADHD
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
                ADHD.symptomer = new List<SymptomForDiagnose>{konsvansker, hyper, impuls};
                context.Diagnoser.Add(ADHD);
                context.SaveChanges();
                }
            }
        }
}
