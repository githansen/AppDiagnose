﻿using AppDiagnose.Models;
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
    public class DiagnoseController : ControllerBase
    {
        private readonly IRepository _db;

        public DiagnoseController(IRepository db)
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
        
        public async Task<List<Kategori>> HentAlleKategorier()
        {
            return await _db.HentAlleKategorier();
        }
        public async Task <Diagnose> kalkuler(Data data)
        {
            return await  _db.kalkuler(data);
        }
        public async Task<Symptom> HentEtSymptom(int id)
        {
            return await _db.HentEtSymptom(id);
        }
        public async Task<bool> endreSymptom(Data s)
        {
            return await _db.endreSymptom(s);
        }
        public async Task<bool> slettSymptom(int Id)
        {
            return await _db.slettSymptom(Id);
        }
    }
}