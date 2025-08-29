import { Star } from "lucide-react";

type Booking = {
    id: number;
    hotel: string;
    room: string;
    checkIn: string;
    checkOut: string;
    total: number;
    status: "Completed" | "Upcoming";
    rating?: number;
};

const bookings: Booking[] = [
    {
        id: 1,
        hotel: "Grand Luxury Hotel",
        room: "Premium Suite",
        checkIn: "2025-07-29",
        checkOut: "2025-08-05",
        total: 10767,
        status: "Completed",
        rating: 4,
    },
    {
        id: 2,
        hotel: "Grand Luxury Hotel",
        room: "Premium Suite",
        checkIn: "2025-07-29",
        checkOut: "2025-08-05",
        total: 10767,
        status: "Upcoming",
    },
    {
        id: 3,
        hotel: "Grand Luxury Hotel",
        room: "Premium Suite",
        checkIn: "2025-07-29",
        checkOut: "2025-08-05",
        total: 10767,
        status: "Completed",
        rating: 5,
    },
];

export default function ProfileBooking() {
    return (
        <div className="w-full max-w-md mx-auto space-y-4 mt-4">
            {bookings.map((b) => (
                <div
                    key={b.id}
                    className="border rounded-xl shadow-sm p-4 bg-white space-y-3"
                >
                    {/* Header */}
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="font-semibold text-gray-800">{b.hotel}</h2>
                            <p className="text-sm text-gray-500">{b.room}</p>
                        </div>
                        <span
                            className={`px-3 py-1 text-xs font-medium rounded-full ${b.status === "Completed"
                                    ? "bg-blue-100 text-blue-600"
                                    : "bg-gray-200 text-gray-600"
                                }`}
                        >
                            {b.status}
                        </span>
                    </div>

                    {/* Dates & Total */}
                    <div className="text-sm text-gray-700">
                        <p>
                            <span className="font-medium">Check-in: </span>
                            {b.checkIn}
                        </p>
                        <p>
                            <span className="font-medium">Check-out: </span>
                            {b.checkOut}
                        </p>
                        <p className="mt-1">
                            <span className="font-medium">Total: </span>₹ {b.total.toLocaleString()}
                        </p>
                    </div>

                    {/* Rating */}
                    {b.status === "Completed" && (
                        <div className="flex items-center gap-2 text-sm">
                            <span className="text-gray-600">Your rating:</span>
                            <div className="flex">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${i < (b.rating || 0)
                                                ? "text-yellow-500 fill-yellow-500"
                                                : "text-gray-300"
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Footer Buttons */}
                    <div className="flex gap-2 justify-end">
                        <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-100">
                            Invoice
                        </button>
                        {b.status === "Upcoming" && (
                            <button className="px-3 py-1 bg-orange-500 text-white rounded-md text-sm font-medium hover:bg-orange-600">
                                Manage
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
