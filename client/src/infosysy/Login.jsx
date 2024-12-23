
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { toast,ToastContainer} from 'react-toastify';
 import bcrypt from "bcryptjs";
const Login = () => {
  const [isSignIn, setIsSignIn] = useState(false);
  const [logindata, setLogindata] = useState({});
  const [signupdata, setSignupdata] = useState({});
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState('');
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isPasswordCheck, setIsPasswordCheck] = useState(false); 
  const [isPasswordEntered, setIsPasswordEntered] = useState(false);
  const [isPasswordReEntered,setIsPasswordReEntered]=useState(false); 
  const [isUsernameCheck,setIsUserNameCheck]=useState(false);// Email verification state
  const [touchedName,setIstouchedName]=useState(false);
  const [touchedpassword,setIstouchedpassword]=useState(false);
  const [touchedRepassword,setIstouchedRepassword]=useState(false);
  const navigate = useNavigate();


 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
  
    const handleOpenModal = () => {
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
      setMessage("");
      setEmail("");
    };
  
    const handleSubmitEmail = async () => {
      if (!email) {
        setMessage("Please enter a valid email.");
        return;
      }
     alert(email)
      try {
        const response = await fetch("http://localhost:9000/password-reset/request", {
          method: "POST",
          headers: {
           "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            email: email, 
          }),
        });
  
        if (response.ok) {
          setMessage("Password reset link has been sent to your email.");
        } else {
          setMessage("Failed to send email. Please try again.");
        }
      } catch (error) {
        setMessage("An error occurred. Please try again.");
      }
    };
  //const register_id=sessionStorage.getItem("register_id")
  
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const signup = queryParams.get('signup');
    setIsSignIn(!(signup === 'true'));  // Set isSignUp based on query param
  }, [location]);
