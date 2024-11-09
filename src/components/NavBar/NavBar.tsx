import React, { useState } from "react";
import axios from "axios";
import { FaHome, FaSearch } from "react-icons/fa";
import { IoIosCart } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import Item from "../ProductCard/Item";
import { IoMdLogOut } from "react-icons/io";
import { HiUserCircle } from "react-icons/hi2";

const getUserData = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

function NavBar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(getUserData()); // Using state for user info
  const [search, setSearch] = useState(""); // Using state for user info

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login"); // Redirect to login page
  };

  const goToProfile = () => {
    navigate("/profile-page"); // Redirect to login page
  };

  const searchItems = async (name) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/v1/items/find-name?name=${name}`
      );
      // setResponse(res.data); // Save the response data to the state
      console.log(res.data);
      const fetchedItems = res.data.map(
        (obj) =>
          new Item(
            obj.id,
            obj.code,
            obj.description,
            obj.unitPrice,
            obj.averageReview,
            obj.reviewCount,
            obj.imageUrl
          )
      );
      navigate("/main-menu", { state: fetchedItems });
    } catch (error) {
      console.error("Error:", error);
      return;
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      searchItems(search); // Trigger search on "Enter"
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary"
      style={{ marginBottom: "0px" }}
    >
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center w-100">
          {/* Left Section: Home & Navigation Links */}
          <div className="d-flex align-items-center">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onKeyDown={handleKeyPress} // Handle "Enter" key press
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <Link
                  to="/main-menu"
                  className="nav-link"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <FaHome size={30} />
                </Link>
                {user ? (
                  <button
                    onClick={goToProfile}
                    style={{
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                    }}
                  >
                    <HiUserCircle color="blue" size={30} />
                  </button>
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
              </div>
            </div>
          </div>

          {/* Center Section: Search Bar */}
          <div className="d-flex align-items-center">
            <input
              type="text"
              placeholder="Search..."
              className="form-control me-2"
              style={{ width: "600px", height: "40px" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)} // Update search value
              onSubmit={() => searchItems(search)} // Handle "Enter" key press
            />
            <button
              className="btn btn-outline-secondary"
              style={{ width: "40px", height: "40px" }}
              onClick={() => searchItems(search)}
            >
              <FaSearch />
            </button>
          </div>

          {/* Right Section: Logo and Cart */}
          <div className="d-flex align-items-center">
            <img
              className="mx-10"
              src="/src/assets/belilah_logo_final.png"
              alt="Logo"
              style={{ width: "100px", height: "50px", marginRight: "10px" }}
            />
            <button
              className="btn btn-outline-secondary mx-10"
              style={{ width: "100px", height: "40px" }}
              onClick={() => {
                if (user == null) navigate("/login");
                else {
                  navigate("/cart");
                }
              }}
            >
              <IoIosCart />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
