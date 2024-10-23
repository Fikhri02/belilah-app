import React, { useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

function ProductCard({ item }) {
  const [liked, setLiked] = useState(false);

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  return (
    // <div className="product-card">
    //   <div className="product-header">
    //     <img
    //       src="https://assets.puma.com/images/195212/01/puma-palermo-leather-sneakers-01.jpg"
    //       alt="Puma Palermo Leather Sneakers"
    //     />
    //     <div className="product-brand">
    //       <img src="https://assets.puma.com/images/puma-logo.png" alt="Puma" />
    //       <span>OFFICIAL STORE</span>
    //     </div>
    //   </div>
    //   <div className="product-body">
    //     <div className="product-offers">
    //       <button className="offer-button">FREE SHIPPING</button>
    //       <button className="offer-button">10% CASHBACK</button>
    //       <button className="offer-button">OCT 15 VOUCHERS</button>
    //     </div>
    //     <div className="product-title">
    //       <span>Mall</span>
    //       <h2>[NEW] PUMA Unisex Palermo Leather Sneakers...</h2>
    //     </div>
    //     <div className="product-actions">
    //       <button className="action-button" type="button">
    //         COD
    //       </button>
    //       <button className="action-button" type="button">
    //         Local Seller
    //       </button>
    //       <button className="action-button" type="button">
    //         <i className="fa fa-shopping-cart"></i>
    //       </button>
    //     </div>
    //     <div className="product-price">
    //       <h3>RM429.00</h3>
    //     </div>
    //   </div>
    <div className="container mt-5">
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">
            <a
              href="../item-details"
              style={{ color: "black", textDecoration: "none" }}
            >
              {item.name}
            </a>
          </h5>
          <p className="card-text">Image should be placed here.</p>
          <div className="d-flex align-items-center">
            <h4 style={{ marginRight: "10px" }}>
              RM{" "}
              {new Intl.NumberFormat("en-MY", {
                style: "decimal",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(item.unitPrice)}
            </h4>
            <a
              href="#"
              //   className="btn btn-primary"
              style={{ marginRight: "10px" }}
            >
              {/* Go somewhere */}
              <FaCartPlus size={30} />
            </a>
            <button
              onClick={handleLikeClick}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                outline: "none",
                padding: 0,
                display: "flex",
                alignItems: "center",
              }}
            >
              {liked ? (
                <FaHeart color="red" size={30} /> // Filled heart, red color
              ) : (
                <FaRegHeart color="black" size={30} /> // Empty heart, black color
              )}
            </button>
          </div>
          <div className="d-flex align-items-center">
            {Array.from({ length: item.rating }, (_, i) => (
              <FaStar key={i} color="orange" size={25} />
            ))}
            {Array.from({ length: 5 - item.rating }, (_, i) => (
              <CiStar key={i} color="orange" size={30} />
            ))}
            <p style={{ marginLeft: "10px", marginTop: "20px", color: "gray" }}>
              ({convertToK(item.ratingCounts)})
            </p>
          </div>
        </div>
      </div>
    </div>
    // </div>
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
