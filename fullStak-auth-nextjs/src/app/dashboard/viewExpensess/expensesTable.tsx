"use client";

import React from "react";
import { PencilIcon, TrashIcon } from "lucide-react"; // Importing icons from Lucide React

interface Expense {
  id: number; // Assuming each expense has a unique ID
  description: string;
  amount: number;
  date: string;
  type: string;
}

interface ExpensesTableProps {
  expenses: Expense[];
  onEdit: (expense: Expense) => void; // Function to handle edit
  onDelete: (id: number) => void; // Function to handle delete
}

const ExpensesTable = ({ expenses, onEdit, onDelete }: ExpensesTableProps) => {
  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this expense?");
    if (!confirmDelete) return; // Exit if user cancels

    try {
      // Make a DELETE request to the API
      const response = await fetch(`http://localhost:8000/expenses/${id}`, {
        method: "DELETE", // Specify that this is a DELETE request
      });

      if (!response.ok) {
        throw new Error("Failed to delete expense"); // Handle any errors
      }

      // Call the onDelete prop to update the parent component's state
      window.location.reload(); // Refresh the page
    } catch (error) {
      console.error("Error deleting expense:", error); // Log any errors that occur
    }
  }
  return (
    <div className="overflow-x-auto">
      <h4 className="text-lg mt-6 mb-2">All Expenses</h4>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-4 border">Description</th>
            <th className="p-4 border">Amount (LKR)</th>
            <th className="p-4 border">Date</th>
            <th className="p-4 border">Type</th>
            <th className="p-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id} className="border-b hover:bg-gray-50">
              <td className="p-4 border">{expense.description}</td>
              <td className="p-4 border">{expense.amount}</td>
              <td className="p-4 border">{new Date(expense.date).toLocaleDateString()}</td>
              <td className="p-4 border">{expense.type}</td>
              <td className="p-4 border flex gap-2">
                <button onClick={() => onEdit(expense)} aria-label="Edit">
                  <PencilIcon className="h-5 w-5 text-blue-500 hover:text-blue-700" />
                </button>
                <button onClick={() => handleDelete(expense.id)} aria-label="Delete">
                  <TrashIcon className="h-5 w-5 text-red-500 hover:text-red-700" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpensesTable;
