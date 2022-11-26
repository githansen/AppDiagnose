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
using Microsoft.VisualStudio.TestPlatform.Utilities;
using System.Linq;

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
            mockRep.Setup(s => s.CreateSymptom(It.IsAny<String>(), It.IsAny<int>())).ReturnsAsync(true);
            var diagnoseController = new DiagnoseController(mockRep.Object);

            // Act
            var resultat = await diagnoseController.CreateSymptom(It.IsAny<String>(), It.IsAny<int>()) as OkObjectResult;
            
            // Assert
            Assert.Equal((int)HttpStatusCode.OK, resultat.StatusCode);
            Assert.Equal(true, resultat.Value);
        }
        
        [Fact]
        public async Task CreateSymptomFailed()
        {
            // Arrange
            mockRep.Setup(s => s.CreateSymptom(It.IsAny<String>(), It.IsAny<int>())).ReturnsAsync(false);
            var diagnoseController = new DiagnoseController(mockRep.Object);

            // Act
            var resultat = await diagnoseController.CreateSymptom(It.IsAny<String>(), It.IsAny<int>()) as BadRequestObjectResult;

            // Assert
            Assert.Equal((int)HttpStatusCode.BadRequest, resultat.StatusCode);
            Assert.Equal(" ble ikke lagret", resultat.Value);
        }

        [Fact]
        public async Task HentAlleDiagnoser()
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
        public async Task HentAlleDiagnoserTomListe()
        {
            // Arrange
            mockRep.Setup(d => d.hentalleDiagnoser()).ReturnsAsync(() => null);
            var diagnoseController = new DiagnoseController(mockRep.Object);

            // Act
            var resultat = await diagnoseController.HentalleDiagnoser() as NotFoundObjectResult;

            // Assert 
            Assert.Equal((int)HttpStatusCode.NotFound, resultat.StatusCode);
            Assert.Equal("Feil på server", resultat.Value);
        }

        [Fact]
        public async Task HentAlleSymptomer()
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
        public async Task HentAlleSymptomerTomListe()
        {
            // Arrange
            mockRep.Setup(s => s.hentalleSymptomer()).ReturnsAsync(() => null);
            var diagnoseController = new DiagnoseController(mockRep.Object);

            // Act
            var resultat = await diagnoseController.hentalleSymptomer() as NotFoundObjectResult;

            // Assert 
            Assert.Equal((int)HttpStatusCode.NotFound, resultat.StatusCode);
            Assert.Equal("Feil på server", resultat.Value);
        }

        [Fact]
        public async Task HentAlleKategorier()
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
        public async Task HentAlleKategorierTomListe()
        {
            // Arrange
            mockRep.Setup(k => k.HentAlleKategorier()).ReturnsAsync(() => null);
            var diagnoseController = new DiagnoseController(mockRep.Object);

            // Act
            var resultat = await diagnoseController.HentAlleKategorier() as NotFoundObjectResult;

            // Assert 
            Assert.Equal((int)HttpStatusCode.NotFound, resultat.StatusCode);
            Assert.Equal("Feil på server", resultat.Value);
        }

        [Fact]
        public async Task Kalkuler()
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
        public async Task KalkulerIkkeOK()
        {
            // Arrange
            mockRep.Setup(d => d.kalkuler(It.IsAny<Data>())).ReturnsAsync(() => null);
            var diagnoseController = new DiagnoseController(mockRep.Object);

            // Act
            var resultat = await diagnoseController.kalkuler(It.IsAny<Data>()) as NotFoundObjectResult;

            // Assert 
            Assert.Equal((int)HttpStatusCode.NotFound, resultat.StatusCode);
            Assert.Equal("Feil på server eller ingen input", resultat.Value);
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
        public async Task HentEtSymptomIkkeOK()
        {
            // Arrange
            mockRep.Setup(s => s.HentEtSymptom(It.IsAny<int>())).ReturnsAsync(() => null);
            var diagnoseController = new DiagnoseController(mockRep.Object);

            // Act
            var resultat = await diagnoseController.HentEtSymptom(It.IsAny<int>()) as NotFoundObjectResult;

            // Assert 
            Assert.Equal((int)HttpStatusCode.NotFound, resultat.StatusCode);
            Assert.Equal("Fant ikke symptom", resultat.Value);
        }

        [Fact]
        public async Task EndreSymptom()
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
        public async Task EndreSymptomIkkeOK()
        {
            // Arrange
            // Trenge et navn for at controller skal returnere et BadRequest
            var symptom = new Data
            {
                navn = ""
            };

            mockRep.Setup(s => s.endreSymptom(It.IsAny<Data>())).ReturnsAsync(false);
            var diagnoseController = new DiagnoseController(mockRep.Object);



            // Act
            // Bruker retur
            var resultat = await diagnoseController.endreSymptom(symptom) as BadRequestObjectResult;

            // Assert
            Assert.Equal((int)HttpStatusCode.BadRequest, resultat.StatusCode);
            Assert.Equal(" ble ikke endret", resultat.Value);
        }


        [Fact]
        public async Task SlettSymptom()
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
        public async Task LoggInn()
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
        public async Task LoggInnFeil()
        {
            mockRep.Setup(b => b.logginn(It.IsAny<Bruker>())).ReturnsAsync((Bruker)null);

            var diagnoseController = new DiagnoseController(mockRep.Object);

            mockSession[_loggetInn] = _ikkeLoggetInn;
            mockHttpContext.Setup(s => s.Session).Returns(mockSession);
            diagnoseController.ControllerContext.HttpContext = mockHttpContext.Object;

            // Act
            var resultat = await diagnoseController.logginn(It.IsAny<Bruker>()) as OkObjectResult;

            // Assert 
            Assert.Equal((int)HttpStatusCode.OK, resultat.StatusCode);
            Assert.False((bool)resultat.Value);
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

        [Fact]
        public async Task HentHeleLoggen()
        {
            // Arrange
            var log1 = new dbLog
            {
                dbLogId = 1,
                beskrivelse = "Endret ...",
                tid = "tidspunkt"
            };
            var log2 = new dbLog
            {
                dbLogId = 2,
                beskrivelse = "Endret ...",
                tid = "tidspunkt"
            };
            var log3 = new dbLog
            {
                dbLogId = 3,
                beskrivelse = "Endret ...",
                tid = "tidspunkt"
            };

            var logListe = new List<dbLog>();
            logListe.Add(log3);
            logListe.Add(log2);
            logListe.Add(log1);

            mockRep.Setup(d => d.HentHeleLoggen()).ReturnsAsync(logListe);
            var diagnoseController = new DiagnoseController(mockRep.Object);

            // Act
            var resultat = await diagnoseController.HentHeleLoggen() as OkObjectResult;

            // Assert 
            Assert.Equal((int)HttpStatusCode.OK, resultat.StatusCode);
            Assert.Equal<IEnumerable<dbLog>>((IEnumerable<dbLog>)resultat.Value, logListe);
        }
    }
}
