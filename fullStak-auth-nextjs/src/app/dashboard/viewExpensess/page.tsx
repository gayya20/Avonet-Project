"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import ExpensesTable from "./expensesTable";

const ViewExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: session, status } = useSession(); // Add status to track session state

  useEffect(() => {
    const fetchExpenses = async () => {
      if (status === "loading") return; // Wait for session to be checked
      
      if (!session?.user?.id) { // More specific check for user ID
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
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, [session, status]);

  const handleDelete = async (expenseId) => {
    if (!session?.user?.id) { // More specific check for user ID
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
      
      {!loading && !error && (
        <ExpensesTable 
          expenses={expenses} 
          onDelete={handleDelete} 
        />
      )}
    </div>
  );
};

export default ViewExpenses;