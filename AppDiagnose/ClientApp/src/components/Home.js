import React, { Component } from 'react';


const kalkulerDiagnose = () => {
    alert('Din diagnose kalkuleres..');
};

const lesMerOmDiagnose = () => {
    alert('Linken kommer snart...');
};

const diagnoseMedisiner = () => {
    alert('Medisiner kommer snart...');
};


export const Home = () => {


    return (
        <div className="container py-4">
            <div className="row align-items-md-stretch">
                <div className="col-md-6">
                    <div className="h-100 p-5 bg-light border rounded-3">
                        <h4 className="mb-4"><i className="bi bi-clipboard2-pulse"></i> Velg symptomer</h4>
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" id="flexCheckDefault"></input>
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                            Konsentrasjonsvansker
                          </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="flexCheckChecked"></input>
                          <label className="form-check-label" htmlFor="flexCheckChecked">
                            Vondt i hodet
                          </label>
                        </div>
                        <button className="mt-3 w-100 btn btn-lg btn-primary" type="button" onClick={kalkulerDiagnose}>Kalkuler</button>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="h-100 p-5 bg-dark border rounded-3">
                        <h4 className="mb-4 text-light"><i className="bi bi-file-medical"></i> Diagnose</h4>
                        <p className=" text-light">Din diagnose er <span><b>...</b></span></p>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button className="mt-3 btn btn-warning mx-2" type="button" onClick={lesMerOmDiagnose}>Les mer om diagnosen</button>
                            <button className="mt-3 btn btn-info text-light" type="button" onClick={diagnoseMedisiner}>Se medisiner</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}