import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export const NavMenu = () => {
    return (
        <header>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3 py-3" light>
                <Container>
                    <NavbarBrand tag={Link} className="d-flex align-items-center logo" to="/"><img className="card-img" src="./img/MinDiagnose_logo.png" alt="Logo"></img> Min Diagnose</NavbarBrand>
                    <Collapse className="d-sm-inline-flex flex-sm-row-reverse" navbar>
                        <ul className="navbar-nav flex-grow">
                            <NavItem className="special">
                                <NavLink tag={Link} to="/"><i className="bi bi-stars"></i> Finn diagnose</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/dashboard"><i className="bi bi-house-door"></i> Dashboard</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to=""><i className="bi bi-file-text"></i> Dokumentasjon</NavLink>
                            </NavItem>
                        </ul>
                    </Collapse>
                </Container>
            </Navbar>
        </header>
    );
}