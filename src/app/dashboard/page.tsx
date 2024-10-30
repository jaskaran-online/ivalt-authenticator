"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
const Dashboard = () => {
  const router = useRouter();

  const handleClearStorage = () => {
    if (window.confirm("Are you sure you want to remove 2FA authentication?")) {
      localStorage.removeItem("2FASecret");
      localStorage.removeItem("is2FAEnabled");
      alert("2FA has been disabled. You'll need to set it up again.");
      router.push("/"); // Redirect to home or 2FA setup page
    }
  };

  const handleAddNewAuthenticator = () => {
    if (window.confirm("Do you want to set up a new authenticator?")) {
      localStorage.removeItem("2FASecret");
      localStorage.removeItem("is2FAEnabled");
      router.push("/"); // Redirect to 2FA setup page
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto ">
        <div className="flex items-center justify-between mb-6 ">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="space-y-6">
            <p className="text-gray-700 font-semibold ">
              Welcome to your dashboard!
            </p>

            {/* 2FA Management Section */}
            <div className="border-t pt-6">
              {/* Logo */}
              <Image
                src="https://ivalt.com/images/logo.png"
                alt="iVALT Logo"
                width={100}
                height={100}
                className="mb-4"
              />
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Two-Factor Authentication Management
              </h2>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddNewAuthenticator}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                  Setup New Authenticator
                </button>
                <button
                  onClick={handleClearStorage}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  </svg>
                  Disable 2FA
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
