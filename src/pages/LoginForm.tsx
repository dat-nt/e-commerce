// src/Login.tsx
import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';


const LoginForm: React.FC = () => {

    const navigate = useNavigate();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onFinish = (values: any) => {
        const { username, password } = values;
        if (username === 'admin' && password === '123456') {
            navigate('/dashboard');
        } else {
            alert('Invalid username or password');
        }
    };

    return (
        <div className="login-container">
            <Form
                name="login_form"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Typography.Title style={{ textAlign: "center" }}>Login Form</Typography.Title>

                <Form.Item
                    name="username"
                    label="User Name"
                    rules={[{ required: true, message: 'Please input your Username!' }]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input
                        prefix={<LockOutlined />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default LoginForm;
