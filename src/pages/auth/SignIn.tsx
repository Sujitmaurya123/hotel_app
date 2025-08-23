
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sendOtp, signup } from "../../services/api";
import toast from "react-hot-toast";

export default function SignIn() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async () => {
        if (!name || !phone) return alert("Please fill all fields");
        setLoading(true);
        try {
            await signup(name, phone);
            await sendOtp(phone);
            toast.success("Sign In Successfully. Otp verification...");
            navigate("/otp-verification", { state: { phone } });
        } catch (err: any) {
            alert(err.response?.data?.error || "Error during signup");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
                <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>

                <form className="space-y-4">
                    {/* Full Name */}
                    <input
                        type="text"
                        placeholder="Full Name"
                       
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />

                    {/* Phone Number */}
                    <input
                        type="tel"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />

                    

                    {/* Create Account Button */}
                    <button
                        onClick={handleSignup}
                        disabled={loading}
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    >
                        {loading ? "Sending OTP..." : "Signup"}
                    </button>
                </form>

                {/* Login Link */}
                <p className="mt-4 text-center text-sm text-gray-600">
                    I have an account?{" "}
                    <Link to="/login" className="text-indigo-600 hover:underline">
                        Log In
                    </Link>
                </p>

                {/* Divider */}
                <div className="flex items-center my-6">
                    <hr className="flex-grow border-gray-300" />
                    <span className="mx-2 text-gray-400 text-sm">OR</span>
                    <hr className="flex-grow border-gray-300" />
                </div>

                {/* Social Logins */}
                <div className="flex justify-center space-x-4">
                    <button className="p-2 border rounded-full hover:bg-gray-100">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                            alt="Google"
                            className="w-5 h-5"
                        />
                    </button>
                    <button className="p-2 border rounded-full hover:bg-gray-100">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                            alt="Apple"
                            className="w-5 h-5"
                        />
                    </button>
                    <button className="p-2 border rounded-full hover:bg-gray-100">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/c/c2/F_icon.svg"
                            alt="Facebook"
                            className="w-5 h-5"
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}
