// File - LoggInn.js //

//JavaScript Bibliotek
import React, { Component, useEffect, useState } from 'react';
import { Form, FormGroup, Input, Label, Button, ButtonGroup, Alert, NavItem, NavLink } from "reactstrap";
import { Link, useHistory } from 'react-router-dom';
import $ from 'jquery'
import { NavMenu } from '../felles/NavMenu';
import { loggetinn } from "../Funksjoner/Innlogget"



//OUTPUT 
export const LoggInn = () => {

    const history = useHistory();
    if (loggetinn().id !== 0) {
        window.location.href = "/dashboard"
    }

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
            if (data === 'true') {//Om det er riktig brukernavn og passord 
                window.location.href = "/dashboard" //Send bruker til dashboard
            } else { //Om det er feil brukernavn og passord
                setVisible(false);
                setColor('danger');
                setText('Feil brukernavn eller passord. Prøv igjen!');
                setVisible(true);
                $('#brukernavn').val('');
                $('#passord').val('');
                //Gjemmer alert etter 2sek
                if (setVisible) {
                    setTimeout(() => {
                        setVisible(false);
                    }, 2000)
                }
            }  
        })
    }

    return (
        <div className="container py-5">
            <div className="row align-items-md-stretch">
                <div id="loggInnBoks" className="col-md-6 offset-md-3 mx-auto d-block loggInnBoks">
                    <Alert id="varslingsBoks" color={color} isOpen={visible} >
                        <div>{alertText}</div>
                    </Alert>
                    <img className="card-img loggInnLogo mx-auto d-block" src="./img/MinDiagnose_logo.webp" alt="Logo"></img>
                    <h2 className="text-center">MinDiagnose - Backend</h2>
                    <p className="text-center text-muted">Skriv inn brukernavn og passord</p>
                    <Form>
                        <div className="row align-items-md-stretch">
                            <div className="col-md-12">
                                <FormGroup>
                                    <Label for="brukernavn">Brukernavn (per eller anna)</Label>
                                    <Input type="text" id="brukernavn" name="brukernavn" className="form-control"></Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="passord">Passord (admin)</Label>
                                    <Input type="password" id="passord" name="passord" className="form-control"></Input>
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

