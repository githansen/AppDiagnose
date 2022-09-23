using AppDiagnose.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppDiagnose.Controllers
{
    [Route("[Controller]/[action]")]
    public class SymptomController: ControllerBase
    {
        private readonly DB _symptomDB;

        public SymptomController(DB symptomDB)
        {
            _symptomDB = symptomDB;
        }
        public List<Symptom> HentAlle()
        {
            List<Symptom> alleSymptomer = _symptomDB.Symptomer.ToList();
            return alleSymptomer;
        }
    }
}
