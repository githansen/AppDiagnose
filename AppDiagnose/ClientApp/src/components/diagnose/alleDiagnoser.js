// File - alleDiagnoser.js //

//JavaScript Bibliotek
import React, { Component, useEffect, useState } from 'react';
import { Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';


//Funksjon 
const slettDiagnose = (index) => {
    console.log(index)
    alert('Vil du slette denne? (Ingen funksjonalitet)');

};

//Funksjon 
const leggTilNyDiagnose = (index) => {
    console.log(index)
    alert('Test! (Ingen funksjonalitet)');

};


//OUTPUT 
export const alleDiagnoser = () => {
    const [liste, setListe] = useState([])
    const [lasterInnIkon, setLasterInn] = useState(false);

    useEffect(() => {
        //Viser lasterInn-ikon
        setLasterInn(true);
        $.get("/diagnose/HentalleDiagnoser", function (data) {   
               //Skjuler lasterInn-ikon
                setLasterInn(false);
                setListe(data)
        }).fail(function (jqXHR) {
            //feilhåndtering
        })
    }, []);


    return (
        <div className="container py-4">
            <div className="row align-items-center my-4">
                <div className="col-md-12">
                    <h1><i className="bi bi-clipboard2-pulse"></i> Diagnoser</h1>
                </div>
            </div>
            {lasterInnIkon && (
                <div className="lastInn-Boks">
                    <div className="lasterInn-Ikon"></div>
                    <p>Laster inn...</p>
                </div>
            )}
            <div className="row align-items-center bg-light p-4">
                <div className="col-md-12">
                    <Table hover size="sm">
                        <thead><tr><th>#ID</th><th>Navn</th><th></th></tr></thead><tbody>
                            {liste.map((i, index) => {
                                return <tr key={index}><th scope="row" className="align-middle"> {i.diagnoseId}</th>

                                    <td className="tableTitteltd ">{i.navn}</td>
                                    <td style={{ textAlign: 'right' }}>
                                        <a size="sm" className="mx-2 btn btn-success btn-sm" href={`${i.link}`} target="_blank"><i className="bi bi-box-arrow-up-right"></i></a>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </Table>

                </div>
            </div>
        </div>
    );
}