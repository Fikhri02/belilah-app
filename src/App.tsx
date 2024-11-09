import React, { useEffect, useState } from "react";
import ListGroup from "./components/ListGroup";
import Message from "./Message";
import Alert from "./components/Alert";
import Homepage from "./components/Homepage/Homepage";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import MainMenu from "./components/MainMenu/MainMenu";
import ItemPage from "./components/ItemPage/ItemPage";
import CartPage from "./components/CartPage/CartPage";
import RegisterPage from "./components/Register/RegisterPage";
import axios from "axios";
import Item from "./components/ProductCard/Item";
import CheckoutPage from "./components/CheckoutPage/CheckoutPage";
import OrderTrackingPage from "./components/OrderTrackingPage/OrderTrackingPage";
import UserProfile from "./components/ProfilePage/UserProfile";
function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch items before navigating to main menu
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/v1/items/get-all"
        );
        const fetchedItems = res.data.map(
          (obj) =>
            new Item(
              obj.id,
              obj.code,
              obj.description,
              obj.unitPrice,
              obj.averageReview,
              obj.reviewCount,
              obj.imageUrl
            )
        );
        setItems(fetchedItems);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false); // Mark loading as done
      }
    };

    fetchItems();
  }, []);

  return (
    <Router>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Routes>
          <Route path="/login" element={<Homepage />} />
          <Route path="/main-menu" element={<MainMenu items={items} />} />
          <Route path="/item-details" element={<ItemPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-tracking" element={<OrderTrackingPage />} />
          <Route path="/profile-page" element={<UserProfile />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
