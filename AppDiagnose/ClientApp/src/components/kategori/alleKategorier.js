// File - alleKategorier.js //

//JavaScript Bibliotek
import React, { Component, useEffect, useState } from 'react';
import { Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';



//OUTPUT 
export const alleKategorier = () => {
    const [liste, setListe] = useState([])
    const [lasterInnIkon, setLasterInn] = useState(false);

    useEffect(() => {
        //Viser lasterInn-ikon
        setLasterInn(true);
        $.get("/diagnose/HentAlleKategorier", function (data) {
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
