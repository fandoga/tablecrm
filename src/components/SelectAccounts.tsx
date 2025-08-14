import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Dropdown, Button, Flex } from "antd";
import {
    CreditCardOutlined
} from '@ant-design/icons';
import { Label, Select } from "../styles/common";

interface Props {
    token: string;
    onSelectAccount: (id: string) => void;
}

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
            <Flex style={{ marginBottom: "10px" }} align="center" gap="8px">
                <CreditCardOutlined />
                <Label>Счёт*</Label>
            </Flex>
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
