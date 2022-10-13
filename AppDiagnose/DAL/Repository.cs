using MinDiagnose.Models;
using Castle.DynamicProxy.Generators.Emitters.SimpleAST;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Threading.Tasks;
using System.Text.RegularExpressions;
using Microsoft.Extensions.Logging;

namespace MinDiagnose.DAL
{
    public class Repository : IRepository
    {
        private readonly DB _db;
        private ILogger<Repository> _log;


        public Repository(DB db, ILogger<Repository> log)
        {
            _db = db;
            _log = log;
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
                foreach(var i in diagnoseList)
                {
                    foreach(var j in i.symptomer)
                    {

                        j.diagnose.navn = null;
                        j.diagnose.info = null;
                        j.diagnose.symptomer = null;
                        j.diagnose.link = null;
                        j.diagnose = null;
                    }
                }
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
           
                List<Diagnose> liste = await hentalleDiagnoser();

                //Finner så listen over symptomer sendt fra klient
                string[] sympt = data.symptomer;


                //Tomt objekt, dette oppdateres og returneres når vi har funnet riktig
                Diagnose retur = new Diagnose();

                // Vi returnerer Diagnosen med flest matches fra listen sendt fra klient. int match som tellevariabel. Vi benytter en algoritme inspirert av 
                // Maks-metodene fra DATS2300-kompendiet; https://www.cs.hioa.no/~ulfu/appolonius/kap1/1/kap11.html#1.1.2 
                double match = 0;
                double antall;
                double prosent = 0;
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
                    double symptomlengde = i.symptomer.Count;
                    double inputlengde = sympt.Length;
                    prosent =  100.0 * (2.0 * antall)/(symptomlengde + inputlengde);
                    //Hvis dette er en bedre match endres returobjektet
                    if (prosent >  match)
                    {
                        retur = i;
                        match = prosent;
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
                   
                    kategori = hent.kategori

                };
              
                retur.kategori.symptomer.Clear();

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

        public async Task<bool> CreateSymptom(string navn, int kategoriId) // lager nytt symptom databasen -- for å kjøre: https://localhost:44325/Diagnose/CreateSymptom?navn=testname&kategoriId=2
        {
            try // prøver å lage 'Symptom'
            {
                bool regexTest = Regex.IsMatch(navn.ToString(), @"^[a-zA-ZæøåÆØÅ. \-]{2,20}$");
                if (!regexTest) // input-validering
                {
                    _log.LogInformation("Det gikk galt da bruker prøvde å lage nytt symptom");
                    return false;
                }
                Kategori k = await _db.kategorier.FindAsync(kategoriId); // finner kategori gitt kategoriId
                var new_symptom = new Symptom { navn = navn, kategori = k}; // lager nytt Symptom-objekt
                _db.Symptomer.Add(new_symptom); // legger objektet i databasen
                await _db.SaveChangesAsync(); // lagrer!
                return true; // returnerer true hvis vellykket
            }
            catch // hvis skapelse av 'Symptom' feiler -> returner false
            {
                return false;
            }
        }

    }
}

// [RegularExpression(@"^[a-zA-ZæøåÆØÅ. \-]{2,20}$")]
