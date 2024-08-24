import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

const UpdateProduct = () => {
    const { slug } = useParams(); // Lấy slug từ URL
    const history = useHistory(); // Để điều hướng sau khi cập nhật

    const [product, setProduct] = useState({
        title: '',
        price: '',
        image01: '',
        image02: '',
        categorySlug: '',
        slug: '',
        description: '',
        colors: [],
        size: []
    });

    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [categories, setCategories] = useState([]); 

    useEffect(() => {
        // Fetch product data by slug
        axios.get(`https://cloulding.onrender.com/api/products/${slug}`)
            .then(response => {
                setProduct(response.data);
                setColors(response.data.colors); // Cập nhật colors từ dữ liệu sản phẩm
                setSizes(response.data.size); // Cập nhật sizes từ dữ liệu sản phẩm
            })
            .catch(error => {
                console.error('Có lỗi xảy ra khi lấy dữ liệu sản phẩm:', error);
            });

        // Fetch tất cả categories từ API
        axios.get('https://cloulding.onrender.com/api/category')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Có lỗi xảy ra khi lấy danh mục:', error);
            });
    }, [slug]);

    // Handle form field changes
    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    // Handle form submission for updating the product
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedProduct = {
                ...product,
                colors: colors,
                size: sizes
            };

            const response = await axios.put(`https://cloulding.onrender.com/api/products/${product._id}`, updatedProduct);
            console.log('Sản phẩm đã được cập nhật:', response.data);
            history.push('/admin/products'); // Điều hướng về trang quản lý sản phẩm sau khi cập nhật
        } catch (error) {
            console.error('Có lỗi xảy ra khi cập nhật sản phẩm:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h1>Update Product</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        value={product.title}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                
                <Form.Group controlId="formPrice" className="mt-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formImage01" className="mt-3">
                    <Form.Label>Image 01</Form.Label>
                    <Form.Control
                        type="text"
                        name="image01"
                        value={product.image01}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formImage02" className="mt-3">
                    <Form.Label>Image 02</Form.Label>
                    <Form.Control
                        type="text"
                        name="image02"
                        value={product.image02}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formCategorySlug" className="mt-3">
                    <Form.Label>Category Slug</Form.Label>
                    <Form.Control
                        as="select" // Sử dụng select để chọn category
                        name="categorySlug"
                        value={product.categorySlug._id}
                        onChange={handleChange}
                    >
                        <option value="">Choose Category</option>
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
                        name="slug"
                        value={product.slug}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formDescription" className="mt-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formColors" className="mt-3">
    <Form.Label>Colors</Form.Label>
    {/* Checkbox để chọn màu sắc */}
    {['Red', 'Green', 'Blue', 'Yellow', 'Black', 'Orange','White'].map(color => (
        <Form.Check
            key={color}
            type="checkbox"
            label={color}
            value={color.toLowerCase()}  // Chuẩn hóa về chữ thường
            checked={colors.map(c => c.toLowerCase()).includes(color.toLowerCase())} // Kiểm tra xem màu đã có trong mảng colors hay chưa
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
                    {['s', 'm', 'l', 'xl', 'One-Size'].map(sizeOption => (
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
                    Update Product
                </Button>
                <Button variant="secondary" className="mt-3 ms-2" onClick={() => history.push('/admin/products')}>
                    Cancel
                </Button>
            </Form>
        </div>
    );
};

export default UpdateProduct;
