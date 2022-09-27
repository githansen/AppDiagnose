
import React, { Component } from 'react';
import { Form, FormGroup, Input, Label, Button, ButtonGroup } from "reactstrap";
import { Link } from 'react-router-dom';


const lagreSymptom = () => {
    alert('Lagre symptom! (Ingen funksjonalitet)');
};

export const redigerSymptom = () => {
    return (
        <div className="container py-4">
            <div className="row align-items-md-stretch">
                <div className="col-md-12">
                    <h1><i className="bi bi-activity"></i> Rediger symptom - "SYMPTOM X"</h1>
                    <p>Rediger symptomet</p>
                    <Form >
                        <FormGroup>
                            <Label for="navn">Navn</Label>{' '}
                            <Input name="navn"></Input>
                        </FormGroup>

                        <ButtonGroup className="float-right">
                        <Button
                            color="danger"
                            tag={Link}
                            to="/alleSymptomer"
                        >
                            <i className="bi bi-x"></i> 
                            Avbryt
                          </Button>
                          <Button
                            color="success"
                            onClick={lagreSymptom}
                          >
                            <i className="bi bi-check"></i>
                            Lagre
                          </Button>
                        </ButtonGroup>
                    </Form>
                </div>
            </div>
        </div>
    );
}