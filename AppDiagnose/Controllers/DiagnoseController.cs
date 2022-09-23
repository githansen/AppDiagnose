using AppDiagnose.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppDiagnose.Controllers
{
    [Route("[Controller]/[action]")]
    public class DiagnoseController : ControllerBase
    {
        private readonly DB _diagnoseDB;

        public DiagnoseController(DB diagnoseDB)
        {
            _diagnoseDB = diagnoseDB;
        }
        public List<Diagnose> HentAlle()
        {
            List<Diagnose> alleDiagnoser = _diagnoseDB.Diagnoser.ToList();
            return alleDiagnoser;
        }
    }
}