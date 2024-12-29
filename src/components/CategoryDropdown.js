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
    const [showModal, setShowModal] = useState(false); // Modal visibility state
    const [selectedProduct, setSelectedProduct] = useState(null); // Selected product for order

    // Fetch categories and products
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch categories
                const categoryResponse = await axios.get('products/get-categories');
                console.log('Categories:', categoryResponse.data);
                setCategories(categoryResponse.data);

                // Recursively fetch products for each category
                const groupedData = await Promise.all(
                    categoryResponse.data.map(async (category) => {
                        const products = await fetchProductsForCategory(category._id);

                        // Recursively fetch products for subcategories
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

    // Handle the "Order" button click to show the confirmation modal
    const handleOrderClick = (product) => {
        setSelectedProduct(product); // Set the selected product for the order
        setShowModal(true); // Show the modal
    };

    // Show loading spinner while fetching
    if (loading) {
        return (
            <div className="text-center">
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    // Show error message if fetching fails
    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    // Show message if no products or categories are available
    if (groupedProducts.length === 0) {
        return <Alert variant="warning">No products or categories found.</Alert>;
    }

    return (
        <Container className="mt-4">
            {groupedProducts.map((group) => (
                <Row key={group.category._id} className="mb-3">
                    <Col>
                        <Card className="bg-white shadow-sm">
                            <Card.Body>
                                {/* Category Title */}
                                <Card.Title className="fw-bold rw-text-secondary">{group.category.name}</Card.Title>

                                {/* Subcategories list */}
                                {group.subcategories.length > 0 && (
                                    <div>
                                        {group.subcategories.map((subcategory) => (
                                            <div key={subcategory.subcategory._id} className="mb-3">
                                                <h6>{subcategory.subcategory.name}</h6>
                                                {/* Display products for each subcategory */}
                                                {subcategory.products.length > 0 ? (
                                                    <Row>
                                                        {subcategory.products.map((product) => (
                                                            <Col key={product._id} xs={12} md={6} lg={4}>
                                                                <Card className="mb-1">
                                                                    <Card.Img variant="top" src={product.image} />
                                                                    <Card.Body>
                                                                        <Card.Title>{product.name}</Card.Title>
                                                                        <Card.Text>{product.description}</Card.Text>
                                                                        <Card.Text>
                                                                            <strong>Price:</strong> PKR {product.price}
                                                                        </Card.Text>
                                                                        <Button
                                                                            className="rw-primary-color border-0"
                                                                            onClick={() => handleOrderClick(product)} // Trigger modal
                                                                        >
                                                                            Order
                                                                        </Button>
                                                                    </Card.Body>
                                                                </Card>
                                                            </Col>
                                                        ))}
                                                    </Row>
                                                ) : (
                                                    <p>No products available.</p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
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
