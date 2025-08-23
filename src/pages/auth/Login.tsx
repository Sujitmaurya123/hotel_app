
import { useState } from "react";
import { FaGoogle, FaApple, FaFacebookF } from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";
import { sendOtp } from "../../services/api";
import toast from "react-hot-toast";

export default function Login() {
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!phone) return alert("Please enter phone");
        setLoading(true);
        try {
            await sendOtp(phone);
            toast.success("Login Successfully. Otp Verification...")
            navigate("/otp-verification", { state: { phone } });
        } catch (err: any) {
            alert(err.response?.data?.error || "Error sending OTP");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm relative">
                

                {/* Title */}
                <h2 className="text-2xl font-semibold text-center mb-6">Log In</h2>

                {/* Phone Number */}
                <input
                    type="text"
                    placeholder="Phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring focus:ring-gray-200"
                />

               

                

                {/* Create Account Button */}
                <button
                    onClick={handleLogin}
                    disabled={loading}
                    className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
                >
                    {loading ? "Sending OTP..." : "Login"}
                </button>

                {/* Sign In Link */}
                <p className="text-center text-sm text-gray-600 mt-4">
                    Don’t have an account?{" "}
                    <Link to="/sign-in" className="text-gray-800 font-medium hover:underline">
                        Sign In
                    </Link>
                </p>

                {/* Divider */}
                <div className="flex items-center my-4">
                    <hr className="flex-grow border-gray-300" />
                    <span className="px-2 text-xs text-gray-500">OR</span>
                    <hr className="flex-grow border-gray-300" />
                </div>

                {/* Social Login */}
                <div className="flex justify-center gap-4">
                    <button className="p-2 border rounded-md hover:bg-gray-100">
                        <FaGoogle className="text-xl text-gray-600" />
                    </button>
                    <button className="p-2 border rounded-md hover:bg-gray-100">
                        <FaApple className="text-xl text-gray-600" />
                    </button>
                    <button className="p-2 border rounded-md hover:bg-gray-100">
                        <FaFacebookF className="text-xl text-gray-600" />
                    </button>
                </div>
            </div>
        </div>
    );
}
