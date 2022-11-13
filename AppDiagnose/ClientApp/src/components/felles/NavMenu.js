// File - NavMenu.js //

//JavaScript Bibliotek
import React, { Component } from 'react';
import { loggetinn } from "../Funksjoner/Innlogget"
import { Collapse, Container, Button, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

//Stiler 
import './NavMenu.css';



//OUTPUT
export const NavMenu = () => {

    //Knapp som logger bruker ut 
    const loggUtKnapp = () => {
        //Kjører funksjon for å logge ut i DiagnoseController 
        $.get("/diagnose/LoggUt", function () { 
            //Bruker blir sendt til logg-ut side
            window.location.href = "/loggut"
        })
    };
    
    return (
        <header>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3 py-3" light>
                <Container>
                    <NavbarBrand tag={Link} className="d-flex align-items-center logo" to="/"><img className="card-img" src="./img/MinDiagnose_logo.png" alt="Logo"></img> MinDiagnose</NavbarBrand>
                    <Collapse className="d-sm-inline-flex flex-sm-row-reverse" navbar>
                        <ul className="navbar-nav flex-grow">
                            <NavItem className="special">
                                <NavLink tag={Link} to="/"><i className="bi bi-stars"></i> Finn diagnose</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/dokumentasjon"><i className="bi bi-file-text"></i> Dokumentasjon</NavLink>
                            </NavItem>
                            {/* Sjekker om bruker er innlogget, i så fall vises dashboard link*/}
                            {loggetinn().id != 0 ? (
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/dashboard"><i className="bi bi-house-door"></i> Dashboard</NavLink>
                                </NavItem>
                            ): (
                                <NavItem>
                                </NavItem>
                            ) }
                            {/* Sjekker om bruker er innlogget. Hvis bruker er innlogget vises logg-ut link, hvis ikke vises logg-inn link.*/}
                            {loggetinn().id != 0 ? (

                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" onClick={() => loggUtKnapp()}><i className="bi bi-door-open"></i> Logg ut</NavLink>
                                </NavItem>
                            ): (
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/logginn"><i className="bi bi-box-arrow-in-right"></i> Logg Inn</NavLink>
                                </NavItem>
                            ) }
                            
                        </ul>
                    </Collapse>
                </Container>
            </Navbar>
        </header>
    );
}