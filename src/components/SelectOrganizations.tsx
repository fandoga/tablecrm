import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface Props {
    token: string;
    onSelectOrganization: (id: string) => void;
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

const SelectOrganizations: React.FC<Props> = ({ token, onSelectOrganization }) => {
    const [orgs, setOrgs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        fetch(`https://app.tablecrm.com/api/v1/organizations/?token=${token}`)
            .then((res) => res.json())
            .then((data) => {
                setOrgs(data.result || [])
            })
            .then(() => { setLoading(false) })
            .catch((err) => console.error("Ошибка загрузки", err));
    }, [token]);

    return (
        <div>
            <Label>Организация</Label>
            <Select onChange={(e) => onSelectOrganization(e.target.value)} disabled={loading}>
                <option disabled selected value="">{loading ? "Загрузка..." : "Выберите организацию"}</option>
                {orgs.map((org) => (
                    <option key={org.id} value={org.id}>
                        {org.short_name}
                    </option>
                ))}
            </Select>
        </div>
    );
};

export default SelectOrganizations;
