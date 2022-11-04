// File - GlemtPassord.js //

//JavaScript Bibliotek
import React, { Component, useState } from 'react';



//OUTPUT
export const GlemtPassord = () => {
    return (
        <div className="container py-4">
            <div className="row align-items-center  p-5">
                <div className="col-md-12 d-block mx-auto text-center">
                    <h1><i className="bi bi-key"></i></h1>
                    <h2>Har du glemt passordet ditt?</h2>
                    <p>Kontakt admin og be om en gjenopprettelses link</p>
                </div>
            </div>
        </div>
    );
}


