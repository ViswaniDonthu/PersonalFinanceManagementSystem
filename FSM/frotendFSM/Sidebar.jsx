import React from "react";
import { Link } from "react-router-dom";

function Sidebar({ sidebarVisible, setSidebarVisible }) {
  const handleLinkClick = () => {
    if (window.innerWidth <= 640) {
      setSidebarVisible(false); // Close sidebar on small screens when link is clicked
    }
  };

  return (
    <aside
      className={`${
        sidebarVisible ? "block" : "hidden"
      } sm:block w-54 bg-blue-900 text-white p-6 fixed left-0 top-16 bottom-0 z-50`}
    >
      {/* Close Button */}
      <button
        onClick={() => setSidebarVisible(false)}
        className="sm:hidden absolute top-4 right-4 text-white text-3xl"
      >
        <i className="fas fa-times"></i>
      </button>

      {/* Sidebar Links */}
      <div className="flex flex-col space-y-4">
        <Link
          to="/dashboard"
          onClick={handleLinkClick}
          className="w-full text-left p-3 hover:bg-blue-700 rounded-md flex items-center transition duration-300"
        >
          <i className="fas fa-tachometer-alt mr-3 text-xl"></i> Dashboard
        </Link>
        <Link
          to="/balance"
          onClick={handleLinkClick}
          className="w-full text-left p-3 hover:bg-blue-700 rounded-md flex items-center transition duration-300"
        >
          <i className="fas fa-balance-scale mr-3 text-xl"></i> Balance
        </Link>
        <Link
          to="/transactions"
          onClick={handleLinkClick}
          className="w-full text-left p-3 hover:bg-blue-700 rounded-md flex items-center transition duration-300"
        >
          <i className="fas fa-exchange-alt mr-3 text-xl"></i> Transactions
        </Link>
        <Link
          to="/bills"
          onClick={handleLinkClick}
          className="w-full text-left p-3 hover:bg-blue-700 rounded-md flex items-center transition duration-300"
        >
          <i className="fas fa-file-invoice-dollar mr-3 text-xl"></i> Bills
        </Link>
        <Link
          to="/expenses"
          onClick={handleLinkClick}
          className="w-full text-left p-3 hover:bg-blue-700 rounded-md flex items-center transition duration-300"
        >
          <i className="fas fa-money-bill-wave mr-3 text-xl"></i> Expenses
        </Link>
        <Link
          to="/goals"
          onClick={handleLinkClick}
          className="w-full text-left p-3 hover:bg-blue-700 rounded-md flex items-center transition duration-300"
        >
          <i className="fas fa-bullseye mr-3 text-xl"></i> Goals
        </Link>
       
      </div>
    </aside>
  );
}

export default Sidebar;
