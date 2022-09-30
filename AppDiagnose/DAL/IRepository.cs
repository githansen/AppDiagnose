﻿using AppDiagnose.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AppDiagnose.DAL
{
    public interface IRepository
    {
        Task <List<Diagnose>> hentalleDiagnoser();
        Task<List<Symptom>> hentalleSymptomer();
        
        Task<List<Kategori>> HentAlleKategorier();
        Task<Diagnose> kalkuler(Data data);
        Task<Symptom> HentEtSymptom(int symptomId);
        Task<bool> endreSymptom(Data s);
        Task<bool> slettSymptom(int Id);
    }
}
