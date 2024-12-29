import React, { useState } from 'react';
import { Link, Outlet } from 'react-router';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

const Register = () => {
    const [selected, setSelected] = useState(null);

    const handleSelect = (option) => {
        setSelected(option);
    };

    return (
        <Container className="d-flex align-items-center justify-content-center rw-background-color py-5 my-3" fluid>
            <Row className="justify-content-center align-self-center w-100 mt-4">
                <Col xs={12} sm={8} md={6} lg={4}>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">Register</h2>
                            <Button
                                className={`w-100 mb-3 border-0 ${selected === 'buyer' ? 'rw-secondary-color' : 'rw-primary-color'}`}
                                onClick={() => handleSelect('buyer')}
                                as={Link} // Use the 'as' prop to render the button as a Link component
                                to="buyer" // The target link
                            >
                                Register as Buyer
                            </Button>

                            <Button
                                className={`w-100 mb-3 border-0 ${selected === 'seller' ? 'rw-secondary-color' : 'rw-primary-color'}`}
                                onClick={() => handleSelect('seller')}
                                as={Link} // Use the 'as' prop to render the button as a Link component
                                to="seller" // The target link
                            >
                                Register as Seller
                            </Button>
                            <Outlet />
                        </Card.Body>
                        <Card.Footer className="text-center">
                            <p>Already have an account? <Link to="/">Log In</Link></p>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;
