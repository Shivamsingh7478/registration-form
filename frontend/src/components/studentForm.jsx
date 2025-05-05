import { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";


export const RegistrationForm = () => {
  
  const [captchaValue, setCaptchaValue] = useState(null);
  const captchaRef = useRef();
  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experiences: [
      {
        experienceType: '',
        organization: '',
        role: '',
        experienceDuration: '',
      },
    ],
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e, index = null) => {
    const { name, value } = e.target;
  
    if (index !== null) {
      const updatedExperiences = [...formData.experiences];
      updatedExperiences[index][name] = value;
      setFormData({ ...formData, experiences: updatedExperiences });
    } else {
      setFormData({ ...formData, [name]: value });
  
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: null }));
      }
    }
  };

  const renderError = (field, index = null) => {
    if (index !== null) {
      const key = `experience_${index}_${field}`;
      return errors[key] && <div className="text-danger small">{errors[key]}</div>;
    }
    return errors[field] && <div className="text-danger small">{errors[field]}</div>;
  };

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
        continue;
      }

      if (field === 'email' && !/\S+@\S+\.\S+/.test(formData[field])) {
        tempErrors[field] = 'Enter a valid email address';
        continue;
      }

      if (field === 'phone' && !/^\d{10}$/.test(formData[field])) {
        tempErrors[field] = 'Enter a valid 10-digit phone number';
        continue;
      }

      if (field === 'pincode' && !/^\d{6}$/.test(formData[field])) {
        tempErrors[field] = 'Enter a valid 6-digit pin code';
        continue;
      }

      if (field === 'bloodGroup' && !formData[field]) {
        tempErrors[field] = 'Please select a blood group';
      }
    }


    formData.experiences.forEach((exp, index) => {
      ['experienceType', 'organization', 'role', 'experienceDuration'].forEach((key) => {
        if (!exp[key]) {
          tempErrors[`experience_${index}_${key}`] = 'This field is required';
        }
      });
    });

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
    console.log("Captcha value:", value);  // You can see the token here
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Form submitted successfully!");
    }

    if (!captchaValue) {
      setErrors((prev) => ({ ...prev, captcha: 'Please verify the captcha' }));
      return;
    }

    try {
      // Submit data to the backend
      // const response = await axios.post('/your-backend-endpoint', formData);
  
      // If successful
      alert('Form submitted successfully!');
  
      // ✅ Reset form fields and captcha
      setFormData({ fullname: '', email: '', password: '' });
      setErrors({});
      captchaRef.current.reset();       // <- reset the reCAPTCHA widget
      setCaptchaValue(null);           // <- reset the captcha state
  
    } catch (err) {
      // Handle server errors
      console.error(err);
      setErrors({ general: "Submission failed. Try again." });
    }
  };


  const externalSubmit = () => {
    formRef.current.requestSubmit();  // This triggers the form's onSubmit
  };

  const addExperience = () => {
    setFormData(prevState => ({
      ...prevState,
      experiences: [
        ...prevState.experiences,
        {
          experienceType: '',
          organization: '',
          role: '',
          experienceDuration: ''
        }
      ]
    }));
  };

    return (
      <div className="container my-5">
        <div className="card shadow p-4" >
          <h3 className="text-center mb-4" style={{ color: '#0074c2' }}>Student Details</h3>
  
          <form onSubmit={handleSubmit} ref={formRef}>
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
                type="date"
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
                <label htmlFor="bloodGroup" className="form-label">Blood group</label>
                <select className="form-select"
                id="bloodGroup"
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}>
                  <option value="" disabled selected>Select a Blood Group</option>
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
                  <option value="" disabled selected>Select a State</option>
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
                  <input type="email" className="form-control" id="email" placeholder="Enter your email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange} />
                  {renderError("email")}
                </div>
      
                <div className="col-md-6">
                  <label htmlFor="phone" className="form-label">Phone Number</label>
                  <input type="tel" className="form-control" id="phone" placeholder="Enter your phone number" 
                  name = "phone"
                  value={formData.phone}
                  onChange={handleChange}/>
                  {renderError("phone")}
                </div>
              </div>
            
            <h5 className="mb-3" style={{ color: '#0074c2' }}>Educational details</h5>
             <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="name" className="form-label">Name of institute</label>
                <input type="text" className="form-control" id="institute" name="institute" placeholder="Institute Name"
                value={formData.institute}
                onChange={handleChange} />
                {renderError("institute")}
              </div>
              </div>





            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="course" className="form-label">Course</label>
                <select className="form-select" id="course" name="course"
                value={formData.course}
                onChange={handleChange}>
                  <option value="" disabled selected>Select a course</option>
                  <option value="btech">B.Tech</option>
                  <option value="bca">BCA</option>
                  <option value="mba">MBA</option>
                </select>
                {renderError("course")}
              </div>

              <div className="col-md-6">
                <label htmlFor="branch" className="form-label">Branch</label>
                <select className="form-select" id="branch" name="branch"
                value={formData.branch}
                onChange={(e) => handleChange(e, index)}>
                  <option value="" disabled selected>Select a Branch</option>
                  <option value="btech">CSE</option>
                  <option value="bca">CSSE</option>
                  <option value="mba">IT</option>
                </select>
                {renderError("branch")}
              </div>
            </div>




            <h5 className="mb-3" style={{ color: '#0074c2' }}>Work Experience</h5>
            {/* <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="name" className="form-label">Type of Experience</label>
                <select className="form-select" id="experienceType" name="experienceType"
                value={formData.experienceType}
                onChange={handleChange}>
                  <option value="" disabled>Select</option>
                  <option value="btech">Internship</option>
                  <option value="bca">Part-time Job</option>
                  <option value="mba">Academic Project</option>
                </select>
                {renderError("experienceType")}
              </div>
              </div>


              <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="organization" className="form-label">Organization Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="organization"
                  name="organization"
                  placeholder="Organization Name"
                  value={formData.organization}
                  onChange={handleChange}
                />
                {renderError("organization")}
              </div>

              <div className="col-md-6">
                <label htmlFor="role" className="form-label">Role</label>
                <input
                  type="text"
                  className="form-control"
                  id="role"
                  name="role"
                  placeholder="Your Role"
                  value={formData.role}
                  onChange={handleChange}
                />
                {renderError("role")}
              </div>

              <div className="col-md-6 mt-3">
                <label htmlFor="experienceDuration" className="form-label">Experience Duration</label>
                <input
                  type="text"
                  className="form-control"
                  id="experienceDuration"
                  name="experienceDuration"
                  placeholder="e.g., 6 months"
                  value={formData.experienceDuration}
                  onChange={handleChange}
                />
                {renderError("experienceDuration")}
              </div>
            </div> */}



            {formData.experiences.map((exp, index) => (
            <div  key={index}
            style={{
              borderTop: index !== 0 ? "2px solid #ccc" : "none",
              paddingTop: index !== 0 ? "20px" : "0px",
              marginTop: index !== 0 ? "20px" : "0px"
            }}>
              <div className="row mb-3">
              <div className="col-md-6">
              <label htmlFor="name" className="form-label">Type of Experience</label>
                  
                <select className="form-select" id="experienceType" name="experienceType"
                          value={exp.experienceType}
                          onChange={(e) => handleChange(e, index)}
                          placeholder="Internship, Full-time etc.">
                            <option value="" disabled>Select</option>
                            <option value="btech">Internship</option>
                            <option value="bca">Part-time Job</option>
                            <option value="mba">Academic Project</option>
                          </select>
                          {renderError("experienceType")}

              
              </div>
              </div>
              
              <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Organization</label>
                <input
                  type="text"
                  className="form-control"
                  name="organization"
                  value={exp.organization}
                  onChange={(e) => handleChange(e, index)}
                  placeholder="Company name"
                />
                {renderError("organization")}
              </div>
              
              <div className="col-md-6">
                <label className="form-label">Role</label>
                <input
                  type="text"
                  className="form-control"
                  name="role"
                  value={exp.role}
                  onChange={(e) => handleChange(e, index)}
                  placeholder="Your role"
                />
                {renderError("role")}
              </div>
              </div>

              <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="name" className="form-label">Duration of Experience</label>
                <select className="form-select" id="experienceDuration" name="experienceDuration"
                value={exp.experienceDuration}
                onChange={(e) => handleChange(e, index)}
                placeholder="e.g. 6 months">
                  <option value="" disabled>in Months</option>
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
                {renderError("experienceDuration")}
              </div>
              </div>
            </div>
          ))}

          <div className="mb-4 ">
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={addExperience}
            >
              + Add Work Experience
            </button>
          </div>

  
            {/* <button type="submit" className="btn" style={{ backgroundColor: '#0074c2', color: '#fffefe' }}>
              Submit
            </button> */}
          </form>
        </div>


        


        <ReCAPTCHA
  sitekey="6LeFLS8rAAAAAJ-w7XadNVSyr7Y7h4NLIJjNR8tb"
  onChange={handleCaptchaChange}
  ref={captchaRef}
/>
{errors.captcha && <div className="text-danger small">{errors.captcha}</div>}


        <button
        onClick={externalSubmit}
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
  