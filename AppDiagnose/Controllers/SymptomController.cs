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
        public List<Symptom> HentAlle()
        {
            var symptomene = new List<Symptom>();

            var s1 = new Symptom();
            s1.navn = "tretthet";

            var s2 = new Symptom;
            s2.navn = "hodepine";

            symptomene.Add(s1);
            symptomene.Add(s2);

            return symptomene;
        }
    }
}
