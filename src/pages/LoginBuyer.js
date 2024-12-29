import React, { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from '../config/apiConfig';  // Assuming this contains the API configuration
import { useNavigate } from 'react-router';
import { UserContext } from '../context/UserContext';

const LoginBuyer = () => {
    const navigate = useNavigate();
    const { userRole, setUserRole } = useContext(UserContext);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState([]);  // To store multiple error messages
    const [success, setSuccess] = useState('');  // Store success message

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if email and password fields are not empty
        if (!formData.email || !formData.password) {
            setErrors(['Please fill in both email and password fields.']);
            return;
        }

        try {
            const response = await axios.post('buyers/login', formData,  { withCredentials: true });  // Assume the backend API path is 'buyers/login'
            setSuccess('Login successful!');
            setErrors([]);  // Clear errors if login is successful
            // Store JWT Token
            localStorage.setItem('jwt_payload', JSON.stringify(response.data));
            // Redirect to buyer dashboard
            setUserRole('buyer');
            navigate('/buyer-dashboard');
        } catch (err) {
            if (err.response?.data) {
                const errorMessages = extractErrorMessages(err.response.data);
                setErrors(errorMessages);
                setSuccess(''); // Clear success message if there is an error
            } else {
                setErrors(['An error occurred. Please try again later.']);
                setSuccess(''); // Clear success message if there is an error
            }
        }
    };

    // Function to extract and format error messages from backend HTML response
    const extractErrorMessages = (htmlData) => {
        const errorMessages = [];
        
        // Match the validation errors in the response data
        const errorMatch = htmlData.match(/ValidationError: (.*)<br>/);
        if (errorMatch) {
            const errors = errorMatch[1]
                .replace(/<br>/g, '')
                .replace(/&nbsp;/g, ' ')
                .split(',')
                .map((error) => error.trim());

            errors.forEach((error) => {
                if (error.includes('Email is not verified')) {
                    errorMessages.push("Your email address is not verified. Please verify your email.");
                } else if (error.includes('Invalid email or password')) {
                    errorMessages.push("The email or password you entered is incorrect.");
                } else {
                    errorMessages.push(error);
                }
            });
        }
        
        return errorMessages;
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
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

            {errors.length > 0 && (
                <div className="alert alert-danger" role="alert">
                    <ul>
                        {errors.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}

            {success && (
                <div className="alert alert-success" role="alert">
                    {success}
                </div>
            )}
        </Form>
    );
};

export default LoginBuyer;
