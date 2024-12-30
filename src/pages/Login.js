import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

const Login = () => {
    const [selected, setSelected] = useState(null);

    const handleSelect = (option) => {
        setSelected(option);
    };

    return (
        <Container className="d-flex align-items-center justify-content-center rw-background-color vh-100" fluid>
            <Row className="justify-content-center align-self-center w-100 mt-4">
                <Col xs={12} sm={8} md={6} lg={5} xl={4}>
                    <Card className="shadow-lg border-0" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                        <Card.Body className="p-4">
                            {/* Title */}
                            <h2 className="text-center mb-4 fw-bold">
                                Welcome Back
                                <br />
                                <span className="text-muted" style={{ fontSize: '1rem', display: 'block' }}>
                                    خوش آمدید
                                </span>
                            </h2>

                            {/* Subtext */}
                            <p className="text-muted text-center mb-4">
                                Please log in to continue
                                <br />
                                <span className="text-muted" style={{ fontSize: '1rem', display: 'block' }}>
                                    براہ کرم لاگ ان کریں
                                </span>
                            </p>

                            {/* Buyer Login Button */}
                            <Button
                                className={`w-100 mb-3 ${selected === 'buyer' ? 'rw-secondary-color border border-primary' : 'rw-primary-color border-0'}`}
                                onClick={() => handleSelect('buyer')}
                                as={Link}
                                to="buyer"
                            >
                                Log in as Buyer
                                <span className="d-block" style={{ fontSize: '1rem' }}>خریدار کے طور پر لاگ ان کریں</span>
                            </Button>

                            {/* Seller Login Button */}
                            <Button
                                className={`w-100 mb-3 ${selected === 'seller' ? 'rw-secondary-color border border-primary' : 'rw-primary-color border-0'}`}
                                onClick={() => handleSelect('seller')}
                                as={Link}
                                to="seller"
                            >
                                Log in as Seller
                                <span className="d-block" style={{ fontSize: '1rem' }}>فروخت کنندہ کے طور پر لاگ ان کریں</span>
                            </Button>

                            <Outlet />
                        </Card.Body>
                        <Card.Footer className="text-center py-3 bg-light border-0">
                            {/* Footer text */}
                            <p className="mb-0 text-muted">
                                Don't have an account?{' '}
                                <Link to="/register" className="text-decoration-none fw-bold rw-link-color">
                                    Sign up
                                    <span className="d-block" style={{ fontSize: '1rem' }}>اکاؤنٹ نہیں ہے؟ سائن اپ کریں</span>
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
