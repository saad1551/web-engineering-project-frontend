import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom'; // Updated to 'react-router-dom' for compatibility
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

const Register = () => {
    const [selected, setSelected] = useState(null);

    const handleSelect = (option) => {
        setSelected(option);
    };

    return (
        <Container
            className="d-flex align-items-center justify-content-center rw-background-color vh-100"
            fluid
        >
            <Row className="justify-content-center align-self-center w-100">
                <Col xs={12} sm={10} md={8} lg={6} xl={4}>
                    <Card className="shadow-lg border-0" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                        <Card.Body className="p-4">
                            {/* Heading with English and Urdu */}
                            <h2 className="text-center mb-4 fw-bold">
                                Join Us
                                <span className="d-block" style={{ fontSize: '1.5rem', direction: 'rtl' }}>
                                    ہمارے ساتھ شامل ہوں
                                </span>
                            </h2>

                            {/* Instructions with English and Urdu */}
                            <p className="text-muted text-center mb-4">
                                Create your account to get started
                                <span className="d-block" style={{ fontSize: '1.2rem', direction: 'rtl' }}>
                                    اپنا اکاؤنٹ بنائیں اور شروع کریں
                                </span>
                            </p>

                            {/* Register as Buyer Button with English and Urdu */}
                            <Button
                                className={`w-100 mb-3 ${
                                    selected === 'buyer' ? 'rw-secondary-color border border-primary' : 'rw-primary-color border-0'
                                }`}
                                onClick={() => handleSelect('buyer')}
                                as={Link}
                                to="buyer"
                            >
                                Register as Buyer
                                <span className="d-block" style={{ fontSize: '1rem', direction: 'rtl' }}>
                                    خریدار کے طور پر رجسٹر کریں
                                </span>
                            </Button>

                            {/* Register as Seller Button with English and Urdu */}
                            <Button
                                className={`w-100 mb-3 ${
                                    selected === 'seller' ? 'rw-secondary-color border border-primary' : 'rw-primary-color border-0'
                                }`}
                                onClick={() => handleSelect('seller')}
                                as={Link}
                                to="seller"
                            >
                                Register as Seller
                                <span className="d-block" style={{ fontSize: '1rem', direction: 'rtl' }}>
                                    بیچنے والے کے طور پر رجسٹر کریں
                                </span>
                            </Button>

                            <Outlet />
                        </Card.Body>

                        <Card.Footer className="text-center py-3 bg-light border-0">
                            <p className="mb-0 text-muted">
                                Already have an account?{' '}
                                <Link to="/" className="text-decoration-none fw-bold rw-link-color">
                                    Log In
                                </Link>
                                <span className="d-block" style={{ fontSize: '1.2rem', direction: 'rtl' }}>
                                    پہلے سے اکاؤنٹ ہے؟{' '}
                                    <Link to="/" className="text-decoration-none fw-bold rw-link-color">
                                        لاگ ان کریں
                                    </Link>
                                </span>
                            </p>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;
