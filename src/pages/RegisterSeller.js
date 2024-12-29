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
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match!');
            return;
        }

        try {
            const response = await axios.post('sellers/register', formData);
            setSuccess('Registration successful!');
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred.');
            setSuccess('');
        }
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
                    placeholder="Enter phone number"
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

        </Form>

    );
};

export default RegisterSeller;
