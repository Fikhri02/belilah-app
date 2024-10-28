import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import PopupDialog from "../PopupDialog/PopupDialog";
import "./RegisterPage.css";
import { SiTicktick } from "react-icons/si";

function RegisterPage() {
  return (
    <>
      <NavBar />
      <Register />
      <Footer />
    </>
  );
}

export default RegisterPage;

function Register() {
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [response, setResponse] = useState(String || null);

  const [modal, setModal] = useState(false);

  const navigate = useNavigate();

  const onRegister = async () => {
    const data = {
      email: email,
      firstName: fname,
      lastName: lname,
      password: password,
      rePassword: rePassword,
    };

    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/users/register",
        data
      );
      setModal(!modal);
      setResponse(res.data); // Save the response data to the state
    } catch (error) {
      console.error("Error:", error);
      setResponse("error"); // Save the response data to the state
    }
  };

  return (
    <>
      <div className="w-100 bg-light vh-100">
        <div
          className="w-100 d-flex justify-content-center"
          style={{ width: "250px", height: "250px" }}
        >
          <img src="/shoes.svg" alt="Logo" />
        </div>
        <div className="w-100 d-flex justify-content-center">
          <h2 style={{ fontFamily: "Roboto" }}>Let's Get Started</h2>
        </div>
        <br />
        <div className="d-flex justify-content-center align-items-center">
          <div className="card " style={{ width: "24rem" }}>
            <div className="card-body">
              <div className="w-100 d-flex justify-content-center">
                {/* <h3 className="card-title">Register</h3> */}
              </div>
              <form>
                <input
                  id="usernameInput"
                  value={email}
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control form-control-lg"
                  required
                />
                <br />

                <input
                  id="fnameInput"
                  value={fname}
                  placeholder="First Name"
                  onChange={(e) => setFname(e.target.value)}
                  className="form-control form-control-lg"
                  required
                />
                <br />
                <input
                  id="lnameInput"
                  value={lname}
                  placeholder="Last Name"
                  onChange={(e) => setLname(e.target.value)}
                  className="form-control form-control-lg"
                  required
                />
                <br />
                <input
                  id="passwordInput"
                  value={password}
                  placeholder="Password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control form-control-lg"
                  required
                />
                <br />
                <input
                  id="rePasswordInput"
                  value={rePassword}
                  placeholder="Retype your Password"
                  type="password"
                  onChange={(e) => setRePassword(e.target.value)}
                  className="form-control form-control-lg"
                  required
                />
                <br />
                <p>
                  By signing up you agree to our Terms of use and Privacy
                  Policy.
                </p>
                <br />
                <input
                  className={"inputButton btn btn-info btn-lg w-100"}
                  type="button"
                  onClick={onRegister}
                  value="Register"
                  style={{ color: "white" }}
                />
              </form>
              <br />
              <p>
                Already have an account?{" "}
                <a>
                  <Link to="/login">Login</Link>
                </a>
              </p>
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
                    <p>Successfully registered user.</p>
                  </div>
                </div>
                <button
                  className="btn btn-success"
                  onClick={() => navigate("/main-menu")}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
