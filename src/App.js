
import React, { useEffect, useState} from 'react';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import './App.css';

import Home from './views/home/Home';
import Governonce from './views/governonce/Governonce';
import NftMarket from './views/nftMarket/NftMarket';
import {Navbar, NavDropdown, Nav, Container} from "react-bootstrap";

function App () {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container fluid>
            <Navbar.Brand href="#home">Cimple</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/governonce">Governonce</Nav.Link>
                <Nav.Link as={Link}  to="/nftMarket">NFT Market</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Routes>
          <Route path="/governonce" element={<Governonce />} />
          <Route path="/nftMarket" element={<NftMarket />} />
          <Route path="/" exact element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
