import React, { useEffect, useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const AddProduct = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [image01, setImage01] = useState('');
    const [image02, setImage02] = useState('');
    const [categorySlug, setCategorySlug] = useState('');
    const [slug, setSlug] = useState('');
    const [description, setDescription] = useState('');
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);  // Thay đổi từ size thành sizes
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const history = useHistory();
    useEffect(() => {
        // Fetch danh mục từ API
        axios.get('https://cloulding.onrender.com/api/category')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Có lỗi xảy ra khi lấy danh mục:', error);
            });
    }, []);
    
    const handleCancel = () => {
        history.push('/admin/products'); // Quay lại trang danh mục
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newProduct = {
                title,
                price,
                image01,
                image02,
                categorySlug,
                slug,
                description,
                colors,
                size: sizes  // Sử dụng sizes thay vì size
            };
            const response = await axios.post('https://cloulding.onrender.com/api/products', newProduct);

            if (response.status === 201) {
                setSuccess('Product added successfully!');
                // Reset form fields
                setTitle('');
                setPrice('');
                setImage01('');
                setImage02('');
                setCategorySlug('');
                setSlug('');
                setDescription('');
                setColors([]);
                setSizes([]);  // Reset sizes
            } else {
                setError('Failed to add product.');
            }
        } catch (error) {
            setError('Error: ' + error.response?.data?.message || error.message);
        }
    };

    return (
        <Container className="mt-5">
            <h1>Add Product</h1>
            {error && <p className="text-danger">{error}</p>}
            {success && <p className="text-success">{success}</p>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter product title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formPrice" className="mt-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formImage01" className="mt-3">
                    <Form.Label>Image URL 1</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter image URL 1"
                        value={image01}
                        onChange={(e) => setImage01(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formImage02" className="mt-3">
                    <Form.Label>Image URL 2</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter image URL 2"
                        value={image02}
                        onChange={(e) => setImage02(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formCategorySlug" className="mt-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        as="select"
                        value={categorySlug}
                        onChange={(e) => setCategorySlug(e.target.value)}
                        required
                    >
                        <option value="">Select Category</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.display}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formSlug" className="mt-3">
                    <Form.Label>Slug</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter product slug"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formDescription" className="mt-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter product description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formColors" className="mt-3">
                    <Form.Label>Colors</Form.Label>
                    {/* Checkbox để chọn màu sắc */}
                    {['Red', 'Green', 'Blue', 'Yellow', 'Black', 'Orange', 'White'].map(color => (
                        <Form.Check
                            key={color}
                            type="checkbox"
                            label={color}
                            value={color}
                            checked={colors.includes(color)}
                            onChange={(e) => {
                                const selectedColor = e.target.value;
                                setColors(prevColors => 
                                    prevColors.includes(selectedColor) 
                                        ? prevColors.filter(c => c !== selectedColor) 
                                        : [...prevColors, selectedColor]
                                );
                            }}
                        />
                    ))}
                </Form.Group>

                <Form.Group controlId="formSizes" className="mt-3">
                    <Form.Label>Sizes</Form.Label>
                    {/* Checkbox để chọn kích cỡ */}
                    {['s', 'm', 'l','xl','One-Size'].map(sizeOption => (
                        <Form.Check
                            key={sizeOption}
                            type="checkbox"
                            label={sizeOption}
                            value={sizeOption}
                            checked={sizes.includes(sizeOption)}
                            onChange={(e) => {
                                const selectedSize = e.target.value;
                                setSizes(prevSizes => 
                                    prevSizes.includes(selectedSize) 
                                        ? prevSizes.filter(s => s !== selectedSize) 
                                        : [...prevSizes, selectedSize]
                                );
                            }}
                        />
                    ))}
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3">
                    Add Product
                </Button>

                <Button variant="secondary" className="mt-3 ms-2" onClick={handleCancel}>
                    Cancel
                </Button>
            </Form>
        </Container>
    );
};

export default AddProduct;
