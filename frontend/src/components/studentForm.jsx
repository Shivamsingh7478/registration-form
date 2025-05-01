import { useState } from "react";


export const RegistrationForm = () => {

  const [formData, setFormData] = useState({
    fullName: "", fatherName: "", dob: "", idProof: "", bloodGroup: "",
    street: "", city: "", state: "", pincode: "",
    email: "", phone: "",
    institute: "", course: "", branch: "",
    experienceType: "", organization: "", role: "", experienceDuration: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error for that field on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const renderError = (field) =>
    errors[field] && <div className="text-danger small">{errors[field]}</div>;

  const validate = () => {
    let tempErrors = {};
    const fieldOrder = [
      'fullName', 'fatherName', 'dob', 'idProof', 'bloodGroup',
      'street', 'city', 'state', 'pincode',
      'email', 'phone',
      'institute', 'course', 'branch',
      'experienceType', 'organization', 'role', 'experienceDuration'
    ];

    for (let field of fieldOrder) {
      if (!formData[field]) {
        tempErrors[field] = 'This field is required';
        break;
      }

      if (field === 'email' && !/\S+@\S+\.\S+/.test(formData[field])) {
        tempErrors[field] = 'Enter a valid email address';
        break;
      }

      if (field === 'phone' && !/^\d{10}$/.test(formData[field])) {
        tempErrors[field] = 'Enter a valid 10-digit phone number';
        break;
      }

      if (field === 'pincode' && !/^\d{6}$/.test(formData[field])) {
        tempErrors[field] = 'Enter a valid 6-digit pin code';
        break;
      }
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Form submitted successfully!");
    }
  };



    return (
      <div className="container my-5">
        <div className="card shadow p-4" >
          <h3 className="text-center mb-4" style={{ color: '#0074c2' }}>Student Details</h3>
  
          <form onSubmit={handleSubmit}>
          <h5 className="mb-3" style={{ color: '#0074c2' }}>Personal Details</h5>
          <div className="row mb-3">
              <div className="col-md-6">
              <label htmlFor="fullName" className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                id="fullName"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
              />
              {renderError("fullName")}
              </div>

              <div className="col-md-6">
              <label htmlFor="fatherName" className="form-label">Father's Name</label>
              <input
                type="text"
                className="form-control"
                id="fatherName"
                name="fatherName"
                placeholder="Enter your father's name"
                value={formData.fatherName}
                onChange={handleChange}
              />
              {renderError("fatherName")}
              </div>
            </div>  

            <div className="row mb-3">
              <div className="col-md-6">
              <label htmlFor="dob" className="form-label">Date of Birth</label>
              <input
                type="text"
                className="form-control"
                id="dob"
                name="dob"
                placeholder="DD/MM/YYYY"
                value={formData.dob}
                onChange={handleChange}
              />
              {renderError("dob")}
              </div>

              <div className="col-md-6">
              <label htmlFor="idProof" className="form-label">ID Proof No</label>
              <input
                type="text"
                className="form-control"
                id="idProof"
                name="idProof"
                placeholder="ID Proof No"
                value={formData.idProof}
                onChange={handleChange}
              />
              {renderError("idProof")}
              </div>
            </div>


            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="name" className="form-label">Blood group</label>
                <select className="form-select"
                id="bloodGroup"
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}>
                  <option value="" disabled>Select a Blood Group</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
            </div>



            
              
            <h5 className="mb-3" style={{ color: '#0074c2' }}>Contact Details</h5>


            <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="street" className="form-label">House No/Street</label>
                  <input
                    type="text"
                    className="form-control"
                    id="street"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    placeholder="House No/Street"
                  />
                  {renderError("street")}
                </div>
      
                <div className="col-md-6">
                  <label htmlFor="city" className="form-label">City</label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                  />
                  {renderError("city")}
                </div>
            </div>


              <div className="row mb-3">
                <div className="col-md-6">
                <label htmlFor="state" className="form-label">Select State</label>
                <select
                  className="form-select"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                >
                  <option value="" disabled>Select a State</option>
                  <option value="CSE">CSE</option>
                  <option value="CSSE">CSSE</option>
                  <option value="IT">IT</option>
                </select>
                {renderError("state")}
                </div>
      
                <div className="col-md-6">
                  <label htmlFor="pincode" className="form-label">Pin Code</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="Enter your Pin Code"
                  />
                  {renderError("pincode")}
                </div>
              </div>




              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input type="email" className="form-control" id="email" placeholder="Enter your email" />
                </div>
      
                <div className="col-md-6">
                  <label htmlFor="phone" className="form-label">Phone Number</label>
                  <input type="tel" className="form-control" id="phone" placeholder="Enter your phone number" />
                </div>
              </div>
            
            <h5 className="mb-3" style={{ color: '#0074c2' }}>Educational details</h5>
             <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="name" className="form-label">Name of institute</label>
                <select className="form-select" id="course">
                  <option selected disabled>Select</option>
                  <option value="btech">O+</option>
                  <option value="bca">O-</option>
                  <option value="mba">A+</option>
                </select>
              </div>
              </div>





            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="course" className="form-label">Course</label>
                <select className="form-select" id="course">
                  <option selected disabled>Select a course</option>
                  <option value="btech">B.Tech</option>
                  <option value="bca">BCA</option>
                  <option value="mba">MBA</option>
                </select>
              </div>

              <div className="col-md-6">
                <label htmlFor="course" className="form-label">Branch</label>
                <select className="form-select" id="course">
                  <option selected disabled>Select a Branch</option>
                  <option value="btech">CSE</option>
                  <option value="bca">CSSE</option>
                  <option value="mba">IT</option>
                </select>
              </div>
            </div>




            <h5 className="mb-3" style={{ color: '#0074c2' }}>Work Experience</h5>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="name" className="form-label">Type of Experience</label>
                <select className="form-select" id="course">
                  <option selected disabled>Select</option>
                  <option value="btech">Internship</option>
                  <option value="bca">Part-time Job</option>
                  <option value="mba">Academic Project</option>
                </select>
              </div>
              </div>


              <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="name" className="form-label">Organization / Company Name</label>
                <input type="text" className="form-control" id="name" placeholder="Organization / Company Name" />
              </div>

              <div className="col-md-6">
                <label htmlFor="name" className="form-label">Role / Position</label>
                <input type="text" className="form-control" id="name" placeholder="Role / Position" />
              </div>
            </div>



            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="name" className="form-label">Duration of Experience</label>
                <select className="form-select" id="course">
                  <option selected disabled>in Months</option>
                  <option value="btech">less than month</option>
                  <option value="bca">1</option>
                  <option value="mba">2</option>
                  <option value="bca">3</option>
                  <option value="mba">4</option>
                  <option value="bca">5</option>
                  <option value="mba">6</option>
                  <option value="bca">7</option>
                  <option value="mba">8</option>
                </select>
              </div>
              </div>

  
            {/* <button type="submit" className="btn" style={{ backgroundColor: '#0074c2', color: '#fffefe' }}>
              Submit
            </button> */}
          </form>
        </div>


        <button
        type="submit"
        className="btn btn-primary btn-lg w-100 mt-3"
        style={{
          backgroundColor: '#0074c2',
          color: '#fffefe',
          padding: '15px',
          fontSize: '1.2rem',
          height: '60px',
          borderRadius: '8px'
        }}
      >
        Submit
      </button>
      </div>


      
    );
  };
  