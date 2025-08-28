import  { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import { useLazyGetUserBookingsQuery } from "../../Redux/api/bookingapi";
import type { User } from "../../features/auth/types";

interface Booking {
    id: string;
    roomNumber: string;
    checkInDate: string;
    checkOutDate: string;
    // Add other properties as needed
}

const BookingConfirmation = () => {
    const [user, setUser] = useState<User | null>(null);
    const [latestBooking, setLatestBooking] = useState<Booking | null>(null);
    console.log(latestBooking)
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


    // lazy query hook
    const [getUserBookings, { data: bookings, isLoading }] =
        useLazyGetUserBookingsQuery();

    useEffect(() => {
        if (user?.id) {
            // 🔥 fetch user bookings only if needed
            getUserBookings(user.id);
        }
    }, [user, getUserBookings]);

    useEffect(() => {
        if (bookings && bookings.length > 0) {
            // Assuming the first booking in the array is the latest one
            // You might need to adjust this logic based on your API response structure
            const latest = bookings[0];
            setLatestBooking({
                id: latest.id,
                roomNumber: latest.room?.roomNumber || "N/A",
                checkInDate: new Date(latest.checkInDate).toLocaleDateString(),
                checkOutDate: new Date(latest.checkOutDate).toLocaleDateString(),
            });
        }
    }, [bookings]);
    console.log(latestBooking);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
                <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
                    <p className="mt-4 text-gray-500">Loading booking details...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
                <CheckCircle className="mx-auto text-green-500 w-16 h-16" />
                <h1 className="text-2xl font-bold mt-4">Booking Confirmed!</h1>
                <p className="text-gray-600 mt-2">
                    Thank you, <span className="font-semibold">{user?.name}</span>. Your
                    booking has been successfully confirmed.
                </p>

                {latestBooking ? (
                    <div className="mt-6 text-left space-y-3 border-t pt-4">
                        <div>
                            <span className="font-semibold text-gray-700">Booking ID:</span>{" "}
                            <span className="text-gray-600">{latestBooking.id}</span>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-700">Room Number:</span>{" "}
                            <span className="text-gray-600">{latestBooking.roomNumber}</span>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-700">Check-In:</span>{" "}
                            <span className="text-gray-600">{latestBooking.checkInDate}</span>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-700">Check-Out:</span>{" "}
                            <span className="text-gray-600">{latestBooking.checkOutDate}</span>
                        </div>
                    </div>
                ) : (
                    <div className="mt-6 text-gray-600">
                        No booking details available.
                    </div>
                )}

                {bookings && (
                    <div className="mt-4 text-sm text-gray-600">
                        (Fetched {bookings.length} bookings for this user)
                    </div>
                )}

                <button
                    onClick={() => (window.location.href = "/booking-details")}
                    className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-xl transition-colors"
                >
                    Go to Payment details
                </button>
            </div>
        </div>
    );
};

export default BookingConfirmation;