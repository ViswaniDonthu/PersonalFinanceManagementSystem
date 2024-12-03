import { useState, useEffect } from 'react'; 
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function ExpenseForMonth() {
  const [expensesData, setExpensesData] = useState({ credits: 0, debits: 0, month: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth(); // Get the current month (0 - 11)
        const currentYear = currentDate.getFullYear(); // Get the current year

        // Format the current month and year for the API request
        const formattedMonth = new Date(currentYear, currentMonth).toLocaleString('default', { month: 'short' });
        const register_id = sessionStorage.getItem('register_id');
        

        // Fetch data for the current month only
        const response = await fetch(`http://localhost:9000/expenses/eachmonth-summary/${register_id}`);

        if (!response.ok) {
          throw new Error('Error fetching monthly summary data');
        }

        const monthlySummary = await response.json();

        // Check if the returned month matches the current month
        if (monthlySummary.month.startsWith(formattedMonth)) {
          setExpensesData({
            month: monthlySummary.month,
            credits: monthlySummary.totalCredits,
            debits: monthlySummary.totalDebits
          });
        } else {
          setExpensesData({ month: formattedMonth, credits: 0, debits: 0 });
        }

      } catch (error) {
        setError('Error fetching transaction data');
        console.error('Error fetching transaction data', error);
      } finally {
        setLoading(false); // Set loading to false once the request completes
      }
    };

    fetchData();
  }, []); // Only fetch once when the component mounts

  // Bar chart data for credits vs debits in the current month
  const barData = {
    labels: [expensesData.month],
    datasets: [
      {
        label: 'Credits',
        data: [expensesData.credits],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: 'Debits',
        data: [expensesData.debits],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  // Bar chart options
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
        {/* <h1 className="text-xl font-semibold mb-4">Expense Management</h1> */}

        <div className="relative">
          <div className="w-full h-[100px] sm:h-[150px] md:h-[200px] lg:h-[250px]">
            <Bar data={barData} options={barOptions} height={null} width={null} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpenseForMonth;
