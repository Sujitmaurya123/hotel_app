import { useLazyGetProfileQuery } from "../../Redux/api/bookingapi";
import { useVerifyOtpMutation } from "../../Redux/api/authApi";

import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../Redux/slices/authSlice";

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
    const dispatch = useDispatch();
    
    const [verifyOtp] = useVerifyOtpMutation();

    
    const [getProfile] = useLazyGetProfileQuery();

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
            
            const res = await verifyOtp({ phone, otp }).unwrap();

            if (res?.token) {
                localStorage.setItem("token", res.token);
            }

            
                // ✅ Save user & token in Redux + localStorage
                dispatch(setCredentials({ user: res.user, token: res.token }));
            
          
            const profile = await getProfile();
            if (profile) {
                localStorage.setItem("user", JSON.stringify(profile));
            }

            toast.success("Otp Verification Successful.");
            navigate("/");
        } catch (err: any) {
            toast.error(err?.data?.error || "Invalid OTP");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm text-center">
                <h2 className="text-2xl font-bold mb-2">Verify Phone Number</h2>
                <p className="text-gray-600 text-sm mb-6">OTP sent to {phone}</p>

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
