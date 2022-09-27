import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';


const slettSymptom = () => {
    alert('Vil du slette denne? (Ingen funksjonalitet)');
};

export const alleSymptomer = () => {
    return (
        <div className="container py-4">
            <div className="row align-items-md-stretch">
                <div className="col-md-12">
                    <h1><i className="bi bi-activity"></i> Symptomer</h1>
                    <p>Legg til eller rediger symptomer</p>

                    <Table striped>
                      <thead>
                        <tr>
                          <th>
                            #ID
                          </th>
                          <th>
                            Navn
                          </th>
                          <th>
                            Handling
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">
                            1
                          </th>
                          <td>
                            ADHD
                          </td>
                          <td>
                            <Button
                                className="mx-2"
                                color="primary"
                                tag={Link}
                                to="/redigerSymptom"
                              >
                                Rediger
                              </Button>
                            <Button
                                color="danger"
                                onClick={slettSymptom}
                              >
                                Slett
                              </Button>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">
                            2
                          </th>
                          <td>
                            Vannkopper
                          </td>
                          <td>
                            <Button
                                className="mx-2"
                                color="primary"
                                tag={Link}
                                to="/redigerSymptom"
                              >
                                Rediger
                              </Button>
                            <Button
                                color="danger"
                                onClick={slettSymptom}
                              >
                                Slett
                              </Button>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
}