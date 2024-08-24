import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const CategoryDashboard = () => {
    const [categories, setCategories] = useState([]);
    const history = useHistory();

    useEffect(() => {
        // Fetch dữ liệu từ API
        axios.get('https://cloulding.onrender.com/api/category')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Có lỗi xảy ra khi lấy dữ liệu:', error);
            });
    }, []);

    // Hàm thêm danh mục
    const handleAdd = () => {
        history.push('/admin/category/add');
    };

    // Hàm cập nhật danh mục
    const handleUpdate = (id) => {
        history.push(`/admin/category/update/${id}`);
        console.log('Cập nhật danh mục', id);
        // Logic để cập nhật danh mục
    };

    // Hàm xóa danh mục
    const handleDelete = async (id) => {
        // Hỏi trước khi xóa
        const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa danh mục này không?');
        if (confirmDelete) {
            try {
                const response = await axios.delete(`https://cloulding.onrender.com/api/category/${id}`);

                if (response.status === 200) {
                    setCategories(categories.filter(category => category.id !== id));
                    console.log('Danh mục đã được xóa thành công');
                } else {
                    console.error('Xóa danh mục thất bại');
                }
            } catch (error) {
                console.error('Lỗi khi xóa danh mục:', error.response?.data?.message || error.message);
            }
        }
    };

    return (
        <div className="container mt-5">
            <h1>Category Dashboard</h1>
            <Button variant="primary" className="mb-3" onClick={handleAdd}>
                Add Category
            </Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Display</th>
                      
                        <th>Slug</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category, index) => (
                        <tr key={category._id}>
                            <td>{index + 1}</td>
                           
                            <td>{category.display}</td>
                            <td>{category.categorySlug}</td>
                            <td>
                                <Button
                                    variant="warning"
                                    className="me-2"
                                    onClick={() => handleUpdate(category.id)}
                                >
                                    Update
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => handleDelete(category.id)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default CategoryDashboard;
