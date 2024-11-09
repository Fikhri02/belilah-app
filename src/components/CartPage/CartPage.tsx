import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../NavBar/NavBar";
import "./CartPage.css";
import { MdCancel } from "react-icons/md";
import Footer from "../Footer/Footer";
import Item from "../ProductCard/Item";
import axios from "axios";
import CartItems from "./CartItems";

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

const getUserData = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItems[]>([]);

  // Fetch cart items
  const getCarts = async (user): Promise<CartItems[]> => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/users/get-cart",
        user
      );
      const carts = res.data.carts.map(
        (obj, index) =>
          new CartItems(
            index,
            obj.quantity,
            new Item(
              obj.items.id,
              obj.items.code,
              obj.items.description,
              obj.items.unitPrice,
              obj.items.averageReview,
              obj.items.reviewCount,
              obj.items.imageUrl
            )
          )
      );
      return carts;
    } catch (error) {
      console.error("Error fetching cart items:", error);
      return [];
    }
  };

  // Fetch cart items on component mount
  useEffect(() => {
    const user = getUserData(); // Assume this function retrieves the user data
    getCarts(user).then((carts) => setCartItems(carts));
  }, []);

  // Handle quantity change
  const handleQuantityChange = (id: number, newQuantity: number) => {
    setCartItems((prevItems) =>
      // prevItems.map((item, index) =>
      //   index === id ? new CartItems(newQuantity, item.item) : item
      // )
      prevItems.map((item) =>
        item.item.id === id
          ? new CartItems(item.id, newQuantity, item.item)
            : item)
    );
  };
  // Handle item removal
  const handleRemoveItem = (id) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.item.id !== id)
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
                            src={item.item.imageUrl}
                            className="img-fluid"
                            alt="Product Image"
                          />
                        </div>
                        <div
                          style={{ height: "200px", width: "250px" }}
                          className="d-flex align-items-center justify-content-center"
                        >
                          {item.item.name}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div
                        style={{ height: "200px" }}
                        className="d-flex align-items-center justify-content-center"
                      >
                        RM {item.item.unitPrice.toFixed(2)}
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
                              item.item.id,
                              parseInt(e.target.value) || 1
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
                        RM {(item.item.unitPrice * item.quantity).toFixed(2)}
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
              {/* <h4>Total Price: ${getTotalPrice().toFixed(2)}</h4> */}
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
