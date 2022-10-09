import React, { Component, useState } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';



export const Dokumentasjon = () => {
    return (
        <div className="container py-4">
            <div className="row align-items-center bg-light p-5">
                <div className="col-md-6">
                    <h1><i className="bi bi-file-binary"></i> Dokumentasjon</h1>
                </div>
                <div className="col-md-6 text-center">
                    <a className="btn btn-primary mx-2" target="_blank" href="../pdf/diagnose-dokumentasjon.pdf">
                        <i className="bi bi-filetype-pdf"></i> Åpne dokumentasjon
                    </a>
                    <a className="btn btn-warning mx-2" target="_blank" href="https://github.com/githansen/AppDiagnose">
                        <i className="bi bi-github"></i> Se repository
                    </a>
                </div>
            </div>
        </div>
    );
}

