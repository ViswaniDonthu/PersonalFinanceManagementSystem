
import {useState,useEffect} from "react"
function Footer() { 
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
       
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
  
    fetchUserData();
  }, []);
  

  return (
    <>
      <br /> <br />
      
      <footer className="bg-blue-900 text-white p-3 h-16 w-full z-50 fixed bottom-0 left-0 right-0 flex flex-col sm:flex-row justify-between items-center shadow-lg">
        {/* Username on the left */}
        <div className="ml-4 bg-blue-200 rounded-md px-4 py-2 text-black flex items-center justify-between w-full sm:w-auto mb-4 sm:mb-0 shadow-md">
          <span className="text-lg sm:text-xl font-semibold">{username}</span>
          
          <span className="ml-2">
            <img  
              className="hidden sm:block h-8 w-9 rounded-full border-2 border-white cursor-pointer transition-transform transform hover:scale-110"
              src="https://www.pngitem.com/pimgs/m/24-248631_blue-profile-logo-png-transparent-png.png"
              alt="Profile"
            />
          </span>
        </div>

        {/* Footer content centered */}
        <p className="text-center w-full sm:w-auto mt-4 sm:mt-0 text-sm sm:text-base font-medium">© 2024 Company Name. All Rights Reserved.</p>
      </footer>
    </>
  );
}

export default Footer;
