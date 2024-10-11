import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Backend_URL } from "@/lib/Constants";
import { getServerSession } from "next-auth";

type Props = {
  params: {
    id: string;
  };
};

const ProfilePage = async (props: Props) => {
  const session = await getServerSession(authOptions);
  const response = await fetch(Backend_URL + `/user/${props.params.id}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${session?.backendTokens.accessToken}`,
      "Content-Type": "application/json",
    },
  });
  // console.log({ response });
  const user = await response.json();

  return (
    <div className="m-4 border rounded-lg shadow-md overflow-hidden">
  <div className="p-4 bg-gradient-to-b from-gray-200 to-gray-300 text-gray-800 text-center font-semibold text-lg">
    User Profile
  </div>

  <div className="grid grid-cols-2 p-4 gap-4 bg-white">
    <p className="text-gray-600 font-medium">Name:</p>
    <p className="text-gray-900 font-semibold">{user.name}</p>
    <p className="text-gray-600 font-medium">Email:</p>
    <p className="text-gray-900 font-semibold">{user.email}</p>
  </div>
</div>

  );
};

export default ProfilePage;
