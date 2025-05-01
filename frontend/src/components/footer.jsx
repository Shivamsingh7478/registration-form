const Footer = () => {
    return (
      <footer className="text-white py-4 mt-5" style={{ backgroundColor: '#0074c2' }}>
        <div className="container">
          <div className="row text-center text-md-start">
            <div className="col-md-4 mb-3">
              <h5>About Us</h5>
              <p className="small">
                We are dedicated to helping students with seamless form submission and assistance.
              </p>
            </div>
  
            <div className="col-md-4 mb-3">
              <h5>Contact Us</h5>
              <p className="small mb-1">Email: support@example.com</p>
              <p className="small">Phone: +91-1234567890</p>
            </div>
  
            <div className="col-md-4 mb-3">
              <h5>Help</h5>
              <p className="small">FAQs</p>
              <p className="small">Live Chat Support</p>
            </div>
          </div>
  
          <hr className="border-light" />
          <p className="text-center small mb-0">
            &copy; {new Date().getFullYear()} Your Organization Name. All rights reserved.
          </p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  