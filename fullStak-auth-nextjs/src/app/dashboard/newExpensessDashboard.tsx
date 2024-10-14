import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Trash2 } from 'lucide-react';
import { useSession } from "next-auth/react";
import Swal from 'sweetalert2';
import axios from 'axios'; // Import axios

const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];

const ExpensesDashboard = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const { data: session } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description || !amount || !date || !type) {
      Swal.fire({
        title: "Error!",
        text: "Please fill in all fields.",
        icon: "error",
      });
      return;
    }

    if (!session || !session.user) {
      alert("User session not found");
      return;
    }

    const formattedDate = date.includes("T") ? date : `${date}T00:00:00Z`;

    const newExpense = {
      description,
      amount: parseFloat(amount),
      date: formattedDate,
      type,
      userId: session.user.id, // Use userId from session
    };

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:8000/expenses", newExpense);

      if (response.status === 201 || response.status === 200) { // Checking response status
        Swal.fire({
          title: "Done!",
          text: "Expense added successfully.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'bg-black',
            title: 'text-orange-500 font-semibold text-lg',
            content: 'text-white',
            confirmButton: 'bg-orange-500 text-black',
            color: 'rgb(185 176 169)',
          },
        });

        setExpenses((prevExpenses) => [...prevExpenses, response.data]); // Use response.data for new expense
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to add expense.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add expense due to a network or server error.");
    } finally {
      setLoading(false);
    }

    // Clear the form
    setDescription("");
    setAmount("");
    setDate("");
    setType("");
  };

  const handleDeleteExpense = async (expenseId) => {
    if (!session || !session.user) {
      alert("User session not found");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.delete(`http://localhost:8000/expenses/${expenseId}`);

      if (response.status === 204 || response.status === 200) { // Successful delete check
        setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== expenseId));
      } else {
        alert("Failed to delete expense.");
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
      alert("Failed to delete expense due to a network error.");
    } finally {
      setLoading(false);
    }
  };

  // Calculate data for pie chart
  const pieChartData = ['Food', 'Transport', 'Entertainment', 'Bills', 'Other'].map(category => ({
    name: category,
    value: expenses
      .filter(expense => expense.type === category)
      .reduce((sum, expense) => sum + expense.amount, 0)
  })).filter(item => item.value > 0);

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold mb-8">Expenses Dashboard</h1>

      {/* Add Expense Form */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Add New Expense</h2>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter expense description"
              required
            />
          </div>

          <div className="w-32">
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount (LKR)</label>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
              required
            />
          </div>

          <div className="w-40">
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="w-40">
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option value="">Select Type</option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Bills">Bills</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
            >
              Add
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Expenses</h2>
          <div className="space-y-4">
            {expenses.length === 0 ? (
              <p className="text-gray-500 text-center">No expenses added yet.</p>
            ) : (
              expenses.map((expense, index) => (
                <div
                  key={expense.id} // Use id for key
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{expense.description}</p>
                    <p className="text-sm text-gray-600">{expense.type}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(expense.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-semibold">LKR {expense.amount}</span>
                    <button
                      onClick={() => handleDeleteExpense(expense.id)}
                      className="p-1 hover:bg-gray-200 rounded-full"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Expenses by Category</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-4 font-semibold">Total Expenses: LKR {totalExpenses}</p>
        </div>
      </div>
    </div>
  );
};

export default ExpensesDashboard;
