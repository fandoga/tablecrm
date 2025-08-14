import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Dropdown, Button } from "antd";
import { Label, Select } from "../styles/common";

interface Props {
    onSelectClient: (id: string) => void;
    clients: any[]
}



const SelectClient: React.FC<Props> = ({ clients, onSelectClient }) => {



    return (
        <div>
            <Label style={{ marginBottom: "10px", color: "green", fontWeight: 400 }}>Найденные клиенты</Label>
            <Select style={{ borderColor: "green" }} onChange={(e) => onSelectClient(e.target.value)}

            >
                <option disabled selected value="">Выберите клиента</option>
                {clients.map((c) => (
                    <option key={c.id} value={c.id}>
                        {c.name}
                    </option>
                ))}
            </Select>
        </div>
    );
};

export default SelectClient;
