import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";

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
                <h3 className="card-title">Register</h3>
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
                <br />
                <input
                  className={"inputButton btn btn-info btn-lg w-100"}
                  type="button"
                  onClick={() => {}}
                  value={"Register"}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
