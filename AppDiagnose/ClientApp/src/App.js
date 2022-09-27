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
import { Diagnose } from './components/diagnose/Diagnose';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/alleSymptomer' component={alleSymptomer} />
        <Route path='/redigerSymptom' component={redigerSymptom} />
        <Route path='/testSymptomer' component={testSymptomer} />
        <Route path='/diagnose' component={Diagnose} />
      </Layout>
    );
  }
}
