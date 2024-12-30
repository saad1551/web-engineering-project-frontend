import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Alert, Spinner, Container } from 'react-bootstrap';
import axios from '../config/apiConfig';

const SellerOrders = () => {
    const [orders, setOrders] = useState([]); // State to hold fetched orders
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        // Fetch the seller orders on component mount
        const fetchOrders = async () => {
            try {
                const response = await axios.get('orders/seller-orders', { withCredentials: true });
                setOrders(response.data); // Assuming the response data is an array of orders
                setLoading(false); // Set loading to false after data is fetched
            } catch (err) {
                setLoading(false); // Set loading to false on error
                setError(err.response?.data?.message || 'Failed to fetch orders');
            }
        };

        fetchOrders();
    }, []); // Empty dependency array, fetch only once on mount

    return (
        <Container className="py-4">
            <Card className="shadow-sm mb-4">
                <Card.Body>
                    <Card.Title className="fw-bold text-center fs-4">
                        Current Orders
                        <span className="d-block" style={{ fontSize: '1.2rem', direction: 'rtl' }}>
                            موجودہ آرڈرز
                        </span>
                    </Card.Title>
                </Card.Body>
            </Card>

            {/* Show loading spinner while fetching */}
            {loading && (
                <div className="text-center my-4">
                    <Spinner animation="border" variant="primary" />
                    <div style={{ direction: 'rtl', marginTop: '10px' }}>براہ کرم انتظار کریں...</div> {/* Urdu loading text */}
                </div>
            )}

            {/* Show error message */}
            {error && (
                <Alert variant="danger" className="text-center">
                    {error}
                    <span className="d-block" style={{ fontSize: '1.2rem', direction: 'rtl' }}>
                        آرڈرز حاصل کرنے میں خرابی
                    </span>
                </Alert>
            )}

            {/* Show orders if available */}
            {!loading && !error && orders.length === 0 && (
                <Alert variant="info" className="text-center">
                    No orders found.
                    <span className="d-block" style={{ fontSize: '1.2rem', direction: 'rtl' }}>
                        کوئی آرڈرز نہیں ملے
                    </span>
                </Alert>
            )}

            {/* Display orders */}
            <Row className="g-4">
                {!loading &&
                    !error &&
                    orders.map((order) => (
                        <Col key={order._id} xs={12} md={6} lg={4}>
                            <Card className="shadow-sm h-100">
                                <Card.Body>
                                    <Card.Title className="text-truncate">
                                        <strong>Product:</strong> {order.productId.name}
                                    </Card.Title>
                                    <Card.Text>
                                        <strong>Customer/گاہک:</strong> {order.buyerId.name}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Phone:</strong> {order.buyerId.phoneNumber}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Address/پتہ:</strong> {order.address}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
            </Row>
        </Container>
    );
};

export default SellerOrders;
