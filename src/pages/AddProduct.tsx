/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { Form, Input, InputNumber, Button, Select, message, Typography } from 'antd';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addProduct } from '../api/productApi';
import { Category } from '../types/Category';
import { getCategories } from '../api/categoryApi';

const { TextArea } = Input;

const AddProduct: React.FC = () => {
    const queryClient = useQueryClient();
    const [form] = Form.useForm();

    const { data: categories } = useQuery<Category[]>({
        queryKey: ['categories'],
        queryFn: () => getCategories()
    });

    const mutation = useMutation({
        mutationFn: addProduct,
        onSuccess: () => {
            message.success('Product added successfully');
            queryClient.invalidateQueries({ queryKey: ['products-table'] });
            form.resetFields();
        },

        onError: (error: any) => {
            message.error(`Error: ${error.message}`);
        }
    });

    const handleFinish = (values: any) => {
        const { title, price, description, category, images } = values;
        const selectedCategory = categories?.find(cat => cat.name === category);

        const newProduct = {
            title,
            price,
            description,
            categoryId: selectedCategory!.id,
            images: images.split(',').map((url: string) => url.trim())
        };

        mutation.mutate(newProduct);
    };

    return (
        <>
            <Typography.Title level={3}>Add a product</Typography.Title>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
                initialValues={{ category: categories && categories[0].name }}
            >
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: 'Please input the title!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Price"
                    name="price"
                    rules={[{ required: true, message: 'Please input the price!' }]}
                >
                    <InputNumber min={0} style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Please input the description!' }]}
                >
                    <TextArea rows={4} />
                </Form.Item>

                <Form.Item
                    label="Category"
                    name="category"
                    rules={[{ required: true, message: 'Please select a category!' }]}
                >
                    <Select>
                        {categories?.map(category => (
                            <Select.Option key={category.id} value={category.name}>
                                {category.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Images"
                    name="images"
                    rules={[
                        { required: true, message: 'Please input the image URLs!' },
                        {
                            validator: (_, value) => value && value.split(',').length >= 1
                                ? Promise.resolve()
                                : Promise.reject('Please input at least one image URL!')
                        }
                    ]}
                >
                    <Input placeholder="Enter image URLs separated by commas" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={mutation.isPending}>
                        Add Product
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default AddProduct;
