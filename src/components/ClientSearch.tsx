import React, { useState } from "react";
import styled from "styled-components";
import { Button, Input, Flex } from "antd";
import { PhoneOutlined, SearchOutlined } from '@ant-design/icons';
import SelectClient from "./SelectClient";

interface ClientSearchProps {
    token: string;
    onSelectClient: (id: string) => void;
}

const Wrapper = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
`;

const Span = styled.span`
  color: red
`;



const ClientSearch: React.FC<ClientSearchProps> = ({ token, onSelectClient }) => {
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const [clients, setClients] = useState<[]>([])
    const [loading, setLoading] = useState(false)

    const searchClient = async () => {
        if (!phone.trim()) {
            setError("Укажите номер телефона")
            return
        } else { setError("") };
        try {
            setLoading(true)
            const res = await fetch(
                `https://app.tablecrm.com/api/v1/contragents/?phone=${encodeURIComponent(phone)}&token=${token}`
            );
            const data = await res.json();
            if (data.result?.count !== 0) {
                setError("")
                setClients(data.result)
                setLoading(false)
            } else {
                setError("Клиенты не найдены")
            }
        } catch (e) {
            console.error("Ошибка поиска клиента", e);
        }
    };

    return (
        <Flex style={{ borderBottom: "1px solid rgb(221, 221, 221)" }} vertical>
            <Wrapper>
                <Flex gap="8px">
                    <PhoneOutlined />
                    <Label>Поиск клиента</Label>
                </Flex>
                <Flex style={{ marginTop: "10px" }} gap="small">
                    <Input
                        size="large"
                        type="text"
                        placeholder="+7-___-___-__-__"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <Button size="large" type="primary" icon={<SearchOutlined />} loading={loading} onClick={searchClient}></Button>
                </Flex>
            </Wrapper>
            {error !== "" && (
                <Span>{error}</Span>
            )}
            {clients.length > 0 && (
                <SelectClient clients={clients} onSelectClient={onSelectClient}
                />
            )}
        </Flex>
    );
};

export default ClientSearch;