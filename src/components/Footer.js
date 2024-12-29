import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const Footer = () => {
    return (
        <Navbar expand="lg" className="rw-primary-color" fixed="bottom" >
            <Container>
                Copyright
            </Container>
        </Navbar>
    );
}

export default Footer;
