﻿// File - redigerSymptom.js //

//JavaScript Bibliotek
import React, { Component, useEffect, useState } from 'react';
import { Form, FormGroup, Input, Label, Button, ButtonGroup, Alert } from "reactstrap";
import { Link, useHistory } from 'react-router-dom';
import $ from 'jquery'

//Kjører sjekk om bruker er innlogget 
import { loggetinn } from "../Funksjoner/Innlogget"



//OUTPUT
export const redigerSymptom = () => {

    //Om brukeren ikke er innlogget, send til innlogging
    const history = useHistory();
    if (loggetinn().id == 0) {
        history.push("/logginn");
    }


    const [symptom, setSymptom] = useState(null);
    const [kategorier, setKategorier] = useState([]);
    const id = window.location.search.substring(1);
    //Konstant for innslastningsikon
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
        const regex = new RegExp(/^[a-zA-ZæøåÆØÅ. \-]{2,20}$/);
        var regextest = regex.test(s.navn);
        if (regextest) {
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
        }
        else {
            //Alert som viser at createSymptom feilet
            setColor('danger');
            setText(s.navn + ' er ikke et godkjent symptomnavn. Bruk vanlige bokstaver. 2 - 20 tegn.');
            setVisible(true);
            //Gjemmer alert etter 2sek 
            if (setVisible) {
                setTimeout(() => {
                    setVisible(false);
                }, 2000)
            }
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
            //Alert som viser feil i API kall
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

        $.get("/diagnose/HentAlleKategorier", function (data) {
                setKategorier(data)
        }).fail(function (jqXHR) {
            //Alert som viser at createSymptom feilet
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