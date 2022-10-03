import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Dashboard } from './components/Dashboard';
//Symptom 
import { alleSymptomer } from './components/symptom/alleSymptomer';
import { redigerSymptom } from './components/symptom/redigerSymptom';
import { testSymptomer } from './components/symptom/testSymptomer';
//Diagnose 
import { alleDiagnoser } from './components/diagnose/alleDiagnoser';
import { redigerDiagnose } from './components/diagnose/redigerDiagnose';
//Kategori 
import { alleKategorier } from './components/kategori/alleKategorier';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;
v
  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/alleSymptomer' component={alleSymptomer} />
        <Route path='/redigerSymptom' component={redigerSymptom} />
        <Route path='/testSymptomer' component={testSymptomer} />
        <Route path='/alleDiagnoser' component={alleDiagnoser} />
        <Route path='/redigerDiagnose' component={redigerDiagnose} />
        <Route path='/alleKategorier' component={alleKategorier} />
      </Layout>
    );
  }
}
