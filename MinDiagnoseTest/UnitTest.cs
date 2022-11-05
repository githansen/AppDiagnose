using MinDiagnose.DAL;
using MinDiagnose.Models;
using MinDiagnose.Controllers;
using Moq;
using System;
using System.Threading.Tasks;
using Xunit;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Text;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;

namespace MinDiagnoseTest
{
    public class UnitTest
    {
        private const string _loggetInn = "loggetInn";
        private const string _ikkeLoggetInn = "";

        private readonly Mock<IRepository> mockRep = new Mock<IRepository>();
        private readonly Mock<HttpContext> mockHttpContext = new Mock<HttpContext>();
        private readonly MockHttpSession mockSession = new MockHttpSession();

        [Fact]
        public async Task CreateSymptom()
        {
            //Arrange
            var innSymptom = new Symptom
            {
                navn = "Kramper",
                SymptomId = 2,   // Egentlig kategoriID, men må bruke int
            };

            mockRep.Setup(d => d.CreateSymptom(innSymptom.navn, innSymptom.SymptomId)).ReturnsAsync(true);
            var diagnoseController = new DiagnoseController(mockRep.Object);

            // Act
            var resultat = await diagnoseController.CreateSymptom(innSymptom.navn, innSymptom.SymptomId) as OkObjectResult;
            
            // Assert
            Assert.Equal((int)HttpStatusCode.OK, resultat.StatusCode);
            Assert.Equal(true, resultat.Value);
        }

        [Fact]
        public async Task HentalleDiagnoser()
        {
            // Arrange
            var diagnose1 = new Diagnose
            {
                DiagnoseId = 1,
                navn = "ADHD"
            };
            var diagnose2 = new Diagnose
            {
                DiagnoseId = 2,
                navn = "Influensa"
            };
            var diagnose3 = new Diagnose
            {
                DiagnoseId = 3,
                navn = "Forkjølelse"
            };

            var diagnoseListe = new List<Diagnose>();
            diagnoseListe.Add(diagnose1);
            diagnoseListe.Add(diagnose2);
            diagnoseListe.Add(diagnose3);

            mockRep.Setup(d => d.hentalleDiagnoser()).ReturnsAsync(diagnoseListe);
            var diagnoseController = new DiagnoseController(mockRep.Object);

            // Act
            var resultat = await diagnoseController.HentalleDiagnoser() as OkObjectResult;

            // Assert 
            Assert.Equal((int)HttpStatusCode.OK, resultat.StatusCode);
            Assert.Equal<List<Diagnose>>((List<Diagnose>)resultat.Value, diagnoseListe);
        }

        [Fact]
        public async Task hentalleSymptomer()
        {
            // Arrange
            var symptom1 = new Symptom
            {
                SymptomId = 1,
                navn = "Konsentrasjonsvansker"
            };
            var symptom2 = new Symptom
            {
                SymptomId = 2,
                navn = "Hoste"
            };
            var symptom3 = new Symptom
            {
                SymptomId = 3,
                navn = "Ryggsmerter"
            };

            var symptomListe = new List<Symptom>();
            symptomListe.Add(symptom1);
            symptomListe.Add(symptom2);
            symptomListe.Add(symptom3);

            mockRep.Setup(s => s.hentalleSymptomer()).ReturnsAsync(symptomListe);
            var diagnoseController = new DiagnoseController(mockRep.Object);

            // Act
            var resultat = await diagnoseController.hentalleSymptomer() as OkObjectResult;

            // Assert 
            Assert.Equal((int)HttpStatusCode.OK, resultat.StatusCode);
            Assert.Equal<List<Symptom>>((List<Symptom>)resultat.Value, symptomListe);
        }

        [Fact]
        public async Task HentalleKategorier()
        {
            // Arrange
            var kategori1 = new Kategori
            {
                Id = 1,
                navn = "Psykisk"
            };
            var kategori2 = new Kategori
            {
                Id = 2,
                navn = "Fysisk"
            };
            var kategori3 = new Kategori
            {
                Id = 3,
                navn = "Revmatisk"
            };

            var kategoriListe = new List<Kategori>();
            kategoriListe.Add(kategori1);
            kategoriListe.Add(kategori2);
            kategoriListe.Add(kategori3);

            mockRep.Setup(k => k.HentAlleKategorier()).ReturnsAsync(kategoriListe);
            var diagnoseController = new DiagnoseController(mockRep.Object);

            // Act
            var resultat = await diagnoseController.HentAlleKategorier() as OkObjectResult;

            // Assert 
            Assert.Equal((int)HttpStatusCode.OK, resultat.StatusCode);
            Assert.Equal<List<Kategori>>((List<Kategori>)resultat.Value, kategoriListe);
        }

