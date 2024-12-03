
import  { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { useNavigate } from 'react-router';
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function ExpensesBreakdown({ userId }) {
  const [data, setData] = useState([]); // State to store dynamic data
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State to manage errors
const navigate=useNavigate()
  // Fetching data using the GET method
  useEffect(() => {
    const fetchExpensesData = async () => {
        const register_id=sessionStorage.getItem("register_id")
        if(!register_id)
        navigate('/login')
      try {
        const response = await fetch(`http://localhost:9000/transaction/goalandamount/${register_id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch expenses data');
        }
        const result = await response.json();
        // Convert the result into an array of objects with name and value keys
        const formattedData = Object.entries(result).map(([goal, amount]) => ({
          name: goal,
          value: amount,
        }));
        setData(formattedData); // Update the data state
      } catch (error) {
        setError(error.message); // Update error state if any issue occurs
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchExpensesData(); // Call the function to fetch data
  }, [userId]); // Dependency on userId, so data is fetched when userId changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
     
      <PieChart width={300} height={300}>
        <Pie data={data} dataKey="value" nameKey="name" outerRadius={100} fill="#8884d8">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

export default ExpensesBreakdown;

