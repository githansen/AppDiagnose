// File - alleDiagnoser.js //

//JavaScript Bibliotek
import React, { Component, useEffect, useState } from 'react';
import { Table, Button, Alert } from 'reactstrap';
import { Link } from 'react-router-dom';


//OUTPUT 
export const allAktivitet = () => {
    const [liste, setListe] = useState([])
    const [lasterInnIkon, setLasterInn] = useState(false);

    //Alert
    const [visible, setVisible] = useState(false);
    const [color, setColor] = useState('primary');
    const [alertText, setText] = useState('');


    return (
        <div className="container py-4">
            <div className="row align-items-center my-4">
                <div className="col-md-12">
                    <Alert id="varslingsBoks" color={color} isOpen={visible} >
                        <div>{alertText}</div>
                    </Alert>
                </div>
                <div className="col-md-12">
                    <h1><i className="bi bi-person-lines-fill"></i> Aktivitet</h1>
                    <p>Her kan du følge med på de 30 siste endringene som har blitt gjort, sortert fra nyeste aktivitet.</p>
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
                        <thead><tr><th>Tidspunkt</th><th>Bruker</th><th>Info</th></tr></thead><tbody>
                            {liste.map((i, index) => {
                                return
                                <tr key={index}>
                                    <th scope="row" className="align-middle"> {i.diagnoseId}</th>
                                    <td className="tableTitteltd ">{i.navn}</td>
                                    <td className="tableTitteltd longTxt">{i.info}</td>
                                </tr>
                            })}
                        </tbody>
                    </Table>

                </div>
            </div>
        </div>
    );
}