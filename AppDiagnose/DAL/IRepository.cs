using AppDiagnose.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AppDiagnose.DAL
{
    public interface IRepository
    {
        Task <List<Diagnose>> hentalleDiagnoser();
        Task<List<Symptom>> hentalleSymptomer();
        Task <List<Symptom>> HentSymptomerFraKategori(Kategori kategori);

    }
}
