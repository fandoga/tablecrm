import { Button, Flex } from "antd";
import React, { forwardRef, useState } from "react";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { LabelMin } from "../styles/common";

interface Product {
  id: number | string;
  name: string;
  price: number;
  quantity: number;
}

interface CartProps {
  selectedProducts: Product[];
  onQuantityChange: (id: number | string, quantity: number) => void;
  onRemove: (id: number | string) => void;
}

export const Cart = forwardRef<HTMLDivElement, CartProps>(
  ({ selectedProducts, onQuantityChange, onRemove }, ref) => {
    const total = selectedProducts.reduce(
      (sum, p) => sum + p.price * p.quantity,
      0
    );

    return (
      <CartWrapper ref={ref}>
        <CartLabel>Корзина</CartLabel>
        {selectedProducts.length === 0 ? (
          <EmptyCart>Корзина пуста</EmptyCart>
        ) : (
          selectedProducts.map((product) => (
            <CartItem key={product.id}>
              <ProductInfo>
                <span style={{ fontWeight: "500" }} >{product.name}</span> <br></br>
                <span style={{ fontSize: "14px", fontWeight: "500", color: "rgb(71, 71, 71)" }}>{product.price} ₽ / шт.</span>
              </ProductInfo>
              <Flex gap="10px" align="center">
                <Button
                  onClick={() => onQuantityChange(product.id, product.quantity + 1)}
                  type="primary"
                  size="small"
                  shape="circle"
                  icon={<PlusOutlined />}
                />

                <LabelMin style={{ paddingBottom: "0" }}>{product.quantity}</LabelMin>

                <Button
                  onClick={() => {
                    const newQuantity = product.quantity - 1;
                    if (newQuantity < 1) {
                      onRemove(product.id);
                    } else {
                      onQuantityChange(product.id, newQuantity);
                    }
                  }}
                  variant="solid"
                  color="danger"
                  size="small"
                  type="primary"
                  shape="circle"
                  icon={<MinusOutlined />}
                />
              </Flex>
            </CartItem>
          ))
        )}
        <Flex
          style={{
            paddingTop: "20px",
            marginTop: "20px",
            borderTop: "1px solid rgb(10, 10, 10)",
          }}
          justify="space-between"
          align="center"
        >
          <span style={{ fontWeight: "bold", textAlign: "left" }}>Итого:</span>
          <span style={{ fontWeight: "bold", textAlign: "right" }}>{total} ₽</span>
        </Flex>
      </CartWrapper>
    );
  }
);



const CartWrapper = styled.div`
  border-top: 1px solid #ddd;
  margin-top: 1rem;
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0rem;
`;

const CartLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
`;

const EmptyCart = styled.div`
  text-align: center;
  color: #6b7280; /* text-gray-500 */
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0.4rem;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 0.375rem;
  gap: 0.5rem;
`;

const ProductInfo = styled.span`
  flex: 1;
`;

const QuantityInput = styled.input`
  border: 1px solid #ddd;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  width: 4rem;
  text-align: center;
`;

const RemoveButton = styled.button`
  background-color:rgb(0, 0, 0); 
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 0.375rem;
  cursor: pointer;
  border: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: #dc2626;
  }
`;

