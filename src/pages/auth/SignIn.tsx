import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSendOtpMutation, useSignupMutation } from "../../Redux/api/authApi";
import toast from "react-hot-toast";

export default function SignIn() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [signup] = useSignupMutation();
    const [sendOtp] = useSendOtpMutation();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !phone) return toast.error("Please fill all fields");
        setLoading(true);
        try {
            await signup({ name, phone }).unwrap();
            localStorage.setItem("user", JSON.stringify({ name, phone }));
            await sendOtp({ phone }).unwrap();
            toast.success("Sign In Successfully. OTP sent...");
            navigate("/otp-verification", { state: { phone } });
        } catch (err: any) {
            toast.error(err.response?.data?.error || "Error during signup");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100">
            <div className="bg-white/90 shadow-2xl rounded-2xl p-8 w-full max-w-md backdrop-blur-sm">
                {/* App Logo / Hotel Name */}
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-extrabold text-gray-800 tracking-wide">
                        🏨 Hotel Laxmi Vilas Palace
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Sign in to book your perfect stay
                    </p>
                </div>

                <form onSubmit={handleSignup} className="space-y-5">
                    {/* Full Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                        />
                    </div>

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
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                        />
                    </div>

                    {/* Signup Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full cursor-pointer bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg shadow-md hover:bg-blue-700 transition-all duration-200 disabled:opacity-60"
                    >
                        {loading ? "Sending OTP..." : "Continue"}
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center my-6">
                    <hr className="flex-grow border-gray-300" />
                    <span className="mx-2 text-gray-400 text-sm">OR</span>
                    <hr className="flex-grow border-gray-300" />
                </div>

                {/* Login Link */}
                <p className="text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-blue-600 font-medium hover:underline"
                    >
                        Log In
                    </Link>
                </p>
            </div>
        </div>
    );
}
