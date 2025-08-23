import { getProfile, verifyOtp } from "../../services/api";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function OtpVerification() {
    const location = useLocation();
    const navigate = useNavigate();
    const phone = (location.state as any)?.phone || "";
    useEffect(() => {
        console.log("Location state:", location.state);
        console.log("Phone extracted:", phone);
    }, [location.state, phone]);

    const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
    const [loading, setLoading] = useState(false);
    const inputs = useRef<Array<HTMLInputElement | null>>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;
        if (/^[0-9]$/.test(value) || value === "") {
            const newOtp = [...otpDigits];
            newOtp[index] = value;
            setOtpDigits(newOtp);
            if (value && index < inputs.current.length - 1) {
                inputs.current[index + 1]?.focus();
            }
        }
    };

    const handleVerify = async () => {
        const otp = otpDigits.join("");
        if (otp.length !== otpDigits.length) {
            return alert("Please enter complete OTP");
        }
        setLoading(true);
        try {
            const res = await verifyOtp(phone, otp);
            localStorage.setItem("token", res.data.token);

            const profile = await getProfile();
            localStorage.setItem("user", JSON.stringify(profile.data.user));
            toast.success("Otp Verification Successfully.")
            navigate("/");
        } catch (err: any) {
            alert(err.response?.data?.error || "Invalid OTP");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm text-center">
                <h2 className="text-2xl font-bold mb-2">Verify Phone Number</h2>
                <p className="text-gray-600 text-sm mb-6">
                    OTP sent to {phone}
                </p>

                <div className="flex justify-center gap-2 mb-6">
                    {otpDigits.map((digit, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength={1}
                            ref={(el) => {
                                inputs.current[index] = el;
                            }}
                            value={digit}
                            onChange={(e) => handleChange(e, index)}
                            className="w-12 h-12 text-center border border-gray-300 rounded-md text-lg focus:ring-2 focus:ring-orange-400"
                        />
                    ))}
                </div>

                <button
                    onClick={handleVerify}
                    disabled={loading}
                    className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600"
                >
                    {loading ? "Verifying..." : "Verify OTP"}
                </button>
            </div>
        </div>
    );
}
