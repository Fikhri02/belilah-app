import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Form,
  Container,
  Row,
  Col,
  InputGroup,
} from "react-bootstrap";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CartItems from "../CartPage/CartItems";
import Item from "../ProductCard/Item";
import { SiTicktick } from "react-icons/si";
import { GiCancel } from "react-icons/gi";

const getUserData = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

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

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItems[]>([]);

  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderData, setOrderData] = useState({});

  const goToOrderTracking = (orders) => {
    navigate("/order-tracking", { state: orders });
  };

  const user = getUserData();

  // Fetch cart items on component mount
  useEffect(() => {
    const user = getUserData(); // Assume this function retrieves the user data
    getCarts(user).then((carts) => setCartItems(carts));
  }, []);

  // State for form inputs
  const [billingDetails, setBillingDetails] = useState({
    name: user.fullname,
    email: user.email,
    address1: user.addresses[0].line_1,
    address2: user.addresses[0].line_2,
    city: user.addresses[0].city,
    postalCode: user.addresses[0].postcode,
    state: user.addresses[0].state,
    country: user.addresses[0].country,
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("creditCard");

  // Order summary
  const orderSummary = {
    items: [
      { name: "Product 1", quantity: 2, price: 19.99 },
      { name: "Product 2", quantity: 1, price: 29.99 },
      { name: "Product 3", quantity: 3, price: 9.99 },
    ],
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails({ ...billingDetails, [name]: value });
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic (e.g., make an API call)
    submitOrder();
  };

  const submitOrder = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/orders/create-order",
        user
      );
      setShowSuccess(true);
      setOrderData(res.data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setShowError(true);
    }
  };

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

  return (
    <>
      <NavBar />
      <Container className="my-5">
        <Row>
          <Col lg={8} md={12}>
            <Card className="mb-4">
              <Card.Header>
                <h4>Billing Information</h4>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter your full name"
                          name="name"
                          value={billingDetails.name}
                          onChange={handleInputChange}
                          readOnly={true}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="formEmail">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter your email"
                          name="email"
                          value={billingDetails.email}
                          onChange={handleInputChange}
                          readOnly={true}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <h4 className="my-4">Address Details</h4>
                  <Row className="my-1">
                    <Col md={3} style={{ paddingRight: "0" }}>
                      <Form.Label>Address 1</Form.Label>
                    </Col>
                    <Col md={9} style={{ paddingLeft: "0" }}>
                      <p>{billingDetails.address1}</p>
                    </Col>
                  </Row>

                  <Row className="my-1">
                    <Col md={3} style={{ paddingRight: "0" }}>
                      <Form.Label>Address 2</Form.Label>
                    </Col>
                    <Col md={9} style={{ paddingLeft: "0" }}>
                      <p>{billingDetails.address2}</p>
                    </Col>
                  </Row>

                  <Row className="my-1">
                    <Col md={3} style={{ paddingRight: "0" }}>
                      <Form.Label>City</Form.Label>
                    </Col>
                    <Col md={9} style={{ paddingLeft: "0" }}>
                      <p>{billingDetails.city}</p>
                    </Col>
                  </Row>

                  <Row className="my-1">
                    <Col md={3} style={{ paddingRight: "0" }}>
                      <Form.Label>Postal Code</Form.Label>
                    </Col>
                    <Col md={9} style={{ paddingLeft: "0" }}>
                      <p>{billingDetails.postalCode}</p>
                    </Col>
                  </Row>

                  <Row className="my-1">
                    <Col md={3} style={{ paddingRight: "0" }}>
                      <Form.Label>Country</Form.Label>
                    </Col>
                    <Col md={9} style={{ paddingLeft: "0" }}>
                      <p>{billingDetails.country}</p>
                    </Col>
                  </Row>

                  <h4 className="my-4">Payment Details</h4>
                  <Row>
                    <Col>
                      <Form.Check
                        type="radio"
                        label="Credit Card"
                        name="paymentMethod"
                        value="creditCard"
                        checked={paymentMethod === "creditCard"}
                        onChange={handlePaymentChange}
                      />
                      {paymentMethod === "creditCard" && (
                        <>
                          <Form.Group
                            controlId="formCardNumber"
                            className="my-3"
                          >
                            <Form.Label>Card Number</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter your card number"
                              name="cardNumber"
                              value={billingDetails.cardNumber}
                              onChange={handleInputChange}
                              required
                            />
                          </Form.Group>
                          <Row>
                            <Col md={6}>
                              <Form.Group controlId="formCardExpiry">
                                <Form.Label>Expiry Date</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="MM/YY"
                                  name="cardExpiry"
                                  value={billingDetails.cardExpiry}
                                  onChange={handleInputChange}
                                  required
                                />
                              </Form.Group>
                            </Col>
                            <Col md={6}>
                              <Form.Group controlId="formCardCvc">
                                <Form.Label>CVC</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="CVC"
                                  name="cardCvc"
                                  value={billingDetails.cardCvc}
                                  onChange={handleInputChange}
                                  required
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                        </>
                      )}
                    </Col>
                  </Row>
                  <Button
                    type="submit"
                    variant="success"
                    className="my-4 w-100"
                  >
                    Complete Purchase
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4} md={12}>
            <Card>
              <Card.Header>
                <h4>Order Summary</h4>
              </Card.Header>
              <Card.Body>
                {cartItems.map((cart, index) => (
                  <Row key={index} className="mb-3">
                    <Col>{cart.item.name}</Col>
                    <Col className="text-right">
                      {cart.quantity} x RM {cart.item.unitPrice.toFixed(2)}
                    </Col>
                  </Row>
                ))}
                <Row>
                  <Col>
                    <strong>Total</strong>
                  </Col>
                  <Col className="text-right">
                    <strong>
                      RM{" "}
                      {cartItems
                        .reduce(
                          (total, cart) =>
                            total + cart.quantity * cart.item.unitPrice,
                          0
                        )
                        .toFixed(2)}
                    </strong>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
      {showSuccess && (
        <Popup
          type="success"
          message="Successfully submitted order."
          onClose={() => {
            setShowSuccess(false);
            goToOrderTracking(orderData);
          }}
        />
      )}
      {showError && (
        <Popup
          type="danger"
          message="Failed to submit order. Please retry."
          onClose={() => setShowError(false)}
        />
      )}
    </>
  );
};

export default CheckoutPage;
