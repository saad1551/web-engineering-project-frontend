import React, { useState, useEffect } from 'react';
import axios from '../config/apiConfig';
import { Container, Alert, Spinner } from 'react-bootstrap';
import ManageProducts from '../components/ManageProducts';
import SellerOrders from '../components/SellerOrders';

const SellerDashboard = () => {
    const [products, setProducts] = useState([]);
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
            <SellerOrders />
            <ManageProducts products={products} />
        </Container>
    );
};

export default SellerDashboard;
