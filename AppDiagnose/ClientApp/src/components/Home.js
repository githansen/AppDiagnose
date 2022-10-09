import React, { Component, useState, useEffect } from 'react';
import "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"
import "./home.css"
import {
    Container,
    Row,
    Col,
    Tooltip,
} from 'reactstrap';
import $ from 'jquery'




const kalkulerDiagnose = () => {
    var etterDiagnose = document.getElementById("etterDiagnose");
    etterDiagnose.style.display = "block"
    var forDiagnose = document.getElementById("forDiagnose");
    forDiagnose.style.display = "none"

    var y = document.getElementsByTagName("input")
    let symptomer = []
    for (let i of y) {
        if (i.checked) {
            symptomer.push(i.value)
        }
    }
    const s = {
        symptomer: symptomer
    };
    $.post("/diagnose/kalkuler", s, function (data) {
        console.log(data)
    })

};

const lesMerOmDiagnose = () => {
    alert('Linken kommer snart...');
};

export const Home = () => {

    const [symptomer, setSymptomer] = useState([])
    const [kategorier, setKategorier] = useState([])
    const [lasterInnIkon, setLasterInn] = useState(false);
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const toggle = () => setTooltipOpen(!tooltipOpen);


    
    useEffect(() => {
        
        //Viser lasterInn-ikon
        setLasterInn(true);

        

        fetch("/diagnose/hentAlleKategorier")
            .then(data => data.json())
            .then((data) => {
                setKategorier(data)
                let ut = ""
                for (let i of data) {
                    ut += '<div class="kategoriBoks">'
                    ut += `<div class="collapsible"><img className="img-fluid" src="./img/kategori_${i.id}.png"></img>`
                    ut += `${i.navn}`
                    ut += '</div>'
                    for (let j of i.symptomer) {
                        
                        ut += `<div class='content'><div class="form-check round"><input class="form-check-input" type="checkbox" id="check${j.symptomId}" value=${j.navn}></input>
                                <label class="form-check-label" for=check${j.symptomId}> ${j.navn}</label> </div> </div>`
                        
                    }
                    ut += '</div>'
                   
                }
                document.getElementById("symptomByKategoriUtskrift").innerHTML = ut;
               
                
               
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
                            if (i.style.display === "inline-block") {
                                i.style.display = "none"
                            }
                            else {
                                i.style.display = "inline-block"
                            }
                        }
                        
                    });
                }
                //Skjuler lasterInn-ikon
                setLasterInn(false);
            })
    }, []);


    useEffect(() => {
        fetch("/diagnose/HentAlleSymptomer")
            .then(data => data.json())
            .then((data) => {
                setSymptomer(data);
            });
    }, []);



    return (
        <div className="container py-4">

            <div className="row align-items-md-stretch">
                <div className="col-md-8">

                    <div className="p-5 bg-light border rounded-3">
                        <h1 className="mb-3 text-center">Hei, ønsker du å finne din diagnose?</h1>
                        <p className="text-center">
                            Klikk på en eller flere kategorier nedenfor, og velg dine symptomer.
                            Klikk deretter på "Kalkuler", og whoops så er din diagnose klar.
                            </p>
                        <Container>
                            {lasterInnIkon && (
                                <div className="lastInn-Boks">
                                    <div className="lasterInn-Ikon"></div>
                                    <p>Laster inn...</p>
                                </div>
                            )}
                            <div id="symptomByKategoriUtskrift">
                            </div>
                        </Container> 
                    </div>
                    <button className="w-100 btn btn-lg btn-kalkuler p-3 " type="button" onClick={kalkulerDiagnose}><i className="bi bi-stars"></i> KALKULER</button>
                </div>
                <div className="col-md-4">
                    <div id="forDiagnose" className="card text-center bg-dark text-white">
                        <img className="card-img" src="./img/diagnose_bg_placeholder.jpg" alt="Diagnose_Placeholder"></img>
                            <div className="card-img-overlay d-flex align-items-center justify-content-center">
                                <div>
                                    <h1><i className="bi bi-file-medical"></i></h1>
                                    <h5 className="card-title">Fyll ut skjemaet til venstre</h5>
                                </div> 
                            </div>
                        </div>
                        <div id="etterDiagnose" className="card text-center bg-dark text-white">
                            <img className="card-img" src="./img/diagnose_bg_placeholder.jpg" alt="Diagnose_Placeholder"></img>
                            <div className="card-img-overlay cio2 d-flex align-items-center justify-content-center">
                                <div>
                                    <h1><i className="bi bi-file-medical"></i></h1>
                                    <h5 className="card-title">Din diagnose er ADHD</h5>
                                    <p className="card-text">
                                    Sed in eros luctus, tincidunt nisl ac, varius quam. Suspendisse tincidunt eleifend nunc a pharetra. Maecenas lobortis molestie sem in tristique. Nunc quis justo non orci finibus. 
                                    </p>
                                    <div className="d-grid gap-2 ">
                                        <button className="mt-3 w-100 btn btn-info" type="button" onClick={lesMerOmDiagnose}><i className="bi bi-eye"></i> Les mer</button>
                                        <button id="medisinKnp" className="mt-3 w-100 btn btn-info btn-disabled" type="button"><i className="bi bi-capsule"></i> Se medisiner</button>
                                          <Tooltip isOpen={tooltipOpen} target="medisinKnp" toggle={toggle} >
                                            Kommer snart...
                                          </Tooltip>
                                    </div>
                                </div> 
                            </div>
                        </div>
                </div>
            </div>
        </div>
    );
}

