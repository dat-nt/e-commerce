import React from 'react';
import { Layout, Menu, Typography, theme } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import { AppstoreAddOutlined, HomeOutlined, ReconciliationOutlined, UnorderedListOutlined } from '@ant-design/icons';

const { Sider, Content } = Layout;

const AdminLayout: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout>
            <Sider
                trigger={null}
                width={300}
                style={{ height: "100vh", padding: "30px 20px" }}
            >
                <Typography.Title level={3} style={{ textAlign: "center" }}>
                    <Link to="/admin">Admin Page</Link>
                </Typography.Title>

                <Menu
                    theme="dark"
                    mode="inline"
                    style={{ fontSize: "16px" }}
                >
                    <Menu.Item key="products"
                        icon={<UnorderedListOutlined className="menu-icon" />}
                    >
                        <Link to="products">Products list</Link>
                    </Menu.Item>
                    <Menu.Item key="add-product"
                        icon={<AppstoreAddOutlined className="menu-icon" />}

                    >
                        <Link to="add-product">Add product</Link>
                    </Menu.Item>
                    <Menu.Item key="add-category"
                        icon={<ReconciliationOutlined className="menu-icon" />}
                    >
                        <Link to="add-category">Add category</Link>
                    </Menu.Item>
                    <Menu.Item key="dashboard"
                        icon={<HomeOutlined className="menu-icon" />}
                    >
                        <Link to="/dashboard">Go to dashboard</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className='admin-layout'>
                <Content
                    style={{
                        margin: '30px 24px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;