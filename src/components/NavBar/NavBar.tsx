import axios from "axios";
import React, { useState } from "react";
import { FaHome, FaSearch } from "react-icons/fa";
import { IoIosCart } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import Item from "../ProductCard/Item";

const getUserData = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

const getCarts = async (user): Promise<Item[]> => {
  const [items, setItems] = useState<Item[]>([]);

  try {
    const res = await axios.post(
      "http://localhost:8080/api/v1/users/get-cart",
      user
    );
    console.log("carts");
    console.log(res.data);
    res.data.carts.map(
      (obj) =>
        new Item(
          obj.code,
          obj.description,
          obj.unitPrice,
          obj.averageReview,
          obj.reviewCount,
          obj.imageUrl
        )
    );

    return res.data.carts;
  } catch (error) {
    console.error("Error:", error);
  }
  return [];
};

function NavBar() {
  const navigate = useNavigate();

  var user = getUserData();

  const [items, setItems] = useState<Item[]>([]);

  // getCarts(user).then((result) => {
  //   setItems(result);
  //   console.log("result");
  //   console.log(result);
  // });

  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary"
      style={{ marginBottom: "10px" }}
    >
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => navigate("/main-menu")}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-link active" aria-current="page" href="#">
              <Link
                to="/main-menu"
                style={{ textDecoration: "none", color: "black" }}
              >
                <FaHome />
              </Link>
            </a>
            {user ? (
              <a className="nav-link">Welcome, {user.fullname}</a>
            ) : (
              <>
                <a
                  className="nav-link"
                  onClick={() => navigate("/login")}
                  style={{ cursor: "pointer" }}
                >
                  Login
                </a>
                <a
                  className="nav-link"
                  onClick={() => navigate("/register")}
                  style={{ cursor: "pointer" }}
                >
                  Register
                </a>
              </>
            )}

            <a className="nav-link disabled" aria-disabled="true">
              Feedback
            </a>
          </div>

          <div className="d-flex align-items-center">
            <input
              type="text"
              placeholder="Search..."
              className="search-input me-2" // Added margin to the right
              style={{
                padding: "10px",
                width: "500px", // Adjust width if necessary
                height: "40px",
              }}
            />
            <button
              className="btn btn-outline-secondary"
              style={{ width: "40px", height: "40px" }}
            >
              <FaSearch />
            </button>
          </div>
        </div>

        <div>
          <button
            className="btn btn-outline-secondary"
            style={{ width: "100px", height: "40px" }}
            onClick={() => navigate("/cart")}
          >
            <IoIosCart />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
