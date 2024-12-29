import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import axios from '../config/apiConfig';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    // const navigate = useNavigate(); // To handle redirection

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Simple form validation
        if (!formData.email || !formData.password) {
            setError('Please fill in both fields.');
            return;
        }

        try {
            // Make the login request
            const response = await axios.post('sellers/login', formData);

            // Assuming the backend returns a token, save it in localStorage
            localStorage.setItem('token', response.data.token);

            setSuccess('Login successful!');
            setError('');

            // // Redirect to the dashboard or home page
            // navigate('/dashboard'); // Change '/dashboard' to your desired path

        } catch (err) {
            // Handle error, show appropriate message
            setError(err.response?.data?.message || 'Invalid credentials.');
            setSuccess('');
        }
    };

    return (
        <Container className="d-flex align-items-center justify-content-center rw-background-color vh-100" fluid>
            <Row className="justify-content-center align-self-center w-100">
                <Col xs={12} sm={8} md={6} lg={4}>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">Login</h2>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Button type="submit" className="w-100 mb-3 rw-primary-color border-0">
                                    Login
                                </Button>
                            </Form>

                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}
                            {success && (
                                <div className="alert alert-success" role="alert">
                                    {success}
                                </div>
                            )}
                        </Card.Body>

                        <Card.Footer className="text-center">
                            <p>Don't have an account? <Link to="/register">Sign up</Link></p>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
