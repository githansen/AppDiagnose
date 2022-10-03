import React, { Component, useEffect, useState } from 'react';
import { Form, FormGroup, Input, Label, Button, ButtonGroup } from "reactstrap";
import Select from 'react-select';
import { Link } from 'react-router-dom';
import $ from 'jquery'


export const leggTilDiagnose = () => {
    const lagreDiagnose = () => {
        alert('Du blir nå sendt til "Alle Diagnoser" siden. (Ingen funksjonalitet)');
    };
    return (
        <div className="container py-4">
            <div className="row align-items-md-stretch">
                <div className="col-md-12">
                    <h1><i className="bi bi-clipboard2-pulse"></i> Legg til en ny diagnose</h1>
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
                                onClick={() => lagreDiagnose()}
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

