import React, { useEffect, useState } from 'react';
import { Button, Space, Spin, Table, TableColumnsType, Typography, message } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Product } from '../types/Product';
import { Category } from '../types/Category';
import { ShoppingCartOutlined } from '@ant-design/icons';
import Search from './Search';
import FilterRange from './FilterRange';
import { getProducts } from '../api/productApi';

const { Title } = Typography;

const ProductTable: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const searchParams = new URLSearchParams(location.search);

    const { data: products, isLoading } = useQuery<Product[]>({
        queryKey: ['products-table', location.search],
        queryFn: () => getProducts(searchParams)
    });

    useEffect(() => {
        if (products) {
            setFilteredProducts(products);
        }
    }, [products]);

    const handleSearch = (value: string | undefined) => {
        const params = new URLSearchParams(location.search);
        if (value) {
            params.set('title', value);
        } else {
            params.delete('title');
        }
        navigate({ search: params.toString().toLowerCase() });
    };

    const handleFilter = (min: number | undefined, max: number | undefined) => {
        const params = new URLSearchParams(location.search);
        if (min !== undefined) {
            params.set('price_min', String(min));
        } else {
            params.delete('price_min');
        }
        if (max !== undefined) {
            params.set('price_max', String(max));
        } else {
            params.delete('price_max');
        }
        navigate({ search: params.toString().toLowerCase() });
    };

    const handleAddToCart = (product: Product) => {
        const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const existingItem = cartItems.find((item: any) => item.id === product.id);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cartItems.push({
                id: product.id,
                image: product.images[0],
                title: product.title,
                price: product.price,
                quantity: 1
            });
        }

        localStorage.setItem('cart', JSON.stringify(cartItems));
        message.success(`Product "${product.title}" added to cart!`, 3);
    };

    const columns: TableColumnsType<Product> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 60,
            fixed: 'left',
            sorter: (a, b) => a.id! - b.id!,
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            width: 160,
            fixed: 'left',
            sorter: {
                compare: (a, b) => a.title.localeCompare(b.title),
                multiple: 1,
            },
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            width: 100,
            sorter: {
                compare: (a, b) => a.price - b.price,
                multiple: 2,
            },
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            width: 120,
            render: (category: Category) => category.name,
        },
        {
            title: 'Image',
            dataIndex: 'images',
            key: 'image',
            width: 100,
            render: (images: string[]) => (
                <img src={images[0]} alt="Product Image"
                    style={{ width: 50, height: 50, objectFit: 'cover' }}
                />
            ),
        },
        {
            title: 'Action',
            key: 'action',
            width: 80,
            fixed: 'right',
            render: (_: unknown, record: Product) => (
                <Space size="middle">
                    <Button
                        type="primary"
                        icon={<ShoppingCartOutlined />}
                        onClick={() => handleAddToCart(record!)}
                    />
                </Space>
            ),
        },
    ];
    return (
        <>
            <Title level={3}>Product List</Title>
            <Space style={{
                marginBottom: 16,
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap'
            }}>
                <Search onSearch={handleSearch} placeholder="Search by product title" />
                <FilterRange onFilter={handleFilter} />
            </Space>

            {isLoading ? (
                <Space style={{ display: 'flex', alignItems: 'center' }}>
                    <Spin />
                    <Typography.Title level={4} style={{ marginLeft: 12 }}>Loading...</Typography.Title>
                </Space>
            ) : (
                <Table
                    columns={columns}
                    dataSource={filteredProducts}
                    scroll={{ x: 1000, y: 440 }}
                />
            )}

        </>
    );
};

export default ProductTable;
