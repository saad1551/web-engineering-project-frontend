import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Spinner, Container, Row, Col, Card } from 'react-bootstrap';
import axios from '../config/apiConfig';
import { useNavigate } from 'react-router';

const AddProduct = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [subCategoryId, setSubCategoryId] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null); // For image preview
    const [isMakeToOrder, setIsMakeToOrder] = useState(false);
    const [preparationDays, setPreparationDays] = useState('');
    const [quantity, setQuantity] = useState('');
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Fetch categories from API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('products/get-categories');
                setCategories(response.data);
            } catch (err) {
                setError('Failed to load categories');
            }
        };

        fetchCategories();
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file); // Update the image file
            setImagePreview(URL.createObjectURL(file)); // Generate a preview
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccessMessage('');

        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('categoryId', subCategoryId);
        formData.append('isMakeToOrder', isMakeToOrder);
        formData.append('preparationDays', preparationDays);
        formData.append('quantity', quantity);
        formData.append('image', image); // Append the file as "image"

        try {
            const response = await axios.post('products/add-product', formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setSuccessMessage(response.data.message);
            setLoading(false);

            navigate('/seller-dashboard'); // Redirect to seller dashboard
        } catch (err) {
            setLoading(false);
            setError(err.response?.data?.message || 'Failed to add product');
        }
    };

    return (
        <Container fluid className="d-flex flex-column align-items-center justify-content-center py-5 my-4 rw-background-color" style={{ minHeight: '100vh' }}>
            <Row className="justify-content-center w-100">
                <Col xs={12} sm={8} md={6} lg={4}>
                    <Card className="shadow-sm p-2 mt-3">
                        <Card.Body>
                            <h2 className="text-center mb-4">
                                Add New Product
                                <span className="d-block" style={{ fontSize: '1.2rem', direction: 'rtl' }}>
                                    نیا پروڈکٹ شامل کریں
                                </span>
                            </h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            {successMessage && <Alert variant="success">{successMessage}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="productName" className="mb-3">
                                    <Form.Label className="d-flex justify-content-between">
                                        <span className="text-start" style={{ fontSize: '1.1rem' }}>
                                            Product Name
                                        </span>
                                        <span className="text-end" style={{ fontSize: '1.1rem', direction: 'rtl' }}>
                                            پروڈکٹ کا نام
                                        </span>
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter product name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="productPrice" className="mb-3">
                                    <Form.Label className="d-flex justify-content-between">
                                        Price
                                        <span className="d-block" style={{ fontSize: '1.1rem', direction: 'rtl' }}>
                                            قیمت
                                        </span>
                                    </Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter product price"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="productDescription" className="mb-3">
                                    <Form.Label className="d-flex justify-content-between">
                                        Description
                                        <span className="d-block" style={{ fontSize: '1.1rem', direction: 'rtl' }}>
                                            تفصیل
                                        </span>
                                    </Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Enter product description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="productCategory" className="mb-3">
                                    <Form.Label className="d-flex justify-content-between">
                                        Category
                                        <span className="d-block" style={{ fontSize: '1.1rem', direction: 'rtl' }}>
                                            کیٹیگری
                                        </span>
                                    </Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={categoryId}
                                        onChange={(e) => {
                                            setCategoryId(e.target.value);
                                            setSubCategoryId(''); // Reset subcategory when category changes
                                        }}
                                        required
                                    >
                                        <option value="">Select Category</option>
                                        {categories.map((category) => (
                                            <option key={category._id} value={category._id}>
                                                <span className="text-start" style={{ fontSize: '1.1rem' }}>{category.name}</span>
                                                <span className='text-end' style={{ fontSize: '1.1rem', direction: 'rtl' }}>{category.nameUrdu}</span>
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>

                                {categoryId && (
                                    <Form.Group controlId="productSubCategory" className="mb-3">
                                        <Form.Label className="d-flex justify-content-between">
                                            Subcategory
                                            <span className="d-block" style={{ fontSize: '1.1rem', direction: 'rtl' }}>
                                                ذیلی قسم
                                            </span>
                                        </Form.Label>
                                        <Form.Control
                                            as="select"
                                            value={subCategoryId}
                                            onChange={(e) => setSubCategoryId(e.target.value)}
                                            required
                                        >
                                            <option value="">Select Subcategory</option>
                                            {categories
                                                .find((category) => category._id === categoryId)
                                                ?.categories.map((subcategory) => (
                                                    <option key={subcategory._id} value={subcategory._id}>
                                                        <div className='d-flex justify-content-between'>
                                                            <span className="text-start" style={{ fontSize: '1.1rem' }}>{subcategory.name}</span>
                                                            <span className='text-end' style={{ fontSize: '1.1rem', direction: 'rtl' }}>{subcategory.nameUrdu}</span>
                                                        </div>
                                                    </option>
                                                ))}
                                        </Form.Control>
                                    </Form.Group>
                                )}

                                <Form.Group controlId="productImage" className="mb-3">
                                    <Form.Label className="d-flex justify-content-between">
                                        Product Image
                                        <span className="d-block" style={{ fontSize: '1.1rem', direction: 'rtl' }}>
                                            پروڈکٹ کی تصویر
                                        </span>
                                    </Form.Label>
                                    <Form.Control
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        required
                                    />
                                </Form.Group>

                                {imagePreview && (
                                    <div className="mb-3">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="img-fluid rounded"
                                            style={{ maxHeight: '200px' }}
                                        />
                                    </div>
                                )}

                                <Form.Group controlId="isMakeToOrder" className="mb-3 d-flex justify-content-between">
                                    <Form.Check
                                        type="checkbox"
                                        label="Make to Order"
                                        checked={isMakeToOrder}
                                        onChange={(e) => setIsMakeToOrder(e.target.checked)}
                                    />
                                    <span className="d-block" style={{ fontSize: '1.1rem', direction: 'rtl' }}>
                                        آرڈر پر بنائیں
                                    </span>
                                </Form.Group>

                                {isMakeToOrder && (
                                    <Form.Group controlId="preparationDays" className="mb-3">
                                        <Form.Label className='d-flex justify-content-between'>
                                            Preparation Days
                                            <span className="d-block" style={{ fontSize: '1.1rem', direction: 'rtl' }}>
                                                تیاری کے دن
                                            </span>
                                        </Form.Label>
                                        <Form.Control
                                            type="number"
                                            value={preparationDays}
                                            onChange={(e) => setPreparationDays(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                )}

                                {!isMakeToOrder && (
                                    <Form.Group controlId="quantity" className="mb-3">
                                        <Form.Label className='d-flex justify-content-between'>
                                            Quantity
                                            <span className="d-block" style={{ fontSize: '1.1rem', direction: 'rtl' }}>
                                                مقدار
                                            </span>
                                        </Form.Label>
                                        <Form.Control
                                            type="number"
                                            value={quantity}
                                            onChange={(e) => setQuantity(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                )}

                                <Button type="submit" className="w-100 rw-primary-color border-0" disabled={loading}>
                                    {loading ? <Spinner animation="border" size="sm" /> : 'Add Product'}
                                    <span className="d-block" style={{ fontSize: '1.1rem', direction: 'rtl' }}>
                                        پروڈکٹ شامل کریں
                                    </span>
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AddProduct;
