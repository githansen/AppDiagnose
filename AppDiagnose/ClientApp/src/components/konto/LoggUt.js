// File - LoggUt.js //

//JavaScript Bibliotek
import React, { Component, useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';



//OUTPUT
export const LoggUt = () => {

    return (
        <div className="container py-5">
            <div className="row align-items-center text-center my-4">
                <div className="col-md-12">
                    <h1><i className="bi bi-door-open"></i> Du er nå logget ut!</h1>
                    <br></br>
                    <Button
                        color="primary"
                        tag={Link}
                        to="/"
                    >
                    <i className="bi bi-stars"></i> Gå hjem
                    </Button>
                </div>
            </div>
        </div>
    );
}


