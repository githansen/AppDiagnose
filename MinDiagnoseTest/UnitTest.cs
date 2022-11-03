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

namespace MinDiagnoseTest
{
    public class UnitTest
    {
        [Fact]
        public async Task CreateSymptom()
        {
            //Arrange
            var innSymptom = new Symptom
            {
                navn = "Kramper",
                SymptomId = 2,   // Egentlig kategoriID, men må bruke int
            };

            var mock = new Mock<IRepository>();
            mock.Setup(d => d.CreateSymptom(innSymptom.navn, innSymptom.SymptomId)).ReturnsAsync(true);
            var diagnoseController = new DiagnoseController(mock.Object);

            // Act

            var resultat = await diagnoseController.CreateSymptom(innSymptom.navn, innSymptom.SymptomId) as OkObjectResult;
            Assert.Equal((int)HttpStatusCode.OK, resultat.StatusCode);
            Assert.Equal(true, resultat.Value);
        }
    }
}
