import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Dropdown, Button } from "antd";

interface Props {
    token: string;
    onSelectAccount: (id: string) => void;
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


const SelectAccounts: React.FC<Props> = ({ token, onSelectAccount }) => {
    const [accounts, setAccounts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`https://app.tablecrm.com/api/v1/contragents/?token=${token}`)
            .then((res) => res.json())
            .then((data) => {
                setAccounts(data.result);
            })
            .catch((err) => {
                console.error("Ошибка загрузки счетов", err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [token]);

    return (
        <div>
            <Label>Счёт</Label>
            <Select onChange={(e) => onSelectAccount(e.target.value)} disabled={loading}
            >
                <option disabled selected value="">{loading ? "Загрузка..." : "Выберите счёт"}</option>
                {accounts.map((acc) => (
                    <option key={acc.id} value={acc.id}>
                        {acc.name}
                    </option>
                ))}
            </Select>
        </div>
    );
};

export default SelectAccounts;
