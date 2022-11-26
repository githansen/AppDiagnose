// File - Dokumentasjon.js //

//JavaScript Bibliotek
import React, { Component, useState } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';



//OUTPUT
export const Dokumentasjon = () => {
    return (
        <div className="container py-4">
            <div className="row align-items-center bg-light p-5">
                <div className="col-md-6">
                    <h1><i className="bi bi-file-binary"></i> Dokumentasjon</h1>
                </div>
                <div className="col-md-6 text-center">
                    <a className="btn btn-primary mx-2" target="_blank" href="https://docs.google.com/document/d/1YwnVkYCv2DCyMPA8y9FbR5IyItnCRY253rxzR2rx9us/edit?usp=sharing">
                        <i className="bi bi-file-earmark-font"></i> Se dokumentasjon
                    </a>
                    <a className="btn btn-warning mx-2" target="_blank" href="https://github.com/githansen/AppDiagnose">
                        <i className="bi bi-github"></i> Se repository
                    </a>
                </div>
            </div>
        </div>
    );
}

