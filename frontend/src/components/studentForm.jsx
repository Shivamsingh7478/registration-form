export const RegistrationForm = () => {
    return (
      <div className="container my-5">
        <div className="card shadow p-4" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h3 className="text-center mb-4" style={{ color: '#0074c2' }}>Student Registration</h3>
  
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Full Name</label>
              <input type="text" className="form-control" id="name" placeholder="Enter your full name" />
            </div>
  
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control" id="email" placeholder="Enter your email" />
            </div>
  
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone Number</label>
              <input type="tel" className="form-control" id="phone" placeholder="Enter your phone number" />
            </div>
  
            <div className="mb-3">
              <label htmlFor="course" className="form-label">Course</label>
              <select className="form-select" id="course">
                <option selected disabled>Select a course</option>
                <option value="btech">B.Tech</option>
                <option value="bca">BCA</option>
                <option value="mba">MBA</option>
              </select>
            </div>
  
            <button type="submit" className="btn" style={{ backgroundColor: '#0074c2', color: '#fffefe' }}>
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };
  