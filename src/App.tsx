import React from "react";
import ListGroup from "./components/ListGroup";
import Message from "./Message";
import Alert from "./components/Alert";
import Homepage from "./components/Homepage/Homepage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainMenu from "./components/MainMenu/MainMenu";
import ItemPage from "./components/ItemPage/ItemPage";
import CartPage from "./components/CartPage/CartPage";
function App() {
  const items = ["New York", "San Francisco", "Tokyo", "London", "Paris"];
  const handleSelectItem = (item: string) => {
    alert(item);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Homepage />} />
        <Route path="/main-menu" element={<MainMenu />} />
        <Route path="/item-details" element={<ItemPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
  );
}

export default App;
