import  { useState, useEffect } from "react";
import ExpensesBreakdown from "./ExpenseBreakDown";
import { useNavigate}from 'react-router-dom'; 
import ExpenseForMonth from "./ExpenseForMonth";
function Dashboard() {
  // Styling for the dashboard layout and sections
  const dashboardStyle = {
    display: "flex",
    flexWrap: "wrap", // Ensure wrapping after 3 items
    gap: "8px", // Gap between sections
    padding: "16px",
    backgroundColor: "white", 
  };

  const sectionStyle = {
    flex: "1 1 calc(32.32% - 16px)", // 3 items per row with gap space considered
    minWidth: "300px", // Minimum width for responsiveness
   //margin: "8px", // Margin between sections
    padding: "16px", // Internal padding for the section
   // background: "#ffffff", // White background
    borderRadius: "4px", // Rounded corners
    boxShadow: "0 0 2px rgba(0, 0, 0, 0.1)",
    
     // Light shadow
  };

  // State variables
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalBalance, setTotalBalance] = useState("Fetching...");
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate(); 
  const register_id = sessionStorage.getItem("register_id");

  // Fetch Total Balance
  const fetchTotalBalance = async () => {
    if(!register_id){
        navigate('/login')
    }
    try {
      const res = await fetch(
        `http://localhost:9000/balances/totalbalance/${register_id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch balance");
      }

      const data = await res.json();
      setTotalBalance(data.amount); // Update state with fetched balance
    } catch (error) {
      console.log("Error fetching total balance:", error);
      setTotalBalance("Unable to fetch");
    }
  };

  // Fetch Upcoming Bills
  const fetchUpcomingBills = async () => {
    try {
      const response = await fetch(
        `http://localhost:9000/bills/upcomingbills/${register_id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch bills");
      }

      const data = await response.json();
      setBills(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Recent Transactions
  const fetchRecentTransactions = async () => {
    try {
      const response = await fetch(
        `http://localhost:9000/transaction/recenttransactions/${register_id}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch recent transactions");
      }

      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching recent transactions:", error);
    }
  };

  // useEffect Hooks to fetch data on component mount
  useEffect(() => {
    fetchTotalBalance(); // Fetch total balance on mount
    fetchUpcomingBills(); // Fetch upcoming bills on mount
    fetchRecentTransactions(); // Fetch recent transactions on mount
  }, [register_id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={dashboardStyle} className="bg-white">
      {/* Total Balance Section */}
      <div style={sectionStyle}>
        <br/><br></br>
        <img  style={{"height":150,"borderRadius":"50%"}}src="src\infosysy\money.jpg" alt="Balance"  className="ms-20 mb-10"/>
        <h1 className="text-2xl font-semibold text-center mb-4">Total Balance</h1>
        <h1 className="text-2xl font-semibold text-center mb-4">{totalBalance}</h1>
      </div>

      {/* Expenditure Breakdown Section */}
      <div style={sectionStyle}>
        <br/><br></br>
        <h1 className="text-2xl font-semibold mb-4" >Expenditure Breakdown</h1>
       <ExpensesBreakdown></ExpensesBreakdown>
      </div>

   {/* bill section */}
   
   <div className="p-4 bg-white rounded-lg shadow" style={sectionStyle}>
    <br></br><br></br>
  <h1 className="text-2xl font-semibold mb-4">Upcoming Bills</h1>
  {bills.length === 0 ? (
    <p className="text-gray-500">No upcoming bills</p>
  ) : (
    <table className="w-full border-collapse border border-gray-200">
      <thead>
        <tr className="bg-gray-100">
          <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
            Bill Name
          </th>
          <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
            Amount
          </th>
          <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
            Due Date
          </th>
        </tr>
      </thead>
      <tbody>
        {bills.map((bill) => (
          <tr key={bill.id} className="hover:bg-gray-50">
            <td className="border border-gray-300 px-4 py-2">{bill.billName}</td>
            <td className="border border-gray-300 px-4 py-2">₹{bill.amount}</td>
            <td className="border border-gray-300 px-4 py-2">
              {new Date(bill.dueDate).toLocaleDateString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>
{/* transaction section */}
<div className="p-4 bg-white rounded-lg shadow" style={sectionStyle}>
    <br></br>
  <h1 className="text-2xl font-semibold mb-4">Recent Transactions</h1>
  {transactions.length > 0 ? (
    <table className="w-full border-collapse border border-gray-200">
      <thead>
        <tr className="bg-gray-100">
          <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
            Transaction Name
          </th>
          <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
            Amount
          </th>
          <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
            Type
          </th>
          <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
            Date
          </th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <tr key={transaction.id} className="hover:bg-gray-50">
            <td className="border border-gray-300 px-4 py-2">{transaction.goal}</td>
            <td className="border border-gray-300 px-4 py-2">₹{transaction.amount}</td>
            <td className="border border-gray-300 px-4 py-2 capitalize">
              {transaction.transactionType}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {new Date(transaction.date).toLocaleDateString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p className="text-gray-500">No transactions found.</p>
  )}
</div>

      {/* Expenses Section (Placeholder) */}
      <div style={sectionStyle}>
      
        <h1>Expenses</h1>
         <ExpenseForMonth /> 
      </div>
    </div>
  );
}

export default Dashboard;
