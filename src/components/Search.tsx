import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Space } from 'antd';
import { useLocation } from 'react-router-dom';
import { CloseCircleOutlined, SearchOutlined } from '@ant-design/icons';

interface SearchProps {
    onSearch: (value: string | undefined) => void;
    placeholder?: string;
}

const Search: React.FC<SearchProps> = ({ onSearch, placeholder }) => {
    const location = useLocation();
    const [searchValue, setSearchValue] = useState<string | undefined>(undefined);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const title = params.get('title') || undefined;
        setSearchValue(title);
    }, [location.search]);

    const handleSearch = () => {
        onSearch(searchValue);
    };

    const handleClear = () => {
        setSearchValue(undefined);
        onSearch(undefined);
    };

    return (
        <Form
            layout='inline'
            onFinish={handleSearch}
        >
            <Form.Item >
                <Input
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder={placeholder}
                />
            </Form.Item>
            <Space>
                <Button type="primary" htmlType="submit" icon={<SearchOutlined />} >
                    Search
                </Button>
                <Button icon={<CloseCircleOutlined />} onClick={handleClear}>
                    Clear
                </Button>
            </Space>
        </Form>
    );
};

export default Search;
