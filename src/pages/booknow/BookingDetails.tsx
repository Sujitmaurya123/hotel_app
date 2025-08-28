// src/pages/BookingDetails.tsx
import { useEffect, useState } from "react";
import PaymentCheckout from "../payments/PaymentCheckout";
import type { User } from "../../features/auth/types";


export default function BookingDetails() {
    // Example: you'd fetch booking details and user from your API/context
    // const user = { name: "Sujit", email: "sujit@example.com", contact: "9999999999" };
    const [status, setStatus] = useState<string>("pending");
    const [user, setUser] = useState<User | null>(null);
    
    useEffect(() => {
        const storedData = localStorage.getItem("user");
        if (storedData) {
            try {
                const parsed = JSON.parse(storedData);

                if (parsed?.data?.user) {
                    setUser(parsed.data.user);   // <-- ✅ correct path
                } else if (parsed.user) {
                    setUser(parsed.user);        // fallback (if you ever store just user)
                } else if (parsed.name) {
                    setUser(parsed);             // fallback (raw object)
                }
            } catch {
                setUser(null);
            }
        }
    }, []);

    if (!user) {
        return <div>Loading user...</div>;
    }
    const booking = { user_id: user!.id, amount: 1285 };


    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Booking #{booking.user_id}</h2>
            <p className="mb-4">Amount: <strong>₹{booking.amount}</strong></p>

            <PaymentCheckout
                amount={booking.amount}
                bookingId={user!.id}
                user={user!}
                onSuccess={(payment) => {
                    // update UI after success; you can refresh booking data from server
                    setStatus("confirmed");
                    console.log("Payment verified ->", payment);
                }}
            />

            <div className="mt-6">
                <span className="text-sm">Booking status:</span>
                <div className="mt-2 inline-block px-3 py-1 rounded-full bg-gray-100 text-sm">
                    {status}
                </div>
            </div>
        </div>
    );
}
