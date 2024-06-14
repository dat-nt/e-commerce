// src/layouts/DashboardLayout.tsx
import React from 'react';
import { Layout, Menu } from 'antd';
import {
    HomeOutlined,
    ShoppingCartOutlined,
    PlusOutlined,
    AppstoreAddOutlined,
} from '@ant-design/icons';
import { Link, Outlet } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const DashboardLayout: React.FC = () => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider width={300}>
                <div className="logo"
                    style={{ height: '32px', margin: '16px', background: 'rgba(255, 255, 255, 0.3)' }}
                />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<HomeOutlined />}>
                        <Link to="/dashboard">Home</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<AppstoreAddOutlined />}>
                        <Link to="/products">Products</Link>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<PlusOutlined />}>
                        <Link to="/add-product">Add Product</Link>
                    </Menu.Item>
                    <Menu.Item key="4" icon={<PlusOutlined />}>
                        <Link to="/add-category">Add Category</Link>
                    </Menu.Item>
                    <Menu.Item key="5" icon={<ShoppingCartOutlined />}>
                        <Link to="/cart">Cart</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ background: '#fff', padding: 0 }} />
                <Content style={{ margin: '16px' }}>
                    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default DashboardLayout;
