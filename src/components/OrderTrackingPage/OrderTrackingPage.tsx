import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  ProgressBar,
  Button,
  Badge,
} from "react-bootstrap";
import {
  FaBox,
  FaTruckMoving,
  FaShippingFast,
  FaClipboardCheck,
  FaHome,
} from "react-icons/fa";
import { GiSteeringWheel, GiTireIronCross } from "react-icons/gi";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { useLocation } from "react-router-dom";

function OrderTracking() {
  const location = useLocation();
  const ordersData = location.state;

  const statusMapping = {
    SHIPPED: "Shipped",
    PLACED: "Order Placed",
    PROCESSING: "Processing",
    OUTFORDELIVERY: "Out For Delivery",
    DELIVERED: "Delivered",
  };

  const statusSequence = {
    PLACED: 0,
    SHIPPED: 1,
    PROCESSING: 2,
    OUTFORDELIVERY: 3,
    DELIVERED: 4,
  };

  // Mock order data (replace with API call)
  const [order, setOrder] = useState({
    orderId: ordersData.orderId,
    status: ordersData.status, // Possible statuses: 'Pending', 'Shipped', 'Delivered', etc.
    trackingNumber: ordersData.trackingNo,
    steps: [
      {
        step: "Order Placed",
        completed: statusSequence[ordersData.status] >= 0,
        icon: <FaBox />,
      },
      {
        step: "Processing",
        completed: statusSequence[ordersData.status] >= 1,
        icon: <GiTireIronCross />,
      },
      {
        step: "Shipped",
        completed: statusSequence[ordersData.status] >= 2,
        icon: <FaShippingFast />,
      },
      {
        step: "Out For Delivery",
        completed: statusSequence[ordersData.status] >= 3,
        icon: <FaTruckMoving />,
      },
      {
        step: "Delivered",
        completed: statusSequence[ordersData.status] >= 4,
        icon: <FaClipboardCheck />,
      },
    ],
  });

  const getProgress = () => {
    const completedSteps = order.steps.filter((step) => step.completed).length;
    return (completedSteps / order.steps.length) * 100;
  };

  useEffect(() => {
    // Here you can fetch real order data via an API if needed.
  }, []);

  return (
    <>
      <NavBar />
      <Container className="vh-100">
        <Row className="mt-5">
          <Col md={8} className="mx-auto">
            <Card>
              <Card.Body>
                <h3 className="text-center mb-4">Order Tracking</h3>
                <p>
                  <strong>Order ID:</strong> {order.orderId}
                </p>
                <p>
                  <strong>Tracking Number:</strong> {order.trackingNumber}
                </p>
                <h4 className="mb-3">
                  Status:
                  <Badge
                    bg={
                      order.status === "SHIPPED"
                        ? "info"
                        : order.status === "DELIVERED"
                        ? "success"
                        : "warning"
                    }
                  >
                    {statusMapping[order.status]}
                  </Badge>
                </h4>

                <h5 className="mt-4">Order Progress</h5>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  {order.steps.map((step, index) => (
                    <div key={index} className="step-bar-item">
                      <div
                        className={`step-bar-icon ${
                          step.completed ? "completed" : ""
                        } text-center`}
                        style={{
                          fontSize: "2.5rem",
                          color: step.completed ? "#28a745" : "#6c757d",
                        }}
                      >
                        {step.icon}
                      </div>
                      <p className="text-center">{step.step}</p>
                      {step.completed ? (
                        <Badge bg="success" className="d-block mx-auto mt-2">
                          Completed
                        </Badge>
                      ) : (
                        <Badge bg="secondary" className="d-block mx-auto mt-2">
                          Pending
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
                <ProgressBar
                  now={getProgress()}
                  label={`${Math.round(getProgress())}%`}
                  className="my-3"
                  variant="success"
                />

                <Button
                  variant="primary"
                  className="mt-3"
                  onClick={() => alert("Tracking details will be fetched...")}
                >
                  View Full Tracking Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default OrderTracking;
