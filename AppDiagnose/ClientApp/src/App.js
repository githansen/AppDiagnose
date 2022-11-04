import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';

//Side - Home
import { Home } from './components/Home';
//Side - Symptom 
import { alleSymptomer } from './components/symptom/alleSymptomer';
import { redigerSymptom } from './components/symptom/redigerSymptom';
import { leggTilSymptom } from './components/symptom/leggTilSymptom';
//Side - Diagnose
import { alleDiagnoser } from './components/diagnose/alleDiagnoser';
//Side - Kategori 
import { alleKategorier } from './components/kategori/alleKategorier';
//Side - Dokumentasjon 
import { Dokumentasjon } from './components/dokumentasjon/Dokumentasjon';
//Side - Dashboard 
import { Dashboard } from './components/dashboard/Dashboard';
//Side - Konto 
import { LoggInn } from './components/konto/LoggInn';
import { GlemtPassord } from './components/konto/GlemtPassord';
import { LoggUt } from './components/konto/LoggUt'
//Side - Logg 
import { allAktivitet } from './components/logg/allAktivitet';
//Stiler  
import './components/style.css'



export default class App extends Component {
  static displayName = App.name;


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
        <Route path='/alleKategorier' component={alleKategorier} />
        <Route path='/allAktivitet' component={allAktivitet} />
        <Route path='/logginn' component={LoggInn} />
        <Route path='/glemtpassord' component={GlemtPassord} />
        <Route path='/Loggut' component={LoggUt} />
      </Layout>
    );
  }
}