        [Fact]
        public async Task kalkuler()
        {
            // Arrange
            var returDiagnose = new Diagnose
            {
                DiagnoseId = 1,
                navn = "ADHD"
            };

            mockRep.Setup(d => d.kalkuler(It.IsAny<Data>())).ReturnsAsync(returDiagnose);
            var diagnoseController = new DiagnoseController(mockRep.Object);

            // Act
            var resultat = await diagnoseController.kalkuler(It.IsAny<Data>()) as OkObjectResult;

            // Assert
            Assert.Equal((int)HttpStatusCode.OK, resultat.StatusCode);
            Assert.Equal(returDiagnose, resultat.Value);
        }

        [Fact]
        public async Task HentEtSymptom()
        {
            // Arrange
            var returSymptom = new Symptom
            {
                navn = "Konsentrasjonsvansker",
                SymptomId = 1
            };

            mockRep.Setup(s => s.HentEtSymptom(It.IsAny<int>())).ReturnsAsync(returSymptom);
            var diagnoseController = new DiagnoseController(mockRep.Object);

            // Act
            var resultat = await diagnoseController.HentEtSymptom(It.IsAny<int>()) as OkObjectResult;

            // Assert
            Assert.Equal((int)HttpStatusCode.OK, resultat.StatusCode);
            Assert.Equal<Symptom>(returSymptom, (Symptom)resultat.Value);
        }

        [Fact]
        public async Task endreSymptom()
        {
            // Arrange
            mockRep.Setup(s => s.endreSymptom(It.IsAny<Data>())).ReturnsAsync(true);
            var diagnoseController = new DiagnoseController(mockRep.Object);

            // Act
            var resultat = await diagnoseController.endreSymptom(It.IsAny<Data>()) as OkObjectResult;

            // Assert 
            Assert.Equal((int)HttpStatusCode.OK, resultat.StatusCode);
            Assert.Equal(true, resultat.Value);
        }

        [Fact]
        public async Task slettSymptom()
        {
            // Arrange
            mockRep.Setup(s => s.slettSymptom(It.IsAny<int>())).ReturnsAsync(true);
            var diagnoseController = new DiagnoseController(mockRep.Object);

            // Act
            var resultat = await diagnoseController.slettSymptom(It.IsAny<int>()) as OkObjectResult;

            // Assert 
            Assert.Equal((int)HttpStatusCode.OK, resultat.StatusCode);
            Assert.Equal(true, resultat.Value);
        }

        [Fact]
        public async Task logginn()
        {
            // Arrange
            var returBruker = new Bruker
            {
                Id = 1,
                Brukernavn = "admin",
                Passord = "admin"
            };

            mockRep.Setup(b => b.logginn(It.IsAny<Bruker>())).ReturnsAsync(returBruker);
            var diagnoseController = new DiagnoseController(mockRep.Object);

            mockSession[_loggetInn] = _loggetInn;
            mockHttpContext.Setup(s => s.Session).Returns(mockSession);
            diagnoseController.ControllerContext.HttpContext = mockHttpContext.Object;

            // Act
            var resultat = await diagnoseController.logginn(It.IsAny<Bruker>()) as OkObjectResult;

            // Assert 
            Assert.Equal((int)HttpStatusCode.OK, resultat.StatusCode);
            Assert.Equal(true, resultat.Value);
        }

        [Fact]
        public async Task ErLoggetInn()
        {
            // Arrange
            var returBruker = new Bruker
            {
                Id = 1,
                Brukernavn = "admin",
                Passord = "admin"
            };

            mockRep.Setup(b => b.ErLoggetInn(It.IsAny<String>())).ReturnsAsync(returBruker);
            var diagnoseController = new DiagnoseController(mockRep.Object);

            mockSession[_loggetInn] = _loggetInn;
            mockHttpContext.Setup(s => s.Session).Returns(mockSession);
            diagnoseController.ControllerContext.HttpContext = mockHttpContext.Object;

            // Act
            var resultat = await diagnoseController.ErLoggetInn() as OkObjectResult;

            // Assert 
            Assert.Equal((int)HttpStatusCode.OK, resultat.StatusCode);
            //Assert.Equal(true, resultat.Value);
            Assert.Equal<Bruker>(returBruker, (Bruker)resultat.Value);
        }
    }
}
