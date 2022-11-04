// File - LoggInn.js //

//JavaScript Bibliotek
import React, { Component, useEffect, useState } from 'react';
import { Form, FormGroup, Input, Label, Button, ButtonGroup, Alert, NavItem, NavLink } from "reactstrap";
import { Link } from 'react-router-dom';
import $ from 'jquery'
import { NavMenu } from '../felles/NavMenu';



//OUTPUT 
export const LoggInn = () => { 
    //Laster inn - Ikon 
    const [lasterInnIkon, setLasterInn] = useState(false);

    //Alert
    const [visible, setVisible] = useState(false);
    const [color, setColor] = useState('primary');
    const [alertText, setText] = useState('');

    const loggMegInn = () => {
        const bruker = {
            Brukernavn: $("#brukernavn").val(), 
            Passord: $("#passord").val()
        }
        $.get("/diagnose/logginn", bruker, function (data) {
            window.location.href = "/dashboard"
        })
        //Alert som viser at symptom er satt inn suksessfullt
        setColor('danger');
        setText('Brukernavn eller passord er feil!');
        setVisible(true);
        //Gjemmer alert etter 2sek 
        if (setVisible) {
            setTimeout(() => {
                setVisible(false);
            }, 3000)
        }
    }

    return (
        <div className="container py-5">
            <div className="row align-items-md-stretch">
                <div className="col-md-6 offset-md-3">
                    <Alert id="varslingsBoks" color={color} isOpen={visible} >
                        <div>{alertText}</div>
                    </Alert>
                </div>
                <div id="loggInnBoks" className="col-md-6 offset-md-3 mx-auto d-block">
                    <img className="card-img loggInnLogo mx-auto d-block" src="./img/MinDiagnose_logo.png" alt="Logo"></img>
                    <h2 className="text-center">MinDiagnose - Backend</h2>
                    <p className="text-center text-muted">Skriv inn brukernavn og passord</p>

                    <Form>
                        <div className="row align-items-md-stretch">
                            <div className="col-md-12">
                                <FormGroup>
                                    <Label for="brukernavn">Brukernavn (admin)</Label>
                                    <Input type="text" id="brukernavn" name="brukernavn" className="form-control" required="" autoFocus=""></Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="passord">Passord (admin)</Label>
                                    <Input type="password" id="passord" name="passord" className="form-control" required="" autoFocus=""></Input>
                                </FormGroup>
                            </div>

                            <div className="col-md-12">
                                <NavLink tag={Link} className="text-dark onlyTxtLink text-muted" to="/glemtpassord">Glemt passordet?</NavLink>
                            </div>

                            <div className="col-md-12 text-center">
                                <Button
                                    color="primary"
                                    onClick={() => loggMegInn()}
                                    className="text-center px-4 btn-lg btn-block"
                                >
                                    <i className="bi bi-box-arrow-in-right pr-2"></i> 
                                      Logg inn
                                </Button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}

