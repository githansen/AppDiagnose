import React, { Component } from 'react';


const handleSubmit = (evt) => {
    evt.preventDefault();
};

export const Diagnose = () => {
    return (
        <div className="container py-4">
            <div className="row align-items-md-stretch">
                <div className="col-md-12">
                    <h1><i className="bi bi-clipboard2-pulse"></i> Diagnoser</h1>
                    <p>Legg til eller rediger diagnoser</p>
                </div>
            </div>
        </div>
    );
}
