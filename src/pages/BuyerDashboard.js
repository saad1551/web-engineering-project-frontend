import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CategoryDropdown from '../components/CategoryDropdown';

const BuyerDashboard = () => {
    return (
        <Container
            fluid
            className="d-flex flex-column align-items-center justify-content-center py-5 mt-3 rw-background-color"
            style={{ minHeight: '100vh' }}
        >
            <Row className="text-center mt-4">
                <Col>
                    <h2 className="fw-bold">Available Products</h2>
                </Col>
            </Row>

            <Row className="justify-content-center w-100">
                <Col xs={12} md={8} lg={6}>
                    <CategoryDropdown />
                </Col>
            </Row>
        </Container>
    );
};

export default BuyerDashboard;
