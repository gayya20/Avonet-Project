"use client";

import React from "react";
import { PencilIcon, TrashIcon } from "lucide-react"; // Importing icons from Lucide React
import Swal from "sweetalert2"; // Importing SweetAlert
import { useSession } from "next-auth/react"; // Import useSession hook


interface Expense {
  id: number;
  description: string;
  amount: number;
  date: string;
  type: string;
}

interface ExpensesTableProps {
  expenses: Expense[];
  onEdit: (expense: Expense) => void;
  onDelete: (id: number) => void;
}

const ExpensesTable = ({ expenses, onEdit, onDelete }: ExpensesTableProps) => {
  const { data: session } = useSession(); // Get session data

  const handleDelete = async (id: number) => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirmDelete.isConfirmed) return;

    try {
      const response = await fetch(`http://localhost:8000/expenses/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      Swal.fire({
        title: "Deleted!",
        text: "Your expense has been deleted.",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'bg-black',
          title: 'text-orange-500 font-semibold text-lg',
          content: 'text-white',
          confirmButton: 'bg-orange-500 text-black',
        },
      });

      onDelete(id); // Update the parent component’s state
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to delete the expense.",
        icon: "error",
      });
      console.error("Error deleting expense:", error);
    }
  };

  const handleUpdate = async (expense: Expense) => {
    try {
      const { value: updatedExpense } = await Swal.fire({
        title: "Edit Expense",
        html: `
          <input id="swal-input1" class="swal2-input" placeholder="Description" value="${expense.description}">
          <input id="swal-input2" class="swal2-input" placeholder="Amount" value="${expense.amount}">
          <input id="swal-input3" class="swal2-input" placeholder="Date" value="${new Date(expense.date).toISOString().substring(0, 10)}">
          <input id="swal-input4" class="swal2-input" placeholder="Type" value="${expense.type}">
        `,
        focusConfirm: false,
        preConfirm: () => {
          const description = (document.getElementById("swal-input1") as HTMLInputElement).value;
          const amount = (document.getElementById("swal-input2") as HTMLInputElement).value;
          const date = (document.getElementById("swal-input3") as HTMLInputElement).value;
          const type = (document.getElementById("swal-input4") as HTMLInputElement).value;
  
          if (!description || !amount || !date || !type) {
            Swal.showValidationMessage("Please fill in all fields");
            return;
          }
  
          // Assuming `session.user.id` contains the user's ID
          return {
            description,
            amount: Number(amount),
            date: new Date(date).toISOString(), // Ensure the date is in ISO format
            type,
            userId: session?.user?.id, // Add userId from session
          };
        },
      });
  
      if (updatedExpense) {
        const response = await fetch(`http://localhost:8000/expenses/${expense.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedExpense), // Send updatedExpense directly
        });
  
        if (!response.ok) {
          throw new Error("Failed to update the expense");
        }
  
        Swal.fire({
          title: "Updated!",
          text: "Your expense has been updated.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
  
        onEdit(updatedExpense); // Call the onEdit callback to update the parent component's state
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to update the expense.",
        icon: "error",
      });
      console.error("Error updating expense:", error);
    }
  };
  
  

  return (
    <div className="overflow-x-auto">
      <h4 className="text-lg mt-6 mb-2"> </h4>
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
              <td className="p-4 border">
                {new Date(expense.date).toLocaleDateString()}
              </td>
              <td className="p-4 border">{expense.type}</td>
              <td className="p-4 border flex gap-2">
                <button onClick={() => handleUpdate(expense)} aria-label="Edit">
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
