using AppDiagnose.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Linq;


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
                symptomer=k.symptomer
            }).ToList();

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
            return s;
        }
    }
}
