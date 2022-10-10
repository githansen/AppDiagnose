﻿import React, { Component, useEffect, useState} from 'react';
import { Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import $ from 'jquery'

function Example() {
    useEffect(() => {
        document.title = 'My Page Title';
    });
}

const slettSymptom = (index) => {
    //Sletter symptom fra databasen
    let url = "/diagnose/slettSymptom?Id=" + index
    $.post(url, function (data) {
        window.location.reload()
    });
    
   
};


export const alleSymptomer = () => {
    const [liste, setListe] = useState([])
    const [lasterInnIkon, setLasterInn] = useState(false);
    //Use-Effect kjøres her 1 gang i det dokumentet rendres
    useEffect(() => {
        //Viser lasterInn-ikon
        setLasterInn(true);
        //Henter liste over alle symptomer
        fetch("/diagnose/hentalleSymptomer")
            .then(data => data.json())
            .then((data) => {
                //Skjuler lasterInn-ikon
                setLasterInn(false);
                setListe(data)
            })
    }, []);


    return (
        <div className="container py-4">
            <div className="row align-items-center my-4">
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
                                    <td className="tableTitteltd align-middle">{i.kategori.navn}</td>
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