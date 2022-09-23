using AppDiagnose.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppDiagnose.Models
{
    [Route("[Controller]/[action]")]
    public class DiagnoseSymptomRelController : ControllerBase
    {
        private readonly DB _db;
        public DiagnoseSymptomRelController(DB db)
        {
            _db = db;
        }
        public List<DiagnoseSymptomRel> HentAlle()
        {
            List<DiagnoseSymptomRel> alleRelasjoner = _db.DiagnoseSymptomRels.ToList();
            return alleRelasjoner;
        }
    }
}