import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Container, Alert, Button, Modal } from 'react-bootstrap';

const OrderCus = () => {
    const [orders, setOrders] = useState([]);

    const [showDetail, setShowDetail] = useState(false);
    const [customerInfo, setCustomerInfo] = useState(null);
    const [user, setUser] = useState(null); 

    useEffect(() => {
        const userInfo = localStorage.getItem('user');
        if (userInfo) {
            setUser(JSON.parse(userInfo));
        }

        axios.get('https://cloulding.onrender.com/api/oders')
            .then(response => {
                // Lọc các đơn hàng chỉ thuộc về người dùng hiện tại
                const userOrders = response.data.filter(order => order.customer._id === user?.userId);
                setOrders(userOrders);
            })
            .catch(error => {
                
                console.error('Có lỗi xảy ra khi lấy dữ liệu:', error);
            });
    }, [user]);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    const handleShowDetail = (customer) => {
        setCustomerInfo(customer);
        setShowDetail(true);
    };

    const handleCloseDetail = () => {
        setShowDetail(false);
        setCustomerInfo(null);
    };

    const calculateTotal = () => {
        return orders.reduce((total, order) => total + Number(order.totalPrice), 0);
    };

    return (
        <Container>
            <h1 className="my-4">My Orders</h1>
            <h2 className="my-4">Total: {formatCurrency(calculateTotal())}</h2>
            {orders.length > 0 ? (
                <Table striped bordered hover responsive="md">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Customer Name</th>
                            <th>Total Price</th>
                            <th>Status</th>
                            <th>Products</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={order._id}>
                                <td>{index + 1}</td>
                                <td>
                                    {order.customer.username}
                                    <Button
                                        variant="info"
                                        onClick={() => handleShowDetail(order.customer)}
                                        className="ms-2"
                                    >
                                        Detail
                                    </Button>
                                </td>
                                <td>{formatCurrency(order.totalPrice)}</td>
                                <td>{order.status}</td>
                                <td>
                                    <ul className="list-unstyled mb-0">
                                        {order.products.map(product => (
                                            <li key={product.productId}>
                                                {product.title} - {product.quantity} x {formatCurrency(product.price)} (Size: {product.size}, Color: {product.color})
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                <td>
                                    {/* Thêm hành động nếu cần */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <Alert variant="info">
                    No orders available.
                </Alert>
            )}

            {/* Modal Detail Customer */}
            <Modal show={showDetail} onHide={handleCloseDetail}>
                <Modal.Header closeButton>
                    <Modal.Title>Customer Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {customerInfo ? (
                        <div>
                            <p><strong>Username:</strong> {customerInfo.username}</p>
                            <p><strong>Email:</strong> {customerInfo.email}</p>
                            <p><strong>Address:</strong> {customerInfo.address}</p>
                            <p><strong>Phone:</strong> {customerInfo.phone}</p>
                        </div>
                    ) : (
                        <p>No customer information available.</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDetail}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default OrderCus;
