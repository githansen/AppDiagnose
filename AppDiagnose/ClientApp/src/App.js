import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Dashboard } from './components/Dashboard';
import { Dokumentasjon } from './components/Dokumentasjon';
//Symptom 
import { alleSymptomer } from './components/symptom/alleSymptomer';
import { redigerSymptom } from './components/symptom/redigerSymptom';
import { leggTilSymptom } from './components/symptom/leggTilSymptom';
//Diagnose 
import { alleDiagnoser } from './components/diagnose/alleDiagnoser';
import { redigerDiagnose } from './components/diagnose/redigerDiagnose';
import { leggTilDiagnose } from './components/diagnose/leggTilDiagnose';
//Kategori 
import { alleKategorier } from './components/kategori/alleKategorier';

import './components/style.css'

export default class App extends Component {
  static displayName = App.name;
v
  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/dokumentasjon' component={Dokumentasjon} />
        <Route path='/alleSymptomer' component={alleSymptomer} />
        <Route path='/redigerSymptom' component={redigerSymptom} />
        <Route path='/leggTilSymptom' component={leggTilSymptom} />
        <Route path='/alleDiagnoser' component={alleDiagnoser} />
        <Route path='/redigerDiagnose' component={redigerDiagnose} />
        <Route path='/leggTilDiagnose' component={leggTilDiagnose} />
        <Route path='/alleKategorier' component={alleKategorier} />
      </Layout>
    );
  }
}
