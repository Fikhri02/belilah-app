import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../NavBar/NavBar";
import "./CartPage.css";
import { MdCancel } from "react-icons/md";
import Footer from "../Footer/Footer";

const CartPage = () => {
  return (
    <>
      <NavBar />
      <div className="vh-100">
        <Cart />
      </div>
      <Footer />
    </>
  );
};

export default CartPage;

const Cart = () => {
  // Sample cart items (you would normally fetch this from an API or state)
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Product 1", price: 100, quantity: 1 },
    { id: 2, name: "Product 2", price: 150, quantity: 2 },
    { id: 3, name: "Product 3", price: 200, quantity: 1 },
  ]);

  // Handle quantity change
  const handleQuantityChange = (id, newQuantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Handle item removal
  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Calculate total price
  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div>
      <div className="container mt-5">
        <h2 className="mb-4">Your Cart</h2>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="table-responsive">
            <table className="table-no-vertical-lines table table-bordered">
              <thead className="thead-light">
                <tr>
                  <th></th>
                  <th>Product</th>
                  <th className="text-center">Price</th>
                  <th className="text-center">Quantity</th>
                  <th className="text-center">Total</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <div
                      style={{ height: "200px" }}
                      className="d-flex align-items-center justify-content-center"
                    >
                      <input
                        type="checkbox"
                        style={{ cursor: "pointer", fontSize: "30px" }}
                      ></input>
                    </div>
                    <td>
                      <div className="row" style={{ height: "200px" }}>
                        <div
                          style={{ width: "200px", height: "200px" }}
                          className="d-flex align-items-center justify-content-center"
                        >
                          <img
                            src="https://img.freepik.com/free-vector/hand-drawn-running-shoes-cartoon-illustration_23-2150961844.jpg"
                            className="img-fluid"
                            alt="Product Image"
                          />
                        </div>
                        <div
                          style={{ height: "200px", width: "250px" }}
                          className="d-flex align-items-center justify-content-center"
                        >
                          {item.name}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div
                        style={{ height: "200px" }}
                        className="d-flex align-items-center justify-content-center"
                      >
                        ${item.price.toFixed(2)}
                      </div>
                    </td>
                    <td>
                      <div
                        style={{ height: "200px" }}
                        className="d-flex align-items-center justify-content-center"
                      >
                        <input
                          type="number"
                          value={item.quantity}
                          min="1"
                          className="form-control"
                          onChange={(e) =>
                            handleQuantityChange(
                              item.id,
                              parseInt(e.target.value)
                            )
                          }
                        />
                      </div>
                    </td>
                    <td>
                      <div
                        style={{ height: "200px" }}
                        className="d-flex align-items-center justify-content-center"
                      >
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </td>
                    <td>
                      <div
                        style={{ height: "200px" }}
                        className="d-flex align-items-center justify-content-center"
                      >
                        <MdCancel
                          onClick={() => handleRemoveItem(item.id)}
                          style={{
                            cursor: "pointer",
                            color: "red",
                            fontSize: "25px",
                          }}
                        />
                      </div>
                      {/* Remove */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="text-right">
              <h4>Total Price: ${getTotalPrice().toFixed(2)}</h4>
              <button className="btn btn-success mt-2">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
