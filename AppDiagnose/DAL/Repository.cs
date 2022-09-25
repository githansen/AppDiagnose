using AppDiagnose.Models;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
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
    }
}
