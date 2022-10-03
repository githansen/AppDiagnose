import React, { Component, useEffect, useState } from 'react';
import { Form, FormGroup, Input, Label, Button, ButtonGroup } from "reactstrap";
import Select from 'react-select'
import { Link } from 'react-router-dom';
import $ from 'jquery'


export const redigerDiagnose = () => {
    const [symptom, setSymptom] = useState(null)
    const [kategorier, setKategorier] = useState([])
    const id = window.location.search.substring(1);

    const lagreSymptom = () => {

        const s = {
            symptomId: symptom.symptomId,
            navn: $("#navn").val(),
            kategori: $("#kat").val(),
        }

        $.post("/diagnoses/endreSymptom", s, function (data) {
            console.log(data)
        })
    };


    return (
        <div className="container py-4">
            <div className="row align-items-md-stretch">
                <div className="col-md-12">
                    <h2><i className="bi bi-activity"></i> Rediger diagnose: <b><span id='navnTittel'></span></b></h2>
                    <p>*Alle felt må være fyllt ut</p>

                    <Form >
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
                                onClick={() => lagreDiagnose()}
                            >
                                <i className="bi bi-check"></i>
                            Lagre
                          </Button>
                        </ButtonGroup>
                    </Form>
                </div>
            </div>
        </div>
    );
}
