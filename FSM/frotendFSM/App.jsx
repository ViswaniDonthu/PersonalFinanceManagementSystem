
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Dashboard from "./Dashboard";
import Transactions from "./Transactions";
import Bills from "./Bills";
import Expenses from "./Expenses";
import Goals from "./Goals";
import Balance from "./Balance";
import Welcome from "./Welcome";
import Login from "./Login";

import ResetPasswordForm from './ResetPassword';

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

// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


// import UserManagement from './UserManagement';
// import RoleManagement from './RoleManagement';
// import Permissions from './Permissions';
// import NavbarRbac from './NavbarRbac';
// import RbacApp from './RbacApp'
// function App() {
//   return (
//     <Router>
//       <div className="flex flex-col h-screen">
//         {/* Navbar */}
//         <NavbarRbac />

//         <div className="flex flex-1">
//           {/* Sidebar */}
//           <RbacApp />

//           {/* Main Content */}
//           <div className="flex-1 p-6 overflow-y-auto">
//             <Routes>
//               <Route path="/user-management" element={<UserManagement />} />
//               <Route path="/role-management" element={<RoleManagement />} />
//               <Route path="/permissions" element={<Permissions />} />
//             </Routes>
//           </div>
//         </div>
//       </div>
//     </Router>
//   );
// }

// // export default App;
// // App.js or Main Router

// // import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// // import NavbarRbac from './NavbarRbac';
// // import Sidebar from './RbacApp';
// // import Dashboard from './RbacDashboard';
// // import UserManagement from './UserManagement'; // Assuming you already have this component
// // import RoleManagement from './RoleManagement'; // Assuming you already have this component
// // import Permissions from './Permissions';
// // const App = () => {
// //   return (
// //   //  <Dashboard></Dashboard>
// //     <Router>
// //        <div className="flex">
// //         <Sidebar />
// //         <div className="flex-1 ">
// //           <NavbarRbac />
// //           <Routes>
// //             <Route path="/dashboard" element={<Dashboard />} />
// //             <Route path="/user-management" element={<UserManagement />} />
// //             <Route path="/role-management" element={<RoleManagement />} />
// //             <Route path="/permission" element={<Permissions/>}/>
// //           </Routes>
// //         </div>
// //       </div>
// //     </Router> 
   
// //   )
// // };









