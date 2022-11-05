// File - alleKategorier.js //

//JavaScript Bibliotek
import React, { Component, useEffect, useState } from 'react';
import { Table, Button, Alert } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import $ from 'jquery'
import { loggetinn } from "../Funksjoner/Innlogget"



//OUTPUT 
export const alleKategorier = () => {

    const history = useHistory();
    if (loggetinn().id == 0) {
        history.push("/logginn");
    }


    const [liste, setListe] = useState([])
    const [lasterInnIkon, setLasterInn] = useState(false);

    //Alert
    const [visible, setVisible] = useState(false);
    const [color, setColor] = useState('primary');
    const [alertText, setText] = useState('');

    useEffect(() => {
        //Viser lasterInn-ikon
        setLasterInn(true);
        $.get("/diagnose/HentAlleKategorier", function (data) {
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
                    <h1><i className="bi bi-bookmarks"></i> Kategorier</h1>
                    <p>Liste over alle symptom-kategorier</p>
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
                    <Table hover size="md">
                        <thead><tr><th>Alle kategorier</th></tr></thead><tbody>
                            {liste.map((i, index) => {
                                return <tr key={index}>
                                    <td className="tableTitteltd align-middle"><img className="img-fluid" src={`./img/kategori_${i.id}.png`}></img>{i.navn}</td>
                                    
                                </tr>
                            })}
                        </tbody>
                    </Table>

                </div>
            </div>
        </div>
    );
}
