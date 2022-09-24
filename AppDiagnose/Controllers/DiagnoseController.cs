using AppDiagnose.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System;
using System.Security.Principal;

namespace AppDiagnose.Controllers
{
    [Route("[controller]/[action]")]
    public class DiagnoseController : ControllerBase
    {
        private readonly DB _db;

        public DiagnoseController(DB db)
        {
            _db = db;
        }

        public List<Diagnose> hent()
        {
            

            List<Diagnose> diagnoseList = _db.Diagnoser.Select(k => new Diagnose
            {
                DiagnoseId = k.DiagnoseId,
                navn=k.navn,
                info=k.info,
                symptomer = k.symptomer,
                link = k.link
            }).ToList();


            //Pga databasestrukturen vil man få en 'loop' med objekter inni objekter, dette fjerner unødvendig data
            foreach(var i in diagnoseList)
            {
               
                foreach(var j in i.symptomer)
                {
                    j.diagnose.navn = null;
                    j.diagnose.symptomer = null;
                    j.diagnose.info = null;
                    j.diagnose.link = null;
                }
            }




            return diagnoseList;
        }
        public List<Symptom> hents()
        {
            List<Symptom> s = _db.Symptomer.Select(k => new Symptom
            {
                SymptomId = k.SymptomId,
                navn = k.navn,
                kategori=k.kategori,
                diagnoser=k.diagnoser
            }).ToList();
            
             

            //Pga databasestrukturen vil man få en 'loop' med objekter inni objekter, dette fjerner unødvendig data
            foreach (var i in s)
            {
                foreach(var j in i.diagnoser)
                {
                    j.symptom.diagnoser = null;
                    j.symptom.navn = "";
                    j.symptom.kategori = "";
                };
            }

            return s;
        }
    }
}
