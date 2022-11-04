using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MinDiagnose.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MinDiagnose.DAL
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
        Task<bool> CreateSymptom(string navn, int kategoriId);
        Task<bool> loggDBEndring(string beskrivelse);
        Task<bool> logginn(Bruker bruker);
        Task<Brukere> ErLoggetInn(HttpContext httpContext);
    }
}
