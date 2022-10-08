import React, { Component, useEffect, useState } from 'react';
import { Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';


const slettDiagnose = (index) => {
    console.log(index)
    alert('Vil du slette denne? (Ingen funksjonalitet)');

};

const leggTilNyDiagnose = (index) => {
    console.log(index)
    alert('Test! (Ingen funksjonalitet)');

};



export const alleDiagnoser = () => {
    const [liste, setListe] = useState([])
    const [lasterInnIkon, setLasterInn] = useState(false);

    useEffect(() => {
        //Viser lasterInn-ikon
        setLasterInn(true);
        fetch("/diagnose/HentalleDiagnoser")
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
                    <h1><i className="bi bi-clipboard2-pulse"></i> Diagnoser</h1>
                    <p>Legg til eller rediger diagnoser</p>
                </div>
                <div className="col-md-4">
                    <Button
                        className="float-right"
                        color="success"
                        tag={Link}
                        to="/leggTilDiagnose"
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
                        <thead><tr><th>#ID</th><th>Navn</th><th></th></tr></thead><tbody>
                            {liste.map((i, index) => {
                                return <tr key={index}><th scope="row" className="align-middle"> {i.diagnoseId}</th>

                                    <td className="tableTitteltd align-middle">{i.navn}</td>
                                    <td style={{ textAlign: 'right' }}><Button size="sm" className="mx-2" color="primary" tag={Link} to={{ pathname: "/redigerDiagnose", search: `?id=${i.diagnoseId}` }}><i className="bi bi-pencil"></i></Button>
                                        <Button size="sm" color="danger" onClick={() => slettDiagnose(i.diagnoseId)}><i className="bi bi-trash3"></i></Button></td>
                                </tr>
                            })}
                        </tbody>
                    </Table>

                </div>
            </div>
        </div>
    );
}