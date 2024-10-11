import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2'; // Import SweetAlert2
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];

const ExpenseAnalytics = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const { data: session } = useSession();

  // Fetch expenses from the database for the specific user
  useEffect(() => {
    const fetchExpenses = async () => {
      if (!session || !session.user) {
        setError('User session not found');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:8000/expenses/user/${session.user.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch expenses');
        }
        const data = await response.json();
        setExpenses(data);

        // Calculate total expenses
        const total = data.reduce((sum, expense) => sum + expense.amount, 0);
        setTotalExpenses(total);

        if (total > 10000) {
          Swal.fire({
            title: 'Budget Exceeded!',
            text: 'You have exceeded your budget!',
            icon: 'warning',
            confirmButtonText: 'OK',
            customClass: {
              popup: 'bg-black', // Black background
              title: 'text-orange-500 font-semibold text-lg', // Orange for the title
              content: 'text-white', // White for the content
              confirmButton: 'bg-orange-500 text-black', // Orange button with black text
            },
          });
        }
        
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, [session]);

  // Process data for pie chart
  const calculatePieChartData = () => {
    const categories = ['Food', 'Transport', 'Entertainment', 'Bills', 'Other'];
    return categories.map((category) => ({
      name: category,
      value: expenses
        .filter((expense) => expense.type === category)
        .reduce((sum, expense) => sum + expense.amount, 0),
    })).filter((item) => item.value > 0);
  };

  const pieChartData = calculatePieChartData();

  // Calculate percentages for detailed breakdown
  const calculatePercentages = () => {
    if (totalExpenses === 0) return []; // Prevent division by zero
    return pieChartData.map((item) => ({
      ...item,
      percentage: ((item.value / totalExpenses) * 100).toFixed(2),
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-lg">
        Error loading expenses: {error}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-6">Expense Analytics</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieChartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={150}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `LKR ${value.toLocaleString()}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Detailed Breakdown */}
        <div className="flex flex-col justify-center space-y-4">
          <h3 className="text-xl font-semibold mb-4">Expense Breakdown</h3>

          {calculatePercentages().map((item, index) => (
            <div key={item.name} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <span
                    className="inline-block w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></span>
                  <span className="font-medium">{item.name}</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">
                    LKR {item.value.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">
                    {item.percentage}% of Total
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="mt-6 pt-4 border-t">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total Expenses:</span>
              <span className="text-xl font-bold">
                LKR {totalExpenses.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default ExpenseAnalytics;
