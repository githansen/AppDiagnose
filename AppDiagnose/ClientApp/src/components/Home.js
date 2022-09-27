import React, { Component, useState, useEffect } from 'react';
import "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"
const kalkulerDiagnose = () => {
    alert('Din diagnose kalkuleres..');
};

const lesMerOmDiagnose = () => {
    alert('Linken kommer snart...');
};

const diagnoseMedisiner = () => {
    alert('Medisiner kommer snart...');
};


export const Home = () => {
    const [symptomer, setSymptomer] = useState([])
    const [kategorier, setKategorier] = useState([])

    useEffect(() => {
        fetch("/diagnoses/hentAlleKategorier")
            .then(data => data.json())
            .then((data) => {
                setKategorier(data)
                let ut = ""
                for (let i of data) {
                    ut += "<button class='collapsible'>"
                    ut += `${i.navn}`
                    ut += "</button>"
                    for (let j of i.symptomer) {
                        ut += `<div class='content'><div className="form-check"><input className="form-check-input" type="checkbox" id="flexCheckDefault value=${j.navn}></input>
                                <label className="form-check-label" value=${j.navn}> ${j.navn}</label> </div> </div>`

                    }

                }
                document.getElementById("utskrift").innerHTML = ut;
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

                <div className="col-md-6">
                    <div className="h-100 p-5 bg-light border rounded-3">
                        <h4 className="mb-4"><i className="bi bi-clipboard2-pulse"></i> Velg symptomer</h4>


                        {/* 
                        {symptomer.map((i, index) => {
                            return <div className="form-check"><input className="form-check-input" type="checkbox" id="flexCheckDefault"></input>
                                <label className="form-check-label">{i.navn}</label> </div>
                        })}
                        */}


                        <div id="utskrift"></div>
                        <button className="mt-3 w-100 btn btn-lg btn-primary" type="button" onClick={kalkulerDiagnose}>Kalkuler</button>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="h-100 p-5 bg-dark border rounded-3">
                        <h4 className="mb-4 text-light"><i className="bi bi-file-medical"></i> Diagnose</h4>
                        <p className=" text-light">Din diagnose er <span><b>...</b></span></p>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button className="mt-3 btn btn-warning mx-2" type="button" onClick={lesMerOmDiagnose}>Les mer om diagnosen</button>
                            <button className="mt-3 btn btn-info text-light" type="button" onClick={diagnoseMedisiner}>Se medisiner</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}