import { useState, useRef } from "react";
// import ReCAPTCHA from "react-google-recaptcha";
import { createPersonalDetails,
  createContactDetails, 
  createEducationalDetails,
 createWorkExperience } from "../api";




export const RegistrationForm = () => {
  
  // const [captchaValue, setCaptchaValue] = useState(null);
  // const captchaRef = useRef();
  const formRef = useRef();
  const [formData, setFormData] = useState({
  fullName: '',
  email: '',
  phone: '',
  dob: '',
  bloodGroup: '',
  fatherName: '',
  idProof: '', // Add this field
  experiences: [
    {
      experienceType: '',
      organization: '',
      role: '',
      experienceDuration: '',
      year: '',
    },
  ],
  education: [
    {
      institute: '',
      course: '',
      branch: '',
    },
  ],
  addresses: [
    { street: "", city: "", state: "", pincode: "" },
    { street: "", city: "", state: "", pincode: "" },
  ],
});

  const [sameAsCorrespondence, setSameAsCorrespondence] = useState(false);

  const [errors, setErrors] = useState({});

  const handleChange = (e, index = null, section = null) => {
  const { name, value } = e.target;

  // Handle dynamic sections
  if (index !== null && section) {
    if (section === 'experiences') {
      const updatedExperiences = [...formData.experiences];
      updatedExperiences[index][name] = value;
      setFormData({ ...formData, experiences: updatedExperiences });

      if (name === 'year') {
        updatedExperiences.sort((a, b) => {
          const yearA = parseInt(a.year) || 0;
          const yearB = parseInt(b.year) || 0;
          return yearB - yearA;
        });
      }

      setFormData({ ...formData, experiences: updatedExperiences });

    } else if (section === 'education') {
      const updatedEducation = [...formData.education];
      updatedEducation[index][name] = value;
      setFormData({ ...formData, education: updatedEducation });
    }
  } 
  // Handle top-level fields
  else {
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  }
};


  const handleAddressChange = (e, index) => {
  const { name, value } = e.target;
  const updatedAddresses = [...formData.addresses];
  updatedAddresses[index][name] = value;
  setFormData({ ...formData, addresses: updatedAddresses });

  // If correspondence changed and checkbox is ticked, update permanent too
  if (index === 0 && sameAsCorrespondence) {
    updatedAddresses[1] = { ...updatedAddresses[0] };
    setFormData({ ...formData, addresses: updatedAddresses });
  }
};

const handleSameAsCorrespondence = () => {
  const isChecked = !sameAsCorrespondence;
  setSameAsCorrespondence(isChecked);
  if (isChecked) {
    const updatedAddresses = [...formData.addresses];
    updatedAddresses[1] = { ...updatedAddresses[0] };
    setFormData({ ...formData, addresses: updatedAddresses });
  }
};


  const renderError = (field, index = null, section = null) => {
  if (section === 'address') {
    const key = `address_${index}_${field}`;
    return errors[key] && <div className="text-danger small">{errors[key]}</div>;
  }

  if (section === 'experience' && index !== null) {
    const key = `experience_${index}_${field}`;
    return errors[key] && <div className="text-danger small">{errors[key]}</div>;
  }

  if (section === 'education' && index !== null) {
  const key = `education_${index}_${field}`;
  return errors[key] && <div className="text-danger small">{errors[key]}</div>;
}


  return errors[field] && <div className="text-danger small">{errors[field]}</div>;
};

  const validate = () => {
    let tempErrors = {};
    
    // Validate personal details
    if (!formData.fullName?.trim()) {
      tempErrors.fullName = 'Full name is required';
    }
    if (!formData.fatherName?.trim()) {
      tempErrors.fatherName = "Father's name is required";
    }
    if (!formData.dob) {
      tempErrors.dob = 'Date of birth is required';
    }
    if (!formData.bloodGroup) {
      tempErrors.bloodGroup = 'Blood group is required';
    }

    // Validate contact details
    if (!formData.email?.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Enter a valid email address';
    }

    if (!formData.phone?.trim()) {
      tempErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      tempErrors.phone = 'Enter a valid 10-digit phone number';
    }

    // Validate addresses
    formData.addresses.forEach((address, idx) => {
      ['street', 'city', 'state', 'pincode'].forEach((field) => {
        const key = `address_${idx}_${field}`;
        if (!address[field]?.trim()) {
          tempErrors[key] = 'This field is required';
        }
        if (field === 'pincode' && address[field] && !/^\d{6}$/.test(address[field])) {
          tempErrors[key] = 'Enter a valid 6-digit pin code';
        }
      });
    });

    // Validate experiences
    formData.experiences.forEach((exp, index) => {
      ['experienceType', 'organization', 'role', 'experienceDuration', 'year'].forEach((key) => {
        if (!exp[key]?.trim()) {
          tempErrors[`experience_${index}_${key}`] = 'This field is required';
        }
      });
    });

    // Validate education
    formData.education.forEach((edu, index) => {
      ['institute', 'course', 'branch'].forEach((key) => {
        if (!edu[key]?.trim()) {
          tempErrors[`education_${index}_${key}`] = 'This field is required';
        }
      });
    });

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!validate()) return;

    // Validate reCAPTCHA
    // if (!captchaValue) {
    //   setErrors({ ...errors, captcha: 'Please verify the captcha' });
    //   return;
    // }

    try {
      // Generate a unique ID proof if not provided
      const idProof = formData.idProof || `user-${Date.now()}`;

      // Prepare all data for submission
      const submissionData = {
        personal: {
          idProof,
          fullName: formData.fullName,
          DOB: formData.dob,
          bloodGroup: formData.bloodGroup,
          fatherName: formData.fatherName,
        },
        contact: {
          idProof,
          email: formData.email,
          phone: formData.phone,
          addresses: formData.addresses.map(addr => ({
            street: addr.street,
            city: addr.city,
            state: addr.state,
            pincode: addr.pincode
          })),
          sameAsCorrespondence: sameAsCorrespondence,
        },
        education: formData.education.map(edu => ({
          idProof,
          nameOfInstitution: edu.institute,
          courses: edu.course,
          branch: edu.branch,
        })),
        work: formData.experiences.map(exp => ({
          idProof,
          typeOfExperience: exp.experienceType,
          organizationName: exp.organization,
          role: exp.role,
          duration: exp.experienceDuration,
          year: exp.year,
        })),
        // captchaToken: captchaValue,
      };

      console.log('Submitting data:', submissionData);

      // Submit all data in parallel
      const results = await Promise.all([
        createPersonalDetails(submissionData.personal),
        createContactDetails(submissionData.contact),
        ...submissionData.education.map(edu => createEducationalDetails(edu)),
        ...submissionData.work.map(exp => createWorkExperience(exp)),
      ]);

      console.log('Submission results:', results);

      // Success handling
      alert('Registration successful!');
      resetForm();

    } catch (error) {
      console.error('Submission failed:', error);
      setErrors({
        general: error.response?.data?.message || 'Registration failed. Please try again.',
        ...(error.response?.data?.errors || {}),
      });
    }
  };

