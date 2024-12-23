
import { useState, useEffect } from "react";

function Navbar({ setSidebarVisible }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const register_id=sessionStorage.getItem("register_id");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:9000/getUserName/${register_id}`);
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const username = await response.text(); // Use response.text() since the response is a plain string
        console.log("Fetched username:", username);
        sessionStorage.setItem("username",username);
       setUsername(username);
        // Use the username as needed (e.g., setting it in state)
        // Example: setUsername(username);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
  
    fetchUserData();
  }, []);
  

  const handleLogout = () => {
    // Clear session storage and notify user
    sessionStorage.removeItem("register_id");

    alert("You have been logged out successfully.");
    
    // Redirect to login page (adjust the URL as needed)
    window.location.href = "/login";
  };

  return (
    <>
      <nav className="bg-blue-900 text-white p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50">
        {/* Logo Section */}
        <div className="flex items-center">
          <img
            src="https://www.kindpng.com/picc/m/325-3256817_financial-management-logo-png-transparent-png.png"
            alt="Company logo"
            className="h-10 w-10 mr-2"
          />
          <h1 className="text-xl font-bold">Fintrack</h1>
        </div>

        {/* Search Bar, User Info, and Menu Button */}
        <div className="flex items-center space-x-4">
          {/* Search bar (hidden on small screens) */}
          <div className="relative hidden sm:flex items-center">
          {/* <button className="bg-blue-700 p-2 rounded-r-md">
             <i className="fas fa-search"></i>
           </button> */}
            
          <h1 style={{"paddingRight":"24px","fontSize":"24px"}}>Hello! {username}</h1>
        
            <input
           
              type="text"
              placeholder="Search..."
              className="p-2 rounded-l-md"
              style={{ color: "black" }}
             
            />
            
          </div>

          {/* Profile photo (visible on large screens) */}
          <img
            src="https://www.pngitem.com/pimgs/m/24-248631_blue-profile-logo-png-transparent-png.png"
            alt="Profile"
            className="hidden sm:block h-10 w-10 rounded-full border-2 border-white cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          />

          {/* Menu button (visible on small screens) */}
          <button
            className="sm:hidden text-white p-2 ml-auto"
            onClick={() => setSidebarVisible((prev) => !prev)}
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </nav>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 text-center">
            <img
              src="https://www.pngitem.com/pimgs/m/24-248631_blue-profile-logo-png-transparent-png.png"
              alt="User Profile"
              className="h-20 w-20 rounded-full mx-auto mb-4 border-4 border-blue-900"
            />
            {/* Dynamically display the username */}
            <h2 className="text-lg font-bold mb-4">{username || "Loading..."}</h2>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg w-full"
              onClick={handleLogout}
            >
              Logout
            </button>
            <button
              className="mt-4 text-gray-500 underline"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
