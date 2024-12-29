import React, { useState, useEffect } from 'react';
import axios from '../config/apiConfig';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

const SellerDashboard = () => {
    const [products, setProducts] = useState([]);
    const [salesData, setSalesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch seller's products and sales data
    useEffect(() => {
        const fetchSellerProducts = async () => {
            try {
                const response = await axios.get('products/seller-products', {
                    withCredentials: true,
                });
                setProducts(response.data.products); // Set the products in state
            } catch (err) {
                setError(err.response.data.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSellerProducts();
    }, []);

    if (loading) {
        return (
            <Container className="my-5 text-center">
                <Spinner animation="border" role="status" />
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="my-5 text-center">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container
            fluid
            className="d-flex flex-column align-items-center justify-content-center rw-background-color py-5 my-4"
            style={{ minHeight: '100vh' }}
        >
            <Row>
                <Col xs={12} md={4}>
                    <Card className='mb-3'>
                        <Card.Body>
                            <Card.Title className="fw-bold">Sales Overview</Card.Title>
                            <ul>
                                <li>Total Sales: ${salesData.totalSales}</li>
                                <li>Orders Pending: {salesData.pendingOrders}</li>
                                <li>Completed Orders: {salesData.completedOrders}</li>
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>

                <Col xs={12} md={8}>
                    <Card>
                        <Card.Body>
                            <Card.Title className="fw-bold">Manage Your Products</Card.Title>
                            <Link to="/add-product">
                                <Button className="mb-3 rw-primary-color border-0">
                                    Add New Product
                                </Button>
                            </Link>
                            <Row className="justify-content-center">
                                {products.length === 0 ? (
                                    <Alert variant="info" className="m-2 w-100 text-center">
                                        No products found. Add some products!
                                    </Alert>
                                ) : (
                                    // Add your logic to display products here
                                    products.map((product) => (
                                        <Col key={product._id} xs={12} md={6} lg={4} className="mb-4">
                                            {/* Display product information here */}
                                            <Card className="shadow-sm">
                                                <Card.Img variant="top" src={product.image} />
                                                <Card.Body>
                                                    <Card.Title>{product.name}</Card.Title>
                                                    <Card.Text>{product.description}</Card.Text>
                                                    <Card.Text>
                                                        <strong>Price:</strong> ${product.price}
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))
                                )}
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default SellerDashboard;
