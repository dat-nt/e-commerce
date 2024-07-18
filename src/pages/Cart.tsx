/* eslint-disable @typescript-eslint/no-explicit-any */
// CartPage.tsx

import React, { useState } from 'react';
import { Button, Space, Table, Typography, InputNumber, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const CartPage: React.FC = () => {
    const [cartItems, setCartItems] = useState<any[]>(
        JSON.parse(localStorage.getItem('cart') || '[]')
    );

    const navigate = useNavigate();

    const handleRemoveFromCart = (itemId: number) => {
        const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
        localStorage.setItem('cart', JSON.stringify(updatedCartItems));
        setCartItems(updatedCartItems); // Update state to trigger re-render
    };

    const handleQuantityChange = (itemId: number, newQuantity: number) => {
        const updatedCartItems = cartItems.map((item) => {
            if (item.id === itemId) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        localStorage.setItem('cart', JSON.stringify(updatedCartItems));
        setCartItems(updatedCartItems); // Update state to trigger re-render
    };

    const columns = [
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (image: string) => <img src={image} alt="Product Image" style={{ width: 50, height: 50, objectFit: 'cover' }} />
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title'
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price'
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (_: any, record: any) => (
                <InputNumber
                    min={1} defaultValue={record.quantity}
                    onChange={(value) => handleQuantityChange(record.id, value)}
                />
            )
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: any) => (
                <Space size="middle">
                    <Button
                        danger icon={<DeleteOutlined />}
                        onClick={() => handleRemoveFromCart(record.id)}
                    >
                        Remove
                    </Button>
                </Space>
            )
        }
    ];

    const proceedToCheckout = () => {
        if (cartItems.length > 0) {
            navigate("payment");
        }
        else {
            message.error("You don't have any products in your shopping cart!");
        }
    }

    const total = cartItems.reduce(
        (acc: number, item: any) => acc + item.price * item.quantity, 0);

    return (
        <>
            <Title level={3}>Shopping Cart</Title>
            <Table columns={columns} dataSource={cartItems} />
            <div style={{ marginTop: '20px', textAlign: 'right' }}>
                <Title level={4}>Total: ${total.toFixed(2)}</Title>
                <Button
                    type="primary"
                    style={{ marginLeft: '10px', padding: '20px 30px' }}
                    onClick={proceedToCheckout}
                >
                    Proceed to Checkout
                </Button>
            </div>
        </>
    );
};

export default CartPage;
