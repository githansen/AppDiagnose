using AppDiagnose.Models;
using Castle.DynamicProxy.Generators.Emitters.SimpleAST;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppDiagnose.DAL
{
    public class Repository : IRepository
    {
        private readonly DB _db;

        public Repository(DB db)
        {
            _db = db;
        }

        public async Task<List<Diagnose>> hentalleDiagnoser()
        {
            List<Diagnose> diagnoseList = await _db.Diagnoser.Select(k => new Diagnose
            {
                DiagnoseId = k.DiagnoseId,
                navn = k.navn,
                info = k.info,
                symptomer = k.symptomer,
                link = k.link
            }).ToListAsync();


            //Pga databasestrukturen vil man få en 'loop' med objekter inni objekter, dette fjerner unødvendig data
            foreach (var i in diagnoseList)
            {

                foreach (var j in i.symptomer)
                {
                    j.diagnose.navn = null;
                    j.diagnose.symptomer = null;
                    j.diagnose.info = null;
                    j.diagnose.link = null;
                }
            }




            return diagnoseList;
        }

        public async Task<List<Symptom>> hentalleSymptomer()
        {
            List<Symptom> s = await _db.Symptomer.Select(k => new Symptom
            {
                SymptomId = k.SymptomId,
                navn = k.navn,
                kategori = k.kategori,
                diagnoser = k.diagnoser
            }).ToListAsync();



            //Pga databasestrukturen vil man få en 'loop' med objekter inni objekter, dette fjerner unødvendig data
            foreach (var i in s)
            {
                foreach (var j in i.diagnoser)
                {
                    j.symptom.diagnoser = null;
                    j.symptom.navn = "";
                    j.symptom.kategori = null;
                };
            }

            return s;
        }
        public async Task<List<Kategori>> HentAlleKategorier()
        {
            List<Kategori> liste = await _db.kategorier.Select(k => new Kategori
            {
                navn= k.navn,
                symptomer = k.symptomer
            }).ToListAsync();
            return liste;
        }
        public async Task <List<Symptom>> HentSymptomerFraKategori(Kategori kategori)
        {
            List<Symptom> liste = await _db.Symptomer.Where(x => x.kategori == kategori).ToListAsync();

            return liste;
        }
        public  Diagnose kalkuler(Data data)
        {

            List<Diagnose> liste = _db.Diagnoser.Select(k => new Diagnose
            {
                DiagnoseId = k.DiagnoseId,
                navn = k.navn,
                info = k.info,
                symptomer = k.symptomer,
                link = k.link
            }).ToList();
            
            string[] sympt  = data.symptomer;

            Diagnose retur = new Diagnose();
            int match = 0;
            int antall;
            foreach (var i in liste)
            {
                foreach(var j in i.symptomer)
                {
                     antall = 0;
                    for(int k = 0; k < sympt.Length; k++)
                    {
                        if (j.symptom.navn.ToLower().Equals(sympt[k].ToLower()))
                        {
                            antall++;
                        }
                    }
                    if(antall > match)
                    {
                        retur = i;
                        match = antall;
                    }
                }
                
            }

            
            return retur;
        }

        public async Task<Symptom> HentEtSymptom(int symptomId)
        {
            Symptom hent = await _db.Symptomer.FindAsync(symptomId);
            var retur = new Symptom()
            {
                SymptomId = hent.SymptomId,
                navn = hent.navn,
                diagnoser = hent.diagnoser,
                kategori = hent.kategori
                
            };
            return retur;
            
        }
        public async Task<bool> endreSymptom(Data s)
        {
            Symptom hent = await _db.Symptomer.FindAsync(s.symptomId);
            List<Kategori> list = await _db.kategorier.Where(x => x.navn == s.kategori).ToListAsync();
            Kategori denne = list[0];

            hent.navn = s.navn;
            hent.kategori = denne;

            await _db.SaveChangesAsync();

            return false;
        }


    }
}