const checkPassword=()=>{
if(signupdata.password!=signupdata.reEnterpassword){
 setIsPasswordCheck(false);
}else{
  setIsPasswordCheck(true);
}

}
const checkUserName=()=>{
if(signupdata.username.length>=6 && signupdata.username.length<=20){
  setIsUserNameCheck(true);
}else{
  setIsUserNameCheck(false)
}
setIstouchedName(true)
}
const checkPasswordEntered=()=>{
  if(!signupdata.password){
    return;
  }
  if(signupdata.password.length>=8 && signupdata.password.length<=15){
    setIsPasswordEntered(true)
    console.log("true")
  }
  else{
    setIsPasswordEntered(false)
    console.log("false")
  }
  setIstouchedpassword(true)
}
const checkRePasswordEntered=()=>{
  if(signupdata.reEnterpassword.length>=8 & signupdata.reEnterpassword.length<=15){
    setIsPasswordReEntered(true)
    console.log("true")
  }
  else{
    setIsPasswordReEntered(false)
    console.log("false")
  }
  setIstouchedRepassword(true)
}
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogindata((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupdata((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
   // logindata.password=await bcrypt.hash(logindata.password, 10);
    try {
      const response = await fetch("http://localhost:9000/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(logindata),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Store token and login_id in sessionStorage
        sessionStorage.setItem("register_id", data.register_id);
       // Store login_id in session storage
        toast.success("Login Successfull");
        setInterval(()=>{
          navigate("/dashboard");
        },2000); // Redirect to the dashboard
      } else {
        toast.error(data.message || "Invalid UserName or Password");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
  signupdata.password=await bcrypt.hash(signupdata.password,10)
    try {
      const response = await fetch("http://localhost:9000/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupdata),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        toast.success("Sign-up successful! Please sign in.");
        setIsSignIn(true); // Switch to login form
      } else {
        toast.error(data.message || "Sign-up failed!");
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const showSignIn = () => setIsSignIn(true);
  const showSignUp = () => setIsSignIn(false);

  const submitEmail = async (e) => {
    
    e.preventDefault();
    
    const email = signupdata.email;

    try {
      const res = await fetch("http://localhost:9000/emailcheck", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      const data = await res.json();
      if (data.present) {
        alert("Email already present");
      } else {
        setShowOtp(true); 
        try {
          alert("Sending mail...");
          const emailRes = await fetch("http://localhost:9000/sendemail", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email })
          });
          const emailData = await emailRes.json();
          toast.success(emailData.message);
          setIsEmailVerified(true); // Email is verified
        } catch (error) {
          toast.error("Error while sending OTP email.");
        }
      }
    } catch (error) {
      console.error("Error during email check:", error);
    }
  };

  const submitOtp = async (e) => {
    e.preventDefault();
    const email=signupdata.email;
    const otp1=otp.toString()
    

    try {
      const res = await fetch("http://localhost:9000/otpverify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({email, otp:otp1 })
      });

      const data = await res.json();
     
      if (data.success) {
        setIsOtpVerified(true);
        toast.success("otp is successfully verified") // OTP is verified
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (error) {
      toast.error("Error during OTP verification.");
    }
  };

// const isSignInButtonDisabled = !(isEmailVerified && isOtpVerified );

  return (
    <div className="bg-blue-50 flex flex-col items-center justify-start min-h-screen">
      <ToastContainer/>
      {/* Logo Section */}
      <div className="mt-8 mb-4">
        <img src="https://www.kindpng.com/picc/m/325-3256817_financial-management-logo-png-transparent-png.png" alt="FMS Logo" className="h-24 mx-auto" />
      </div>
      <br /> <br />
      {/* Login/Sign-up Form Section */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl">
        {isSignIn ? (
          <div className="flex flex-col md:flex-row">
            {/* Left Side */}
            <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center">
              <h2 className="text-3xl font-bold text-blue-800 mb-4">Sign In</h2>
              <form onSubmit={handleLoginSubmit}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleLoginChange}
                  required
                  className="border border-gray-300 p-2 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleLoginChange}
                  required
                  className="border border-gray-300 p-2 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="mb-4 text-blue-700"><a href="/login?signup=true" >Don't have an account?</a></p>
                <p className="mb-4 text-blue-700">
        <a href="#" onClick={handleOpenModal}>
          Forgot password?
        </a>
      </p>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-6 w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold mb-4">Forgot Password</h2>
            <input
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            {message && (
              <p className="text-sm mb-4 text-red-500">{message}</p>
            )}
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleCloseModal}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitEmail}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
 

                <button
                  type="submit"
                  className="bg-blue-800 text-white px-6 py-2 rounded-full font-semibold transition duration-300 ease-in-out transform hover:scale-105"
                //  disabled={isSignInButtonDisabled}
                >
                  SIGN IN
                </button>
              </form>
            </div>
            {/* Right Side */}
            <div className="w-full md:w-1/2 bg-blue-800 text-white p-8 flex flex-col justify-center items-center">
              <h2 className="text-3xl font-bold mb-4">Hello!</h2>
              <p className="mb-8 text-center">
                Enter your personal details to start your journey with us.
              </p>
              <button
                onClick={showSignUp}
                className="bg-white text-blue-800 px-6 py-2 rounded-full font-semibold transition duration-300 ease-in-out transform hover:scale-105"
              >
                SIGN UP
              </button>
            </div>
            
          </div>
        ) : (
          <div className="flex flex-col md:flex-row">
            {/* Left Side */}
            <div className="w-full md:w-1/2 bg-blue-800 text-white p-8 flex flex-col justify-center items-center">
              <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
              <p className="mb-8 text-center">
                To keep connected, please sign in with your personal info.
              </p>
              <button
                onClick={showSignIn}
                className="bg-white text-blue-800 px-6 py-2 rounded-full font-semibold transition duration-300 ease-in-out transform hover:scale-105"
              >
                SIGN IN
              </button>
            </div>
            {/* Right Side */}
            <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center">
              <h2 className="text-3xl font-bold text-blue-800 mb-4">
                Create Account
              </h2>
              <form onSubmit={handleSignupSubmit}>
             <p className={`text-red-500 text-xs ${!isUsernameCheck&&touchedName? 'block' : 'hidden'}`}>**Username should contain 6-20 letters**</p>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  required
                  onChange={handleSignupChange}
                   onBlur={checkUserName}
                  
                  className="border border-gray-300 p-2 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className={`text-red-500 text-xs ${!isPasswordCheck&&touchedpassword&&touchedRepassword ? 'block' : 'hidden'}`}>
                     **Password and Re-Enter Password Should be Same
                 </p> <p className={`text-blue-500 text-xs ${!isPasswordEntered&&touchedpassword ? 'block' : 'hidden'}`}>
                     **Password should be 8-15 letters
                 </p>

                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleSignupChange}
                    onBlur={()=>{checkPasswordEntered()}}
                  required
                  className="border border-gray-300 p-2 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className={`text-blue-500 text-xs ${!isPasswordReEntered&&touchedRepassword? 'block' : 'hidden'}`}>
                     **Re-Enter Password should be 8-15 letters
                 </p>
                  <input
                  type="password"
                  name="reEnterpassword"
                  placeholder="Re-Enter Password"
                  onChange={handleSignupChange}
                  onBlur={()=>{checkRePasswordEntered();checkPassword()}}
                  
               
                  
                  
                  required
                  className="border border-gray-300 p-2 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
             
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email ID"
                    onChange={handleSignupChange}
                    required
                    className="border border-gray-300 p-2 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit" onClick={submitEmail}
                    className="bg-blue-800 text-white px-2 py-1 rounded-full font-semibold transition duration-300 ease-in-out transform hover:scale-105 color-white"
                  >
                    <i className="fas fa-check" style={{ fontSize: '20px', color: 'green' }}></i>
                  </button>
                </div>
                {showOtp && (
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <label>Enter OTP:</label>
                    <input
                      type="text"
                      maxLength="6"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter 6-digit OTP"
                      required
                    />
                    <button
                      type="submit" onClick={submitOtp}
                      className="bg-blue-800 text-white px-2 py-1 rounded-full font-semibold transition duration-300 ease-in-out transform hover:scale-105 color-white"
                    >
                      <i className="fas fa-check" style={{ fontSize: '20px', color: 'green' }}></i>
                    </button>
                  </div>
                )}
     
     <button
  type="submit"
  className={`bg-blue-800 text-white px-6 py-2 rounded-full font-semibold transition duration-300 ease-in-out transform 
    ${!isEmailVerified || !isOtpVerified || !isPasswordCheck || !isPasswordEntered || !isPasswordReEntered || !isUsernameCheck 
    ? 'cursor-not-allowed opacity-50' 
    : 'hover:scale-105'}`}
  disabled={!isEmailVerified || !isOtpVerified || !isPasswordCheck || !isPasswordEntered || !isPasswordReEntered || !isUsernameCheck}
>
  SIGN UP
</button>


 

              </form>
            </div>
          </div>
        )}
      </div>
   
    </div>
  );
};

export default Login;
