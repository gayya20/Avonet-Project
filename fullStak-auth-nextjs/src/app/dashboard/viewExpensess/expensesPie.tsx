"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import ExpensesTable from "./expensesTable"; // Ensure the correct import for the ExpensesTable component

const COLORS = [
  "#FF6F61", // Coral
  "#6F5B7F", // Lavender
  "#88B04B", // Olive Green
  "#F7CAC9", // Soft Pink
  "#28a745", // Green
];

const expensessPie = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0); // State for total amount

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch("http://localhost:8000/expenses");
        if (!response.ok) {
          throw new Error("Failed to fetch expenses");
        }
        const result = await response.json();
        setExpenses(result);

        // Categorize expenses by type and calculate total amount
        const categorizedData = result.reduce((acc, expense) => {
          const { type, amount } = expense;
          const existing = acc.find((item) => item.name === type);
          if (existing) {
            existing.value += amount;
          } else {
            acc.push({ name: type, value: amount });
          }
          return acc;
        }, []);

        setData(categorizedData);

        // Calculate total amount of expenses
        const total = result.reduce((sum, expense) => sum + expense.amount, 0);
        setTotalAmount(total);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold text-center mb-4">View Expenses</h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div>
          {/* Display total expenses */}
          <h3 className="text-xl font-semibold mb-2">Total Expenses: LKR {totalAmount.toLocaleString()}</h3>

          <h4 className="text-lg mb-2">Expenses by Category</h4>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} // Display category name and percentage
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Use the ExpensesTable component */}
          
        </div>
        
      )}
    </div>
  );
};

export default expensessPie;
