import React from "react";

function Footer() {
  return (
    <footer
      style={{ backgroundColor: "#f8f9fa", color: "#343a40" }}
      className="py-4 mt-auto"
    >
      <div className="container">
        <div className="row">
          {/* About Section */}
          <div className="col-md-4 mb-3">
            <h5>About Us</h5>
            <p>
              We are a leading company in providing the best quality products.
              Our mission is to ensure customer satisfaction and deliver
              top-notch services.
            </p>
          </div>

          {/* Links Section */}
          <div className="col-md-4 mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-muted">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-muted">
                  Products
                </a>
              </li>
              <li>
                <a href="#" className="text-muted">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-muted">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div className="col-md-4 mb-3">
            <h5>Follow Us</h5>
            <div>
              <a href="#" className="text-muted me-3">
                <i className="fab fa-facebook-f"></i> Facebook
              </a>
              <a href="#" className="text-muted me-3">
                <i className="fab fa-twitter"></i> Twitter
              </a>
              <a href="#" className="text-muted">
                <i className="fab fa-instagram"></i> Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col text-center mt-3">
            <p>&copy; 2024 Belilah Inc. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
