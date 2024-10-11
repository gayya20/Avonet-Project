"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ViewExpenses from "../newExpensessDashboard";

const AddExpense = () => {
 

  return (
    <div>
      {<ViewExpenses />}
    </div>
  );
};

export default AddExpense;
