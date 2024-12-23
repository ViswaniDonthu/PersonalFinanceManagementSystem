import  { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./loginreact.css";
//import axios from "axios";
import { FaGoogle, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import {useNavigate} from 'react-router-dom';
const LoginSignup = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
 // const [showPassword3, setShowPassword3] = useState(false);
  const [details, setDetails] = useState([]);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  // Formik for Login Form
  const loginFormik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("name is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .max(16, "Password cannot exceed 16 characters")
        .matches(/[a-zA-Z]/, "Password must contain at least one letter")
        .matches(/\d/, "Password must contain at least one number")
        .matches(/[!@#$%^&*]/, "Password must contain at least one special character")
        .required("Password is required")
    }),
    // onSubmit: (values) => {

    //   alert("Login form submitted");
    // },
    // validateOnBlur: true,
    // validateOnChange: true
  /*  onSubmit: async (values) => {
      try {
        const response = await axios.post("http://localhost:9000/log", values);
        if (response.status === 200) {
          alert("Login successful");
        }
      } catch (error) {
        alert("Login failed. Please try again.");
      }
    },*/
    onSubmit: async (values) => {
       try {
      //   const response = await fetch("http://localhost:9000/log", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(values),
      //   });
      alert(values.email);
     // alert(values.password);
        const response = await fetch("http://localhost:9000/log", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          
          body: JSON.stringify({ username: values.email, password: values.password }),
      });
        if (response.ok) {
          const result = await response.text();
          alert(result);
          navigate('/dashboard')
          setDetails([...details, { Name: values.email, Email: values.password }]);
        } else {
          alert("login failed, please try again.");
        }
      } catch (error) {
        alert("Error connecting to server.");
      }
    },
    validateOnBlur: true,
    validateOnChange: true
  });
  
  

  // Formik for Signup Form
  const signUpFormik = useFormik({
    initialValues: {
      name: '',
     // email: '',
      password: '',
     // repassword: ''
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(6, "Name must be between 6 and 16 characters")
        .max(16, "Name cannot exceed 16 characters")
        .required("Name is required"),
    //  email: Yup.string()
      //  .email("Invalid email format")
      //  .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .max(16, "Password cannot exceed 16 characters")
        .matches(/[a-zA-Z]/, "Password must contain at least one letter")
        .matches(/\d/, "Password must contain at least one number")
        .matches(/[!@#$%^&*]/, "Password must contain at least one special character")
        .required("Password is required"),
      // repassword: Yup.string()
      //   .oneOf([Yup.ref("password"), null], "Passwords must match")
      //   .required("Please confirm your password"),
    }),
   /* onSubmit: (values) => {
      const newUser = { Name: values.name, Email: values.email, Password: values.password };
      setDetails([...details, newUser]);

      alert("Signup form submitted");
    },*/
    onSubmit: async (values) => {
      try {
        const response = await fetch("http://localhost:9000/save", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
    
        if (response.ok) {
          const result = await response.text();
          alert(result); // Show success message
          setDetails([...details, { Name: values.name, Email: values.email }]);
        } else {
          alert("Signup failed, please try again.");
        }
      } catch (error) {
        alert("Error connecting to server.");
      }
    },
    
    validateOnBlur:true,
    validateOnChange:true

  });

  return (
    <div className="body">
    <div className="page-container">
      {isLogin ? (
        <div className="form-container">
          <div className="page1">
            <h1>Log In</h1>
             
            <p>or use your account</p>
            <form onSubmit={loginFormik.handleSubmit}>
              <input
                type="text"
                name="email"
                placeholder="name"
                value={loginFormik.values.email}
                onChange={loginFormik.handleChange}
                onBlur={loginFormik.handleBlur}
                required
              />
              {loginFormik.touched.email && loginFormik.errors.email ? (
                <div className="error">{loginFormik.errors.email}</div>
              ) : null}
              <br />
              <div className="icon">
                <input
                  type={showPassword1 ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={loginFormik.values.password}
                  onChange={loginFormik.handleChange}
                  onBlur={loginFormik.handleBlur}
                  required
                />
                <span onClick={() => setShowPassword1(!showPassword1)}>
                
                </span>
              </div>
              {loginFormik.touched.password && loginFormik.errors.password ? (
                <div className="error">{loginFormik.errors.password}</div>
              ) : null}
              <p>Forgot your password?</p>
              <input type="submit" value="Log In" />
            </form>
          </div>
          <div className="content">
            <h1>Hello, Friend!</h1>
            <p>Join our community! Sign up now for exclusive deals!</p>
            <a onClick={toggleForm}>Sign Up</a>
          </div>
        </div>
      ) : (
        <div className="form-container">
          <div className="content">
            <h1>Hello, Friend!</h1>
            <p>Already have an account? Login here.</p>
            <a onClick={toggleForm}>Login</a>
          </div>
          <div className="signuppage">
            <h1>Sign Up</h1>
             <div className="social-icons">
              <FaGoogle size={25} style={{ color: '#DB4437', margin: "0 10px", cursor: "pointer" }} />
              <FaFacebookF size={25} style={{ color: '#4267B2', margin: "0 10px", cursor: "pointer" }} />
              <FaLinkedinIn size={25} style={{ color: '#0077B5', margin: "0 10px", cursor: "pointer" }} />
            </div> 
            <p>or use your account</p>
            <form onSubmit={signUpFormik.handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={signUpFormik.values.name}
                onChange={signUpFormik.handleChange}
                onBlur={signUpFormik.handleBlur}
                required
                className="a"
              />
              {signUpFormik.touched.name && signUpFormik.errors.name ? (
                <div className="error">{signUpFormik.errors.name}</div>
              ) : null}
              <br />
              {/* <input
                type="email"
                name="email"
                placeholder="Email"
                value={signUpFormik.values.email}
                onChange={signUpFormik.handleChange}
                onBlur={signUpFormik.handleBlur}
                required
                className="a"
              /> */}
              {signUpFormik.touched.email && signUpFormik.errors.email ? (
                <div className="error">{signUpFormik.errors.email}</div>
              ) : null}
              <br />
              <div className="icon">
                <input
                  type={showPassword2 ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={signUpFormik.values.password}
                  onChange={signUpFormik.handleChange}
                  onBlur={signUpFormik.handleBlur}
                  required
                  className="a"
                />
                <span onClick={() => setShowPassword2(!showPassword2)}>
                 
                </span>
              </div>
              {signUpFormik.touched.password && signUpFormik.errors.password ? (
                <div className="error">{signUpFormik.errors.password}</div>
              ) : null}
             
              <div className="icon">
                {/* <input
                  type={showPassword3 ? "text" : "password"}
                  name="repassword"
                  placeholder="Re-enter Password"
                  value={signUpFormik.values.repassword}
                  onChange={signUpFormik.handleChange}
                  onBlur={signUpFormik.handleBlur}
                  required
                  className="a"
                /> */}
              </div>
              {signUpFormik.touched.repassword && signUpFormik.errors.repassword ? (
                <div className="error">{signUpFormik.errors.repassword}</div>
              ) : null}
              <br />
              <input type="submit" value="Sign Up" className="a" />
            </form>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default LoginSignup;
