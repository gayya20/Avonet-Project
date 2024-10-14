import React from 'react';
import Swal from 'sweetalert2';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];

interface Expense {
  description: string;
  amount: number;
  date: string;
  type: string;
}

interface Props {
  expenses: Expense[];
}

const ExpenseAnalytics: React.FC<Props> = ({ expenses }) => {
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  // Show an alert if total expenses exceed 10,000
  if (totalExpenses > 10000) {
    Swal.fire({
      title: 'Budget Exceeded!',
      text: 'You have exceeded your budget!',
      icon: 'warning',
      confirmButtonText: 'OK',
      customClass: {
        popup: 'bg-black',
        title: 'text-orange-500 font-semibold text-lg',
        confirmButton: 'bg-orange-500 hover:bg-orange-600 text-black px-4 py-2 rounded',
      },
      background: 'black',
      iconColor: '#f97316',
      color:"#cdc3c3"
    });
  }

  // Data for pie chart
  const calculatePieChartData = () => {
    const categories = ['Food', 'Transport', 'Entertainment', 'Bills', 'Other'];
    return categories.map((category) => ({
      name: category,
      value: expenses.filter((expense) => expense.type === category).reduce((sum, expense) => sum + expense.amount, 0),
    })).filter(item => item.value > 0);
  };

  const pieChartData = calculatePieChartData();

  if (expenses.length === 0) {
    return <div>No expenses found.</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-6">Expense Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pieChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={150}>
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
          {pieChartData.map((item, index) => (
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
                    {((item.value / totalExpenses) * 100).toFixed(2)}% of Total
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="mt-6 pt-4 border-t">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total Expenses:</span>
              <span className="text-xl font-bold">LKR {totalExpenses.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseAnalytics;
