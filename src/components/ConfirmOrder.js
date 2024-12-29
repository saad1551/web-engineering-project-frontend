import React, { useState } from 'react';
import axios from '../config/apiConfig';
import { Modal, Button, Alert, Form } from 'react-bootstrap';

const ConfirmOrder = ({ showModal, setShowModal, selectedProduct }) => {
    const [error, setError] = useState(null); // State to track errors
    const [address, setAddress] = useState(''); // State to track the entered address
    const [quantity, setQuantity] = useState(1); // State to track quantity
    const [loading, setLoading] = useState(false); // State to track loading state

    const placeOrder = async () => {
        if (!address) {
            setError('Please enter your delivery address');
            return;
        }

        setLoading(true);
        setError(''); // Clear any previous errors

        const formData = new FormData();
        formData.append('productId', selectedProduct._id);
        formData.append('quantity', quantity);
        formData.append('address', address);
        formData.append('paymentMethod', 'COD');
        formData.append('deliveryTime', 10);

        try {
            const response = await axios.post('orders/place-order', formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setLoading(false);
            setShowModal(false); // Close modal on successful order
        } catch (err) {
            setLoading(false);
            setError(err.response?.data?.message || 'Failed to place order');
        }
    };

    return (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Your Order</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Alert variant="danger">{error}</Alert>} {/* Show error message */}

                <h5>{selectedProduct?.name}</h5>
                <p>{selectedProduct?.description}</p>
                <p><strong>Price:</strong> PKR {selectedProduct?.price}</p>

                <Form>
                    {/* Address Input Field */}
                    <Form.Group controlId="formAddress">
                        <Form.Label>Delivery Address</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Enter your delivery address"
                        />
                    </Form.Group>

                    <p className="mt-3">Are you sure you want to place this order?</p>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => setShowModal(false)} className="rw-tertiary-color border-0">
                    Cancel
                </Button>
                {/* Call placeOrder function when button is clicked */}
                <Button
                    onClick={placeOrder} // Trigger the function instead of submitting the form
                    className="rw-primary-color border-0"
                    disabled={loading}
                >
                    {loading ? 'Placing Order...' : 'Confirm Order'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmOrder;
