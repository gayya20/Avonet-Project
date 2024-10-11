"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import ExpensesTable from "./expensesTable";

const ViewExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: session, status } = useSession();
  const [filterType, setFilterType] = useState(""); // State for filter type
  const [filteredExpenses, setFilteredExpenses] = useState([]); // State for filtered expenses

  useEffect(() => {
    const fetchExpenses = async () => {
      if (status === "loading") return;

      if (!session?.user?.id) {
        setError('Please log in to view expenses');
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
        setFilteredExpenses(data); // Initialize filtered expenses with all expenses
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, [session, status]);

  // Handle type filter change
  const handleFilterChange = (e) => {
    const type = e.target.value;
    setFilterType(type);
    
    // Filter expenses based on type
    if (type) {
      const filtered = expenses.filter(expense => expense.type === type); // Assuming 'type' exists in your expense object
      setFilteredExpenses(filtered);
    } else {
      setFilteredExpenses(expenses); // Show all expenses if no filter is applied
    }
  };

  const handleDelete = async (expenseId) => {
    if (!session?.user?.id) {
      setError("Please log in to delete expenses");
      return;
    }

    try {
      setLoading(true);
      
      const response = await fetch(`http://localhost:8000/expenses/${expenseId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session.user.token}`, // Add authentication token if required
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete expense");
      }

      setExpenses((prevExpenses) => 
        prevExpenses.filter((expense) => expense.id !== expenseId)
      );
      setFilteredExpenses((prevFiltered) => 
        prevFiltered.filter((expense) => expense.id !== expenseId)
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return <div>Loading session...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">View Expenses</h1>
      
      {loading && <div>Loading expenses...</div>}
      {error && <div className="text-red-500">{error}</div>}

      {/* Filter section */}
      <div className="mb-4">
        <label className="mr-2" htmlFor="filterType">Filter by Type:</label>
        <select 
          id="filterType" 
          value={filterType} 
          onChange={handleFilterChange} 
          className="border rounded p-2"
        >
          <option value="">All</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Utilities">Utilities</option>


        </select>
      </div>
      
      {!loading && !error && (
        <ExpensesTable 
          expenses={filteredExpenses} 
          onDelete={handleDelete} 
        />
      )}
    </div>
  );
};

export default ViewExpenses;
