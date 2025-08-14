import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface Props {
    token: string;
    onSelectWarehouse: (id: string) => void;
}
const Label = styled.p`
margin-bottom: 6px;
`;

const Select = styled.select`
  margin-bottom: 12px;
  padding: 8px;
  width: 100%;
  border-radius: 6px;
`;

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
            <Label>Склад</Label>
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
