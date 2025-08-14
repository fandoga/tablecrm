import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Cart } from "./Cart";
import { Button, Flex } from "antd";
import { DropboxOutlined } from "@ant-design/icons";
import { LabelMin, Select } from "../styles/common";

interface Props {
    token: string;
    onSelectProducts: (products: any[]) => void;

}

interface Product {
    id: number | string;
    nomenclature_id: number;
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
  border-top: 1px solid rgb(221, 221, 221);
  margin-bottom: 20px;
  padding-top: 20px;
`;


const SelectProducts: React.FC<Props> = ({ token, onSelectProducts }) => {
    const bottomRef = useRef<HTMLDivElement | null>(null);
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
            <Flex align="center" gap="8px">
                <DropboxOutlined style={{ paddingBottom: "16px" }} />
                <LabelMin>Товары</LabelMin>
            </Flex>
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
                        setTimeout(() => {
                            bottomRef.current?.scrollIntoView({ behavior: "smooth" });
                        }, 0);
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

            {selectedProducts.length > 0 && (
                <Cart
                    ref={bottomRef}
                    selectedProducts={selectedProducts}
                    onQuantityChange={changeQuantity}
                    onRemove={removeProduct}
                />
            )}
        </Wrapper>
    );
};

export default SelectProducts;
