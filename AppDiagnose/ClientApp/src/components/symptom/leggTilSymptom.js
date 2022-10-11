// File - leggTilSymptom.js //

//JavaScript Bibliotek
import React, { Component, useEffect, useState } from 'react';
import { Form, FormGroup, Input, Label, Button, ButtonGroup, Alert } from "reactstrap";
import { Link } from 'react-router-dom';
import $ from 'jquery'



//OUTPUT
export const leggTilSymptom = () => {
    const [symptom, setSymptom] = useState(null);
    const [kategorier, setKategorier] = useState([]);
    const id = window.location.search.substring(1);

    //Alert
    const [visible, setVisible] = useState(false);
    const [color, setColor] = useState('primary');
    const [alertText, setText] = useState('');


    const createSymptom = () => {

        //const s = {
        //    symptomId: symptom.symptomId,
        //    navn: $("#navn").val(),
        //    kategori: $("#kat").val(),
        //}
        var navn = $("#navn").val()
        var kategori = $("#kategoriSelect").val()
        console.log(kategori)


        $.post("/Diagnose/CreateSymptom?navn=" + navn + "&kategoriId=" + kategori,  function (data) {
            console.log(data)
        })


        //Setter input og select til initial
        $('#navn').val('');
        $('#kategoriSelect').prop('selectedIndex', 0);
        //Alert som viser at symptom er satt inn suksessfullt
        setColor('success');
        setText('Symptom "' + navn + '" ble lagt inn!');
        setVisible(true);
        //Gjemmer alert etter 2sek 
        if (setVisible) {
            setTimeout(() => {
                setVisible(false);
            }, 2000)
        }
    };

    useEffect(() => {
        //const url = "/diagnose/HentEtSymptom?" + id
        //console.log(url)
        //fetch(url)
        //    .then(data => data.json())
        //    .then((data) => {
        //        setSymptom(data)
        //        document.getElementById("navn").value = data.navn
        //        document.getElementById("navnTittel").innerHTML = data.navn
        //    })
        fetch("/diagnose/HentAlleKategorier")
            .then(data => data.json())
            .then((data) => {
                setKategorier(data)
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
                <div id="leggInnBoks" className="col-md-12">
                    <h1><i className="bi bi-activity"></i> Legg til nytt symptom</h1>
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
                                            console.log(kat)
                                            return <option key={index} value={kat.id}>{kat.id} - {kat.navn.charAt(0).toUpperCase() + kat.navn.slice(1)} </option>
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
                                <i className="bi bi-x"></i>
                            Avbryt
                          </Button>
                            <Button
                                color="success"
                                onClick={() => createSymptom()}
                            >
                                <i className="bi bi-plus"></i>
                            Legg til
                          </Button>
                        </ButtonGroup>
                    </Form>
                </div>
            </div>
        </div>
    );
}