// Update your resetForm function
const resetForm = () => {
  setFormData({
    name: '',
    email: '',
    phone: '',
    dob: '',
    bloodGroup: '',
    fatherName: '',
    idProof: '',
    experiences: [{
      experienceType: '',
      organization: '',
      role: '',
      experienceDuration: '',
      year: '',
    }],
    education: [{
      institute: '',
      course: '',
      branch: '',
    }],
    addresses: [
      { street: "", city: "", state: "", pincode: "" },
      { street: "", city: "", state: "", pincode: "" },
    ],
  });
  setErrors({});
  // captchaRef.current.reset();
  // setCaptchaValue(null);
};

  const externalSubmit = () => {
    formRef.current.requestSubmit();  // This triggers the form's onSubmit
  };

  const addExperience = () => {
    const newExperience = {
      experienceType: '',
      organization: '',
      role: '',
      experienceDuration: '',
      year: ''
    };
    const updatedExperiences = [...formData.experiences, newExperience];
    setFormData({ ...formData, experiences: updatedExperiences });
  };

  const addEducation = () => {
    const newEducation = {
  institute: '',
  course: '',
  branch: '',
};

    const updatedEducation = [...formData.education, newEducation];
    setFormData({ ...formData, education: updatedEducation });
  }



  const currentYear = new Date().getFullYear();
const yearOptions = [];
for (let i = 0; i < 10; i++) {
  yearOptions.push(currentYear - i);
}


console.log('formData:', formData);

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
                {renderError("bloodGroup")}
              </div>
            </div>



            
              
           <h5 className="mb-3" style={{ color: '#0074c2' }}>Contact Details</h5>

