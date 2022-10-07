using AppDiagnose.Models;
using Castle.DynamicProxy.Generators.Emitters.SimpleAST;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
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
            try
            {
                //Samme som i  forelesninger
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
            catch
            {
                return null;
            }
        }

        public async Task<List<Symptom>> hentalleSymptomer()
        {
            try
            {
                //Samme som i forelesninger
                List<Symptom> s = await _db.Symptomer.Select(k => new Symptom
                {
                    SymptomId = k.SymptomId,
                    navn = k.navn,
                    kategori = k.kategori,
                    diagnoser = k.diagnoser
                }).ToListAsync();

                return s;
            }
            catch
            {
                return null;
            }
        }
        public async Task<List<Kategori>> HentAlleKategorier()
        {
            try
            {
                //Samme som i forelesninger
                List<Kategori> liste = await _db.kategorier.Select(k => new Kategori
                {
                    Id = k.Id,
                    navn = k.navn,
                    symptomer = k.symptomer
                }).ToListAsync();
                return liste;
            }
            catch
            {
                return null;
            }
        }

     

        public async Task <Diagnose> kalkuler(Data data)
        {
            if (data.symptomer.Count() == 0) return null;
            try
            {
                // Henter først listen over alle diagnoser
                List<Diagnose> liste = await _db.Diagnoser.Select(k => new Diagnose
                {
                    DiagnoseId = k.DiagnoseId,
                    navn = k.navn,
                    info = k.info,
                    symptomer = k.symptomer,
                    link = k.link
                }).ToListAsync();

                //Finner så listen over symptomer sendt fra klient
                string[] sympt = data.symptomer;


                //Tomt objekt, dette oppdateres og returneres når vi har funnet riktig
                Diagnose retur = new Diagnose();

                // Vi returnerer Diagnosen med flest matches fra listen sendt fra klient. int match som tellevariabel. Vi benytter en algoritme inspirert av 
                // Maks-metodene fra DATS2300-kompendiet; https://www.cs.hioa.no/~ulfu/appolonius/kap1/1/kap11.html#1.1.2 
                int match = 1000;
                int antall;
                int prosent = 0;
                // Looper gjennom listen over diagnoser
                foreach (var i in liste)
                {
                    //Teller antall matches 
                    antall = 0;
                    //Looper gjennom listen over symptomer i diagnose-objektet
                    foreach (var j in i.symptomer)
                    {
                        
                        //For hvert symptom, looper vi gjennom listen sendt fra klient og leter etter matches
                        for (int k = 0; k < sympt.Length; k++)
                        {
                            if (j.symptom.navn.ToLower().Equals(sympt[k].ToLower()))
                            {
                                antall++;
                            }
                        }
                       
                    }
                    
                    prosent = antall != 0 ? 100 * (i.symptomer.Count + sympt.Length) / (2 * antall) : 0;
                    //Hvis dette er en bedre match endres returobjektet
                    if (Math.Abs(100 - prosent) < match)
                    {
                        retur = i;
                        match = Math.Abs(100-prosent);
                    }

                }


                return retur;
            }
            catch
            {
                return null;
            }
        }

        public async Task<Symptom> HentEtSymptom(int symptomId)
        {
            try
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
            catch
            {
                return null;
            }
        }
        public async Task<bool> endreSymptom(Data s)
        {
            try
            {
                // Objektet s vil her inneholde nytt symptomnavn, ny symptomkategori(kun kategorinavn, ikke objektet) og opprinnelig SymptomId

                //Finner først symptomet som skal endres på
                Symptom hent = await _db.Symptomer.FindAsync(s.symptomId);

                List<Symptom> sjekk = await _db.Symptomer.Where(x => x.navn == s.navn).ToListAsync();
                if (sjekk.Count > 0) return false;
                //Skal så finne kategori ut fra navnet, dette gjøres ved å hente en liste over Kategori-objekter med tilsvarende navn
                //Denne listen skal kun inneholde 1 objekt, som vi henter med list[0]
                List<Kategori> list = await _db.kategorier.Where(x => x.navn == s.kategori).ToListAsync();
                Kategori denne = list[0];

                //Oppdaterer navn og kategori på symptomet vi skal endre på 
                hent.navn = s.navn;
                hent.kategori = denne;

                //Lagrer til slutt 
                await _db.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }
        public async Task<bool> slettSymptom(int Id)
        {

            try
            {
                //Vi kan ikke slette symptomet direkte siden det blir en fremmednøkkel i hjelpetabellen
                //Sletter derfor først alle oppføringer i hjelpetabellen SymptomForDiagnose med symptomer som skal slettes 
                //Det gjøres ved å hente en liste, for så å iterere gjennom og slette alle oppføringer 
                List<SymptomForDiagnose> liste = await _db.SymptomForDiagnose.Where(x => x.symptom.SymptomId == Id).ToListAsync();
                foreach (var i in liste)
                {
                    _db.Remove(i);
                }
                //Finner til slutt symptomet og sletter det fra Symptomer-tabellen
                Symptom symptom = await _db.Symptomer.FindAsync(Id);
                _db.Remove(symptom);
                await _db.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> CreateSymptom(string navn, int kategoriId) // creates new symptom in the db -- to run: https://localhost:44325/Diagnose/CreateSymptom?navn=testname&kategoriId=2
        {
            try // tries to create new 'Symptom'
            { 
                Kategori k = await _db.kategorier.FindAsync(kategoriId); // finds kategori given kategoriId
                var new_symptom = new Symptom { navn = navn, kategori = k}; // creates new Symptom object
                _db.Symptomer.Add(new_symptom); // adds that object to the database
                await _db.SaveChangesAsync(); // saves!
                return true; // returns true if successful
            }
            catch // if creation of 'Symptom' fails -> return false
            {
                return false;
            }
        }

    }
}
