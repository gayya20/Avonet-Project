export default function Home() {
  return (
    <>
    <div className="relative overflow-hidden bg-black">
      {/* Hero Section */}
      <div className="flex items-center justify-center min-h-screen text-white relative z-10">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Welcome to <span style={{ color: "green" }}>Ex</span>por App
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Manage your finances like never before.
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="/signup"
              className="bg-black hover:bg-gray-800 text-white py-2 px-4 rounded transition duration-300"
            >
              Sign Up
            </a>
            <a
              href={"/api/auth/signin"}
              className="bg-black hover:bg-gray-800 text-white py-2 px-4 rounded transition duration-300"
            >
              Log In
            </a>
          </div>
        </div>
      </div>

      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/background.jpg" // Path to your local image
          alt="Background"
          className="w-full h-full object-cover opacity-50" // Adjust opacity here
        />
      </div>

      {/* Footer Section */}
      <footer className="text-center p-4 text-gray-400 relative z-10">
        <p>© {new Date().getFullYear()} My Expense App. All rights reserved.</p>
      </footer>
    </div>

    <div>
      <h2>Our Service</h2>
    </div>
    </>
  );
}
