import React, { useState } from "react";
import Login from "./components/Login";
import OrderForm from "./pages/OrderForm";
import { GlobalStyles } from "./styles/common";

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);

  if (!token) {
    return (
      <>
        <GlobalStyles />
        <Login onLogin={(t) => setToken(t)} />
      </>
    )
  }
  return (
    <>
      <GlobalStyles />
      <OrderForm token={token} />
    </>
  )
};

export default App;