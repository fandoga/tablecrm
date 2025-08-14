import React from "react";
import styled from "styled-components";

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

export const Cart: React.FC<CartProps> = ({
  selectedProducts,
  onQuantityChange,
  onRemove,
}) => {
  const total = selectedProducts.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0
  );

  return (
    <CartWrapper>
      <CartLabel>Корзина</CartLabel>
      {selectedProducts.length === 0 ? (
        <EmptyCart>Корзина пуста</EmptyCart>
      ) : (
        selectedProducts.map((product) => (
          <CartItem key={product.id}>
            <ProductInfo>
              {product.name} — {product.price} ₽ × {product.quantity} ={" "}
              {product.price * product.quantity} ₽
            </ProductInfo>
            <QuantityInput
              type="number"
              min={1}
              value={product.quantity}
              onChange={(e) =>
                onQuantityChange(product.id, Number(e.target.value))
              }
            />
            <RemoveButton onClick={() => onRemove(product.id)}>
              Удалить
            </RemoveButton>
          </CartItem>
        ))
      )}
      <Total>Итого: {total} ₽</Total>
    </CartWrapper>
  );
};


const CartWrapper = styled.div`
  border-top: 1px solid #ddd;
  margin-top: 1rem;
  padding-top: 1rem;
  max-width: 64rem;
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

const Total = styled.div`
  font-weight: bold;
  text-align: right;
`;
