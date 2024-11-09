import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import Footer from "../Footer/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { SiTicktick } from "react-icons/si";
import { GiCancel } from "react-icons/gi";

function ItemPage() {
  const location = useLocation();
  const { item } = location.state || {};

  return (
    <>
      <NavBar />
      <ItemMainContainer item={item} />
      <Footer />
    </>
  );
}

export default ItemPage;

const getUserData = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

function ItemMainContainer({ item }) {
  const [quantity, setQuantity] = useState(1);
  const [modal, setModal] = useState(false);
  const [failedModal, setFailedModal] = useState(false);

  const navigate = useNavigate();
  const user = getUserData();

  const addToCart = async (itemId) => {
    if (!user) return navigate("/login");

    const data = [{ id: { itemId, userId: user.id }, quantity }];

    try {
      await axios.post("http://localhost:8080/api/v1/carts/upsert-carts", data);
      setModal(true);
    } catch (error) {
      setFailedModal(true);
      console.error("Error:", error);
    }
  };

  return (
    <div className="d-flex justify-content-center my-5">
      <div
        className="item-container p-4 bg-white shadow-lg rounded-3"
        style={{ width: "85%", maxWidth: "1000px" }}
      >
        <div className="row">
          {/* Product Image */}
          <div className="col-md-6 d-flex justify-content-center align-items-center p-3">
            <img
              src={item.imageUrl}
              alt="Product"
              className="img-fluid rounded-3"
              style={{ maxHeight: "400px" }}
            />
          </div>

          {/* Product Details */}
          <div className="col-md-6 p-3">
            <h2 className="fw-bold mb-3">{item.name}</h2>
            <p className="text-muted">
              A high-quality product designed for maximum satisfaction.
            </p>
            <div className="d-flex align-items-center mb-3">
              {Array.from({ length: item.rating }, (_, i) => (
                <FaStar key={i} color="orange" size={20} />
              ))}
              {Array.from({ length: 5 - item.rating }, (_, i) => (
                <CiStar key={i} color="orange" size={20} />
              ))}
              <p className="ms-2 text-secondary">
                ({item.ratingCounts} ratings)
              </p>
            </div>
            <h2 className="text-primary fw-bold mb-4">
              RM{" "}
              {new Intl.NumberFormat("en-MY", {
                style: "decimal",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(item.unitPrice)}
            </h2>

            {/* Quantity Selector */}
            <div className="d-flex align-items-center mb-4">
              <h5 className="me-3">Quantity</h5>
              <QuantityBox quantity={quantity} setQuantity={setQuantity} />
            </div>

            {/* Action Buttons */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <button
                  className="btn btn-warning w-100 text-white fw-bold"
                  style={{ background: "orange" }}
                >
                  Buy Now
                </button>
              </div>
              <div className="col-md-6">
                <button
                  className="btn btn-primary w-100 fw-bold"
                  onClick={() => addToCart(item.id)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          {/* Item Description */}
          <div className="col-12 p-3 mt-4 border-top">
            <h3>Item Description</h3>
            <p className="text-secondary">
              This product is crafted with precision, using high-quality
              materials to ensure durability and satisfaction. Ideal for those
              looking to add a reliable, versatile item to their collection.
              With top-notch features and easy maintenance, this product aims to
              meet your expectations.
            </p>
          </div>

          {/* User Reviews */}
          <div className="col-12 p-3 mt-4 border-top">
            <h3>User Reviews</h3>
            <div className="row">
              <div className="col-md-3 text-center">
                <h1 className="display-5">3.0/5.0</h1>
                {Array.from({ length: 3 }, (_, i) => (
                  <FaStar key={i} color="orange" size={25} />
                ))}
                {Array.from({ length: 2 }, (_, i) => (
                  <CiStar key={i} color="orange" size={25} />
                ))}
                <p className="text-muted">4742 reviews</p>
              </div>
              <div className="col-md-9">
                {/* Ratings Breakdown */}
                <div className="row">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div
                      className="col-md-12 d-flex align-items-center mb-2"
                      key={star}
                    >
                      <span className="me-2">
                        {Array.from({ length: star }, (_, i) => (
                          <FaStar key={i} color="orange" size={15} />
                        ))}
                      </span>
                      <div
                        className="flex-grow-1 bg-light"
                        style={{
                          height: "8px",
                          borderRadius: "4px",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          className="bg-warning"
                          style={{
                            width: `20%`,
                            height: "100%",
                          }}
                        ></div>
                      </div>
                      <span className="ms-3 text-muted">1 reviews</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Success and Failure Modals */}

        {modal && (
          <Popup
            type="success"
            message="Successfully add to cart."
            onClose={() => setModal(false)}
          />
        )}
        {failedModal && (
          <Popup
            type="danger"
            message="Failed to add to cart. Please retry."
            onClose={() => setFailedModal(false)}
          />
        )}
      </div>
    </div>
  );
}

function QuantityBox({ quantity, setQuantity }) {
  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        borderRadius: "5px",
        border: "1px solid #ddd",
      }}
    >
      <button
        onClick={handleDecrement}
        className="btn btn-sm text-secondary fw-bold"
        style={{ padding: "5px 10px" }}
      >
        -
      </button>
      <input
        type="number"
        readOnly
        value={quantity}
        style={{ textAlign: "center", width: "50px", border: "none" }}
      />
      <button
        onClick={handleIncrement}
        className="btn btn-sm text-secondary fw-bold"
        style={{ padding: "5px 10px" }}
      >
        +
      </button>
    </div>
  );
}

const Popup = ({ type, message, onClose }) => (
  <div className="overlay">
    <div className="modal-content w-100 bg-light">
      <div className="d-flex justify-content-center my-3">
        {type === "success" ? (
          <SiTicktick size={60} color="green" />
        ) : (
          <GiCancel size={60} color="red" />
        )}
      </div>
      <div className="d-flex justify-content-center">
        <p>{message}</p>
      </div>
      <button
        className={`btn btn-${type}`}
        onClick={onClose}
        style={{ width: "100%" }}
      >
        Close
      </button>
    </div>
  </div>
);
