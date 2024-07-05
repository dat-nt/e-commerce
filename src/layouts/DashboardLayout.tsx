import { Outlet } from 'react-router-dom';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Layout, Menu, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;

const DashboardLayout: React.FC = () => {
    const [current, setCurrent] = useState("home");

    return (
        <Layout >
            <Header
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1000,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Typography.Title level={3} style={{ color: '#fff', margin: 0 }}>
                    E-Commerce
                </Typography.Title>

                <Menu
                    mode="horizontal"
                    theme="dark"
                    selectedKeys={[current]}
                    onClick={(e) => setCurrent(e.key)}
                    style={{ flex: 1, margin: '0 30px', fontSize: '18px' }}
                >
                    <Menu.Item key="home" >
                        <Link to="">Home</Link>
                    </Menu.Item>
                    <Menu.Item key="products">
                        <Link to="products">Products</Link>
                    </Menu.Item>
                    <Menu.Item key="cart">
                        <Link to="cart">Cart</Link>
                    </Menu.Item>
                    <Menu.Item key="admin">
                        <Link to="/admin">Admin Layout</Link>
                    </Menu.Item>
                </Menu>

                <Avatar
                    size="large"
                    icon={<UserOutlined />}
                    style={{ backgroundColor: "#ccc", color: "#000" }} />
            </Header>

            <Content style={{
                padding: 20,
            }}>
                <Outlet />
            </Content>
        </Layout >
    );
};

export default DashboardLayout;
