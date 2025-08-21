
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function PasswordUpdated() {
    const navigate = useNavigate();

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-300">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-sm text-center overflow-hidden">
                {/* Gradient Background */}
                <div className="bg-gradient-to-b from-white to-amber-200 p-8">
                    {/* Success Icon */}
                    <div className="w-16 h-16 bg-amber-800 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaCheck className="text-white text-2xl" />
                    </div>

                    {/* Title */}
                    <h2 className="text-lg font-bold mb-2">Password Updated</h2>
                    <p className="text-gray-600 text-sm mb-6">
                        Your can now log into your Evernote account with the updated
                        credentials
                    </p>

                    {/* Back to Login */}
                    <button
                        onClick={() => navigate("/login")}
                        className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600"
                    >
                        Back to Log In
                    </button>
                </div>
            </div>
        </div>
    );
}
