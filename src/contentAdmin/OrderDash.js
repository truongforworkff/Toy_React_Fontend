import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Container, Alert, Button, Form, Modal } from 'react-bootstrap';

const OrderDash = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const [updatingOrder, setUpdatingOrder] = useState(null);
    const [status, setStatus] = useState('');
    const [updateError, setUpdateError] = useState(null);
    const [showDetail, setShowDetail] = useState(false);
    const [customerInfo, setCustomerInfo] = useState(null);

    useEffect(() => {
        // Fetch dữ liệu từ API
        axios.get('https://cloulding.onrender.com/api/oders')
            .then(response => {
                setOrders(response.data);
            })
            .catch(error => {
                setError('Có lỗi xảy ra khi lấy dữ liệu.');
                console.error('Có lỗi xảy ra khi lấy dữ liệu:', error);
            });
    }, []);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    const handleStatusChange = (orderId, newStatus) => {
        axios.put(`https://cloulding.onrender.com/api/oders/${orderId}`, { status: newStatus })
            .then(response => {
                // Cập nhật đơn hàng trong danh sách
                setOrders(orders.map(order => 
                    order._id === orderId ? { ...order, status: newStatus } : order
                ));
                setUpdatingOrder(null);
                setStatus('');
                setUpdateError(null);
            })
            .catch(error => {
                setUpdateError('Có lỗi xảy ra khi cập nhật trạng thái.');
                console.error('Có lỗi xảy ra khi cập nhật trạng thái:', error);
            });
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
            <h1 className="my-4">Order Dashboard</h1>
            <h2 className="my-4">Total: {formatCurrency(calculateTotal())}</h2>
            {error && (
                <Alert variant="danger">
                    {error}
                </Alert>
            )}
            {updateError && (
                <Alert variant="danger">
                    {updateError}
                </Alert>
            )}
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
                                    {order.customer.username || 'N/A'}
                                    <Button
                                        variant="info"
                                        onClick={() => handleShowDetail(order.customer)}
                                        className="ms-2"
                                    >
                                        Detail
                                    </Button>
                                </td>
                                <td>{formatCurrency(order.totalPrice)}</td>
                                <td>
                                    {updatingOrder === order._id ? (
                                        <Form.Control
                                            as="select"
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                        >
                                            <option value="">Select Status</option>
                                            <option value="Pending">Pending</option>
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </Form.Control>
                                    ) : (
                                        order.status
                                    )}
                                </td>
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
                                    {updatingOrder === order._id ? (
                                        <>
                                            <Button 
                                                variant="success"
                                                onClick={() => handleStatusChange(order._id, status)}
                                            >
                                                Update
                                            </Button>
                                            <Button
                                                variant="secondary"
                                                onClick={() => {
                                                    setUpdatingOrder(null);
                                                    setStatus('');
                                                }}
                                                className="ms-2"
                                            >
                                                Cancel
                                            </Button>
                                        </>
                                    ) : (
                                        <Button
                                            variant="primary"
                                            onClick={() => {
                                                setUpdatingOrder(order._id);
                                                setStatus(order.status);
                                            }}
                                        >
                                            Update Status
                                        </Button>
                                    )}
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

export default OrderDash;
