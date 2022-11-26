// File - Footer.js //

//JavaScript Bibliotek
import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';


//OUTPUT
export const Footer = () => {
    return (
        <footer className="py-3 my-4">
            <p className="text-center text-muted">© 2023 MinDiagnose App</p>
        </footer >
    );
}

