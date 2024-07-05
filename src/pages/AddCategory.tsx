/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Form, Input, Button, message, Typography } from 'antd';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Category } from '../types/Category';
import { addCategory } from '../api/categoryApi';

const AddCategory: React.FC = () => {
    const queryClient = useQueryClient();
    const [form] = Form.useForm();

    const mutation = useMutation({
        mutationFn: addCategory,
        onSuccess: () => {
            message.success('Category added successfully');
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            form.resetFields();
        },
        onError: (error: any) => {
            message.error(`Error: ${error.message}`);
        }
    });

    const handleFinish = (values: Omit<Category, 'id'>) => {
        mutation.mutate(values);
    };

    return (
        <>
            <Typography.Title level={3}>Add a category</Typography.Title><Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input the category name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Image URL"
                    name="image"
                    rules={[{ required: true, message: 'Please input the image URL!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={mutation.isPending}>
                        Add Category
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default AddCategory;
