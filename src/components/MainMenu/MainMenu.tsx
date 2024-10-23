import axios from "axios";
import React, { useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import Item from "../ProductCard/Item";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";

function MainMenu() {
  const items = [
    new Item(1, "Puma", 12000, 3, 10),
    new Item(2, "Adidas", 10000, 2, 321),
    new Item(3, "Reebok", 15000, 1, 100000000),
    new Item(4, "Nike", 13000, 4, 32991923),
    new Item(5, "New Balance", 11000, 5, 4),
    new Item(6, "Vans", 8000),
    new Item(7, "Vansili", 2000),
    new Item(8, "Armour", 130),
    new Item(9, "Shields", 672),
    new Item(10, "Avenger", 213.12),
    new Item(11, "Krook", 1123.2),
  ];

  return (
    <>
      <NavBar />
      {/* <h1>Main Menu</h1> */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)", // Creates 5 equal columns
          gap: "10px", // Adds space between the grid items
          overflowX: "auto", // Enable horizontal scroll if necessary
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
