
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./infosysy/Navbar";
import Sidebar from "./infosysy/Sidebar";
import Footer from "./infosysy/Footer";
import Dashboard from "./infosysy/Dashboard";
import Transactions from "./infosysy/Transactions";
import Bills from "./infosysy/Bills";
import Expenses from "./infosysy/Expenses";
import Goals from "./infosysy/Goals";
import Balance from "./infosysy/Balance";
import Welcome from "./infosysy/Welcome";
import Login from "./infosysy/Login";

import { ToastContainer} from "react-toastify";

import ResetPasswordForm from './infosysy/ResetPassword';

import {useState} from "react"
function App() {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/password-reset/form" element={<ResetPasswordForm />} />
          {/* Main layout for all users */}
          <Route
            path="*"
            element={
              <>
                {/* Navbar */}
                <Navbar setSidebarVisible={setSidebarVisible} />

                {/* Main content */}
                <div className="flex flex-1 bg-gray-100">
                  {/* Sidebar */}
                  <Sidebar
                    sidebarVisible={sidebarVisible}
                    setSidebarVisible={setSidebarVisible}
                  />

                  {/* Content area */}
                  <main className="flex-1 p-6 bg-gray-100 ml-0 sm:ml-64">
                    <Routes>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/transactions" element={<Transactions />} />
                      <Route path="/bills" element={<Bills />} />
                      <Route path="/expenses" element={<Expenses />} />
                      <Route path="/goals" element={<Goals />} />
                      <Route path="/balance" element={<Balance />} />
                     
                         
     
                    </Routes>
                  </main>
                </div>

                {/* Footer */}
              <ToastContainer />             
                   <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}


export default App;

 