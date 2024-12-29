import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import axios from '../config/apiConfig';
import { useNavigate } from 'react-router';

const SellerEditProfile = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [DOB, setDOB] = useState('');
    const [district, setDistrict] = useState('');
    const [division, setDivision] = useState('');
    const [province, setProvince] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Fetch seller profile data
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const seller = JSON.parse(localStorage.getItem('jwt_payload')).seller;
                setName(seller.name);
                setEmail(seller.email);
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

        if (!name || !email || !DOB || !district || !division || !province || !phoneNumber) {
            setLoading(false);
            setError('All fields are required.');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('DOB', DOB);
        formData.append('district', district);
        formData.append('division', division);
        formData.append('province', province);
        formData.append('phoneNumber', phoneNumber);

        try {
            const response = await axios.put('sellers/edit-profile', formData, { withCredentials: true });

            const jwtPayload = JSON.parse(localStorage.getItem('jwt_payload'));
            jwtPayload.seller = response.data.seller;
            localStorage.setItem('jwt_payload', JSON.stringify(jwtPayload));

            setSuccessMessage('Profile updated successfully');
            setLoading(false);
            navigate('/seller-dashboard');
        } catch (err) {
            setLoading(false);
            setError(err.response?.data?.message || 'Failed to update profile');
        }
    };

    return (
        <Container
            fluid
            className="d-flex flex-column align-items-center justify-content-center rw-background-color py-5 my-4"
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
                                <Form.Group controlId="sellerName" className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="sellerEmail" className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="sellerDOB" className="mb-3">
                                    <Form.Label>Date of Birth</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={DOB}
                                        onChange={(e) => setDOB(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="sellerDistrict" className="mb-3">
                                    <Form.Label>District</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your district"
                                        value={district}
                                        onChange={(e) => setDistrict(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="sellerDivision" className="mb-3">
                                    <Form.Label>Division</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your division"
                                        value={division}
                                        onChange={(e) => setDivision(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="sellerProvince" className="mb-3">
                                    <Form.Label>Province</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your province"
                                        value={province}
                                        onChange={(e) => setProvince(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="sellerPhoneNumber" className="mb-3">
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

export default SellerEditProfile;
