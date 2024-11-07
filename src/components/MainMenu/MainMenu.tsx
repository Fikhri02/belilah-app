import axios from "axios";
import React, { useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import Item from "../ProductCard/Item";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";

function MainMenu({ items }) {
  // const [items, setItems] = useState<Item[]>([]);
  const [response, setResponse] = useState(String || null);

  // const fetchItems = async (event) => {
  // event.preventDefault();
  // };

  // fetchItems(event);

  return (
    <>
      {/* <h1>Main Menu</h1> */}
      <NavBar />
      <div className="text-center">
        <h2>Products</h2>
      </div>
      <div
        className="bg-light"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)", // Creates 5 equal columns
          gap: "0px", // Adds space between the grid items
          overflowX: "auto", // Enable horizontal scroll if necessary
          padding: "30px 0px",
        }}
      >
        {items.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
      <Footer />
    </>
  );
}

export default MainMenu;
