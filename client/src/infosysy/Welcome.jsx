
// import { useNavigate } from "react-router-dom";

// function Welcome() {
//     const navigate = useNavigate();

//     const handleSignUp = () => navigate("/login?signup=true");
//     const handleSignIn = () => navigate("/login");
//     const register_id=sessionStorage.getItem("register_id");
//     if(register_id){
//         navigate("/dashboard");
//         }
//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-green-500 text-white">
//             <div className="max-w-4xl mx-auto p-8 bg-white bg-opacity-90 rounded-lg shadow-2xl transform transition duration-500 hover:scale-105">
//                 <div className="text-center">
//                     {/* Logo */}
//                     <div className="mb-6">
//                         <img
//                           //  src="https://img.freepik.com/premium-vector/finance-management-logo-design-template_605910-491.jpg?w=2000"
//                           src="https://www.kindpng.com/picc/m/325-3256817_financial-management-logo-png-transparent-png.png"
//                           alt="FMS Logo"
//                             className="h-16 mx-auto animate-bounce "
//                         />
//                     </div>
//                     {/* Title */}
//                     <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
//                         Welcome to <span className="text-blue-600">FMS</span>
//                         <br />
//                         <span className="text-lg md:text-xl font-normal">
//                             (Financial Management System)
//                         </span>
//                     </h1>
//                     {/* Description */}
//                     <p className="text-gray-700 text-md md:text-lg mb-8 leading-relaxed">
//                         Simplify your finances with our comprehensive platform. 
//                         Track expenses, monitor investments, and achieve your financial goals all in one place.
//                     </p>
//                     {/* Buttons */}
//                     <div className="flex justify-center space-x-4 mb-6">
//                         <button
//                             className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 hover:shadow-lg transform hover:scale-105 transition duration-300"
//                             onClick={handleSignUp}
//                         >
//                             Sign Up
//                         </button>
//                         <button
//                             className="bg-green-500 text-white px-6 py-3 rounded-lg shadow hover:bg-green-600 hover:shadow-lg transform hover:scale-105 transition duration-300"
//                             onClick={handleSignIn}
//                         >
//                             Sign In
//                         </button>
//                     </div>
                  
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Welcome;
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Welcome() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSignUp = () => navigate("/login?signup=true");
    const handleSignIn = () => navigate("/login");

    const register_id = sessionStorage.getItem("register_id");

    useEffect(() => {
        if (register_id) {
            setLoading(true);
            setTimeout(() => {
                navigate("/dashboard");
            }, 1000); // Show a 1-second delay to display the transition
        }
    }, [register_id, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-green-500 text-white">
            <div className="max-w-4xl mx-auto p-8 bg-white bg-opacity-90 rounded-lg shadow-2xl transform transition duration-500 hover:scale-105">
                <div className="text-center">
                    {/* Logo */}
                    <div className="mb-6">
                        <img
                            src="https://www.kindpng.com/picc/m/325-3256817_financial-management-logo-png-transparent-png.png"
                            alt="FMS Logo"
                            className="h-16 mx-auto animate-bounce"
                        />
                    </div>
                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
                        Welcome to <span className="text-blue-600">FMS</span>
                        <br />
                        <span className="text-lg md:text-xl font-normal">
                            (Financial Management System)
                        </span>
                    </h1>
                    {/* Description */}
                    <p className="text-gray-700 text-md md:text-lg mb-8 leading-relaxed">
                        Simplify your finances with our comprehensive platform. 
                        Track expenses, monitor investments, and achieve your financial goals all in one place.
                    </p>

                    {/* Loading state */}
                    {loading ? (
                        <div className="text-xl text-gray-800">Redirecting to dashboard...</div>
                    ) : (
                        <div className="flex justify-center space-x-4 mb-6">
                            <button
                                className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 hover:shadow-lg transform hover:scale-105 transition duration-300"
                                onClick={handleSignUp}
                            >
                                Sign Up
                            </button>
                            <button
                                className="bg-green-500 text-white px-6 py-3 rounded-lg shadow hover:bg-green-600 hover:shadow-lg transform hover:scale-105 transition duration-300"
                                onClick={handleSignIn}
                            >
                                Sign In
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Welcome;
