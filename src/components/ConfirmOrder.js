import React, { useState } from 'react';
import axios from '../config/apiConfig';
import { Modal, Button, Alert, Form, Toast, Col, Row } from 'react-bootstrap';

const ConfirmOrder = ({ showModal, setShowModal, selectedProduct }) => {
    const [error, setError] = useState(null); // State to track errors
    const [address, setAddress] = useState(''); // State to track the entered address
    const [quantity, setQuantity] = useState(1); // State to track quantity
    const [loading, setLoading] = useState(false); // State to track loading state
    const [showToast, setShowToast] = useState(false); // State for the toast notification

    const placeOrder = async () => {
        // Validate input
        if (!address) {
            setError('Please enter your delivery address');
            return;
        }

        if (quantity <= 0) {
            setError('Please enter a valid quantity');
            return;
        }

        setLoading(true);
        setError(''); // Clear any previous errors

        const data = {
            productId: selectedProduct._id,
            quantity: quantity,
            address: address,
            paymentMethod: 'COD',
            deliveryTime: 10,
        };

        try {
            const response = await axios.post('orders/place-order', data, {
                withCredentials: true,
            });

            setLoading(false);
            setShowModal(false); // Close modal on successful order
            setShowToast(true); // Show success toast
        } catch (err) {
            setLoading(false);
            setError(err.response?.data?.message || 'Failed to place order');
        }
    };

    return (
        <>
            <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Your Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error && <Alert variant="danger">{error}</Alert>} {/* Show error message */}

                    <Row className="mb-3">
                        <Col>
                            <h5>{selectedProduct?.name}</h5>
                            <p>{selectedProduct?.description}</p>
                            <p><strong>Price:</strong> PKR {selectedProduct?.price}</p>
                        </Col>
                    </Row>

                    <Form>

                        {/* Address Input Field */}
                        <Form.Group controlId="formAddress" className="mt-3">
                            <Form.Label>Delivery Address</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Enter your delivery address"
                            />
                        </Form.Group>

                        <p className="mt-3 text-center">Are you sure you want to place this order?</p>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowModal(false)}
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={placeOrder} // Trigger the function instead of submitting the form
                        className="rw-primary-color border-0"
                        disabled={loading}
                    >
                        {loading ? 'Placing Order...' : 'Confirm Order'}
                    </Button>
                </Modal.Footer>
            </Modal>

            <Toast
                show={showToast}
                onClose={() => setShowToast(false)}
                delay={3000}
                autohide
                className="position-fixed bottom-0 end-0 m-3 mb-4"
                style={{ zIndex: 1050 }}  // Ensure it's above other elements
            >
                <Toast.Body>Order placed successfully!</Toast.Body>
            </Toast>


        </>
    );
};

export default ConfirmOrder;
