import React, { Component, useEffect, useState} from 'react';
import { Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import $ from 'jquery'


const slettSymptom = (index) => {
    //Sletter symptom fra databasen
    let url = "/diagnoses/slettSymptom?Id=" + index
    $.post(url, function (data) {
        window.location.reload()
    });
    
   
};


export const alleSymptomer = () => {
    const [liste, setListe] = useState([])
    //Use-Effect kjøres her 1 gang i det dokumentet rendres
    useEffect(() => {
        //Henter liste over alle symptomer
        fetch("/diagnoses/hentalleSymptomer")
            .then(data => data.json())
            .then((data) => {
                setListe(data)
            })
    }, []);


    return (
        <div className="container py-4">
            <div className="row align-items-md-stretch">
                <div className="col-md-12">
                    <h1><i className="bi bi-activity"></i> Symptomer</h1>
                    <p>Legg til eller rediger symptomer</p><Table striped><thead><tr><th>#ID</th><th>Navn</th><th>Handling</th></tr></thead><tbody>
                            {liste.map((i, index) => {
                                return <tr key={index}><th scope="row"> {i.symptomId}</th>

                                    <td>{i.navn}</td>
                                    <td><Button className="mx-2" color="primary" tag={Link} to={{ pathname: "/redigerSymptom", search: `?id=${i.symptomId}` }}>Rediger</Button>
                                        <Button color="danger" onClick={() => slettSymptom(i.symptomId)}>Slett</Button></td>
                                </tr>
                            })}
                        </tbody>
                    </Table>
                      
                </div>
            </div>
        </div>
    );
}