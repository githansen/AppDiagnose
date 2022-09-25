using AppDiagnose.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System;
using System.Security.Principal;
using AppDiagnose.DAL;
using System.Threading.Tasks;

namespace AppDiagnose.Controllers
{
    [Route("[controller]/[action]")]
    public class DiagnosesController : ControllerBase
    {
        private readonly IRepository _db;

        public DiagnosesController(IRepository db)
        {
             _db = db;
        }


        public async Task <List<Diagnose>> HentalleDiagnoser()

        {
            return await _db.hentalleDiagnoser();
        }
        public async Task <List<Symptom>> hentalleSymptomer()
        {
            return await _db.hentalleSymptomer();
        }
        public async Task <List<Symptom>> HentSymptomerFraKategori(Kategori k)
        {
            return await _db.HentSymptomerFraKategori(k);
        }
        public async Task<List<Kategori>> HentAlleKategorier()
        {
            return await _db.HentAlleKategorier();
        }
        public async Task<Symptom> hentSymptom()
        {
            return await _db.hentSymptom();
        }
    }
}
