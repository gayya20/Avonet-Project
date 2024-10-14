import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/route";

type Props = {
  children: React.ReactNode;
};

const DashBoardLayout = async (props: Props) => {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex h-screen overflow-hidden"> {/* Ensures the container takes the full height and prevents overflow */}
      {/* Sidebar */}
      <div className="min-w-96 bg-gray-800 text-white h-full p-4 shadow-md" style={{width:"15%"}}> {/* Wider Sidebar */}
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
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-white-300 overflow-auto"> {/* Ensure main content expands and allows scrolling if needed */}
        {props.children}
      </div>
    </div>
  );
};

export default DashBoardLayout;
