"use client"; // Ensure this is a Client Component

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import ExpenseAnalytics from "./newExpensessPie";
import WineInfo from "./WineInfo";

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

  useEffect(() => {
    const fetchExpenses = async () => {
      if (status === "authenticated") {
        try {
          const response = await fetch(`http://localhost:8000/expenses/user/${session?.user?.id}`, {
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

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-100 bg-gray-300 rounded w-full"></div>
      </div>
    );
  }

  return (
    <div>
      <ExpenseAnalytics expenses={expenses} />
      <WineInfo />
    </div>
  );
};

export default DashboardPage;
