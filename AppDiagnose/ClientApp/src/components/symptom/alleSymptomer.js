﻿import React, { Component, useEffect, useState} from 'react';
import { Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';


const slettSymptom = (index) => {
    console.log(index)
    alert('Vil du slette denne? (Ingen funksjonalitet)');
   
};

const leggTilNySymptom = (index) => {
    console.log(index)
    alert('Test! (Ingen funksjonalitet)');

};


export const alleSymptomer = () => {
    const [liste, setListe] = useState([])
    useEffect(() => {
        fetch("/diagnose/hentalleSymptomer")
            .then(data => data.json())
            .then((data) => {
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
            <div className="row align-items-center bg-light p-4">
                <div className="col-md-12">
                    <Table
                        hover
                        size="sm"
                    >
                        <thead><tr><th>#ID</th><th>Navn</th><th></th></tr></thead><tbody>
                            {liste.map((i, index) => {
                                return <tr key={index}><th scope="row" className="align-middle"> {i.symptomId}</th>

                                    <td className="tableTitteltd align-middle">{i.navn}</td>
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