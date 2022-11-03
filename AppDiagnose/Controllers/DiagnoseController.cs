using MinDiagnose.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System;
using System.Security.Principal;
using MinDiagnose.DAL;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace MinDiagnose.Controllers
{
    [Route("[controller]/[action]")]
    public class DiagnoseController : ControllerBase
    {
        private readonly IRepository _db;
        private ILogger<DiagnoseController> _log;

        public DiagnoseController(IRepository db, ILogger<DiagnoseController> log)
        {
             _db = db;
            _log = log;
        }


        public async Task <ActionResult> HentalleDiagnoser()

        {
            var liste  = await _db.hentalleDiagnoser();
            if (liste == null) return NotFound("Feil på server");
            else return Ok(liste);
        }
        public async Task <ActionResult> hentalleSymptomer()
        {
            var liste = await _db.hentalleSymptomer();
            if (liste == null) return NotFound("Feil på server");
            else return Ok(liste);
        }
        
        public async Task<ActionResult> HentAlleKategorier()
        {
            var liste = await _db.HentAlleKategorier();
            if (liste == null) return NotFound("Feil på server");
            else return Ok(liste);
        }
        public async Task <ActionResult> kalkuler(Data data)
        {
            var diagnose = await _db.kalkuler(data);
            if (diagnose == null) return NotFound("Feil på server eller ingen input");
            else return Ok(diagnose);
        }
        public async Task<ActionResult> HentEtSymptom(int id)
        {
            var symptom = await _db.HentEtSymptom(id);
            if (symptom == null) return NotFound("Fant ikke symptom");
            else return Ok(symptom);
        }
        public async Task<ActionResult> endreSymptom(Data s)
        {
            bool suksess = await _db.endreSymptom(s);
            if (!suksess) return BadRequest(s.navn + " ble ikke endret");
            else return Ok(suksess);
        }
        public async Task<ActionResult> slettSymptom(int Id)
        {
           bool slettet  = await _db.slettSymptom(Id);
            if (!slettet) return BadRequest("Ble ikke slettet");
            else return Ok(slettet);
        }
        public async Task<ActionResult> CreateSymptom(string navn, int kategoriId)
        {
            bool lagret = await _db.CreateSymptom(navn, kategoriId);
            if (!lagret) return BadRequest(navn + " ble ikke lagret");
            else return Ok(lagret);
        }
        public async Task<bool> logginn(Bruker bruker)
        {
            return await _db.logginn(bruker);
        }
    }
}
