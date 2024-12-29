import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from '../config/apiConfig';

const RegisterSeller = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        DOB: '',
        district: '',
        division: '',
        province: '',
        phoneNumber: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState([]);  // Store multiple error messages
    const [success, setSuccess] = useState('');  // Store success message

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
            const response = await axios.post('sellers/register', formData);
            setSuccess('Registration successful!');
            setErrors([]);  // Clear errors if registration is successful
        } catch (err) {
            if (err.response?.data) {
                // Extract validation error messages from the response
                const errorMessages = extractErrorMessages(err.response.data);
                setErrors(errorMessages);
                setSuccess(''); // Clear success message if there is an error
            } else {
                setErrors(['An error occurred. Please try again later.']);
                setSuccess(''); // Clear success message if there is an error
            }
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
                <small className="form-text text-muted">Date of birth must be in the past.</small>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDistrict">
                <Form.Label>District</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter district"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDivision">
                <Form.Label>Division</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter division"
                    name="division"
                    value={formData.division}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicProvince">
                <Form.Label>Province</Form.Label>
                <Form.Select
                    name="province"
                    value={formData.province}
                    onChange={handleChange}
                >
                    <option>Select Province</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Sindh">Sindh</option>
                    <option value="Balochistan">Balochistan</option>
                    <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</option>
                    <option value="Gilgit Baltistan">Gilgit Baltistan</option>
                    <option value="Azad Jammu and Kashmir">Azad Jammu and Kashmir</option>
                    <option value="Islamabad Capital Territory">Islamabad Capital Territory</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPhone">
                <Form.Label>Phone No.</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="03XXXXXXXXX"
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

export default RegisterSeller;
