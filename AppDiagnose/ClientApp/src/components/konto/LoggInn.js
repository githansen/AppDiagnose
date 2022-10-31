// File - LoggInn.js //

//JavaScript Bibliotek
import React, { Component, useEffect, useState } from 'react';
import { Form, FormGroup, Input, Label, Button, ButtonGroup, Alert, NavItem, NavLink } from "reactstrap";
import { Link } from 'react-router-dom';
import $ from 'jquery'



//OUTPUT 
export const LoggInn = () => { 
    //Laster inn - Ikon 
    const [lasterInnIkon, setLasterInn] = useState(false);

    //Alert
    const [visible, setVisible] = useState(false);
    const [color, setColor] = useState('primary');
    const [alertText, setText] = useState('');

    const loggMegInn = () => {
        //Alert som viser at symptom er satt inn suksessfullt
        setColor('danger');
        setText('E-post eller passord er feil!');
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
                <div className="col-md-4 offset-md-4">
                    <Alert id="varslingsBoks" color={color} isOpen={visible} >
                        <div>{alertText}</div>
                    </Alert>
                </div>
                <div id="leggInnBoks" className="col-md-4 offset-md-4">
                    <h1 className="text-center">MinDiagnose App</h1>
                    <p className="text-center">Skriv inn e-post og passord</p>

                    <Form>
                        <div className="row align-items-md-stretch">
                            <div className="col-md-12">
                                <FormGroup>
                                    <Label for="epost">E-post</Label>
                                    <Input id="epost" name="epost"></Input>
                                </FormGroup>

                                <FormGroup>
                                    <Label for="passord">Passord</Label>
                                    <Input id="passord" name="passord"></Input>
                                </FormGroup>
                            </div>

                            <div className="col-md-12">
                                <NavLink tag={Link} className="text-dark onlyTxtLink" to="/glemt-passord">Glemt passordet?</NavLink>
                            </div>

                            <div className="col-md-12 text-center">
                                <Button
                                    color="primary"
                                    onClick={() => loggMegInn()}
                                    className="text-center px-4"
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

