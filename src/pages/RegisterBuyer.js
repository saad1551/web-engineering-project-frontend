import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from '../config/apiConfig';

const RegisterBuyer = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        DOB: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState([]);  // To store multiple error messages
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if passwords match
        if (formData.password !== formData.confirmPassword) {
            setErrors(['Passwords do not match!']);
            return;
        }

        try {
            const response = await axios.post('buyers/register', formData);
            setSuccess('Registration successful! Please check your email for verification.');
            setErrors([]);  // Clear errors if registration is successful
        } catch (err) {
            if (err.response?.data) {
                // Extract validation error messages from the response
                const errorMessages = extractErrorMessages(err.response.data);
                setErrors(errorMessages);
            } else {
                setErrors(['An error occurred. Please try again later.']);
            }
            setSuccess('');
        }
    };

    // Function to extract and format validation error messages from backend HTML response
    const extractErrorMessages = (htmlData) => {
        const errorMessages = [];
        
        // Match the validation errors in the response data
        const errorMatch = htmlData.match(/ValidationError: (.*)<br>/);
        if (errorMatch) {
            // Clean up and separate each error message
            const errors = errorMatch[1]
                .replace(/<br>/g, '') // Remove <br> tags
                .replace(/&nbsp;/g, ' ') // Replace non-breaking space
                .split(',')  // Split errors by comma
                .map((error) => error.trim()); // Trim excess spaces
            
            // Format and map the error messages
            errors.forEach((error) => {
                if (error.includes('email')) {
                    errorMessages.push("Please provide a valid email address.");
                } else if (error.includes('password')) {
                    errorMessages.push("Password must be at least 6 characters.");
                } else if (error.includes('phoneNumber')) {
                    errorMessages.push("Phone number must be 11 digits long.");
                } else if (error.includes('dateOfBirth')) {
                    errorMessages.push("Date of birth must be in the past.");
                } else {
                    errorMessages.push(error); // Generic error message
                }
            });
        }
        
        return errorMessages;
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
            </Form.Group>

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

            <Form.Group className="mb-3" controlId="formBasicDOB">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                    type="date"
                    name="DOB"
                    value={formData.DOB}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPhone">
                <Form.Label>Phone No.</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="03XXXXXXXXXX"
                    name="phoneNumber"
                    value={formData.phoneNumber}
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

            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                />
            </Form.Group>

            <Button type="submit" className="w-100 mb-3 rw-primary-color border-0">
                Register
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

export default RegisterBuyer;
