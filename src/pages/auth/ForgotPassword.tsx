import React, { useState } from "react";

export default function ForgotPassword() {
    const [phone, setPhone] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Phone Number Submitted:", phone);
        // Add API call to send reset link here
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
                {/* Title */}
                <h2 className="text-2xl font-bold mb-2">Forgot Password</h2>
                <p className="text-gray-600 text-sm mb-6">
                    We sent a link on your Phone to reset password
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    />
                    <button
                        type="submit"
                        className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600"
                    >
                        Next
                    </button>
                </form>
            </div>
        </div>
    );
}
