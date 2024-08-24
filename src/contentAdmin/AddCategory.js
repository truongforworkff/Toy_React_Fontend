import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; // Nhập useHistory

const AddCategory = () => {
    const [display, setDisplay] = useState('');
    const [slug, setSlug] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const history = useHistory(); // Khai báo useHistory
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const newCategory = { display, slug };
            const response = await axios.post('https://cloulding.onrender.com/api/category', newCategory);

            if (response.status === 201) {
                setSuccess('Category added successfully!');
                setDisplay('');
                setSlug('');
            } else {
                setError('Failed to add category.');
            }
        } catch (error) {
            setError('Error: ' + error.response?.data?.message || error.message);
        }
    };

    const handleCancel = () => {
        history.push('/admin/category'); // Quay lại trang danh mục
    };

    return (
        <Container className="mt-5">
            <h1>Add Category</h1>
            {error && <p className="text-danger">{error}</p>}
            {success && <p className="text-success">{success}</p>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formDisplay">
                    <Form.Label>Category Display Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter display name"
                        value={display}
                        onChange={(e) => setDisplay(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formSlug" className="mt-3">
                    <Form.Label>Category Slug</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter category slug"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3 me-2">
                    Add Category
                </Button>
                <Button variant="secondary" className="mt-3" onClick={handleCancel}>
                    Cancel
                </Button>
            </Form>
        </Container>
    );
};

export default AddCategory;
