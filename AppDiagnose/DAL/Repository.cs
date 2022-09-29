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

            // Henter først listen over alle diagnoser
            List<Diagnose> liste = _db.Diagnoser.Select(k => new Diagnose
            {
                DiagnoseId = k.DiagnoseId,
                navn = k.navn,
                info = k.info,
                symptomer = k.symptomer,
                link = k.link
            }).ToList();
            
            //Finner så listen over symptomer sendt fra klient
            string[] sympt  = data.symptomer;


            //Tomt objekt, dette oppdateres og returneres når vi har funnet riktig
            Diagnose retur = new Diagnose();

            // Vi returnerer Diagnosen med flest matches fra listen sendt fra klient. int match som tellevariabel. Vi benytter en algoritme inspirert av 
            // Maks-metodene fra DATS2300-kompendiet; https://www.cs.hioa.no/~ulfu/appolonius/kap1/1/kap11.html#1.1.2 
            int match = 0;
            int antall;
            // Looper gjennom listen over diagnoser
            foreach (var i in liste)
            {
                //Looper gjennom listen over symptomer i diagnose-objektet
                foreach(var j in i.symptomer)
                {
                    //Teller antall matches 
                     antall = 0;
                    //For hvert symptom, looper vi gjennom listen sendt fra klient og leter etter matches
                    for(int k = 0; k < sympt.Length; k++)
                    {
                        if (j.symptom.navn.ToLower().Equals(sympt[k].ToLower()))
                        {
                            antall++;
                        }
                    }
                    //Hvis antall matches er større enn for de tidligere diagnosene oppdateres 'match' og retur-objektet
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
            // Objektet s vil her inneholde nytt symptomnavn, ny symptomkategori(kun kategorinavn, ikke objektet) og opprinnelig SymptomId

            //Finner først symptomet som skal endres på
            Symptom hent = await _db.Symptomer.FindAsync(s.symptomId);

            //Skal så finne kategori ut fra navnet, dette gjøres ved å hente en liste over Kategori-objekter med tilsvarende navn
            //Denne listen skal kun inneholde 1 objekt, som vi henter med list[0]
            List<Kategori> list = await _db.kategorier.Where(x => x.navn == s.kategori).ToListAsync();
            Kategori denne = list[0];

            //Oppdaterer navn og kategori på symptomet vi skal endre på 
            hent.navn = s.navn;
            hent.kategori = denne;

            //Lagrer til slutt 
            await _db.SaveChangesAsync();

            return false;
        }
        public async Task<bool> slettSymptom(int Id)
        {

            //Vi kan ikke slette symptomet direkte siden det blir en fremmednøkkel i hjelpetabellen
            //Sletter derfor først alle oppføringer i hjelpetabellen SymptomForDiagnose med symptomer som skal slettes 
            //Det gjøres ved å hente en liste, for så å iterere gjennom og slette alle oppføringer 
            List<SymptomForDiagnose> liste = await _db.SymptomForDiagnose.Where(x => x.symptom.SymptomId == Id).ToListAsync();
            foreach(var i in liste)
            {
                _db.Remove(i);
                await _db.SaveChangesAsync();
            }
            //Finner til slutt symptomet og sletter det fra Symptomer-tabellen
            Symptom symptom = await _db.Symptomer.FindAsync(Id);
            _db.Remove(symptom);    
            await _db.SaveChangesAsync();
            return true;
        }


    }
}
