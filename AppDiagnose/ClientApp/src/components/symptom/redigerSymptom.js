
import React, { Component, useEffect, useState } from 'react';
import { Form, FormGroup, Input, Label, Button, ButtonGroup } from "reactstrap";
import { Link } from 'react-router-dom';
import $ from 'jquery'


export const redigerSymptom = () => {
    const [symptom, setSymptom] = useState(null)
    const [kategorier, setKategorier] = useState([])
    const id = window.location.search.substring(1); 


    const lagreSymptom = () => {
    
        const s = {
            symptomId: symptom.symptomId,
            navn: $("#navn").val(),
            kategori: $("#kat").val(),
        }
 
        $.post("/diagnose/endreSymptom", s, function (data) {
            console.log(data)
        })
    };


    useEffect(() => {
        const url = "/diagnose/HentEtSymptom?" + id 
        console.log(url)
        fetch(url)
            .then(data => data.json())
            .then((data) => {
                setSymptom(data)
                document.getElementById("navn").value = data.navn
            })
        fetch("/diagnose/HentAlleKategorier")
            .then(data => data.json())
            .then((data) => {
                setKategorier(data)
            })
        
    },[])
    return (
        <div className="container py-4">
            <div className="row align-items-md-stretch">
                <div className="col-md-12">
                    <h1><i className="bi bi-activity"></i> Rediger symptom - "SYMPTOM X"</h1>
                    <p>Rediger symptomet</p>
                    <Form >
                        <FormGroup>
                            <Label for="navn">Navn</Label>
                            <Input id="navn" name="navn"></Input>
                            <select id="kat">
                                {kategorier.map((kat, index) => {

                                    return <option key={index} value={kat.navn}> {kat.navn} </option>
                                })}
                            </select>
                        </FormGroup>

                        <ButtonGroup className="float-right">
                        <Button
                            color="danger"
                            tag={Link}
                            to="/alleSymptomer"
                        >
                            <i className="bi bi-x"></i> 
                            Avbryt
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
                </div>
            </div>
        </div>
    );
}