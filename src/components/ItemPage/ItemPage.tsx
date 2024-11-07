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
      {/* <h1>Item Page</h1> */}
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
  const options = ["Option 1", "Option 2", "Option 3"];
  const rating = 3;
  const [quantity, setQuantity] = useState(1);
  const [modal, setModal] = useState(false);
  const [failedmodal, setFailedModal] = useState(false);

  const navigate = useNavigate();

  var user = getUserData();

  const addToCart = async (itemId) => {
    const data = [
      {
        id: { itemId: itemId, userId: user.id },
        quantity: quantity,
      },
    ];

    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/carts/upsert-carts",
        data
      );

      console.log("Added to cart");
      setModal(true);
    } catch (error) {
      setFailedModal(true);
      console.error("Error:", error);
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="border p-4 bg-light shadow" style={{ width: "90%" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-6 border bg-blue">
              <div className="bg-light">
                <img
                  src={item.imageUrl}
                  className="img-fluid"
                  alt="Product Image"
                />
              </div>
            </div>
            <div className="col-md-6 border bg-blue">
              <h1>{item.name}</h1>
              <p>This is an item that will be sold.</p>
              {Array.from({ length: item.rating }, (_, i) => (
                <FaStar key={i} color="orange" size={20} />
              ))}
              {Array.from({ length: 5 - item.rating }, (_, i) => (
                <CiStar key={i} color="orange" size={20} />
              ))}
              <p>{item.ratingCounts} ratings</p>
              <hr />
              <h2 style={{ color: "blue" }}>
                {" "}
                RM{" "}
                {new Intl.NumberFormat("en-MY", {
                  style: "decimal",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(item.unitPrice)}
              </h2>
              <hr />
              <div className="d-flex" style={{ margin: "20px 10px" }}>
                <h4>Quantity </h4>
                <div className="col-md-5 mx-5">
                  <QuantityBox quantity={quantity} setQuantity={setQuantity} />
                </div>
              </div>
              <div className="row" style={{ margin: "10px 0px" }}>
                <div className="col-md-5">
                  <button
                    className="btn btn-warning"
                    style={{
                      width: "100%",
                      color: "white",
                      backgroundColor: "orange",
                    }}
                  >
                    Buy Now
                  </button>
                </div>
                <div className="col-md-5">
                  <button
                    className="btn btn-primary"
                    style={{ width: "100%" }}
                    onClick={() => {
                      console.log(item);
                      console.log(user);
                      addToCart(item.id);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
            <div
              className="col-md-12 border bg-blue"
              style={{ margin: "10px 0px" }}
            >
              <h2>Item Descriptions</h2>
              <p>
                This is the place where the details of the items are being put
                in
              </p>
            </div>
            <div
              className="col-md-12 border bg-blue"
              style={{ margin: "10px 0px" }}
            >
              <h2>User Reviews</h2>
              <div className="row">
                <div className="col-md-3 border">
                  <h1>3.0/5.0</h1>
                  {Array.from({ length: rating }, (_, i) => (
                    <FaStar key={i} color="orange" size={30} />
                  ))}
                  {Array.from({ length: 5 - rating }, (_, i) => (
                    <CiStar key={i} color="orange" size={30} />
                  ))}
                  <h6>4742 reviews</h6>
                </div>
                <div className="col-md-6 border">
                  <div className="row">
                    <div className="col-md-2">
                      {Array.from({ length: 5 }, (_, i) => (
                        <FaStar key={i} color="orange" size={15} />
                      ))}
                      <br />
                      {Array.from({ length: 4 }, (_, i) => (
                        <FaStar key={i} color="orange" size={15} />
                      ))}
                      <br />
                      {Array.from({ length: 3 }, (_, i) => (
                        <FaStar key={i} color="orange" size={15} />
                      ))}
                      <br />
                      {Array.from({ length: 2 }, (_, i) => (
                        <FaStar key={i} color="orange" size={15} />
                      ))}
                      <br />
                      {Array.from({ length: 1 }, (_, i) => (
                        <FaStar key={i} color="orange" size={15} />
                      ))}
                    </div>
                    <div className="col-md-3">
                      1000
                      <br />
                      500
                      <br />
                      0
                      <br />
                      1
                      <br />
                      2
                      <br />
                    </div>
                  </div>
                </div>
              </div>

              <p>
                This is the place where the details of the items are being put
                in
              </p>
            </div>
          </div>
        </div>
      </div>
      {modal && (
        <div className="overlay">
          <div className="">
            <div className="modal-content">
              <div className="w-100 bg-light">
                <br />
                <div className="d-flex justify-content-center">
                  <SiTicktick size={60} color="green" />
                </div>
                <br />
                <div className="d-flex justify-content-center">
                  <p>Successfully add to cart.</p>
                </div>
              </div>
              <button
                className="btn btn-success"
                onClick={() => setModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {failedmodal && (
        <div className="overlay">
          <div className="">
            <div className="modal-content">
              <div className="w-100 bg-light">
                <br />
                <div className="d-flex justify-content-center">
                  <GiCancel size={60} color="red" />
                </div>
                <br />
                <div className="d-flex justify-content-center">
                  <p>Failed to add to cart. Please retry</p>
                </div>
              </div>
              <button
                className="btn btn-danger"
                onClick={() => setFailedModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function QuantityBox({ quantity, setQuantity }) {
  // const [quantity, setQuantity] = useState(1); // State to store the quantity value

  // Handle increment
  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  // Handle decrement
  const handleDecrement = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  // Handle direct input change
  const handleChange = (event) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <button
        onClick={handleDecrement}
        style={{ padding: "0px 10px", margin: "0px", border: "none" }}
      >
        -
      </button>
      <input
        type="number"
        readOnly
        value={quantity}
        onChange={handleChange}
        style={{ textAlign: "center", width: "50px", margin: "0px" }}
        min="1"
      />
      <button
        onClick={handleIncrement}
        style={{ padding: "0px 10px", margin: "0px", border: "none" }}
      >
        +
      </button>
    </div>
  );
}
