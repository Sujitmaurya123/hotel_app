import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSendOtpMutation } from "../../Redux/api/authApi";
import toast from "react-hot-toast";

export default function Login() {
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [sendOtp] = useSendOtpMutation();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!phone) return toast.error("Please enter phone number");
        setLoading(true);
        try {
            await sendOtp({ phone }).unwrap();
            toast.success("OTP sent! Please verify.");
            navigate("/otp-verification", { state: { phone } });
        } catch (err: any) {
            toast.error(err.response?.data?.error || "Error sending OTP");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 via-white to-blue-100">
            <div className="bg-white/90 p-8 rounded-2xl shadow-2xl w-full max-w-md backdrop-blur-sm">
                {/* Title */}
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-extrabold text-gray-800 tracking-wide">
                        🏨 Hotel Laxmi Vilas Palace
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Welcome back! Log in to continue your booking
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                    {/* Phone Number */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            placeholder="+91 9876543210"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full cursor-pointer bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg shadow-md hover:bg-blue-700 transition-all duration-200 disabled:opacity-60"
                    >
                        {loading ? "Sending OTP..." : "Log In"}
                    </button>
                </form>

                {/* Sign In Link */}
                <p className="text-center text-sm text-gray-600 mt-4">
                    Don’t have an account?{" "}
                    <Link to="/sign-in" className="text-blue-600 font-medium hover:underline">
                        Sign Up
                    </Link>
                </p>

                {/* Divider */}
                <div className="flex items-center my-6">
                    <hr className="flex-grow border-gray-300" />
                    <span className="px-2 text-sm text-gray-400">OR</span>
                    <hr className="flex-grow border-gray-300" />
                </div>

                
            </div>
        </div>
    );
}
