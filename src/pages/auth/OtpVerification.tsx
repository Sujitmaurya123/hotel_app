import React, { useRef } from "react";

export default function OtpVerification() {
    const inputs = useRef<Array<HTMLInputElement | null>>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;
        if (/^[0-9]$/.test(value) && index < inputs.current.length - 1) {
            inputs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
            inputs.current[index - 1]?.focus();
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm text-center">
                <h2 className="text-2xl font-bold mb-2">Verify Phone Number</h2>
                <p className="text-gray-600 text-sm mb-6">
                    OTP has been sent to you on your mobile number, please enter it below
                </p>

                {/* OTP Inputs */}
                <div className="flex justify-center gap-2 mb-6">
                    {[0, 1, 2, 3].map((_, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength={1}
                            className="w-12 h-12 text-center border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 text-lg"
                            // ref={(el) => (inputs.current[index] = el)}
                            onChange={(e) => handleChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                        />
                    ))}
                </div>

                {/* Confirm Button */}
                <button className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600">
                    Confirm
                </button>

                {/* Resend Link */}
                <p className="text-sm text-gray-500 mt-4">
                    Don’t received code?{" "}
                    <a href="#" className="text-gray-800 font-medium hover:underline">
                        Resend
                    </a>
                </p>
            </div>
        </div>
    );
}
