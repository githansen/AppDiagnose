import React, { Component, useState, useEffect } from 'react';
import "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"
import "./collapse.css"
import { Container, Row, Col } from 'reactstrap';



const kalkulerDiagnose = () => {
    var etterDiagnose = document.getElementById("etterDiagnose");
    etterDiagnose.style.display = "block"
    var forDiagnose = document.getElementById("forDiagnose");
    forDiagnose.style.display = "none"
};

const lesMerOmDiagnose = () => {
    alert('Linken kommer snart...');
};

const diagnoseMedisiner = () => {
    alert('Medisiner kommer snart...');
};

let liste = ["konsentrasjonsvansker", "hyperaktivitet"]
export const Home = () => {

    const [symptomer, setSymptomer] = useState([])
    const [kategorier, setKategorier] = useState([])
    
    const data = {
        symptomer: ["konsentrasjonsvansker", "hyperaktivitet"]
    }
    useEffect(() => {


        $.post("/diagnoses/kalkuler", data, function (data) {
            console.log(data)
        })

        fetch("/diagnoses/hentAlleKategorier")
            .then(data => data.json())
            .then((data) => {
                setKategorier(data)
                let ut = ""
                for (let i of data) {
                    ut += '<div>'
                    ut += `<div class="collapsible"><img className="img-fluid" src="./img/kategori_${i.navn}.png"></img>`
                    ut += `${i.navn}`
                    ut += '</div>'
                    for (let j of i.symptomer) {
                        ut += `<div class='content'><div className="form-check"><input className="form-check-input" type="checkbox" id="check${j.navn}" value=${j.navn}></input>
                                <label className="form-check-label" for=check${j.navn}> ${j.navn}</label> </div> </div>`
                        
                    }
                    ut += '</div>'
                   
                }
                document.getElementById("symptomByKategoriUtskrift").innerHTML = ut;
                var y = document.getElementsByTagName("input")
                console.log("HER")
                for (let i of y) {
                    console.log(i.value)
                }
                
               
                var coll = document.getElementsByClassName("collapsible");
                var i;

                for (i = 0; i < coll.length; i++) {
                    let liste = []
                    let curr = coll[i].nextElementSibling
                    while (curr != null && curr.className === "content") {
                        liste.push(curr)
                        curr = curr.nextElementSibling
                    }
                    coll[i].addEventListener("click", function () {
                        this.classList.toggle("active");
                        for (let i of liste) {
                            if (i.style.display === "block") {
                                i.style.display = "none"
                            }
                            else {
                                i.style.display = "block"
                            }
                        }
                        
                    });
                }
               
            })
    }, []);


    useEffect(() => {
        fetch("/diagnoses/HentAlleSymptomer")
            .then(data => data.json())
            .then((data) => {
             
                setSymptomer(data);
            });
    }, []);
    

    return (
        <div className="container py-4">

            <div className="row align-items-md-stretch">
                <div className="col-md-8">
                    <div className="h-100 p-5 bg-light border rounded-3">
                        <h4 className="mb-4"><i className="bi bi-clipboard2-pulse"></i> Klikk på en kategori og velg symptomer</h4>
                        <Container>
                            <Row xs="3" id="symptomByKategoriUtskrift">
                            </Row>
                        </Container>
                        <button className="mt-3 w-100 btn btn-lg btn-primary" type="button" onClick={kalkulerDiagnose}><i className="bi bi-stars"></i> Kalkuler</button>
                    </div>
                </div>
                <div className="col-md-4">
                    <div id="forDiagnose" className="p-5 bg-dark border rounded-3">
                        <h4 className="mb-4 text-light"><i className="bi bi-file-medical"></i> Diagnose</h4>
                        <p className=" text-light">Fyll ut skjemaet til venstre<span></span></p>
                    </div>
                    <div id="etterDiagnose" className="p-5 bg-dark border rounded-3">
                        <h4 className="mb-4 text-light"><i className="bi bi-file-medical"></i> Diagnose</h4>
                        <p className=" text-light">Din diagnose er <span><b>...</b></span></p>
                        <div className="d-grid gap-2 ">
                            <button className="mt-3 w-100 btn btn-warning" type="button" onClick={lesMerOmDiagnose}><i className="bi bi-eye"></i> Les mer om diagnosen</button>
                            <button className="mt-3 w-100 btn btn-info text-light" type="button" onClick={diagnoseMedisiner}><i className="bi bi-capsule"></i> Se medisiner</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

