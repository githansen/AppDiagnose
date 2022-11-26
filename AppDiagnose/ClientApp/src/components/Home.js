// File - Home.js //

//JavaScript Bibliotek
import React, { Component, useState, useEffect } from 'react';
import { Container, Row, Col, Alert } from 'reactstrap';
import "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"
import $ from 'jquery'
//Egen ekstra stil  
import "./home.css"


//OUTPUT
export const Home = () => {
    const [diagnose, setDiagnose] = useState("");
    const [lasterInnIkon, setLasterInn] = useState(false);

    //Alert
    const [visible, setVisible] = useState(false);
    const [color, setColor] = useState('primary');
    const [alertText, setText] = useState('');

    const kalkulerDiagnose = () => {
        //Sender bruker øverst på siden for å se diagnose 
        window.scroll({ top: 0, left: 0, behavior: 'smooth' })
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

        //Sjekker om minst det er valgt minst et symptom
        if (symptomer.length === 0) {
            //Skjuler blokk som veileder brukeren 
            var forDiagnose = document.getElementById("forDiagnose");
            forDiagnose.style.display = "block"
            //Viser blokk med diagnosen til brukeren
            var etterDiagnose = document.getElementById("etterDiagnose");
            etterDiagnose.style.display = "none"
            //Alert som viser at createSymptom feilet
            setColor('danger');
            setText('Du må velge minst et symptom!');
            setVisible(true);
            //Gjemmer alert etter 2sek
            if (setVisible) {
                setTimeout(() => {
                    setVisible(false);
                }, 4000)
            }
        } else {
            setVisible(false); //Gjemmer alert 
            //Skjuler blokk som veileder brukeren 
            var forDiagnose = document.getElementById("forDiagnose");
            forDiagnose.style.display = "none"
            //Viser blokk med diagnosen til brukeren
            var etterDiagnose = document.getElementById("etterDiagnose");
            etterDiagnose.style.display = "block"


            $.post("/diagnose/Kalkuler", s, function (data) {
                console.log(data)
                setDiagnose(data);
            })
                .fail(function (jqXHR) {
                    //Alert som viser at kalkuer feilet
                    setColor('danger');
                    setText('Feil i respons for API-kall');
                    setVisible(true);
                    //Gjemmer alert etter 2sek 
                    if (setVisible) {
                        setTimeout(() => {
                            setVisible(false);
                        }, 2000)
                    }
                })
        }
    };

    useEffect(() => {
        
        //Viser lasterInn-ikon 
        setLasterInn(true);

        $.get("/diagnose/hentAlleKategorier", function (data) {
            
                let ut = ""
                for (let i of data) {
                    ut += '<div class="kategoriBoks">'
                    ut += `<div class="kollaps"><img className="img-fluid" src="./img/kategori_${i.id}.webp" alt="${i.navn}_placeholder"></img>`
                    ut += `${i.navn}`
                    ut += '</div>'
                    for (let j of i.symptomer) {
                        ut += `<div class='content'><div class="form-check round"><input class="form-check-input" type="checkbox" id="check${j.symptomId}" value="${j.navn}"></input>
                                <label class="form-check-label" for=check${j.symptomId}> ${j.navn}</label> </div> </div>`
                    }
                    ut += '</div>'
                }
                document.getElementById("symptomByKategoriUtskrift").innerHTML = ut;
               
                
               // Hentet fra: https://www.w3schools.com/howto/howto_js_collapsible.asp
                var coll = document.getElementsByClassName("kollaps");
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
                    })
                }
                //Skjuler lasterInn-ikon 
                setLasterInn(false);
        }).fail(function (jqXHR) {
            //Alert som viser at kalkuer feilet
            setColor('danger');
            setText('Feil i respons for API-kall');
            setVisible(true);
            //Gjemmer alert etter 2sek 
            if (setVisible) {
                setTimeout(() => {
                    setVisible(false);
                }, 2000)
            }
        })
    }, []);

    return (
        <div className="container py-4">
            <div className="row align-items-md-stretch">
                <div className="col-md-12">
                    <Alert id="varslingsBoks" color={color} isOpen={visible} >
                        <div>{alertText}</div>
                    </Alert>
                </div>
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
                            <div id="symptomByKategoriUtskrift"></div>
                        </Container> 
                    </div>
                    <button className="w-100 btn btn-lg btn-kalkuler p-3 " type="button" onClick={kalkulerDiagnose}><i className="bi bi-stars"></i> KALKULER</button>
                </div>
                <div className="col-md-4">
                    <div id="forDiagnose" className="card text-center bg-dark text-white">
                        <img className="card-img" src="./img/diagnose_bg_placeholder.webp" alt="Diagnose_Placeholder"></img>
                        <div className="card-img-overlay d-flex align-items-center justify-content-center">
                            <div>
                                <h1>
                                    <i className="bi bi-file-medical"></i>
                                </h1>
                                <h5 id="diagnoseSkjema_smalltxt" className="card-title">
                                    Fyll ut skjemaet til venstre
                                </h5>
                            </div>
                        </div>
                    </div>
                    <div id="etterDiagnose" className="card text-center bg-dark text-white">
                        <img className="card-img" src="./img/diagnose_bg_placeholder.webp" alt="Diagnose_Placeholder"></img>
                        <div className="card-img-overlay cio2 d-flex align-items-center justify-content-center">
                            <div>
                                <h1>
                                    <i className="bi bi-file-medical"></i>
                                </h1>
                                <h5 className="card-title">
                                    Din diagnose er {diagnose.navn}
                                </h5>
                                <p className="card-text">
                                    {diagnose.info}
                                </p>
                                <div className="d-grid gap-2 ">
                                    <a size="sm" className="mt-3 w-100 btn btn-info" href={`${diagnose.link}`} target="_blank"><i className="bi bi-eye"></i> Les mer</a>
                                </div>
                            </div> 
                        </div>
                     </div>
                </div>
            </div>
        </div>
    );
}

