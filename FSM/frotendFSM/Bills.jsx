
import { useState, useEffect } from "react";
import BillsModal from "./BillsModal"; // Importing the BillsModal component
import { useNavigate}from 'react-router-dom'; 
function Bills() {
  const [billsData, setBillsData] = useState([]); // State for fetched bills
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate =useNavigate()
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const register_id = sessionStorage.getItem("register_id");
  // Fetch bills data from the backend
  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    const userId = sessionStorage.getItem("register_id"); // Retrieve user ID from session storage
    if (!userId) {
      alert("please log in");
      navigate('/login')
    }

    try {
      const response = await fetch(`http://localhost:9000/bills/userbills/${userId}`);
      const data = await response.json();
      setBillsData(data); // Set the fetched bills data
      console.log(data);
    } catch (error) {
      console.error("Error fetching bills:", error);
    }
  };

  // Handle form submission to add a new bill
  const handleFormSubmit = async (values) => {
   
    if (!register_id) {
      alert("User not logged in");
      return;
    }

    const billData = { ...values, register: { id: parseInt(register_id, 10) } };
    console.log(billData);

    try {
      const response = await fetch("http://localhost:9000/bills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(billData),
      });

      if (response.ok) {
        const addedBill = await response.json();
        setBillsData((prev) => [...prev, addedBill]);
        closeModal();
        alert("Bill added successfully!");
        fetchBills();
      } else {
        alert("Failed to add bill");
      }
    } catch (error) {
      console.error("Error adding bill:", error);
      alert("An error occurred while adding the bill.");
    }
  };
  const handleRemoveTransaction = async (billId) => {
  
    try {
        const response = await fetch(`http://localhost:9000/bills/deletebill/${billId}/${register_id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            setBillsData(billsData.filter(bill => bill.id !== billId)); 
          //  alert("Bill removed successfully!");
        } else {
            alert("Failed to remove bill");
        }
    } catch (error) {
        console.error("Error removing bill:", error);
        alert("An error occurred while removing the bill.");
    }
};
  return (
    <div className="p-6 bg-gray-50">
      <br></br>
      <h1 className="text-2xl font-semibold mb-4">Upcoming Bills</h1>

      {/* Table View */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg border border-gray-200 rounded-lg">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="py-3 px-6 text-left text-sm font-medium">Bill Name</th>
              <th className="py-3 px-6 text-left text-sm font-medium">Item Description</th>
              <th className="py-3 px-6 text-left text-sm font-medium">Due Date</th>
              <th className="py-3 px-6 text-left text-sm font-medium">Amount</th>
              <th className="py-3 px-6 text-left text-sm font-medium"/>
            </tr>
          </thead>
          <tbody>
            {billsData.map((bill, index) => (
              <tr key={index} className="hover:bg-gray-100 border-b last:border-none">
                <td className="py-3 px-6 text-sm text-gray-700">{bill.billName}</td>
                <td className="py-3 px-6 text-sm text-gray-700">{bill.billDescription}</td>
                <td className="py-3 px-6 text-sm text-gray-700">{bill.dueDate}</td>
                <td className="py-3 px-6 text-sm text-gray-700">{bill.amount}</td>
                <td className="py-3 px-6 text-sm text-gray-700">
                                    <button
                                        onClick={() => handleRemoveTransaction(bill.id)}
                                        className="text-blue-500 hover:text-red-700"
                                    >
                                        &#10005; {/* Cross mark for removal */}
                                    </button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Bill Button */}
      <button
        onClick={openModal}
        className="mt-6 bg-indigo-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition"
      >
        Add Bill
      </button>

      {/* Modal */}
      {isModalOpen && (
        <BillsModal setShowBillsModal={setIsModalOpen} handleFormSubmit={handleFormSubmit} />
      )}
    </div>
  );
}

export default Bills;
