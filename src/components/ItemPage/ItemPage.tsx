import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import Footer from "../Footer/Footer";

function ItemPage() {
  return (
    <>
      <NavBar />
      {/* <h1>Item Page</h1> */}
      <ItemMainContainer />
      <Footer />
    </>
  );
}

export default ItemPage;

function ItemMainContainer() {
  const options = ["Option 1", "Option 2", "Option 3"];
  const rating = 3;

  return (
    <div className="d-flex justify-content-center">
      <div className="border p-4 bg-light shadow" style={{ width: "90%" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-6 border bg-blue">
              <h2>This is supposed to be the image container.</h2>
              <h2>This is supposed to be the image container.</h2>
              <h2>This is supposed to be the image container.</h2>
              <h2>This is supposed to be the image container.</h2>
              <h2>This is supposed to be the image container.</h2>
            </div>
            <div className="col-md-6 border bg-blue">
              <h1>Title of the Item.</h1>
              <p>This is an item that will be sold.</p>
              {Array.from({ length: rating }, (_, i) => (
                <FaStar key={i} color="orange" size={20} />
              ))}
              {Array.from({ length: 5 - rating }, (_, i) => (
                <CiStar key={i} color="orange" size={20} />
              ))}
              <p>4742 ratings</p>
              <hr />
              <h2 style={{ color: "blue" }}>RM 200.00</h2>
              <hr />
              <h4>Quantity:</h4>
              <div style={{ margin: "20px 10px" }}>
                <QuantityBox />
              </div>
              <div className="row" style={{ margin: "10px 0px" }}>
                <div className="col-md-3">
                  <button className="btn btn-primary" style={{ width: "100%" }}>
                    Buy Now
                  </button>
                </div>
                <div className="col-md-3">
                  <button className="btn btn-primary" style={{ width: "100%" }}>
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
    </div>
  );
}

function QuantityBox() {
  const [quantity, setQuantity] = useState(1); // State to store the quantity value

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
