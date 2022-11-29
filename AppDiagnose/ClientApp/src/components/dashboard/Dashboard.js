// File - Dashboard.js //

//JavaScript Bibliotek
import React, { Component, useState, useNavigate } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Button } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import $ from 'jquery'

//Kjører sjekk om bruker er innlogget 
import {  loggetinn } from "../Funksjoner/Innlogget"



//OUTPUT
export const Dashboard = () => {

    //Om brukeren ikke er innlogget, send til innlogging
    const history = useHistory();
    if (loggetinn().id == 0) {
        history.push("/logginn");
    }

    return (
        <div className="dashboard container py-4">
            <div className="row align-items-md-stretch">
                <div className="col-md-6">
                    <div className="p-5 mb-4 bg-primary">
                        <div className="container-fluid py-5 text-center">
                            <img src={`./img/big_avatar_${loggetinn().id}.webp`}></img>
                            <h1 className="display-5 fw-bold text-light">Hei, {loggetinn().brukernavn}.</h1>
                            <p className="col-md-12 fs-5 text-light p-0">
                                Dette er ditt CRUD dashboard. Her kan du legge til og endre symptomer, eller se diagnoser, kategorier og siste aktivitet.
                                Prøv deg frem!
                                </p>
                            <Button
                                className="mt-3"
                                color="light"
                                tag={Link}
                                to="/dokumentasjon"
                            >
                            <i className="bi bi-file-text"></i> Se dokumentasjonen her
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="list-group w-auto">
                        <NavLink tag={Link} className="text-dark pt-0" to="/alleSymptomer">
                            <div className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                                <div className="d-flex gap-2 w-100 justify-content-between">
                                    <div>
                                        <h6 className="mb-0"><i className="bi bi-activity"></i> Symptomer</h6>
                                        <p className="mb-0 opacity-75">Legg til eller rediger symptomer</p>
                                    </div>
                                    <small className="opacity-50 text-nowrap">.01</small>
                                </div>
                            </div>
                        </NavLink>
                        <NavLink tag={Link} className="text-dark" to="/alleDiagnoser">
                            <div className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                                <div className="d-flex gap-2 w-100 justify-content-between">
                                    <div>
                                        <h6 className="mb-0"><i className="bi bi-clipboard2-pulse"></i> Diagnoser</h6>
                                        <p className="mb-0 opacity-75">Se alle diagnoser</p>
                                    </div>
                                    <small className="opacity-50 text-nowrap">.02</small>
                                </div>
                            </div>
                        </NavLink>
                        <NavLink tag={Link} className="text-dark" to="/alleKategorier">
                            <div className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                                <div className="d-flex gap-2 w-100 justify-content-between">
                                    <div>
                                        <h6 className="mb-0"><i className="bi bi-bookmarks"></i> Kategorier</h6>
                                        <p className="mb-0 opacity-75">Se alle symptom-kategorier</p>
                                    </div>
                                    <small className="opacity-50 text-nowrap">.03</small>
                                </div>
                            </div>
                        </NavLink>
                        <NavLink tag={Link} className="text-dark" to="/allAktivitet">
                            <div className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                                <div className="d-flex gap-2 w-100 justify-content-between">
                                    <div>
                                        <h6 className="mb-0"><i className="bi bi-person-lines-fill"></i> Aktivitet</h6>
                                        <p className="mb-0 opacity-75">Se all logging av aktiviteter</p>
                                    </div>
                                    <small className="opacity-50 text-nowrap">.04</small>
                                </div>
                            </div>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
}