import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Label, Select } from "../styles/common";
import { ShopOutlined } from "@ant-design/icons";
import { Flex } from "antd";

interface Props {
    token: string;
    onSelectWarehouse: (id: string) => void;
}

const SelectWarehouses: React.FC<Props> = ({ token, onSelectWarehouse }) => {
    const [warehouses, setWarehouses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`https://app.tablecrm.com/api/v1/warehouses/?token=${token}`)
            .then((res) => res.json())
            .then((data) => {
                setWarehouses(data.result);
            })
            .catch((err) => {
                console.error("Ошибка загрузки", err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [token]);

    return (
        <div>
            <Flex style={{ marginBottom: "10px" }} align="center" gap="8px">
                <ShopOutlined />
                <Label>Склад*</Label>
            </Flex>

            <Select onChange={(e) => onSelectWarehouse(e.target.value)} disabled={loading}>
                <option disabled selected value="">{loading ? "Загрузка..." : "Выберите склад"}</option>
                {warehouses.map((wh) => (
                    <option key={wh.id} value={wh.id}>
                        {wh.name}
                    </option>
                ))}
            </Select>
        </div>
    );
};

export default SelectWarehouses;
