import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const initialValues = { username: "", email: "", password: "", mobile: "", gender: "", hobby: [], city: "", address: ""};
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    console.log(e)
    if (e.target.name === 'hobby') {

      let copy = { ...formValues }

      if (e.target.checked) {
        copy.hobby.push(e.target.value)
      } else {
        copy.hobby = copy.hobby.filter(e => e !== e.target.value)
      }

      setFormValues(copy)

    } else {
    const { name, value } = e.target;
     setFormValues({ ...formValues, [name]: value });
      }
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex1 = /^[0-9\b]+$/;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
     if (!values.username) {
       errors.username = "Username is required!";
     }
     if (!values.email) {
       errors.email = "Email is required!";
     } else if (!regex.test(values.email)) {
       errors.email = "This is not a valid email format!";
     }
     if (!values.password) {
       errors.password = "Password is required";
     } else if (values.password.length < 6) {
       errors.password = "Password must be more than 6 characters";
     } else if (values.password.length > 16) {
       errors.password = "Password cannot exceed more than 10 characters";
     }
     if (!regex1.test(values.mobile)) {
      errors.mobile = "This is not a valid mobile formate!";
    } else if (values.mobile.length < 10) {
      errors.mobile = "mobile is required!";
    }
     if (values.gender ===  "") {
         errors.gender = "plese select any one filed";
    }
     if (!values.address) {
           errors.address = "plesefill the filed of address";
    }
    if (!values.city === "") {
      errors.city = 'Any one city required!'
    }
    if (formValues.hobby.length < 1) {
      errors.hobby = 'At list one hobby must be selected'
    }

    return errors;
  };
useEffect(() => {})
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Form Validation</h1>
        <div className="divider"></div>
        <div>
                  <div className="d-flex mt-4">
          <div className="d-flex col-10">
  <div className='title'><h5>Name :</h5></div>
            <input type="text" name="username" placeholder="Username" value={formValues.username} onChange={handleChange} style={{ color: 'blue', width: '900px' }} ></input>
          </div>
          <p>{formErrors.username}</p>
          </div>
          <div className="d-flex mt-4">
          <div className="d-flex col-5">
  <div className='title'><h5>Email :</h5></div>
            <input type="text" name="email"  placeholder="Email"  value={formValues.email} onChange={handleChange}
            ></input>
          </div>
          <p>{formErrors.email}</p>
          </div>
          <div className='d-flex col-6 mt-4'>
          <div className="title">
            <h5>Password :</h5></div>
            <input type="password" name="password" placeholder="Password" value={formValues.password} onChange={handleChange}
            ></input>
          
          </div>
          <p>{formErrors.password}</p>
          <div className='d-flex col-5'>
            <div className='title'><h5>Contact :</h5></div>
            <div><input type='text' name="mobile" placeholder='enter your number' style={{ color: 'blue', width: '280px' }} value={formValues.mobile} onChange={handleChange}></input></div>
          </div>
          <p>{formErrors.mobile}</p>
          <div className='d-flex mt-4'>
            <div className='col-4 d-flex'>         
             <div className='title col-3'><h5>Gender :</h5></div>
          <div className='col-3'>
          <input type="radio" name="gender" value="male" onChange={handleChange} checked={formValues.gender == 'male'} />
              <label htmlFor="male">Male</label>
            </div>
            <div>
              <input type="radio" name="gender" value="female" onChange={handleChange} checked={formValues.gender == 'female'} />
              <label htmlFor="female">Female</label>
            </div>
            </div>
            </div>
            <p>{formErrors.gender}</p>
            <div className='col-4 d-flex'>
            <div className='title col-2'><h5>Hobby :</h5></div>
           <div className='d-flex mx-5 col-12'>           <input type='checkbox' name='hobby' value='fighting' onChange={handleChange} checked={formValues.hobby.indexOf('hobby') !== -1} ></input><label>fighting</label>
           <input type='checkbox' name='hobby' value='eating' onChange={handleChange} checked={formValues.hobby.indexOf('hobby') !== -1} ></input><label>eating</label>
           <input type='checkbox' name='hobby' value='nothing' onChange={handleChange} checked={formValues.hobby.indexOf('hobby') !== -1} ></input><label>nothing</label>
           <input type='checkbox' name='hobby' value='sleep' onChange={handleChange} checked={formValues.hobby.indexOf('hobby') !== -1} ></input><label>sleep</label>
           <input type='checkbox' name='hobby' value='Full Day Time Pass' onChange={handleChange} checked={formValues.hobby.indexOf('hobby') !== -1} ></input><label>Full Day Time Pass</label>
            </div>
            </div>

            <p>{formErrors.hobby}</p>
            <div className='col-4 d-flex'>
            <div className='title col-2'><h5>City :</h5></div>
               <select className="form-select" name="city" onChange={handleChange} value={formValues.city}>
            <option value="surat">surat</option>
            <option value="ahemdabad">ahemdabad</option>
            <option value="vapi">vapi</option>
            <option value="tapi">tapi</option>
          </select>
            </div>
            <p>{formErrors.city}</p>
            <div className='col-12 d-flex'>
            <div className='col-2 title'><h5>Address :</h5></div>
            <div className='col-8'>
              <textarea name='address' style={{ color: 'blue', height: '100px',width: '800px', lineHeight: '20px' }}  onChange={handleChange} value={formValues.address}></textarea>
            </div> 
          </div>
          <p>{formErrors.address}</p>
         
          <button className="fluid ui button blue">Submit</button>
          
        </div>
      </form>
    </div>
  );
}

export default App;