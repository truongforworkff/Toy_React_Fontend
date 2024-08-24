import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'; // Import useHistory

const ProductDashboard = () => {
    const [products, setProducts] = useState([]);
    const history = useHistory(); // Sử dụng useHistory để điều hướng

    useEffect(() => {
        // Fetch dữ liệu từ API
        axios.get('https://cloulding.onrender.com/api/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Có lỗi xảy ra khi lấy dữ liệu:', error);
            });
    }, []);

    // Hàm thêm sản phẩm, chuyển hướng đến trang Add Product
    const handleAdd = () => {
        history.push('/admin/products/add'); // Điều hướng đến trang thêm sản phẩm
    };

    // Hàm cập nhật sản phẩm
    const handleUpdate = (slug) => {
        console.log('Cập nhật sản phẩm', slug);
        history.push(`/admin/products/update/${slug}`);
      
        // Logic để cập nhật sản phẩm
    };

    // Hàm xóa sản phẩm
    const handleDelete = async (id) => {
        try {
            console.log('Xóa sản phẩm', id);
            const response = await axios.delete(`https://cloulding.onrender.com/api/products/${id}`);
    
            if (response.status === 200) {
                setProducts(products.filter(product => product.id !== id));
                console.log('Sản phẩm đã được xóa thành công');
            } else {
                console.error('Xóa sản phẩm thất bại');
            }
        } catch (error) {
            console.error('Lỗi khi xóa sản phẩm:', error.response?.data?.message || error.message);
        }
    };

    return (
        <div className="container mt-5">
            <h1>Product Dashboard</h1>
            <Button variant="primary" className="mb-3" onClick={handleAdd}>
                Add Product
            </Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Colors</th>
                        <th>Sizes</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={product.id}>
                            <td>{index + 1}</td>
                            <td>{product.title}</td>
                            <td>{product.price} VND</td>
                            <td>{product.categorySlug}</td>
                            <td>{product.colors.join(', ')}</td>
                            <td>{product.size.join(', ')}</td>
                            <td>
                                <Button
                                    variant="warning"
                                    className="me-2"
                                    onClick={() => handleUpdate(product.slug)}
                                >
                                    Update
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => {
                                        if (window.confirm('Do you want delete this product?')) {
                                            handleDelete(product.id);
                                        }
                                    }}
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

export default ProductDashboard;
