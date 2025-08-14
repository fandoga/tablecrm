import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Cart } from "./Cart";
import { Button } from "antd";

interface Props {
    token: string;
    onSelectProducts: (products: any[]) => void;

}

interface Product {
    id: number | string;
    nomenclature_id: number; // добавили
    name: string;
    price: number;
    quantity: number;
}

interface SelectedProduct {
    nomenclature: number;
    quantity: number;
    price: number;
}

const Wrapper = styled.div`
  margin-bottom: 16px;
`;
const Label = styled.p`
margin-bottom: 6px;
`;

const Select = styled.select`
  margin-bottom: 12px;
  padding: 8px;
  width: 100%;
  border-radius: 6px;
`;

const SelectProducts: React.FC<Props> = ({ token, onSelectProducts }) => {
    const [products, setProducts] = useState<any[]>([]);
    const [selectedId, setSelectedId] = useState<string>("");
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`https://app.tablecrm.com/api/v1/prices/?token=${token}`)
            .then((res) => res.json())
            .then((data) => {
                setProducts(data.result);
            })
            .catch((err) => {
                console.error("Ошибка загрузки счетов", err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [token]);

    useEffect(() => {
        const transformed = selectedProducts.map((p) => ({
            nomenclature: p.nomenclature_id,
            quantity: p.quantity,
            price: p.price,
        }));
        onSelectProducts(transformed);
    }, [selectedProducts, onSelectProducts]);

    const addProduct = (product: Omit<Product, "quantity">) => {
        setSelectedProducts((prev) => {
            const existing = prev.find((p) => p.id === product.id);
            if (existing) {
                return prev.map((p) =>
                    p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const changeQuantity = (id: number | string, quantity: number) => {
        setSelectedProducts((prev) =>
            prev.map((p) => (p.id === id ? { ...p, quantity } : p))
        );
    };

    const removeProduct = (id: number | string) => {
        setSelectedProducts((prev) => prev.filter((p) => p.id !== id));
    };

    return (
        <Wrapper>
            <Label>Товары</Label>
            <Select onChange={(e) => setSelectedId(e.target.value)} value={selectedId} disabled={loading}>
                <option disabled selected value="">{loading ? "Загрузка..." : "Выберите товар"}</option>
                {products.map((prod) => (
                    <option key={prod.id} value={prod.id}>
                        {prod.nomenclature_name}
                    </option>
                ))}
            </Select>
            <Button type="primary"
                onClick={() => {
                    const selectedProduct = products.find(
                        (prod) => prod.id === Number(selectedId)
                    );
                    if (selectedProduct) {
                        addProduct({
                            id: selectedProduct.id,
                            nomenclature_id: selectedProduct.nomenclature_id,
                            name: selectedProduct.nomenclature_name,
                            price: selectedProduct.price,
                        });
                    }
                }}
            >
                Добавить
            </Button>


            <Cart
                selectedProducts={selectedProducts}
                onQuantityChange={changeQuantity}
                onRemove={removeProduct}
            />
        </Wrapper>
    );
};

export default SelectProducts;
