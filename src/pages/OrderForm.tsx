// src/components/OrderForm.tsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, } from "antd";

import ClientSearch from "../components/ClientSearch";
import SelectAccounts from "../components/SelectAccounts";
import SelectOrganizations from "../components/SelectOrganizations";
import SelectWarehouses from "../components/SelectWarehouses";
import SelectPriceTypes from "../components/SelectPriceTypes";
import SelectProducts from "../components/SelectProducts";
import ActionButtons from "../components/ActionButtons";
import { Color } from "antd/es/color-picker";

interface OrderFormProps {
  token: string;
}

const FormContainer = styled.div`
  position: relative;
  margin: 80px auto;
  justify-content: center;
  padding: 16px;
  max-width: 440px;
`;

const Label = styled.h1`
  font-size: 24px;
  text-align: center;
  margin-bottom: 26px
`;

const Popup = styled.div`
  width: 448px;
  position: absolute;
  margin-left: -20px;
  top: 20%;
  border-radius: 12px;
  background-color:rgb(226, 226, 226);
  padding: 40px;

  & h3 {
  color:rgb(50, 50, 50);
  }
`;

const OrderForm: React.FC<OrderFormProps> = ({ token }) => {
  const [clientId, setClientId] = useState<string | null>(null);
  const [accountId, setAccountId] = useState<string | null>(null);
  const [organizationId, setOrganizationId] = useState<string | null>(null);
  const [warehouseId, setWarehouseId] = useState<string | null>(null);
  const [priceTypeId, setPriceTypeId] = useState<string | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [isFilled, setFilled] = useState(false)
  const [error, setError] = useState<any>("")
  const [isCreated, Created] = useState(false)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (accountId && organizationId && warehouseId && priceTypeId && products.length) {
      setFilled(true)
    } else {
      setFilled(false)
      return;
    }

  },
    [accountId, organizationId, warehouseId, priceTypeId, products])


  const createOrder = async (conduct: boolean) => {
    const payload = [
      {
        dated: Math.floor(Date.now() / 1000),
        operation: "Заказ",
        tax_included: true,
        tax_active: true,
        goods: products,
        settings: {
          date_next_created: null,
        },
        loyality_card_id: clientId ?? undefined,
        warehouse: warehouseId,
        contragent: clientId,
        paybox: accountId,
        organization: organizationId,
        status: conduct,
        paid_rubles: 0,
        paid_lt: 0,
      },
    ];

    try {
      setLoading(true)
      const res = await fetch(
        `https://app.tablecrm.com/api/v1/docs_sales/?token=${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (res.ok) {
        setLoading(false)
        setError("")
        Created(true)
        setClientId(null)
        setAccountId(null)
        setOrganizationId(null)
        setWarehouseId(null)
        setPriceTypeId(null)
        setProducts([])
      } else {
        setLoading(false)
        setError("Ошибка при создании заказа")
      }
    } catch (error) {
      setError(error)
      console.error(error);
    }
  };

  return (
    <>
      <FormContainer >
        <div style={{ filter: isCreated ? "blur(2px)" : "blur(0px)" }} className="blur">
          <Label>Оформление заказа</Label>

          <ClientSearch
            token={token}
            onSelectClient={setClientId}
          />
          <br></br>
          <SelectAccounts
            token={token}
            onSelectAccount={setAccountId}
          />
          <SelectOrganizations
            token={token}
            onSelectOrganization={setOrganizationId}
          />
          <SelectWarehouses
            token={token}
            onSelectWarehouse={setWarehouseId}
          />
          <SelectPriceTypes
            token={token}
            onSelectPriceType={setPriceTypeId}
          />
          <SelectProducts token={token} onSelectProducts={setProducts} />
          <ActionButtons
            loading={loading}
            disabled={!isFilled}
            onCreate={() => createOrder(false)}
            onCreateAndConduct={() => console.log(products)}
          />
          <br></br>
          {error !== "" && (
            <span style={{ color: "red", marginLeft: "25%" }}>{error}</span>
          )}
        </div>
        {isCreated && (
          <Popup>
            <h3 style={{ textAlign: "left" }}>🎉 Покупка успешна!</h3>
            <br></br>
            <p>Заказ успешно создан</p>
            <br></br>
            <Button onClick={() => { Created(false) }} style={{ width: "100%" }} type="primary">Закрыть</Button>
          </Popup>
        )}
      </FormContainer>
    </>
  );
};

export default OrderForm;
