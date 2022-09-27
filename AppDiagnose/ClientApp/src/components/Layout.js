import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './shared/NavMenu';
import { Footer } from './shared/Footer';

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
