import React, { useState } from 'react';
import { Button, Form, Input, Typography, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LockOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Login: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onFinish = (values: any) => {
        setLoading(true);
        const { username, password } = values;
        // Giả lập quá trình xử lý đăng nhập
        setTimeout(() => {
            if (username === 'admin' && password === '123456') {
                message.success('Login successful!', 3);
                navigate('/dashboard');
            } else {
                message.error('Invalid username or password!', 3);
            }
            setLoading(false);
        }, 1000); // Giả lập thời gian xử lý đăng nhập 1 giây
    };

    const onFinishFailed = (errorInfo: unknown) => {
        message.error(`Failed: ${errorInfo}`, 3);
    };

    return (
        <div className="login-container">
            <Form
                name="login"
                layout="vertical"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                className="login-form"
            >
                <Title level={2} style={{ textAlign: 'center' }}>Login</Title>
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item className='login-submit'>
                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                        icon={<LockOutlined />}
                        loading={loading}
                    >
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </div >
    );
};

export default Login;