<div className="mb-3 form-check">
  <input
    type="checkbox"
    className="form-check-input"
    id="sameAsCorrespondence"
    checked={sameAsCorrespondence}
    onChange={handleSameAsCorrespondence}
  />
  <label className="form-check-label" htmlFor="sameAsCorrespondence">
    Permanent Address same as Correspondence
  </label>
</div>

{formData.addresses.map((address, index) => (
  <div
    key={index}
    style={{
      borderTop: index !== 0 ? "2px solid #ccc" : "none",
      paddingTop: index !== 0 ? "20px" : "0px",
      marginTop: index !== 0 ? "20px" : "0px"
    }}
  >
    <h6>{index === 0 ? "Correspondence Address" : "Permanent Address"}</h6>

    <div className="row mb-3">
      <div className="col-md-6">
        <label htmlFor={`street${index}`} className="form-label">House No/Street</label>
        <input
          type="text"
          className="form-control"
          id={`street${index}`}
          name="street"
          value={address.street}
          onChange={(e) => handleAddressChange(e, index)}
        />
        {renderError("street", index, "address")}
      </div>

      <div className="col-md-6">
        <label htmlFor={`city${index}`} className="form-label">City</label>
        <input
          type="text"
          className="form-control"
          id={`city${index}`}
          name="city"
          value={address.city}
          onChange={(e) => handleAddressChange(e, index)}
        />
        {renderError("city", index, "address")}
      </div>
    </div>

    <div className="row mb-3">
      <div className="col-md-6">
        <label htmlFor={`state${index}`} className="form-label">State</label>
        <select
          className="form-select"
          id={`state${index}`}
          name="state"
          value={address.state}
          onChange={(e) => handleAddressChange(e, index)}
        >
          <option value="" disabled>Select a State</option>
          <option value="Andhra Pradesh">Andhra Pradesh</option>
          <option value="Arunachal Pradesh">Arunachal Pradesh</option>
          <option value="Assam">Assam</option>
          <option value="Bihar">Bihar</option>
          <option value="Chhattisgarh">Chhattisgarh</option>
          <option value="Goa">Goa</option>
          <option value="Gujarat">Gujarat</option>
          <option value="Haryana">Haryana</option>
          <option value="Himachal Pradesh">Himachal Pradesh</option>
          <option value="Jharkhand">Jharkhand</option>
          <option value="Karnataka">Karnataka</option>
          <option value="Kerala">Kerala</option>
          <option value="Madhya Pradesh">Madhya Pradesh</option>
          <option value="Maharashtra">Maharashtra</option>
          <option value="Manipur">Manipur</option>
          <option value="Meghalaya">Meghalaya</option>
          <option value="Mizoram">Mizoram</option>
          <option value="Nagaland">Nagaland</option>
          <option value="Odisha">Odisha</option>
          <option value="Punjab">Punjab</option>
          <option value="Rajasthan">Rajasthan</option>
          <option value="Sikkim">Sikkim</option>
          <option value="Tamil Nadu">Tamil Nadu</option>
          <option value="Telangana">Telangana</option>
          <option value="Tripura">Tripura</option>
          <option value="Uttar Pradesh">Uttar Pradesh</option>
          <option value="Uttarakhand">Uttarakhand</option>
          <option value="West Bengal">West Bengal</option>
          <option value="Delhi">Delhi</option>
          <option value="Jammu and Kashmir">Jammu and Kashmir</option>
          <option value="Ladakh">Ladakh</option>
          <option value="Puducherry">Puducherry</option>
        </select>
        {renderError("state", index, "address")}
      </div>

      <div className="col-md-6">
        <label htmlFor={`pincode${index}`} className="form-label">Pin Code</label>
        <input
          type="tel"
          className="form-control"
          id={`pincode${index}`}
          name="pincode"
          value={address.pincode}
          onChange={(e) => handleAddressChange(e, index)}
        />
        {renderError("pincode", index, "address")}
      </div>
    </div>
  </div>
))}









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
            
            <h5 className="mb-3" style={{ color: '#0074c2' }}>Educational Details</h5>

