import axios from "axios";
import React, { useState, useEffect } from "react";
import ProductCard from "../ProductCard/ProductCard";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { useLocation } from "react-router-dom";
import { Spinner } from "react-bootstrap"; // Import Bootstrap spinner for loading

function MainMenu({ items }) {
  const [products, setProducts] = useState(items || []);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const itemsData = location.state;

  useEffect(() => {
    if (itemsData != null) {
      setProducts(itemsData);
    }
    setIsLoading(false);
  }, [itemsData]);

  return (
    <>
      <NavBar />
      <div
        style={{
          background: "linear-gradient(to right, #f8f9fa, #e9ecef)",
          padding: "40px 0",
          textAlign: "center",
          color: "#333",
        }}
      >
        <h2
          style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#2d2d2d" }}
        >
          Our Products
        </h2>
        <p style={{ fontSize: "1rem", color: "#666" }}>
          Discover our range of top-quality products.
        </p>
      </div>

      <div className="container mt-5">
        {isLoading ? (
          <div className="text-center mt-4">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center mt-4">
            <h5>No results found.</h5>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
              padding: "20px",
            }}
          >
            {products.map((item) => (
              <div
                key={item.id}
                style={{
                  transition: "transform 0.3s, box-shadow 0.3s",
                  borderRadius: "10px",
                  overflow: "hidden",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <ProductCard item={item} />
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default MainMenu;
