// File - Layout.js //

//JavaScript Bibliotek
import React, { Component } from 'react';

//Felles komponenter
import { Container } from 'reactstrap';
import { NavMenu } from './felles/NavMenu';
import { Footer } from './felles/Footer';



//OUTPUT
export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>
        <NavMenu />
        <Container>
          {this.props.children}
        </Container>
        <Footer />
      </div>
    );
  }
}
