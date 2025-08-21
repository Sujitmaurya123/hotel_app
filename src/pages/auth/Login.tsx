import { useState } from "react";
import { FaGoogle, FaApple, FaFacebookF } from "react-icons/fa";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm relative">
                

                {/* Title */}
                <h2 className="text-2xl font-semibold text-center mb-6">Log In</h2>

                {/* Phone Number */}
                <input
                    type="text"
                    placeholder="Phone number"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring focus:ring-gray-200"
                />

                {/* Password */}
                <div className="relative mb-2">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-gray-200"
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-2 text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                    </button>
                </div>

                {/* Forgot Password */}
                <div className="flex justify-end mb-4">
                    <Link to="/forgot-password" className="text-xs text-orange-500 hover:underline">
                        Forgot Password
                    </Link>
                </div>

                {/* Create Account Button */}
                <button className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600">
                    Create Account
                </button>

                {/* Sign In Link */}
                <p className="text-center text-sm text-gray-600 mt-4">
                    Don’t have an account?{" "}
                    <a href="#" className="text-gray-800 font-medium hover:underline">
                        Sign In
                    </a>
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