{formData.education.map((edu, index) => (
  <div key={index}
       style={{
         borderTop: index !== 0 ? "2px solid #ccc" : "none",
         paddingTop: index !== 0 ? "20px" : "0px",
         marginTop: index !== 0 ? "20px" : "0px"
       }}>
    
    <div className="row mb-3">
      <div className="col-md-6">
        <label htmlFor="institute" className="form-label">Name of Institute</label>
        <input
          type="text"
          className="form-control"
          name="institute"
          value={edu.institute}
          onChange={(e) => handleChange(e, index, 'education')}
          placeholder="Institute Name"
        />
        {renderError("institute", index)}
      </div>
    </div>

    <div className="row mb-3">
      <div className="col-md-6">
        <label htmlFor="course" className="form-label">Course</label>
        <select
          className="form-select"
          name="course"
          value={edu.course}
          onChange={(e) => handleChange(e, index, 'education')}>
          <option value="" disabled>Select a Course</option>
          <option value="btech">B.Tech</option>
          <option value="bca">BCA</option>
          <option value="mba">MBA</option>
        </select>
        {renderError("course", index)}
      </div>

      <div className="col-md-6">
        <label htmlFor="branch" className="form-label">Branch</label>
        <select
          className="form-select"
          name="branch"
          value={edu.branch}
          onChange={(e) => handleChange(e, index, 'education')}>
          <option value="" disabled>Select a Branch</option>
          <option value="cse">CSE</option>
          <option value="csse">CSSE</option>
          <option value="it">IT</option>
        </select>
        {renderError("branch", index)}
      </div>
    </div>
  </div>
))}

<div className="mb-4">
  <button
    type="button"
    className="btn btn-outline-primary"
    onClick={addEducation}
  >
    + Add Educational Details
  </button>
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
  <div
    key={index}
    style={{
      borderTop: index !== 0 ? "2px solid #ccc" : "none",
      paddingTop: index !== 0 ? "20px" : "0px",
      marginTop: index !== 0 ? "20px" : "0px",
    }}
  >
    <div className="row mb-3">
      <div className="col-md-6">
        <label htmlFor="experienceType" className="form-label">
          Type of Experience
        </label>
        <select
          className="form-select"
          id="experienceType"
          name="experienceType"
          value={exp.experienceType}
          onChange={(e) => handleChange(e, index, 'experiences')}
        >
          <option value="" disabled>
            Select
          </option>
          <option value="Internship">Internship</option>
          <option value="Part-time Job">Part-time Job</option>
          <option value="Academic Project">Academic Project</option>
        </select>
        {renderError("experienceType", index, "experience")}
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
          onChange={(e) => handleChange(e, index, 'experiences')}
          placeholder="Company name"
        />
        {renderError("organization", index, "experience")}
      </div>

      <div className="col-md-6">
        <label className="form-label">Role</label>
        <input
          type="text"
          className="form-control"
          name="role"
          value={exp.role}
          onChange={(e) => handleChange(e, index, 'experiences')}
          placeholder="Your role"
        />
        {renderError("role", index, "experience")}
      </div>
    </div>

    <div className="row mb-3">
      <div className="col-md-6">
        <label htmlFor="experienceDuration" className="form-label">
          Duration of Experience
        </label>
        <select
          className="form-select"
          id="experienceDuration"
          name="experienceDuration"
          value={exp.experienceDuration}
          onChange={(e) => handleChange(e, index, 'experiences')}
        >
          <option value="" disabled>
            in Months
          </option>
          {[...Array(9).keys()].map((i) => (
            <option key={i} value={i === 0 ? "<1" : i}>{i === 0 ? "Less than 1 month" : i}</option>
          ))}
        </select>
        {renderError("experienceDuration", index, "experience")}
      </div>

      <div className="col-md-6">
        <label htmlFor="year" className="form-label">
          Year
        </label>
        <select
          className="form-select"
          id="year"
          name="year"
          value={exp.year}
          onChange={(e) => handleChange(e, index, 'experiences')}
        >
          <option value="" disabled>
            Select Year
          </option>
          {yearOptions.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        {renderError("year", index, "experience")}
      </div>
    </div>
  </div>
))
}

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


        


        {/* <ReCAPTCHA
          sitekey="6LeFLS8rAAAAAJ-w7XadNVSyr7Y7h4NLIJjNR8tb"
          onChange={handleCaptchaChange}
          ref={captchaRef}
        />
        {errors.captcha && <div className="text-danger small">{errors.captcha}</div>} */}


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
  