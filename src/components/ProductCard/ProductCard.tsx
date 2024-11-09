import React, { useState } from "react";
import { FaCartPlus, FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

function ProductCard({ item }) {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  const navToProduct = () => {
    navigate("/item-details", { state: { item } });
  };

  return (
    <div
      className="product-card container my-3"
      style={{
        width: "18rem",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <div className="card-body">
        <div
          style={{
            width: "250px",
            height: "250px",
            backgroundColor: "#f8f8f8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "10px",
          }}
        >
          <img src={item.imageUrl} className="img-fluid" alt="Product" />
        </div>
        <h4 className="card-title mt-3">
          <a
            onClick={navToProduct}
            style={{
              color: "#333",
              textDecoration: "none",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {item.name}
          </a>
        </h4>

        <div className="d-flex align-items-center justify-content-between mt-3">
          <h4
            style={{
              color: "#007bff",
              fontWeight: "600",
              fontSize: "1.3rem",
            }}
          >
            RM{" "}
            {new Intl.NumberFormat("en-MY", {
              style: "decimal",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(item.unitPrice)}
          </h4>
          <div className="d-flex">
            <button
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#007bff",
                marginRight: "8px",
              }}
            >
              <FaCartPlus size={28} />
            </button>
            <button
              onClick={handleLikeClick}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            >
              {liked ? (
                <FaHeart color="red" size={28} />
              ) : (
                <FaRegHeart color="black" size={28} />
              )}
            </button>
          </div>
        </div>

        <hr style={{ borderTop: "1px solid #ddd" }} />

        <div className="d-flex align-items-center">
          {Array.from({ length: item.rating }, (_, i) => (
            <FaStar key={i} color="orange" size={20} />
          ))}
          {Array.from({ length: 5 - item.rating }, (_, i) => (
            <CiStar key={i} color="orange" size={20} />
          ))}
          <p style={{ marginLeft: "10px", color: "gray" }}>
            ({convertToK(item.ratingCounts)})
          </p>
        </div>
      </div>
    </div>
  );
}

const convertToK = (number) => {
  number = parseInt(number);
  if (number < 1000) {
    return number.toString();
  } else if (number >= 1000 && number < 1000000) {
    return (number / 1000).toFixed(0) + "K";
  } else if (number >= 1000000 && number < 1000000000) {
    return (number / 1000000).toFixed(0) + "M";
  } else if (number >= 1000000000) {
    return (number / 1000000000).toFixed(0) + "B";
  }
};

export default ProductCard;
