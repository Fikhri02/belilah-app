import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Image,
  Badge,
} from "react-bootstrap";
import { FaEdit, FaKey } from "react-icons/fa";
import "./UserProfile.css";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { IoMdLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SiTicktick } from "react-icons/si";
import { GiCancel } from "react-icons/gi";

const getUserData = () => {
  var user = localStorage.getItem("user");

  var userData = user ? JSON.parse(user) : null;

  if (
    userData?.addresses == null ||
    Object.keys(userData?.addresses).length == 0
  ) {
    var obj = [
      {
        line_1: "",
        line_2: "",
        postcode: "",
        city: "",
        state: "",
        country: "",
      },
    ];
    userData.addresses = obj;
    console.log("in");
  }
  console.log("out");

  return userData;
};

function UserProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(getUserData());
  const [isEditMode, setIsEditMode] = useState(false); // Track if in edit mode

  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const Popup = ({ type, message, onClose }) => (
    <div className="overlay">
      <div className="modal-content w-100 bg-light">
        <div className="d-flex justify-content-center my-3">
          {type === "success" ? (
            <SiTicktick size={60} color="green" />
          ) : (
            <GiCancel size={60} color="red" />
          )}
        </div>
        <div className="d-flex justify-content-center">
          <p>{message}</p>
        </div>
        <button
          className={`btn btn-${type}`}
          onClick={onClose}
          style={{ width: "100%" }}
        >
          Close
        </button>
      </div>
    </div>
  );

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login"); // Redirect to login page
  };

  // Toggle edit mode
  const handleEditClick = () => {
    setIsEditMode(!isEditMode);
  };

  const handleSaveChanges = async () => {
    // Save the changes to localStorage or send to server here

    try {
      user.cUserId = user.id;
      setUser({
        ...user,
        addresses: [
          {
            ...user.addresses[0],
            isActive: true,
          },
        ],
      });
      const res = await axios.put(
        "http://localhost:8080/api/v1/users/update-user",
        user
      );
      setShowSuccess(true);
      setIsEditMode(false); // Exit edit mode after saving
      localStorage.setItem("user", JSON.stringify(res.data)); // For now, just update localStorage
    } catch (error) {
      console.error("Error updating user:", error);
      setShowError(true);
    }
  };

  return (
    <>
      <NavBar />
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="shadow-lg">
              <Card.Body>
                <div className="text-center mb-4">
                  <Image
                    src="https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg"
                    alt="Profile"
                    roundedCircle
                    width="150"
                    height="150"
                    className="mb-3"
                  />
                  <h3>{user.fullname}</h3>
                  <p className="text-muted">{user.email}</p>
                  <p>
                    <Badge bg="info">Joined: {user.joinDate}</Badge>
                  </p>
                </div>

                <div className="mb-4">
                  <h5 className="text-center">Contacts Information</h5>
                  <div className="mb-8 card justify-content-center p-3 m-4">
                    <Form.Group>
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={user.firstName}
                        onChange={(e) =>
                          setUser({ ...user, firstName: e.target.value })
                        }
                        readOnly={!isEditMode}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={user.lastName}
                        onChange={(e) =>
                          setUser({ ...user, lastName: e.target.value })
                        }
                        readOnly={!isEditMode}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        value={user.email}
                        onChange={(e) =>
                          setUser({ ...user, email: e.target.value })
                        }
                        readOnly={!isEditMode}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        type="text"
                        value={user.phoneNumber}
                        onChange={(e) =>
                          setUser({ ...user, phoneNumber: e.target.value })
                        }
                        readOnly={!isEditMode}
                      />
                    </Form.Group>
                  </div>
                </div>

                <h5 className="text-center">Address</h5>
                <div className="mb-8 card justify-content-center p-3 m-4">
                  <Form.Group>
                    <Form.Label>Address Line 1</Form.Label>
                    <Form.Control
                      type="text"
                      value={user.addresses?.[0].line_1}
                      onChange={(e) =>
                        setUser({
                          ...user,
                          addresses: [
                            {
                              ...user.addresses[0],
                              line_1: e.target.value,
                            },
                          ],
                        })
                      }
                      readOnly={!isEditMode}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Address Line 2</Form.Label>
                    <Form.Control
                      type="text"
                      value={user.addresses?.[0].line_2}
                      onChange={(e) =>
                        setUser({
                          ...user,
                          addresses: [
                            {
                              ...user.addresses[0],
                              line_2: e.target.value,
                            },
                          ],
                        })
                      }
                      readOnly={!isEditMode}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                      type="text"
                      value={user.addresses?.[0].postcode}
                      onChange={(e) =>
                        setUser({
                          ...user,
                          addresses: [
                            {
                              ...user.addresses[0],
                              postcode: e.target.value,
                            },
                          ],
                        })
                      }
                      readOnly={!isEditMode}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      value={user.addresses?.[0].city}
                      onChange={(e) =>
                        setUser({
                          ...user,
                          addresses: [
                            {
                              ...user.addresses[0],
                              city: e.target.value,
                            },
                          ],
                        })
                      }
                      readOnly={!isEditMode}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      type="text"
                      value={user.addresses?.[0].state}
                      onChange={(e) =>
                        setUser({
                          ...user,
                          addresses: [
                            {
                              ...user.addresses[0],
                              state: e.target.value,
                            },
                          ],
                        })
                      }
                      readOnly={!isEditMode}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                      type="text"
                      value={user.addresses?.[0].country}
                      onChange={(e) =>
                        setUser({
                          ...user,
                          addresses: [
                            {
                              ...user.addresses[0],
                              country: e.target.value,
                            },
                          ],
                        })
                      }
                      readOnly={!isEditMode}
                    />
                  </Form.Group>
                </div>

                <div className="d-flex justify-content-center">
                  <Button
                    variant="primary"
                    onClick={handleEditClick}
                    className="mx-1"
                  >
                    <FaEdit /> {isEditMode ? "Cancel" : "Edit Profile"}
                  </Button>

                  {isEditMode && (
                    <Button
                      variant="success"
                      onClick={handleSaveChanges}
                      className="mx-1"
                    >
                      Save Changes
                    </Button>
                  )}
                  {/* <Button
                    variant="danger"
                    onClick={() => alert("Change Password")}
                  >
                    <FaKey /> Change Password
                  </Button> */}
                </div>

                <br />
                <div className="d-flex align-items-center justify-content-center">
                  <Button variant="" onClick={handleLogout}>
                    Logout <IoMdLogOut color="red" size={20} />
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
      {showSuccess && (
        <Popup
          type="success"
          message="Successfully updated profile."
          onClose={() => {
            setShowSuccess(false);
            window.location.reload();
          }}
        />
      )}
      {showError && (
        <Popup
          type="danger"
          message="Failed to update profile. Please retry."
          onClose={() => setShowError(false)}
        />
      )}
    </>
  );
}

export default UserProfile;
