import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../NavBar/NavBar";
import "./CartPage.css";
import { MdCancel } from "react-icons/md";
import Footer from "../Footer/Footer";
import Item from "../ProductCard/Item";
import axios from "axios";
import CartItems from "./CartItems";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const goToCheckout = () => {
    navigate("/checkout");
  };

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
  const handleQuantityChange = async (id: number, newQuantity: number) => {
    const user = getUserData();
    setCartItems((item) =>
      item.map((item) =>
        item.item.id === id ? new CartItems(id, newQuantity, item.item) : item
      )
    );

    const data = [
      {
        id: { itemId: id, userId: user.id },
        quantity: newQuantity,
      },
    ];

    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/carts/upsert-carts",
        data
      );

      console.log("Added to cart");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // Handle item removal
  const handleRemoveItem = async (itemId) => {
    // setCartItems((prevItems) =>
    //   prevItems.filter((item) => item.item.id !== id)
    // );
    try {
      const user = getUserData();
      const res = await axios.delete(
        `http://localhost:8080/api/v1/carts/delete-by-key/${itemId}/${user.id}`
      );
      window.location.reload();
    } catch (error) {
      console.error("Error fetching cart items:", error);
      return [];
    }
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
                      {/* <input
                        type="checkbox"
                        style={{ cursor: "pointer", fontSize: "30px" }}
                      ></input> */}
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
                        RM {(item.item.unitPrice * item.quantity).toFixed(2)}
                      </div>
                    </td>
                    <td>
                      <div
                        style={{ height: "200px" }}
                        className="d-flex align-items-center justify-content-center"
                      >
                        <MdCancel
                          onClick={() => handleRemoveItem(item.item.id)}
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
              <button
                className="btn btn-success mt-2"
                onClick={goToCheckout}
                style={{ width: "100%" }}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
