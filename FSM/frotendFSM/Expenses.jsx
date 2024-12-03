
import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Expenses() {
  const [expensesData, setExpensesData] = useState({ credits: [], debits: [], months: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get the current year dynamically
        const currentYear = new Date().getFullYear();

        // Construct the start and end dates dynamically based on the current year
        const startDate = `${currentYear}-01-01`; // January 1st of the current year
        const endDate = `${currentYear}-12-31`; // December 31st of the current year
        const register_id=sessionStorage.getItem("register_id")
        console.log(register_id)
        // Fetch data from backend API using fetch
        const response = await fetch(`http://localhost:9000/expenses/monthly-summary/${register_id}?startDate=${startDate}&endDate=${endDate}`);
        
        // Check if the response is successful
        if (!response.ok) {
          throw new Error('Error fetching transaction data');
        }

        // Parse JSON data
        const monthlyData = await response.json();

        // Generate the list of months from January to December
        const allMonths = [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];

        // Initialize the months, credits, and debits arrays
        const months = allMonths;
        const credits = allMonths.map(month => {
          const monthData = monthlyData.find(item => item.month.startsWith(month)); 
          return monthData ? monthData.totalCredits : 0; // Use 0 if no data found
        });
        const debits = allMonths.map(month => {
          const monthData = monthlyData.find(item => item.month.startsWith(month)); 
          return monthData ? monthData.totalDebits : 0; // Use 0 if no data found
        });

        setExpensesData({
          months,
          credits,
          debits,
        });
      } catch (error) {
        setError('Error fetching transaction data');
        console.error('Error fetching transaction data', error);
      } finally {
        setLoading(false); // Set loading to false once the request completes
      }
    };

    fetchData();
  }, []);

  // Bar graph data for credits vs debits
  const barData = {
    labels: expensesData.months,
    datasets: [
      {
        label: 'Credits',
        data: expensesData.credits,
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: 'Debits',
        data: expensesData.debits,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  // Bar graph options
  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: `Credits vs Debits (${new Date().getFullYear()})`,
      },
    },
    scales: {
      x: {
        ticks: {
          autoSkip: true,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-6">
      <br /> <br />
      <div className="mb-6">
        <h1 className="text-xl font-semibold mb-4">Expense Management</h1>

        <div className="relative">
          <div className="w-full h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px]">
            <Bar data={barData} options={barOptions} height={null} width={null} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Expenses;
