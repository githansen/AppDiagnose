// File - alleSymptomer.js //

//JavaScript Bibliotek
import React, { Component, useEffect, useState } from 'react';
import { Table, Button, Alert } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import $ from 'jquery'
import { loggetinn } from "../Funksjoner/Innlogget"


//Funksjon 
const slettSymptom = (index) => {
    //Sletter symptom fra databasen 
    let url = "/diagnose/slettSymptom?Id=" + index
    $.post(url, function (data) {
        //Laster inn siden på nytt for å se endringer 
        window.location.reload()
    });
};



//OUTPUT
export const alleSymptomer = () => {

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

    //Use-Effect kjøres her 1 gang i det dokumentet rendres
    useEffect(() => {
        //Viser lasterInn-ikon 
        setLasterInn(true);
        //Henter liste over alle symptomer 
        $.get("/diagnose/hentalleSymptomer", function (data) {
            
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
                <div className="col-md-8">
                    <h1><i className="bi bi-activity"></i> Symptomer</h1>
                    <p>Legg til eller rediger symptomer</p>
                </div>
                <div className="col-md-4">
                    <Button
                        className="float-right"
                        color="success"
                        tag={Link}
                        to="/leggTilSymptom"
                    >
                        <i className="bi bi-plus-lg"></i> Legg til ny
                    </Button>
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
                        <thead><tr><th>#ID</th><th>Navn</th><th>Kategori</th><th></th></tr></thead><tbody>
                            {liste.map((i, index) => {
                                return <tr key={index}><th scope="row" className="align-middle"> {i.symptomId}</th>

                                    <td className="tableTitteltd align-middle">{i.navn}</td>
                                    <td className="tableTitteltd align-middle longTxt">{i.kategori.navn}</td>
                                    <td style={{ textAlign: 'right' }}>
                                        <Button size="sm" className="mx-2" color="primary" tag={Link} to={{ pathname: "/redigerSymptom", search: `?id=${i.symptomId}` }}><i className="bi bi-pencil"></i></Button>
                                        <Button size="sm" color="danger" onClick={() => slettSymptom(i.symptomId)}><i className="bi bi-trash3"></i></Button></td>
                                </tr>
                            })}
                        </tbody>
                    </Table>
                      
                </div>
            </div>
        </div>
    );
}