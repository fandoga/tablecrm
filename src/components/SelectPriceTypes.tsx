import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface Props {
  token: string;
  onSelectPriceType: (id: string) => void;
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

const SelectPriceTypes: React.FC<Props> = ({ token, onSelectPriceType }) => {
  const [prices, setPrices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`https://app.tablecrm.com/api/v1/price_types/?token=${token}`)
      .then((res) => res.json())
      .then((data) => {
        setPrices(data.result);
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
      <Label>Тип цены</Label>
      <Select onChange={(e) => onSelectPriceType(e.target.value)} disabled={loading}>
        <option disabled selected value="">{loading ? "Загрузка..." : "Выберите тип цен"}</option>
        {prices.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </Select>
    </div>
  );
};

export default SelectPriceTypes;
