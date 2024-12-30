import React, { useState, useEffect } from 'react';
import axios from '../config/apiConfig';
import { Container, Row, Col, Card, Alert, Spinner, Button } from 'react-bootstrap';
import ConfirmOrder from './ConfirmOrder';

// Helper function to recursively fetch products for categories and subcategories
const fetchProductsForCategory = async (categoryId) => {
    try {
        const productResponse = await axios.get(`products/category/${categoryId}`);
        return productResponse.data.products;
    } catch (err) {
        console.error('Error fetching products for category:', err);
        return [];
    }
};

const CategoryDropdown = () => {
    const [categories, setCategories] = useState([]);
    const [groupedProducts, setGroupedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Fetch categories and products
    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoryResponse = await axios.get('products/get-categories');
                setCategories(categoryResponse.data);

                const groupedData = await Promise.all(
                    categoryResponse.data.map(async (category) => {
                        const products = await fetchProductsForCategory(category._id);

                        const subcategoriesData = category.categories
                            ? await Promise.all(
                                category.categories.map(async (subcategory) => {
                                    const subcategoryProducts = await fetchProductsForCategory(subcategory._id);
                                    return {
                                        subcategory,
                                        products: subcategoryProducts,
                                    };
                                })
                            )
                            : [];

                        return {
                            category,
                            products,
                            subcategories: subcategoriesData,
                        };
                    })
                );

                setGroupedProducts(groupedData);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching data', err);
                setError('Failed to load categories and products.');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleOrderClick = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    if (loading) {
        return (
            <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    if (groupedProducts.length === 0) {
        return <Alert variant="warning">No products or categories found.</Alert>;
    }

    return (
        <Container fluid className="py-4">
            {groupedProducts.map((group) => (
                <Row key={group.category._id} className="mb-4">
                    <Col>
                        <Card className="shadow-sm border-0">
                            <Card.Body>
                                <Card.Title className="fw-bold rw-text-secondary">
                                    {group.category.name}
                                </Card.Title>

                                {/* Subcategories and Products */}
                                {group.subcategories.length > 0 ? (
                                    group.subcategories.map((subcategory) => (
                                        <div key={subcategory.subcategory._id} className="mb-4">
                                            <h5 className="mb-3">{subcategory.subcategory.name}</h5>
                                            <Row className="g-4">
                                                {subcategory.products.map((product) => (
                                                    <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
                                                        <Card className="shadow-sm h-100">
                                                            <Card.Img
                                                                variant="top"
                                                                src={product.image || 'default-image-url.jpg'}
                                                                alt={product.name}
                                                                className="product-card-img"
                                                            />
                                                            <Card.Body className="d-flex flex-column">
                                                                <Card.Title className="text-truncate">
                                                                    {product.name}
                                                                </Card.Title>
                                                                <Card.Text className="text-truncate text-muted">
                                                                    {product.description}
                                                                </Card.Text>
                                                                <Card.Text>
                                                                    <strong>Price:</strong> PKR {product.price}
                                                                </Card.Text>
                                                                <Button
                                                                    className="mt-auto rw-primary-color border-0"
                                                                    onClick={() => handleOrderClick(product)}
                                                                >
                                                                    Order
                                                                </Button>
                                                            </Card.Body>
                                                        </Card>
                                                    </Col>
                                                ))}
                                            </Row>
                                        </div>
                                    ))
                                ) : (
                                    <p>No subcategories or products available.</p>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            ))}
            <ConfirmOrder showModal={showModal} setShowModal={setShowModal} selectedProduct={selectedProduct} />
        </Container>
    );
};

export default CategoryDropdown;
