import React from "react";
import { FaHome, FaSearch } from "react-icons/fa";
import { IoIosCart } from "react-icons/io";
import { Link } from "react-router-dom";

function NavBar() {
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
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-link active" aria-current="page" href="#">
              <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                <FaHome />
              </Link>
            </a>
            <a className="nav-link" href="#">
              Login
            </a>
            <a className="nav-link" href="#">
              Register
            </a>
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
          >
            <IoIosCart />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
