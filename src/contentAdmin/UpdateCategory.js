import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Form, Container } from 'react-bootstrap';
import { useParams, useHistory } from 'react-router-dom';

const UpdateCategory = () => {
    const { id } = useParams(); // Nhận ID từ URL
    const [category, setCategory] = useState(null);
    const [formData, setFormData] = useState({ display: '', slug: '' });
    const history = useHistory();

    useEffect(() => {
        // Fetch dữ liệu danh mục từ API theo ID
        axios.get(`https://cloulding.onrender.com/api/category/${id}`)
            .then(response => {
                setCategory(response.data);
                setFormData({
                    display: response.data.display,
                    slug: response.data.slug // Thay đổi thành `slug`
                });
            })
            .catch(error => {
                console.error('Có lỗi xảy ra khi lấy danh mục:', error);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`https://cloulding.onrender.com/api/category/${id}`, formData);
            if (response.status === 200) {
                history.push('/admin/category'); // Quay lại trang danh mục sau khi cập nhật
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật danh mục:', error.response?.data?.message || error.message);
        }
    };

    const handleCancel = () => {
        history.push('/admin/category'); // Quay lại trang danh mục khi nhấn Cancel
    };

    return (
        <Container className="mt-5">
            <h1>Update Category</h1>
            {category ? (
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formDisplay">
                        <Form.Label>Display</Form.Label>
                        <Form.Control
                            type="text"
                            name="display"
                            value={formData.display}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formSlug">
                        <Form.Label>Slug</Form.Label>
                        <Form.Control
                            type="text"
                            name="slug" // Đổi tên thành `slug`
                            value={formData.slug}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="mt-3 me-2">
                        Update Category
                    </Button>
                    <Button variant="secondary" className="mt-3" onClick={handleCancel}>
                        Cancel
                    </Button>
                </Form>
            ) : (
                <p>Loading...</p>
            )}
        </Container>
    );
};

export default UpdateCategory;
