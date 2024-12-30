import React from 'react';
import { Container, Navbar, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <Navbar className="rw-primary-color py-3" fixed="bottom">
            <Container>
                <Row className="w-100">
                    {/* Left Section */}
                    <Col xs={12} md={6} className="text-center text-md-start mb-2 mb-md-0">
                        <span>&copy; {new Date().getFullYear()} Dastkaar</span>
                    </Col>
                </Row>
            </Container>
        </Navbar>
    );
};

export default Footer;
