import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    useCheckAvailabilityMutation,
    useValidateCodeMutation,
    useCreateBookingMutation
} from "../../Redux/api/bookingapi";
import type { User } from "../../features/auth/types";

interface Room {
    id: string;
    roomNumber: string;
    type: string;
    price: number;
    capacity: number;
}



const ReservationForm: React.FC = () => {
    const [arrival, setArrival] = useState("");
    const [departure, setDeparture] = useState("");
    const [rooms, setRooms] = useState("");
    const [adults, setAdults] = useState("");
    const [children, setChildren] = useState("");
    const [codeType, setCodeType] = useState("");
    const [code, setCode] = useState("");
    const [roomType, setRoomType] = useState("standard");
    const [availableRooms, setAvailableRooms] = useState<Room[]>([]);
    const [selectedRoom, setSelectedRoom] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [discountValid, setDiscountValid] = useState(false);
    const [discountPercent, setDiscountPercent] = useState(0);

    const [checkAvailability] = useCheckAvailabilityMutation();
    const [validateCode] = useValidateCodeMutation();
    const [createBooking] = useCreateBookingMutation();
    const [user, setUser] = useState<User | null>(null);
    
    useEffect(() => {
        const storedData = localStorage.getItem("user");
        if (storedData) {
            try {
                const parsed = JSON.parse(storedData);
                // Handle both formats: direct user object or nested API response
                if ("name" in parsed) {
                    setUser(parsed);
                } else if (parsed.data?.user) {
                    setUser(parsed.data.user);
                }
            } catch {
                setUser(null);
            }
        }
    }, []);

    
    const navigate = useNavigate();

    const isFormComplete =
        arrival &&
        departure &&
        rooms &&
        adults !== "" &&
        children !== "" &&
        selectedRoom &&
        (codeType ? code : true); 

    // Check availability when dates change
    useEffect(() => {
        const checkRoomAvailability = async () => {
            if (arrival && departure) {
                try {
                    setLoading(true);
                    
                    const response = await checkAvailability({
                        check_in_date: arrival,
                        check_out_date: departure,
                        room_type:roomType,
                    }).unwrap();
                    

                    if (response.available) {
                       
                        setAvailableRooms(response.rooms);
                        setError("");
                    } else {
                        setAvailableRooms([]);
                        setError("No rooms available for selected dates");
                    }
                } catch (err) {
                    setError("Error checking availability");
                    console.error("Availability check error:", err);
                } finally {
                    setLoading(false);
                }
            }
        };

        // Debounce the availability check
        const timer = setTimeout(checkRoomAvailability, 500);
        return () => clearTimeout(timer);
    }, [arrival, departure, roomType, checkAvailability]);

    // Validate discount code
    const validateDiscountCode = async () => {
        if (code && codeType) {
            try {
                const response = await validateCode({ code, codeType }).unwrap();

                if (response.valid) {
                    setDiscountValid(true);
                    setDiscountPercent(response.discount_percent);
                    setError("");
                } else {
                    setDiscountValid(false);
                    setError("Invalid discount code");
                }
            } catch (err) {
                setError("Error validating discount code");
                console.error("Discount validation error:", err);
            }
        }
    };

    // Handle booking submission
    const handleBooking = async () => {
        if (!user) {
            setError("Please log in to make a booking");
            navigate("/login");
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            // Validate discount code if provided
            if (codeType && code && !discountValid) {
                await validateDiscountCode();
                if (!discountValid) {
                    setLoading(false);
                    return;
                }
            }

            // Create booking
            const bookingData = {
                user_id: user.id, // Replace with actual user ID
                room_id: selectedRoom,
                check_in_date: arrival,
                check_out_date: departure,
                num_guests: parseInt(adults) + parseInt(children),
                offer_code: code || null,
            };

            const response = await createBooking(bookingData).unwrap();

            setSuccess("Booking created successfully!");
            // Redirect to confirmation page or show success details
            setTimeout(() => {
                navigate("/booking-confirmation", { state: { booking: response.booking } });
            }, 2000);
        } catch (err: any) {
            setError(err.data?.error || "An error occurred while processing your booking");
            console.error("Booking error:", err);
        } finally {
            setLoading(false);
        }
    };

    // Calculate total nights
    const calculateNights = () => {
        if (arrival && departure) {
            const checkIn = new Date(arrival);
            const checkOut = new Date(departure);
            return Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
        }
        return 0;
    };

    // Calculate total price
    const calculateTotalPrice = () => {
        const nights = calculateNights();
        const selectedRoomData = availableRooms.find(room => room.id === selectedRoom);

        if (selectedRoomData && nights > 0) {
            let total = selectedRoomData.price * nights * parseInt(rooms || "1");

            // Apply discount if valid
            if (discountValid) {
                total = total * (1 - discountPercent / 100);
            }

            return total.toFixed(2);
        }
        return "0.00";
    };

    return (
        <div className="flex min-h-screen mt-9">
            {/* Sidebar */}
            <aside className="bg-gray-600 text-white w-64 p-6 flex flex-col">
                <h2 className="text-lg font-semibold mb-6">Reservation</h2>
                <nav className="space-y-4">
                    <Link className="flex items-center hover:text-amber-300" to="/booknow">
                        <span className="mr-2">🏨</span> Rooms
                    </Link>
                    <Link className="flex items-center text-amber-500" to="/dining">
                        <span className="mr-2">🍽️</span> Dining
                    </Link>
                    <Link className="flex items-center hover:text-amber-300" to="/events">
                        <span className="mr-2">📅</span> Events
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 bg-white p-10">
                <h1 className="text-2xl font-bold mb-6">Room Reservation</h1>

                {/* Error/Success Messages */}
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                        {success}
                    </div>
                )}

                <div className="grid grid-cols-2 gap-6 max-w-2xl">
                    <div>
                        <label className="block mb-1 text-sm font-medium">Arrival</label>
                        <input
                            type="date"
                            value={arrival}
                            onChange={(e) => setArrival(e.target.value)}
                            className="border border-amber-300 p-2 rounded w-full"
                            min={new Date().toISOString().split('T')[0]}
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium">Departure</label>
                        <input
                            type="date"
                            value={departure}
                            onChange={(e) => setDeparture(e.target.value)}
                            className="border border-amber-300 p-2 rounded w-full"
                            min={arrival || new Date().toISOString().split('T')[0]}
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium">Room Type</label>
                        <select
                            value={roomType}
                            onChange={(e) => setRoomType(e.target.value)}
                            className="border border-amber-300 p-2 rounded w-full"
                        >
                            <option value="standard">Standard</option>
                            <option value="deluxe">Deluxe</option>
                            <option value="suite">Suite</option>
                        </select>
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium">Rooms</label>
                        <select
                            value={rooms}
                            onChange={(e) => setRooms(e.target.value)}
                            className="border border-amber-300 p-2 rounded w-full"
                        >
                            <option value="">Select Rooms</option>
                            {[1, 2, 3, 4, 5].map((r) => (
                                <option key={r} value={r}>{r} Room{r > 1 ? "s" : ""}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium">Guests</label>
                        <div className="grid grid-cols-2 gap-2">
                            <select
                                value={adults}
                                onChange={(e) => setAdults(e.target.value)}
                                className="border border-amber-300 p-2 rounded w-full"
                            >
                                <option value="">Adults</option>
                                {[1, 2, 3, 4].map((a) => (
                                    <option key={a} value={a}>{a} Adult{a > 1 ? "s" : ""}</option>
                                ))}
                            </select>
                            <select
                                value={children}
                                onChange={(e) => setChildren(e.target.value)}
                                className="border border-amber-300 p-2 rounded w-full"
                            >
                                <option value="">Children</option>
                                {[0, 1, 2, 3].map((c) => (
                                    <option key={c} value={c}>{c} Child{c > 1 ? "ren" : ""}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Available Rooms Selection */}
                    {availableRooms.length > 0 && (
                        <div className="col-span-2">
                            <label className="block mb-1 text-sm font-medium">Select Room</label>
                            <select
                                value={selectedRoom}
                                onChange={(e) => setSelectedRoom(e.target.value)}
                                className="border border-amber-300 p-2 rounded w-full"
                            >
                                <option value="">Choose a room</option>
                                {availableRooms.map((room) => (
                                    <option key={room.id} value={room.id}>
                                        {room.roomNumber} - {room.type} (₹{room.price}/night)
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div>
                        <label className="block mb-1 text-sm font-medium">Discount Code Type</label>
                        <select
                            value={codeType}
                            onChange={(e) => setCodeType(e.target.value)}
                            className="border border-amber-300 p-2 rounded w-full"
                        >
                            <option value="">Select Code Type</option>
                            <option value="promo">Promo Code</option>
                            <option value="group">Group Code</option>
                        </select>
                    </div>

                    {codeType && (
                        <div>
                            <label className="block mb-1 text-sm font-medium">Enter Code</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    placeholder="Enter your code"
                                    className="border border-amber-300 p-2 rounded flex-1"
                                />
                                <button
                                    onClick={validateDiscountCode}
                                    className="bg-amber-400 text-white px-3 py-2 rounded hover:bg-amber-500"
                                >
                                    Validate
                                </button>
                            </div>
                            {discountValid && (
                                <p className="text-green-600 text-sm mt-1">
                                    Valid code! {discountPercent}% discount applied
                                </p>
                            )}
                        </div>
                    )}
                </div>

                {/* Price Summary */}
                {selectedRoom && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg max-w-2xl">
                        <h3 className="font-semibold mb-2">Price Summary</h3>
                        <div className="grid grid-cols-2 gap-2">
                            <span>Nights:</span>
                            <span>{calculateNights()}</span>
                            <span>Room Price:</span>
                            <span>₹{calculateTotalPrice()}</span>
                            {discountValid && (
                                <>
                                    <span>Discount:</span>
                                    <span className="text-green-600">-{discountPercent}%</span>
                                </>
                            )}
                            <span className="font-semibold">Total:</span>
                            <span className="font-semibold">₹{calculateTotalPrice()}</span>
                        </div>
                    </div>
                )}

                <button
                    onClick={handleBooking}
                    disabled={!isFormComplete || loading}
                    className={`px-6 py-2 mt-6 rounded ${isFormComplete && !loading
                        ? "bg-amber-400 text-white hover:bg-amber-500"
                        : "bg-gray-300 text-gray-600 cursor-not-allowed"
                        }`}
                >
                    {loading ? "Processing..." : "Book Now"}
                </button>

                {/* Right Info Box */}
                <div className="border border-amber-300 p-4 w-60 mt-10">
                    <h3 className="font-semibold mb-4">Why Book with us?</h3>
                    <ul className="space-y-3">
                        <li className="flex items-center">
                            <span className="mr-2">👤</span> Member Rates
                        </li>
                        <li className="flex items-center">
                            <span className="mr-2">🏷️</span> Special Offers
                        </li>
                        <li className="flex items-center">
                            <span className="mr-2">📶</span> Free Wi-Fi
                        </li>
                    </ul>
                </div>
            </main>
        </div>
    );
};

export default ReservationForm;