import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";

function Homepage() {
  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        {/* <NavBar /> */}
        <Login />
        <Footer />
      </div>
    </>
  );
}

export default Homepage;

interface User {
  username: string;
  password: string;
}

function Login() {
  const [response, setResponse] = useState(String || null);
  const [username, setName] = useState(String || null);
  const [password, setPassword] = useState(String || null);

  const navigate = useNavigate();

  const onLogin = async () => {
    // const data = {
    //   fullname: username,
    //   password: password,
    // };

    // console.log(username);
    // console.log(password);

    // try {
    //   const res = await axios.post(
    //     "http://localhost:8080/api/v1/users/verify",
    //     data
    //   );
    //   setResponse(res.data); // Save the response data to the state
    // } catch (error) {
    //   console.error("Error:", error);
    //   setResponse("error"); // Save the response data to the state
    // }

    navigate("main-menu");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card " style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">Log In</h5>
          <input
            id="usernameInput"
            value={username}
            placeholder="Email"
            onChange={(e) => setName(e.target.value)}
            className={"inputBox"}
          />
          <br />
          <input
            id="passwordInput"
            value={password}
            placeholder="Password"
            type="password"
            onChange={(ev) => setPassword(ev.target.value)}
            className={"inputBox"}
          />
          <br />
          {/* <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p> */}
          {/* <a href="#" className="btn btn-primary">
            Go somewhere
          </a> */}
          <input
            className={"inputButton btn btn-primary"}
            type="button"
            onClick={() => onLogin()}
            value={"Log in"}
          />
          {response && (
            <div>
              <h2>Response from API:</h2>
              <pre>{JSON.stringify(response, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
