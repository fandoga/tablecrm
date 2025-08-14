import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Label, Select } from "../styles/common";
import { DollarOutlined } from "@ant-design/icons";
import { Flex } from "antd";

interface Props {
  token: string;
  onSelectPriceType: (id: string) => void;
}
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
      <Flex style={{ marginBottom: "10px" }} align="center" gap="8px">
        <DollarOutlined />
        <Label>Тип цены</Label>
      </Flex>

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
