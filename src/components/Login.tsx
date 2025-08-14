import React, { useState } from "react";
import styled from "styled-components";
import { Button, Input, Divider } from "antd";

interface LoginProps {
  onLogin: (token: string) => void;
}

const Container = styled.div`
  box-shadow: 0px 16px 21px 3px rgba(34, 60, 80, 0.21);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 400px;
  margin: 100px auto;
  padding: 30px;
  border: 1px solid #ddd;
  border-radius: 8px;
`;


const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [token, setToken] = useState("af1874616430e04cfd4bce30035789907e899fc7c3a1a4bb27254828ff304a77");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!token.trim()) {
      alert("Введите токен");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `https://app.tablecrm.com/api/v1/docs_sales/?token=${token}`
      );
      const results = await res.json();

      if (res.ok) {
        onLogin(token);
        console.log(results);
      } else {
        alert("Неверный токен");
      }
    } catch (err) {
      console.error(err);
      alert("Ошибка соединения");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h2>TableCRM</h2>
      <p style={{ fontWeight: "300", paddingTop: "14px" }}>Мобильная касса</p>
      <Divider size="small"></Divider>
      <Input
        size="large"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="Введите токен"
      />
      <Divider size="small"></Divider>
      <Button size="large" style={{ width: "100%" }} loading={loading} type="primary" onClick={handleSubmit}>
        {loading ? "Проверка..." : "Войти"}
      </Button>
    </Container>
  );
};

export default Login;