﻿import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
        return (
            <div className="container py-4">

                <div className="row align-items-md-stretch">
                    <div className="col-md-6">
                        <div className="p-5 mb-4 bg-dark rounded-3">
                            <div className="container-fluid py-5">
                                <h1 className="display-5 fw-bold text-light">CRUD Dashboard</h1>
                                <p className="col-md-12 fs-5 text-light p-0">
                                    Dette er ditt dashboard. Her kan du legge til og endre kategorier, symptomer, diagnoser, bedrifter eller medisiner.
                                    Prøv deg frem!
                                </p>
                                <button type="button" className="btn btn-light mt-3">Les dokumentasjonen her</button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="list-group w-auto">

                            <NavLink tag={Link} className="text-dark" to="/symptom">
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

                            <NavLink tag={Link} className="text-dark" to="/diagnose">
                                <div className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                                    <div className="d-flex gap-2 w-100 justify-content-between">
                                        <div>
                                            <h6 className="mb-0"><i className="bi bi-clipboard2-pulse"></i> Diagnoser</h6>
                                            <p className="mb-0 opacity-75">Legg til eller rediger diagnoser</p>
                                        </div>
                                        <small className="opacity-50 text-nowrap">.02</small>
                                    </div>
                                </div>
                            </NavLink>

                            <NavLink>
                                <div className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                                    <div className="d-flex gap-2 w-100 justify-content-between">
                                        <div>
                                            <h6 className="mb-0"><i className="bi bi-bookmarks"></i> Kategorier</h6>
                                            <p className="mb-0 opacity-75">Legg til eller rediger symptom kategorier</p>
                                        </div>
                                        <small className="opacity-50 text-nowrap">.03</small>
                                    </div>
                                </div>
                            </NavLink>

                            <NavLink>
                                <div className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                                    <div className="d-flex gap-2 w-100 justify-content-between">
                                        <div>
                                            <h6 className="mb-0"><i className="bi bi-building"></i> Bedrifter</h6>
                                            <p className="mb-0 opacity-75">Legg til eller rediger bedrifter</p>
                                        </div>
                                        <small className="opacity-50 text-nowrap">.04</small>
                                    </div>
                                </div>
                            </NavLink>

                            <NavLink>
                                <div className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                                    <div className="d-flex gap-2 w-100 justify-content-between">
                                        <div>
                                            <h6 className="mb-0"><i className="bi bi-capsule"></i> Medisiner</h6>
                                            <p className="mb-0 opacity-75">Legg til eller rediger medisiner</p>
                                        </div>
                                        <small className="opacity-50 text-nowrap">.05</small>
                                    </div>
                            </div>
                            </NavLink>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
