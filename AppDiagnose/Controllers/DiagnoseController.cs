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
using Microsoft.AspNetCore.Http;
using System.ComponentModel;

namespace MinDiagnose.Controllers
{
    [Route("[controller]/[action]")]
    public class DiagnoseController : ControllerBase
    {
        private readonly IRepository _db;
        private const string _loggetInn = "loggetInn";
        private const string _ikkeLoggetInn = "";

        // Konstruktør uten logg for enhetstesting
        public DiagnoseController(IRepository db)
        {
            _db = db;
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
        public async Task<ActionResult> logginn(Bruker bruker)
        {
            if (ModelState.IsValid)
            {
                Bruker ok = await _db.logginn(bruker);
                if (ok != null)
                {
                    string b = HttpContext.Session.GetString(_loggetInn);
                    string loggetinn = b + ok.Id;
                    HttpContext.Session.SetString(_loggetInn, loggetinn);
                    return Ok(true);
                }
                else
                {
                    HttpContext.Session.SetString(_loggetInn, _ikkeLoggetInn);
                    return Ok(false);
                }
            } //R
            return BadRequest("Feil i inputvalidering");
        }
        public async  Task<ActionResult> ErLoggetInn()
        {
            Bruker retur = await _db.ErLoggetInn(HttpContext.Session.GetString(_loggetInn));
            if (string.IsNullOrEmpty(HttpContext.Session.GetString(_loggetInn)))
            {
                retur = new Bruker();
                return Ok(retur);
            }
            else return Ok(retur);
            
        }
        public void LoggUt()
        {
            HttpContext.Session.SetString(_loggetInn, _ikkeLoggetInn);
        }
        
    }
}
