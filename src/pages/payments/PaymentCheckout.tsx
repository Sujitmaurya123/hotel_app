// src/components/PaymentCheckout.tsx
import  { useState } from "react";
import { loadRazorpay } from "../../lib/loadRazorpay";

// type UserPrefill = {
//     id:number;
//     name?: string;
//     email?: string;
//     contact?: string;
// };

type Props = {
    amount: number; // INR rupees, e.g. 499
    bookingId?: number | string; // optional booking id to send to backend
    user?: any; // optional user prefill
    onSuccess?: (payment: any) => void;
    className?: string;
};

const getApiBase = () =>
    // prefer Vite env; fallback to CRA env; otherwise localhost
    (import.meta.env.VITE_API_URL as string) ||
    "http://localhost:5000";

const getRzpKey = () =>
    (import.meta.env.VITE_RAZORPAY_KEY_ID as string) ||
    "";

export default function PaymentCheckout({
    amount,
    bookingId,
    user,
    onSuccess,
    className = "",
}: Props) {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
        
    const handlePayment = async () => {
        setMessage(null);
        setLoading(true);
        try {
            const ok = await loadRazorpay();
            if (!ok) throw new Error("Unable to load Razorpay SDK.");

            const apiBase = getApiBase();
            // Create order on backend (backend should create Razorpay order and DB Payment)
            const createRes = await fetch(`${apiBase}/api/payments/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    // backend expects user_id or booking_id — adapt to your auth
                    // If you have current user in auth context, backend can pick it up from session/token
                    amount,
                    booking_id: bookingId,
                    user_id:user!.id,
                }),
                
            });

            if (!createRes.ok) {
                const txt = await createRes.text();
                throw new Error(`Create order failed: ${txt || createRes.statusText}`);
            }

            const createJson = await createRes.json();
            const order = createJson.order;
            // order.id is Razorpay order_id

            const options = {
                key: getRzpKey(),
                amount: order.amount, // in paise (as returned by backend)
                currency: order.currency || "INR",
                name: "Hotel Laxmi Vilas Palace",
                description: `Booking payment`,
                image: "/logo.svg",
                order_id: order.id,
                handler: async (response: {
                    razorpay_payment_id: string;
                    razorpay_order_id: string;
                    razorpay_signature: string;
                }) => {
                    try {
                        setMessage("Verifying payment...");
                        const verifyRes = await fetch(`${apiBase}/api/payments/verify`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(response),
                        });

                        if (!verifyRes.ok) {
                            const txt = await verifyRes.text();
                            throw new Error(`Verify failed: ${txt || verifyRes.statusText}`);
                        }

                        const verifyJson = await verifyRes.json();
                        setMessage("Payment successful ✅");
                        onSuccess?.(verifyJson.payment ?? verifyJson);
                    } catch (err: any) {
                        console.error("verify error", err);
                        setMessage(err?.message || "Verification error");
                    }
                },
                prefill: {
                    name: user?.name ?? "",
                    email: user?.email ?? "",
                    contact: user?.contact ?? "",
                },
                theme: {
                    color: "#2563eb",
                },
                modal: {
                    ondismiss: () => setMessage("Payment flow closed by user."),
                },
            };

            
            const rzp = new window.Razorpay(options);
            rzp.on("payment.failed", (resp: any) => {
                console.error("payment.failed", resp);
                setMessage("Payment failed: " + (resp?.error?.description || "Unknown"));
            });

            rzp.open();
        } catch (err: any) {
            console.error(err);
            setMessage(err?.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={className}>
            <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-sm">
                <h3 className="text-lg font-semibold mb-2">Pay ₹{amount}</h3>

                <p className="text-sm text-gray-600 mb-4">
                    Secure payment via Razorpay. You will be redirected to complete the payment.
                </p>

                <button
                    onClick={handlePayment}
                    disabled={loading}
                    className={`w-full py-2 rounded-lg text-white ${loading ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"
                        }`}
                >
                    {loading ? "Processing..." : `Pay ₹${amount}`}
                </button>

                {message && (
                    <p className="mt-4 text-sm text-gray-700">
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}
