import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/route";

type Props = {
  children: React.ReactNode;
};

const DashBoardLayout = async (props: Props) => {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex h-screen"> {/* Set flex container to full height */}
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white h-full p-4 shadow-md"> {/* Use h-full to cover the full height */}
        <h1 className="text-lg font-semibold mb-6">Dashboard</h1>
        <ul className="space-y-4">
          <li>
            <Link
              className="block p-3 rounded hover:bg-emerald-600 transition duration-200"
              href={`/dashboard/user/${session?.user.id}`}
            >
              User Profile
            </Link>
          </li>
          <li>
            <Link
              className="block p-3 rounded hover:bg-emerald-600 transition duration-200"
              href="/dashboard/expenses"
            >
              Add Expenses
            </Link>
          </li>
          <li>
            <Link
              className="block p-3 rounded hover:bg-emerald-600 transition duration-200"
              href="/dashboard/viewExpensess"
            >
              View Expenses
            </Link>
          </li>
          {/* Add more links as needed */}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        {props.children}
      </div>
    </div>
  );
};

export default DashBoardLayout;
