import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import axios from '../config/apiConfig';
import { useNavigate } from 'react-router';

const BuyerEditProfile = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [DOB, setDOB] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Fetch buyer profile data
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const buyer = JSON.parse(localStorage.getItem('jwt_payload')).buyer;
                setName(buyer.name);
                setEmail(buyer.email);
                setDOB(DOB ? new Date(DOB).toISOString().split('T')[0] : '');
                setPhoneNumber(buyer.phoneNumber);
            } catch (err) {
                setError('Failed to load profile data');
            }
        };

        fetchProfile();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccessMessage('');

        if (!name || !email || !DOB || !phoneNumber) {
            setLoading(false);
            setError('All fields are required.');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('DOB', DOB);
        formData.append('phoneNumber', phoneNumber);

        try {
            const response = await axios.post('buyers/edit-profile', formData, { withCredentials: true });
            // Update values in the jwt_payload
            const jwtPayload = JSON.parse(localStorage.getItem('jwt_payload'));
            jwtPayload.buyer = response.data.buyer;
            localStorage.setItem('jwt_payload', JSON.stringify(jwtPayload));

            setSuccessMessage('Profile updated successfully');
            setLoading(false);
            navigate('/buyer-dashboard');
        } catch (err) {
            setLoading(false);
            setError(err.response?.data?.message || 'Failed to update profile');
        }
    };

    return (
        <Container
            fluid
            className="d-flex flex-column align-items-center justify-content-center py-5 mt-3 rw-background-color"
            style={{ minHeight: '100vh' }}
        >
            <Row className="justify-content-center align-self-center w-100">
                <Col xs={12} sm={8} md={6} lg={4}>
                    <Card className="shadow-sm p-2 mt-3">
                        <Card.Body>
                            <h2 className="text-center mb-4">Edit Profile</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            {successMessage && <Alert variant="success">{successMessage}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="buyerName" className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="buyerEmail" className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="buyerDOB" className="mb-3">
                                    <Form.Label>Date of Birth</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={DOB}
                                        onChange={(e) => setDOB(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="buyerPhoneNumber" className="mb-3">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                        type="tel"
                                        placeholder="Enter your phone number"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Button type="submit" className="w-100 rw-primary-color border-0" disabled={loading}>
                                    {loading ? (
                                        <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
                                    ) : (
                                        'Update Profile'
                                    )}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default BuyerEditProfile;