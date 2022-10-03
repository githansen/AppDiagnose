import React, { Component, useEffect, useState } from 'react';
import { Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';



export const alleKategorier = () => {
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
                <div className="col-md-12">
                    <h1><i className="bi bi-bookmarks"></i> Kategorier</h1>
                    <p>Liste over alle symptom-kategorier. (Viser pr.nå alle symptomer. Må byttes med kategorier)</p>
                </div>
            </div>
            <div className="row align-items-center bg-light p-4">
                <div className="col-md-12">
                    <Table
                        hover
                        size="md"
                    >
                        <thead><tr><th>Alle kategorier</th></tr></thead><tbody>
                            {liste.map((i, index) => {
                                return <tr key={index}>
                                    <td className="tableTitteltd align-middle">{i.navn}</td>
                                </tr>
                            })}
                        </tbody>
                    </Table>

                </div>
            </div>
        </div>
    );
}
