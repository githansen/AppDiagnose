// File - alleDiagnoser.js //

//JavaScript Bibliotek
import React, { Component, useEffect, useState } from 'react';
import { Table, Button, Alert } from 'reactstrap';
import { Link } from 'react-router-dom';
import $ from 'jquery'


//OUTPUT 
export const alleDiagnoser = () => {

    //Sjekker om bruker er innlogget, hvis ikke sendes bruker til innloggingssiden
    const url = "/diagnose/ErLoggetInn"
    let innlogget = null;
    $.ajax({
        url: url,
        type: 'get',
        async: false,
        success: function (data) {
            if (data == false) {
                window.location.href = "/logginn"
            }
        }
    })


    const [liste, setListe] = useState([])
    const [lasterInnIkon, setLasterInn] = useState(false);

    //Alert
    const [visible, setVisible] = useState(false);
    const [color, setColor] = useState('primary');
    const [alertText, setText] = useState('');

    useEffect(() => {
        //Viser lasterInn-ikon
        setLasterInn(true);
        $.get("/diagnose/HentalleDiagnoser", function (data) {   
               //Skjuler lasterInn-ikon
                setLasterInn(false);
                setListe(data)
        }).fail(function (jqXHR) {
            //Alert som viser feil i API kall
            setColor('danger');
            setText('Feil i respons for API-kall');
            setVisible(true);
            //Gjemmer alert etter 2sek 
            if (setVisible) {
                setTimeout(() => {
                    setVisible(false);
                }, 2000)
            }
        })
    }, []);


    return (
        <div className="container py-4">
            <div className="row align-items-center my-4">
                <div className="col-md-12">
                    <Alert id="varslingsBoks" color={color} isOpen={visible} >
                        <div>{alertText}</div>
                    </Alert>
                </div>
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
                        <thead><tr><th>#ID</th><th>Navn</th><th>Info</th><th></th></tr></thead><tbody>
                            {liste.map((i, index) => {
                                return <tr key={index}><th scope="row" className="align-middle"> {i.diagnoseId}</th>

                                    <td className="tableTitteltd ">{i.navn}</td>
                                    <td className="tableTitteltd longTxt">{i.info}</td>
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