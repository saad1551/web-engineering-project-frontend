import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Updated to 'react-router-dom' for correct imports
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

const Login = () => {
    const [selected, setSelected] = useState(null);

    const handleSelect = (option) => {
        setSelected(option);
    };

    return (
        <Container
            className="d-flex align-items-center justify-content-center rw-background-color vh-100"
            fluid
        >
            <Row className="justify-content-center align-self-center w-100 mt-4">
                <Col xs={12} sm={8} md={6} lg={5} xl={4}>
                    <Card className="shadow-lg border-0">
                        <Card.Body className="p-4">
                            <h2 className="text-center mb-4 fw-bold">Welcome Back</h2>
                            <p className="text-muted text-center mb-4">
                                Please log in to continue
                            </p>

                            {/* Buyer Login Button */}
                            <Button
                                className={`w-100 mb-3 ${
                                    selected === 'buyer'
                                        ? 'rw-secondary-color border border-primary'
                                        : 'rw-primary-color border-0'
                                }`}
                                onClick={() => handleSelect('buyer')}
                                as={Link}
                                to="buyer"
                            >
                                Log in as Buyer
                            </Button>

                            {/* Seller Login Button */}
                            <Button
                                className={`w-100 mb-3 ${
                                    selected === 'seller'
                                        ? 'rw-secondary-color border border-primary'
                                        : 'rw-primary-color border-0'
                                }`}
                                onClick={() => handleSelect('seller')}
                                as={Link}
                                to="seller"
                            >
                                Log in as Seller
                            </Button>
                            <Outlet />
                        </Card.Body>
                        <Card.Footer className="text-center py-3 bg-light border-0">
                            <p className="mb-0 text-muted">
                                Don't have an account?{' '}
                                <Link to="/register" className="text-decoration-none fw-bold rw-link-color">
                                    Sign up
                                </Link>
                            </p>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
