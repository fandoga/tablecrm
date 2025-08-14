import React, { useState } from "react";
import styled from "styled-components";
import { Button, Input, Divider } from "antd";

interface LoginProps {
  onLogin: (token: string) => void;
}

const Container = styled.div`
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
`;


const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [token, setToken] = useState("");
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
      <h2>Вход</h2>
      <Divider size="small"></Divider>
      <Input
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="Введите токен"
      />
      <Divider size="small"></Divider>
      <Button loading={loading} type="primary" onClick={handleSubmit}>
        {loading ? "Проверка..." : "Войти"}
      </Button>
    </Container>
  );
};

export default Login;