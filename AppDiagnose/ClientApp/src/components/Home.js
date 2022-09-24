import React, { Component } from 'react';


const kalkulerDiagnose = () => {
    alert('Din diagnose kalkulerer...');
};


export const Home = () => {


    return (
        <div className="container py-4">
            <div class="row align-items-md-stretch">
                <div className="col-md-6">
                    <div className="h-100 p-5 bg-light border rounded-3">
                        <h4 className="mb-4"><i class="bi bi-activity"></i> Velg symptomer</h4>
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" id="flexCheckDefault"></input>
                          <label className="form-check-label" for="flexCheckDefault">
                            Konsentrasjonsvansker
                          </label>
                        </div>
                        <div class="form-check">
                            <input className="form-check-input" type="checkbox" id="flexCheckChecked"></input>
                          <label className="form-check-label" for="flexCheckChecked">
                            Vondt i hodet
                          </label>
                        </div>
                        <button className="mt-3 w-100 btn btn-lg btn-primary" type="button" onClick={kalkulerDiagnose}>Kalkuler</button>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="h-100 p-5 bg-dark border rounded-3">
                        <h4 className="mb-4 text-light"><i class="bi bi-clipboard2-pulse"></i> Diagnose</h4>
                        <p className=" text-light">Din diagnose er <span><b>...</b></span></p>
                        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button className="mt-3 btn btn-warning mx-2" type="button">Les mer om diagnosen</button>
                            <button className="mt-3 btn btn-info text-light" type="button">Se medisiner</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}