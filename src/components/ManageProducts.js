import React from "react";
import { Link } from "react-router-dom";
import { Card, Button, Row, Col, Alert } from "react-bootstrap";
import { Container } from "react-bootstrap";

const ManageProducts = ({ products }) => {
    return (
        <Container fluid className="py-4 px-3">
            <Row className="justify-content-center">
                <Col xs={12} md={10} lg={8}>
                    <Card className="shadow-lg border-0">
                        <Card.Body className="p-4">
                            <Card.Title className="fw-bold text-center mb-4">Manage Your Products</Card.Title>
                            <div className="text-center mb-4">
                                <Link to="/add-product">
                                    <Button className="rw-primary-color px-4 py-2">
                                        Add New Product
                                    </Button>
                                </Link>
                            </div>
                            <Row className="g-4">
                                {products.length === 0 ? (
                                    <Col>
                                        <Alert variant="info" className="text-center">
                                            No products found. Add some products!
                                        </Alert>
                                    </Col>
                                ) : (
                                    products.map((product) => (
                                        <Col key={product._id} xs={12} sm={6} md={4}>
                                            <Card className="shadow-sm product-card h-100">
                                                <Card.Img
                                                    variant="top"
                                                    src={product.image || "default-image-url.jpg"} // Replace with your default image URL
                                                    alt={product.name}
                                                    className="product-card-img"
                                                />
                                                <Card.Body>
                                                    <Card.Title className="text-truncate">
                                                        {product.name}
                                                    </Card.Title>
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

export default ManageProducts;
