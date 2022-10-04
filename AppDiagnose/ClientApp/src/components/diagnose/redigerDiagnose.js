import React, { Component, useEffect, useState } from 'react';
import { Form, FormGroup, Input, Label, Button, ButtonGroup } from "reactstrap";
import Select from 'react-select';
import { Link } from 'react-router-dom';
import $ from 'jquery'


export const redigerDiagnose = () => {
    const [symptom, setSymptom] = useState(null)
    const id = window.location.search.substring(1);
    const [lasterInnIkon, setLasterInn] = useState(false); 

    const lagreDiagnose = () => {

        const s = {
            symptomId: symptom.symptomId,
            navn: $("#navn").val(),
        }

        $.post("/diagnose/endreSymptom", s, function (data) {
            console.log(data)
        })
    };


    useEffect(() => {
        //Viser lasterInn-ikon
        setLasterInn(true);
        const url = "/diagnose/HentEtSymptom?" + id
        console.log(url)
        fetch(url)
            .then(data => data.json())
            .then((data) => {
                setSymptom(data)
                document.getElementById("navn").value = data.navn
                document.getElementById("navnTittel").innerHTML = data.navn
                //Skjuler lasterInn-ikon   
                setLasterInn(false);
            })

    }, [])
    return (
        <div className="container py-4">
            <div className="row align-items-md-stretch">
                <div className="col-md-12">
                    <h1><i className="bi bi-clipboard2-pulse"></i> Rediger diagnose: <b><span id='navnTittel'></span></b></h1>
                    <p>*Alle felt må være fyllt ut</p>

                    <Form >

                        <div className="row align-items-md-stretch">
                            <div className="col-md-12">
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
                                to="/alleDiagnoser"
                            >
                                <i className="bi bi-x"></i>
                            Avbryt
                          </Button>
                            <Button
                                color="success"
                                onClick={() => lagrediagnose()}
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