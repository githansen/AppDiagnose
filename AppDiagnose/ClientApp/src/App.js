import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Dashboard } from './components/Dashboard';
import { Symptom } from './components/Symptom';
import { Diagnose } from './components/Diagnose';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/symptom' component={Symptom} />
        <Route path='/diagnose' component={Diagnose} />
      </Layout>
    );
  }
}
