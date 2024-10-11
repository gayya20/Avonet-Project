"use client"; // Ensure this is a Client Component

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import ViewExpenses from "./newExpensessDashboard";
import NewExpensessPie from "./newExpensessPie";

interface Expense {
  description: string;
  amount: number;
  date: string;
  type: string;
}

const DashboardPage: React.FC = () => {
  const { data: session, status } = useSession(); // Use session from next-auth
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const COLORS = [
    "#FF6F61", // Coral
    "#6F5B7F", // Lavender
    "#88B04B", // Olive Green
    "#F7CAC9", // Soft Pink
  ];

  useEffect(() => {
    const fetchExpenses = async () => {
      if (status === "authenticated") {
        try {
          const response = await fetch("http://localhost:8000/expenses", {
            headers: {
              Authorization: `Bearer ${session?.backendTokens?.accessToken}`, // Attach token to the request
            },
          });

          if (!response.ok) throw new Error("Failed to fetch expenses");
          const data: Expense[] = await response.json();
          setExpenses(data); // Set expenses from the response
        } catch (error) {
          console.error("Error loading expenses:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchExpenses();
  }, [status, session]);

  // Calculate total expenses and estimated savings
  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const estimatedSavings = 1000 - totalExpenses; // Assuming a fixed budget of LKR 1000

  if (status === "loading") return <div>Loading session...</div>; // Handle session loading

  if (loading) return <div>Loading expenses...</div>;

  return (
    <div>
      <NewExpensessPie />

    </div>
  );
};

export default DashboardPage;
