import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'; // Importa los íconos que desees utilizar
import './footer.css'; // Archivo para estilos CSS del footer

export default function Footer() {
  return (
    <Navbar bg="light" expand="lg" className="footer">
      <Container>
        <Navbar.Brand href="/">FGCodex</Navbar.Brand>
        
        <Nav className="ml-auto">
          <Nav.Link href="/about">Acerca de nosotros</Nav.Link>
          <Nav.Link href="/services">Nuestros servicios</Nav.Link>
          <Nav.Link href="/contact">Contacto</Nav.Link>
        </Nav>
        
        <div className="social-icons">
          <p>
            <a href="https://www.facebook.com/tu_pagina" target="_blank" rel="noopener noreferrer">
              <FaFacebook /> Facebook
            </a>
          </p>
          <p>
            <a href="https://twitter.com/tu_pagina" target="_blank" rel="noopener noreferrer">
              <FaTwitter /> Twitter
            </a>
          </p>
          <p>
            <a href="https://www.instagram.com/tu_pagina" target="_blank" rel="noopener noreferrer">
              <FaInstagram /> Instagram
            </a>
          </p>
        </div>
      </Container>
    </Navbar>
  );
}
