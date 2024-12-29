import React, { useEffect, useState } from 'react';
import { Container, Spinner, Alert } from 'react-bootstrap';
import axios from '../config/apiConfig';

const VerifyEmail = ({ type }) => {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = new URLSearchParams(window.location.search).get('token'); // Extract token from URL

        if (!token) {
            setMessage('Token is missing!');
            setLoading(false);
            return;
        }

        // Determine the endpoint based on the user type
        const endpoint = type === 'buyer'
            ? `buyers/verify-email?token=${token}`
            : `sellers/verify-email?token=${token}`;

        // Synchronous API call
        axios.get(endpoint)
            .then((response) => {
                setMessage(response.data.message || `${type.charAt(0).toUpperCase() + type.slice(1)} email verified successfully!`);
            })
            .catch((error) => {
                // setMessage(
                //     error.response?.data?.message ||
                //     `${type.charAt(0).toUpperCase() + type.slice(1)} email verification failed. Please check the token or contact support.`
                // );
            })
            .finally(() => {
                setLoading(false);
            });
    }, [type]); // Empty dependency array ensures the effect runs only once when the component mounts

    return (
        <Container
            className="d-flex flex-column justify-content-center align-items-center rw-background-color"
            style={{ height: '100vh' }}
            fluid
        >
            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" role="status" className="mb-3" />
                    <p>Loading...</p>
                </div>
            ) : (
                <Alert
                    variant={message.includes('failed') ? 'danger' : 'success'}
                    className="text-center"
                >
                    {message}
                </Alert>
            )}
        </Container>
    );
};

export default VerifyEmail;
