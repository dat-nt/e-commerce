import React, { useEffect, useState } from 'react';
import { Form, InputNumber, Button, Space } from 'antd';
import { useLocation } from 'react-router-dom';
import { FilterOutlined, RedoOutlined } from '@ant-design/icons';

interface FilterRangeProps {
    onFilter: (min: number | undefined, max: number | undefined) => void;
}

const FilterRange: React.FC<FilterRangeProps> = ({ onFilter }) => {
    const location = useLocation();
    const [minValue, setMinValue] = useState<number | undefined>(undefined);
    const [maxValue, setMaxValue] = useState<number | undefined>(undefined);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const min = params.get('price_min');
        const max = params.get('price_max');
        setMinValue(min ? parseInt(min, 10) : undefined);
        setMaxValue(max ? parseInt(max, 10) : undefined);
    }, [location.search]);

    const handleFilter = () => {
        onFilter(minValue, maxValue);
    };

    const handleReset = () => {
        setMinValue(undefined);
        setMaxValue(undefined);
        onFilter(undefined, undefined);
    };

    return (
        <Form
            layout="inline"
            onFinish={handleFilter}
        >
            <Form.Item label="Min Price">
                <InputNumber value={minValue} onChange={(value) => setMinValue(value as number | undefined)} />
            </Form.Item>
            <Form.Item label="Max Price">
                <InputNumber value={maxValue} onChange={(value) => setMaxValue(value as number | undefined)} />
            </Form.Item>
            <Space>
                <Button type="primary" htmlType="submit" icon={<FilterOutlined />}>
                    Filter
                </Button>
                <Button onClick={handleReset} icon={<RedoOutlined />}>
                    Reset
                </Button>
            </Space>
        </Form>
    );
};

export default FilterRange;
