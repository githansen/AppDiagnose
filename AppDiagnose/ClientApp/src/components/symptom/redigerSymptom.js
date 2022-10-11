// File - redigerSymptom.js //

//JavaScript Bibliotek
import React, { Component, useEffect, useState } from 'react';
import { Form, FormGroup, Input, Label, Button, ButtonGroup, Alert } from "reactstrap";
import { Link } from 'react-router-dom';
import $ from 'jquery'



//OUTPUT
export const redigerSymptom = () => {
    const [symptom, setSymptom] = useState(null);
    const [kategorier, setKategorier] = useState([]);
    const id = window.location.search.substring(1);
    const [lasterInnIkon, setLasterInn] = useState(false);

    //Alert
    const [visible, setVisible] = useState(false);
    const [color, setColor] = useState('primary');
    const [alertText, setText] = useState('');

    const lagreSymptom = () => {
    
        const s = {
            symptomId: symptom.symptomId,
            navn: $("#navn").val(),
            kategori: $("#kategoriSelect").val(),
        }
 
        $.post("/diagnose/endreSymptom", s, function (data) {
            console.log(data)
        })

        //Endrer tittel på side til oppdatert navn
        let nyttNavn = $("#navn").val();
        $("#navnTittel").html(nyttNavn); 
        //Alert som viser at symptom er satt inn suksessfullt
        setColor('success');
        setText('Dine endringer er nå lagret!');
        setVisible(true);
        //Gjemmer alert etter 2sek 
        if (setVisible) {
            setTimeout(() => {
                setVisible(false);
            }, 2000)
        }
    };


    useEffect(() => {
        //Viser lasterInn-ikon
        setLasterInn(true);
        const url = "/diagnose/HentEtSymptom?" + id 
        console.log(url)
        $.get(url, function (data) {
            
                setSymptom(data)
                document.getElementById("navn").value = data.navn
                document.getElementById("navnTittel").innerHTML = data.navn
                //Skjuler lasterInn-ikon   
                setLasterInn(false);
        }).fail(function (jqXHR) {
            //Feilhåndtering
        })

        $.get("/diagnose/HentAlleKategorier", function (data) {
            
                setKategorier(data)
        }).fail(function (jqXHR) {
            //Feilhåndtering
        })

    }, [])
    return (
        <div className="container py-4">
            <div className="row align-items-md-stretch">
                <div className="col-md-12">
                    <Alert id="varslingsBoks" color={color} isOpen={visible} >
                        <div>{alertText}</div>
                    </Alert>
                </div>
                <div className="col-md-12">
                    <h1><i className="bi bi-activity"></i> Rediger symptom: <b><span id='navnTittel'></span></b></h1>
                    <p>*Alle felt må være fyllt ut</p>
                    <Form >
                        <div className="row align-items-md-stretch">
                        <div className="col-md-4">
                        <FormGroup>
                            <Label for="kategoriSelect">
                              Velg kategori
                            </Label>
                            <Input
                              id="kategoriSelect"
                              name="kategoriSelect"
                              type="select"
                            >
                                {kategorier.map((kat, index) => {
                                    return <option value={kat.navn}> {kat.navn.charAt(0).toUpperCase() + kat.navn.slice(1)} </option>
                                })}
                            </Input>
                          </FormGroup>
                            </div>
                        <div className="col-md-8">
                        <FormGroup>
                            <Label for="navn">Navn</Label>
                            <Input id="navn" name="navn"></Input>
                        </FormGroup>
                            </div>
                        </div>
                        <ButtonGroup className="float-right">
                        <Button
                            color="danger"
                            tag={Link}
                            to="/alleSymptomer"
                        >
                            <i className="bi bi-box-arrow-in-left"></i> 
                            Tilbake
                          </Button>
                          <Button
                            color="success"
                            onClick={() => lagreSymptom()}
                          >
                            <i className="bi bi-check"></i>
                            Lagre
                          </Button>
                        </ButtonGroup>
                    </Form>

                    {lasterInnIkon && (
                        <div className="lastInn-Boks">
                            <div className="lasterInn-Ikon"></div>
                            <p>Laster inn...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}