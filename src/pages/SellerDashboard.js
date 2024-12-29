import React, { useState, useEffect } from 'react';
import axios from '../config/apiConfig';
import { Container, Row, Col, Card, Button, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
                // Set sales data (example data; adapt to your API structure)
                setSalesData(response.data.sales || {
                    totalSales: 0,
                    pendingOrders: 0,
                    completedOrders: 0
                });
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch data');
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
            className="d-flex flex-column align-items-center justify-content-center py-5 mt-3 rw-background-color"
            style={{ minHeight: '100vh' }}
        >
            <Row className="justify-content-center align-self-center w-100 mt-4">
                <Col xs={12} md={8}>
                    {/* Sales Overview Card */}
                    <Card className="mb-4 shadow-sm">
                        <Card.Body>
                            <Card.Title className="fw-bold">Sales Overview</Card.Title>
                            <ul className="list-unstyled">
                                <li><strong>Total Sales:</strong> PKR {salesData.totalSales}</li>
                                <li><strong>Orders Pending:</strong> {salesData.pendingOrders}</li>
                                <li><strong>Completed Orders:</strong> {salesData.completedOrders}</li>
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="justify-content-center align-self-center w-100">
                <Col xs={12} md={8}>
                    {/* Product Management Card */}
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Card.Title className="fw-bold">Manage Your Products</Card.Title>
                            <Link to="/add-product">
                                <Button className="mb-3 rw-primary-color border-0">
                                    Add New Product
                                </Button>
                            </Link>
                            {/* Product Grid */}
                            <Row className="g-4">
                                {products.length === 0 ? (
                                    <Alert variant="info" className="w-100 text-center">
                                        No products found. Add some products!
                                    </Alert>
                                ) : (
                                    products.map((product) => (
                                        <Col key={product._id} xs={12} md={6} lg={4}>
                                            {/* Product Card */}
                                            <Card className="shadow-sm product-card">
                                                <Card.Img variant="top" src={product.image} />
                                                <Card.Body>
                                                    <Card.Title className="text-truncate">{product.name}</Card.Title>
                                                    <Card.Text className="text-muted text-truncate">
                                                        {product.description}
                                                    </Card.Text>
                                                    <Card.Text>
                                                        <strong>Price:</strong> PKR {product.price}
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
