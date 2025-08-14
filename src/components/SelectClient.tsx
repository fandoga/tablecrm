import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Dropdown, Button } from "antd";

interface Props {
    onSelectClient: (id: string) => void;
    clients: any[]
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


const SelectClient: React.FC<Props> = ({ clients, onSelectClient }) => {



    return (
        <div>
            <Label>Клиенты</Label>
            <Select onChange={(e) => onSelectClient(e.target.value)}

            >
                <option disabled selected value="">"Выберите клиента"</option>
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
